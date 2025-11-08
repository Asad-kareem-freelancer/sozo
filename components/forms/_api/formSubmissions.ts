import type { NursingXchangeFormData } from '../hooks/useNursingXchangeForm';
import type { AccessDayFormData } from '../hooks/useAccessDayForm';
import type { LibraryHubFormData } from '../hooks/useLibraryHubForm';

// API endpoint
const API_ENDPOINT = 'https://ifadpqxffinephnqbu3rdynqji0tfyqw.lambda-url.us-east-1.on.aws/';

// Form types
type FormType = 'nursing' | 'accessday' | 'library';

// Generic API request payload
interface FormSubmissionPayload<T> {
  formType: FormType;
  data: T;
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
  data: T
): Promise<ApiResponse> {
  try {
    const payload: FormSubmissionPayload<T> = {
      formType,
      data,
    };

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
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
