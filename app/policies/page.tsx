import Container from "@/components/ui/container";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import Footer from "@/components/Footer";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function PoliciesPage() {
    return (
        <>
            <section>
                <Container>
                    <div className="py-12 md:py-16 lg:py-20 px-6 text-center rounded-3xl bg-no-repeat bg-cover" style={{
                        backgroundImage: `url(/footer.jpg)`,
                    }}>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-[54px] mb-2">Policies</h1>
                        <span className="block text-sm md:text-base">Our commitment to privacy, accessibility, and nondiscrimination.</span>
                    </div>
                </Container>
            </section>

            <section className="py-12 md:py-16 lg:py-24">
                <Container variant="compact">
                    <div className="space-y-12 md:space-y-16 lg:space-y-20">
                        {/* Privacy Policy */}
                        <Card id="privacy">
                            <CardHeader>
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-2">Privacy Policy</h2>
                                <p className="text-sm text-gray-600">Effective Date: November 2025 | Version 1.0</p>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <p className="text-sm md:text-base">
                                    The SozoRock® Foundation values the privacy and confidence of everyone who engages with our work. We collect and use only the information necessary to operate our website, administer programs, and meet our legal and reporting obligations as a nonprofit organization incorporated in the State of New York.
                                </p>

                                <div>
                                    <h3 className="text-lg md:text-xl font-semibold mb-3">1 Information We Collect</h3>
                                    <p className="text-sm md:text-base">
                                        We may collect limited personal information such as name, email address, phone number, and organization affiliation when individuals register for programs, submit forms, or request information from the Foundation.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg md:text-xl font-semibold mb-3">2 Use of Information</h3>
                                    <p className="text-sm md:text-base">
                                        Collected data are used solely to manage participation in Foundation programs, communicate relevant updates, and fulfill legitimate operational or compliance requirements.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg md:text-xl font-semibold mb-3">3 Disclosure to Third Parties</h3>
                                    <p className="text-sm md:text-base">
                                        The Foundation does not sell or rent personal data. Information may be processed by service providers who assist in website, communication, or administrative functions under confidentiality and security obligations consistent with applicable law.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg md:text-xl font-semibold mb-3">4 Data Retention and Security</h3>
                                    <p className="text-sm md:text-base">
                                        Personal information is retained only as long as necessary to meet the purpose for which it was collected or as required by law. Access is restricted to authorized personnel following the Foundation's internal data-governance standards.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg md:text-xl font-semibold mb-3">5 Lawful Basis</h3>
                                    <p className="text-sm md:text-base">
                                        Information is processed under the Foundation's legitimate interest in operating charitable and educational programs, or as required to comply with legal or regulatory obligations.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg md:text-xl font-semibold mb-3">6 Your Choices</h3>
                                    <p className="text-sm md:text-base">
                                        You may request access to, correction of, or deletion of your personal information by contacting <a href="mailto:contact@sozorockfoundation.org" className="font-semibold">contact@sozorockfoundation.org</a>. Requests are reviewed in accordance with applicable privacy regulations and internal policy.
                                    </p>
                                </div>

                                <p className="text-sm md:text-base">
                                    The SozoRock Foundation follows applicable federal and state privacy requirements for charitable entities. Policies are reviewed annually or as required by law.
                                </p>

                                <p className="text-xs text-gray-600">
                                    © 2025 The SozoRock Foundation · All rights reserved
                                </p>
                            </CardContent>
                        </Card>

                        {/* Accessibility Statement */}
                        <Card id="accessibility">
                            <CardHeader>
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-2">Accessibility Statement</h2>
                                <p className="text-sm text-gray-600">Effective Date: November 2025 | Version 1.0</p>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <p className="text-sm md:text-base">
                                    The SozoRock® Foundation is committed to equitable access for all individuals. We design and maintain our digital materials to align with the Web Content Accessibility Guidelines (WCAG) 2.1 AA standard.
                                </p>

                                <div>
                                    <h3 className="text-lg md:text-xl font-semibold mb-3">Our Commitment</h3>
                                    <ul className="list-disc pl-6 space-y-2 text-sm md:text-base">
                                        <li>Design and test digital content to ensure it remains perceivable, operable, understandable, and robust.</li>
                                        <li>Maintain compatibility with assistive technologies across devices and browsers.</li>
                                        <li>Conduct quarterly accessibility reviews and track remediation through internal governance processes.</li>
                                        <li>Invite feedback to identify and resolve barriers promptly at <a href="mailto:contact@sozorockfoundation.org" className="font-semibold">contact@sozorockfoundation.org</a>.</li>
                                    </ul>
                                </div>

                                <p className="text-sm md:text-base">
                                    The SozoRock Foundation is incorporated in the State of New York and complies with relevant accessibility and equal-access statutes. Policies are reviewed annually or as required by law.
                                </p>

                                <p className="text-xs text-gray-600">
                                    © 2025 The SozoRock Foundation · All rights reserved
                                </p>
                            </CardContent>
                        </Card>

                        {/* Nondiscrimination Statement */}
                        <Card id="nondiscrimination">
                            <CardHeader>
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-2">Nondiscrimination Statement</h2>
                                <p className="text-sm text-gray-600">Effective Date: November 2025 | Version 1.0</p>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <p className="text-sm md:text-base">
                                    The SozoRock® Foundation upholds the principle that dignity and opportunity must be extended to all. In accordance with federal, state, and local laws, the Foundation prohibits discrimination in every aspect of its operations.
                                </p>

                                <p className="text-sm md:text-base">
                                    This policy applies to all Foundation activities—including program delivery, employment, procurement, and partnerships. Alleged violations may be reported confidentially to <a href="mailto:contact@sozorockfoundation.org" className="font-semibold">contact@sozorockfoundation.org</a> for review.
                                </p>

                                <p className="text-sm md:text-base">
                                    The Foundation does not discriminate on the basis of race, color, religion, creed, sex, gender identity or expression, sexual orientation, age, national origin, disability, marital status, veteran status, or any other category protected by law.
                                </p>

                                <p className="text-sm md:text-base">
                                    The Foundation adheres to the New York State Human Rights Law and applicable federal civil-rights statutes administered by the U.S. Equal Employment Opportunity Commission.
                                </p>

                                <p className="text-sm md:text-base">
                                    The SozoRock Foundation is incorporated in the State of New York and complies with all relevant legal obligations for charitable entities. Policies are reviewed annually or as required by law.
                                </p>

                                <p className="text-xs text-gray-600">
                                    © 2025 The SozoRock Foundation · All rights reserved
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </Container>
            </section>

            <Footer
                title={<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] leading-tight w-2/3 sm:w-auto">
                    Questions About Our Policies?
                </h2>}
                subTitle="We're here to help. Contact us for more information about our privacy, accessibility, or nondiscrimination policies."
                buttonOne={
                    <Button size="lg" variant="secondary" className="w-full sm:w-auto" asChild>
                        <a href="mailto:contact@sozorockfoundation.org">Contact Us</a>
                    </Button>
                }
                buttonTwo={
                    <Button size="lg" variant="outline" className="border-none w-full sm:w-auto" asChild>
                        <Link href="/">Back to Home</Link>
                    </Button>
                }
            />
        </>
    );
}
