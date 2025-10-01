import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string;
  achievements: string[];
  technologies: string[];
  responsibilities: string[];
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  period: string;
  gpa?: string;
  achievements: string[];
  created_at: string;
  updated_at: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credential_id?: string;
  created_at: string;
  updated_at: string;
}

export const useExperiences = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('experiences')
          .select('*')
          .order('order_index', { ascending: true });

        if (error) throw error;
        setExperiences(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  return { experiences, loading, error };
};

export const useEducation = () => {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('education')
          .select('*')
          .order('period', { ascending: false });

        if (error) throw error;
        setEducation(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  return { education, loading, error };
};

export const useCertifications = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('certifications')
          .select('*')
          .order('date', { ascending: false });

        if (error) throw error;
        setCertifications(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  return { certifications, loading, error };
};