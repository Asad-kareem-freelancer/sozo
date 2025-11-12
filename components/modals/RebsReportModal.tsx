'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import RebsReportForm from '@/components/forms/RebsReportForm';

interface RebsReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RebsReportModal({ open, onOpenChange }: RebsReportModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl">
            Rural Equity Blueprint Series — Volume 1 (2025)
          </DialogTitle>
        </DialogHeader>
        <RebsReportForm onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
}
