"use client";

import Link from "next/link";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import Container from "@/components/ui/container";
import {navigation} from "@/const/nav";
import {Menu, Home, Info, GraduationCap, FileText, Mail, LogIn, UserPlus} from "lucide-react";
import {Sheet, SheetContent, SheetTrigger,} from "@/components/ui/sheet";
import {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import type {LucideIcon} from "lucide-react";

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const [sideOpen, setSideOpen] = useState(false);

    const iconMap: Record<string, LucideIcon> = {
        Home,
        Info,
        GraduationCap,
        FileText,
        Mail,
    };

    const handleSmoothScroll = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string
    ) => {
        e.preventDefault();

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
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-900">
              <Image src="/logo.png" alt="Logo" width={118} height={24} />
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  if (item.href.startsWith('#')) {
                    handleSmoothScroll(e, item.href);
                  }
                }}
                className="text-sm transition-colors font-normal"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex md:items-center md:gap-4">
            <Link href="/" >
                <Button variant="outline" size="sm">
                    Log in
                </Button>
            </Link>
              <Link href="/" >
                  <Button variant="secondary" size="sm">
                      Register
                  </Button>
              </Link>
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
                            <Menu size={20} />
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
                                            onClick={(e) => handleSmoothScroll(e, link.href)}
                                            className="flex items-center gap-3 hover:text-appPrimary transition py-3"
                                        >
                                            {Icon && <Icon size={20} />}
                                            <span>{link.name}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="px-4 py-4 mt-auto border-t border-gray-200">
                            <div className="flex flex-col gap-3">
                                <Link href="/" onClick={() => setSideOpen(false)}>
                                    <Button variant="outline" size="lg" className="w-full flex items-center gap-2">
                                        <LogIn size={16} />
                                        Log in
                                    </Button>
                                </Link>
                                <Link href="/" onClick={() => setSideOpen(false)}>
                                    <Button variant="secondary" size="lg" className="w-full flex items-center gap-2">
                                        <UserPlus size={16} />
                                        Register
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
      </Container>
    </header>
  );
}
