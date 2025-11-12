import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { submitLibraryForm } from '../_api/formSubmissions';
import { showSuccessAlert, showErrorAlert, showConnectionError } from '../_services/alertService';

const libraryHubSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .refine(val => {
      const phoneRegex = /^(\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/;
      return phoneRegex.test(val.replace(/\s/g, ''));
    }, "Phone number must be in a valid format (e.g., xxx-xxx-xxxx)"),
  organization: z.string().min(2, 'Organization is required'),
  role: z.string().min(1, 'Role is required'),
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State/Province is required'),
  areaOfInterest: z.string().min(1, 'Area of interest is required'),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must consent to be contacted',
  }),
});

export type LibraryHubFormData = z.infer<typeof libraryHubSchema>;

export function useLibraryHubForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    trigger,
  } = useForm<LibraryHubFormData>({
    resolver: zodResolver(libraryHubSchema),
    defaultValues: {
      consent: false,
    },
  });

  const onSubmit = async (data: LibraryHubFormData, callback?: () => void) => {
    setIsSubmitting(true);
    try {
      const result = await submitLibraryForm(data);

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
  };
}
