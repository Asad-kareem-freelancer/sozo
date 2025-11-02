import Container from "@/components/ui/container";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import Link from "next/link";
import LeadershipCarousel from "@/components/LeadershipCarousel";

const arr = [
    {
        id: 1,
        title: "Mission",
        description: "To strengthen rural and underserved health systems by integrating research, literacy, and workforce development into scalable, evidence-driven frameworks that improve access and equity."
    },
    {
        id: 2,
        title: "Approach",
        description: "The Foundation aligns data, governance, and community collaboration to translate public-health priorities into measurable outcomes. Programs move from insight to implementation through structured partnerships across education, policy, and healthcare systems."
    },
    {
        id: 3,
        title: "Governance",
        description: "The Foundation operates under a collaborative governance model that brings together academic, provider, and public-sector partners. Oversight mechanisms ensure transparency, fiscal accountability, and alignment with equity and workforce objectives."
    }
]

export default function AboutUsPage() {
    return (
        <>
            <section>
                <Container>
                    <div className="py-12 md:py-16 lg:py-20 px-6 text-center rounded-3xl bg-no-repeat bg-cover" style={{
                        backgroundImage: `url(/footer.jpg)`,
                    }}>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-[54px]">About the SozoRock Foundation</h1>
                        <span className="block text-sm md:text-base">Advancing rural health equity through research, leadership, and collaboration.</span>
                    </div>
                </Container>
            </section>

            <section className="py-12 md:py-16 lg:py-24">
                <Container variant="compact">
                    <div className="flex flex-col lg:flex-row justify-between gap-6 items-start lg:items-center mb-6 md:mb-8 lg:mb-10">
                        <h1 className="text-3xl md:text-4xl lg:text-[44px] font-normal leading-tight">Building Trust Through Purpose and Accountability</h1>
                        <span className="text-sm md:text-base lg:max-w-[440px]">Our mission, approach, and governance reflect a unified commitment to advancing health equity through research, collaboration, and transparent leadership.</span>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-4 xl:gap-6 justify-between">
                        <div className="w-full lg:w-[360px] xl:w-[400px]">
                            <img src="/about.png" alt="About Us" className="w-full rounded-2xl"/>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 flex-1">
                            {arr.map(item => (
                                <Card className="bg-[#F0F6F6]/60" key={item.id}>
                                    <CardHeader>
                                        <h2 className="text-xl md:text-2xl font-medium">{item.title}</h2>
                                    </CardHeader>
                                    <CardContent className="bg-white/40">
                                        <span className="text-sm md:text-base">{item.description}</span>
                                    </CardContent>
                                </Card>
                            ))}
                            <img src="/about-2.png" className="w-full h-full rounded-2xl" alt="About Us" />
                        </div>
                    </div>
                </Container>
            </section>

            <section className="py-12 md:py-16 lg:py-24">
                <Container variant="compact">
                    <div className="flex flex-col lg:flex-row gap-8 md:gap-16 lg:gap-36">
                        <div className="w-full lg:w-[610px] lg:min-w-[610px]">
                            <img src="/about-3.png" className="w-full h-full rounded-2xl object-cover" alt="About Us" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl lg:text-[44px] mb-2">Focus Areas</h1>
                            <span className="block mb-4 md:mb-6 text-sm md:text-base">The Foundation's work centers on three pillars that define its mission and outcomes:</span>
                            <div className="divide-y divide-gray-200">
                                <div className="py-4 md:py-6">
                                    <span className="block text-sm md:text-base"><b>Rural Health Equity</b> — advancing access and service delivery for underserved populations.</span>
                                </div>

                                <div className="py-4 md:py-6">
                                    <span className="block text-sm md:text-base"><b>Literacy and Workforce Development</b> — integrating education and capacity-building into long-term systeare tehm resilience.</span>
                                </div>

                                <div className="py-4 md:py-6">
                                    <span className="block text-sm md:text-base"><b>Research and Data Systems</b> — applying evidence-based insights to guide policy, funding, and governance decisions.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="py-12 md:py-16 lg:py-24">
                <Container variant="compact">
                    <h1 className="text-3xl md:text-4xl lg:text-[44px] mb-6 md:mb-8 lg:mb-10">Leadership Team</h1>
                    <LeadershipCarousel />
                </Container>
            </section>
        </>
    )
}