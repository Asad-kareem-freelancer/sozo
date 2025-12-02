import type {
  AccessDaySubmission,
  LibrarySubmission,
  NursingSubmission,
  REBSSubmission,
  ContactSubmission,
  PartnerSubmission,
  RRGSubmission,
  FilterConfig,
} from '@/types/admin';

type AnySubmission =
  | AccessDaySubmission
  | LibrarySubmission
  | NursingSubmission
  | REBSSubmission
  | ContactSubmission
  | PartnerSubmission
  | RRGSubmission;

// Helper to get name from submission
export const getName = (item: any): string => {
  if (item.fullName) return item.fullName;
  if (item.firstName && item.lastName) return `${item.firstName} ${item.lastName}`;
  if (item.firstName) return item.firstName;
  if (item.lastName) return item.lastName;
  return 'Unknown';
};

// Helper to get organization from submission
export const getOrganization = (item: any): string => {
  if (item.organization) return item.organization;
  if (item.institution) return item.institution;
  if (item.organizationType) return item.organizationType;
  return '';
};

// Helper to get intended use from submission
export const getIntendedUse = (item: any): string => {
  if (item.intendedUse) return item.intendedUse;
  return '';
};

// Main filtering function
export function filterSubmissions<T extends AnySubmission>(
  submissions: T[],
  filters: FilterConfig
): T[] {
  return submissions.filter((submission) => {
    // Search filter (Name, Email, Phone, Organization)
    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase();
      const name = getName(submission).toLowerCase();
      const email = submission.email.toLowerCase();
      const phone = (submission.phoneNumber || '').toLowerCase();
      const org = getOrganization(submission).toLowerCase();

      const matchesSearch =
        name.includes(searchLower) ||
        email.includes(searchLower) ||
        phone.includes(searchLower) ||
        org.includes(searchLower);

      if (!matchesSearch) return false;
    }

    // Country filter
    if (filters.country && 'country' in submission) {
      if (submission.country !== filters.country) return false;
    }

    // State filter
    if (filters.state && 'state' in submission) {
      if (submission.state !== filters.state) return false;
    }

    // Organization filter
    if (filters.organization) {
      const org = getOrganization(submission);
      if (org !== filters.organization) return false;
    }

    // Intended use filter
    if (filters.intendedUse) {
      const intendedUse = getIntendedUse(submission);
      if (intendedUse !== filters.intendedUse) return false;
    }

    // Date range filter
    if (filters.dateRange.from || filters.dateRange.to) {
      const submissionDate = new Date(submission.submittedAt);

      if (filters.dateRange.from) {
        const fromDate = new Date(filters.dateRange.from);
        fromDate.setHours(0, 0, 0, 0);
        if (submissionDate < fromDate) return false;
      }

      if (filters.dateRange.to) {
        const toDate = new Date(filters.dateRange.to);
        toDate.setHours(23, 59, 59, 999);
        if (submissionDate > toDate) return false;
      }
    }

    return true;
  });
}

// Helper to get unique values for filter dropdowns
export function getUniqueValues<T extends AnySubmission>(
  submissions: T[],
  field: 'country' | 'state' | 'organization' | 'intendedUse'
): string[] {
  const values = new Set<string>();

  submissions.forEach((submission) => {
    let value = '';

    switch (field) {
      case 'country':
        if ('country' in submission && submission.country) {
          value = submission.country;
        }
        break;
      case 'state':
        if ('state' in submission && submission.state) {
          value = submission.state;
        }
        break;
      case 'organization':
        value = getOrganization(submission);
        break;
      case 'intendedUse':
        value = getIntendedUse(submission);
        break;
    }

    if (value) values.add(value);
  });

  return Array.from(values).sort();
}

// Check if any filters are active
export function hasActiveFilters(filters: FilterConfig): boolean {
  return !!(
    filters.searchText ||
    filters.country ||
    filters.state ||
    filters.organization ||
    filters.intendedUse ||
    filters.dateRange.from ||
    filters.dateRange.to
  );
}

// Get empty filter state
export function getEmptyFilters(): FilterConfig {
  return {
    searchText: '',
    country: '',
    state: '',
    organization: '',
    intendedUse: '',
    dateRange: {
      from: null,
      to: null,
    },
  };
}
