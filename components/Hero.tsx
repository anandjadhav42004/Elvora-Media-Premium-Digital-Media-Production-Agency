"use client";

import { useEffect, useRef, useState } from "react";
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

export function Hero() {
    const [isShowreelOpen, setIsShowreelOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const embedUrl = getEmbedUrl(SHOWREEL_VIDEO_URL);

    // Non-breaking spaces so the separators never collapse; two identical
    // copies + an x shift of -50% give a seamless horizontal loop.
    const marqueeText = "Apni Marketing Agency   ".repeat(4);

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
        <section className="relative w-full overflow-hidden bg-[#faf7f0] text-deep-black">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-6 hidden w-40 select-none items-center justify-center overflow-hidden sm:right-10 sm:flex lg:right-16 lg:w-64"
            >
                <motion.span
                    className="[writing-mode:vertical-rl] whitespace-nowrap font-display text-[10rem] uppercase leading-none tracking-wider text-deep-black/10 lg:text-[14rem]"
                    style={{ rotate: 180 }}
                    animate={{ y: ["-100%", "100%"] }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    Apni Marketing Agency
                </motion.span>
            </div>

            <Container className="relative z-10 flex min-h-[calc(100svh-4rem)] flex-col justify-between py-6 sm:py-8">
                {/* giant headline */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={stagger(0.15, 0.1)}
                    className="py-6 sm:py-4"
                >
                    <h1 className="font-display uppercase tracking-[-0.02em]">
                        <motion.span
                            variants={fadeUp}
                            className="block text-[clamp(3.25rem,19vw,14rem)] leading-[0.9] text-deep-black"
                        >
                            Elvora
                        </motion.span>
                        <motion.span
                            variants={fadeUp}
                            className="mt-1 block text-[clamp(3.25rem,19vw,14rem)] leading-[0.9] text-luxury-gold sm:mt-2"
                        >
                            Media
                            <sup className="ml-1 align-super text-[0.28em] text-luxury-gold"></sup>
                        </motion.span>
                    </h1>

                    <motion.p
                        variants={fadeUp}
                        className="mt-3 pl-1 font-script text-[clamp(1.5rem,6.5vw,4.75rem)] leading-none text-deep-black sm:mt-4 sm:pl-2"
                    >
                        Made{" "}
                        <span className="text-luxury-gold">Unforgettable.</span>
                    </motion.p>
                </motion.div>

                {/* horizontal ELVORA marquee — phones only (sm+ uses the vertical one on the right) */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none relative -mx-4 select-none overflow-hidden sm:hidden"
                >
                    <motion.div
                        className="flex w-max whitespace-nowrap font-display text-[5.5rem] uppercase leading-none tracking-wider text-deep-black/10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, x: ["0%", "-50%"] }}
                        transition={{
                            opacity: { duration: 1, delay: 0.6 },
                            x: {
                                duration: 14,
                                repeat: Infinity,
                                ease: "linear",
                            },
                        }}
                    >
                        <span>{marqueeText}</span>
                        <span>{marqueeText}</span>
                    </motion.div>
                </div>

                {/* bottom detail row */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={stagger(0.12, 0.9)}
                    className="grid gap-6 border-t border-black/10 pt-6 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-12"
                >
                    <motion.div variants={stagger(0.1)} className="max-w-md">
                        <motion.p
                            variants={fadeUp}
                            className="font-serif text-lg font-semibold italic tracking-[0.06em] text-luxury-gold sm:text-xl"
                        >
                            What We Do
                        </motion.p>
                        <motion.p
                            variants={fadeUp}
                            className="mt-3 text-sm leading-relaxed text-muted-grey sm:text-base"
                        >
                            We build brands people remember branding, content,
                            video, and performance marketing, engineered to look
                            exceptional and drive real growth.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        variants={stagger(0.1)}
                        className="flex flex-col items-start gap-4 sm:items-end"
                    >
                        <div className="flex flex-wrap items-center gap-3">
                            <motion.button
                                variants={popIn}
                                type="button"
                                onClick={() => setIsShowreelOpen(true)}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.98 }}
                                className="group relative flex items-center gap-3 rounded-full border border-luxury-gold/40 bg-deep-black/95 px-6 py-3 text-sm font-semibold text-ivory-cream shadow-[0_8px_25px_rgba(0,0,0,0.2)] backdrop-blur-md transition-all duration-300 hover:border-luxury-gold hover:shadow-[0_0_25px_rgba(181,140,86,0.35)] focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                            >
                                <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-luxury-gold text-deep-black transition-transform duration-300 group-hover:scale-110 shadow-[0_0_12px_rgba(181,140,86,0.6)]">
                                    <span className="absolute inset-0 rounded-full bg-luxury-gold/50 animate-ping" />
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="relative h-3.5 w-3.5 ml-0.5" aria-hidden="true">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </span>
                                <span className="font-display font-bold uppercase tracking-wider text-xs sm:text-sm">Watch Showreel</span>
                            </motion.button>

                            <motion.a
                                variants={popIn}
                                href={WHATSAPP_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.03 }}
                                className="group flex items-center gap-3 rounded-full bg-[linear-gradient(90deg,#b58c56,#e0c38a,#b58c56)] py-2.5 pl-6 pr-2.5 text-sm font-semibold text-deep-black transition-[filter] duration-300 hover:brightness-95"
                            >
                                Start a Project
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-deep-black text-ivory-cream transition-transform group-hover:translate-x-0.5">
                                    &rarr;
                                </span>
                            </motion.a>
                        </div>

                        <motion.span
                            variants={fadeUp}
                            className="font-mono text-xs uppercase tracking-[0.18em] text-muted-grey sm:text-sm"
                        >
                            Branding &middot; Content &middot; Strategy
                        </motion.span>
                    </motion.div>
                </motion.div>
            </Container>

            {/* Video Lightbox Modal */}
            <AnimatePresence>
                {isShowreelOpen && (
                    <motion.div
                        key="showreel-modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
                        onClick={() => setIsShowreelOpen(false)}
                    >
                        <motion.div
                            ref={modalRef}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 28 }}
                            onClick={(e) => e.stopPropagation()}
                            role="dialog"
                            aria-modal="true"
                            aria-label="Elvora Media Showreel"
                            className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-black shadow-2xl"
                        >
                            <button
                                type="button"
                                onClick={() => setIsShowreelOpen(false)}
                                aria-label="Close Showreel"
                                className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white/40 focus:outline-none"
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

                            <div className="flex items-center justify-between p-4 bg-deep-black text-ivory-cream flex-wrap gap-2">
                                <div>
                                    <h4 className="font-display text-base font-bold">Elvora Media Commercial Showreel</h4>
                                    <p className="font-mono text-xs text-luxury-gold">Directed by Suyash Mali & Team</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <a
                                        href={SHOWREEL_VIDEO_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-full border border-luxury-gold/50 bg-black/40 px-4 py-2 text-xs font-bold text-luxury-gold uppercase tracking-wider transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                                    >
                                        Watch Reel ↗
                                    </a>
                                    <a
                                        href={WHATSAPP_LINK}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-full bg-luxury-gold px-4 py-2 text-xs font-bold text-deep-black uppercase tracking-wider transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                                    >
                                        Book Your Shoot
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

