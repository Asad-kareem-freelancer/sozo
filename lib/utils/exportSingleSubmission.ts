import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

type AnySubmission = any;

// Helper to format field names
function formatFieldName(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

// Helper to format values
function formatValue(value: any): string {
  if (value === null || value === undefined || value === '') return '-';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

// Helper to format date
function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateString;
  }
}

// Helper to get name from submission
function getName(submission: AnySubmission): string {
  if (submission.fullName) return submission.fullName;
  if (submission.firstName && submission.lastName) {
    return `${submission.firstName} ${submission.lastName}`;
  }
  return 'Unknown';
}

// Helper to get location
function getLocation(submission: AnySubmission): string {
  const parts = [];
  if (submission.county) parts.push(submission.county);
  if (submission.state) parts.push(submission.state);
  if (submission.country) parts.push(submission.country);
  return parts.join(', ') || '-';
}

// Get all fields from submission organized by sections
function getSubmissionFields(submission: AnySubmission): Array<{
  section: string;
  fields: Array<{ label: string; value: string }>;
}> {
  const sections = [];

  // Contact Information
  const contactFields = [
    { label: 'Full Name', value: getName(submission) },
    { label: 'Email', value: submission.email || '-' },
    { label: 'Phone Number', value: submission.phoneNumber || '-' },
  ];
  sections.push({ section: 'Contact Information', fields: contactFields });

  // Organization Details
  const orgFields = [];
  if (submission.organization) {
    orgFields.push({ label: 'Organization', value: submission.organization });
  }
  if (submission.institution) {
    orgFields.push({ label: 'Institution', value: submission.institution });
  }
  if (submission.organizationType) {
    orgFields.push({ label: 'Organization Type', value: submission.organizationType });
  }
  if (submission.organizationCustom) {
    orgFields.push({ label: 'Organization (Custom)', value: submission.organizationCustom });
  }
  if (submission.role) {
    orgFields.push({ label: 'Role', value: submission.role });
  }
  if (submission.primaryRole) {
    orgFields.push({ label: 'Primary Role', value: submission.primaryRole });
  }
  if (submission.primaryRoleOther) {
    orgFields.push({ label: 'Primary Role (Other)', value: submission.primaryRoleOther });
  }
  if (orgFields.length > 0) {
    sections.push({ section: 'Organization Details', fields: orgFields });
  }

  // Interest & Focus
  const interestFields = [];
  if (submission.areaOfInterest) {
    interestFields.push({ label: 'Area of Interest', value: submission.areaOfInterest });
  }
  if (submission.focusArea) {
    interestFields.push({ label: 'Focus Area', value: submission.focusArea });
  }
  if (submission.intendedUse) {
    interestFields.push({ label: 'Intended Use', value: submission.intendedUse });
  }
  if (submission.intendedUseOther) {
    interestFields.push({ label: 'Intended Use (Other)', value: submission.intendedUseOther });
  }
  if (interestFields.length > 0) {
    sections.push({ section: 'Interest & Focus', fields: interestFields });
  }

  // Additional Information
  const additionalFields = [];
  if (submission.message) {
    additionalFields.push({ label: 'Message', value: submission.message });
  }
  if (additionalFields.length > 0) {
    sections.push({ section: 'Additional Information', fields: additionalFields });
  }

  // Consent & Preferences
  const consentFields = [];
  if (submission.consent !== undefined) {
    consentFields.push({ label: 'Consent', value: formatValue(submission.consent) });
  }
  if (submission.privacyConsent !== undefined) {
    consentFields.push({ label: 'Privacy Consent', value: formatValue(submission.privacyConsent) });
  }
  if (submission.privacyTermsConsent !== undefined) {
    consentFields.push({
      label: 'Privacy Terms Consent',
      value: formatValue(submission.privacyTermsConsent),
    });
  }
  if (submission.disclaimerConsent !== undefined) {
    consentFields.push({
      label: 'Disclaimer Consent',
      value: formatValue(submission.disclaimerConsent),
    });
  }
  if (submission.newsletterOptIn !== undefined) {
    consentFields.push({
      label: 'Newsletter Opt-In',
      value: formatValue(submission.newsletterOptIn),
    });
  }
  if (consentFields.length > 0) {
    sections.push({ section: 'Consent & Preferences', fields: consentFields });
  }

  // Metadata
  const metadataFields = [
    { label: 'Submission ID', value: submission.submissionId || '-' },
    { label: 'Submitted At', value: formatDate(submission.submittedAt) },
    { label: 'Location', value: getLocation(submission) },
  ];
  sections.push({ section: 'Metadata', fields: metadataFields });

  return sections;
}

