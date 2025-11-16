import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { submitRebsReportForm } from '../_api/formSubmissions';
import { showReportSuccessAlert, showErrorAlert, showConnectionError } from '../_services/alertService';

const rebsReportSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(35, 'First name must not exceed 35 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(35, 'Last name must not exceed 35 characters'),
  email: z.email('Please enter a valid email address'),
  phoneNumber: z.string().optional().refine((val) => {
    if (!val || val.trim().length === 0) return true;
    const phoneRegex = /^(\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/;
    return phoneRegex.test(val.replace(/\s/g, ''));
  }, "Phone number must be in a valid format (e.g., xxx-xxx-xxxx)"),
  intendedUse: z.string().min(1, 'Intended use is required'),
  intendedUseOther: z.string().optional().refine((val) => !val || val.length <= 100, {
    message: 'Intended use must not exceed 100 characters',
  }),
  organizationType: z.string().min(1, 'Organization type is required'),
  organizationCustom: z.string().optional().refine((val) => !val || val.length <= 100, {
    message: 'Organization must not exceed 100 characters',
  }),
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State/Province is required'),
  county: z.string().min(1, 'County/Region is required'),
  primaryRole: z.string().min(1, 'Primary role is required'),
  primaryRoleOther: z.string().optional().refine((val) => !val || val.length <= 100, {
    message: 'Primary role must not exceed 100 characters',
  }),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the privacy policy',
  }),
  newsletterOptIn: z.boolean().optional(),
  privacyTermsConsent: z.boolean().refine((val) => val === true, {
    message: 'You must confirm the information provided is correct',
  }),
  disclaimerConsent: z.boolean().refine((val) => val === true, {
    message: 'You must acknowledge the use disclaimer',
  }),
}).refine((data) => {
  if (data.intendedUse === 'Other') {
    return data.intendedUseOther && data.intendedUseOther.trim().length > 0;
  }
  return true;
}, {
  message: 'Please specify your intended use',
  path: ['intendedUseOther'],
}).refine((data) => {
  if (data.organizationType === 'Other') {
    return data.organizationCustom && data.organizationCustom.trim().length > 0;
  }
  return true;
}, {
  message: 'Please specify your organization',
  path: ['organizationCustom'],
}).refine((data) => {
  if (data.primaryRole === 'Other') {
    return data.primaryRoleOther && data.primaryRoleOther.trim().length > 0;
  }
  return true;
}, {
  message: 'Please specify your primary role',
  path: ['primaryRoleOther'],
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
    watch,
    setValue,
    trigger,
  } = useForm<RebsReportFormData>({
    resolver: zodResolver(rebsReportSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      intendedUse: '',
      intendedUseOther: '',
      organizationType: '',
      organizationCustom: '',
      country: 'US',
      state: '',
      county: '',
      primaryRole: '',
      primaryRoleOther: '',
      privacyConsent: false,
      newsletterOptIn: false,
      privacyTermsConsent: false,
      disclaimerConsent: false,
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
    watch,
    setValue,
    trigger,
  };
}
