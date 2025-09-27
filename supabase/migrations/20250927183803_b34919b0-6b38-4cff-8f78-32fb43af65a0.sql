-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  category TEXT NOT NULL,
  date TEXT NOT NULL,
  github_url TEXT,
  live_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create experiences table
CREATE TABLE public.experiences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  period TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  achievements TEXT[] NOT NULL DEFAULT '{}',
  technologies TEXT[] NOT NULL DEFAULT '{}',
  responsibilities TEXT[] NOT NULL DEFAULT '{}',
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create education table
CREATE TABLE public.education (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  degree TEXT NOT NULL,
  school TEXT NOT NULL,
  location TEXT NOT NULL,
  period TEXT NOT NULL,
  gpa TEXT,
  achievements TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create certifications table
CREATE TABLE public.certifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  date TEXT NOT NULL,
  credential_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Create public read policies (since this is a portfolio website)
CREATE POLICY "Projects are publicly readable" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Experiences are publicly readable" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Education is publicly readable" ON public.education FOR SELECT USING (true);
CREATE POLICY "Certifications are publicly readable" ON public.certifications FOR SELECT USING (true);

-- Contact messages can only be inserted (no public read access)
CREATE POLICY "Anyone can insert contact messages" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_experiences_updated_at
  BEFORE UPDATE ON public.experiences
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_education_updated_at
  BEFORE UPDATE ON public.education
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_certifications_updated_at
  BEFORE UPDATE ON public.certifications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for projects
INSERT INTO public.projects (title, description, tags, category, date, github_url, live_url, featured) VALUES
('E-Commerce Platform', 'Full-stack e-commerce solution with React, Node.js, and Stripe integration', ARRAY['React', 'Node.js', 'MongoDB', 'Stripe'], 'fullstack', '2024', 'https://github.com', 'https://example.com', true),
('Task Management App', 'Collaborative project management tool with real-time updates', ARRAY['Vue.js', 'Express', 'Socket.io', 'PostgreSQL'], 'frontend', '2023', 'https://github.com', 'https://example.com', true),
('Weather Dashboard', 'Beautiful weather app with location-based forecasts and charts', ARRAY['React', 'TypeScript', 'Chart.js', 'API'], 'frontend', '2023', 'https://github.com', 'https://example.com', false),
('Restaurant POS System', 'Point of sale system for restaurants with inventory management', ARRAY['Next.js', 'Prisma', 'MySQL', 'TailwindCSS'], 'fullstack', '2023', 'https://github.com', 'https://example.com', false),
('AI Content Generator', 'Content generation tool powered by OpenAI API with custom templates', ARRAY['Python', 'FastAPI', 'OpenAI', 'Redis'], 'backend', '2024', 'https://github.com', 'https://example.com', true),
('Portfolio Website', 'Responsive portfolio website with dark mode and smooth animations', ARRAY['React', 'Framer Motion', 'TailwindCSS'], 'frontend', '2024', 'https://github.com', 'https://example.com', false);

-- Insert sample data for experiences
INSERT INTO public.experiences (title, company, location, period, type, description, achievements, technologies, responsibilities, order_index) VALUES
('Senior Full Stack Developer', 'TechFlow Inc.', 'San Francisco, CA', '2024 - Present', 'Full-time', 'Leading development of scalable web applications serving 100K+ users', 
ARRAY['Led a team of 6 developers in building a multi-tenant SaaS platform', 'Reduced application load time by 60% through optimization and caching strategies', 'Implemented CI/CD pipelines reducing deployment time from 2 hours to 15 minutes', 'Mentored 3 junior developers and conducted technical interviews'],
ARRAY['React', 'TypeScript', 'Node.js', 'AWS', 'Docker', 'PostgreSQL'],
ARRAY['Architecture design and technical decision making', 'Code review and quality assurance', 'Performance optimization and scalability planning', 'Team leadership and mentoring'], 0),

('Full Stack Developer', 'StartupHub', 'San Francisco, CA', '2022 - 2024', 'Full-time', 'Built MVP for 3 successful startups using React and Node.js',
ARRAY['Developed 3 successful MVP applications that secured $2M+ in funding', 'Built real-time collaboration features using WebSocket technology', 'Implemented OAuth integrations with Google, Microsoft, and Slack', 'Created automated testing suites achieving 90%+ code coverage'],
ARRAY['React', 'Vue.js', 'Node.js', 'Express', 'MongoDB', 'Redis'],
ARRAY['Full-stack application development', 'Database design and optimization', 'API development and integration', 'User interface design and implementation'], 1),

('Frontend Developer', 'Digital Agency Pro', 'Los Angeles, CA', '2021 - 2022', 'Full-time', 'Created responsive websites for Fortune 500 companies',
ARRAY['Delivered 15+ responsive websites for Fortune 500 clients', 'Improved website performance scores by average of 40%', 'Implemented accessibility features meeting WCAG 2.1 AA standards', 'Created component library used across 20+ projects'],
ARRAY['React', 'SASS', 'JavaScript', 'Webpack', 'Figma'],
ARRAY['Frontend development and optimization', 'Component library development', 'Cross-browser compatibility testing', 'Client communication and requirement gathering'], 2),

('Junior Web Developer', 'Creative Solutions', 'Remote', '2020 - 2021', 'Full-time', 'Developed interactive web applications and landing pages',
ARRAY['Built 25+ landing pages with average conversion rate of 15%', 'Developed custom WordPress themes and plugins', 'Implemented Google Analytics and tag management', 'Collaborated with design team on 10+ e-commerce projects'],
ARRAY['HTML', 'CSS', 'JavaScript', 'WordPress', 'PHP'],
ARRAY['Website development and maintenance', 'WordPress theme customization', 'Bug fixing and feature implementation', 'Client support and training'], 3);

-- Insert sample data for education
INSERT INTO public.education (degree, school, location, period, gpa, achievements) VALUES
('Bachelor of Science in Computer Science', 'Stanford University', 'Stanford, CA', '2016 - 2020', '3.8/4.0', 
ARRAY['Magna Cum Laude graduate', 'President of Computer Science Student Association', 'Published research on machine learning algorithms']);

-- Insert sample data for certifications
INSERT INTO public.certifications (name, issuer, date, credential_id) VALUES
('AWS Solutions Architect', 'Amazon Web Services', '2023', 'SAA-C03'),
('Professional Scrum Master', 'Scrum.org', '2022', 'PSM I'),
('Google Analytics Certified', 'Google', '2021', 'GAIQ');