// Export single submission to CSV
export function exportSingleSubmissionToCSV(
  submission: AnySubmission,
  submissionType: string
): void {
  const sections = getSubmissionFields(submission);
  const name = getName(submission);
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `${submissionType}-${name.toLowerCase().replace(/\s+/g, '-')}-${timestamp}`;

  // Create CSV content
  const csvRows: string[] = [];

  // Add header
  csvRows.push('Field,Value');

  // Add all sections and fields
  sections.forEach((section) => {
    // Add section header
    csvRows.push(`\n"${section.section}",`);

    // Add fields
    section.fields.forEach((field) => {
      const value = field.value.replace(/"/g, '""');
      const wrappedValue =
        value.includes(',') || value.includes('"') || value.includes('\n')
          ? `"${value}"`
          : value;
      csvRows.push(`"${field.label}",${wrappedValue}`);
    });
  });

  const csvContent = csvRows.join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Export single submission to PDF
export function exportSingleSubmissionToPDF(
  submission: AnySubmission,
  submissionType: string
): void {
  const sections = getSubmissionFields(submission);
  const name = getName(submission);
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `${submissionType}-${name.toLowerCase().replace(/\s+/g, '-')}-${timestamp}`;

  // Create PDF document
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Add header
  doc.setFillColor(71, 85, 105); // slate-600
  doc.rect(0, 0, 210, 35, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.text('Submission Details', 14, 15);

  doc.setFontSize(12);
  doc.text(name, 14, 24);
  doc.setFontSize(10);
  doc.text(submission.email || '', 14, 30);

  // Reset text color
  doc.setTextColor(0, 0, 0);

  let yPosition = 45;

  // Add sections
  sections.forEach((section, sectionIndex) => {
    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    // Section title
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(71, 85, 105); // slate-600
    doc.text(section.section, 14, yPosition);
    yPosition += 7;

    // Section fields
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);

    section.fields.forEach((field) => {
      // Check if we need a new page
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }

      // Field label (bold)
      doc.setFont('helvetica', 'bold');
      doc.text(field.label + ':', 14, yPosition);

      // Field value (normal)
      doc.setFont('helvetica', 'normal');
      const maxWidth = 180;
      const lines = doc.splitTextToSize(field.value, maxWidth);

      // If multiple lines, move value to next line
      if (lines.length > 1 || field.label.length > 30) {
        yPosition += 5;
        lines.forEach((line: string, index: number) => {
          if (yPosition > 280) {
            doc.addPage();
            yPosition = 20;
          }
          doc.text(line, 20, yPosition);
          if (index < lines.length - 1) {
            yPosition += 5;
          }
        });
        yPosition += 6;
      } else {
        doc.text(field.value, 60, yPosition);
        yPosition += 6;
      }
    });

    // Add spacing between sections
    if (sectionIndex < sections.length - 1) {
      yPosition += 5;
    }
  });

  // Add footer with generation date
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Generated on ${new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })}`,
      14,
      287
    );
    doc.text(`Page ${i} of ${pageCount}`, 180, 287);
  }

  // Save PDF
  doc.save(`${filename}.pdf`);
}
