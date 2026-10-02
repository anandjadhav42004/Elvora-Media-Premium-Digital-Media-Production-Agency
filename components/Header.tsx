"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Container } from "./Container";
import { EASE } from "@/lib/motion";
import { WHATSAPP_LINK } from "@/lib/whatsapp";

const NAV_LINKS = [
    { label: "Services", href: "#services" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Estimator", href: "#estimator" },
    { label: "Team", href: "#team" },
    { label: "Contact", href: WHATSAPP_LINK, external: true },
];

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-6 w-6">
            {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
            ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
            )}
        </svg>
    );
}

type HeaderProps = {
    onOpenInquiry?: () => void;
};

export function Header({ onOpenInquiry }: HeaderProps) {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const drawerRef = useRef<HTMLDivElement>(null);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;

        if (latest < 80) {
            setHidden(false);
            return;
        }

        setHidden(latest > previous && !isMobileMenuOpen);
    });

    useEffect(() => {
        if (!isMobileMenuOpen) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsMobileMenuOpen(false);
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            <motion.header
                animate={{ y: hidden ? "-100%" : "0%" }}
                transition={{ duration: 0.4, ease: EASE }}
                className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-[#faf7f0] shadow-[0_1px_0_rgba(0,0,0,0.04)]"
            >
                <Container className="flex h-20 items-center justify-between sm:h-16">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/logo.png"
                            alt="Elvora Media"
                            width={28}
                            height={37}
                            loading="eager"
                            className="h-11 w-auto sm:h-9"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden sm:flex items-center gap-6 text-sm">
                        {NAV_LINKS.map(({ label, href, external }) => (
                            <a
                                key={label}
                                href={href}
                                target={external ? "_blank" : undefined}
                                rel={external ? "noopener noreferrer" : undefined}
                                className="text-deep-black/70 transition-colors hover:text-deep-black font-medium"
                            >
                                {label}
                            </a>
                        ))}
                        {onOpenInquiry && (
                            <button
                                type="button"
                                onClick={onOpenInquiry}
                                className="rounded-full bg-deep-black px-4 py-2 text-xs font-bold uppercase tracking-wider text-ivory-cream transition-all duration-300 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-luxury-gold cursor-pointer"
                            >
                                Start a Project
                            </button>
                        )}
                    </nav>

                    {/* Mobile Hamburger Button */}
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-expanded={isMobileMenuOpen}
                        aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                        className="flex h-10 w-10 items-center justify-center rounded-full text-deep-black transition-colors hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-luxury-gold sm:hidden"
                    >
                        <HamburgerIcon isOpen={isMobileMenuOpen} />
                    </button>
                </Container>

                {/* Mobile Drawer Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            key="mobile-drawer"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 top-20 z-40 bg-black/60 backdrop-blur-xs sm:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <motion.div
                                ref={drawerRef}
                                initial={{ y: "-100%" }}
                                animate={{ y: "0%" }}
                                exit={{ y: "-100%" }}
                                transition={{ duration: 0.35, ease: EASE }}
                                onClick={(e) => e.stopPropagation()}
                                className="flex flex-col border-b border-black/10 bg-[#faf7f0] px-6 py-6 shadow-2xl"
                            >
                                <nav className="flex flex-col gap-4">
                                    {NAV_LINKS.map(({ label, href, external }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            target={external ? "_blank" : undefined}
                                            rel={external ? "noopener noreferrer" : undefined}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="font-display text-lg font-bold text-deep-black transition-colors hover:text-luxury-gold py-1"
                                        >
                                            {label}
                                        </a>
                                    ))}
                                </nav>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>
            <div aria-hidden="true" className="h-20 sm:h-16" />
        </>
    );
}

