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
                transition={{ duration: 0.35, ease: EASE }}
                className="fixed inset-x-0 top-0 z-50 border-b border-black/[0.06] bg-white/90 backdrop-blur-md transition-colors"
            >
                <Container className="flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-black">
                        <Image
                            src="/logo.png"
                            alt="Elvora Media"
                            width={32}
                            height={42}
                            priority
                            className="h-8 w-auto transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="flex flex-col">
                            <span className="font-display text-base tracking-[0.12em] uppercase text-deep-black leading-none">
                                Elvora
                            </span>
                            <span className="font-mono text-[9px] tracking-[0.28em] text-neutral-400 uppercase mt-0.5">
                                Studio
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-600">
                        {NAV_LINKS.map(({ label, href, external }) => (
                            <a
                                key={label}
                                href={href}
                                target={external ? "_blank" : undefined}
                                rel={external ? "noopener noreferrer" : undefined}
                                className="transition-colors hover:text-black relative py-1 focus:outline-none focus-visible:underline"
                            >
                                {label}
                            </a>
                        ))}
                    </nav>

                    {/* Desktop CTA & Mobile Toggle */}
                    <div className="flex items-center gap-4">
                        {onOpenInquiry ? (
                            <button
                                type="button"
                                onClick={onOpenInquiry}
                                className="hidden sm:inline-flex items-center gap-2.5 rounded-none border border-black bg-black px-5 py-2.5 text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-neutral-800 focus:outline-none focus:ring-1 focus:ring-black cursor-pointer group"
                            >
                                <span>Start a Project</span>
                                <span className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
                            </button>
                        ) : (
                            <a
                                href={WHATSAPP_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden sm:inline-flex items-center gap-2.5 rounded-none border border-black bg-black px-5 py-2.5 text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-neutral-800 focus:outline-none focus:ring-1 focus:ring-black group"
                            >
                                <span>Start a Project</span>
                                <span className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
                            </a>
                        )}

                        {/* Mobile Hamburger Button */}
                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-expanded={isMobileMenuOpen}
                            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                            className="flex h-10 w-10 items-center justify-center text-deep-black transition-colors hover:bg-black/5 focus:outline-none md:hidden cursor-pointer"
                        >
                            <HamburgerIcon isOpen={isMobileMenuOpen} />
                        </button>
                    </div>
                </Container>

                {/* Mobile Drawer Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            key="mobile-drawer"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="fixed inset-0 top-16 z-40 bg-black/50 backdrop-blur-sm md:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <motion.div
                                ref={drawerRef}
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.25, ease: EASE }}
                                onClick={(e) => e.stopPropagation()}
                                className="flex flex-col border-b border-black/[0.08] bg-white px-6 py-8 shadow-xl"
                            >
                                <nav className="flex flex-col gap-4">
                                    {NAV_LINKS.map(({ label, href, external }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            target={external ? "_blank" : undefined}
                                            rel={external ? "noopener noreferrer" : undefined}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="font-display text-xl uppercase tracking-tight text-[#111111] transition-colors hover:text-[#6F6F6A] py-1.5 border-b border-black/[0.04]"
                                        >
                                            {label}
                                        </a>
                                    ))}
                                    <div className="pt-2">
                                        {onOpenInquiry ? (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsMobileMenuOpen(false);
                                                    onOpenInquiry();
                                                }}
                                                className="flex w-full items-center justify-center gap-2 border border-black bg-black py-3 text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-white"
                                            >
                                                <span>Start a Project</span>
                                                <span>↗</span>
                                            </button>
                                        ) : (
                                            <a
                                                href={WHATSAPP_LINK}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="flex w-full items-center justify-center gap-2 border border-black bg-black py-3 text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-white"
                                            >
                                                <span>Start a Project</span>
                                                <span>↗</span>
                                            </a>
                                        )}
                                    </div>
                                </nav>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>
            <div aria-hidden="true" className="h-16" />
        </>
    );
}

