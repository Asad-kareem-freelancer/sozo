'use client';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Controller } from "react-hook-form";
import { useContactForm } from "@/lib/hooks/useContactForm";
import {formatPhoneNumber} from "@/lib/utils";

type Props = {
    onOpenChange: (open: boolean) => void;
}

export default function ContactUsForm({ onOpenChange }: Props) {
    const {
        errors,
        handleSubmit,
        onSubmit,
        isSubmitting,
        control,
        register,
        trigger,
    } = useContactForm();

    return (
        <form onSubmit={handleSubmit(v => onSubmit(v, () => onOpenChange(false)))} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="fullName" className="text-xs sm:text-sm font-medium font-inter">
                        Full Name
                    </Label>
                    <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full border-[#E2E8F0] font-inter text-sm sm:text-base"
                        {...register("fullName")}
                    />
                    {errors.fullName && (
                        <p className="text-xs text-red-500">{errors.fullName.message}</p>
                    )}
                </div>

                <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="email" className="text-xs sm:text-sm font-medium font-inter">
                        Email Address
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full border-[#E2E8F0] font-inter text-sm sm:text-base"
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-xs text-red-500">{errors.email.message}</p>
                    )}
                </div>
            </div>

            <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="phoneNumber" className="text-xs sm:text-sm font-medium font-inter">
                    Phone Number
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
                {errors.phoneNumber && (
                    <p className="text-xs text-red-500">{errors.phoneNumber.message}</p>
                )}
            </div>

            <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="message" className="text-xs sm:text-sm font-medium font-inter">
                    Message
                </Label>
                <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    className="w-full min-h-24 sm:min-h-32 resize-none text-sm sm:text-base"
                    {...register("message")}
                />
                {errors.message && (
                    <p className="text-xs text-red-500">{errors.message.message}</p>
                )}
            </div>

            <div className="pt-1 sm:pt-2">
                <Button
                    variant="secondary"
                    className="w-full sm:w-auto text-sm sm:text-base"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
            </div>
        </form>
    )
}
