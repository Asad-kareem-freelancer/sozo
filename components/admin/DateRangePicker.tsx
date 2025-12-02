'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DateRangePickerProps {
  from: Date | null;
  to: Date | null;
  onFromChange: (date: Date | null) => void;
  onToChange: (date: Date | null) => void;
}

export default function DateRangePicker({
  from,
  to,
  onFromChange,
  onToChange,
}: DateRangePickerProps) {
  const formatDateForInput = (date: Date | null): string => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) {
      onFromChange(null);
      return;
    }
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      // If "to" date exists and is before the new "from" date, clear it
      if (to && date > to) {
        onToChange(null);
      }
      onFromChange(date);
    }
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) {
      onToChange(null);
      return;
    }
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      // Validate that "to" date is not before "from" date
      if (from && date < from) {
        // Don't update if invalid
        return;
      }
      onToChange(date);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="flex-1 space-y-1.5">
        <Label htmlFor="date-from" className="text-xs font-medium text-gray-700">
          From
        </Label>
        <Input
          id="date-from"
          type="date"
          value={formatDateForInput(from)}
          onChange={handleFromChange}
          max={to ? formatDateForInput(to) : undefined}
          className="w-full text-sm"
        />
      </div>
      <div className="flex-1 space-y-1.5">
        <Label htmlFor="date-to" className="text-xs font-medium text-gray-700">
          To
        </Label>
        <Input
          id="date-to"
          type="date"
          value={formatDateForInput(to)}
          onChange={handleToChange}
          min={from ? formatDateForInput(from) : undefined}
          className="w-full text-sm"
        />
      </div>
    </div>
  );
}
