'use client';

import { Controller } from 'react-hook-form';
import { useRrgReportForm } from './hooks/useRrgReportForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { formatPhoneNumber } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from 'next/link';
import { stateCounties, states, provinces, countries } from '@/const/counties';
import { organizationTypes } from '@/const/organizations';
import { primaryRoles } from '@/const/roles';
import { intendedUses } from '@/const/intendedUses';

type Props = {
  onOpenChange: (open: boolean) => void;
}

export default function RrgReportForm({ onOpenChange }: Props) {
  const { register, onSubmit, errors, control, isSubmitting, handleSubmit, watch, setValue, trigger } = useRrgReportForm();

  const selectedCountry = watch('country');
  const selectedState = watch('state');
  const selectedIntendedUse = watch('intendedUse');
  const selectedOrgType = watch('organizationType');
  const selectedPrimaryRole = watch('primaryRole');

  const stateProvinceOptions = selectedCountry === 'CA' ? provinces : states;
  const availableCounties = selectedState ? stateCounties[selectedState as keyof typeof stateCounties] || [] : [];

  return (
    <form onSubmit={handleSubmit(data => onSubmit(data, onOpenChange))} className="space-y-4 sm:space-y-6">
      {/* Row 1: First name, Last name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="firstName" className="text-xs sm:text-sm font-medium font-inter">
            First name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="firstName"
            type="text"
            placeholder="Enter your first name"
            className="w-full border-[#E2E8F0] font-inter text-sm sm:text-base"
            {...register('firstName')}
          />
          {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
        </div>

        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="lastName" className="text-xs sm:text-sm font-medium font-inter">
            Last name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Enter your last name"
            className="w-full border-[#E2E8F0] font-inter text-sm sm:text-base"
            {...register('lastName')}
          />
          {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
        </div>
      </div>

      {/* Row 2: Email (full width) */}
      <div className="space-y-1 sm:space-y-2">
        <Label htmlFor="email" className="text-xs sm:text-sm font-medium font-inter">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          className="w-full border-[#E2E8F0] font-inter text-sm sm:text-base"
          {...register('email')}
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
      </div>

      {/* Phone Number (optional) */}
      <div className="space-y-1 sm:space-y-2">
        <Label htmlFor="phoneNumber" className="text-xs sm:text-sm font-medium font-inter">
          Phone number (optional)
        </Label>
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="518-444-8765"
              className="w-full border-[#E2E8F0] font-inter text-sm sm:text-base"
              value={field.value}
              onChange={(e) => {
                const formatted = formatPhoneNumber(e.target.value);
                field.onChange(formatted);
              }}
              onBlur={() => trigger('phoneNumber')}
            />
          )}
        />
        {errors.phoneNumber && (
          <p className="text-xs text-red-500">{errors.phoneNumber.message}</p>
        )}
      </div>

      {/* Intended Use Section */}
      <div className={selectedIntendedUse === 'Other' ? "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6" : "space-y-1 sm:space-y-2"}>
        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="intendedUse" className="text-xs sm:text-sm font-medium font-inter">
            Intended use <span className="text-red-500">*</span>
          </Label>
          <Controller
            name="intendedUse"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  if (value !== 'Other') {
                    setValue('intendedUseOther', '');
                  }
                }}
                value={field.value}
              >
                <SelectTrigger className="border-[#E2E8F0] text-sm sm:text-base">
                  <SelectValue placeholder="Select intended use" />
                </SelectTrigger>
                <SelectContent>
                  {intendedUses.map((use) => (
                    <SelectItem key={use.value} value={use.value}>
                      {use.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.intendedUse && <p className="text-xs text-red-500">{errors.intendedUse.message}</p>}
        </div>

        {selectedIntendedUse === 'Other' && (
          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="intendedUseOther" className="text-xs sm:text-sm font-medium font-inter">
              Please specify <span className="text-red-500">*</span>
            </Label>
            <Input
              id="intendedUseOther"
              type="text"
              placeholder="Please specify your intended use"
              className="w-full border-[#E2E8F0] font-inter text-sm sm:text-base"
              {...register('intendedUseOther')}
            />
            {errors.intendedUseOther && <p className="text-xs text-red-500">{errors.intendedUseOther.message}</p>}
          </div>
        )}
      </div>

      {/* Organization/Affiliation Section */}
      <div className={selectedOrgType === 'Other' ? "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6" : "space-y-1 sm:space-y-2"}>
        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="organizationType" className="text-xs sm:text-sm font-medium font-inter">
            Organization/Affiliation <span className="text-red-500">*</span>
          </Label>
          <Controller
            name="organizationType"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  if (value !== 'Other') {
                    setValue('organizationCustom', '');
                  }
                }}
                value={field.value}
              >
                <SelectTrigger className="border-[#E2E8F0] text-sm sm:text-base">
                  <SelectValue placeholder="Select organization type" />
                </SelectTrigger>
                <SelectContent>
                  {organizationTypes.map((org) => (
                    <SelectItem key={org.value} value={org.value}>
                      {org.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.organizationType && <p className="text-xs text-red-500">{errors.organizationType.message}</p>}
        </div>

        {selectedOrgType === 'Other' && (
          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="organizationCustom" className="text-xs sm:text-sm font-medium font-inter">
              Please specify <span className="text-red-500">*</span>
            </Label>
            <Input
              id="organizationCustom"
              type="text"
              placeholder="Please specify your organization"
              className="w-full border-[#E2E8F0] font-inter text-sm sm:text-base"
              {...register('organizationCustom')}
            />
            {errors.organizationCustom && <p className="text-xs text-red-500">{errors.organizationCustom.message}</p>}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="country" className="text-xs sm:text-sm font-medium font-inter">
            Country <span className="text-red-500">*</span>
          </Label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setValue('state', '');
                  setValue('county', '');
                }}
                value={field.value}
              >
                <SelectTrigger className="border-[#E2E8F0] text-sm sm:text-base">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.country && <p className="text-xs text-red-500">{errors.country.message}</p>}
        </div>

        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="state" className="text-xs sm:text-sm font-medium font-inter">
            State/Province <span className="text-red-500">*</span>
          </Label>
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setValue('county', '');
                }}
                value={field.value}
                disabled={!selectedCountry}
              >
                <SelectTrigger className="border-[#E2E8F0] text-sm sm:text-base">
                  <SelectValue placeholder={selectedCountry ? (selectedCountry === 'CA' ? "Select province" : "Select state") : "Select country first"} />
                </SelectTrigger>
                <SelectContent>
                  {stateProvinceOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.state && <p className="text-xs text-red-500">{errors.state.message}</p>}
        </div>
      </div>

      <div className="space-y-1 sm:space-y-2">
        <Label htmlFor="county" className="text-xs sm:text-sm font-medium font-inter">
          County/Region <span className="text-red-500">*</span>
        </Label>
        <Controller
          name="county"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              value={field.value}
              disabled={!selectedState}
            >
              <SelectTrigger className="border-[#E2E8F0] text-sm sm:text-base">
                <SelectValue placeholder={selectedState ? (selectedCountry === 'CA' ? "Select region" : "Select county") : (selectedCountry === 'CA' ? "Select province first" : "Select state first")} />
              </SelectTrigger>
              <SelectContent>
                {availableCounties.map((county) => (
                  <SelectItem key={county} value={county}>
                    {county}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.county && <p className="text-xs text-red-500">{errors.county.message}</p>}
      </div>

      {/* Primary Role Section */}
      <div className={selectedPrimaryRole === 'Other' ? "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6" : "space-y-1 sm:space-y-2"}>
        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="primaryRole" className="text-xs sm:text-sm font-medium font-inter">
            Primary role <span className="text-red-500">*</span>
          </Label>
          <Controller
            name="primaryRole"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  if (value !== 'Other') {
                    setValue('primaryRoleOther', '');
                  }
                }}
                value={field.value}
              >
                <SelectTrigger className="border-[#E2E8F0] text-sm sm:text-base">
                  <SelectValue placeholder="Select primary role" />
                </SelectTrigger>
                <SelectContent>
                  {primaryRoles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.primaryRole && <p className="text-xs text-red-500">{errors.primaryRole.message}</p>}
        </div>

        {selectedPrimaryRole === 'Other' && (
          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="primaryRoleOther" className="text-xs sm:text-sm font-medium font-inter">
              Please specify <span className="text-red-500">*</span>
            </Label>
            <Input
              id="primaryRoleOther"
              type="text"
              placeholder="Please specify your primary role"
              className="w-full border-[#E2E8F0] font-inter text-sm sm:text-base"
              {...register('primaryRoleOther')}
            />
            {errors.primaryRoleOther && <p className="text-xs text-red-500">{errors.primaryRoleOther.message}</p>}
          </div>
        )}
      </div>

      <div className="flex items-start space-x-3">
        <Controller
          name="privacyConsent"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="privacyConsent"
              className="mt-1"
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(!!checked)}
            />
          )}
        />
        <Label htmlFor="privacyConsent" className="text-xs sm:text-sm leading-relaxed cursor-pointer font-normal inline">
          I consent to storing my details to provide this report, in accordance with the
          <Link href="/policies#privacy" className="text-inherit underline underline-offset-2 ml-1 inline">
            Privacy Policy
          </Link>
          .
        </Label>
      </div>
      {errors.privacyConsent && <p className="text-xs text-red-500">{errors.privacyConsent.message}</p>}

      <div className="flex items-start space-x-3 pt-1 sm:pt-2">
        <Controller
          name="newsletterOptIn"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="newsletterOptIn"
              className="mt-1"
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(!!checked)}
            />
          )}
        />
        <Label htmlFor="newsletterOptIn" className="text-xs sm:text-sm leading-relaxed cursor-pointer font-normal inline">
          Keep me informed about future SozoRock Foundation publications and rural equity initiatives.
        </Label>
      </div>

      <div className="flex items-start space-x-3 pt-1 sm:pt-2">
        <Controller
          name="privacyTermsConsent"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="privacyTermsConsent"
              className="mt-1"
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(!!checked)}
            />
          )}
        />
        <Label htmlFor="privacyTermsConsent" className="text-xs sm:text-sm leading-relaxed cursor-pointer font-normal inline">
          I confirm that the information provided is correct and consent to its use as described in the SozoRock Foundation Privacy Policy.
        </Label>
      </div>
      {errors.privacyTermsConsent && <p className="text-xs text-red-500">{errors.privacyTermsConsent.message}</p>}

      <div className="flex items-start space-x-3 pt-1 sm:pt-2">
        <Controller
          name="disclaimerConsent"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="disclaimerConsent"
              className="mt-1"
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(!!checked)}
            />
          )}
        />
        <Label htmlFor="disclaimerConsent" className="text-xs sm:text-sm leading-relaxed cursor-pointer font-normal inline">
          I understand this report is for informational and educational purposes and does not constitute legal, clinical, or financial advice.
        </Label>
      </div>
      {errors.disclaimerConsent && <p className="text-xs text-red-500">{errors.disclaimerConsent.message}</p>}

      <div className="pt-1 sm:pt-2">
        <Button
          type="submit"
          variant="secondary"
          className="w-full sm:w-auto text-sm sm:text-base"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Download Report'}
        </Button>
      </div>
    </form>
  );
}
