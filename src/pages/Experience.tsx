import { useState, useEffect } from 'react';
import { Calendar, MapPin, Building, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Experience = () => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set([0]));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const experiences = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      company: 'TechFlow Inc.',
      location: 'San Francisco, CA',
      period: '2024 - Present',
      type: 'Full-time',
      description: 'Leading development of scalable web applications serving 100K+ users',
      achievements: [
        'Led a team of 6 developers in building a multi-tenant SaaS platform',
        'Reduced application load time by 60% through optimization and caching strategies',
        'Implemented CI/CD pipelines reducing deployment time from 2 hours to 15 minutes',
        'Mentored 3 junior developers and conducted technical interviews'
      ],
      technologies: ['React', 'TypeScript', 'Node.js', 'AWS', 'Docker', 'PostgreSQL'],
      responsibilities: [
        'Architecture design and technical decision making',
        'Code review and quality assurance',
        'Performance optimization and scalability planning',
        'Team leadership and mentoring'
      ]
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'StartupHub',
      location: 'San Francisco, CA',
      period: '2022 - 2024',
      type: 'Full-time',
      description: 'Built MVP for 3 successful startups using React and Node.js',
      achievements: [
        'Developed 3 successful MVP applications that secured $2M+ in funding',
        'Built real-time collaboration features using WebSocket technology',
        'Implemented OAuth integrations with Google, Microsoft, and Slack',
        'Created automated testing suites achieving 90%+ code coverage'
      ],
      technologies: ['React', 'Vue.js', 'Node.js', 'Express', 'MongoDB', 'Redis'],
      responsibilities: [
        'Full-stack application development',
        'Database design and optimization',
        'API development and integration',
        'User interface design and implementation'
      ]
    },
    {
      id: 3,
      title: 'Frontend Developer',
      company: 'Digital Agency Pro',
      location: 'Los Angeles, CA',
      period: '2021 - 2022',
      type: 'Full-time',
      description: 'Created responsive websites for Fortune 500 companies',
      achievements: [
        'Delivered 15+ responsive websites for Fortune 500 clients',
        'Improved website performance scores by average of 40%',
        'Implemented accessibility features meeting WCAG 2.1 AA standards',
        'Created component library used across 20+ projects'
      ],
      technologies: ['React', 'SASS', 'JavaScript', 'Webpack', 'Figma'],
      responsibilities: [
        'Frontend development and optimization',
        'Component library development',
        'Cross-browser compatibility testing',
        'Client communication and requirement gathering'
      ]
    },
    {
      id: 4,
      title: 'Junior Web Developer',
      company: 'Creative Solutions',
      location: 'Remote',
      period: '2020 - 2021',
      type: 'Full-time',
      description: 'Developed interactive web applications and landing pages',
      achievements: [
        'Built 25+ landing pages with average conversion rate of 15%',
        'Developed custom WordPress themes and plugins',
        'Implemented Google Analytics and tag management',
        'Collaborated with design team on 10+ e-commerce projects'
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'WordPress', 'PHP'],
      responsibilities: [
        'Website development and maintenance',
        'WordPress theme customization',
        'Bug fixing and feature implementation',
        'Client support and training'
      ]
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'Stanford University',
      location: 'Stanford, CA',
      period: '2016 - 2020',
      gpa: '3.8/4.0',
      achievements: [
        'Magna Cum Laude graduate',
        'President of Computer Science Student Association',
        'Published research on machine learning algorithms'
      ]
    }
  ];

  const certifications = [
    {
      name: 'AWS Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023',
      id: 'SAA-C03'
    },
    {
      name: 'Professional Scrum Master',
      issuer: 'Scrum.org',
      date: '2022',
      id: 'PSM I'
    },
    {
      name: 'Google Analytics Certified',
      issuer: 'Google',
      date: '2021',
      id: 'GAIQ'
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4 reveal">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                My <span className="gradient-text">Experience</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                A detailed look at my professional journey, key achievements, and the technologies 
                I've mastered along the way
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto reveal">
              <div className="glass p-4 rounded-xl">
                <div className="text-2xl font-bold gradient-text">5+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="glass p-4 rounded-xl">
                <div className="text-2xl font-bold gradient-text">4</div>
                <div className="text-sm text-muted-foreground">Companies</div>
              </div>
              <div className="glass p-4 rounded-xl">
                <div className="text-2xl font-bold gradient-text">50+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="glass p-4 rounded-xl">
                <div className="text-2xl font-bold gradient-text">20+</div>
                <div className="text-sm text-muted-foreground">Technologies</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Experience</h2>
            <p className="text-xl text-muted-foreground">
              My career journey and key accomplishments
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-gradient-primary opacity-30" />

            <div className="space-y-8 md:space-y-16">
              {experiences.map((exp, index) => (
                <div 
                  key={exp.id}
                  className={`relative flex flex-col md:flex-row items-start ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } reveal`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Timeline node */}
                  <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-gradient-primary rounded-full flex items-center justify-center absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 top-6 z-10 shadow-lg">
                    <Building className="w-4 h-4 md:w-6 md:h-6 text-primary-foreground" />
                  </div>
                  
                  {/* Content */}
                  <div className={`flex-1 ml-20 md:ml-0 ${
                    index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                  } max-w-lg`}>
                    <Card className="glass border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                      <CardHeader className="pb-4">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                          <div className="space-y-2 flex-1">
                            <CardTitle className="text-lg md:text-xl leading-tight">{exp.title}</CardTitle>
                            <div className="flex items-center space-x-2 text-primary font-medium text-sm">
                              <Building className="w-4 h-4 flex-shrink-0" />
                              <span>{exp.company}</span>
                            </div>
                            <div className="flex flex-col space-y-1 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 flex-shrink-0" />
                                <span>{exp.period}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <MapPin className="w-4 h-4 flex-shrink-0" />
                                <span>{exp.location}</span>
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline" className="self-start">{exp.type}</Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4 pt-0">
                        <p className="text-muted-foreground leading-relaxed">{exp.description}</p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-1.5">
                          {exp.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs glass px-2 py-1">
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        {/* Expandable content */}
                        <div className="space-y-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleExpanded(index)}
                            className="h-auto p-2 text-primary hover:text-primary/80 hover:bg-primary/10 rounded-md transition-colors"
                          >
                            {expandedItems.has(index) ? (
                              <>
                                <ChevronUp className="w-4 h-4 mr-2" />
                                Show Less
                              </>
                            ) : (
                              <>
                                <ChevronDown className="w-4 h-4 mr-2" />
                                Show More Details
                              </>
                            )}
                          </Button>

                          {expandedItems.has(index) && (
                            <div className="space-y-4 animate-fade-in border-t border-border/50 pt-4">
                              <div>
                                <h4 className="font-semibold mb-3 flex items-center text-sm">
                                  <Award className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                                  Key Achievements
                                </h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                  {exp.achievements.map((achievement, i) => (
                                    <li key={i} className="flex items-start space-x-3">
                                      <div className="w-1.5 h-1.5 bg-gradient-primary rounded-full mt-2 flex-shrink-0" />
                                      <span className="leading-relaxed">{achievement}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-3 text-sm">Key Responsibilities</h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                  {exp.responsibilities.map((responsibility, i) => (
                                    <li key={i} className="flex items-start space-x-3">
                                      <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0" />
                                      <span className="leading-relaxed">{responsibility}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-20 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Education */}
            <div className="space-y-8">
              <div className="reveal">
                <h3 className="text-2xl font-bold mb-6">Education</h3>
                {education.map((edu, index) => (
                  <Card key={index} className="glass border-primary/20 hover:border-primary/40 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold leading-tight">{edu.degree}</h4>
                        <div className="flex items-center space-x-2 text-primary font-medium">
                          <Building className="w-4 h-4 flex-shrink-0" />
                          <span>{edu.school}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 flex-shrink-0" />
                            <span>{edu.period}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span>{edu.location}</span>
                          </div>
                          <Badge variant="outline" className="w-fit">GPA: {edu.gpa}</Badge>
                        </div>
                        <div className="pt-2">
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            {edu.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start space-x-3">
                                <div className="w-1.5 h-1.5 bg-gradient-primary rounded-full mt-2 flex-shrink-0" />
                                <span className="leading-relaxed">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-8">
              <div className="reveal">
                <h3 className="text-2xl font-bold mb-6">Certifications</h3>
                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <Card 
                      key={index} 
                      className="glass border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                          <div className="space-y-2 flex-1">
                            <h4 className="font-semibold leading-tight">{cert.name}</h4>
                            <p className="text-sm text-primary font-medium">{cert.issuer}</p>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3 flex-shrink-0" />
                                <span>{cert.date}</span>
                              </div>
                              <span className="hidden sm:inline">•</span>
                              <span>ID: {cert.id}</span>
                            </div>
                          </div>
                          <Badge variant="secondary" className="glass w-fit">
                            <Award className="w-3 h-3 mr-1" />
                            Certified
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Experience;