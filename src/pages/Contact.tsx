import { useState, useEffect } from 'react';
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SEOHead from '@/components/SEOHead';
import { useContactForm } from '@/hooks/useContactForm';
import { usePersonalInfo } from '@/hooks/usePersonalInfo';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const { submitContactForm, isSubmitting, isSubmitted } = useContactForm();
  const { personalInfo, loading } = usePersonalInfo();

  useEffect(() => {
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

    // Wait for DOM to be ready
    requestAnimationFrame(() => {
      const elements = document.querySelectorAll('.reveal');
      elements.forEach((el) => observer.observe(el));
    });

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await submitContactForm(formData);
    
    if (result.success) {
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  const contactInfo = [
    ...(personalInfo?.email ? [{
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`
    }] : []),
    ...(personalInfo?.phone ? [{
      icon: <Phone className="w-5 h-5" />,
      label: 'Phone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone.replace(/\D/g, '')}`
    }] : []),
    ...(personalInfo?.location ? [{
      icon: <MapPin className="w-5 h-5" />,
      label: 'Location',
      value: personalInfo.location,
      href: 'https://maps.google.com'
    }] : [])
  ];

  const socialLinks = [
    ...(personalInfo?.github_url ? [{
      name: 'GitHub',
      icon: <Github className="w-5 h-5" />,
      url: personalInfo.github_url,
      color: 'hover:text-gray-900'
    }] : []),
    ...(personalInfo?.linkedin_url ? [{
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      url: personalInfo.linkedin_url,
      color: 'hover:text-blue-600'
    }] : []),
    ...(personalInfo?.twitter_url ? [{
      name: 'Twitter',
      icon: <Twitter className="w-5 h-5" />,
      url: personalInfo.twitter_url,
      color: 'hover:text-blue-400'
    }] : [])
  ];

  const services = personalInfo?.services || [];

  return (
    <>
      <SEOHead 
        title={`Contact - ${personalInfo?.full_name || 'Portfolio'}`}
        description={`Get in touch with ${personalInfo?.full_name || 'me'} for freelance projects, collaborations, or consulting opportunities.`}
        keywords="contact, hire, freelance, full stack developer, collaboration"
        url={`${window.location.origin}/contact`}
      />
      <div className="min-h-screen">
        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-pulse text-lg">Loading...</div>
          </div>
        ) : (
        <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4 reveal">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Let's <span className="gradient-text">Connect</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Have a project in mind? Want to collaborate? I'd love to hear from you. 
                Let's discuss how we can bring your ideas to life.
              </p>
            </div>

            {/* Quick Contact Info */}
            <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto reveal">
              {contactInfo.map((info, index) => (
                <a
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="glass p-4 rounded-xl hover:border-primary/40 transition-all duration-300 hover:scale-105 group"
                >
                  <div className="text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                    {info.icon}
                  </div>
                  <div className="text-sm text-muted-foreground">{info.label}</div>
                  <div className="font-medium">{info.value}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-8 reveal">
              <div>
                <h2 className="text-3xl font-bold mb-4">Send Me a Message</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and I'll get back to you within 24 hours.
                </p>
              </div>

              {isSubmitted && (
                <Card className="border-success bg-success/10">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 text-success">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Message sent successfully!</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Thank you for reaching out. I'll get back to you soon.
                    </p>
                  </CardContent>
                </Card>
              )}

              <Card className="glass border-primary/20">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="glass border-primary/20 focus:border-primary/40"
                          placeholder="Your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="glass border-primary/20 focus:border-primary/40"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="glass border-primary/20 focus:border-primary/40"
                        placeholder="What's this about?"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="glass border-primary/20 focus:border-primary/40"
                        placeholder="Tell me about your project or how I can help..."
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Services & Info */}
            <div className="space-y-8 reveal">
              <div>
                <h2 className="text-3xl font-bold mb-4">What I Can Help With</h2>
                <p className="text-muted-foreground">
                  I offer a range of services to help bring your digital vision to life.
                </p>
              </div>

              <div className="space-y-4">
                {services.map((service, index) => (
                  <Card 
                    key={service.title}
                    className="glass border-primary/20 hover:border-primary/40 transition-all duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-muted-foreground text-sm mb-3">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {service.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs glass">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Social Links */}
              <Card className="glass border-primary/20">
                <CardHeader>
                  <CardTitle>Let's Connect</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Follow me on social media for updates and insights.
                  </p>
                  <div className="flex space-x-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 rounded-full glass hover:bg-primary/20 transition-all duration-300 hover:scale-110 ${social.color}`}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Availability */}
              <Card className="glass border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                    <span className="font-medium">Available for new projects</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    I'm currently accepting new freelance projects and consulting opportunities. 
                    Let's discuss your next big idea!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          </div>
        </section>
        </div>
        )}
      </div>
    </>
  );
};

export default Contact;