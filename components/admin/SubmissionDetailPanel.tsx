'use client';

import {
  AccessDaySubmission,
  LibrarySubmission,
  NursingSubmission,
  REBSSubmission,
  ContactSubmission,
  PartnerSubmission,
  RRGSubmission,
  SubmissionType,
} from '@/types/admin';
import { Button } from '@/components/ui/button';
import { FileText, Sheet, CheckCircle2, XCircle } from 'lucide-react';
import {
  exportSingleSubmissionToCSV,
  exportSingleSubmissionToPDF,
} from '@/lib/utils/exportSingleSubmission';

type AnySubmission =
  | AccessDaySubmission
  | LibrarySubmission
  | NursingSubmission
  | REBSSubmission
  | ContactSubmission
  | PartnerSubmission
  | RRGSubmission;

interface SubmissionDetailPanelProps {
  submission: AnySubmission | null;
  submissionType?: SubmissionType;
}

export default function SubmissionDetailPanel({
  submission,
  submissionType = 'accessday',
}: SubmissionDetailPanelProps) {
  if (!submission) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-center px-6 py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-4 text-sm font-medium text-gray-900">No submission selected</h3>
          <p className="mt-2 text-sm text-gray-500">Select a submission from the list to view details</p>
        </div>
      </div>
    );
  }

  const handleExportCSV = () => {
    exportSingleSubmissionToCSV(submission, submissionType);
  };

  const handleExportPDF = () => {
    exportSingleSubmissionToPDF(submission, submissionType);
  };

  const formatValue = (value: any): string => {
    if (value === null || value === undefined || value === '') return '-';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  };

  const formatDate = (dateString: string): string => {
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
  };

  const formatFieldName = (key: string): string => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  // Helper to get name
  const getName = () => {
    if ('fullName' in submission) return submission.fullName;
    if ('firstName' in submission && 'lastName' in submission) {
      return `${submission.firstName} ${submission.lastName}`;
    }
    return '-';
  };

  // Helper to get location
  const getLocation = () => {
    const parts = [];
    if ('county' in submission && submission.county) parts.push(submission.county);
    if ('state' in submission && submission.state) parts.push(submission.state);
    if ('country' in submission && submission.country) parts.push(submission.country);
    return parts.join(', ') || '-';
  };

  // Define field groups
  const contactFields = [
    { key: 'name', label: 'Full Name', value: getName() },
    { key: 'email', label: 'Email', value: submission.email },
    { key: 'phoneNumber', label: 'Phone Number', value: 'phoneNumber' in submission ? submission.phoneNumber : '-' },
  ];

  const organizationFields = [];
  if ('organization' in submission) {
    organizationFields.push({ key: 'organization', label: 'Organization', value: submission.organization });
  }
  if ('institution' in submission) {
    organizationFields.push({ key: 'institution', label: 'Institution', value: submission.institution });
  }
  if ('organizationType' in submission) {
    organizationFields.push({ key: 'organizationType', label: 'Organization Type', value: submission.organizationType });
  }
  if ('role' in submission) {
    organizationFields.push({ key: 'role', label: 'Role', value: submission.role });
  }
  if ('primaryRole' in submission) {
    organizationFields.push({ key: 'primaryRole', label: 'Primary Role', value: submission.primaryRole });
  }

  const interestFields = [];
  if ('areaOfInterest' in submission) {
    interestFields.push({ key: 'areaOfInterest', label: 'Area of Interest', value: submission.areaOfInterest });
  }
  if ('focusArea' in submission) {
    interestFields.push({ key: 'focusArea', label: 'Focus Area', value: submission.focusArea });
  }
  if ('intendedUse' in submission) {
    interestFields.push({ key: 'intendedUse', label: 'Intended Use', value: submission.intendedUse });
  }

  const additionalFields = [];
  if ('message' in submission) {
    additionalFields.push({ key: 'message', label: 'Message', value: submission.message });
  }

  const metadataFields = [
    { key: 'submissionId', label: 'Submission ID', value: submission.submissionId },
    { key: 'submittedAt', label: 'Submitted At', value: formatDate(submission.submittedAt) },
    { key: 'location', label: 'Location', value: getLocation() },
  ];

  // Check if submission has download tracking
  const hasDownloadStatus = (submissionType === 'rebs' || submissionType === 'rrg') && 'isDownloaded' in submission;

  const FieldGroup = ({ title, fields }: { title: string; fields: Array<{ key: string; label: string; value: any }> }) => {
    const validFields = fields.filter(f => f.value && f.value !== '-');
    if (validFields.length === 0) return null;

    return (
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">{title}</h4>
        <div className="space-y-3">
          {validFields.map((field) => (
            <div key={field.key}>
              <dt className="text-sm font-semibold text-gray-800">{field.label}</dt>
              <dd className={`mt-1 text-sm text-gray-900 ${field.key === 'message' ? 'whitespace-pre-wrap' : ''}`}>
                {formatValue(field.value)}
              </dd>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200 flex-shrink-0">
        <h3 className="text-lg font-semibold text-gray-900">{getName()}</h3>
        <p className="text-sm text-gray-600 mt-1">{submission.email}</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <FieldGroup title="Contact Information" fields={contactFields} />
        {organizationFields.length > 0 && (
          <FieldGroup title="Organization Details" fields={organizationFields} />
        )}
        {interestFields.length > 0 && (
          <FieldGroup title="Interest & Focus" fields={interestFields} />
        )}
        {additionalFields.length > 0 && (
          <FieldGroup title="Additional Information" fields={additionalFields} />
        )}
        <FieldGroup title="Metadata" fields={metadataFields} />

        {/* Download Status for REBS and RRG */}
        {hasDownloadStatus && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Download Status</h4>
            <div>
              <dt className="text-sm font-semibold text-gray-800">Report Downloaded</dt>
              <dd className="mt-1 text-sm">
                {'isDownloaded' in submission && submission.isDownloaded === true ? (
                  <div className="flex items-center gap-1.5 text-green-600">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Yes</span>
                  </div>
                ) : 'isDownloaded' in submission && submission.isDownloaded === false ? (
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <XCircle className="h-4 w-4" />
                    <span>No</span>
                  </div>
                ) : (
                  <span className="text-gray-500">-</span>
                )}
              </dd>
            </div>
          </div>
        )}
      </div>

      {/* Export Buttons */}
      <div className="border-t border-gray-200 p-4 flex-shrink-0 bg-gray-50 space-y-2">
        <p className="text-xs font-medium text-gray-700 mb-3">Export this submission</p>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            className="w-full"
          >
            <Sheet className="h-4 w-4 mr-2" />
            CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportPDF}
            className="w-full"
          >
            <FileText className="h-4 w-4 mr-2" />
            PDF
          </Button>
        </div>
      </div>
    </div>
  );
}
