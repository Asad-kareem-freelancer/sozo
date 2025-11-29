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

  // Define important fields to display (filter out unnecessary fields)
  const importantFields = [
    'firstName',
    'lastName',
    'fullName',
    'email',
    'phoneNumber',
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
    'state',
    'county',
  ];

  // Filter to only show important fields, maintaining priority order
  // Also exclude any fields specified in excludeFields prop
  const sortedKeys = importantFields
    .filter((key) => allKeys.includes(key))
    .filter((key) => !excludeFields.includes(key));

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
    // Special cases for location fields
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
                  {sortedKeys.map((key) => (
                    <td
                      key={key}
                      className={`px-6 py-4 text-sm text-gray-900 ${
                        key === 'message' ? 'max-w-lg whitespace-normal' : 'max-w-xs truncate'
                      }`}
                      title={key !== 'message' ? formatValue((item as any)[key]) : undefined}
                    >
                      {formatValue((item as any)[key])}
                    </td>
                  ))}
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
              <h3 className="font-semibold text-gray-900">{getDisplayName(item)}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.email}</p>
            </div>

            {/* Card Body */}
            <div className="px-4 py-3 space-y-3">
              {sortedKeys
                .filter((key) => !['firstName', 'lastName', 'fullName', 'email'].includes(key))
                .map((key) => {
                  const value = formatValue((item as any)[key]);
                  if (value === '-') return null;

                  return (
                    <div key={key}>
                      <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {formatHeader(key)}
                      </dt>
                      <dd className={`mt-1 text-sm text-gray-900 ${
                        key === 'message' ? 'whitespace-normal' : ''
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
