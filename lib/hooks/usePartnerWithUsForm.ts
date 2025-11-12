'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitPartnerWithUsForm } from '@/components/forms/_api/formSubmissions';
import { showSuccessAlert, showErrorAlert, showConnectionError } from '@/components/forms/_services/alertService';

const partnerWithUsFormSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(70, 'Full name must not exceed 70 characters'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z
      .string()
      .min(1, 'Phone number is required')
      .refine(val => {
        const phoneRegex = /^(\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/;
        return phoneRegex.test(val.replace(/\s/g, ''));
      }, "Phone number must be in a valid format (e.g., xxx-xxx-xxxx)"),
  organization: z.string().optional(),
  role: z.string().optional(),
  county: z.string().min(1, 'County is required'),
  focusArea: z.string().min(1, 'Focus area is required'),
  message: z.string().optional(),
  privacyConsent: z.boolean().refine(val => val === true, {
    message: 'You must agree to the privacy policy',
  }),
});

export type PartnerWithUsFormValues = z.infer<typeof partnerWithUsFormSchema>;

export function usePartnerWithUsForm() {
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
  } = useForm<PartnerWithUsFormValues>({
    resolver: zodResolver(partnerWithUsFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      organization: '',
      role: '',
      county: '',
      focusArea: '',
      message: '',
      privacyConsent: false,
    },
  });

  const onSubmit = async (data: PartnerWithUsFormValues, callback?: () => void) => {
    setIsSubmitting(true);
    try {
      const formattedData = {
        ...data,
        phoneNumber: data.phoneNumber.replace(/\D/g, '')
      };

      const result = await submitPartnerWithUsForm(formattedData);

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
