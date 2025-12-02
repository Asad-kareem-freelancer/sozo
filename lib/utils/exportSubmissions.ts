import jsPDF from 'jspdf';
import 'jspdf-autotable';
import type { ExportColumn } from '@/types/admin';
import { getName, getOrganization, getIntendedUse } from './filterSubmissions';

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

type AnySubmission = any;

// Helper to get value from submission based on column key
function getValueFromSubmission(submission: AnySubmission, key: string): string {
  switch (key) {
    case 'name':
      return getName(submission);
    case 'email':
      return submission.email || '';
    case 'phone':
      return submission.phoneNumber || '';
    case 'organization':
      return getOrganization(submission);
    case 'role':
      return submission.role || submission.primaryRole || '';
    case 'intendedUse':
      return getIntendedUse(submission);
    case 'country':
      return submission.country || '';
    case 'state':
      return submission.state || '';
    case 'county':
      return submission.county || '';
    case 'submittedAt':
      return new Date(submission.submittedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    case 'areaOfInterest':
      return submission.areaOfInterest || '';
    case 'focusArea':
      return submission.focusArea || '';
    case 'message':
      return submission.message || '';
    case 'institution':
      return submission.institution || '';
    default:
      return '';
  }
}

// Export to CSV
export function exportToCSV(
  data: AnySubmission[],
  columns: ExportColumn[],
  filename: string
): void {
  const enabledColumns = columns.filter((col) => col.enabled);

  if (enabledColumns.length === 0) {
    alert('Please select at least one column to export');
    return;
  }

  if (data.length === 0) {
    alert('No data to export');
    return;
  }

  // Create CSV header
  const headers = enabledColumns.map((col) => col.label);
  const csvContent = [
    headers.join(','),
    ...data.map((item) =>
      enabledColumns
        .map((col) => {
          const value = getValueFromSubmission(item, col.key);
          // Escape quotes and wrap in quotes if contains comma or quote
          const escaped = value.replace(/"/g, '""');
          return escaped.includes(',') || escaped.includes('"') || escaped.includes('\n')
            ? `"${escaped}"`
            : escaped;
        })
        .join(',')
    ),
  ].join('\n');

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

// Export to PDF
export function exportToPDF(
  data: AnySubmission[],
  columns: ExportColumn[],
  filename: string,
  title: string
): void {
  const enabledColumns = columns.filter((col) => col.enabled);

  if (enabledColumns.length === 0) {
    alert('Please select at least one column to export');
    return;
  }

  if (data.length === 0) {
    alert('No data to export');
    return;
  }

  // Create new PDF document
  const doc = new jsPDF({
    orientation: enabledColumns.length > 5 ? 'landscape' : 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Add title
  doc.setFontSize(16);
  doc.text(title, 14, 15);

  // Add subtitle with count and date
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(
    `Total Records: ${data.length} | Generated: ${new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })}`,
    14,
    22
  );

  // Prepare table data
  const headers = enabledColumns.map((col) => col.label);
  const rows = data.map((item) =>
    enabledColumns.map((col) => getValueFromSubmission(item, col.key))
  );

  // Add table
  doc.autoTable({
    head: [headers],
    body: rows,
    startY: 28,
    styles: {
      fontSize: 8,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [71, 85, 105], // slate-600
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [249, 250, 251], // gray-50
    },
    margin: { top: 28, right: 14, bottom: 14, left: 14 },
  });

  // Save PDF
  doc.save(`${filename}.pdf`);
}

// Get default columns for each submission type
export function getDefaultColumns(submissionType: string): ExportColumn[] {
  const baseColumns: ExportColumn[] = [
    { key: 'name', label: 'Name', enabled: true },
    { key: 'email', label: 'Email', enabled: true },
    { key: 'phone', label: 'Phone', enabled: true },
    { key: 'submittedAt', label: 'Submission Date', enabled: true },
  ];

  switch (submissionType) {
    case 'accessday':
      return [
        ...baseColumns,
        { key: 'organization', label: 'Organization', enabled: true },
        { key: 'role', label: 'Role', enabled: true },
        { key: 'areaOfInterest', label: 'Area of Interest', enabled: false },
        { key: 'country', label: 'Country', enabled: false },
        { key: 'state', label: 'State', enabled: false },
        { key: 'county', label: 'County', enabled: false },
      ];

    case 'library':
      return [
        ...baseColumns,
        { key: 'organization', label: 'Organization', enabled: true },
        { key: 'role', label: 'Role', enabled: true },
        { key: 'areaOfInterest', label: 'Area of Interest', enabled: false },
        { key: 'country', label: 'Country', enabled: false },
        { key: 'state', label: 'State', enabled: false },
        { key: 'county', label: 'County', enabled: false },
      ];

    case 'nursing':
      return [
        ...baseColumns,
        { key: 'institution', label: 'Institution', enabled: true },
        { key: 'role', label: 'Role', enabled: true },
        { key: 'country', label: 'Country', enabled: false },
        { key: 'state', label: 'State', enabled: false },
        { key: 'county', label: 'County', enabled: false },
      ];

    case 'rebs':
      return [
        ...baseColumns,
        { key: 'organization', label: 'Organization Type', enabled: true },
        { key: 'role', label: 'Primary Role', enabled: true },
        { key: 'intendedUse', label: 'Intended Use', enabled: true },
        { key: 'country', label: 'Country', enabled: false },
        { key: 'state', label: 'State', enabled: false },
        { key: 'county', label: 'County', enabled: false },
      ];

    case 'rrg':
      return [
        ...baseColumns,
        { key: 'organization', label: 'Organization Type', enabled: true },
        { key: 'role', label: 'Primary Role', enabled: true },
        { key: 'intendedUse', label: 'Intended Use', enabled: true },
        { key: 'country', label: 'Country', enabled: false },
        { key: 'state', label: 'State', enabled: false },
        { key: 'county', label: 'County', enabled: false },
      ];

    case 'contact':
      return [
        ...baseColumns,
        { key: 'message', label: 'Message', enabled: true },
      ];

    case 'partner':
      return [
        ...baseColumns,
        { key: 'organization', label: 'Organization', enabled: true },
        { key: 'role', label: 'Role', enabled: true },
        { key: 'focusArea', label: 'Focus Area', enabled: false },
        { key: 'message', label: 'Message', enabled: false },
        { key: 'country', label: 'Country', enabled: false },
        { key: 'state', label: 'State', enabled: false },
        { key: 'county', label: 'County', enabled: false },
      ];

    default:
      return baseColumns;
  }
}
