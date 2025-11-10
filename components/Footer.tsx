'use client';

import Link from "next/link";
import Container from "@/components/ui/container";
import Image from "next/image";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {navigation} from "@/const/nav";
import {ReactNode, useState} from "react";
import ContactUsModal from "@/components/modals/ContactUsModal";

type Props = {
    title: ReactNode;
    subTitle: string;
    buttonOne: ReactNode;
    buttonTwo: ReactNode;
}

export default function Footer({ title, buttonOne, buttonTwo, subTitle }: Props) {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <footer className="py-8 md:py-12 lg:py-16 bg-no-repeat bg-cover" style={{
        backgroundImage: `url(/footer.jpg)`,
    }}>
        <Container variant="compact">
          <div className="space-y-6 md:space-y-8">
              {/* CTA Section */}
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 lg:gap-8">
                  <div className="space-y-3 md:space-y-4 max-w-full font-medium">
                      {title}
                      <span className="text-sm sm:text-base block">
                            {subTitle}
                      </span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                      {buttonOne}
                      {buttonTwo}
                  </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-10 sm:items-center">
                      <span className="text-sm sm:text-base font-medium">
                          Stay connected with The SozoRock Foundation
                      </span>
                  <div className="flex gap-4 items-center">
                      <Link
                          href="https://linkedin.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:opacity-70 transition-opacity"
                      >
                          <Image src="/ln.svg" alt="Linkedin logo" width={20} height={20} />
                      </Link>
                      <Link
                          href="https://twitter.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:opacity-70 transition-opacity"
                      >
                          <Image src="/in.svg" alt="instagram logo" width={20} height={20}/>
                      </Link>
                      <Link
                          href="https://facebook.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:opacity-70 transition-opacity"
                      >
                          <Image src="/x.svg" alt="Linkedin logo" width={20} height={20}/>
                      </Link>
                      <Link
                          href="https://instagram.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:opacity-70 transition-opacity"
                      >
                          <Image src="/youtube.svg" alt="Linkedin logo" width={20} height={20}/>
                      </Link>
                  </div>
              </div>

              {/* Footer Card */}
              <Card className="py-6 md:py-8">
                  <CardHeader className="px-4 sm:px-6 md:px-10">
                      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-6 md:gap-8">
                          {navigation.map((item) => (
                              item.href === "#contact" ? (
                                  <button
                                      key={item.name}
                                      onClick={() => setContactModalOpen(true)}
                                      className="text-sm transition-colors font-normal text-left hover:underline"
                                  >
                                      {item.name}
                                  </button>
                              ) : (
                                  <Link
                                      key={item.name}
                                      href={item.href}
                                      className="text-sm transition-colors font-normal"
                                  >
                                      {item.name}
                                  </Link>
                              )
                          ))}
                      </div>
                  </CardHeader>
                  <CardContent className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8 lg:gap-4 px-4 sm:px-6 md:px-10">
                      <div className="space-y-6 md:space-y-8 lg:space-y-12">
                          <div>
                              <label className="text-xs opacity-60 block mb-1">Email</label>
                              <a href="mailto:contact@sozorockfoundation.org" className="text-sm break-all font-bold hover:underline">
                                  contact@sozorockfoundation.org
                              </a>
                          </div>

                          <p className="text-xs sm:text-sm">
                              <Link href="/policies#privacy" className="hover:underline">Privacy</Link> | <Link href="/policies#accessibility" className="hover:underline">Accessibility</Link> | <Link href="/policies#nondiscrimination" className="hover:underline">Nondiscrimination</Link>
                          </p>

                          <p className="opacity-50 text-xs">© 2025 — All rights reserved.</p>
                      </div>
                      <div className="text-xs space-y-2 font-normal max-w-full lg:max-w-[244px]">
                          <Image src="/footer-logo.png" alt="Footer Logo" width={160} height={36} className="mb-4 md:mb-6 "/>
                          <h5 className="font-semibold text-xs">From Insight to Impact in Health systems.</h5>
                          <span className="block text-xs">SozoRock® is a registered trademark of SozoRock Tech Inc., used under license by The SozoRock Foundation.</span>
                      </div>
                  </CardContent>
              </Card>
          </div>
      </Container>
      <ContactUsModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
    </footer>
  );
}
