const DELETE_API_URL = 'https://kdxcosxxywl4eiyaxntj3kg6lu0kgmpm.lambda-url.us-east-1.on.aws/';

export type FormType = 'accessday' | 'library' | 'nursing' | 'rebs' | 'contact' | 'partner' | 'rrg';

export interface DeleteSubmissionRequest {
  formType: FormType;
  submissionId: string;
}

export interface DeleteSubmissionResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export class SubmissionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SubmissionError';
  }
}

/**
 * Delete a submission by ID and form type
 */
export async function deleteSubmission(
  formType: FormType,
  submissionId: string
): Promise<DeleteSubmissionResponse> {
  try {
    const response = await fetch(DELETE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formType,
        submissionId,
      } as DeleteSubmissionRequest),
    });

    if (response.ok) {
      return {
        success: true,
        message: 'Submission deleted successfully',
      };
    }

    // Handle error responses
    let errorMessage = 'Failed to delete submission';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch {
      // If response is not JSON, use default error message
    }

    return {
      success: false,
      error: errorMessage,
    };
  } catch (error) {
    console.error('Delete submission error:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection and try again.',
    };
  }
}
