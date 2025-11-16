'use client';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import { stateCounties, states, provinces, countries } from "@/const/counties"
import { organizationTypes } from "@/const/organizations"
import { Controller } from "react-hook-form"
import { usePartnerWithUsForm } from "@/lib/hooks/usePartnerWithUsForm";
import { formatPhoneNumber } from "@/lib/utils";

type Props = {
  onOpenChange: (open: boolean) => void;
}

export default function PartnerWithUsForm({ onOpenChange }: Props) {
  const {
    register,
    handleSubmit,
    control,
    errors,
    isSubmitting,
    trigger,
    onSubmit,
    watch,
    setValue
  } = usePartnerWithUsForm()

  const selectedCountry = watch('country')
  const selectedState = watch('state')
  const selectedOrganization = watch('organization')

  const stateProvinceOptions = selectedCountry === 'CA' ? provinces : states
  const availableCounties = selectedState ? stateCounties[selectedState as keyof typeof stateCounties] || [] : []
  const showOrganizationOther = selectedOrganization === 'Other'

  return (
      <div>
        <form
            onSubmit={handleSubmit((data) => onSubmit(data, () => onOpenChange(false)))}
            className="space-y-4 sm:space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="fullName" className="text-xs sm:text-sm font-medium font-inter">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full border-[#E2E8F0] font-inter text-sm sm:text-base"
                  {...register("fullName")}
              />
              {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
            </div>
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="email" className="text-xs sm:text-sm font-medium font-inter">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full border-[#E2E8F0] font-inter text-sm sm:text-base"
                  {...register("email")}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="phoneNumber" className="text-xs sm:text-sm font-medium font-inter">
              Phone Number <span className="text-red-500">*</span>
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

          <div className={showOrganizationOther ? "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6" : "space-y-1 sm:space-y-2"}>
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="organization" className="text-xs sm:text-sm font-medium font-inter">
                Organization/Affiliation <span className="text-red-500">*</span>
              </Label>
              <Controller
                  name="organization"
                  control={control}
                  render={({ field }) => (
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          if (value !== 'Other') {
                            setValue('organizationOther', '');
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
              {errors.organization && <p className="text-xs text-red-500">{errors.organization.message}</p>}
            </div>

            {showOrganizationOther && (
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="organizationOther" className="text-xs sm:text-sm font-medium font-inter">
                  Please specify <span className="text-red-500">*</span>
                </Label>
                <Input
                    id="organizationOther"
                    type="text"
                    placeholder="Enter your organization"
                    className="w-full border-[#E2E8F0] font-inter text-sm sm:text-base"
                    {...register("organizationOther")}
                />
                {errors.organizationOther && <p className="text-xs text-red-500">{errors.organizationOther.message}</p>}
              </div>
            )}
          </div>

          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="role" className="text-xs sm:text-sm font-medium font-inter">
              Role <span className="text-red-500">*</span>
            </Label>
            <Input
                id="role"
                type="text"
                placeholder="Role"
                className="w-full border-[#E2E8F0] font-inter text-sm sm:text-base"
                {...register("role")}
            />
            {errors.role && <p className="text-xs text-red-500">{errors.role.message}</p>}
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

          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="focusArea" className="text-xs sm:text-sm font-medium font-inter">
              Focus Area(s) <span className="text-red-500">*</span>
            </Label>
            <Input
                id="focusArea"
                type="text"
                placeholder="Focus Area(s)"
                className="w-full border-[#E2E8F0] font-inter text-sm sm:text-base"
                {...register("focusArea")}
            />
            {errors.focusArea && <p className="text-xs text-red-500">{errors.focusArea.message}</p>}
          </div>

          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="message" className="text-xs sm:text-sm font-medium font-inter">
              Message <span className="text-red-500">*</span>
            </Label>
            <Textarea
                id="message"
                placeholder="Type your message here..."
                className="w-full min-h-24 sm:min-h-32 resize-none border-[#E2E8F0] font-inter text-sm sm:text-base"
                {...register("message")}
            />
            {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
          </div>

          <div className="flex items-start space-x-3 pt-1 sm:pt-2">
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
              I consent to SozoRock Foundation storing my details for the purpose of
              responding to my inquiry, in accordance with the
              <Link href="/policies#privacy" className="text-inherit underline underline-offset-2 ml-1 inline">
                Privacy Policy
              </Link>
              .
            </Label>
          </div>
          {errors.privacyConsent && <p className="text-xs text-red-500">{errors.privacyConsent.message}</p>}

          <div className="pt-1 sm:pt-2">
            <Button
              type="submit"
              variant="secondary"
              className="w-full sm:w-auto text-sm sm:text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
  )
}
