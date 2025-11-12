'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import PartnerWithUsForm from '@/components/PartnerWithUsForm';

interface PartnerWithUsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PartnerWithUsModal({ open, onOpenChange }: PartnerWithUsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl">Partner With Us</DialogTitle>
        </DialogHeader>
        <PartnerWithUsForm onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
}
