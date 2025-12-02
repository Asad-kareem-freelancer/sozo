'use client';

import { useState, useMemo } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DateRangePicker from './DateRangePicker';
import type { FilterConfig, FilterBarConfig } from '@/types/admin';
import { hasActiveFilters } from '@/lib/utils/filterSubmissions';

interface FilterBarProps {
  filters: FilterConfig;
  onFiltersChange: (filters: FilterConfig) => void;
  config: FilterBarConfig;
  countryOptions?: string[];
  stateOptions?: string[];
  organizationOptions?: string[];
  intendedUseOptions?: string[];
}

export default function FilterBar({
  filters,
  onFiltersChange,
  config,
  countryOptions = [],
  stateOptions = [],
  organizationOptions = [],
  intendedUseOptions = [],
}: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(false);
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.country) count++;
    if (filters.state) count++;
    if (filters.organization) count++;
    if (filters.intendedUse) count++;
    if (filters.dateRange.from || filters.dateRange.to) count++;
    return count;
  }, [filters]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, searchText: e.target.value });
  };

  const handleCountryChange = (value: string) => {
    // 'clear' is our special value for clearing the filter
    onFiltersChange({ ...filters, country: value === 'clear' ? '' : value, state: '' });
  };

  const handleStateChange = (value: string) => {
    onFiltersChange({ ...filters, state: value === 'clear' ? '' : value });
  };

  const handleOrganizationChange = (value: string) => {
    onFiltersChange({ ...filters, organization: value === 'clear' ? '' : value });
  };

  const handleIntendedUseChange = (value: string) => {
    onFiltersChange({ ...filters, intendedUse: value === 'clear' ? '' : value });
  };

  const handleDateFromChange = (date: Date | null) => {
    onFiltersChange({
      ...filters,
      dateRange: { ...filters.dateRange, from: date },
    });
  };

  const handleDateToChange = (date: Date | null) => {
    onFiltersChange({
      ...filters,
      dateRange: { ...filters.dateRange, to: date },
    });
  };

  const handleClearFilters = () => {
    onFiltersChange({
      searchText: '',
      country: '',
      state: '',
      organization: '',
      intendedUse: '',
      dateRange: { from: null, to: null },
    });
  };

  const hasAdvancedFilters =
    config.showCountry ||
    config.showState ||
    config.showOrganization ||
    config.showIntendedUse ||
    config.showDateRange;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by name, email, phone, or organization..."
            value={filters.searchText}
            onChange={handleSearchChange}
            className="pl-10 pr-4"
          />
        </div>
        {hasAdvancedFilters && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="relative"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold bg-blue-600 text-white rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
            {hasActiveFilters(filters) && (
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="text-gray-600 hover:text-gray-900"
              >
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Advanced Filters */}
      {hasAdvancedFilters && showFilters && (
        <div className="pt-4 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Country Filter */}
          {config.showCountry && (
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-gray-700">Country</Label>
              <Select value={filters.country || 'clear'} onValueChange={handleCountryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="All countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clear">All countries</SelectItem>
                  {countryOptions.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* State Filter */}
          {config.showState && (
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-gray-700">State/Province</Label>
              <Select
                value={filters.state || 'clear'}
                onValueChange={handleStateChange}
                disabled={!filters.country && stateOptions.length === 0}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All states/provinces" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clear">All states/provinces</SelectItem>
                  {stateOptions.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Organization Filter */}
          {config.showOrganization && (
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-gray-700">
                {config.organizationLabel || 'Organization'}
              </Label>
              <Select value={filters.organization || 'clear'} onValueChange={handleOrganizationChange}>
                <SelectTrigger>
                  <SelectValue placeholder={`All ${config.organizationLabel?.toLowerCase() || 'organizations'}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clear">All {config.organizationLabel?.toLowerCase() || 'organizations'}</SelectItem>
                  {organizationOptions.map((org) => (
                    <SelectItem key={org} value={org}>
                      {org}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Intended Use Filter */}
          {config.showIntendedUse && (
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-gray-700">Intended Use</Label>
              <Select value={filters.intendedUse || 'clear'} onValueChange={handleIntendedUseChange}>
                <SelectTrigger>
                  <SelectValue placeholder="All intended uses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clear">All intended uses</SelectItem>
                  {intendedUseOptions.map((use) => (
                    <SelectItem key={use} value={use}>
                      {use}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Date Range Filter */}
          {config.showDateRange && (
            <div className="space-y-1.5 sm:col-span-2">
              <Label className="text-xs font-medium text-gray-700">Submission Date</Label>
              <DateRangePicker
                from={filters.dateRange.from}
                to={filters.dateRange.to}
                onFromChange={handleDateFromChange}
                onToChange={handleDateToChange}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
