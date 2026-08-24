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
        id: "chai-bistro-branding",
        title: "Chai Bistro: Where Friends Become Stories",
        client: "Chai Bistro",
        category: "Branding",
        metric: "Authentic",
        metricLabel: "Brand Vibe",
        imageSrc: "/chai-bistro/image1.jpeg", 
        summary: "Crafting a nostalgic and welcoming brand identity for Chai Bistro, focusing on good chai, great people, and unforgettable moments.",
        challenge: "Creating a modern chai brand that still feels like a warm hug in a cup while standing out digitally.",
        solution: "Developed a rustic, warm aesthetic with nostalgic typography, custom coffee cup designs, and engaging social media posters.",
        results: ["Established a highly relatable brand voice", "Created cohesive visual assets for social media", "Strong local community engagement"],
        instagramUrl: "https://www.instagram.com/reel/DbnTJ58C_Ro/?igsi=MTgyZzNuMGt2NjExeA==",
        isReel: true,
    },
    {
        id: "elvora-commercial-reel",
        title: "High-Paced Commercial Reel & Brand Motion Edit",
        client: "Elvora Media Production",
        category: "Video",
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
        <section id="case-studies" className="py-16 sm:py-24 bg-[#faf7f0]">
            <Container>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={stagger(0.12)}
                    className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
                >
                    <div>
                        <motion.span variants={fadeUp} className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-luxury-gold">
                            Case Studies & Impact
                        </motion.span>
                        <motion.h2 variants={fadeUp} className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-deep-black sm:text-5xl">
                            Proven Results. <span className="text-luxury-gold">No Fluff.</span>
                        </motion.h2>
                    </div>

                    {/* Filter Pills */}
                    <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                        {CATEGORIES.map((cat) => {
                            const isActive = selectedCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                                        isActive
                                            ? "bg-deep-black text-ivory-cream shadow-md"
                                            : "border border-black/20 bg-white/80 text-neutral-800 hover:border-luxury-gold/50 hover:bg-white"
                                    }`}
                                >
                                    {cat}
                                </button>
                            );
                        })}
                    </motion.div>
                </motion.div>

                {/* Case Studies Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={stagger(0.12)}
                    className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-2"
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
                            className="group relative flex flex-col overflow-hidden rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-luxury-gold/50 hover:shadow-xl hover:shadow-luxury-gold/10 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                        >
                            <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl bg-neutral-100">
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
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                )}
                                <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-deep-black/90 px-3.5 py-1.5 backdrop-blur-md">
                                    <span className="font-display text-sm font-bold text-luxury-gold">{study.metric}</span>
                                    <span className="font-mono text-[10px] uppercase text-ivory-cream">{study.metricLabel}</span>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-luxury-gold">
                                        {study.client} &middot; {study.category}
                                    </span>
                                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 transition-colors group-hover:text-deep-black">
                                        View Case &rarr;
                                    </span>
                                </div>
                                <h3 className="font-display text-xl font-bold leading-snug text-deep-black sm:text-2xl">
                                    {study.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-neutral-800 font-medium line-clamp-2">
                                    {study.summary}
                                </p>
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
                                className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl"
                            >
                                <button
                                    type="button"
                                    onClick={() => setSelectedId(null)}
                                    aria-label="Close modal"
                                    className="absolute top-6 right-6 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-800 transition-colors hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                                >
                                    <CloseIcon />
                                </button>

                                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-luxury-gold font-bold">
                                    <span>{activeStudy.client}</span>
                                    <span>&middot;</span>
                                    <span>{activeStudy.category}</span>
                                </div>

                                <h3 className="mt-2 font-display text-2xl font-bold text-deep-black sm:text-3xl">
                                    {activeStudy.title}
                                </h3>

                                <div className="mt-4 flex items-center gap-4 rounded-2xl border border-luxury-gold/30 bg-[#faf7f0] p-4">
                                    <span className="font-display text-3xl font-bold text-luxury-gold sm:text-4xl">{activeStudy.metric}</span>
                                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-700">{activeStudy.metricLabel}</span>
                                </div>

                                {/* Inline Reel Embed Player */}
                                {activeStudy.instagramUrl && (
                                    <div className="mt-6 flex flex-col items-center">
                                        <div className="relative w-full max-w-[340px] aspect-[9/16] overflow-hidden rounded-2xl border border-black/10 bg-black shadow-lg">
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
                                                <li key={i} className="flex items-center gap-2 text-sm font-semibold text-deep-black">
                                                    <span className="text-luxury-gold">✓</span> {res}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-6 border-t border-neutral-100 pt-4 flex items-center justify-between">
                                    <span className="font-mono text-xs text-neutral-700 font-semibold">Direct Instagram Media</span>
                                    <a
                                        href={activeStudy.instagramUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 rounded-full border border-black/15 bg-white px-4 py-2 text-xs font-semibold text-neutral-800 transition-colors hover:border-luxury-gold hover:text-luxury-gold focus:outline-none"
                                    >
                                        <span>View on Instagram ↗</span>
                                    </a>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Container>
        </section>
    );
}
