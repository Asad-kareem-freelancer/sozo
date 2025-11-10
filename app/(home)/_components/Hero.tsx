import Container from "@/components/ui/container";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import { Users } from "lucide-react";

export default function Hero(){
    return (
        <Container>
            <div className="relative">
                <div className="rounded-3xl overflow-hidden h-[76vh] md:max-h-[550px] lg:max-h-[700px] transform scale-x-[-1]">
                    <img
                        src="/hero-image.jpg"
                        alt="hero-image"
                        className="h-full rounded-2xl overflow-hidden w-full transform scale-[1.14] origin-bottom-left object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/[0.192] to-black/80"></div>
                </div>
                <div className="flex flex-col lg:flex-row justify-end lg:justify-between absolute inset-0 p-4 sm:p-6 md:p-10 lg:p-16 items-center lg:items-end gap-8 lg:gap-4">
                    <div className="space-y-5 md:space-y-6 lg:space-y-6 max-w-full lg:max-w-[54%] text-center lg:text-left">
                        <h1 className="text-white font-normal text-xl sm:text-4xl md:text-5xl lg:text-[54px] leading-tight lg:leading-15">From Insight to<br /> Impact in Health systems</h1>
                        <h5 className="font-medium text-sm md:text-base text-white">Advancing data-driven equity across health systems.</h5>
                        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-center lg:justify-start">
                            <Button size="default" variant="outline" className="w-full sm:w-auto">
                                View Rural Equity Blueprint
                            </Button>

                            <Button size="default" variant="gray" className="w-full sm:w-auto">
                                Get Involved
                            </Button>
                        </div>
                    </div>

                    <div className="hidden lg:flex flex-col space-y-4 md:space-y-5 w-full lg:w-auto items-center lg:items-start">
                        <div className="flex flex-row gap-2 sm:gap-4 items-stretch justify-center lg:justify-start">
                            <Card className="w-full lg:min-w-72 py-0 flex flex-col">
                                <CardContent className="flex justify-between items-center relative px-0 overflow-hidden flex-1">
                                    <div className="space-y-4 sm:space-y-6 lg:space-y-10 p-3 sm:p-4 lg:p-5">
                                        <span className="text-xs lg:text-sm block">Nursing Fellows</span>
                                        <div className="w-2/3">
                                            <h3 className="text-2xl lg:text-[32px]">100+</h3>
                                            <span className="text-xs lg:text-sm">Target cohort in progress</span>
                                        </div>
                                    </div>
                                    <img src="/doc.png" alt="responsive" className="absolute inset-y-0 object-cover transform object-cover h-full -right-2 object-bottom max-w-[80px] sm:max-w-[120px] lg:max-w-[154px]" />
                                </CardContent>
                            </Card>
                            <Card className="w-full lg:max-w-[185px] flex flex-col gap-6 py-2.5">
                                <CardHeader className="flex gap-2 sm:gap-3 px-3 sm:px-4 lg:px-5 py-3 sm:py-4">
                                    <img src="/bulb.png" alt="responsive" className="w-6 h-6 sm:w-8 sm:h-8 lg:w-auto lg:h-auto" />
                                    <span className="text-xs lg:text-sm">Insight</span>
                                </CardHeader>
                                <CardContent className="px-3 sm:px-4 lg:px-5 pb-3 sm:pb-4 lg:pb-5 flex-1">
                                    <h3 className="text-2xl lg:text-[32px]">65%</h3>
                                    <span className="text-xs lg:text-sm">of rural counties face provider shortages</span>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="flex gap-2 sm:gap-4 lg:gap-8 rounded-full backdrop-blur-[16px] shadow-[inset_-1px_-1px_2px_0px_#FFFFFF29,inset_1px_1px_2px_0px_#FFFFFF4D] py-2 px-3 sm:px-4 lg:px-5">
                            <h5 className="text-white font-medium text-[10px] sm:text-[11px] lg:text-[13px] leading-4 sm:leading-5 lg:leading-6">Partnership engagements developing across 45+ communities</h5>
                            <Users className="text-white w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex-shrink-0" />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}