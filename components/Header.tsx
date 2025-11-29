"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/container";
import {navigation} from "@/const/nav";
import type {LucideIcon} from "lucide-react";
import {BookOpen, Briefcase, Building2, ChevronDown, LogOut, Mail, Menu, Users} from "lucide-react";
import {Sheet, SheetContent, SheetTrigger,} from "@/components/ui/sheet";
import {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import ContactUsModal from "@/components/modals/ContactUsModal";
import LoginModal from "@/components/modals/LoginModal";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const [sideOpen, setSideOpen] = useState(false);
    const [contactModalOpen, setContactModalOpen] = useState(false);
    const [publicationsOpen, setPublicationsOpen] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        setIsAuthenticated(false);
        router.push('/');
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

    useEffect(() => {
        // Check authentication status
        const checkAuth = () => {
            const auth = localStorage.getItem('isAuthenticated');
            setIsAuthenticated(auth === 'true');
        };

        checkAuth();

        // Listen for storage changes (in case of logout in another tab)
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);

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
            {navigation.map((item) => {
              // Handle items with dropdown children
              if ('children' in item && item.children) {
                return (
                  <DropdownMenu.Root key={item.name}>
                    <DropdownMenu.Trigger className="text-sm transition-colors font-normal hover:text-gray-600 hover:underline underline-offset-4 inline-flex items-center gap-1 outline-none">
                      {item.name}
                      <ChevronDown size={14} strokeWidth={1.5} />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                      <DropdownMenu.Content
                        className="min-w-[320px] bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50"
                        sideOffset={8}
                      >
                        {item.children.map((child) => (
                          <DropdownMenu.Item
                            key={child.name}
                            asChild
                            className="outline-none"
                          >
                            <Link
                              href={child.href}
                              className="block px-4 py-3 text-sm hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                              {child.name}
                            </Link>
                          </DropdownMenu.Item>
                        ))}
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                );
              }

              // Handle regular nav items
              return (
                <Link
                  key={item.name}
                  href={item.href || '#'}
                  onClick={(e) => {
                    if (item.href && item.href.startsWith('#')) {
                      handleSmoothScroll(e, item.href);
                    }
                  }}
                  className="text-sm transition-colors font-normal hover:text-gray-600 hover:underline underline-offset-4"
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Login/Logout Button - Desktop */}
          <div className="hidden md:block">
            {isAuthenticated ? (
              <Button
                size="sm"
                variant="outline"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                Logout
              </Button>
            ) : (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setLoginModalOpen(true)}
              >
                Login
              </Button>
            )}
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

                                // Handle items with children (Publications dropdown)
                                if ('children' in link && link.children) {
                                    return (
                                        <li key={index}>
                                            <button
                                                onClick={() => setPublicationsOpen(!publicationsOpen)}
                                                className="flex items-center justify-between w-full gap-3 px-3 py-2 hover:bg-gray-50 rounded-md"
                                            >
                                                <div className="flex items-center gap-3">
                                                    {Icon && <Icon size={20} strokeWidth={1.5} />}
                                                    <span>{link.name}</span>
                                                </div>
                                                <ChevronDown
                                                    size={16}
                                                    strokeWidth={1.5}
                                                    className={`transition-transform ${publicationsOpen ? 'rotate-180' : ''}`}
                                                />
                                            </button>

                                            {publicationsOpen && (
                                                <ul className="mt-1 ml-9 space-y-1">
                                                    {link.children.map((child, childIndex) => (
                                                        <li key={childIndex}>
                                                            <Link
                                                                href={child.href}
                                                                onClick={() => {
                                                                    setSideOpen(false);
                                                                    setPublicationsOpen(false);
                                                                }}
                                                                className="block px-3 py-2 text-sm hover:bg-gray-50 rounded-md"
                                                            >
                                                                {child.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    );
                                }

                                // Handle regular nav items
                                return (
                                    <li key={index}>
                                        <Link
                                            href={link.href || '#'}
                                            onClick={(e) => {
                                              if (link.href && link.href.startsWith('#')) {
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

                        <div className="px-4 py-2 mt-auto border-t border-gray-200">
                            {isAuthenticated ? (
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => {
                                        setSideOpen(false);
                                        handleLogout();
                                    }}
                                >
                                    <LogOut size={16} />
                                    Logout
                                </Button>
                            ) : (
                                <Button
                                    className="w-full"
                                    onClick={() => {
                                        setSideOpen(false);
                                        setLoginModalOpen(true);
                                    }}
                                >
                                    Login
                                </Button>
                            )}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
      </Container>
      <ContactUsModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </header>
  );
}
