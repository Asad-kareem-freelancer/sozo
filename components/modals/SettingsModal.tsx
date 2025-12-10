'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Key } from 'lucide-react';
import ChangePasswordModal from './ChangePasswordModal';

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Settings</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Account Section */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Account</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-auto py-3"
                  onClick={() => {
                    setShowChangePassword(true);
                    handleClose();
                  }}
                >
                  <Key size={20} className="text-gray-600" />
                  <div className="text-left">
                    <div className="font-medium">Change Password</div>
                    <div className="text-xs text-gray-500">Update your account password</div>
                  </div>
                </Button>
              </div>
            </div>

            {/* User Info Section */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">User Information</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm">
                  <span className="text-gray-600">Email: </span>
                  <span className="font-medium text-gray-900">
                    {typeof window !== 'undefined' ? localStorage.getItem('userEmail') || 'Not available' : 'Loading...'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Change Password Modal */}
      <ChangePasswordModal
        open={showChangePassword}
        onOpenChange={setShowChangePassword}
      />
    </>
  );
}
