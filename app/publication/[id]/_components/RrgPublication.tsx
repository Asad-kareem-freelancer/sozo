'use client';

import {Button} from "@/components/ui/button";
import Container from "@/components/ui/container";
import Footer from "@/components/Footer";
import {useState} from "react";
import PartnerWithUsModal from "@/components/modals/PartnerWithUsModal";
import RrgReportModal from "@/components/modals/RrgReportModal";
import Link from "next/link";
import Script from "next/script";

// Common class patterns
const SECTION_HEADING = "text-2xl md:text-3xl lg:text-[44px] font-normal mb-6 text-balance";
const SECTION_LAYOUT = "flex flex-col lg:flex-row justify-between gap-8 lg:gap-16";
const IMAGE_LARGE = "w-full lg:w-[610px]";
const CONTENT_MAX_WIDTH = "max-w-full lg:max-w-[536px]";
const IMAGE_ROUNDED = "rounded-2xl";

export default function RrgPublication() {
    const [partnerModalOpen, setPartnerModalOpen] = useState(false);
    const [rrgModalOpen, setRrgModalOpen] = useState(false);

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "ScholarlyArticle",
        "name": "Rethinking Rural Governance: From Compliance to Systems Intelligence",
        "headline": "Rethinking Rural Governance (RRG) — Volume 1, Delaware County, New York",
        "description": "Rethinking Rural Governance (RRG) Volume 1 shows how county leaders can move from compliance-driven reporting to systems intelligence in Delaware County, New York, using CHA/CHIP data, equity indicators, and governance tools that can be adapted by other rural regions.",
        "author": {
            "@type": "Person",
            "name": "Oluwabiyi Adeyemo"
        },
        "datePublished": "2025-11",
        "publisher": {
            "@type": "Organization",
            "name": "The SozoRock Foundation, Inc.",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Albany",
                "addressRegion": "NY",
                "addressCountry": "US"
            }
        },
        "url": "https://sozorockfoundation.org/publication/rrg-v1-2025",
        "inLanguage": "en-US",
        "keywords": "Rethinking Rural Governance, RRG, Delaware County New York, rural governance, rural health equity, CHA, CHIP, public health planning, systems intelligence, SozoRock Foundation",
        "about": "Rural governance modernization and systems intelligence",
        "identifier": "https://doi.org/10.65473/rrg-v1-2025",
        "isPartOf": {
            "@type": "PublicationVolume",
            "name": "Rethinking Rural Governance",
            "volumeNumber": "1"
        }
    };

    return(
        <>
            {/* Schema.org Structured Data */}
            <Script
                id="rrg-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />
            {/* Hero Section */}
            <Container>
                <div className="relative">
                    <div className="rounded-3xl overflow-hidden h-[76vh] md:max-h-[550px] lg:max-h-[700px] transform scale-x-[-1]">
                        <img
                            src="/pub2.jpg"
                            alt="Rethinking Rural Governance hero image"
                            className="h-full rounded-2xl overflow-hidden w-full transform scale-[1.14] origin-bottom-left object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/[0.192] to-black/80"></div>
                    </div>
                    <div className="flex flex-col lg:flex-row justify-center lg:justify-between absolute inset-0 p-4 sm:p-6 md:p-10 lg:p-16 items-center lg:items-end gap-8 lg:gap-4">
                        <div className="space-y-5 md:space-y-6 lg:space-y-6 max-w-full text-center lg:text-left">
                            <h1 className="text-white font-normal text-2xl sm:text-4xl md:text-5xl lg:text-[54px] leading-tight lg:leading-15">
                                Rethinking Rural Governance (RRG) <br className="hidden sm:block" />
                                Volume 1 (2025)
                            </h1>
                            <h5 className="font-medium text-sm md:text-base text-white hidden sm:block">
                                From Compliance to Systems Intelligence
                            </h5>
                            <h5 className="font-medium text-sm md:text-base text-white block sm:hidden">
                                From Compliance to <br /> Systems Intelligence
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
                                Rethinking Rural Governance: From Compliance to Systems Intelligence presents a capability-based modernization
                                model built from verified county documentation, fiscal records, workforce data, and administrative minutes. Using
                                Delaware County, New York as an empirical reference case, the volume demonstrates how local governments can
                                transition from siloed, compliance-driven operations to systems-intelligence environments capable of anticipating
                                needs, aligning resources, and improving long-term resilience.
                            </p>
                            <p>
                                The analytical framework—fiscal intelligence, workforce analytics, data integration, operational foresight, and
                                community transparency—offers a transferable architecture for counties and municipalities across the United States,
                                as well as rural jurisdictions in Ontario and British Columbia facing similar demographic pressures, administrative
                                constraints, and rising governance mandates. The model highlights a structured pathway leaders can adopt to strengthen
                                institutional performance, modernize decision systems, and support national and binational modernization priorities.
                            </p>
                            <p>
                                This volume contributes to the SozoRock Foundation's Modernization and Resilience Program by providing validated,
                                evidence-driven insight that can inform county planning, academic instruction, policy design, and cross-jurisdictional
                                modernization efforts.
                            </p>
                        </div>
                    </div>

                    {/* Publication Information */}
                    <div className='p-6 bg-[#F0F6F6] rounded-xl mb-12'>
                        <div className="space-y-2 text-xs">
                            <p><strong>Publisher:</strong> The SozoRock Foundation, Inc.</p>
                            <p><strong>Publication Date:</strong> November 2025</p>
                            <p><strong>Author:</strong> Oluwabiyi Adeyemo</p>
                            <p><strong>Program:</strong> SozoRock Modernization and Resilience Program</p>
                            <p><strong>Series:</strong> Rethinking Rural Governance (Volume 1)</p>
                            <p><strong>Edition:</strong> First U.S. Edition</p>
                            <p><strong>DOI:</strong> 10.65473/rrg-v1-2025</p>
                            <p><strong>Location:</strong> Albany, New York, United States</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-300">
                            <p className="text-xs font-semibold mb-1">Formal Citation:</p>
                            <p className="text-xs">
                                Adeyemo, O. (2025). <em>Rethinking Rural Governance: From Compliance to Systems Intelligence</em> (Vol. 1 — Delaware County, New York).
                                The SozoRock Foundation.{' '}
                                <a
                                    href="https://doi.org/10.65473/rrg-v1-2025"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 underline"
                                >
                                    https://doi.org/10.65473/rrg-v1-2025
                                </a>
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Framework Section */}
            <section className="py-8">
                <Container className={SECTION_LAYOUT} variant="compact">
                    <div className="w-full lg:max-w-[536px]">
                        <img
                            src="/p1.png"
                            alt="Rural governance framework visualization"
                            className={`object-cover ${IMAGE_ROUNDED} ${IMAGE_LARGE}`}
                        />
                    </div>

                    <div className={`${IMAGE_LARGE} space-y-6`}>
                        <h2 className={SECTION_HEADING}>Systems Intelligence Framework</h2>

                        <div className="space-y-4 text-base leading-relaxed">
                            <p>
                                The Systems Intelligence Framework presented in RRG Volume 1 establishes three capability tiers
                                that define rural governance maturity:
                            </p>

                            <div className="space-y-4">
                                <div className="border-l-4 border-blue-500 pl-6">
                                    <h3 className="font-semibold text-lg">Foundational</h3>
                                    <p className="text-sm">
                                        Transparent operations, verified data integrity, and disciplined fiscal controls
                                    </p>
                                </div>

                                <div className="border-l-4 border-green-500 pl-6">
                                    <h3 className="font-semibold text-lg">Integrative</h3>
                                    <p className="text-sm">
                                        Cross-department coordination, unified reporting systems, and stakeholder alignment
                                    </p>
                                </div>

                                <div className="border-l-4 border-purple-500 pl-6">
                                    <h3 className="font-semibold text-lg">Adaptive</h3>
                                    <p className="text-sm">
                                        Predictive analytics, scenario planning, and resilience-ready governance models
                                    </p>
                                </div>
                            </div>

                            <p>
                                Delaware County demonstrates strong Foundational and emerging Integrative capabilities,
                                positioning it as a replicable model for rural modernization across North America.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Strategic Outlook */}
            <section className="py-8 bg-gray-50">
                <Container variant="compact">
                    <h2 className={SECTION_HEADING}>Strategic Outlook & National Scalability</h2>

                    <div className="space-y-6 leading-relaxed text-base">
                        <p>
                            RRG Volume 1 demonstrates that rural governance modernization is not only achievable but
                            strategically essential for counties facing workforce constraints, demographic shifts, and
                            increasing demands for transparency and accountability.
                        </p>

                        <p>
                            The framework outlined in this volume offers a binational pathway (United States and Canada)
                            for rural counties to build governance systems that support:
                        </p>

                        <ul className="list-disc list-outside pl-5 space-y-2">
                            <li>Enhanced fiscal discipline and transparent budget practices</li>
                            <li>Data-driven policy development and implementation tracking</li>
                            <li>Cross-jurisdictional collaboration and resource sharing</li>
                            <li>Adaptive capacity for emerging challenges and opportunities</li>
                        </ul>

                        <p className="font-medium">
                            The insights presented are designed to inform county administrators, state policy leaders,
                            and federal program designers seeking to strengthen rural governance infrastructure.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Download Section */}
            <section className="py-8 md:py-12">
                <Container className={SECTION_LAYOUT} variant="compact">
                    <div className={CONTENT_MAX_WIDTH}>
                        <h2 className={SECTION_HEADING}>
                            Download <br/> RRG Volume 1
                        </h2>

                        <span className="block leading-relaxed mb-6 text-base">
                            Access the complete framework, verified insights, and strategic recommendations for
                            rural governance modernization.
                        </span>

                        <div className="space-y-3 mb-8 text-base">
                            <p className="font-semibold">Inside you&#39;ll find:</p>
                            <ul className="list-disc list-outside pl-5 space-y-2 leading-tight">
                                <li>Three-tier capability model (Foundational, Integrative, Adaptive)</li>
                                <li>Delaware County case study with verified data</li>
                                <li>National and binational scalability pathways</li>
                                <li>Systems Intelligence implementation guidance</li>
                            </ul>
                        </div>

                        <Button
                            variant="secondary"
                            onClick={() => setRrgModalOpen(true)}
                        >
                            Download RRG Volume 1 (2025)
                        </Button>
                    </div>

                    <img
                        src="/p2.png"
                        alt="RRG Volume 1 report cover"
                        className={`object-cover ${IMAGE_ROUNDED} ${IMAGE_LARGE} h-auto lg:h-[450px]`}
                    />
                </Container>
            </section>

            {/* More From The SozoRock Foundation */}
            <section className="py-8 bg-gray-50">
                <Container variant="compact">
                    <div className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-normal mb-3 text-black">More From The SozoRock Foundation</h2>
                        <p className="text-gray-600 text-sm md:text-base max-w-3xl">
                            The SozoRock Foundation strengthens health systems, governance, and leadership capacity across the United States through research, publications, and evidence-based initiatives.
                        </p>
                    </div>

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
            <RrgReportModal open={rrgModalOpen} onOpenChange={setRrgModalOpen} />
        </>
    )
}
