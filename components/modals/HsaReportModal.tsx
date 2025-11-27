'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import HsaReportForm from '@/components/forms/HsaReportForm';

interface HsaReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function HsaReportModal({ open, onOpenChange }: HsaReportModalProps) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl">
            Health Systems Assurance (HSA) — Volume 1 (2026)
          </DialogTitle>
        </DialogHeader>
        <HsaReportForm onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
}
