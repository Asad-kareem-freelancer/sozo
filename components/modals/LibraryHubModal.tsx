'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import LibraryHubForm from '@/components/forms/LibraryHubForm';

interface LibraryHubModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LibraryHubModal({ open, onOpenChange }: LibraryHubModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl">Library Health Equity Hub</DialogTitle>
        </DialogHeader>
        <LibraryHubForm />
      </DialogContent>
    </Dialog>
  );
}
