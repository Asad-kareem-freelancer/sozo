import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';

const nursingXchangeSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  institution: z.string().min(2, 'Institution is required'),
  role: z.string().min(1, 'Role is required'),
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State/Province is required'),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must consent to be contacted',
  }),
});

export type NursingXchangeFormData = z.infer<typeof nursingXchangeSchema>;

export function useNursingXchangeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<NursingXchangeFormData>({
    resolver: zodResolver(nursingXchangeSchema),
    defaultValues: {
      consent: false,
    },
  });

  const onSubmit = async (data: NursingXchangeFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement API call
      console.log('Nursing Xchange Form Data:', data);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      alert('Thank you for your interest! We will contact you soon.');
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    control,
    isSubmitting,
  };
}
