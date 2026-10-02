"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "./Container";
import { fadeUp, stagger } from "@/lib/motion";
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
        <section className="relative w-full overflow-hidden bg-white text-[#111111] border-b border-black/[0.08]">

            {/* Extremely subtle vertical grid lines — editorial rhythm only */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 flex justify-between px-5 sm:px-[clamp(24px,4vw,64px)]" style={{ opacity: 0.05 }}>
                <div className="w-px h-full bg-black" />
                <div className="w-px h-full bg-black hidden md:block" />
                <div className="w-px h-full bg-black hidden lg:block" />
                <div className="w-px h-full bg-black" />
            </div>

            {/* Hero body */}
            <div className="relative z-10 flex min-h-[calc(100vh-4rem)] flex-col justify-between pt-8 pb-10 sm:pt-12 sm:pb-14">
                <Container className="w-full">
                    {/* Eyebrow row */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={stagger(0.07)}
                        className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-black/[0.07]"
                    >
                        <motion.div variants={fadeUp} className="flex items-center gap-2">
                            <span className="flex h-1.5 w-1.5 rounded-full bg-black animate-pulse" />
                            <span className="font-mono text-[10px] font-semibold tracking-[0.25em] uppercase text-[#6F6F6A]">
                                Elvora Media &middot; Creative &amp; Production Studio
                            </span>
                        </motion.div>

                        <motion.div variants={fadeUp} className="hidden sm:flex items-center gap-6 font-mono text-[10px] text-[#6F6F6A] uppercase tracking-[0.2em]">
                            <span>Film</span>
                            <span>Production</span>
                            <span>Performance</span>
                        </motion.div>
                    </motion.div>

                    {/* Two-column editorial layout */}
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 pt-10 sm:pt-14 items-center">

                        {/* LEFT — Headline + CTAs */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={stagger(0.08, 0.05)}
                            className="flex flex-col justify-center lg:col-span-7"
                        >
                            <motion.p variants={fadeUp} className="mb-4 font-mono text-[10px] font-semibold tracking-[0.22em] uppercase text-[#6F6F6A]">
                                Season 2026
                            </motion.p>

                            <h1 className="font-display uppercase tracking-[-0.02em] text-[#111111]">
                                <motion.span
                                    variants={fadeUp}
                                    className="block text-[clamp(2.8rem,7vw,5.8rem)] leading-[0.9] font-extrabold"
                                >
                                    Cinematic
                                </motion.span>
                                <motion.span
                                    variants={fadeUp}
                                    className="block text-[clamp(2.8rem,7vw,5.8rem)] leading-[0.9] font-serif italic font-normal tracking-normal text-[#B8955A]"
                                >
                                    Impact &amp;
                                </motion.span>
                                <motion.span
                                    variants={fadeUp}
                                    className="block text-[clamp(2.8rem,7vw,5.8rem)] leading-[0.9] font-serif italic font-normal tracking-normal text-[#B8955A] pb-1"
                                >
                                    Scale
                                </motion.span>
                                <motion.span
                                    variants={fadeUp}
                                    className="block text-[clamp(2.8rem,7vw,5.8rem)] leading-[0.9] font-extrabold"
                                >
                                    By Design.
                                </motion.span>
                            </h1>

                            <motion.p
                                variants={fadeUp}
                                className="mt-6 max-w-lg text-[15px] leading-relaxed text-[#6F6F6A]"
                            >
                                We partner with visionary founders and luxury brands to produce commercial films, high-converting social campaigns, and timeless visual identities engineered for uncompromising growth.
                            </motion.p>

                            {/* CTA pair */}
                            <motion.div
                                variants={fadeUp}
                                className="mt-8 flex flex-wrap items-center gap-3"
                            >
                                <button
                                    type="button"
                                    onClick={onOpenInquiry ? onOpenInquiry : () => window.open(WHATSAPP_LINK, "_blank")}
                                    className="inline-flex items-center gap-3 bg-[#111111] px-7 py-3.5 text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-white transition-transform duration-200 hover:-translate-y-px hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
                                >
                                    <span>Initiate Project</span>
                                    <span>↗</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setIsShowreelOpen(true)}
                                    className="inline-flex items-center gap-2.5 border border-black/20 px-6 py-3.5 text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#111111] transition-transform duration-200 hover:-translate-y-px hover:border-black focus-visible:outline-none cursor-pointer"
                                >
                                    <span className="flex h-2 w-2 rounded-full bg-[#B8955A]" />
                                    <span>Play Showreel</span>
                                </button>
                            </motion.div>
                        </motion.div>

                        {/* RIGHT — Featured production image */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="relative lg:col-span-5 flex justify-center lg:justify-end"
                        >
                            <div
                                onClick={() => setIsShowreelOpen(true)}
                                className="group relative aspect-[4/5] w-full max-w-sm sm:max-w-md overflow-hidden rounded-2xl bg-neutral-900 cursor-pointer"
                            >
                                <Image
                                    src="/code-hostel/thumb2.jpg"
                                    alt="Elvora Media — Featured Production"
                                    fill
                                    sizes="(max-width: 1024px) 90vw, 36vw"
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] opacity-90"
                                    priority
                                />

                                {/* Image overlay — dark-to-transparent for readability only */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                {/* Play button */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-black transition-transform duration-300 group-hover:scale-110">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-5 w-5">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Bottom credits */}
                                <div className="absolute bottom-5 left-5 right-5 text-white">
                                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 mb-1">
                                        Code Hostel &middot; Grand Aagman
                                    </p>
                                    <h3 className="font-display text-lg font-bold uppercase tracking-tight leading-tight">
                                        Ganesh Chaturthi Festive Film
                                    </h3>
                                    <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-white/50 pt-2 border-t border-white/10">
                                        <span>Watch Full Production</span>
                                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </Container>

                {/* Metrics strip */}
                <div className="w-full mt-10 sm:mt-14 border-t border-black/[0.07]">
                    <Container>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger(0.08)}
                            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6"
                        >
                            {[
                                { label: "Organic Impressions", value: "3.4M+", note: "Reach" },
                                { label: "Brand & Commercial Cuts", value: "50+", note: "Film Works" },
                                { label: "Average Campaign ROAS", value: "4.8×", note: "Performance" },
                                { label: "Bespoke In-House Craft", value: "100%", note: "Standard", gold: true },
                            ].map((stat) => (
                                <motion.div key={stat.note} variants={fadeUp} className="py-1">
                                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#6F6F6A] block mb-1">
                                        {stat.note}
                                    </span>
                                    <div className={`font-display text-3xl font-bold uppercase tracking-tight ${stat.gold ? "text-[#B8955A]" : "text-[#111111]"}`}>
                                        {stat.value}
                                    </div>
                                    <p className="mt-0.5 text-[11px] text-[#6F6F6A]">
                                        {stat.label}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </Container>
                </div>
            </div>

            {/* Showreel Modal */}
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
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            role="dialog"
                            aria-modal="true"
                            aria-label="Elvora Media Showreel"
                            className="relative w-full max-w-4xl overflow-hidden rounded-xl bg-black border border-white/10"
                        >
                            <button
                                type="button"
                                onClick={() => setIsShowreelOpen(false)}
                                aria-label="Close Showreel"
                                className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30 focus-visible:outline-none cursor-pointer"
                            >
                                <CloseIcon />
                            </button>

                            <div className="relative aspect-video w-full bg-black">
                                <iframe
                                    src={embedUrl}
                                    title="Elvora Media Showreel"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="h-full w-full border-0"
                                />
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-neutral-950 border-t border-white/10">
                                <div>
                                    <h4 className="font-display text-base font-bold uppercase tracking-tight text-white">Elvora Media Commercial Showreel</h4>
                                    <p className="font-mono text-[10px] text-[#B8955A] mt-0.5">Directed by Suyash Mali &amp; Anand Jadhav</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <a
                                        href={SHOWREEL_VIDEO_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="border border-white/20 px-5 py-2.5 text-[10px] font-bold text-white uppercase tracking-wider transition-colors hover:border-white/50 focus-visible:outline-none"
                                    >
                                        Watch on Instagram ↗
                                    </a>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsShowreelOpen(false);
                                            if (onOpenInquiry) onOpenInquiry();
                                        }}
                                        className="bg-white px-5 py-2.5 text-[10px] font-bold text-black uppercase tracking-wider transition-transform hover:-translate-y-px cursor-pointer"
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
