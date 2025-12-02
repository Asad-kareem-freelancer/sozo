'use client';

import { useState, useMemo } from 'react';
import {
  AccessDaySubmission,
  LibrarySubmission,
  NursingSubmission,
  REBSSubmission,
  ContactSubmission,
  PartnerSubmission,
  RRGSubmission,
  FilterConfig,
  FilterBarConfig,
  ExportColumn,
  ExportFormat,
  SubmissionType,
} from '@/types/admin';
import SubmissionDetailPanel from './SubmissionDetailPanel';
import FilterBar from './FilterBar';
import ExportModal from './ExportModal';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { filterSubmissions, getUniqueValues } from '@/lib/utils/filterSubmissions';
import { exportToCSV, exportToPDF, getDefaultColumns } from '@/lib/utils/exportSubmissions';
import { Download } from 'lucide-react';

type AnySubmission =
  | AccessDaySubmission
  | LibrarySubmission
  | NursingSubmission
  | REBSSubmission
  | ContactSubmission
  | PartnerSubmission
  | RRGSubmission;

interface MasterDetailViewProps {
  data: AnySubmission[];
  title: string;
  filterConfig: FilterBarConfig;
  submissionType: SubmissionType;
}

export default function MasterDetailView({ data, title, filterConfig, submissionType }: MasterDetailViewProps) {
  const [selectedSubmission, setSelectedSubmission] = useState<AnySubmission | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterConfig>({
    searchText: '',
    country: '',
    state: '',
    organization: '',
    intendedUse: '',
    dateRange: { from: null, to: null },
  });

  // Generate dynamic filter options from data
  const countryOptions = useMemo(() => getUniqueValues(data, 'country'), [data]);
  const stateOptions = useMemo(() => {
    if (filters.country) {
      return getUniqueValues(
        data.filter((item) => 'country' in item && item.country === filters.country),
        'state'
      );
    }
    return getUniqueValues(data, 'state');
  }, [data, filters.country]);
  const organizationOptions = useMemo(() => getUniqueValues(data, 'organization'), [data]);
  const intendedUseOptions = useMemo(() => getUniqueValues(data, 'intendedUse'), [data]);

  // Apply filters to data
  const filteredData = useMemo(() => filterSubmissions(data, filters), [data, filters]);

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <p className="text-gray-500">No {title.toLowerCase()} submissions found</p>
      </div>
    );
  }

  // Helper to get name
  const getName = (item: any): string => {
    if (item.fullName) return item.fullName;
    if (item.firstName && item.lastName) return `${item.firstName} ${item.lastName}`;
    if (item.firstName) return item.firstName;
    if (item.lastName) return item.lastName;
    return 'Unknown';
  };

  // Helper to get organization
  const getOrganization = (item: any): string => {
    if (item.organization) return item.organization;
    if (item.institution) return item.institution;
    if (item.organizationType) return item.organizationType;
    return '';
  };

  // Helper to format date
  const formatDate = (dateString: string): string => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const handleSelectSubmission = (submission: AnySubmission) => {
    setSelectedSubmission(submission);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleExport = (selectedColumns: ExportColumn[], format: ExportFormat) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `${title.toLowerCase().replace(/\s+/g, '-')}-submissions-${timestamp}`;

    if (format === 'csv') {
      exportToCSV(filteredData, selectedColumns, filename);
    } else {
      exportToPDF(filteredData, selectedColumns, filename, `${title} Submissions`);
    }
  };

  const exportColumns = useMemo(() => getDefaultColumns(submissionType), [submissionType]);

  return (
    <>
      {/* Filter Bar */}
      <div className="mb-4">
        <FilterBar
          filters={filters}
          onFiltersChange={setFilters}
          config={filterConfig}
          countryOptions={countryOptions}
          stateOptions={stateOptions}
          organizationOptions={organizationOptions}
          intendedUseOptions={intendedUseOptions}
        />
      </div>

      {/* Submissions List */}
      <div className="h-full bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex-shrink-0 flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-700">
            {title} Submissions ({filteredData.length} {filteredData.length !== data.length ? `of ${data.length}` : ''})
          </h3>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsExportModalOpen(true)}
            disabled={filteredData.length === 0}
          >
            <Download className="h-3.5 w-3.5 mr-1.5" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-auto flex-1">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                  Organization
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">
                    No submissions match the current filters
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr
                    key={item.submissionId}
                    onClick={() => handleSelectSubmission(item)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {getName(item)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {item.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.phoneNumber || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {getOrganization(item) || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(item.submittedAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-gray-200 overflow-auto flex-1">
          {filteredData.length === 0 ? (
            <div className="px-4 py-12 text-center text-sm text-gray-500">
              No submissions match the current filters
            </div>
          ) : (
            filteredData.map((item) => (
              <button
                key={item.submissionId}
                onClick={() => handleSelectSubmission(item)}
                className="w-full text-left px-4 py-4 hover:bg-gray-50 transition-colors active:bg-gray-100"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium text-sm text-gray-900">
                      {getName(item)}
                    </h4>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {formatDate(item.submittedAt)}
                    </span>
                  </div>

                  <div className="text-xs text-gray-600 space-y-1">
                    <div className="truncate">
                      <span className="font-medium text-gray-700">Email:</span> {item.email}
                    </div>
                    {item.phoneNumber && (
                      <div className="text-gray-500">
                        <span className="font-medium text-gray-700">Phone:</span> {item.phoneNumber}
                      </div>
                    )}
                    {getOrganization(item) && (
                      <div className="truncate">
                        <span className="font-medium text-gray-700">Organization:</span> {getOrganization(item)}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Drawer for Details */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent side="right" showOverlay={false} className="w-full sm:max-w-md p-0 overflow-hidden">
          <SheetTitle className="sr-only">Submission Details</SheetTitle>
          <div className="h-full">
            <SubmissionDetailPanel submission={selectedSubmission} submissionType={submissionType} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        columns={exportColumns}
        onExport={handleExport}
        title={title}
        recordCount={filteredData.length}
      />
    </>
  );
}
