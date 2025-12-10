'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { changePassword } from '@/lib/api/auth';
import { Check, X } from 'lucide-react';

interface ChangePasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ChangePasswordModal({ open, onOpenChange }: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    general: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ currentPassword: '', newPassword: '', confirmPassword: '', general: '' });
    setSuccessMessage('');

    // Frontend validation
    let hasError = false;
    const newErrors = { currentPassword: '', newPassword: '', confirmPassword: '', general: '' };

    if (!currentPassword) {
      newErrors.currentPassword = 'Current password is required';
      hasError = true;
    }

    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
      hasError = true;
    } else if (!validatePassword(newPassword)) {
      newErrors.newPassword = 'Password must be at least 8 characters';
      hasError = true;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
      hasError = true;
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      hasError = true;
    }

    if (currentPassword && newPassword && currentPassword === newPassword) {
      newErrors.newPassword = 'New password must be different from current password';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // Get user email from localStorage
    const email = localStorage.getItem('userEmail');
    if (!email) {
      setErrors({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        general: 'User session not found. Please log in again.'
      });
      return;
    }

    // Call change password API
    setIsLoading(true);
    try {
      const result = await changePassword(email, currentPassword, newPassword);

      if (result.success) {
        setSuccessMessage('Password changed successfully!');
        // Clear form
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        // Close modal after 2 seconds
        setTimeout(() => {
          onOpenChange(false);
          setSuccessMessage('');
        }, 2000);
      } else {
        setErrors({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
          general: result.error || 'Failed to change password'
        });
      }
    } catch (error) {
      setErrors({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        general: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrors({ currentPassword: '', newPassword: '', confirmPassword: '', general: '' });
    setSuccessMessage('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Change Password</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              error={errors.currentPassword}
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              error={errors.newPassword}
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Must be at least 8 characters
            </p>
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              disabled={isLoading}
            />
          </div>

          {errors.general && (
            <div className="flex items-start gap-2 text-sm text-red-500 bg-red-50 p-3 rounded-md">
              <X size={16} className="flex-shrink-0 mt-0.5" />
              <span>{errors.general}</span>
            </div>
          )}

          {successMessage && (
            <div className="flex items-start gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-md">
              <Check size={16} className="flex-shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="secondary"
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? 'Changing...' : 'Change Password'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
