import { useState, useEffect } from 'react';
import { ArrowDown, Github, Linkedin, Mail, Download, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Home = () => {
  const [typedText, setTypedText] = useState('');
  const roles = ['Full Stack Developer', 'UI/UX Designer', 'Tech Lead', 'Problem Solver'];
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const role = roles[currentRole];
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= role.length) {
        setTypedText(role.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [currentRole]);

  const skills = [
    'React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'GraphQL',
    'Docker', 'PostgreSQL', 'MongoDB', 'Redis', 'Kubernetes', 'Figma'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 hero-pattern opacity-20" />
        <div className="absolute inset-0 bg-gradient-hero opacity-30" />
        
        {/* Floating Elements - Responsive */}
        <div className="absolute top-20 left-4 lg:left-20 w-24 h-24 lg:w-32 lg:h-32 bg-gradient-primary rounded-full blur-3xl opacity-20 float" />
        <div className="absolute top-40 right-4 lg:right-32 w-32 h-32 lg:w-48 lg:h-48 bg-gradient-secondary rounded-full blur-3xl opacity-20 float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/4 w-20 h-20 lg:w-24 lg:h-24 bg-gradient-accent rounded-full blur-3xl opacity-20 float" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8 animate-fade-in-up">
            {/* Profile Image */}
            <div className="relative mx-auto w-32 h-32 mb-8">
              <div className="w-full h-full rounded-full bg-gradient-primary p-1 pulse-glow">
                <div className="w-full h-full rounded-full bg-muted flex items-center justify-center text-4xl font-bold text-primary">
                  AC
                </div>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                Hi, I'm <span className="gradient-text">Alex Chen</span>
              </h1>
              <div className="text-xl sm:text-2xl md:text-3xl text-muted-foreground min-h-[3rem] flex flex-col sm:flex-row items-center justify-center gap-2">
                <span>I'm a</span>
                <span className="text-primary font-semibold min-w-[200px] sm:min-w-[280px] text-center sm:text-left">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
              I craft digital experiences that blend beautiful design with robust functionality. 
              Specializing in modern web technologies and passionate about creating solutions that make a difference.
            </p>

            {/* Skills */}
            <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
              {skills.map((skill, index) => (
                <Badge 
                  key={skill} 
                  variant="secondary"
                  className="glass hover:bg-primary/20 transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {skill}
                </Badge>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300 group"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                View My Work
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="glass border-primary/20 hover:border-primary/40 hover:bg-primary/10"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-6 pt-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass hover:bg-primary/20 transition-all duration-300 hover:scale-110"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass hover:bg-primary/20 transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:alex@example.com"
                className="p-3 rounded-full glass hover:bg-primary/20 transition-all duration-300 hover:scale-110"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
            <ArrowDown className="w-6 h-6 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-20 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Projects Completed', value: '50+' },
              { label: 'Years Experience', value: '5+' },
              { label: 'Technologies Mastered', value: '20+' },
              { label: 'Happy Clients', value: '30+' },
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className="text-center space-y-2 glass p-6 rounded-2xl hover:shadow-card transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;