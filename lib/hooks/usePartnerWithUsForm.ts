'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitPartnerWithUsForm } from '@/components/forms/_api/formSubmissions';
import { showSuccessAlert, showErrorAlert, showConnectionError } from '@/components/forms/_services/alertService';

const partnerWithUsFormSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(70, 'Full name must not exceed 70 characters'),
  email: z.string().email('Please enter a valid email address'),
  phoneNumber: z
      .string()
      .min(1, 'Phone number is required')
      .refine(val => {
        const phoneRegex = /^(\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/;
        return phoneRegex.test(val.replace(/\s/g, ''));
      }, "Phone number must be in a valid format (e.g., xxx-xxx-xxxx)"),
  organization: z.string().min(1, 'Organization is required').max(100, 'Organization must not exceed 100 characters'),
  organizationOther: z.string().optional(),
  role: z.string().min(1, 'Role is required').max(100, 'Role must not exceed 100 characters'),
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State/Province is required'),
  county: z.string().min(1, 'County/Region is required'),
  focusArea: z.string().min(1, 'Focus area is required').max(100, 'Focus area must not exceed 100 characters'),
  message: z.string().min(1, 'Message is required').max(500, 'Message must not exceed 500 characters'),
  privacyConsent: z.boolean().refine(val => val === true, {
    message: 'You must agree to the privacy policy',
  }),
}).refine((data) => {
  if (data.organization === 'Other') {
    return data.organizationOther && data.organizationOther.trim().length > 0;
  }
  return true;
}, {
  message: 'Please specify your organization',
  path: ['organizationOther'],
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
      organizationOther: '',
      role: '',
      country: 'US',
      state: '',
      county: '',
      focusArea: '',
      message: '',
      privacyConsent: false,
    },
  });

  const onSubmit = async (data: PartnerWithUsFormValues, callback?: () => void) => {
    setIsSubmitting(true);
    try {
      const result = await submitPartnerWithUsForm(data);

      if (result.success) {
        reset();
        callback?.();
        await showSuccessAlert();
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
