import { BaseSubmission } from '@/types/admin';

interface SubmissionsTableProps<T extends BaseSubmission> {
  data: T[];
  title: string;
  excludeFields?: string[];
}

export default function SubmissionsTable<T extends BaseSubmission>({
  data,
  title,
  excludeFields = [],
}: SubmissionsTableProps<T>) {
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

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
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
  );
}
