'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MasterDetailView from '@/components/admin/MasterDetailView';
import type { AdminAPIResponse, TabConfig, FilterBarConfig, SubmissionType } from '@/types/admin';

const API_URL = 'https://24oyp6wkckryj2u2uxwsph5qy40xigim.lambda-url.us-east-1.on.aws/';

const TAB_CONFIGS: TabConfig[] = [
  { key: 'accessday', label: 'Access Day', description: '' },
  { key: 'library', label: 'Library', description: '' },
  { key: 'nursing', label: 'Nursing', description: '' },
  { key: 'rebs', label: 'REBS', description: '' },
  { key: 'contact', label: 'Contact', description: '' },
  { key: 'partner', label: 'Partner', description: '' },
  { key: 'rrg', label: 'RRG', description: '' },
];

// Filter configurations per tab (context-aware)
const FILTER_CONFIGS: Record<SubmissionType, FilterBarConfig> = {
  accessday: {
    showCountry: true,
    showState: true,
    showOrganization: true,
    showDateRange: true,
    organizationLabel: 'Organization',
  },
  library: {
    showCountry: true,
    showState: true,
    showOrganization: true,
    showDateRange: true,
    organizationLabel: 'Organization',
  },
  nursing: {
    showCountry: true,
    showState: true,
    showOrganization: true,
    showDateRange: true,
    organizationLabel: 'Institution',
  },
  rebs: {
    showCountry: true,
    showState: true,
    showOrganization: true,
    showIntendedUse: true,
    showDateRange: true,
    organizationLabel: 'Organization Type',
  },
  rrg: {
    showCountry: true,
    showState: true,
    showOrganization: true,
    showIntendedUse: true,
    showDateRange: true,
    organizationLabel: 'Organization Type',
  },
  contact: {
    showDateRange: true,
  },
  partner: {
    showCountry: true,
    showState: true,
    showOrganization: true,
    showDateRange: true,
    organizationLabel: 'Organization',
  },
};

export default function AdminDashboard() {
  const [data, setData] = useState<AdminAPIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('accessday');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'getAll' }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result: AdminAPIResponse = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-600">Loading submissions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">Error: {error}</p>
        <button
          onClick={fetchData}
          className="mt-2 text-sm text-red-700 underline"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  const totalSubmissions = Object.values(data.data).reduce(
    (sum, table) => sum + table.count,
    0
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between flex-shrink-0">
        <div>
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Form Submissions</h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Total submissions: {totalSubmissions}
          </p>
        </div>
        <button
          onClick={fetchData}
          className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          Refresh
        </button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col">
        <TabsList className="w-full flex-shrink-0">
          {TAB_CONFIGS.map((tab) => (
            <TabsTrigger key={tab.key} value={tab.key} className="flex-1 text-xs sm:text-sm">
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              <span className="ml-1 sm:ml-2 inline-flex items-center justify-center px-1.5 sm:px-2 py-0.5 text-xs font-medium bg-gray-200 text-gray-700 rounded-full">
                {data.data[tab.key].count}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {TAB_CONFIGS.map((tab) => (
          <TabsContent key={tab.key} value={tab.key} className="mt-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between flex-shrink-0">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">{tab.label}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">{tab.description}</p>
                </div>
                <div className="text-xs sm:text-sm text-gray-500">
                  {data.data[tab.key].count} submissions
                </div>
              </div>

              <div>
                <MasterDetailView
                  data={data.data[tab.key].items}
                  title={tab.label}
                  filterConfig={FILTER_CONFIGS[tab.key]}
                  submissionType={tab.key}
                  onDataChange={fetchData}
                />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
