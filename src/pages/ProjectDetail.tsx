import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, Calendar, User, Code, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ProjectDetail = () => {
  const { id } = useParams();

  // Mock project data - in real app, fetch from API
  const project = {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A comprehensive e-commerce solution built with modern technologies',
    longDescription: `This project is a full-featured e-commerce platform that provides businesses with everything they need to sell online. The platform includes a modern storefront, comprehensive admin dashboard, payment processing, inventory management, and customer relationship tools.

The frontend is built with React and TypeScript for type safety and maintainability. The backend uses Node.js with Express and MongoDB for scalable data storage. The application features real-time inventory updates, secure payment processing through Stripe, and a responsive design that works seamlessly across all devices.

Key features include user authentication, shopping cart functionality, order management, payment processing, admin dashboard, inventory tracking, and customer support tools.`,
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    tags: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Stripe', 'TailwindCSS'],
    category: 'Full Stack',
    date: '2024',
    duration: '3 months',
    role: 'Lead Developer',
    team: '4 people',
    github: 'https://github.com',
    live: 'https://example.com',
    challenges: [
      'Implementing real-time inventory synchronization across multiple sales channels',
      'Designing a scalable architecture to handle high traffic during sales events',
      'Creating an intuitive admin interface for non-technical users',
      'Ensuring PCI compliance for payment processing'
    ],
    solutions: [
      'Used WebSocket connections for real-time updates with fallback to polling',
      'Implemented horizontal scaling with load balancers and database clustering',
      'Conducted extensive user testing and iterative design improvements',
      'Integrated Stripe for secure, compliant payment processing'
    ],
    results: [
      '40% increase in conversion rate compared to previous platform',
      '99.9% uptime during Black Friday sales event',
      '50% reduction in customer support tickets',
      'Positive feedback from 95% of merchant users'
    ]
  };

  if (!project) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <Link to="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-hero/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Back Button */}
            <Link to="/projects">
              <Button variant="outline" className="glass border-primary/20 hover:border-primary/40">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
              </Button>
            </Link>

            {/* Project Header */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="glass">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                {project.title}
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl">
                {project.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  asChild
                >
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Live Demo
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  className="glass border-primary/20 hover:border-primary/40"
                  asChild
                >
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    View Source Code
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Images */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.images.map((image, index) => (
              <div 
                key={index}
                className="aspect-video bg-gradient-primary/20 rounded-xl overflow-hidden group hover:scale-105 transition-transform duration-300"
              >
                <div className="w-full h-full bg-gradient-hero/30 flex items-center justify-center">
                  <div className="text-2xl font-bold text-primary/50">
                    Screenshot {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-12 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <Card className="glass border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lightbulb className="w-5 h-5 text-primary" />
                    <span>Project Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg text-muted-foreground">
                  {project.longDescription.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </CardContent>
              </Card>

              {/* Challenges */}
              <Card className="glass border-primary/20">
                <CardHeader>
                  <CardTitle>Challenges & Solutions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {project.challenges.map((challenge, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-semibold text-destructive">Challenge:</h4>
                      <p className="text-muted-foreground">{challenge}</p>
                      <h4 className="font-semibold text-success">Solution:</h4>
                      <p className="text-muted-foreground">{project.solutions[index]}</p>
                      {index < project.challenges.length - 1 && (
                        <hr className="border-border my-4" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Results */}
              <Card className="glass border-primary/20">
                <CardHeader>
                  <CardTitle>Results & Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {project.results.map((result, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-gradient-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{result}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Info */}
              <Card className="glass border-primary/20">
                <CardHeader>
                  <CardTitle>Project Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-primary" />
                    <div>
                      <div className="text-sm text-muted-foreground">Year</div>
                      <div className="font-medium">{project.date}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Code className="w-4 h-4 text-primary" />
                    <div>
                      <div className="text-sm text-muted-foreground">Category</div>
                      <div className="font-medium">{project.category}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <User className="w-4 h-4 text-primary" />
                    <div>
                      <div className="text-sm text-muted-foreground">Role</div>
                      <div className="font-medium">{project.role}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-primary" />
                    <div>
                      <div className="text-sm text-muted-foreground">Duration</div>
                      <div className="font-medium">{project.duration}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Technologies Used */}
              <Card className="glass border-primary/20">
                <CardHeader>
                  <CardTitle>Technologies Used</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="glass">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Next Project */}
              <Card className="glass border-primary/20">
                <CardHeader>
                  <CardTitle>Next Project</CardTitle>
                </CardHeader>
                <CardContent>
                  <Link to="/projects/2" className="block hover:text-primary transition-colors">
                    <div className="font-medium">Task Management App</div>
                    <div className="text-sm text-muted-foreground">Collaborative project management tool</div>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;