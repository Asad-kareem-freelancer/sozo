'use client';

import { Controller } from 'react-hook-form';
import { useLibraryHubForm } from './hooks/useLibraryHubForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { formatPhoneNumber } from '@/lib/utils';

type Props = {
  onOpenChange: (open: boolean) => void;
}

export default function LibraryHubForm({onOpenChange}: Props) {
  const { register, onSubmit, errors, control, isSubmitting, handleSubmit, trigger } = useLibraryHubForm();

  return (
    <form onSubmit={handleSubmit(data => onSubmit(data, ()=>onOpenChange(false)))} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First name</Label>
          <Input
            id="firstName"
            placeholder="Enter your first name"
            {...register('firstName')}
            error={errors.firstName?.message}
          />
        </div>

        <div>
          <Label htmlFor="lastName">Last name</Label>
          <Input
            id="lastName"
            placeholder="Enter your last name"
            {...register('lastName')}
            error={errors.lastName?.message}
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            {...register('email')}
            error={errors.email?.message}
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone</Label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input
                id="phone"
                type="tel"
                placeholder="518-444-8765"
                value={field.value}
                onChange={(e) => {
                  const formatted = formatPhoneNumber(e.target.value);
                  field.onChange(formatted);
                }}
                onBlur={() => trigger('phone')}
                error={errors.phone?.message}
              />
            )}
          />
        </div>

        <div>
          <Label htmlFor="organization">Organization</Label>
          <Input
            id="organization"
            placeholder="Your organization"
            {...register('organization')}
            error={errors.organization?.message}
          />
        </div>

        <div>
          <Label htmlFor="role">Role</Label>
          <Input
            id="role"
            placeholder="Your role/position"
            {...register('role')}
            error={errors.role?.message}
          />
        </div>

        <div>
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            placeholder="United States"
            {...register('country')}
            error={errors.country?.message}
          />
        </div>

        <div>
          <Label htmlFor="state">State / Province</Label>
          <Input
            id="state"
            placeholder="New York"
            {...register('state')}
            error={errors.state?.message}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="areaOfInterest">Area of interest</Label>
        <Input
          id="areaOfInterest"
          placeholder="Describe your area of interest"
          {...register('areaOfInterest')}
          error={errors.areaOfInterest?.message}
        />
      </div>

      <Controller
        name="consent"
        control={control}
        render={({ field }) => (
          <div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="consent"
                checked={field.value === true}
                onCheckedChange={field.onChange}
              />
              <Label htmlFor="consent" className="text-sm font-normal cursor-pointer inline">
                I consent to be contacted about Library Health Equity Hub updates, in accordance with the{' '}
                <Link href="/policies#privacy" className="text-inherit underline underline-offset-2 inline">
                  Privacy Policy
                </Link>
                .
              </Label>
            </div>
            {errors.consent && (
              <p className="mt-1 text-xs text-red-500">{errors.consent.message}</p>
            )}
          </div>
        )}
      />

      <Button type="submit" variant="secondary" disabled={isSubmitting} className="w-full sm:w-auto text-sm sm:text-base">
        {isSubmitting ? 'Submitting...' : 'Submit Interest'}
      </Button>
    </form>
  );
}
