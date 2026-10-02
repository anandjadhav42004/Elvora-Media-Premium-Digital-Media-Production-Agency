"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "./Container";
import { fadeUp, stagger } from "@/lib/motion";
import { getEmbedUrl } from "@/lib/showreel";

type OngoingProject = {
    id: string;
    title: string;
    client: string;
    category: string;
    metric: string;
    metricLabel: string;
    imageSrc?: string;
    videoPreview?: string;
    localVideoFull?: string;
    summary: string;
    challenge: string;
    solution: string;
    results: string[];
    instagramUrl?: string;
};

const ONGOING_PROJECTS: OngoingProject[] = [
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
    },
    {
        id: "code-hostel-tiffin",
        title: "Code Hostel: Food & Tiffin Delivery Experience",
        client: "Code Hostel",
        category: "Video Production",
        metric: "Fresh",
        metricLabel: "Daily Meals",
        videoPreview: "/chai-bistro/video1.mp4",
        localVideoFull: "/chai-bistro/video1.mp4",
        summary: "Showcasing the hygienic, high-quality food preparation and seamless tiffin delivery system at Code Hostel.",
        challenge: "Capturing the authentic daily operations of a large-scale kitchen while maintaining a premium aesthetic.",
        solution: "Filmed dynamic behind-the-scenes footage focusing on cleanliness, fresh ingredients, and reliable service.",
        results: ["Increased trust among residents", "Showcased operational excellence", "Engaging visual storytelling for social media"],
    },
    {
        id: "code-hostel-15aug",
        title: "Code Hostel: 15th August Celebration",
        client: "Code Hostel",
        category: "Event Coverage",
        metric: "Vibrant",
        metricLabel: "Community",
        videoPreview: "/chai-bistro/video2.mp4",
        localVideoFull: "/chai-bistro/video2.mp4",
        summary: "Highlighting the patriotic spirit and vibrant community celebrations during Independence Day at Code Hostel.",
        challenge: "Documenting a live, fast-paced event while ensuring all key moments and emotions were perfectly captured.",
        solution: "Employed multi-angle event coverage with energetic pacing to reflect the enthusiasm of the residents.",
        results: ["Captured memorable community moments", "High engagement from residents", "Strengthened hostel brand identity"],
    },
];

const SPRING_TRANSITION = { type: "spring", stiffness: 300, damping: 30 } as const;

function CloseIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
        </svg>
    );
}

export function OngoingProjects() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    const activeProject = ONGOING_PROJECTS.find((study) => study.id === selectedId) ?? null;

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
        <section id="ongoing-projects" className="py-[72px] sm:py-[clamp(96px,10vw,160px)] bg-[#F7F6F2] border-b border-black/[0.08]">
            <Container>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={stagger(0.12)}
                    className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end pb-12 border-b border-black/[0.08]"
                >
                    <div>
                        <motion.div variants={fadeUp} className="flex items-center gap-2 mb-3">
                            <span className="font-mono text-[10px] font-bold tracking-[0.25em] text-[#6F6F6A] uppercase">
                                04 / Live Production
                            </span>
                        </motion.div>
                        <motion.h2 variants={fadeUp} className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#111111]">
                            In The Studio. <span className="font-serif italic font-normal text-[#B8955A]">Active Sets.</span>
                        </motion.h2>
                    </div>
                    <motion.p variants={fadeUp} className="max-w-md text-sm sm:text-base text-[#6F6F6A] leading-relaxed">
                        A real-time look at ongoing campaign shoots, color grading sessions, and post-production pipelines currently underway.
                    </motion.p>
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={stagger(0.12)}
                    className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {ONGOING_PROJECTS.map((study) => (
                        <motion.div
                            key={study.id}
                            variants={fadeUp}
                            layoutId={`project-card-${study.id}`}
                            onClick={() => setSelectedId(study.id)}
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
                                {study.videoPreview ? (
                                    <video
                                        src={study.videoPreview}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    study.imageSrc && (
                                        <Image
                                            src={study.imageSrc}
                                            alt={study.title}
                                            fill
                                            sizes="(max-width: 640px) 100vw, 33vw"
                                            className="object-cover"
                                        />
                                    )
                                )}
                                <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-8 bg-gradient-to-t from-black/75 to-transparent">
                                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/60">{study.metricLabel}</span>
                                    <p className="font-display text-sm font-bold text-white">{study.metric}</p>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-col gap-1.5">
                                <div className="flex items-center justify-between">
                                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#B8955A]">
                                        {study.client} &middot; {study.category}
                                    </span>
                                </div>
                                <h3 className="font-display text-xl font-bold uppercase tracking-[-0.02em] leading-tight text-[#111111]">
                                    {study.title}
                                </h3>
                                <p className="text-[13px] leading-relaxed text-[#6F6F6A] line-clamp-2">
                                    {study.summary}
                                </p>
                                <span className="mt-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#111111]">
                                    View Details &rarr;
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Detail Modal */}
                <AnimatePresence>
                    {activeProject && (
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
                                layoutId={`project-card-${activeProject.id}`}
                                transition={SPRING_TRANSITION}
                                onClick={(e) => e.stopPropagation()}
                                role="dialog"
                                aria-modal="true"
                                aria-label={activeProject.title}
                                className="relative flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-y-auto rounded-xl bg-white p-5 sm:p-8 mx-2 border border-black/10 shadow-2xl"
                            >
                                <button
                                    type="button"
                                    onClick={() => setSelectedId(null)}
                                    aria-label="Close modal"
                                    className="absolute top-4 right-4 sm:top-6 sm:right-6 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-[#111111] transition-colors hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-black z-10"
                                >
                                    <CloseIcon />
                                </button>

                                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#B8955A] font-bold pr-10">
                                    <span>{activeProject.client}</span>
                                    <span>&middot;</span>
                                    <span>{activeProject.category}</span>
                                </div>

                                <h3 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight text-[#111111] sm:text-3xl">
                                    {activeProject.title}
                                </h3>

                                {/* Video Player / Image Embed */}
                                <div className="mt-6 flex flex-col items-center w-full">
                                    {activeProject.localVideoFull ? (
                                        <div className="relative w-full aspect-video overflow-hidden rounded-lg bg-black">
                                            <video 
                                                src={activeProject.localVideoFull} 
                                                controls 
                                                autoPlay 
                                                className="h-full w-full object-contain"
                                            />
                                        </div>
                                    ) : activeProject.instagramUrl ? (
                                        <div className="relative w-full max-w-[320px] aspect-[9/16] overflow-hidden rounded-lg border border-black/10 bg-black">
                                            <iframe
                                                src={getEmbedUrl(activeProject.instagramUrl)}
                                                className="h-full w-full border-0"
                                                allowFullScreen
                                                title={activeProject.title}
                                                loading="lazy"
                                            />
                                        </div>
                                    ) : activeProject.imageSrc && (
                                        <div className="relative w-full aspect-video overflow-hidden rounded-lg bg-black">
                                            <Image
                                                src={activeProject.imageSrc}
                                                alt={activeProject.title}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6 space-y-4">
                                    <p className="text-sm leading-relaxed text-neutral-800 font-medium">{activeProject.summary}</p>
                                    <div>
                                        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-700">Focus Areas</h4>
                                        <ul className="mt-2 space-y-1.5">
                                            {activeProject.results.map((res, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-[#111111]">
                                                    <span className="text-[#B8955A] font-bold">✓</span> {res}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Container>
        </section>
    );
}
