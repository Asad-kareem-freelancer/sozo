// Base submission fields
export interface BaseSubmission {
  submissionId: string;
  submittedAt: string;
  email: string;
}

// Access Day submission
export interface AccessDaySubmission extends BaseSubmission {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  organization: string;
  role: string;
  areaOfInterest: string;
  country: string;
  state: string;
  county: string;
  consent: boolean;
}

// Library submission
export interface LibrarySubmission extends BaseSubmission {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  organization: string;
  organizationOther: string;
  role: string;
  areaOfInterest: string;
  country: string;
  state: string;
  county: string;
  consent: boolean;
}

// Nursing submission
export interface NursingSubmission extends BaseSubmission {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  institution: string;
  role: string;
  country: string;
  state: string;
  county: string;
  consent: boolean;
}

// REBS submission
export interface REBSSubmission extends BaseSubmission {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  organizationType: string;
  organizationCustom: string;
  primaryRole: string;
  primaryRoleOther: string;
  intendedUse: string;
  intendedUseOther: string;
  country: string;
  state: string;
  county: string;
  privacyConsent: boolean;
  privacyTermsConsent: boolean;
  disclaimerConsent: boolean;
  newsletterOptIn: boolean;
}

// Contact submission
export interface ContactSubmission extends BaseSubmission {
  fullName: string;
  phoneNumber: string;
  message: string;
}

// Partner submission
export interface PartnerSubmission extends BaseSubmission {
  fullName: string;
  phoneNumber: string;
  organization: string;
  organizationOther: string;
  role: string;
  focusArea: string;
  message: string;
  country: string;
  state: string;
  county: string;
  privacyConsent: boolean;
}

// RRG submission
export interface RRGSubmission extends BaseSubmission {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  organizationType: string;
  organizationCustom: string;
  primaryRole: string;
  primaryRoleOther: string;
  intendedUse: string;
  intendedUseOther: string;
  country: string;
  state: string;
  county: string;
  privacyConsent: boolean;
  privacyTermsConsent: boolean;
  disclaimerConsent: boolean;
  newsletterOptIn: boolean;
}

// Table data structure
export interface TableData<T> {
  items: T[];
  count: number;
}

// Main API response structure
export interface AdminAPIResponse {
  message: string;
  data: {
    accessday: TableData<AccessDaySubmission>;
    library: TableData<LibrarySubmission>;
    nursing: TableData<NursingSubmission>;
    rebs: TableData<REBSSubmission>;
    contact: TableData<ContactSubmission>;
    partner: TableData<PartnerSubmission>;
    rrg: TableData<RRGSubmission>;
  };
}

// Tab configuration
export type SubmissionType = 'accessday' | 'library' | 'nursing' | 'rebs' | 'contact' | 'partner' | 'rrg';

export interface TabConfig {
  key: SubmissionType;
  label: string;
  description: string;
}

// Filter types
export interface FilterConfig {
  searchText: string;
  country: string;
  state: string;
  organization: string;
  intendedUse: string;
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
}

export interface FilterBarConfig {
  showCountry?: boolean;
  showState?: boolean;
  showOrganization?: boolean;
  showIntendedUse?: boolean;
  showDateRange?: boolean;
  organizationLabel?: string;
  organizationOptions?: string[];
  intendedUseOptions?: string[];
}

// Export types
export interface ExportColumn {
  key: string;
  label: string;
  enabled: boolean;
}

export type ExportFormat = 'csv' | 'pdf';

export interface ExportConfig {
  columns: ExportColumn[];
  format: ExportFormat;
}
