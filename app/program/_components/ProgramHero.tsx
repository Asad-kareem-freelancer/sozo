import Container from "@/components/ui/container";

export default function ProgramHero(){
    return (
        <Container>
            <div className="relative">
                <div className="rounded-3xl overflow-hidden h-[76vh] md:max-h-[550px] lg:max-h-[700px] transform scale-x-[-1]">
                    <img
                        src="/program-hero"
                        alt="hero-image"
                        className="h-full rounded-2xl overflow-hidden w-full transform scale-[1.14] origin-bottom-left object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/[0.192] to-black/80"></div>
                </div>
                <div className="flex flex-col lg:flex-row justify-center lg:justify-between absolute inset-0 p-4 sm:p-6 md:p-10 lg:p-16 items-center lg:items-end gap-8 lg:gap-4">
                    <div className="space-y-5 md:space-y-6 lg:space-y-6 max-w-full lg:max-w-[45%] text-center lg:text-left">
                        <h1 className="text-white font-normal text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-tight lg:leading-15">From Research to Measurable Impact</h1>
                        <h5 className="font-medium text-[15px] md:text-base text-white leading-relaxed">Programs that translate evidence into scalable models for literacy, workforce readiness, and equitable care.</h5>
                    </div>
                </div>
            </div>
        </Container>
    )
}