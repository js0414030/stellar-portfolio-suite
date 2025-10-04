import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Project {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  tags: string[];
  category: string;
  date: string;
  github_url?: string;
  live_url?: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

interface UseProjectsProps {
  searchTerm?: string;
  selectedTag?: string;
  pageSize?: number;
}

export const useProjects = ({ 
  searchTerm = '', 
  selectedTag = 'all', 
  pageSize = 10 
}: UseProjectsProps = {}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProjects = async (page: number = 1) => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('projects')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      // Apply search filter
      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      // Apply tag filter
      if (selectedTag !== 'all') {
        query = query.contains('tags', [selectedTag]);
      }

      // Apply pagination
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      query = query.range(from, to);

      const { data, count, error } = await query;

      if (error) throw error;

      setProjects(data || []);
      setTotalCount(count || 0);
      setCurrentPage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(1);
  }, [searchTerm, selectedTag]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    projects,
    loading,
    error,
    totalCount,
    currentPage,
    totalPages,
    fetchProjects,
    setCurrentPage: (page: number) => fetchProjects(page),
    refetch: () => fetchProjects(currentPage)
  };
};

export const useProjectById = (id: string) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setProject(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Project not found');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  return { project, loading, error };
};