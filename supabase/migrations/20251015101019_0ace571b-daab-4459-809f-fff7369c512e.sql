-- Create personal_info table for managing homepage content
CREATE TABLE public.personal_info (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text NOT NULL DEFAULT 'Alex Chen',
  tagline text NOT NULL DEFAULT 'Full Stack Developer & Designer',
  description text NOT NULL DEFAULT 'I craft digital experiences that blend beautiful design with robust functionality.',
  profile_image_url text,
  resume_url text,
  github_url text,
  linkedin_url text,
  email text,
  roles text[] NOT NULL DEFAULT '{"Full Stack Developer", "UI/UX Designer", "Tech Lead", "Problem Solver"}',
  stats jsonb NOT NULL DEFAULT '[
    {"label": "Projects Completed", "value": "50+"},
    {"label": "Years Experience", "value": "5+"},
    {"label": "Technologies Mastered", "value": "20+"},
    {"label": "Happy Clients", "value": "30+"}
  ]'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.personal_info ENABLE ROW LEVEL SECURITY;

-- Anyone can view personal info
CREATE POLICY "Personal info is publicly readable"
ON public.personal_info
FOR SELECT
USING (true);

-- Only admins can update personal info
CREATE POLICY "Admins can update personal info"
ON public.personal_info
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can insert personal info
CREATE POLICY "Admins can insert personal info"
ON public.personal_info
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_personal_info_updated_at
BEFORE UPDATE ON public.personal_info
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default data
INSERT INTO public.personal_info (
  full_name,
  tagline,
  description,
  github_url,
  linkedin_url,
  email,
  roles,
  stats
) VALUES (
  'Alex Chen',
  'Full Stack Developer & Designer',
  'I craft digital experiences that blend beautiful design with robust functionality. Specializing in modern web technologies and passionate about creating solutions that make a difference.',
  'https://github.com',
  'https://linkedin.com',
  'alex@example.com',
  '{"Full Stack Developer", "UI/UX Designer", "Tech Lead", "Problem Solver"}',
  '[
    {"label": "Projects Completed", "value": "50+"},
    {"label": "Years Experience", "value": "5+"},
    {"label": "Technologies Mastered", "value": "20+"},
    {"label": "Happy Clients", "value": "30+"}
  ]'::jsonb
);