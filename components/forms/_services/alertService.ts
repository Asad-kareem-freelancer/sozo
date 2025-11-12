import Swal from 'sweetalert2';

// Common SweetAlert configuration
const commonConfig = {
  confirmButtonText: 'OK',
  confirmButtonColor: '#2563eb',
  zIndex: 99999,
  customClass: {
    popup: 'bg-white rounded-lg p-6 shadow-lg pointer-events-auto',
  },
};

/**
 * Show success confirmation after form submission
 */
export async function showSuccessAlert(): Promise<void> {
  await Swal.fire({
    icon: 'success',
    title: 'Thank you.',
    html: `
      <p>Your submission has been received.</p>
      <p>The SozoRock Foundation reviews each entry to ensure proper follow-up and documentation.</p>
      <p style="margin-top: 12px; font-size: 0.9em; color: #666;">A confirmation email has been sent from contact@sozorockfoundation.org for your records.</p>
    `,
    ...commonConfig,
  });
}

/**
 * Show error alert for API or validation errors
 * @param message - Optional custom error message
 */
export async function showErrorAlert(message?: string): Promise<void> {
  await Swal.fire({
    icon: 'error',
    title: 'Unable to Submit',
    html: `
      <p>${message || 'We encountered an issue processing your submission.'}</p>
      <p style="margin-top: 12px; font-size: 0.9em; color: #666;">Please check your information and try again. If the problem persists, contact us at contact@sozorockfoundation.org</p>
    `,
    ...commonConfig,
  });
}

/**
 * Show connection error alert for network issues
 */
export async function showConnectionError(): Promise<void> {
  await Swal.fire({
    icon: 'error',
    title: 'Connection Error',
    html: `
      <p>Unable to connect to the server.</p>
      <p style="margin-top: 12px; font-size: 0.9em; color: #666;">Please check your internet connection and try again.</p>
    `,
    ...commonConfig,
  });
}

/**
 * Show success alert for report downloads with download link
 * @param reportTitle - The title/name of the report
 * @param downloadUrl - The URL to download the report
 */
export async function showReportSuccessAlert(reportTitle: string, downloadUrl: string): Promise<void> {
  await Swal.fire({
    icon: 'success',
    title: 'Thank you.',
    html: `
      <p>Your request for <strong>${reportTitle}</strong> has been received.</p>
      <p style="margin-top: 12px;">Click the button below to download your report:</p>
      <p style="margin-top: 16px;">
        <a href="${downloadUrl}"
           download
           target="_blank"
           style="display: inline-block; padding: 10px 24px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-weight: 500;">
          Download Report
        </a>
      </p>
    `,
    showConfirmButton: false,
    zIndex: 99999,
    customClass: {
      popup: 'bg-white rounded-lg p-6 shadow-lg pointer-events-auto',
    },
  });
}
