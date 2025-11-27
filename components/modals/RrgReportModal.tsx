'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import RrgReportForm from '@/components/forms/RrgReportForm';

interface RrgReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RrgReportModal({ open, onOpenChange }: RrgReportModalProps) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl">
            Rethinking Rural Governance (RRG) — Volume 1 (2025)
          </DialogTitle>
        </DialogHeader>
        <RrgReportForm onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
}
