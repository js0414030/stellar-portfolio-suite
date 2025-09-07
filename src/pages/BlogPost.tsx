import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const BlogPost = () => {
  const { slug } = useParams();

  // Mock blog post data - in real app, fetch from API
  const post = {
    id: 1,
    slug: 'building-scalable-react-applications',
    title: 'Building Scalable React Applications: Best Practices and Patterns',
    excerpt: 'Learn the essential patterns and practices for building maintainable React applications that can scale with your team and user base.',
    content: `
# Building Scalable React Applications: Best Practices and Patterns

When building React applications that need to scale, whether in terms of codebase size, team size, or user base, following the right patterns and practices is crucial. In this comprehensive guide, we'll explore the key strategies that will help you build maintainable and scalable React applications.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Component Architecture](#component-architecture)
3. [State Management](#state-management)
4. [Performance Optimization](#performance-optimization)
5. [Testing Strategy](#testing-strategy)
6. [Conclusion](#conclusion)

## Project Structure

A well-organized project structure is the foundation of any scalable application. Here's a recommended structure for React applications:

\`\`\`
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (buttons, inputs, etc.)
│   └── common/         # Common business components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── lib/                # Third-party library configurations
├── types/              # TypeScript type definitions
└── styles/             # Global styles and themes
\`\`\`

### Component Organization

Organize components by feature rather than by type. This makes it easier to find related files and promotes better code cohesion:

\`\`\`
src/
├── features/
│   ├── authentication/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   └── dashboard/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       └── types/
\`\`\`

## Component Architecture

### 1. Composition over Inheritance

React promotes composition over inheritance. Build complex UIs by combining simpler components rather than extending them.

\`\`\`jsx
// Good: Composition
function Card({ children, className, ...props }) {
  return (
    <div className={\`card \${className}\`} {...props}>
      {children}
    </div>
  );
}

function UserCard({ user }) {
  return (
    <Card className="user-card">
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </Card>
  );
}
\`\`\`

### 2. Single Responsibility Principle

Each component should have a single responsibility. This makes components easier to test, reuse, and maintain.

\`\`\`jsx
// Good: Single responsibility
function UserAvatar({ src, alt, size = "medium" }) {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16"
  };

  return (
    <img 
      src={src} 
      alt={alt} 
      className={\`rounded-full \${sizeClasses[size]}\`}
    />
  );
}

function UserInfo({ name, email }) {
  return (
    <div>
      <h3 className="font-semibold">{name}</h3>
      <p className="text-gray-600">{email}</p>
    </div>
  );
}
\`\`\`

### 3. Props Interface Design

Design clear and predictable props interfaces. Use TypeScript to enforce type safety.

\`\`\`tsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

function Button({ 
  variant, 
  size, 
  disabled, 
  loading, 
  children, 
  onClick 
}: ButtonProps) {
  // Implementation
}
\`\`\`

## State Management

### 1. Local State vs Global State

Not all state needs to be global. Use the principle of "lift state up" only when necessary.

\`\`\`jsx
// Local state for component-specific data
function SearchInput({ onSearch }) {
  const [query, setQuery] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <button type="submit">Search</button>
    </form>
  );
}
\`\`\`

### 2. Custom Hooks for State Logic

Extract complex state logic into custom hooks for reusability and testing.

\`\`\`jsx
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

// Usage
function UserProfile({ userId }) {
  const { data: user, loading, error } = useApi(\`/api/users/\${userId}\`);
  
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return <UserCard user={user} />;
}
\`\`\`

## Performance Optimization

### 1. Memoization

Use React.memo, useMemo, and useCallback strategically to prevent unnecessary re-renders.

\`\`\`jsx
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  const expensiveValue = useMemo(() => {
    return data.reduce((acc, item) => acc + item.value, 0);
  }, [data]);

  return <div>{expensiveValue}</div>;
});
\`\`\`

### 2. Code Splitting

Split your code by routes and features to reduce initial bundle size.

\`\`\`jsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
\`\`\`

## Testing Strategy

### 1. Component Testing

Test components in isolation using React Testing Library.

\`\`\`jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

test('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  fireEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
\`\`\`

### 2. Custom Hook Testing

Test custom hooks using @testing-library/react-hooks.

\`\`\`jsx
import { renderHook, act } from '@testing-library/react-hooks';
import useCounter from './useCounter';

test('should increment counter', () => {
  const { result } = renderHook(() => useCounter());
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});
\`\`\`

## Conclusion

Building scalable React applications requires careful consideration of architecture, state management, performance, and testing. By following these patterns and best practices, you'll create applications that can grow with your needs while remaining maintainable and performant.

Remember that scalability isn't just about handling more users or data—it's also about making your codebase manageable as your team and feature set grows. The patterns discussed in this article will help you achieve both technical and organizational scalability.

### Key Takeaways

- Organize your project structure by feature, not by file type
- Keep components small and focused on a single responsibility
- Use composition to build complex UIs from simple components
- Choose the right state management solution for your needs
- Optimize performance strategically, not prematurely
- Write tests that give you confidence in your code

Happy coding!
    `,
    author: 'Alex Chen',
    date: '2024-01-15',
    readTime: '8 min read',
    tags: ['React', 'JavaScript', 'Architecture', 'Best Practices'],
    category: 'Development',
    views: 1250,
    likes: 89,
    shares: 23
  };

  if (!post) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Link to="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Article Header */}
      <section className="py-12 bg-gradient-hero/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Back Button */}
            <Link to="/blog">
              <Button variant="outline" className="glass border-primary/20 hover:border-primary/40">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>

            {/* Article Meta */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="glass">
                  {post.category}
                </Badge>
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="glass">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                {post.title}
              </h1>
              
              <p className="text-xl text-muted-foreground">
                {post.excerpt}
              </p>

              {/* Author and Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-foreground">AC</span>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{post.author}</div>
                    <div className="text-xs">Full Stack Developer</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
                
                <div className="text-xs">
                  {post.views.toLocaleString()} views
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4 pt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="glass border-primary/20 hover:border-primary/40"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="glass border-primary/20 hover:border-primary/40"
                >
                  <Bookmark className="w-4 h-4 mr-2" />
                  Bookmark
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-3">
              <div className="prose prose-lg max-w-none text-muted-foreground prose-headings:text-foreground prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-a:text-primary prose-code:text-primary prose-code:bg-muted/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border prose-pre:border-border">
                {/* Article content would be rendered here - in a real app, you'd parse markdown */}
                <div className="space-y-6">
                  <p>
                    When building React applications that need to scale, whether in terms of codebase size, 
                    team size, or user base, following the right patterns and practices is crucial. In this 
                    comprehensive guide, we'll explore the key strategies that will help you build maintainable 
                    and scalable React applications.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4">Project Structure</h2>
                  <p>
                    A well-organized project structure is the foundation of any scalable application. 
                    Here's a recommended structure for React applications:
                  </p>

                  <Card className="glass border-primary/20 my-6">
                    <CardContent className="p-4">
                      <pre className="text-sm overflow-x-auto">
{`src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components
│   └── common/         # Common business components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── lib/                # Third-party configurations
├── types/              # TypeScript definitions
└── styles/             # Global styles`}
                      </pre>
                    </CardContent>
                  </Card>

                  <h2 className="text-2xl font-bold mt-8 mb-4">Component Architecture</h2>
                  <p>
                    React promotes composition over inheritance. Build complex UIs by combining simpler 
                    components rather than extending them. Each component should have a single responsibility, 
                    making them easier to test, reuse, and maintain.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4">State Management</h2>
                  <p>
                    Not all state needs to be global. Use the principle of "lift state up" only when necessary. 
                    Extract complex state logic into custom hooks for reusability and testing.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4">Performance Optimization</h2>
                  <p>
                    Use React.memo, useMemo, and useCallback strategically to prevent unnecessary re-renders. 
                    Split your code by routes and features to reduce initial bundle size.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
                  <p>
                    Building scalable React applications requires careful consideration of architecture, 
                    state management, performance, and testing. By following these patterns and best practices, 
                    you'll create applications that can grow with your needs while remaining maintainable and performant.
                  </p>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Table of Contents */}
              <Card className="glass border-primary/20 sticky top-24">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Table of Contents</h3>
                  <nav className="space-y-2 text-sm">
                    <a href="#project-structure" className="block text-muted-foreground hover:text-primary transition-colors">
                      Project Structure
                    </a>
                    <a href="#component-architecture" className="block text-muted-foreground hover:text-primary transition-colors">
                      Component Architecture
                    </a>
                    <a href="#state-management" className="block text-muted-foreground hover:text-primary transition-colors">
                      State Management
                    </a>
                    <a href="#performance" className="block text-muted-foreground hover:text-primary transition-colors">
                      Performance Optimization
                    </a>
                    <a href="#conclusion" className="block text-muted-foreground hover:text-primary transition-colors">
                      Conclusion
                    </a>
                  </nav>
                </CardContent>
              </Card>

              {/* Author Info */}
              <Card className="glass border-primary/20">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">About the Author</h3>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary-foreground">AC</span>
                    </div>
                    <div>
                      <div className="font-medium">{post.author}</div>
                      <div className="text-sm text-muted-foreground">Full Stack Developer</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Passionate about building scalable web applications and sharing knowledge 
                    with the developer community.
                  </p>
                </CardContent>
              </Card>

              {/* Related Articles */}
              <Card className="glass border-primary/20">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Related Articles</h3>
                  <div className="space-y-3">
                    <Link 
                      to="/blog/typescript-advanced-patterns" 
                      className="block text-sm hover:text-primary transition-colors"
                    >
                      Advanced TypeScript Patterns for Better DX
                    </Link>
                    <Link 
                      to="/blog/nodejs-performance-optimization" 
                      className="block text-sm hover:text-primary transition-colors"
                    >
                      Node.js Performance Optimization
                    </Link>
                    <Link 
                      to="/blog/modern-css-techniques" 
                      className="block text-sm hover:text-primary transition-colors"
                    >
                      Modern CSS Techniques
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;