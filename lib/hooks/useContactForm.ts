import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitContactForm } from '@/components/forms/_api/formSubmissions';
import { showSuccessAlert, showErrorAlert, showConnectionError } from '@/components/forms/_services/alertService';

const contactFormSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(70, 'Full name must not exceed 70 characters'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z
      .string()
      .min(1, 'Phone number is required')
      .refine(val => {
        const phoneRegex = /^(\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/;
        return phoneRegex.test(val.replace(/\s/g, ''));
      }, "Phone number must be in a valid format (e.g., xxx-xxx-xxxx)"),
  message: z.string().min(1, 'Message is required'),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export function useContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
    reset,
    trigger,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormValues, callback?: () => void) => {
    setIsSubmitting(true);
    try {
      const result = await submitContactForm(data);

      if (result.success) {
        await showSuccessAlert();
        reset();
        callback?.();
      } else {
        console.error('API error:', result.error);
        await showErrorAlert(result.message);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      await showConnectionError();
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    register,
    watch,
    setValue,
    control,
    trigger,
  };
}
