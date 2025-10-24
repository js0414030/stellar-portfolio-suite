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

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setExperiences(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setExperiences([]); // Ensure empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  return { experiences, loading, error, refetch: fetchExperiences };
};

export const useEducation = () => {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEducation = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .order('period', { ascending: false });

      if (error) throw error;
      setEducation(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setEducation([]); // Ensure empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  return { education, loading, error, refetch: fetchEducation };
};

export const useCertifications = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCertifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setCertifications(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setCertifications([]); // Ensure empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  return { certifications, loading, error, refetch: fetchCertifications };
};