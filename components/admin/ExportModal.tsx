'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { ExportColumn, ExportFormat } from '@/types/admin';
import { Download, FileText, Sheet } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  columns: ExportColumn[];
  onExport: (selectedColumns: ExportColumn[], format: ExportFormat) => void;
  title: string;
  recordCount: number;
}

export default function ExportModal({
  isOpen,
  onClose,
  columns,
  onExport,
  title,
  recordCount,
}: ExportModalProps) {
  const [selectedColumns, setSelectedColumns] = useState<ExportColumn[]>(columns);
  const [format, setFormat] = useState<ExportFormat>('csv');

  // Update selected columns when columns prop changes
  useEffect(() => {
    setSelectedColumns(columns);
  }, [columns]);

  const handleToggleColumn = (key: string) => {
    setSelectedColumns((prev) =>
      prev.map((col) => (col.key === key ? { ...col, enabled: !col.enabled } : col))
    );
  };

  const handleSelectAll = () => {
    setSelectedColumns((prev) => prev.map((col) => ({ ...col, enabled: true })));
  };

  const handleDeselectAll = () => {
    setSelectedColumns((prev) => prev.map((col) => ({ ...col, enabled: false })));
  };

  const handleExport = () => {
    const enabledCount = selectedColumns.filter((col) => col.enabled).length;
    if (enabledCount === 0) {
      alert('Please select at least one column to export');
      return;
    }
    onExport(selectedColumns, format);
    onClose();
  };

  const selectedCount = selectedColumns.filter((col) => col.enabled).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Export {title} Submissions</DialogTitle>
          <DialogDescription>
            Select columns to export and choose format. {recordCount} record
            {recordCount !== 1 ? 's' : ''} will be exported.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Column Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold text-gray-900">
                Select Columns ({selectedCount}/{selectedColumns.length})
              </Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleSelectAll}
                  className="text-xs"
                >
                  Select All
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleDeselectAll}
                  className="text-xs"
                >
                  Deselect All
                </Button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 max-h-[300px] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedColumns.map((column) => (
                  <div key={column.key} className="flex items-center space-x-2">
                    <Checkbox
                      id={`column-${column.key}`}
                      checked={column.enabled}
                      onCheckedChange={() => handleToggleColumn(column.key)}
                    />
                    <Label
                      htmlFor={`column-${column.key}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {column.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Format Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-900">Export Format</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormat('csv')}
                className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-all ${
                  format === 'csv'
                    ? 'border-blue-600 bg-blue-50 text-blue-900'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <Sheet className="h-8 w-8 mb-2" />
                <span className="text-sm font-medium">CSV</span>
                <span className="text-xs text-gray-500 mt-1">Spreadsheet format</span>
              </button>

              <button
                type="button"
                onClick={() => setFormat('pdf')}
                className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-all ${
                  format === 'pdf'
                    ? 'border-blue-600 bg-blue-50 text-blue-900'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <FileText className="h-8 w-8 mb-2" />
                <span className="text-sm font-medium">PDF</span>
                <span className="text-xs text-gray-500 mt-1">Document format</span>
              </button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export {format.toUpperCase()}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
