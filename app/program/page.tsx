'use client';

import { useState } from 'react';
import ProgramHero from "@/app/program/_components/ProgramHero";
import Container from "@/components/ui/container";
import {Button} from "@/components/ui/button";
import { AccessDayModal, LibraryHubModal, NursingXchangeModal } from '@/components/modals';

// Common class patterns
const SECTION_HEADING = "text-3xl md:text-[44px] font-normal mb-6 text-balance";
const SECTION_LAYOUT = "flex flex-col md:flex-row justify-between gap-8 md:gap-16";
const IMAGE_LARGE = "w-full md:w-[610px]";
const CONTENT_MAX_WIDTH = "max-w-[536px]";
const IMAGE_ROUNDED = "rounded-2xl";

export default function ProgramPage() {
    const [accessDayOpen, setAccessDayOpen] = useState(false);
    const [libraryHubOpen, setLibraryHubOpen] = useState(false);
    const [nursingXchangeOpen, setNursingXchangeOpen] = useState(false);

    return(
        <>
            <ProgramHero />
            <section className="py-12">
                <Container variant="compact">
                    <div className="mb-8 leading-relaxed block max-w-[626px] space-y-2">
                        <span className="block">
                            The Foundation's programs connect research, practice, and policy to strengthen rural health equity. Each initiative is evidence-based, outcome-measured, and designed for replication across counties and states.
                        </span>
                        <span className="block">
                            The work spans prevention, chronic-care management, literacy, workforce renewal, and systems readiness—each linked through a shared framework of governance, technology, and community engagement.
                        </span>
                    </div>
                    <div className={SECTION_LAYOUT}>
                        <div>
                            <figure className={IMAGE_LARGE}>
                                <img
                                    src="/o1.png"
                                    alt="Healthcare professional and farmer discussing health equity"
                                    className={`object-cover ${IMAGE_ROUNDED} w-full h-full`}
                                />
                            </figure>
                        </div>
                        <div className="space-y-6">
                            <h1 className="text-4xl md:text-[44px] font-normal leading-tight text-balance">
                                Access Day — Pilot for System Readiness
                            </h1>

                            <div className="space-y-4 leading-relaxed text-balance">
                                <span className="block">
                                    Access Day serves as the Foundation's flagship initiative, integrating preventive care, chronic illness management, literacy advancement, and access to essential services such as screening, referral, and telehealth support, and community engagement into a single coordinated platform.
                                </span>

                                <span className="block">
                                    It connects local health departments, academic partners, and community organizations to deliver immediate health services while generating data for long-term workforce and policy design. Each event functions as a test environment for scalable interventions—linking service delivery with evidence generation and replication modeling.
                                 </span>

                                <span className="block">
                                    Programs are prioritized based on regional CHA and CHIP data and aligned with local health departments to ensure measurable outcomes and policy relevance.
                                </span>
                            </div>

                            <Button
                                variant="secondary"
                                onClick={() => setAccessDayOpen(true)}
                            >
                                Register Interest
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="py-12">
                <Container className={SECTION_LAYOUT} variant="compact">
                    <div className={CONTENT_MAX_WIDTH}>
                        <h2 className={SECTION_HEADING}>
                            Library Health Equity Hub — Access through Learning Networks
                        </h2>

                        <span className="block leading-relaxed mb-6">
                            Gain exclusive insights into emerging strategies, policy recommendations, and real-world data shaping
                            the future of equitable rural health systems.
                        </span>

                        <span className="block leading-relaxed mb-6">
                             Through partnerships with educational institutions and local governments, the Hub builds digital confidence, supports early detection readiness, and strengthens rural connectivity for vulnerable populations.
                        </span>

                        <span className="block leading-relaxed mb-6">
                            The model aligns with county-level CHA and CHIP objectives and is designed for replication across library systems in New York and beyond.
                        </span>

                        <Button
                            variant="secondary"
                            onClick={() => setLibraryHubOpen(true)}
                        >
                            Register Interest
                        </Button>
                    </div>

                    {/* Right Side - Image */}
                    <img
                        src="/o2.png"
                        alt="Rural Equity Blueprint report"
                        className={`object-cover ${IMAGE_ROUNDED} ${IMAGE_LARGE} h-fit`}
                    />
                </Container>
            </section>
            <section className="py-12">
                <Container variant="compact">
                    <div className={SECTION_LAYOUT}>
                        <div>
                            <figure className={IMAGE_LARGE}>
                                <img
                                    src="/o3.png"
                                    alt="Healthcare professional and farmer discussing health equity"
                                    className={`object-cover ${IMAGE_ROUNDED} w-full h-full`}
                                />
                            </figure>
                        </div>
                        <div className="space-y-6">
                            <h1 className="text-4xl md:text-[44px] font-normal leading-tight text-balance">
                                Nursing Xchange
                            </h1>

                            <div className="space-y-4 leading-relaxed text-balance">
                                <span className="block">
                                    Nursing Xchange is a professional and academic fellowship structured to strengthen leadership within nursing and allied health. Launching in 2026, it links academic learning, clinical application, and systems innovation under a single framework that prepares professionals to lead change in rural and underserved communities. The fellowship advances applied research, mentorship, and rotational practice to translate evidence into measurable outcomes. Each cohort focuses on competencies in governance, quality improvement, and digital integration, ensuring participants can align clinical impact with institutional reform.
                                </span>

                                <span className="block">
                                    Nursing Xchange defines the next generation of professional pathways—where workforce development functions as a driver of system performance.
                                 </span>

                                <span className="block">
                                    Professional Pathway Context<br />Nursing Xchange operates within the Foundation's Rural Equity Workforce Pathway, aligning education, policy, and institutional design to address persistent provider shortages. The program embeds leadership formation within data-driven initiatives such as Access Day and the Library Health Equity Hub, converting pilot interventions into durable capacity. This structure positions the initiative as a scalable model for workforce renewal—turning professional growth into measurable system strength.
                                </span>
                            </div>

                            <Button
                                variant="secondary"
                                onClick={() => setNursingXchangeOpen(true)}
                            >
                                Register Interest
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Modals */}
            <AccessDayModal open={accessDayOpen} onOpenChange={setAccessDayOpen} />
            <LibraryHubModal open={libraryHubOpen} onOpenChange={setLibraryHubOpen} />
            <NursingXchangeModal open={nursingXchangeOpen} onOpenChange={setNursingXchangeOpen} />
        </>
    )
}
