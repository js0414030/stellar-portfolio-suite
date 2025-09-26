import { useState } from 'react';
import { Search, Calendar, Clock, Tag, User, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  const posts = [
    {
      id: 1,
      slug: 'building-scalable-react-applications',
      title: 'Building Scalable React Applications: Best Practices and Patterns',
      excerpt: 'Learn the essential patterns and practices for building maintainable React applications that can scale with your team and user base.',
      content: 'Full content here...',
      author: 'Alex Chen',
      date: '2024-01-15',
      readTime: '8 min read',
      tags: ['React', 'JavaScript', 'Architecture'],
      category: 'Development',
      featured: true,
      views: 1250
    },
    {
      id: 2,
      slug: 'typescript-advanced-patterns',
      title: 'Advanced TypeScript Patterns for Better Developer Experience',
      excerpt: 'Explore advanced TypeScript techniques that will make your code more type-safe, maintainable, and developer-friendly.',
      content: 'Full content here...',
      author: 'Alex Chen',
      date: '2024-01-10',
      readTime: '12 min read',
      tags: ['TypeScript', 'JavaScript', 'DX'],
      category: 'Development',
      featured: true,
      views: 980
    },
    {
      id: 3,
      slug: 'modern-css-techniques',
      title: 'Modern CSS Techniques: From Grid to Container Queries',
      excerpt: 'Discover the latest CSS features and how to use them to create responsive, beautiful layouts with less code.',
      content: 'Full content here...',
      author: 'Alex Chen',
      date: '2024-01-05',
      readTime: '6 min read',
      tags: ['CSS', 'Design', 'Frontend'],
      category: 'Design',
      featured: false,
      views: 750
    },
    {
      id: 4,
      slug: 'nodejs-performance-optimization',
      title: 'Node.js Performance Optimization: From Theory to Practice',
      excerpt: 'Comprehensive guide to optimizing Node.js applications for production, covering profiling, caching, and scaling strategies.',
      content: 'Full content here...',
      author: 'Alex Chen',
      date: '2023-12-28',
      readTime: '15 min read',
      tags: ['Node.js', 'Performance', 'Backend'],
      category: 'Development',
      featured: false,
      views: 1100
    },
    {
      id: 5,
      slug: 'ux-principles-developers',
      title: 'UX Principles Every Developer Should Know',
      excerpt: 'Bridge the gap between development and design by understanding fundamental UX principles that improve user satisfaction.',
      content: 'Full content here...',
      author: 'Alex Chen',
      date: '2023-12-20',
      readTime: '7 min read',
      tags: ['UX', 'Design', 'Development'],
      category: 'Design',
      featured: false,
      views: 650
    },
    {
      id: 6,
      slug: 'docker-development-workflow',
      title: 'Streamlining Development with Docker and Docker Compose',
      excerpt: 'Learn how to create efficient development environments using Docker, from basic containers to complex multi-service setups.',
      content: 'Full content here...',
      author: 'Alex Chen',
      date: '2023-12-15',
      readTime: '10 min read',
      tags: ['Docker', 'DevOps', 'Workflow'],
      category: 'DevOps',
      featured: false,
      views: 890
    }
  ];

  const tags = ['all', 'React', 'TypeScript', 'JavaScript', 'CSS', 'Node.js', 'Design', 'DevOps'];
  const categories = ['All', 'Development', 'Design', 'DevOps'];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <>
      <SEOHead 
        title="Blog - Alex Chen"
        description="Read my latest thoughts on web development, technology trends, and programming tutorials. Insights from a full stack developer's journey."
        keywords="blog, web development, programming, tutorials, technology, react, javascript, alex chen"
        url="https://alexchen.dev/blog"
      />
      <div className="min-h-screen">
        <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4 reveal">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                My <span className="gradient-text">Blog</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Insights, tutorials, and thoughts on web development, design, and technology. 
                Sharing knowledge gained from building real-world applications.
              </p>
            </div>

            {/* Blog Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto reveal">
              <div className="glass p-4 rounded-xl">
                <div className="text-2xl font-bold gradient-text">{posts.length}</div>
                <div className="text-sm text-muted-foreground">Articles</div>
              </div>
              <div className="glass p-4 rounded-xl">
                <div className="text-2xl font-bold gradient-text">
                  {posts.reduce((acc, post) => acc + post.views, 0).toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Total Views</div>
              </div>
              <div className="glass p-4 rounded-xl">
                <div className="text-2xl font-bold gradient-text">
                  {Math.round(posts.reduce((acc, post) => acc + parseInt(post.readTime), 0) / posts.length)}
                </div>
                <div className="text-sm text-muted-foreground">Avg. Read Time</div>
              </div>
              <div className="glass p-4 rounded-xl">
                <div className="text-2xl font-bold gradient-text">
                  {new Set(posts.flatMap(post => post.tags)).size}
                </div>
                <div className="text-sm text-muted-foreground">Topics</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search articles..."
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

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8 reveal">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <Card 
                  key={post.id}
                  className="group glass border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-card hover:-translate-y-2 reveal"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="p-0">
                    {/* Post Image Placeholder */}
                    <div className="relative overflow-hidden rounded-t-xl h-48 bg-gradient-primary/20">
                      <div className="absolute inset-0 bg-gradient-hero/30" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-3xl font-bold text-primary/50">
                          {post.title.charAt(0)}
                        </div>
                      </div>
                      <Badge className="absolute top-4 left-4 bg-gradient-accent">
                        Featured
                      </Badge>
                      <Badge 
                        variant="secondary" 
                        className="absolute top-4 right-4 glass"
                      >
                        {post.category}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Meta Info */}
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                      </div>

                      {/* Title and Excerpt */}
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300 line-clamp-2">
                          <Link to={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {post.tags.map((tag) => (
                          <Badge 
                            key={tag} 
                            variant="secondary" 
                            className="text-xs glass"
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Read More */}
                      <Link 
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-300 font-medium"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {featuredPosts.length > 0 && (
            <h2 className="text-2xl font-bold mb-8 reveal">All Articles</h2>
          )}
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <Card 
                key={post.id}
                className="group glass border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-card hover:-translate-y-2 reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="p-0">
                  {/* Post Image Placeholder */}
                  <div className="relative overflow-hidden rounded-t-xl h-40 bg-gradient-secondary/20">
                    <div className="absolute inset-0 bg-gradient-hero/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-2xl font-bold text-secondary/50">
                        {post.title.charAt(0)}
                      </div>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="absolute top-3 right-3 glass text-xs"
                    >
                      {post.category}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Title and Excerpt */}
                    <div className="space-y-2">
                      <h3 className="font-semibold group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        <Link to={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="secondary" 
                          className="text-xs glass"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs glass">
                          +{post.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Read More */}
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-300 text-sm font-medium"
                    >
                      Read More
                      <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No articles found matching your criteria.
              </p>
            </div>
          )}
          </div>
        </section>
        </div>
      </div>
    </>
  );
};

export default Blog;