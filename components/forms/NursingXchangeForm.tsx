'use client';

import { Controller } from 'react-hook-form';
import { useNursingXchangeForm } from './hooks/useNursingXchangeForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from 'next/link';
import { formatPhoneNumber } from '@/lib/utils';
import { stateCounties, states, provinces, countries } from '@/const/counties';

type Props = {
  onOpenChange: (open: boolean) => void;
}

export default function NursingXchangeForm({onOpenChange}: Props) {
  const { register, onSubmit, errors, control, isSubmitting, handleSubmit, trigger, watch, setValue } = useNursingXchangeForm();

  const selectedCountry = watch('country');
  const selectedState = watch('state');

  const stateProvinceOptions = selectedCountry === 'CA' ? provinces : states;
  const availableCounties = selectedState ? stateCounties[selectedState as keyof typeof stateCounties] || [] : [];

  return (
    <form onSubmit={handleSubmit(data => onSubmit(data, ()=>onOpenChange(false)))} className="space-y-4 sm:space-y-6">
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

        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="phoneNumber" className="text-xs sm:text-sm font-medium font-inter">
            Phone <span className="text-red-500">*</span>
          </Label>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="518-444-8765"
                className="w-full border-[#E2E8F0] rounded-lg font-inter text-sm sm:text-base"
                value={field.value}
                onChange={(e) => {
                  const formatted = formatPhoneNumber(e.target.value);
                  field.onChange(formatted);
                }}
                onBlur={() => trigger('phoneNumber')}
              />
            )}
          />
          {errors.phoneNumber && <p className="text-xs text-red-500">{errors.phoneNumber.message}</p>}
        </div>

        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="institution" className="text-xs sm:text-sm font-medium font-inter">
            Institution <span className="text-red-500">*</span>
          </Label>
          <Input
            id="institution"
            type="text"
            placeholder="Your institution"
            className="w-full border-[#E2E8F0] font-inter text-sm sm:text-base"
            {...register('institution')}
          />
          {errors.institution && <p className="text-xs text-red-500">{errors.institution.message}</p>}
        </div>

        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="role" className="text-xs sm:text-sm font-medium font-inter">
            Role <span className="text-red-500">*</span>
          </Label>
          <Input
            id="role"
            type="text"
            placeholder="Your role/position"
            className="w-full border-[#E2E8F0] font-inter text-sm sm:text-base"
            {...register('role')}
          />
          {errors.role && <p className="text-xs text-red-500">{errors.role.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
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
      </div>

      <div className="flex items-start space-x-3 pt-1 sm:pt-2">
        <Controller
          name="consent"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="consent"
              className="mt-1"
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(!!checked)}
            />
          )}
        />
        <Label htmlFor="consent" className="text-xs sm:text-sm leading-relaxed cursor-pointer font-normal inline">
          I consent to be contacted regarding Nursing Xchange updates, in accordance with the
          <Link href="/policies#privacy" className="text-inherit underline underline-offset-2 ml-1 inline">
            Privacy Policy
          </Link>
          .
        </Label>
      </div>
      {errors.consent && <p className="text-xs text-red-500">{errors.consent.message}</p>}

      <div className="pt-1 sm:pt-2">
        <Button
          type="submit"
          variant="secondary"
          className="w-full sm:w-auto text-sm sm:text-base"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Register Interest'}
        </Button>
      </div>
    </form>
  );
}
