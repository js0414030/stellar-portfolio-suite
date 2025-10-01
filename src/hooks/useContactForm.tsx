import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string()
    .trim()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  subject: z.string()
    .trim()
    .min(3, 'Subject must be at least 3 characters')
    .max(200, 'Subject must be less than 200 characters'),
  message: z.string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters')
});

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const useContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const submitContactForm = async (formData: ContactFormData) => {
    try {
      setIsSubmitting(true);

      // Validate using zod schema
      const validatedData = contactFormSchema.parse(formData);

      const { error } = await supabase
        .from('contact_messages')
        .insert([{
          name: validatedData.name,
          email: validatedData.email,
          subject: validatedData.subject,
          message: validatedData.message
        }]);

      if (error) throw error;

      setIsSubmitted(true);
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);

      return { success: true };
    } catch (err) {
      let errorMessage = 'Failed to send message';
      
      if (err instanceof z.ZodError) {
        errorMessage = err.errors[0].message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      toast({
        title: "Error sending message",
        description: errorMessage,
        variant: "destructive",
      });

      return { success: false, error: errorMessage };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitContactForm,
    isSubmitting,
    isSubmitted
  };
};