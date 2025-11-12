import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { submitRebsReportForm } from '../_api/formSubmissions';
import { showReportSuccessAlert, showErrorAlert, showConnectionError } from '../_services/alertService';

const rebsReportSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  organization: z.string().optional(),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the privacy policy',
  }),
});

export type RebsReportFormData = z.infer<typeof rebsReportSchema>;

export function useRebsReportForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<RebsReportFormData>({
    resolver: zodResolver(rebsReportSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      organization: '',
      privacyConsent: false,
    },
  });

  const onSubmit = async (data: RebsReportFormData, callback?: (v:boolean) => void) => {
    setIsSubmitting(true);

    try {
      const result = await submitRebsReportForm(data);

      if (result.success) {
        reset();
        callback?.(false);

        // Show success alert with download link
        const pdfUrl = 'https://d9gpta2bry95a.cloudfront.net/publications/REBS_v1.pdf';
        const reportTitle = 'Rural Equity Blueprint Series — Volume 1 (2025)';
        await showReportSuccessAlert(reportTitle, pdfUrl);
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
  };
}
