'use client';

import PublicHero from "@/app/publication/[id]/_components/PublicHero";
import {Button} from "@/components/ui/button";
import Container from "@/components/ui/container";
import Footer from "@/components/Footer";
import {useState} from "react";
import PartnerWithUsModal from "@/components/modals/PartnerWithUsModal";
import RebsReportModal from "@/components/modals/RebsReportModal";
import Link from "next/link";

// Common class patterns
const SECTION_HEADING = "text-2xl md:text-3xl lg:text-[44px] font-normal mb-6 text-balance";
const SECTION_LAYOUT = "flex flex-col lg:flex-row justify-between gap-8 lg:gap-16";
const IMAGE_LARGE = "w-full lg:w-[610px] h-full";
const CONTENT_MAX_WIDTH = "max-w-full lg:max-w-[536px]";
const IMAGE_ROUNDED = "rounded-2xl";

const publications = [
    {
        volume: "Volume 2 (2026)",
        title: "Access Day Field Insights and Data Models",
        borderColor: "border-blue-500",
    },
    {
        volume: "Volume 3 (2026)",
        title: "Workforce Pathways for Rural Retention and Education",
        borderColor: "border-green-500",
    },
]

export default function RebsPublication() {
    const [partnerModalOpen, setPartnerModalOpen] = useState(false);
    const [rebsModalOpen, setRebsModalOpen] = useState(false);

    return(
        <>
            <PublicHero />

            <section id="framework" className="py-8">
                <Container variant="compact">
                    <div className="mb-12">
                        <h2 className={SECTION_HEADING}>Overview</h2>
                        <div className="space-y-6 leading-relaxed text-base">
                            <p>
                                The Rural Equity Blueprint Series establishes a practical model for strengthening readiness, literacy, and access equity across rural and underserved communities. Volume 1 outlines the Foundation's Access Day framework—a scalable approach counties and institutions can adopt to improve patient access, preventive engagement, and community coordination. The report synthesizes field insights, operational data, and systems-level observations to guide local planning, support workforce alignment, and inform forthcoming pilots such as Access Day and the Library Health Equity Hub. The analysis, structure, and modeling presented in this volume were developed independently by The SozoRock Foundation.
                            </p>
                        </div>
                    </div>

                    {/* Publication Information */}
                    <div className='p-6 bg-[#F0F6F6] rounded-xl mb-12'>
                        <div className="space-y-2 text-xs">
                            <p><strong>Publisher:</strong> The SozoRock Foundation, Inc.</p>
                            <p><strong>Publication Date:</strong> October 2025</p>
                            <p><strong>Authors:</strong> Oluwabiyi Adeyemo; Jordan Hare</p>
                            <p><strong>Series:</strong> Rural Equity Blueprint Series (Volume 1)</p>
                            <p><strong>Edition:</strong> First Edition</p>
                            <p><strong>DOI:</strong> 10.65473/rebs-v1-2025</p>
                            <p><strong>Location:</strong> Albany, New York</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-300">
                            <p className="text-xs font-semibold mb-1">Formal Citation:</p>
                            <p className="text-xs">
                                Adeyemo, O., & Hare, J. (2025). <em>Rural Equity Blueprint Series, Volume 1: Access Day—Building a Framework for Rural Health Equity in New York State</em>.
                                The SozoRock Foundation, Inc.{' '}
                                <a
                                    href="https://doi.org/10.65473/rebs-v1-2025"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 underline"
                                >
                                    https://doi.org/10.65473/rebs-v1-2025
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                        <div className="w-full lg:w-auto">
                            <figure className={IMAGE_LARGE}>
                                <img
                                    src="/p1.png"
                                    alt="Healthcare professional and farmer discussing health equity"
                                    className={`object-cover ${IMAGE_ROUNDED} w-full h-full`}
                                />
                            </figure>
                        </div>
                        <div className="space-y-6 w-full lg:w-auto">
                            <h1 className="text-2xl md:text-4xl lg:text-[44px] font-normal leading-tight text-balance">
                                Building a Framework for Rural Health Equity
                            </h1>

                            <div className="space-y-6 leading-relaxed text-balance text-base">
                                <p>
                                    The Rural Equity Blueprint Series extends recognition to the county public health directors and their
                                    teams across Western New York for providing access to Community Health Assessment (CHA) and Community
                                    Health Improvement Plan (CHIP) documentation, and for sharing comprehensive county health priorities
                                    during the pre-planning and information-sharing phase. Their cooperation and contextual data strengthened
                                    the precision of regional analysis across all thematic areas — workforce, literacy, prevention, chronic disease,
                                    and access equity — and informed the modeling framework developed for this volume.
                                </p>

                                <p>
                                    Additional insights were contributed through early academic and sector dialogues that offered perspective on rural service
                                    readiness and educational alignment across New York State. These engagements have since concluded, yet their perspectives
                                    enriched the Foundation's understanding of rural health-system dynamics. All modeling, governance design, and analytical
                                    synthesis presented in this publication were developed independently by The SozoRock Foundation. The framework, structure,
                                    and datasets remain the Foundation's intellectual property. The analyses and conclusions expressed herein are solely those
                                    of The SozoRock® Foundation and do not represent the views of any county department, academic institution, or external contributor.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="py-8">
                <Container className={SECTION_LAYOUT} variant="compact">
                    <div className={CONTENT_MAX_WIDTH}>
                        <h2 className={SECTION_HEADING}>
                            Download <br/> Our Latest Report
                        </h2>

                        <span className="block leading-relaxed mb-6 text-base">
                                    Gain exclusive insights into emerging strategies, policy recommendations, and real-world data shaping
                                    the future of equitable rural health systems.
                                </span>

                        <div className="space-y-3 mb-8 text-base">
                            <p className="font-semibold">Inside you&#39;ll find:</p>
                            <ul className="list-disc list-outside pl-5 space-y-2 leading-tight">
                                <li>Frameworks for implementation and measurement</li>
                                <li>Expert commentary and case studies</li>
                                <li>Practical tools for policymakers and practitioners</li>
                            </ul>
                        </div>

                        <Button
                            variant="secondary"
                            onClick={() => setRebsModalOpen(true)}
                        >
                            Download Report
                        </Button>
                    </div>

                    {/* Right Side - Image */}
                    <img
                        src="/p2.png"
                        alt="Rural Equity Blueprint report"
                        className={`object-cover ${IMAGE_ROUNDED} ${IMAGE_LARGE} h-auto lg:h-[450px]`}
                    />
                </Container>
            </section>
            <section className="py-8">
                <Container className={SECTION_LAYOUT} variant="compact">
                    <div className="w-full lg:max-w-[536px]">
                        <img
                            src="/p3.png"
                            alt="Team reviewing upcoming publication materials"
                            className={`object-cover ${IMAGE_ROUNDED} ${IMAGE_LARGE}`}
                        />
                    </div>

                    <div className={`${IMAGE_LARGE} flex justify-center lg:items-center flex-col`}>
                        <h2 className={SECTION_HEADING}>Upcoming Publications</h2>

                        <div className="space-y-6">
                            {publications.map((pub, index) => (
                                <div key={index} className={`border-l-4 ${pub.borderColor} pl-6 space-y-2`}>
                                    <p className="font-semibold uppercase tracking-wide text-sm">{pub.volume}</p>
                                    <span className="font-semibold text-base">{pub.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Related Publications */}
            <section className="py-8 bg-gray-50">
                <Container variant="compact">
                    <h2 className="text-2xl md:text-3xl font-normal mb-8">Related Publications</h2>

                    <div className="grid md:grid-cols-2 gap-6">
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

                        <Link
                            href="/publication/hsa-v1-2026"
                            className="p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
                        >
                            <h3 className="font-semibold text-lg mb-2">
                                Health Systems Assurance (HSA) — Volume 1 (January 2026)
                            </h3>
                            <p className="text-sm text-gray-600">
                                Building Digital Trust Across Modern Health Infrastructure
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
            <RebsReportModal open={rebsModalOpen} onOpenChange={setRebsModalOpen} />
        </>
    )
}