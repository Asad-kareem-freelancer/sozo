'use client';

import {Button} from "@/components/ui/button";
import Container from "@/components/ui/container";
import Footer from "@/components/Footer";
import {useState} from "react";
import PartnerWithUsModal from "@/components/modals/PartnerWithUsModal";
import Link from "next/link";

// Common class patterns
const SECTION_HEADING = "text-2xl md:text-3xl lg:text-[44px] font-normal mb-6 text-balance";
const SECTION_LAYOUT = "flex flex-col lg:flex-row justify-between gap-8 lg:gap-16";
const IMAGE_LARGE = "w-full lg:w-[610px]";
const CONTENT_MAX_WIDTH = "max-w-full lg:max-w-[536px]";
const IMAGE_ROUNDED = "rounded-2xl";

export default function HsaPublication() {
    const [partnerModalOpen, setPartnerModalOpen] = useState(false);

    return(
        <>
            {/* Hero Section */}
            <Container>
                <div className="relative">
                    <div className="rounded-3xl overflow-hidden h-[76vh] md:max-h-[550px] lg:max-h-[700px] transform scale-x-[-1]">
                        <img
                            src="/pub3.jpg"
                            alt="Health Systems Assurance hero image"
                            className="h-full rounded-2xl overflow-hidden w-full transform scale-[1.14] origin-bottom-left object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/[0.192] to-black/80"></div>
                    </div>
                    <div className="flex flex-col lg:flex-row justify-center lg:justify-between absolute inset-0 p-4 sm:p-6 md:p-10 lg:p-16 items-center lg:items-end gap-8 lg:gap-4">
                        <div className="space-y-5 md:space-y-6 lg:space-y-6 max-w-full text-center lg:text-left">
                            <h1 className="text-white font-normal text-2xl sm:text-4xl md:text-5xl lg:text-[54px] leading-tight lg:leading-15">
                                Health Systems Assurance (HSA) <br className="hidden sm:block" />
                                Volume 1 (2026)
                            </h1>
                            <h5 className="font-medium text-sm md:text-base text-white hidden sm:block">
                                Building Digital Trust Across Modern Health Infrastructure
                            </h5>
                            <h5 className="font-medium text-sm md:text-base text-white block sm:hidden">
                                Building Digital Trust Across <br /> Modern Health Infrastructure
                            </h5>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Summary Section */}
            <section id="summary" className="py-8 md:py-12">
                <Container variant="compact">
                    <div className="mb-12">
                        <h2 className={SECTION_HEADING}>Overview</h2>
                        <div className="space-y-6 leading-relaxed text-base">
                            <p>
                                HSA demonstrates a national assurance pathway where education, systems intelligence, and verification operate
                                in a unified environment. Designed and directed by Oluwabiyi Adeyemo, the model links cybersecurity,
                                compliance, and operational resilience into an integrated assurance discipline.
                            </p>
                            <p>
                                This publication presents a verified framework for health systems assurance that bridges academic
                                instruction with real-world implementation, creating a scalable model for digital trust infrastructure
                                across modern healthcare organizations.
                            </p>
                        </div>
                    </div>

                    {/* Launch Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg mb-8">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-medium text-blue-900">Launching January 2026</span>
                    </div>
                </Container>
            </section>

            {/* Applied Foundation Section */}
            <section className="py-8 bg-gray-50">
                <Container variant="compact">
                    <h2 className={SECTION_HEADING}>Applied Foundation</h2>

                    <div className="space-y-6 leading-relaxed text-base">
                        <p>
                            Health Systems Assurance (HSA),
                            Volume 1 (2026), is built on a graduate-level cybersecurity capstone program featuring 5 master's degree candidates
                            working across different time zones in the US within SozoRock's secured cloud environment. The program provides:
                        </p>

                        <ul className="list-disc list-outside pl-5 space-y-2">
                            <li>Structured assurance tasks with real-world application scenarios</li>
                            <li>Direct leadership, guidance, and evaluation by Oluwabiyi Adeyemo</li>
                            <li>Integration of academic rigor with operational implementation</li>
                            <li>Verification protocols across multiple assurance domains</li>
                        </ul>

                        <div className="grid md:grid-cols-2 gap-6 mt-8">
                            <div className="p-6 bg-white rounded-xl border border-gray-200">
                                <h3 className="font-semibold text-lg mb-2">Fall 2025</h3>
                                <p className="text-sm text-gray-600">
                                    <strong>Instructional Phase</strong> — Foundation concepts, framework orientation, and initial assessment protocols
                                </p>
                            </div>

                            <div className="p-6 bg-white rounded-xl border border-gray-200">
                                <h3 className="font-semibold text-lg mb-2">Spring 2026</h3>
                                <p className="text-sm text-gray-600">
                                    <strong>Live Implementation</strong> — Real-world assurance execution, verification cycles, and operational deployment
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Assurance Model Section */}
            <section className="py-8 md:py-12">
                <Container variant="compact">
                    <h2 className={SECTION_HEADING}>Assurance Model Wheel</h2>

                    <div className={SECTION_LAYOUT}>
                        <div className={CONTENT_MAX_WIDTH}>
                            <p className="leading-relaxed mb-6 text-base">
                                The HSA model operates across four interconnected phases that create a continuous cycle
                                of trust-building and verification:
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                        <span className="text-blue-700 font-semibold">1</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Education</h3>
                                        <p className="text-sm text-gray-600">
                                            Graduate-level curriculum with cybersecurity frameworks and compliance standards
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                        <span className="text-green-700 font-semibold">2</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Execution</h3>
                                        <p className="text-sm text-gray-600">
                                            Hands-on implementation within secured cloud infrastructure
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                                        <span className="text-purple-700 font-semibold">3</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Verification</h3>
                                        <p className="text-sm text-gray-600">
                                            Systematic validation against established assurance domains
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                                        <span className="text-amber-700 font-semibold">4</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Trust</h3>
                                        <p className="text-sm text-gray-600">
                                            Demonstrated reliability and operational confidence
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={IMAGE_LARGE}>
                            <img
                                src="/education.png"
                                alt="HSA Assurance Model Wheel"
                            />
                        </div>
                    </div>
                </Container>
            </section>

            {/* Assurance Domains Section */}
            <section className="py-8 bg-gray-50">
                <Container variant="compact">
                    <h2 className={SECTION_HEADING}>Assurance Domains</h2>

                    <p className="leading-relaxed mb-6 text-base">
                        HSA verification protocols span four critical compliance and security frameworks:
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-6 bg-white rounded-xl border border-gray-200 text-center">
                            <h3 className="font-semibold text-lg mb-2">HIPAA</h3>
                            <p className="text-sm text-gray-600">
                                Health Insurance Portability and Accountability Act
                            </p>
                        </div>

                        <div className="p-6 bg-white rounded-xl border border-gray-200 text-center">
                            <h3 className="font-semibold text-lg mb-2">SOC 2</h3>
                            <p className="text-sm text-gray-600">
                                Service Organization Control 2
                            </p>
                        </div>

                        <div className="p-6 bg-white rounded-xl border border-gray-200 text-center">
                            <h3 className="font-semibold text-lg mb-2">NIST 800-53</h3>
                            <p className="text-sm text-gray-600">
                                Security and Privacy Controls for Information Systems
                            </p>
                        </div>

                        <div className="p-6 bg-white rounded-xl border border-gray-200 text-center">
                            <h3 className="font-semibold text-lg mb-2">PHIPA</h3>
                            <p className="text-sm text-gray-600">
                                Personal Health Information Protection Act
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Download Section - COMING SOON */}
            <section className="py-8 md:py-12">
                <Container className={SECTION_LAYOUT} variant="compact">
                    <div className={CONTENT_MAX_WIDTH}>
                        <h2 className={SECTION_HEADING}>
                            Download <br/> HSA Volume 1
                        </h2>

                        <span className="block leading-relaxed mb-6 text-base">
                            This report will be available for download in January 2026. Pre-register your interest
                            to receive a notification when the publication is released.
                        </span>

                        <div className="space-y-3 mb-8 text-base">
                            <p className="font-semibold">What to expect:</p>
                            <ul className="list-disc list-outside pl-5 space-y-2 leading-tight">
                                <li>Complete assurance framework and methodology</li>
                                <li>Education-to-implementation case study</li>
                                <li>Multi-domain verification protocols</li>
                                <li>Scalable trust infrastructure models</li>
                            </ul>
                        </div>

                        {/* COMING SOON DISABLED BUTTON */}
                        <Button
                            variant="secondary"
                            disabled={true}
                            className="cursor-not-allowed opacity-60"
                        >
                            Available January 2026
                        </Button>

                        <p className="text-xs text-gray-500 mt-4">
                            This publication is currently in development and will be released in January 2026.
                        </p>
                    </div>

                    <img
                        src="/p2.png"
                        alt="HSA Volume 1 report preview"
                        className={`object-cover ${IMAGE_ROUNDED} ${IMAGE_LARGE} h-auto lg:h-[450px]`}
                    />
                </Container>
            </section>

            {/* Cross-links to Other Publications */}
            <section className="py-8 bg-gray-50">
                <Container variant="compact">
                    <h2 className="text-2xl md:text-3xl font-normal mb-8">Related Publications</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Link
                            href="/publication/rebs-v1-2025"
                            className="p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
                        >
                            <h3 className="font-semibold text-lg mb-2">
                                Rural Equity Blueprint Series (REBS) — Volume 1 (2025)
                            </h3>
                            <p className="text-sm text-gray-600">
                                Building a Framework for Rural Health Equity in New York State
                            </p>
                        </Link>

                        <Link
                            href="/publication/rrg-v1-2025"
                            className="p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
                        >
                            <h3 className="font-semibold text-lg mb-2">
                                Rethinking Rural Governance (RRG) — Volume 1 (2025)
                            </h3>
                            <p className="text-sm text-gray-600">
                                From Compliance to Systems Intelligence
                            </p>
                        </Link>
                    </div>
                </Container>
            </section>

            <Footer
                title={<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] leading-tight w-2/3 sm:w-auto">
                    From pilot<br /> to permanence.
                </h2>}
                subTitle="Advancing SozoRock programs from concept to scalable health-equity systems."
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
                        Learn More
                    </Button>
                }
            />
            <PartnerWithUsModal open={partnerModalOpen} onOpenChange={setPartnerModalOpen} />
        </>
    )
}
