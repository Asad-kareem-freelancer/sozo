'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ContactUsForm from '@/components/ContactUsForm';

interface ContactUsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ContactUsModal({ open, onOpenChange }: ContactUsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl">Get In Touch</DialogTitle>
        </DialogHeader>
        <ContactUsForm onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
}
