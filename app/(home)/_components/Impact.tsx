import Container from "@/components/ui/container";
import Link from "next/link";

export default function Impact(){
    return (
        <section className="py-8 md:py-10 xl:py-14">
            <Container variant="compact">
                <div className="grid grid-cols-1 xl:grid-cols-2 justify-between gap-6 md:gap-8 xl:gap-12">
                    <div className="space-y-4 md:space-y-5 xl:space-y-6">
                        <div className="flex flex-col sm:flex-row gap-4 md:gap-5 xl:gap-6 justify-center">
                            <img src="/card1.png" alt="card1" className="rounded-2xl w-full sm:w-auto sm:max-w-[280px] md:max-w-[320px] xl:max-w-[344px]" />
                            <div className="bg-no-repeat flex flex-col justify-between bg-cover rounded-2xl w-full sm:w-auto sm:min-w-[200px] md:min-w-[220px] xl:min-w-[250px] p-4 md:p-5 xl:p-6" style={{
                                backgroundImage: `url(/footer.jpg)`,
                            }}>
                                <div>
                                    <h2 className="text-2xl md:text-3xl xl:text-[38px]">25+</h2>
                                    <p className="text-sm md:text-sm xl:text-base">Institutions in active</p>
                                    <p className="text-[#009E9B] text-xs">Coordination</p>
                                </div>

                                <div className="text-right">
                                    <h2 className="text-2xl md:text-3xl xl:text-[38px]">45+</h2>
                                    <p className="text-sm md:text-sm xl:text-base">Communities in early</p>
                                    <p className="text-[#009E9B] text-xs">Engagement</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 md:gap-5 xl:gap-6 justify-center">
                            <img src="/N.png" alt="N" className="w-auto max-w-[120px] hidden sm:inline sm:max-w-none" />
                            <img src="/card2.png" alt="card2" className="rounded-2xl w-full sm:w-auto sm:max-w-[380px] md:max-w-[420px] xl:max-w-[464px]"/>
                        </div>
                    </div>
                    <div className="mt-6 xl:mt-0">
                        <h1 className="text-3xl md:text-4xl xl:text-[44px] mb-2">Impact Programs</h1>
                        <span className="block mb-4 md:mb-5 xl:mb-6 text-sm md:text-base">The SozoRock Foundation develops field-tested models that translate research into measurable rural outcomes.</span>
                        <div className="divide-y divide-gray-200">
                            <div className="py-4 md:py-5 xl:py-6 space-y-2 xl:space-y-3">
                                <span className="block text-sm md:text-base"><b>Access Day</b> — A county-based framework integrating health screenings, preventive education, and literacy outreach to strengthen early detection and community trust in rural care systems.</span>
                                <Link href="/" className="text-[#009E9B] underline text-sm inline-block">View Program Overview</Link>
                            </div>

                            <div className="py-4 md:py-5 xl:py-6 space-y-2 xl:space-y-3">
                                <span className="block text-sm md:text-base"><b>Library Health Equity Hub</b> — A scalable model transforming local libraries into trusted community health access points for telehealth, translation, and literacy programs.</span>
                                <Link href="/" className="text-[#009E9B] underline text-sm inline-block">Explore the Hub</Link>
                            </div>

                            <div className="py-4 md:py-5 xl:py-6 space-y-2 xl:space-y-3">
                                <span className="block text-sm md:text-base"><b>Rural Equity Blueprint Series (REBS)</b> — The Foundation&#39;s research and publication series defining replicable frameworks for equitable rural health systems.</span>
                                <Link href="/" className="text-[#009E9B] underline text-sm inline-block">View Volume 1</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}