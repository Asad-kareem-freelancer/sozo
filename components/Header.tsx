"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/container";
import {navigation} from "@/const/nav";
import type {LucideIcon} from "lucide-react";
import {BookOpen, Briefcase, Building2, Mail, Menu, Users} from "lucide-react";
import {Sheet, SheetContent, SheetTrigger,} from "@/components/ui/sheet";
import {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import ContactUsModal from "@/components/modals/ContactUsModal";

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const [sideOpen, setSideOpen] = useState(false);
    const [contactModalOpen, setContactModalOpen] = useState(false);

    const iconMap: Record<string, LucideIcon> = {
        Building2,
        Users,
        Briefcase,
        BookOpen,
        Mail,
    };

    const handleSmoothScroll = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string
    ) => {
        e.preventDefault();

        // Check if this is the Contact link
        if (href === "#contact") {
            setContactModalOpen(true);
            setSideOpen(false);
            return;
        }

        if (pathname === "/") {
            const targetId = href.replace("#", "");
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        } else {
            localStorage.setItem("scrollToSection", href);
            router.push(`/`);
        }

        setSideOpen(false);
    };

    useEffect(() => {
        if (pathname === "/") {
            const scrollTarget = localStorage.getItem("scrollToSection");

            if (scrollTarget) {
                localStorage.removeItem("scrollToSection");

                setTimeout(() => {
                    const targetId = scrollTarget.replace("#", "");
                    const targetElement = document.getElementById(targetId);

                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                        });
                    }
                }, 100);
            }
        }
    }, [pathname]);

  return (
    <header className="bg-white/95 backdrop-blur-sm mb-2">
      <Container>
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-900">
                <Image src="/footer-logo.png" alt="Footer Logo" width={160} height={36} />
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:gap-8 absolute left-1/2 -translate-x-1/2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  if (item.href.startsWith('#')) {
                    handleSmoothScroll(e, item.href);
                  }
                }}
                className="text-sm transition-colors font-normal hover:text-gray-600 hover:underline underline-offset-4"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu */}
            <div className="md:hidden">
                <Sheet open={sideOpen} onOpenChange={setSideOpen}>
                    <SheetTrigger asChild>
                        <button
                            type="button"
                            aria-label="Open menu"
                            className="bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-100 transition"
                        >
                            <Menu size={20} strokeWidth={1.5} />
                        </button>
                    </SheetTrigger>
                    <SheetContent
                        side="right"
                        className="bg-white px-0 flex flex-col"
                        onCloseAutoFocus={(e) => e.preventDefault()}
                    >
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                            <Link href="/" onClick={() => setSideOpen(false)}>
                                <Image src="/logo.png" alt="Logo" width={118} height={24} />
                            </Link>
                        </div>

                        <ul className="font-medium text-gray-700 px-4 py-2">
                            {navigation.map((link, index) => {
                                const Icon = iconMap[link.icon];
                                return (
                                    <li key={index}>
                                        <Link
                                            href={link.href}
                                            onClick={(e) => {
                                              if (link.href.startsWith('#')) {
                                                handleSmoothScroll(e, link.href);
                                              } else {
                                                setSideOpen(false);
                                              }
                                            }}
                                            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-md"
                                        >
                                            {Icon && <Icon size={20} strokeWidth={1.5} />}
                                            <span>{link.name}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
      </Container>
      <ContactUsModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
    </header>
  );
}
