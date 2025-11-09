import {Card, CardContent, CardHeader} from "@/components/ui/card";
import Container from "@/components/ui/container";

export default function Services(){
    return (
        <section className="py-8 md:py-14">
            <Container variant="compact">
                <div className="space-y-8 md:space-y-12">
                    <div className="space-y-3 md:space-y-4">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] font-normal">What We Do</h1>
                        <span className="block text-sm sm:text-base md:text-lg leading-relaxed">The SozoRock® Foundation transforms research into measurable change—designing scalable models for rural health access, literacy, and leadership.</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        <Card className="bg-[#F0F6F6]/60 transition-shadow hover:shadow-lg">
                            <CardHeader>
                                <h2 className="text-xl md:text-2xl font-normal">01. Research & Publications</h2>
                            </CardHeader>
                            <CardContent className="bg-white/40">
                                <p className="text-sm md:text-base leading-relaxed">Developing evidence-based frameworks, including the Rural Equity Blueprint Series (REBS).</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-[#F0F6F6]/60 transition-shadow hover:shadow-lg">
                            <CardHeader>
                                <h2 className="text-xl md:text-2xl font-normal">02. Programs & Pilots</h2>
                            </CardHeader>
                            <CardContent className="bg-white/40">
                                <p className="text-sm md:text-base leading-relaxed">Advancing field initiatives such as Access Day and the Library Health Equity Hub.</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-[#F0F6F6]/60 transition-shadow hover:shadow-lg md:col-span-2 lg:col-span-1">
                            <CardHeader>
                                <h2 className="text-xl md:text-2xl font-normal">03. People & Partnerships</h2>
                            </CardHeader>
                            <CardContent className="bg-white/40">
                                <p className="text-sm md:text-base leading-relaxed">Aligning universities, providers, and communities to drive measurable rural impact.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </Container>
        </section>
    )
}