import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { submitNursingForm } from '../_api/formSubmissions';
import { showSuccessAlert, showErrorAlert, showConnectionError } from '../_services/alertService';

const nursingXchangeSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(35, 'First name must not exceed 35 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(35, 'Last name must not exceed 35 characters'),
  email: z.string().email('Please enter a valid email address'),
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .refine(val => {
      const phoneRegex = /^(\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/;
      return phoneRegex.test(val.replace(/\s/g, ''));
    }, "Phone number must be in a valid format (e.g., xxx-xxx-xxxx)"),
  institution: z.string().min(2, 'Institution is required').max(100, 'Institution must not exceed 100 characters'),
  role: z.string().min(1, 'Role is required').max(100, 'Role must not exceed 100 characters'),
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State/Province is required'),
  county: z.string().min(1, 'County/Region is required'),
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
    trigger,
    watch,
    setValue,
  } = useForm<NursingXchangeFormData>({
    resolver: zodResolver(nursingXchangeSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      institution: '',
      role: '',
      country: 'US',
      state: '',
      county: '',
      consent: false,
    },
  });

  const onSubmit = async (data: NursingXchangeFormData, callback?: () => void) => {
    setIsSubmitting(true);
    try {
      const result = await submitNursingForm(data);

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
    register,
    errors,
    onSubmit,
    handleSubmit,
    control,
    isSubmitting,
    trigger,
    watch,
    setValue,
  };
}
