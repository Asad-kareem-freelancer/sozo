import {
  AccessDaySubmission,
  LibrarySubmission,
  NursingSubmission,
  REBSSubmission,
  ContactSubmission,
  PartnerSubmission,
  RRGSubmission,
} from '@/types/admin';

type AnySubmission =
  | AccessDaySubmission
  | LibrarySubmission
  | NursingSubmission
  | REBSSubmission
  | ContactSubmission
  | PartnerSubmission
  | RRGSubmission;

interface SubmissionsTableProps {
  data: AnySubmission[];
  title: string;
  excludeFields?: string[];
}

export default function SubmissionsTable({
  data,
  title,
  excludeFields = [],
}: SubmissionsTableProps) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <p className="text-gray-500">No {title.toLowerCase()} submissions found</p>
      </div>
    );
  }

  // Get all unique keys from the data
  const allKeys = Array.from(
    new Set(
      data.flatMap((item) => Object.keys(item))
    )
  );

  // Helper to create merged data with combined columns
  const getMergedValue = (item: any, key: string): string => {
    if (key === 'name') {
      if (item.fullName) return item.fullName;
      if (item.firstName && item.lastName) return `${item.firstName} ${item.lastName}`;
      if (item.firstName) return item.firstName;
      if (item.lastName) return item.lastName;
      return '-';
    }

    if (key === 'contact') {
      const email = item.email || '';
      const phone = item.phoneNumber || '';
      if (email && phone) return `${email} (${phone})`;
      if (email) return email;
      if (phone) return phone;
      return '-';
    }

    if (key === 'location') {
      const state = item.state || '';
      const county = item.county || '';
      if (state && county) return `${state}, ${county}`;
      if (state) return state;
      if (county) return county;
      return '-';
    }

    return formatValue((item as any)[key]);
  };

  // Helper to render contact column with styled phone number
  const renderContactCell = (item: any) => {
    const email = item.email || '';
    const phone = item.phoneNumber || '';

    if (email && phone) {
      return (
        <div className="flex flex-col gap-1">
          <div>{email}</div>
          <div className="text-gray-500">{phone}</div>
        </div>
      );
    }
    if (email) return email;
    if (phone) return <span className="text-gray-500">{phone}</span>;
    return '-';
  };

  // Define important fields to display (filter out unnecessary fields)
  // Using merged columns: name, contact, location
  const importantFields = [
    'name',
    'contact',
    'organization',
    'organizationType',
    'institution',
    'role',
    'primaryRole',
    'areaOfInterest',
    'focusArea',
    'intendedUse',
    'message',
    'country',
    'location',
  ];

  // Filter to only show important fields that have data
  const sortedKeys = importantFields.filter((key) => {
    // For merged columns, check if any of the source fields exist
    if (key === 'name') {
      return allKeys.includes('firstName') || allKeys.includes('lastName') || allKeys.includes('fullName');
    }
    if (key === 'contact') {
      return allKeys.includes('email') || allKeys.includes('phoneNumber');
    }
    if (key === 'location') {
      return allKeys.includes('state') || allKeys.includes('county');
    }
    // For regular fields, check if they exist
    return allKeys.includes(key);
  }).filter((key) => !excludeFields.includes(key));

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (typeof value === 'object') return JSON.stringify(value);
    if (typeof value === 'string' && value.includes('T') && value.includes('Z')) {
      // Format date
      try {
        return new Date(value).toLocaleString();
      } catch {
        return value;
      }
    }
    return String(value);
  };

  const formatHeader = (key: string): string => {
    // Special cases for merged columns
    if (key === 'name') return 'Name';
    if (key === 'contact') return 'Contact';
    if (key === 'location') return 'Location';

    // Special cases for location fields (kept for backward compatibility)
    if (key === 'state') return 'State/Province';
    if (key === 'county') return 'County/Region';

    // Default formatting
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  // Helper to get display name from submission
  const getDisplayName = (item: any): string => {
    if (item.fullName) return item.fullName;
    if (item.firstName && item.lastName) return `${item.firstName} ${item.lastName}`;
    if (item.firstName) return item.firstName;
    if (item.lastName) return item.lastName;
    return 'Unknown';
  };

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {sortedKeys.map((key) => (
                  <th
                    key={key}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    {formatHeader(key)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr key={item.submissionId || index} className="hover:bg-gray-50 transition">
                  {sortedKeys.map((key) => {
                    const displayValue = key === 'contact' ? null : getMergedValue(item, key);
                    return (
                      <td
                        key={key}
                        className={`px-6 py-4 text-sm text-gray-900 ${
                          key === 'message' ? 'max-w-lg whitespace-normal' :
                          key === 'contact' ? 'max-w-sm whitespace-normal' :
                          'max-w-xs truncate'
                        }`}
                        title={key !== 'message' && key !== 'contact' ? displayValue ?? undefined : undefined}
                      >
                        {key === 'contact' ? renderContactCell(item) : displayValue}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden space-y-4">
        {data.map((item, index) => (
          <div
            key={item.submissionId || index}
            className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
          >
            {/* Card Header */}
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">{getMergedValue(item, 'name')}</h3>
              <p className="text-sm text-gray-600 mt-1">{renderContactCell(item)}</p>
            </div>

            {/* Card Body */}
            <div className="px-4 py-3 space-y-3">
              {sortedKeys
                .filter((key) => !['name', 'contact'].includes(key))
                .map((key) => {
                  const value = getMergedValue(item, key);
                  if (value === '-') return null;

                  return (
                    <div key={key}>
                      <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {formatHeader(key)}
                      </dt>
                      <dd className={`mt-1 text-sm text-gray-900 ${
                        key === 'message' || key === 'location' ? 'whitespace-normal' : ''
                      }`}>
                        {value}
                      </dd>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
