'use client';

import {Button} from "@/components/ui/button";
import Container from "@/components/ui/container";
import Footer from "@/components/Footer";
import {useState} from "react";
import PartnerWithUsModal from "@/components/modals/PartnerWithUsModal";
import Link from "next/link";
import {ExternalLink} from "lucide-react";

// Common class patterns
const SECTION_HEADING = "text-2xl md:text-3xl lg:text-[44px] font-normal mb-6 text-balance";
const IMAGE_ROUNDED = "rounded-2xl";

export default function UnreadyToLeadPublication() {
    const [partnerModalOpen, setPartnerModalOpen] = useState(false);

    return(
        <>
            {/* Hero Section */}
            <Container>
                <div className="relative">
                    <div className="rounded-3xl overflow-hidden h-[76vh] md:max-h-[550px] lg:max-h-[700px]">
                        <img
                            src="/book/img.png"
                            alt="UnReady to Lead - Leadership development"
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/[0.192] to-black/80 rounded-3xl"></div>
                    </div>
                    <div className="flex flex-col lg:flex-row justify-center lg:justify-between absolute inset-0 p-4 sm:p-6 md:p-10 lg:p-16 items-center lg:items-end gap-8 lg:gap-4">
                        <div className="space-y-5 md:space-y-6 lg:space-y-6 max-w-full text-center lg:text-left">
                            <h1 className="text-white font-normal text-2xl sm:text-4xl md:text-5xl lg:text-[54px] leading-tight lg:leading-15">
                                UnReady to Lead
                            </h1>
                            <h5 className="font-medium text-sm md:text-base text-white">
                                How America's Leaders Are Built
                            </h5>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Overview Section */}
            <section id="overview" className="py-8">
                <Container variant="compact">
                    <div className="mb-12">
                        <h2 className={SECTION_HEADING}>About the Book</h2>
                        <div className="space-y-6 leading-relaxed text-base">
                            <p>
                                <em>UnReady to Lead — How America's Leaders Are Built</em> confronts a truth many organizations quietly acknowledge yet rarely address: America continues to produce capable professionals, yet far fewer leaders who are ready for responsibility the moment it arrives. Across companies, communities, and national institutions, the gap between potential and preparedness keeps widening, creating avoidable setbacks in moments when readiness matters most.
                            </p>
                            <p>
                                Drawing from more than two decades of negotiation, consulting, and executive-level advisory work, Oluwabiyi Adeyemo examines the real experiences that form leaders - rejection, value, balance, persuasion, responsibility. These are the tests that never appear on résumés yet determine whether someone can think clearly under pressure, make decisions that hold, and inspire trust when circumstances tighten.
                            </p>
                            <p>
                                This is not theory. It is a field-tested blueprint for readiness. Through personal accounts, high-stakes decisions, and lessons gained from working with senior executives, global corporations, regulators, and government departments, Adeyemo reveals why so many rise into roles they cannot sustain - and what it truly takes to prepare for leadership at scale.
                            </p>
                            <p>
                                The message is direct and nationally relevant. Strong leaders are not discovered; they are shaped through discipline, clarity, and the ability to withstand pressure without surrendering principle. America's future depends on people who can meet that standard.
                            </p>
                            <p>
                                <em>UnReady to Lead</em> opens a two-part leadership series. It diagnoses the readiness gap. The next book presents the path forward.
                            </p>
                        </div>
                    </div>

                    {/* Book Cover and Purchase Section */}
                    <div className="flex flex-col lg:flex-row justify-between items-stretch gap-8 lg:gap-16">
                        <div className="w-full lg:w-auto flex flex-col">
                            <figure className="w-full lg:w-[500px] h-full">
                                <img
                                    src="/book/img_1.png"
                                    alt="UnReady to Lead book cover"
                                    className={`h-full w-full object-cover ${IMAGE_ROUNDED} shadow-2xl`}
                                />
                            </figure>
                        </div>
                        <div className="w-full lg:w-auto lg:max-w-[536px] flex flex-col gap-6">
                            {/* Publication Information */}
                            <div className='p-6 bg-[#F0F6F6] rounded-xl flex-1 flex flex-col justify-between'>
                                <div>
                                    <div className="space-y-2 text-xs">
                                        <p><strong>Publisher:</strong> The SozoRock Foundation</p>
                                        <p><strong>Location:</strong> Albany, New York</p>
                                        <p><strong>Publication Date:</strong> 2025</p>
                                        <p><strong>Author:</strong> Oluwabiyi Adeyemo</p>
                                        <p><strong>Series:</strong> Leadership Works (Volume 1 of 2)</p>
                                        <p><strong>ISBN:</strong> 979-8-3507-5308-6</p>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-gray-300">
                                        <p className="text-xs font-semibold mb-1">Recommended Citation:</p>
                                        <p className="text-xs">
                                            Adeyemo, O. (2025). <em>UnReady to Lead: How America's Leaders Are Built</em>. The SozoRock Foundation.
                                        </p>
                                    </div>
                                </div>

                                {/* Purchase Buttons */}
                                <div className="space-y-3 mt-6">
                                    <h3 className="font-semibold text-lg">Get Your Copy</h3>
                                    <div className="flex flex-col gap-3">
                                        <Button
                                            size="lg"
                                            variant="secondary"
                                            className="w-full justify-center"
                                            onClick={() => window.open('https://a.co/d/9ABUtOR', '_blank')}
                                        >
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            Buy on Amazon
                                        </Button>
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="w-full justify-center whitespace-normal h-auto py-3 text-sm md:text-base"
                                            onClick={() => window.open('https://www.ingramspark.com', '_blank')}
                                        >
                                            <ExternalLink className="w-4 h-4 mr-2 flex-shrink-0" />
                                            <span className="text-center">Library & Wholesale Ordering — IngramSpark</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* About the Author */}
            <section className="py-8 bg-gray-50">
                <Container variant="compact">
                    <h2 className={SECTION_HEADING}>About the Author</h2>
                    <div className="space-y-4 leading-relaxed text-base">
                        <p>
                            <strong>Oluwabiyi Adeyemo</strong> is the founder of The SozoRock Foundation and has spent more than two decades advising senior executives, corporations, and government agencies on strategic decision-making, regulatory compliance, and organizational readiness.
                        </p>
                        <p>
                            His work spans negotiation, risk assessment, and systems-level governance across multiple sectors. Through direct engagement with leadership failures and institutional pressures, he developed the insights that inform this book — a practical examination of what separates prepared leaders from those who are not.
                        </p>
                        <p>
                            Adeyemo holds advanced degrees in law and public policy and has served in advisory capacities to organizations navigating complex regulatory and operational environments. <em>UnReady to Lead</em> is his first published work in a planned leadership series.
                        </p>
                    </div>
                </Container>
            </section>

            {/* What This Work Addresses */}
            <section className="py-8">
                <Container variant="compact">
                    <h2 className={SECTION_HEADING}>What This Work Addresses</h2>
                    <div className="space-y-4 text-base leading-relaxed">
                        <div className="border-l-4 border-blue-500 pl-4 py-2">
                            <h3 className="font-semibold mb-1">Leadership Readiness</h3>
                            <p className="text-gray-700">How organizations can identify and develop leaders who are prepared for responsibility before crises demand it.</p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4 py-2">
                            <h3 className="font-semibold mb-1">Workforce Capability Gaps</h3>
                            <p className="text-gray-700">The disconnect between professional credentials and actual leadership capacity in critical sectors.</p>
                        </div>
                        <div className="border-l-4 border-purple-500 pl-4 py-2">
                            <h3 className="font-semibold mb-1">Public-Sector Decision-Making</h3>
                            <p className="text-gray-700">Why government institutions face recurring leadership failures and what structural reforms can prevent them.</p>
                        </div>
                        <div className="border-l-4 border-orange-500 pl-4 py-2">
                            <h3 className="font-semibold mb-1">National Competitiveness</h3>
                            <p className="text-gray-700">The direct connection between leadership quality and America's ability to compete globally.</p>
                        </div>
                        <div className="border-l-4 border-red-500 pl-4 py-2">
                            <h3 className="font-semibold mb-1">Organizational Culture and Leadership Pipelines</h3>
                            <p className="text-gray-700">Building systems that consistently produce leaders capable of sustaining institutional missions under pressure.</p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Why It Matters to TSF */}
            <section className="py-8 bg-gray-50">
                <Container variant="compact">
                    <h2 className={SECTION_HEADING}>Why It Matters to The SozoRock Foundation</h2>
                    <div className="space-y-6 leading-relaxed text-base">
                        <p>
                            <em>UnReady to Lead</em> represents a critical extension of The SozoRock Foundation's core mission to strengthen institutional capacity across underserved and underperforming systems. The book's central thesis—that leadership failures are preventable through disciplined preparation—directly informs TSF's programmatic approach to rural health equity, governance reform, and systems assurance.
                        </p>

                        <div className="space-y-4">
                            <div className="bg-white p-5 rounded-lg border border-gray-200">
                                <h3 className="font-semibold text-lg mb-2">Aligns with TSF's Mission</h3>
                                <p className="text-gray-700">
                                    The Foundation exists to build America's capacity where it is weakest—in rural counties, in public health infrastructure, and in governance structures that lack both resources and leadership depth. This book provides the conceptual framework for understanding why those weaknesses persist and what readiness truly requires.
                                </p>
                            </div>

                            <div className="bg-white p-5 rounded-lg border border-gray-200">
                                <h3 className="font-semibold text-lg mb-2">Supports REBS and RRG Insights</h3>
                                <p className="text-gray-700">
                                    The Rural Equity Blueprint Series and Rethinking Rural Governance both identify leadership deficits as primary barriers to sustainable reform. <em>UnReady to Lead</em> examines those deficits at a systems level, offering insight into why rural institutions repeatedly struggle to attract, develop, and retain leaders capable of executing long-term strategies. The book complements these publications by addressing the human and organizational factors that data alone cannot capture.
                                </p>
                            </div>

                            <div className="bg-white p-5 rounded-lg border border-gray-200">
                                <h3 className="font-semibold text-lg mb-2">Integrates with HSA's Stability Goals</h3>
                                <p className="text-gray-700">
                                    Health Systems Assurance depends on leadership that can maintain trust, accountability, and operational integrity under stress. This book outlines the experiences and disciplines required to build that kind of leadership—particularly in environments where institutional memory is weak, regulatory oversight is inconsistent, and external pressures are high. The principles discussed in <em>UnReady to Lead</em> are foundational to TSF's vision of digitally enabled, resilient health infrastructure.
                                </p>
                            </div>
                        </div>

                        <p className="pt-4 border-t border-gray-300 text-gray-700">
                            This publication is not separate from The SozoRock Foundation's technical work—it is integral to it. Strong programs require strong leaders. Without addressing the readiness gap, no amount of funding, policy reform, or technological innovation will produce lasting change.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Related Publications */}
            <section className="py-8">
                <Container variant="compact">
                    <h2 className="text-2xl md:text-3xl font-normal mb-8">Related Publications</h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        <Link
                            href="/publication/rebs-v1-2025"
                            className="p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
                        >
                            <h3 className="font-semibold text-lg mb-2">
                                Rural Equity Blueprint Series (REBS)
                            </h3>
                            <p className="text-sm text-gray-600">
                                Volume 1 (2025) — Building a Framework for Rural Health Equity
                            </p>
                        </Link>

                        <Link
                            href="/publication/rrg-v1-2025"
                            className="p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
                        >
                            <h3 className="font-semibold text-lg mb-2">
                                Rethinking Rural Governance (RRG)
                            </h3>
                            <p className="text-sm text-gray-600">
                                Volume 1 (2025) — From Compliance to Systems Intelligence
                            </p>
                        </Link>

                        <Link
                            href="/publication/hsa-v1-2026"
                            className="p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
                        >
                            <h3 className="font-semibold text-lg mb-2">
                                Health Systems Assurance (HSA)
                            </h3>
                            <p className="text-sm text-gray-600">
                                Volume 1 (January 2026) — Building Digital Trust
                            </p>
                        </Link>
                    </div>
                </Container>
            </section>

            <Footer
                title={<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] leading-tight w-2/3 sm:w-auto">
                    Leadership that<br /> lasts.
                </h2>}
                subTitle="Building the capacity America needs through principled, prepared leadership."
                buttonOne={
                    <Button
                        size="lg"
                        variant="secondary"
                        className="w-full sm:w-auto"
                        onClick={() => setPartnerModalOpen(true)}
                    >
                        Partner With Us
                    </Button>
                }
                buttonTwo={
                    <Button size="lg" variant="outline" className="border-none w-full sm:w-auto">
                        <Link href="/about-us">Learn More</Link>
                    </Button>
                }
            />
            <PartnerWithUsModal open={partnerModalOpen} onOpenChange={setPartnerModalOpen} />
        </>
    )
}
