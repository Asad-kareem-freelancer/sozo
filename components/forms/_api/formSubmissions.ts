import type { NursingXchangeFormData } from '../hooks/useNursingXchangeForm';
import type { AccessDayFormData } from '../hooks/useAccessDayForm';
import type { LibraryHubFormData } from '../hooks/useLibraryHubForm';
import type { ContactFormValues } from '@/lib/hooks/useContactForm';
import type { PartnerWithUsFormValues } from '@/lib/hooks/usePartnerWithUsForm';
import type { RebsReportFormData } from '../hooks/useRebsReportForm';
import type { RrgReportFormData } from '../hooks/useRrgReportForm';
import type { HsaReportFormData } from '../hooks/useHsaReportForm';

// API endpoint
const API_ENDPOINT = 'https://ifadpqxffinephnqbu3rdynqji0tfyqw.lambda-url.us-east-1.on.aws/';

// Form types
type FormType = 'nursing' | 'accessday' | 'library' | 'contact' | 'partner' | 'rebs' | 'rrg' | 'hsa';

// Generic API request payload
interface FormSubmissionPayload<T> {
  formType: FormType;
  data: T & { isDownloaded?: boolean };
}

// API response types
interface ApiSuccessResponse {
  success: true;
  message?: string;
}

interface ApiErrorResponse {
  success: false;
  error: string;
  message?: string;
}

type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

// Generic form submission function
async function submitForm<T>(
  formType: FormType,
  data: T,
  isDownload?: boolean
): Promise<ApiResponse> {
  try {
    const payload: FormSubmissionPayload<T> = {
      formType,
      data: {
        ...data,
        isDownloaded: isDownload,
      },
    };

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.ok) {
      // Normalize successful response
      return {
        success: true,
        message: result.message || 'Submission successful',
      };
    } else {
      // Normalize error response
      return {
        success: false,
        error: result.error || result.message || 'Submission failed',
        message: result.message,
      };
    }
  } catch (error) {
    console.error('API submission error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

// Specific form submission functions

export async function submitNursingForm(
  data: NursingXchangeFormData
): Promise<ApiResponse> {
  return submitForm('nursing', data);
}

export async function submitAccessDayForm(
  data: AccessDayFormData
): Promise<ApiResponse> {
  return submitForm('accessday', data);
}

export async function submitLibraryForm(
  data: LibraryHubFormData
): Promise<ApiResponse> {
  return submitForm('library', data);
}

export async function submitContactForm(
  data: ContactFormValues
): Promise<ApiResponse> {
  return submitForm('contact', data);
}

export async function submitPartnerWithUsForm(
  data: PartnerWithUsFormValues
): Promise<ApiResponse> {
  return submitForm('partner', data);
}

export async function submitRebsReportForm(
  data: RebsReportFormData,
  isDownload?: boolean
): Promise<ApiResponse> {
  return submitForm('rebs', data, isDownload);
}

export async function submitRrgReportForm(
  data: RrgReportFormData,
  isDownload?: boolean
): Promise<ApiResponse> {
  return submitForm('rrg', data, isDownload);
}

export async function submitHsaReportForm(
  data: HsaReportFormData
): Promise<ApiResponse> {
  return submitForm('hsa', data);
}
