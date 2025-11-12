'use client';

import Hero from "@/app/(home)/_components/Hero";
import Services from "@/app/(home)/_components/Services";
import Impact from "@/app/(home)/_components/Impact";
import Footer from "@/components/Footer";
import {Button} from "@/components/ui/button";
import { useState } from "react";
import PartnerWithUsModal from "@/components/modals/PartnerWithUsModal";

export default function HomePage() {
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);

  console.log(partnerModalOpen)

  return (
    <>
        <Hero />
        <Services />
        <Impact />
        <Footer
            title={<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] leading-tight w-2/3 sm:w-auto">
                Collaboration drives<br /> measurable change.
            </h2>}
            subTitle="Turning research into action for health systems equity."
            buttonOne={
                <Button
                    size="lg"
                    variant="secondary"
                    className="w-full sm:w-auto"
                    onClick={() => setPartnerModalOpen(true)}
                >
                    Partner With US
                </Button>
            }

            buttonTwo={
                <Button size="lg" variant="outline" className="border-none w-full sm:w-auto">
                    Support Our Work
                </Button>
            }
        />
        <PartnerWithUsModal open={partnerModalOpen} onOpenChange={setPartnerModalOpen} />
    </>
  );
}
