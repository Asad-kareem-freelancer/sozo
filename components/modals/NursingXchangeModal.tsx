'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import NursingXchangeForm from '@/components/forms/NursingXchangeForm';

interface NursingXchangeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function NursingXchangeModal({ open, onOpenChange }: NursingXchangeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl">Nursing Xchange</DialogTitle>
        </DialogHeader>
        <NursingXchangeForm onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
}
