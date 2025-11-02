import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';

const accessDaySchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  organization: z.string().min(2, 'Organization is required'),
  role: z.string().min(1, 'Role is required'),
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State/Province is required'),
  areaOfInterest: z.string().min(1, 'Area of interest is required'),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must consent to be contacted',
  }),
});

export type AccessDayFormData = z.infer<typeof accessDaySchema>;

export function useAccessDayForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<AccessDayFormData>({
    resolver: zodResolver(accessDaySchema),
    defaultValues: {
      consent: false,
    },
  });

  const onSubmit = async (data: AccessDayFormData) => {
    setIsSubmitting(true);
    try {
      console.log('Access Day Form Data:', data);
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
