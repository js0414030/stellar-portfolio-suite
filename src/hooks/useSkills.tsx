import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Skill {
  id: string;
  name: string;
  category: string;
  level?: string;
  created_at: string;
  updated_at: string;
}

export const useSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('category', { ascending: true });

      if (error) throw error;
      setSkills(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return { skills, loading, error, refetch: fetchSkills };
};
