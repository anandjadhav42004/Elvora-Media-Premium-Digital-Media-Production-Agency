"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "./Container";
import { fadeUp, popIn, stagger } from "@/lib/motion";
import { WHATSAPP_LINK } from "@/lib/whatsapp";
import { SHOWREEL_VIDEO_URL, getEmbedUrl } from "@/lib/showreel";

function CloseIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
        </svg>
    );
}

type HeroProps = {
    onOpenInquiry?: () => void;
};

export function Hero({ onOpenInquiry }: HeroProps) {
    const [isShowreelOpen, setIsShowreelOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const embedUrl = getEmbedUrl(SHOWREEL_VIDEO_URL);

    useEffect(() => {
        if (!isShowreelOpen) return;

        const previousActiveElement = document.activeElement as HTMLElement | null;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsShowreelOpen(false);
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKeyDown);

        setTimeout(() => {
            modalRef.current?.querySelector<HTMLElement>("button")?.focus();
        }, 50);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKeyDown);
            previousActiveElement?.focus();
        };
    }, [isShowreelOpen]);

    return (
        <section className="relative w-full overflow-hidden bg-white text-black border-b border-black/[0.06]">
            {/* Subtle Editorial Background Grid Lines */}
            <div className="pointer-events-none absolute inset-0 z-0 flex justify-between px-6 sm:px-12 opacity-25">
                <div className="w-[1px] h-full bg-black/[0.03]" />
                <div className="w-[1px] h-full bg-black/[0.03] hidden md:block" />
                <div className="w-[1px] h-full bg-black/[0.03] hidden lg:block" />
                <div className="w-[1px] h-full bg-black/[0.03]" />
            </div>

            {/* Main First-Viewport Hero Container */}
            <div className="relative z-10 flex min-h-[calc(100vh-4rem)] lg:max-h-[900px] flex-col justify-between pt-4 pb-8 sm:pt-6 sm:pb-10">
                <Container className="w-full">
                    {/* Editorial Top Micro-Label Row */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={stagger(0.08)}
                        className="flex flex-wrap items-center justify-between gap-3 pb-4 sm:pb-6 border-b border-black/[0.06]"
                    >
                        <motion.div variants={fadeUp} className="flex items-center gap-2.5">
                            <span className="flex h-1.5 w-1.5 rounded-full bg-black animate-pulse" />
                            <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.26em] uppercase text-neutral-700">
                                Elvora Media &middot; Creative &amp; Production Studio
                            </span>
                        </motion.div>

                        <motion.div variants={fadeUp} className="hidden sm:flex items-center gap-5 font-mono text-[10px] text-neutral-400 uppercase tracking-[0.22em]">
                            <span>[ Directing ]</span>
                            <span>[ Production ]</span>
                            <span>[ Performance ]</span>
                        </motion.div>
                    </motion.div>

                    {/* Hero Grid: Editorial Asymmetric Layout */}
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 pt-6 sm:pt-8 lg:pt-10 items-center">
                        {/* Left Column: Monumental Editorial Headline (7 cols) */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={stagger(0.08, 0.05)}
                            className="flex flex-col justify-center lg:col-span-7"
                        >
                            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-3">
                                <span className="px-2.5 py-0.5 border border-black/10 bg-neutral-50/80 font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.22em] text-neutral-600 uppercase">
                                    Season 2026 Direction
                                </span>
                            </motion.div>

                            <h1 className="font-display uppercase tracking-[-0.025em] text-black">
                                <motion.span
                                    variants={fadeUp}
                                    className="block text-[clamp(2.5rem,6.8vw,5.6rem)] leading-[0.89] text-black font-extrabold"
                                >
                                    Cinematic
                                </motion.span>
                                <motion.span
                                    variants={fadeUp}
                                    className="block text-[clamp(2.5rem,6.8vw,5.6rem)] leading-[0.89] font-serif italic font-normal tracking-normal text-luxury-gold pt-1"
                                >
                                    Impact &amp;
                                </motion.span>
                                <motion.span
                                    variants={fadeUp}
                                    className="block text-[clamp(2.5rem,6.8vw,5.6rem)] leading-[0.89] font-serif italic font-normal tracking-normal text-luxury-gold pb-1"
                                >
                                    Scale
                                </motion.span>
                                <motion.span
                                    variants={fadeUp}
                                    className="block text-[clamp(2.5rem,6.8vw,5.6rem)] leading-[0.89] text-black font-extrabold"
                                >
                                    By Design.
                                </motion.span>
                            </h1>

                            <motion.p
                                variants={fadeUp}
                                className="mt-5 max-w-lg text-sm sm:text-base leading-relaxed text-neutral-600 font-normal"
                            >
                                We partner with visionary founders and luxury brands to produce commercial films, high-converting social campaigns, and timeless visual identities engineered for uncompromising growth.
                            </motion.p>

                            {/* CTA Action Group */}
                            <motion.div
                                variants={fadeUp}
                                className="mt-7 flex flex-wrap items-center gap-3.5"
                            >
                                {/* Primary CTA: Dominant Black */}
                                <button
                                    type="button"
                                    onClick={onOpenInquiry ? onOpenInquiry : () => window.open(WHATSAPP_LINK, "_blank")}
                                    className="group relative inline-flex items-center gap-3.5 bg-black px-7 py-3.5 text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-neutral-800 hover:shadow-lg focus:outline-none focus:ring-1 focus:ring-black cursor-pointer"
                                >
                                    <span>Initiate Project</span>
                                    <span className="flex h-5 w-5 items-center justify-center bg-white/15 text-white text-[11px] transition-transform duration-300 group-hover:translate-x-1">
                                        ↗
                                    </span>
                                </button>

                                {/* Secondary CTA: Understated Minimal */}
                                <button
                                    type="button"
                                    onClick={() => setIsShowreelOpen(true)}
                                    className="group inline-flex items-center gap-2.5 border border-black/20 bg-white/80 px-6 py-3.5 text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:border-black hover:bg-neutral-50 focus:outline-none cursor-pointer"
                                >
                                    <span className="flex h-2 w-2 rounded-full bg-luxury-gold" />
                                    <span>Play Showreel</span>
                                </button>
                            </motion.div>
                        </motion.div>

                        {/* Right Column: Editorial Featured Production Card (5 cols) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="relative lg:col-span-5 flex justify-center lg:justify-end"
                        >
                            <div
                                onClick={() => setIsShowreelOpen(true)}
                                className="group relative aspect-[4/4.9] w-full max-w-sm sm:max-w-md overflow-hidden rounded-2xl border border-black/[0.08] bg-neutral-950 shadow-xl cursor-pointer transition-transform duration-500 hover:scale-[1.015]"
                            >
                                {/* Production Still Preview */}
                                <Image
                                    src="/code-hostel/thumb2.jpg"
                                    alt="Elvora Media Featured Production Film"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 36vw"
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90"
                                    priority
                                />

                                {/* Cinematic Editorial Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/15" />

                                {/* Card Header Metadata */}
                                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                                    <span className="bg-black/60 backdrop-blur-md px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/90 border border-white/10">
                                        Featured Production
                                    </span>
                                    <span className="flex items-center gap-1.5 font-mono text-[9px] text-white/80 uppercase tracking-widest bg-black/60 backdrop-blur-md px-2.5 py-1 border border-white/10">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                        01:10 Film
                                    </span>
                                </div>

                                {/* Refined Minimal Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-black shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-5 w-5 text-black">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Bottom Editorial Credits */}
                                <div className="absolute bottom-5 left-5 right-5 z-10 text-white">
                                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-champagne-light block mb-1">
                                        Code Hostel &middot; Grand Aagman
                                    </span>
                                    <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-white leading-tight">
                                        Ganesh Chaturthi Festive Film
                                    </h3>
                                    <div className="mt-2.5 flex items-center justify-between text-[11px] text-neutral-300 font-mono pt-2.5 border-t border-white/15">
                                        <span className="tracking-wider">Watch Full Production</span>
                                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </Container>

                {/* Swiss-Style Editorial Metrics Strip */}
                <div className="w-full mt-6 sm:mt-8 pt-4 border-t border-black/[0.06]">
                    <Container>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger(0.08)}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
                        >
                            <motion.div variants={fadeUp} className="py-2">
                                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-400 block mb-1">
                                    [ 01 &middot; Reach ]
                                </span>
                                <div className="font-display text-2xl sm:text-3xl font-bold text-black uppercase tracking-tight">
                                    3.4M+
                                </div>
                                <p className="mt-0.5 font-sans text-[11px] text-neutral-500">
                                    Organic Video Impressions
                                </p>
                            </motion.div>

                            <motion.div variants={fadeUp} className="py-2">
                                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-400 block mb-1">
                                    [ 02 &middot; Film Works ]
                                </span>
                                <div className="font-display text-2xl sm:text-3xl font-bold text-black uppercase tracking-tight">
                                    50+
                                </div>
                                <p className="mt-0.5 font-sans text-[11px] text-neutral-500">
                                    Brand &amp; Commercial Cuts
                                </p>
                            </motion.div>

                            <motion.div variants={fadeUp} className="py-2">
                                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-400 block mb-1">
                                    [ 03 &middot; Performance ]
                                </span>
                                <div className="font-display text-2xl sm:text-3xl font-bold text-black uppercase tracking-tight">
                                    4.8X
                                </div>
                                <p className="mt-0.5 font-sans text-[11px] text-neutral-500">
                                    Average Campaign ROAS
                                </p>
                            </motion.div>

                            <motion.div variants={fadeUp} className="py-2">
                                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-400 block mb-1">
                                    [ 04 &middot; Directing ]
                                </span>
                                <div className="font-display text-2xl sm:text-3xl font-bold text-luxury-gold uppercase tracking-tight">
                                    100%
                                </div>
                                <p className="mt-0.5 font-sans text-[11px] text-neutral-500">
                                    Bespoke In-House Craft
                                </p>
                            </motion.div>
                        </motion.div>
                    </Container>
                </div>
            </div>

            {/* Video Lightbox Modal */}
            <AnimatePresence>
                {isShowreelOpen && (
                    <motion.div
                        key="showreel-modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-8 backdrop-blur-md"
                        onClick={() => setIsShowreelOpen(false)}
                    >
                        <motion.div
                            ref={modalRef}
                            initial={{ scale: 0.94, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.94, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 320, damping: 28 }}
                            onClick={(e) => e.stopPropagation()}
                            role="dialog"
                            aria-modal="true"
                            aria-label="Elvora Media Showreel"
                            className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-black border border-white/10 shadow-2xl"
                        >
                            <button
                                type="button"
                                onClick={() => setIsShowreelOpen(false)}
                                aria-label="Close Showreel"
                                className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white/40 focus:outline-none cursor-pointer"
                            >
                                <CloseIcon />
                            </button>

                            <div className="relative aspect-16/9 w-full overflow-hidden bg-black">
                                <iframe
                                    src={embedUrl}
                                    title="Elvora Media Showreel"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="h-full w-full border-0"
                                />
                            </div>

                            <div className="flex items-center justify-between p-5 bg-neutral-950 text-white flex-wrap gap-4 border-t border-white/10">
                                <div>
                                    <h4 className="font-display text-lg font-bold uppercase tracking-tight">Elvora Media Commercial Showreel</h4>
                                    <p className="font-mono text-xs text-luxury-gold mt-0.5">Directed by Suyash Mali & Anand Jadhav</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <a
                                        href={SHOWREEL_VIDEO_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-bold text-white uppercase tracking-wider transition-colors hover:bg-white/15 focus:outline-none"
                                    >
                                        Watch on Instagram ↗
                                    </a>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsShowreelOpen(false);
                                            if (onOpenInquiry) onOpenInquiry();
                                        }}
                                        className="rounded-full bg-white px-5 py-2.5 text-xs font-bold text-black uppercase tracking-wider transition-transform hover:scale-105 cursor-pointer"
                                    >
                                        Book Your Shoot
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
