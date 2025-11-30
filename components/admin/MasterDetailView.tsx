'use client';

import { useState } from 'react';
import {
  AccessDaySubmission,
  LibrarySubmission,
  NursingSubmission,
  REBSSubmission,
  ContactSubmission,
  PartnerSubmission,
  RRGSubmission,
} from '@/types/admin';
import SubmissionDetailPanel from './SubmissionDetailPanel';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';

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
}

export default function MasterDetailView({ data, title }: MasterDetailViewProps) {
  const [selectedSubmission, setSelectedSubmission] = useState<AnySubmission | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  return (
    <>
      {/* Submissions List */}
      <div className="h-full bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex-shrink-0">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-700">
            {title} Submissions ({data.length})
          </h3>
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
              {data.map((item) => (
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
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-gray-200 overflow-auto flex-1">
          {data.map((item) => (
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
          ))}
        </div>
      </div>

      {/* Drawer for Details */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent side="right" showOverlay={false} className="w-full sm:max-w-md p-0 overflow-hidden">
          <SheetTitle className="sr-only">Submission Details</SheetTitle>
          <div className="h-full">
            <SubmissionDetailPanel submission={selectedSubmission} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
