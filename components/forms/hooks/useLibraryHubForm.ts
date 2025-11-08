import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { submitLibraryForm } from '../_api/formSubmissions';
import Swal from 'sweetalert2';

const libraryHubSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
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

export type LibraryHubFormData = z.infer<typeof libraryHubSchema>;

export function useLibraryHubForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<LibraryHubFormData>({
    resolver: zodResolver(libraryHubSchema),
    defaultValues: {
      consent: false,
    },
  });

  const onSubmit = async (data: LibraryHubFormData) => {
    setIsSubmitting(true);
    try {
      const result = await submitLibraryForm(data);

      if (result.success) {
        await Swal.fire({
          icon: 'success',
          title: 'Thank you.',
          html: `
            <p>Your submission has been received.</p>
            <p>The SozoRock Foundation reviews each entry to ensure proper follow-up and documentation.</p>
            <p style="margin-top: 12px; font-size: 0.9em; color: #666;">A confirmation email has been sent from contact@sozorockfoundation.org for your records.</p>
          `,
          confirmButtonText: 'OK',
          confirmButtonColor: '#2563eb'
        });
        reset();
      } else {
        console.error('API error:', result.error);
        await Swal.fire({
          icon: 'error',
          title: 'Submission Failed',
          text: result.message || 'Something went wrong. Please try again.',
          confirmButtonText: 'OK',
          confirmButtonColor: '#2563eb'
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: 'Something went wrong. Please try again.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#2563eb'
      });
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
