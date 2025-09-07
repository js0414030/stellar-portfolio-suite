import { useState } from 'react';
import { Search, Filter, Github, ExternalLink, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and Stripe integration',
      image: '/placeholder.svg',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      category: 'fullstack',
      date: '2024',
      github: 'https://github.com',
      live: 'https://example.com',
      featured: true
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative project management tool with real-time updates',
      image: '/placeholder.svg',
      tags: ['Vue.js', 'Express', 'Socket.io', 'PostgreSQL'],
      category: 'frontend',
      date: '2023',
      github: 'https://github.com',
      live: 'https://example.com',
      featured: true
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'Beautiful weather app with location-based forecasts and charts',
      image: '/placeholder.svg',
      tags: ['React', 'TypeScript', 'Chart.js', 'API'],
      category: 'frontend',
      date: '2023',
      github: 'https://github.com',
      live: 'https://example.com',
      featured: false
    },
    {
      id: 4,
      title: 'Restaurant POS System',
      description: 'Point of sale system for restaurants with inventory management',
      image: '/placeholder.svg',
      tags: ['Next.js', 'Prisma', 'MySQL', 'TailwindCSS'],
      category: 'fullstack',
      date: '2023',
      github: 'https://github.com',
      live: 'https://example.com',
      featured: false
    },
    {
      id: 5,
      title: 'AI Content Generator',
      description: 'Content generation tool powered by OpenAI API with custom templates',
      image: '/placeholder.svg',
      tags: ['Python', 'FastAPI', 'OpenAI', 'Redis'],
      category: 'backend',
      date: '2024',
      github: 'https://github.com',
      live: 'https://example.com',
      featured: true
    },
    {
      id: 6,
      title: 'Portfolio Website',
      description: 'Responsive portfolio website with dark mode and smooth animations',
      image: '/placeholder.svg',
      tags: ['React', 'Framer Motion', 'TailwindCSS'],
      category: 'frontend',
      date: '2024',
      github: 'https://github.com',
      live: 'https://example.com',
      featured: false
    }
  ];

  const tags = ['all', 'React', 'Vue.js', 'Node.js', 'Python', 'TypeScript', 'TailwindCSS'];
  const categories = ['all', 'frontend', 'backend', 'fullstack'];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'all' || project.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4 reveal">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                My <span className="gradient-text">Projects</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                A collection of projects that showcase my skills and passion for creating 
                innovative digital solutions
              </p>
            </div>

            {/* Featured Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto reveal">
              <div className="glass p-4 rounded-xl">
                <div className="text-2xl font-bold gradient-text">50+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="glass p-4 rounded-xl">
                <div className="text-2xl font-bold gradient-text">5</div>
                <div className="text-sm text-muted-foreground">Years</div>
              </div>
              <div className="glass p-4 rounded-xl">
                <div className="text-2xl font-bold gradient-text">20+</div>
                <div className="text-sm text-muted-foreground">Technologies</div>
              </div>
              <div className="glass p-4 rounded-xl">
                <div className="text-2xl font-bold gradient-text">30+</div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-12 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass border-primary/20 focus:border-primary/40"
              />
            </div>

            {/* Tags Filter */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(tag)}
                  className={selectedTag === tag ? 
                    "bg-gradient-primary hover:shadow-glow" : 
                    "glass border-primary/20 hover:border-primary/40 hover:bg-primary/10"
                  }
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card 
                key={project.id}
                className={`group glass border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-card hover:-translate-y-2 ${
                  project.featured ? 'ring-2 ring-primary/20' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="p-0">
                  {/* Project Image */}
                  <div className="relative overflow-hidden rounded-t-xl h-48 bg-gradient-primary/20">
                    <div className="absolute inset-0 bg-gradient-hero/30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl font-bold text-primary/50">
                        {project.title.charAt(0)}
                      </div>
                    </div>
                    
                    {/* Overlay with links */}
                    <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="glass border-primary/20"
                        asChild
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-primary"
                        asChild
                      >
                        <a href={project.live} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                    
                    {project.featured && (
                      <Badge className="absolute top-4 left-4 bg-gradient-accent">
                        Featured
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                          <Link to={`/projects/${project.id}`}>
                            {project.title}
                          </Link>
                        </CardTitle>
                        <Badge variant="outline" className="text-xs">
                          <Calendar className="w-3 h-3 mr-1" />
                          {project.date}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="secondary" 
                          className="text-xs glass"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex space-x-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 glass border-primary/20 hover:border-primary/40"
                        asChild
                      >
                        <Link to={`/projects/${project.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No projects found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;