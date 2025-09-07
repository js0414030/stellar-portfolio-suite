import { useState } from 'react';
import { 
  User, 
  Layout, 
  FileText, 
  Star, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  BarChart,
  Users,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for dashboard
  const stats = [
    { label: 'Total Projects', value: '12', icon: <Layout className="w-5 h-5" />, change: '+2' },
    { label: 'Blog Posts', value: '8', icon: <FileText className="w-5 h-5" />, change: '+1' },
    { label: 'Page Views', value: '2.4k', icon: <Eye className="w-5 h-5" />, change: '+15%' },
    { label: 'Messages', value: '23', icon: <MessageSquare className="w-5 h-5" />, change: '+5' },
  ];

  const recentProjects = [
    { id: 1, title: 'E-Commerce Platform', status: 'Published', date: '2024-01-15' },
    { id: 2, title: 'Task Management App', status: 'Draft', date: '2024-01-10' },
    { id: 3, title: 'Weather Dashboard', status: 'Published', date: '2024-01-05' },
  ];

  const recentPosts = [
    { id: 1, title: 'Building Scalable React Applications', status: 'Published', views: 1250 },
    { id: 2, title: 'Advanced TypeScript Patterns', status: 'Published', views: 980 },
    { id: 3, title: 'Modern CSS Techniques', status: 'Draft', views: 0 },
  ];

  const messages = [
    { id: 1, name: 'John Doe', email: 'john@example.com', subject: 'Project Inquiry', date: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', subject: 'Collaboration Opportunity', date: '2024-01-14' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', subject: 'Website Redesign', date: '2024-01-13' },
  ];

  return (
    <div className="min-h-screen pt-16 bg-surface/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your portfolio content and settings</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 glass">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center space-x-2">
              <Layout className="w-4 h-4" />
              <span className="hidden sm:inline">Projects</span>
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Blog</span>
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span className="hidden sm:inline">Reviews</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Messages</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={stat.label} className="glass border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {stat.change}
                        </Badge>
                      </div>
                      <div className="text-primary">{stat.icon}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="glass border-primary/20">
                <CardHeader>
                  <CardTitle>Recent Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentProjects.map((project) => (
                      <div key={project.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/20 transition-colors">
                        <div>
                          <p className="font-medium">{project.title}</p>
                          <p className="text-sm text-muted-foreground">{project.date}</p>
                        </div>
                        <Badge variant={project.status === 'Published' ? 'default' : 'secondary'}>
                          {project.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-primary/20">
                <CardHeader>
                  <CardTitle>Recent Blog Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentPosts.map((post) => (
                      <div key={post.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/20 transition-colors">
                        <div>
                          <p className="font-medium">{post.title}</p>
                          <p className="text-sm text-muted-foreground">{post.views} views</p>
                        </div>
                        <Badge variant={post.status === 'Published' ? 'default' : 'secondary'}>
                          {post.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Projects</h2>
              <Button className="bg-gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </div>

            <Card className="glass border-primary/20">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h3 className="font-medium">{project.title}</h3>
                        <p className="text-sm text-muted-foreground">Created: {project.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={project.status === 'Published' ? 'default' : 'secondary'}>
                          {project.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blog Tab */}
          <TabsContent value="blog" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Blog Posts</h2>
              <Button className="bg-gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </div>

            <Card className="glass border-primary/20">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h3 className="font-medium">{post.title}</h3>
                        <p className="text-sm text-muted-foreground">{post.views} views</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={post.status === 'Published' ? 'default' : 'secondary'}>
                          {post.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Messages</h2>
              <Badge variant="secondary">{messages.length} unread</Badge>
            </div>

            <Card className="glass border-primary/20">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/20 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium">{message.name}</h3>
                          <Badge variant="outline" className="text-xs">New</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{message.email}</p>
                        <p className="text-sm font-medium">{message.subject}</p>
                        <p className="text-xs text-muted-foreground">{message.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">Settings</h2>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="glass border-primary/20">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input defaultValue="Alex Chen" className="glass border-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input defaultValue="alex@example.com" className="glass border-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bio</label>
                    <Textarea 
                      defaultValue="Full Stack Developer passionate about creating digital experiences..."
                      className="glass border-primary/20"
                      rows={3}
                    />
                  </div>
                  <Button className="bg-gradient-primary">Save Changes</Button>
                </CardContent>
              </Card>

              <Card className="glass border-primary/20">
                <CardHeader>
                  <CardTitle>Site Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Site Title</label>
                    <Input defaultValue="Alex Chen - Portfolio" className="glass border-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Site Description</label>
                    <Textarea 
                      defaultValue="Full Stack Developer & Designer creating digital experiences..."
                      className="glass border-primary/20"
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Contact Email</label>
                    <Input defaultValue="alex@example.com" className="glass border-primary/20" />
                  </div>
                  <Button className="bg-gradient-primary">Update Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;