"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "./Container";
import { fadeUp, stagger } from "@/lib/motion";
import { getEmbedUrl } from "@/lib/showreel";


type Category = "All" | "Branding" | "Video" | "Social" | "Performance Ads";

type CaseStudy = {
    id: string;
    title: string;
    client: string;
    category: Category;
    director: string;
    metric: string;
    metricLabel: string;
    imageSrc: string;
    videoPreview?: string;
    summary: string;
    challenge: string;
    solution: string;
    results: string[];
    instagramUrl: string;
    isReel?: boolean;
};

const CASE_STUDIES: CaseStudy[] = [
    {
        id: "elvora-commercial-reel",
        title: "High-Paced Commercial Reel & Brand Motion Edit",
        client: "Elvora Media Production",
        category: "Video",
        director: "Suyash Mali",
        metric: "3.4M+",
        metricLabel: "Reel Impressions & Views",
        imageSrc: "/services2.png",
        summary: "High-energy commercial cut featuring rhythmic editing, custom sound design, and color grading.",
        challenge: "Creating a captivating video reel that retains viewer attention within the first 2 seconds.",
        solution: "Engineered ultra-tight transitions, sound design sync, and fast-paced visual storytelling.",
        results: ["Over 3.4 Million organic video impressions", "High viral save-to-share ratio", "35% surge in client DM inquiries"],
        instagramUrl: "https://www.instagram.com/reel/DahfOSDoMzq/",
        isReel: true,
    },
    {
        id: "cinematic-aesthetic-reel",
        title: "Cinematic Aesthetic & Visual Storytelling Reel",
        client: "Elvora Media Creative",
        category: "Video",
        director: "Suyash Mali",
        metric: "1.8M+",
        metricLabel: "Organic Social Reach",
        imageSrc: "/services1.png",
        summary: "Cinematic brand film blending raw artistic vision with premium commercial pacing.",
        challenge: "Elevating brand perception through high-end cinematic visuals and color science.",
        solution: "Shot and edited with luxury lighting, smooth camera movement, and evocative color tones.",
        results: ["1.8M+ organic reach across Instagram", "Expanded luxury brand authority", "98% positive sentiment"],
        instagramUrl: "https://www.instagram.com/reel/DbSz8RVxikh/",
        isReel: true,
    },
    {
        id: "sculptura-brand-identity",
        title: "Luxury Visual Identity & Brand Direction",
        client: "Sculptura & Branding",
        category: "Branding",
        director: "Daksh Chandgaonkar",
        metric: "+280%",
        metricLabel: "Brand Value & Inquiries",
        imageSrc: "/services3.png",
        summary: "Bespoke luxury brand identity, social grid direction, and high-ticket aesthetic presence.",
        challenge: "Repositioning a premium service to command high-ticket client pricing.",
        solution: "Crafted champagne gold typography, high-contrast imagery, and luxury brand guidelines.",
        results: ["280% increase in high-ticket client inquiries", "Full brand elevation across digital touchpoints", "Market leadership recognition"],
        instagramUrl: "https://www.instagram.com/p/DaxFdWUCFTB/",
        isReel: false,
    },
    {
        id: "social-grid-campaign",
        title: "Performance Marketing & Social Grid Showcase",
        client: "WeCrafted Growth Series",
        category: "Social",
        director: "Yash Borate",
        metric: "8.4%",
        metricLabel: "Average Engagement Rate",
        imageSrc: "/services4.png",
        summary: "Cohesive social media strategy and active community engagement loops.",
        challenge: "Transforming passive followers into active brand advocates.",
        solution: "Implemented branded post templates, interactive carousels, and high-converting copy.",
        results: ["8.4% average engagement rate (3x industry benchmark)", "140k+ new engaged followers", "Consistent inbound leads"],
        instagramUrl: "https://www.instagram.com/p/Da20rt6iFOs/",
        isReel: false,
    },
    {
        id: "verve-launch-campaign",
        title: "Full-Scale Production & Media Launch Campaign",
        client: "Verve Global Launch",
        category: "Performance Ads",
        director: "Suyash Mali & Anand Jadhav",
        metric: "4.8x",
        metricLabel: "Campaign ROAS",
        imageSrc: "/services1.png",
        summary: "Full-funnel campaign shoot and performance ad creatives engineered for direct sales ROI.",
        challenge: "Scaling ad campaigns while maintaining profitable acquisition costs.",
        solution: "A/B tested high-converting video creative hooks with custom audience funnels.",
        results: ["4.8x Return on Ad Spend (ROAS)", "64% reduction in CAC", "2.1x revenue scale"],
        instagramUrl: "https://www.instagram.com/p/DbC-M5ZCLDu/",
        isReel: false,
    },
    {
        id: "code-hostel-ganesh-vol-1",
        title: "Ganesh Chaturthi — Code Hostel Festive Film Vol. 1",
        client: "Code Hostel",
        category: "Video",
        director: "Suyash Mali",
        metric: "Campus Viral",
        metricLabel: "Festive Celebration",
        imageSrc: "/code-hostel/thumb1.jpg",
        videoPreview: "/code-hostel/video1.mp4",
        summary: "A high-energy Ganesh Chaturthi celebration film capturing the authentic youth vibe, dance celebrations, and festive devotion at Code Hostel.",
        challenge: "Documenting the spontaneous energy of students celebrating Ganesh Chaturthi in low festive night lighting while maintaining crisp cinematic quality.",
        solution: "Shot with high dynamic range settings, dynamic handheld gimbal movements, and beat-matched festive soundtrack.",
        results: ["Massive viral engagement across student community", "High organic shares & reel saves", "Authentic youth celebration showcase"],
        instagramUrl: "",
        isReel: false,
    },
    {
        id: "code-hostel-ganesh-vol-2",
        title: "Ganesh Chaturthi — Aagman Cinematic Edit Vol. 2",
        client: "Code Hostel",
        category: "Video",
        director: "Suyash Mali",
        metric: "Grand Edit",
        metricLabel: "Festive Cinematic Film",
        imageSrc: "/code-hostel/thumb2.jpg",
        videoPreview: "/code-hostel/video2.mp4",
        summary: "The grand Aagman cinematic edit for Code Hostel featuring the magnificent Bappa idol, vibrant festive smoke explosions, and celebratory crowds.",
        challenge: "Capturing the grand scale of the procession with smoke bombs, natural daylight contrast, and rapid festive movement.",
        solution: "Cinematic slow-motion captures, custom warm saffron color grading, and thunderous dhol-tasha audio mix.",
        results: ["Vibrant festive visual showcase", "High emotional resonance & community pride", "Demonstrated high-scale event production capability"],
        instagramUrl: "",
        isReel: false,
    },
];


