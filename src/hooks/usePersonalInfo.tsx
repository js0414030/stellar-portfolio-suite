import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Stat {
  label: string;
  value: string;
}

interface Service {
  title: string;
  description: string;
  technologies: string[];
}

export interface PersonalInfo {
  id: string;
  full_name: string;
  tagline: string;
  description: string;
  profile_image_url?: string;
  resume_url?: string;
  github_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  email?: string;
  phone?: string;
  location?: string;
  roles: string[];
  stats: Stat[];
  services: Service[];
  created_at: string;
  updated_at: string;
}

export const usePersonalInfo = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPersonalInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('personal_info')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (fetchError) throw fetchError;
      
      if (data) {
        setPersonalInfo({
          ...data,
          stats: (data.stats as unknown) as Stat[],
          services: (data.services as unknown) as Service[] || []
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch personal info');
      console.error('Error fetching personal info:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersonalInfo();
  }, []);

  const refetch = () => {
    fetchPersonalInfo();
  };

  return { personalInfo, loading, error, refetch };
};
