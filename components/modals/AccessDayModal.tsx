'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import AccessDayForm from '@/components/forms/AccessDayForm';

interface AccessDayModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AccessDayModal({ open, onOpenChange }: AccessDayModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl">Access Day</DialogTitle>
        </DialogHeader>
        <AccessDayForm onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
}
