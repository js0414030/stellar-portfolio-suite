import { useState, useEffect } from 'react';
import { Layout, FileText, Code, GraduationCap, Award, Plus, Edit, Trash2, MessageSquare, Save, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import SEOHead from '@/components/SEOHead';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useProjects } from '@/hooks/useProjects';
import { useExperiences, useEducation, useCertifications } from '@/hooks/useExperience';
import { useSkills } from '@/hooks/useSkills';
import { usePersonalInfo } from '@/hooks/usePersonalInfo';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

const Admin = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [dialogType, setDialogType] = useState<'project' | 'experience' | 'skill' | 'education' | 'certification' | 'personal'>('personal');

  const { projects, refetch: refetchProjects } = useProjects();
  const { experiences, refetch: refetchExperiences } = useExperiences();
  const { education, refetch: refetchEducation } = useEducation();
  const { certifications, refetch: refetchCertifications } = useCertifications();
  const { skills, refetch: refetchSkills } = useSkills();
  const { personalInfo, refetch: refetchPersonalInfo } = usePersonalInfo();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setMessages(data);
    }
  };

  const openDialog = (type: typeof dialogType, item?: any) => {
    setDialogType(type);
    setEditingItem(item || null);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingItem(null);
  };

  const handleDelete = async (type: 'projects' | 'experiences' | 'skills' | 'education' | 'certifications', id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    const { error } = await supabase
      .from(type)
      .delete()
      .eq('id', id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Item deleted successfully' });
      // Refresh the appropriate list
      if (type === 'projects') refetchProjects();
      else if (type === 'experiences') refetchExperiences();
      else if (type === 'skills') refetchSkills();
      else if (type === 'education') refetchEducation();
      else if (type === 'certifications') refetchCertifications();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: any = {};
    
    formData.forEach((value, key) => {
      if (key === 'tags' || key === 'technologies' || key === 'responsibilities' || key === 'achievements' || key === 'roles') {
        data[key] = value.toString().split(',').map(t => t.trim()).filter(Boolean);
      } else if (key === 'stats') {
        try {
          data[key] = JSON.parse(value.toString());
        } catch (e) {
          console.error('Error parsing stats:', e);
          data[key] = [];
        }
      } else if (key === 'services') {
        try {
          const parsed = JSON.parse(value.toString());
          data[key] = parsed;
        } catch (e) {
          console.error('Error parsing services:', e);
          data[key] = [];
        }
      } else {
        data[key] = value;
      }
    });

    const table = dialogType === 'experience' ? 'experiences' : 
                  dialogType === 'skill' ? 'skills' :
                  dialogType === 'education' ? 'education' :
                  dialogType === 'certification' ? 'certifications' :
                  dialogType === 'personal' ? 'personal_info' : 'projects';

    let error;
    if (dialogType === 'personal' && personalInfo) {
      // Personal info always updates
      const { error: updateError } = await supabase
        .from(table)
        .update(data)
        .eq('id', personalInfo.id);
      error = updateError;
    } else if (editingItem) {
      const { error: updateError } = await supabase
        .from(table)
        .update(data)
        .eq('id', editingItem.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from(table)
        .insert(data);
      error = insertError;
    }

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: `${dialogType} ${editingItem ? 'updated' : 'created'} successfully` });
      closeDialog();
      
      // Refresh the appropriate list
      if (table === 'projects') refetchProjects();
      else if (table === 'experiences') refetchExperiences();
      else if (table === 'skills') refetchSkills();
      else if (table === 'education') refetchEducation();
      else if (table === 'personal_info') refetchPersonalInfo();
      else if (table === 'certifications') refetchCertifications();
    }
  };

  return (
    <>
      <SEOHead 
        title="Admin Dashboard"
        description="Portfolio administration panel"
      />
      <div className="min-h-screen bg-surface/20">
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your portfolio content</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-7 glass">
                <TabsTrigger value="personal"><User className="w-4 h-4 mr-2" />Personal</TabsTrigger>
                <TabsTrigger value="projects"><Layout className="w-4 h-4 mr-2" />Projects</TabsTrigger>
                <TabsTrigger value="experience"><FileText className="w-4 h-4 mr-2" />Experience</TabsTrigger>
                <TabsTrigger value="skills"><Code className="w-4 h-4 mr-2" />Skills</TabsTrigger>
                <TabsTrigger value="education"><GraduationCap className="w-4 h-4 mr-2" />Education</TabsTrigger>
                <TabsTrigger value="certifications"><Award className="w-4 h-4 mr-2" />Certs</TabsTrigger>
                <TabsTrigger value="messages"><MessageSquare className="w-4 h-4 mr-2" />Messages</TabsTrigger>
              </TabsList>

              {/* Personal Info Tab */}
              <TabsContent value="personal">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Personal Information</CardTitle>
                    <Button onClick={() => openDialog('personal', personalInfo)}><Edit className="w-4 h-4 mr-2" />Edit Info</Button>
                  </CardHeader>
                  <CardContent>
                    {personalInfo && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Full Name</p>
                            <p className="font-semibold">{personalInfo.full_name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Tagline</p>
                            <p className="font-semibold">{personalInfo.tagline}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-sm text-muted-foreground">Description</p>
                            <p className="font-semibold">{personalInfo.description}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p className="font-semibold">{personalInfo.email || 'Not set'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">GitHub</p>
                            <p className="font-semibold">{personalInfo.github_url || 'Not set'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">LinkedIn</p>
                            <p className="font-semibold">{personalInfo.linkedin_url || 'Not set'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Resume URL</p>
                            <p className="font-semibold">{personalInfo.resume_url || 'Not set'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Phone</p>
                            <p className="font-semibold">{personalInfo.phone || 'Not set'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Location</p>
                            <p className="font-semibold">{personalInfo.location || 'Not set'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Twitter URL</p>
                            <p className="font-semibold">{personalInfo.twitter_url || 'Not set'}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-sm text-muted-foreground">Roles</p>
                            <div className="flex gap-2 flex-wrap mt-1">
                              {personalInfo.roles.map((role, index) => (
                                <span key={index} className="text-xs px-2 py-1 bg-primary/10 rounded">{role}</span>
                              ))}
                            </div>
                          </div>
                          <div className="col-span-2">
                            <p className="text-sm text-muted-foreground">Services</p>
                            <div className="space-y-2 mt-1">
                              {personalInfo.services && personalInfo.services.length > 0 ? (
                                personalInfo.services.map((service, index) => (
                                  <div key={index} className="text-xs p-2 bg-primary/5 rounded">
                                    <p className="font-bold">{service.title || 'Untitled'}</p>
                                    <p className="text-muted-foreground">{service.description || 'No description'}</p>
                                    {service.technologies && Array.isArray(service.technologies) && service.technologies.length > 0 && (
                                      <p className="text-muted-foreground">Tech: {service.technologies.join(', ')}</p>
                                    )}
                                  </div>
                                ))
                              ) : (
                                <p className="text-xs text-muted-foreground">No services added</p>
                              )}
                            </div>
                          </div>
                          <div className="col-span-2">
                            <p className="text-sm text-muted-foreground">Stats</p>
                            <div className="grid grid-cols-4 gap-2 mt-1">
                              {personalInfo.stats.map((stat, index) => (
                                <div key={index} className="text-xs p-2 bg-primary/5 rounded">
                                  <p className="font-bold">{stat.value}</p>
                                  <p className="text-muted-foreground">{stat.label}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Projects Tab */}
              <TabsContent value="projects">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Projects</CardTitle>
                    <Button onClick={() => openDialog('project')}><Plus className="w-4 h-4 mr-2" />Add Project</Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {projects.map((project) => (
                        <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-semibold">{project.title}</h3>
                            <p className="text-sm text-muted-foreground">{project.description}</p>
                            <div className="flex gap-2 mt-2">
                              {project.tags.map((tag) => (
                                <span key={tag} className="text-xs px-2 py-1 bg-primary/10 rounded">{tag}</span>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => openDialog('project', project)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDelete('projects', project.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Experience Tab */}
              <TabsContent value="experience">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Work Experience</CardTitle>
                    <Button onClick={() => openDialog('experience')}><Plus className="w-4 h-4 mr-2" />Add Experience</Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {experiences.map((exp) => (
                        <div key={exp.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-semibold">{exp.title} at {exp.company}</h3>
                            <p className="text-sm text-muted-foreground">{exp.period} • {exp.location}</p>
                            <p className="text-sm mt-2">{exp.description}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => openDialog('experience', exp)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDelete('experiences', exp.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Skills Tab */}
              <TabsContent value="skills">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Skills</CardTitle>
                    <Button onClick={() => openDialog('skill')}><Plus className="w-4 h-4 mr-2" />Add Skill</Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {skills.map((skill) => (
                        <div key={skill.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h3 className="font-semibold">{skill.name}</h3>
                            <p className="text-sm text-muted-foreground">{skill.category}</p>
                            {skill.level && <p className="text-xs text-muted-foreground">Level: {skill.level}%</p>}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => openDialog('skill', skill)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDelete('skills', skill.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Education Tab */}
              <TabsContent value="education">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Education</CardTitle>
                    <Button onClick={() => openDialog('education')}><Plus className="w-4 h-4 mr-2" />Add Education</Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {education.map((edu) => (
                        <div key={edu.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-semibold">{edu.degree}</h3>
                            <p className="text-sm text-muted-foreground">{edu.school} • {edu.period}</p>
                            {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => openDialog('education', edu)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDelete('education', edu.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Certifications Tab */}
              <TabsContent value="certifications">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Certifications</CardTitle>
                    <Button onClick={() => openDialog('certification')}><Plus className="w-4 h-4 mr-2" />Add Certification</Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {certifications.map((cert) => (
                        <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-semibold">{cert.name}</h3>
                            <p className="text-sm text-muted-foreground">{cert.issuer} • {cert.date}</p>
                            {cert.credential_id && <p className="text-xs text-muted-foreground">ID: {cert.credential_id}</p>}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => openDialog('certification', cert)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDelete('certifications', cert.id)}>
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
              <TabsContent value="messages">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Messages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div key={msg.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold">{msg.name}</h3>
                              <p className="text-sm text-muted-foreground">{msg.email}</p>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {new Date(msg.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="font-medium text-sm mb-2">Subject: {msg.subject}</p>
                          <p className="text-sm text-muted-foreground">{msg.message}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Edit/Create Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit' : 'Add'} {dialogType}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            {dialogType === 'project' && (
              <>
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" defaultValue={editingItem?.title} required />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" defaultValue={editingItem?.description} required />
                </div>
                <div>
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input id="image_url" name="image_url" defaultValue={editingItem?.image_url} />
                </div>
                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input id="tags" name="tags" defaultValue={editingItem?.tags?.join(', ')} required />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" name="category" defaultValue={editingItem?.category} required />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" name="date" defaultValue={editingItem?.date} required />
                </div>
                <div>
                  <Label htmlFor="github_url">GitHub URL</Label>
                  <Input id="github_url" name="github_url" defaultValue={editingItem?.github_url} />
                </div>
                <div>
                  <Label htmlFor="live_url">Live URL</Label>
                  <Input id="live_url" name="live_url" defaultValue={editingItem?.live_url} />
                </div>
              </>
            )}

            {dialogType === 'experience' && (
              <>
                <div>
                  <Label htmlFor="title">Job Title</Label>
                  <Input id="title" name="title" defaultValue={editingItem?.title} required />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" name="company" defaultValue={editingItem?.company} required />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" defaultValue={editingItem?.location} required />
                </div>
                <div>
                  <Label htmlFor="period">Period</Label>
                  <Input id="period" name="period" defaultValue={editingItem?.period} placeholder="e.g., 2020 - 2023" required />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Input id="type" name="type" defaultValue={editingItem?.type || 'work'} required />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" defaultValue={editingItem?.description} required />
                </div>
                <div>
                  <Label htmlFor="technologies">Technologies (comma separated)</Label>
                  <Input id="technologies" name="technologies" defaultValue={editingItem?.technologies?.join(', ')} />
                </div>
                <div>
                  <Label htmlFor="responsibilities">Responsibilities (comma separated)</Label>
                  <Textarea id="responsibilities" name="responsibilities" defaultValue={editingItem?.responsibilities?.join(', ')} />
                </div>
                <div>
                  <Label htmlFor="achievements">Achievements (comma separated)</Label>
                  <Textarea id="achievements" name="achievements" defaultValue={editingItem?.achievements?.join(', ')} />
                </div>
              </>
            )}

            {dialogType === 'skill' && (
              <>
                <div>
                  <Label htmlFor="name">Skill Name</Label>
                  <Input id="name" name="name" defaultValue={editingItem?.name} required />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" name="category" defaultValue={editingItem?.category} placeholder="e.g., Frontend, Backend, Design" required />
                </div>
                <div>
                  <Label htmlFor="level">Level (0-100)</Label>
                  <Input id="level" name="level" type="number" min="0" max="100" defaultValue={editingItem?.level} />
                </div>
              </>
            )}

            {dialogType === 'education' && (
              <>
                <div>
                  <Label htmlFor="degree">Degree</Label>
                  <Input id="degree" name="degree" defaultValue={editingItem?.degree} required />
                </div>
                <div>
                  <Label htmlFor="school">School</Label>
                  <Input id="school" name="school" defaultValue={editingItem?.school} required />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" defaultValue={editingItem?.location} required />
                </div>
                <div>
                  <Label htmlFor="period">Period</Label>
                  <Input id="period" name="period" defaultValue={editingItem?.period} placeholder="e.g., 2016 - 2020" required />
                </div>
                <div>
                  <Label htmlFor="gpa">GPA (optional)</Label>
                  <Input id="gpa" name="gpa" defaultValue={editingItem?.gpa} />
                </div>
                <div>
                  <Label htmlFor="achievements">Achievements (comma separated)</Label>
                  <Textarea id="achievements" name="achievements" defaultValue={editingItem?.achievements?.join(', ')} />
                </div>
              </>
            )}

            {dialogType === 'certification' && (
              <>
                <div>
                  <Label htmlFor="name">Certification Name</Label>
                  <Input id="name" name="name" defaultValue={editingItem?.name} required />
                </div>
                <div>
                  <Label htmlFor="issuer">Issuer</Label>
                  <Input id="issuer" name="issuer" defaultValue={editingItem?.issuer} required />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" name="date" defaultValue={editingItem?.date} placeholder="e.g., January 2024" required />
                </div>
                <div>
                  <Label htmlFor="credential_id">Credential ID (optional)</Label>
                  <Input id="credential_id" name="credential_id" defaultValue={editingItem?.credential_id} />
                </div>
              </>
            )}

            {dialogType === 'personal' && (
              <>
                <div>
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input id="full_name" name="full_name" defaultValue={editingItem?.full_name} required />
                </div>
                <div>
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input id="tagline" name="tagline" defaultValue={editingItem?.tagline} required />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" defaultValue={editingItem?.description} required />
                </div>
                <div>
                  <Label htmlFor="profile_image_url">Profile Image URL (optional)</Label>
                  <Input id="profile_image_url" name="profile_image_url" defaultValue={editingItem?.profile_image_url} />
                </div>
                <div>
                  <Label htmlFor="resume_url">Resume URL (optional)</Label>
                  <Input id="resume_url" name="resume_url" defaultValue={editingItem?.resume_url} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" defaultValue={editingItem?.email} />
                </div>
                <div>
                  <Label htmlFor="github_url">GitHub URL</Label>
                  <Input id="github_url" name="github_url" defaultValue={editingItem?.github_url} />
                </div>
                <div>
                  <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                  <Input id="linkedin_url" name="linkedin_url" defaultValue={editingItem?.linkedin_url} />
                </div>
                <div>
                  <Label htmlFor="twitter_url">Twitter URL</Label>
                  <Input id="twitter_url" name="twitter_url" defaultValue={editingItem?.twitter_url} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" defaultValue={editingItem?.phone} />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" defaultValue={editingItem?.location} />
                </div>
                <div>
                  <Label htmlFor="roles">Roles (comma separated)</Label>
                  <Textarea id="roles" name="roles" defaultValue={editingItem?.roles?.join(', ')} required />
                </div>
                <div>
                  <Label htmlFor="stats">Stats (JSON format)</Label>
                  <Textarea 
                    id="stats" 
                    name="stats" 
                    defaultValue={JSON.stringify(editingItem?.stats, null, 2)} 
                    placeholder='[{"label": "Projects", "value": "50+"}]'
                    rows={6}
                    required 
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Format: Array of objects with "label" and "value" properties
                  </p>
                </div>
                <div>
                  <Label htmlFor="services">Services (JSON format)</Label>
                  <Textarea 
                    id="services" 
                    name="services" 
                    defaultValue={JSON.stringify(editingItem?.services || [], null, 2)} 
                    placeholder='[{"title": "Web Development", "description": "...", "technologies": ["React", "Node.js"]}]'
                    rows={8}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Format: Array of objects with "title", "description", and "technologies" (array) properties
                  </p>
                </div>
              </>
            )}

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={closeDialog}>
                <X className="w-4 h-4 mr-2" />Cancel
              </Button>
              <Button type="submit">
                <Save className="w-4 h-4 mr-2" />{editingItem ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Admin;