const CATEGORIES: Category[] = ["All", "Branding", "Video", "Social", "Performance Ads"];

const SPRING_TRANSITION = { type: "spring", stiffness: 300, damping: 30 } as const;

function CloseIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
        </svg>
    );
}

export function CaseStudies() {
    const [selectedCategory, setSelectedCategory] = useState<Category>("All");
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    const filteredStudies =
        selectedCategory === "All"
            ? CASE_STUDIES
            : CASE_STUDIES.filter((study) => study.category === selectedCategory);

    const activeStudy = CASE_STUDIES.find((study) => study.id === selectedId) ?? null;

    useEffect(() => {
        if (!selectedId) return;

        const previousActiveElement = document.activeElement as HTMLElement | null;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setSelectedId(null);
            if (event.key === "Tab" && modalRef.current) {
                const focusables = modalRef.current.querySelectorAll<HTMLElement>(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                if (focusables.length === 0) return;
                const first = focusables[0];
                const last = focusables[focusables.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
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
    }, [selectedId]);

    return (
        <section id="case-studies" className="py-[72px] sm:py-[clamp(96px,10vw,160px)] bg-white border-b border-black/[0.08]">
            <Container>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={stagger(0.12)}
                    className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end pb-12 border-b border-black/[0.08]"
                >
                    <div>
                        <motion.p variants={fadeUp} className="font-mono text-[10px] font-semibold tracking-[0.25em] uppercase text-[#6F6F6A] mb-3">
                            03 / Selected Work
                        </motion.p>
                        <motion.h2 variants={fadeUp} className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-[-0.02em] text-[#111111]">
                            Selected Works.{" "}
                            <span className="font-serif italic font-normal text-[#B8955A] tracking-normal">Measurable Scale.</span>
                        </motion.h2>
                    </div>

                    {/* Filter pills — horizontal scroll on mobile, no page overflow */}
                    <motion.div variants={fadeUp} className="-mx-5 sm:mx-0 overflow-x-auto scrollbar-none">
                        <div className="flex gap-2 px-5 sm:px-0 pb-1 w-max sm:w-auto sm:flex-wrap">
                            {CATEGORIES.map((cat) => {
                                const isActive = selectedCategory === cat;
                                return (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`flex-shrink-0 min-h-[44px] px-5 py-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-200 cursor-pointer ${
                                            isActive
                                                ? "bg-[#111111] text-white"
                                                : "border border-black/10 text-[#6F6F6A] hover:border-black/40 hover:text-[#111111]"
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Case Studies Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={stagger(0.12)}
                    className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-2"
                >
                    {filteredStudies.map((study) => (
                        <motion.div
                            key={study.id}
                            variants={fadeUp}
                            layoutId={`card-${study.id}`}
                            onClick={() => setSelectedId(study.id)}
                            onMouseEnter={() => setHoveredId(study.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            tabIndex={0}
                            role="button"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setSelectedId(study.id);
                                }
                            }}
                            className="group relative flex flex-col overflow-hidden border border-black/[0.08] bg-white p-5 sm:p-6 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
                        >
                            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-neutral-100">
                                {study.videoPreview && hoveredId === study.id ? (
                                    <video
                                        src={study.videoPreview}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <Image
                                        src={study.imageSrc}
                                        alt={study.title}
                                        fill
                                        sizes="(max-width: 640px) 100vw, 50vw"
                                        className="object-cover transition-transform duration-700 ease-out"
                                    />
                                )}
                                {/* Play icon overlay for video entries */}
                                {study.videoPreview && (
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#111111]">
                                            <svg className="h-5 w-5 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                )}
                                {/* Metric badge */}
                                <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-8 bg-gradient-to-t from-black/75 to-transparent">
                                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">{study.metricLabel}</span>
                                    <p className="font-display text-base font-bold text-white">{study.metric}</p>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-col gap-1.5">
                                <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[#6F6F6A]">
                                    <span>{study.category}</span>
                                    <span>&middot;</span>
                                    <span>Dir. {study.director}</span>
                                </div>
                                <h3 className="font-display text-xl font-bold uppercase tracking-[-0.02em] leading-tight text-[#111111] sm:text-2xl">
                                    {study.title}
                                </h3>
                                <p className="text-[13px] leading-relaxed text-[#6F6F6A] line-clamp-2">
                                    {study.summary}
                                </p>
                                <span className="mt-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#111111]">
                                    View Project →
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Case Study Detail Modal */}
                <AnimatePresence>
                    {activeStudy && (
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
                            onClick={() => setSelectedId(null)}
                        >
                            <motion.div
                                ref={modalRef}
                                layoutId={`card-${activeStudy.id}`}
                                transition={SPRING_TRANSITION}
                                onClick={(e) => e.stopPropagation()}
                                role="dialog"
                                aria-modal="true"
                                aria-label={activeStudy.title}
                                className="relative flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-y-auto rounded-xl bg-white p-5 sm:p-8 mx-2"
                            >
                                <button
                                    type="button"
                                    onClick={() => setSelectedId(null)}
                                    aria-label="Close modal"
                                    className="absolute top-4 right-4 sm:top-6 sm:right-6 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-[#111111] transition-colors hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-black"
                                >
                                    <CloseIcon />
                                </button>

                                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#B8955A] font-bold">
                                    <span>{activeStudy.client}</span>
                                    <span>&middot;</span>
                                    <span>{activeStudy.category}</span>
                                </div>

                                <h3 className="mt-2 font-display text-xl font-bold uppercase tracking-[-0.02em] text-[#111111] sm:text-2xl">
                                    {activeStudy.title}
                                </h3>

                                <div className="mt-4 flex items-center gap-4 border border-black/[0.08] bg-[#F7F6F2] p-4">
                                    <span className="font-display text-3xl font-bold text-[#111111] sm:text-4xl">{activeStudy.metric}</span>
                                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#6F6F6A]">{activeStudy.metricLabel}</span>
                                </div>

                                {/* Local Video Player */}
                                {activeStudy.videoPreview && (
                                    <div className="mt-6 overflow-hidden rounded-lg border border-black/10 bg-black">
                                        <video
                                            src={activeStudy.videoPreview}
                                            controls
                                            playsInline
                                            className="w-full max-h-[50dvh] object-contain"
                                            poster={activeStudy.imageSrc}
                                        />
                                    </div>
                                )}

                                {/* Instagram Embed for non-local entries */}
                                {!activeStudy.videoPreview && activeStudy.instagramUrl && (
                                    <div className="mt-6 flex flex-col items-center">
                                        <div className="relative w-full max-w-[320px] aspect-[9/16] overflow-hidden rounded-lg border border-black/10 bg-black">
                                            <iframe
                                                src={getEmbedUrl(activeStudy.instagramUrl)}
                                                className="h-full w-full border-0"
                                                allowFullScreen
                                                title={activeStudy.title}
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="mt-6 space-y-4">
                                    <div>
                                        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-700">The Challenge</h4>
                                        <p className="mt-1 text-sm leading-relaxed text-neutral-800 font-medium">{activeStudy.challenge}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-700">The Solution</h4>
                                        <p className="mt-1 text-sm leading-relaxed text-neutral-800 font-medium">{activeStudy.solution}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-700">Key Results Achieved</h4>
                                        <ul className="mt-2 space-y-1.5">
                                            {activeStudy.results.map((res, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-[#111111]">
                                                    <span className="text-[#B8955A] font-bold">✓</span> {res}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {!activeStudy.videoPreview && activeStudy.instagramUrl && (
                                    <div className="mt-6 border-t border-neutral-100 pt-4 flex items-center justify-between">
                                        <span className="font-mono text-xs text-neutral-700 font-semibold">Direct Instagram Media</span>
                                        <a
                                            href={activeStudy.instagramUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 border border-black/15 bg-white px-4 py-2 text-xs font-semibold text-[#111111] transition-colors hover:border-black focus:outline-none min-h-[44px]"
                                        >
                                            <span>View on Instagram ↗</span>
                                        </a>
                                    </div>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Container>
        </section>
    );
}
