import { useEffect, useRef } from 'react';
import { Calendar, MapPin, Award, Users, Code, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SEOHead from '@/components/SEOHead';
import { useSkills } from '@/hooks/useSkills';
import { usePersonalInfo } from '@/hooks/usePersonalInfo';
import { useExperiences, useEducation } from '@/hooks/useExperience';

const About = () => {
  const skillsRef = useRef<HTMLDivElement>(null);
  const { skills: fetchedSkills, loading: skillsLoading } = useSkills();
  const { personalInfo, loading: personalLoading } = usePersonalInfo();
  const { experiences: fetchedExperiences, loading: experiencesLoading } = useExperiences();
  const { education: fetchedEducation, loading: educationLoading } = useEducation();
  
  const loading = personalLoading && experiencesLoading && educationLoading && skillsLoading;

  useEffect(() => {
    requestAnimationFrame(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
            }
          });
        },
        { threshold: 0.01, rootMargin: '100px' }
      );

      const elements = document.querySelectorAll('.reveal');
      elements.forEach((el) => observer.observe(el));
    });
  }, []);

  // Combine work experiences and education from backend
  const experiences = [
    ...(fetchedExperiences || []).map(exp => ({
      year: exp.period.split('-')[0].trim(),
      title: exp.title,
      company: exp.company,
      description: exp.description,
      type: 'work' as const
    })),
    ...(fetchedEducation || []).map(edu => ({
      year: edu.period.split('-')[0].trim(),
      title: edu.degree,
      company: edu.school,
      description: edu.achievements?.[0] || `Studied at ${edu.school}`,
      type: 'education' as const
    }))
  ].sort((a, b) => parseInt(b.year) - parseInt(a.year));

  // Group skills by category from database or use defaults
  const skillsByCategory = fetchedSkills.length > 0 
    ? fetchedSkills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
          acc[skill.category] = [];
        }
        acc[skill.category].push({ 
          name: skill.name, 
          level: skill.level ? parseInt(skill.level) : 80 
        });
        return acc;
      }, {} as Record<string, { name: string; level: number }[]>)
    : {};

  const skills = Object.keys(skillsByCategory).length > 0
    ? Object.entries(skillsByCategory).map(([category, items]) => ({
        category,
        icon: category.toLowerCase().includes('design') 
          ? <Palette className="w-5 h-5" />
          : <Code className="w-5 h-5" />,
        items
      }))
    : [
        {
          category: 'Frontend',
          icon: <Code className="w-5 h-5" />,
          items: [
            { name: 'React/Next.js', level: 95 },
            { name: 'TypeScript', level: 90 },
            { name: 'Tailwind CSS', level: 95 },
            { name: 'Vue.js', level: 80 }
          ]
        },
        {
          category: 'Backend',
          icon: <Code className="w-5 h-5" />,
          items: [
            { name: 'Node.js', level: 90 },
            { name: 'Python', level: 85 },
            { name: 'PostgreSQL', level: 88 },
            { name: 'GraphQL', level: 82 }
          ]
        },
        {
          category: 'Design',
          icon: <Palette className="w-5 h-5" />,
          items: [
            { name: 'Figma', level: 90 },
            { name: 'UI/UX Design', level: 85 },
            { name: 'Prototyping', level: 88 },
            { name: 'Design Systems', level: 92 }
          ]
        }
      ];

  return (
    <>
      <SEOHead 
        title={`About - ${personalInfo?.full_name || 'Portfolio'}`}
        description={`Learn about ${personalInfo?.full_name || 'me'}, ${personalInfo?.description || 'a passionate developer building amazing web applications.'}`}
        keywords="about, full stack developer, experience, skills, background"
        url={`${window.location.origin}/about`}
      />
      <div className="min-h-screen">
        <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 reveal">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  About <span className="gradient-text">Me</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Passionate developer with a mission to create digital experiences that matter
                </p>
              </div>

              <div className="prose prose-lg text-muted-foreground">
                <p>
                  I'm a full-stack developer with over 5 years of experience building scalable web applications. 
                  My journey began with a fascination for how technology can solve real-world problems and create 
                  meaningful user experiences.
                </p>
                <p>
                  I specialize in modern JavaScript frameworks, cloud architecture, and user-centered design. 
                  When I'm not coding, you'll find me exploring new technologies, contributing to open source, 
                  or mentoring aspiring developers.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="glass">
                  <MapPin className="w-4 h-4 mr-2" />
                  San Francisco, CA
                </Badge>
                <Badge variant="secondary" className="glass">
                  <Users className="w-4 h-4 mr-2" />
                  Available for hire
                </Badge>
                <Badge variant="secondary" className="glass">
                  <Award className="w-4 h-4 mr-2" />
                  5+ Years Experience
                </Badge>
              </div>

              <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300" asChild>
                <a href="/resume.pdf" download>
                  Download Resume
                </a>
              </Button>
            </div>

             <div className="reveal">
               <div className="relative">
                 <div className="w-full h-96 bg-gradient-primary rounded-2xl p-1 pulse-glow">
                   {personalInfo?.profile_image_url ? (
                     <img 
                       src={personalInfo.profile_image_url} 
                       alt={personalInfo.full_name}
                       className="w-full h-full rounded-xl object-cover"
                     />
                   ) : (
                     <div className="w-full h-full rounded-xl bg-muted flex items-center justify-center text-6xl font-bold text-primary">
                       {personalInfo?.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'AC'}
                     </div>
                   )}
                 </div>
                 {/* Floating stats */}
                 {personalInfo?.stats?.[0] && (
                   <div className="absolute -top-6 -right-6 glass p-4 rounded-xl">
                     <div className="text-2xl font-bold gradient-text">{personalInfo.stats[0].value}</div>
                     <div className="text-sm text-muted-foreground">{personalInfo.stats[0].label}</div>
                   </div>
                 )}
                 {personalInfo?.stats?.[3] && (
                   <div className="absolute -bottom-6 -left-6 glass p-4 rounded-xl">
                     <div className="text-2xl font-bold gradient-text">{personalInfo.stats[3].value}</div>
                     <div className="text-sm text-muted-foreground">{personalInfo.stats[3].label}</div>
                   </div>
                 )}
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Journey</h2>
            <p className="text-xl text-muted-foreground">
              A timeline of my professional growth and key milestones
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-primary opacity-30" />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div 
                  key={index}
                  className="relative flex items-start space-x-8 reveal"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary-foreground" />
                  </div>
                  
                  <Card className="flex-1 glass border-primary/20 hover:border-primary/40 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <Badge 
                          variant={exp.type === 'work' ? 'default' : 'secondary'}
                          className="mb-2"
                        >
                          {exp.year}
                        </Badge>
                        <Badge variant="outline">
                          {exp.type === 'work' ? 'Work' : 'Education'}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                      <p className="text-primary font-medium mb-2">{exp.company}</p>
                      <p className="text-muted-foreground">{exp.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-surface/50" ref={skillsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Expertise</h2>
            <p className="text-xl text-muted-foreground">
              Technologies and tools I work with to bring ideas to life
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skillCategory, categoryIndex) => (
              <Card 
                key={skillCategory.category}
                className="glass border-primary/20 hover:border-primary/40 transition-all duration-300 reveal"
                style={{ animationDelay: `${categoryIndex * 0.2}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-gradient-primary rounded-lg">
                      {skillCategory.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{skillCategory.category}</h3>
                  </div>

                  <div className="space-y-4">
                    {skillCategory.items.map((skill, skillIndex) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="skill-bar">
                          <div 
                            className="skill-progress"
                            style={{ 
                              width: `${skill.level}%`,
                              transitionDelay: `${categoryIndex * 0.2 + skillIndex * 0.1}s`
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          </div>
         </section>
         </div>
       </div>
     </>
   );
 };
 
 export default About;