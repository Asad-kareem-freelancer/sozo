import PublicHero from "@/app/publication/_components/PublicHero";
import {Button} from "@/components/ui/button";
import Container from "@/components/ui/container";
import Footer from "@/components/Footer";

// Common class patterns
const SECTION_HEADING = "text-2xl md:text-3xl lg:text-[44px] font-normal mb-6 text-balance";
const SECTION_LAYOUT = "flex flex-col lg:flex-row justify-between gap-8 lg:gap-16";
const IMAGE_LARGE = "w-full lg:w-[610px]";
const CONTENT_MAX_WIDTH = "max-w-full lg:max-w-[536px]";
const IMAGE_ROUNDED = "rounded-2xl";

const publications = [
    {
        volume: "Volume 2 (2026)",
        title: "Access Day Field Insights and Data Models",
    },
    {
        volume: "Volume 3 (2026)",
        title: "Workforce Pathways for Rural Retention and Education",
    },
]

export default function PublicationPage() {
    return(
        <>
            <PublicHero />

            <section className="py-8">
                <Container variant="compact">
                    <div>
                        <span className="mb-8 leading-relaxed block max-w-full lg:max-w-[626px]">
                            The Rural Equity Blueprint Series (REBS) is the Foundation's flagship publication program. Each volume
                            presents a structured model for equitable access, literacy, and workforce development. Volume 1 defines the
                            core framework guiding all forthcoming pilots, including Access Day and the Library Health Equity Hub.
                        </span>
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

                            <div className={`py-8 lg:py-12 space-y-1 ${CONTENT_MAX_WIDTH}`}>
                                <p className="font-semibold text-sm md:text-base">Oluwabuyi Adeyemo, MBA <span className="font-normal inline">— Principal Author</span></p>
                                <p className="font-semibold text-sm md:text-base">Jordan Hare, BSN, RN <span className="font-normal inline">— Contributing Author</span></p>
                                <div className='p-4 bg-[#F0F6F6] rounded-xl mt-8'>
                                    <p className="text-xs">
                                        SozoRock Foundation (2025). Rural Equity Blueprint Series, Volume 1 — Building a Framework for Rural
                                        Health Equity in New York State. Albany, NY: The SozoRock Foundation.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6 w-full lg:w-auto">
                            <h1 className="text-2xl md:text-4xl lg:text-[44px] font-normal leading-tight text-balance">
                                Access, Literacy, and Leadership — Building a Framework for Rural Health Equity
                            </h1>

                            <div className="space-y-4 leading-relaxed text-balance text-sm md:text-base">
                                <p>
                                    The Rural Equity Blueprint Series extends recognition to the county public-health directors and their teams across Western New York for providing access to Community Health Assessment (CHA) and Community Health Improvement Plan (CHIP) documentation, and for sharing comprehensive county health priorities during the pre-planning and information-sharing phase. Their cooperation and contextual data strengthened the precision of regional analysis across all thematic areas — workforce, literacy, prevention, chronic disease, and access equity — and informed the modeling framework developed for this volume.
                                </p>

                                <p>
                                    Additional insights were contributed through early academic and sector dialogues that offered perspective on rural service readiness and educational alignment across New York State. These engagements have since concluded, yet their perspectives enriched the Foundation’s understanding of rural health-system dynamics. All modeling, governance design, and analytical synthesis presented in this publication were developed independently by The SozoRock Foundation. The framework, structure, and datasets remain the Foundation’s intellectual property. The analyses and conclusions expressed herein are solely those of The SozoRock® Foundation and do not represent the views of any county department, academic institution, or external contributor.
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

                        <span className="block leading-relaxed mb-6 text-sm md:text-base">
                                    Gain exclusive insights into emerging strategies, policy recommendations, and real-world data shaping
                                    the future of equitable rural health systems.
                                </span>

                        <div className="space-y-3 mb-8 text-sm md:text-base">
                            <p className="font-semibold">Inside you&#39;ll find:</p>
                            <ul className="list-disc list-inside space-y-2 leading-tight">
                                <li>Frameworks for implementation and measurement</li>
                                <li>Expert commentary and case studies</li>
                                <li>Practical tools for policymakers and practitioners</li>
                            </ul>
                        </div>

                        <Button
                            variant="secondary"
                            asChild
                        >
                            <a href="#">Download Report</a>
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
                                <div key={index} className="border-l-4 border-blue-200 pl-4 md:pl-6 space-y-2">
                                    <p className="font-semibold uppercase tracking-wide text-xs md:text-sm">{pub.volume}</p>
                                    <span className="font-semibold text-sm md:text-base">{pub.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>
            <Footer
                title="From pilot to permanence."
                subTitle="Access our publications to explore frameworks advancing rural health equity."
                buttonOne={
                    <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                        Partner With US
                    </Button>
                }

                buttonTwo={
                    <Button size="lg" variant="outline" className="border-none w-full sm:w-auto">
                        Learn More
                    </Button>
                }
            />
        </>
    )
}