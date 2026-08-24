"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { EASE, fadeUp, stagger } from "@/lib/motion";

type TeamMember = {
    id: string;
    name: string;
    title: string;
    byline: string;
    photoSrc: string;
    imagePosition?: string;
    imageScale?: number;
    description?: string;
    linkedin?: string;
};

const DIRECTORS: TeamMember[] = [
    {
        id: "finance-marketing",
        name: "Yash Borate",
        title: "Finance and Marketing",
        byline: "evmyash@gmail.com",
        photoSrc: "/IMG-20260528-WA0013.jpg.jpeg",
        description:
            "The strategic and financial architect. Bringing solid entrepreneurial expertise from his time leading WeCrafted Media and serving as Managing Partner at Somsbliss (Sculptura by Somya), Yash bridges data-driven marketing with robust fiscal growth frameworks.",
        linkedin:
            "https://www.linkedin.com/in/yash-borate-a869a63ab?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    },
    {
        id: "production-marketing",
        name: "Suyash Mali",
        title: "Production and Marketing",
        byline: "evmsuyashhh@gmail.com",
        photoSrc: "/IMG-20260629-WA0010.jpg.jpeg",
        description:
            "The creative engine behind Elvora Media. Suyash blends raw artistic vision with high-impact production strategy, transforming brand concepts into visually premium, market-responsive campaigns.",
        linkedin:
            "https://www.linkedin.com/in/suyash-mali-88262440a?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    },
    {
        id: "operations-director",
        name: "Shreevardhan Rathore",
        title: "Marketing and Managing",
        byline: "Evmshree@gmail.com",
        photoSrc: "/IMG-20260702-WA0000.jpg.jpeg",
        description:
            "Shreevardhan joins Elvora Media as Managing Director (MD), transitioning after 1 year of proven impact in driving disciplined business execution and high-performing digital campaigns. In this leadership role, his expertise will bridge creative output and strategic operational control to accelerate Elvora Media's growth.",
        linkedin:
            "https://www.linkedin.com/in/shree-vardhan-singh-rathore-99b126420?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    },
];

const LEADS: TeamMember[] = [
    {
        id: "media-director",
        name: "Bansi Polara",
        title: "Media director",
        byline: "evmbansi@gmail.com",
        photoSrc: "/IMG-20260629-WA0021.jpg.jpeg",
        description:
            "The visual voice of Elvora Media. Bansi shapes the brand's media direction across every platform, curating each release into a consistent, high-end story that keeps audiences engaged.",
    },

    {
        id: "operation-director",
        name: "Jay Patil",
        title: "Operation Director",
        byline: "",
        photoSrc: "/jay-patil.jpeg",
    },
    {
        id: "editing-director",
        name: "Anshita Pahade",
        title: "Editing Director",
        byline: "",
        photoSrc: "/anshita.jpg",
    },
];

const EXPANDED_WIDTH = 34;
const RESTING_WIDTH = (100 - EXPANDED_WIDTH) / (DIRECTORS.length - 1);
const TRANSITION = { duration: 0.45, ease: EASE };
const SPRING_TRANSITION = { type: "spring", stiffness: 300, damping: 30 } as const;

function ArrowIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
        >
            <path d="M9 6l6 6-6 6" />
        </svg>
    );
}

function LinkedInIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
            aria-hidden="true"
        >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    );
}

function CloseIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            className="h-5 w-5"
            aria-hidden="true"
        >
            <path d="M6 6l12 12M18 6L6 18" />
        </svg>
    );
}

function LeadCard({
    member,
    style,
    onClick,
}: {
    member: TeamMember;
    style?: React.CSSProperties;
    onClick?: () => void;
}) {
    return (
        <motion.div
            variants={fadeUp}
            style={style}
            onClick={onClick}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
            onKeyDown={(e) => {
                if (onClick && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    onClick();
                }
            }}
            className={`group relative aspect-square w-full shrink-0 overflow-hidden border border-transparent transition-all duration-300 hover:border-luxury-gold/40 hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] sm:aspect-auto sm:h-full ${onClick ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-luxury-gold/60' : ''}`}
        >
            <Image
                src={member.photoSrc}
                alt={member.name}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                style={{ objectPosition: member.imagePosition }}
                className="object-cover transition-all duration-500 ease-out md:grayscale group-hover:scale-105 group-hover:grayscale-0"
            />
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(circle at bottom left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.45) 40%, transparent 70%)",
                }}
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-1 p-4">
                <p className="text-sm font-medium text-white sm:text-base">
                    {member.name}
                </p>
                <p className="text-xs font-medium uppercase tracking-wide text-luxury-gold">
                    {member.title}
                </p>
            </div>
        </motion.div>
    );
}

export function TeamAccordion() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isDesktopAccordion, setIsDesktopAccordion] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const selectedMember =
        [...DIRECTORS, ...LEADS].find((member) => member.id === selectedId) ?? null;

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 640px)");
        const update = () => setIsDesktopAccordion(mediaQuery.matches);
        update();
        mediaQuery.addEventListener("change", update);
        return () => mediaQuery.removeEventListener("change", update);
    }, []);

    useEffect(() => {
        if (!selectedId) return;

        const previousActiveElement = document.activeElement as HTMLElement | null;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setSelectedId(null);
                return;
            }

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
            const firstFocusable = modalRef.current?.querySelector<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            firstFocusable?.focus();
        }, 50);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKeyDown);
            previousActiveElement?.focus();
        };
    }, [selectedId]);

    function openModal(member: TeamMember) {
        setSelectedId(member.id);
    }

    function requestClose() {
        setSelectedId(null);
    }

    return (
        <MotionConfig transition={TRANSITION}>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={stagger(0.15)}
            >
                <motion.p
                    variants={fadeUp}
                    className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.25em] text-luxury-gold"
                >
                    Directors
                </motion.p>
                <motion.div
                    variants={fadeUp}
                    className="flex w-full flex-col overflow-hidden rounded-3xl sm:h-80 sm:flex-row md:h-105"
                >
                    {DIRECTORS.map((member, index) => {
                        const isActive = index === activeIndex;
                        const showOverlay = isActive || !isDesktopAccordion;
                        return (
                            <div
                                key={member.id}
                                tabIndex={0}
                                role="button"
                                aria-label={`${member.name} - ${member.title}`}
                                aria-expanded={isActive}
                                onMouseEnter={() => setActiveIndex(index)}
                                onFocus={() => setActiveIndex(index)}
                                onClick={() => {
                                    setActiveIndex(index);
                                    if (!isDesktopAccordion) {
                                        openModal(member);
                                    }
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        setActiveIndex(index);
                                        openModal(member);
                                    }
                                }}
                                style={
                                    isDesktopAccordion
                                        ? {
                                              flexGrow: isActive
                                                  ? EXPANDED_WIDTH
                                                  : RESTING_WIDTH,
                                              flexBasis: 0,
                                          }
                                        : undefined
                                }
                                className="group relative aspect-square w-full shrink-0 overflow-hidden border border-transparent transition-all duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-luxury-gold/60 hover:border-luxury-gold/40 hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] sm:aspect-auto sm:h-full sm:w-auto"
                            >
                                <div
                                    className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105"
                                    style={
                                        member.imageScale
                                            ? {
                                                  inset: `${
                                                      -(member.imageScale - 1) *
                                                      50
                                                  }%`,
                                              }
                                            : undefined
                                    }
                                >
                                    <Image
                                        src={member.photoSrc}
                                        alt={member.name}
                                        fill
                                        sizes={
                                            member.imageScale
                                                ? `(max-width: 640px) ${Math.round(
                                                      40 * member.imageScale,
                                                  )}vw, ${Math.round(
                                                      300 * member.imageScale,
                                                  )}px`
                                                : "(max-width: 640px) 40vw, 300px"
                                        }
                                        style={{
                                            objectPosition:
                                                member.imagePosition,
                                        }}
                                        className="object-cover transition-all duration-500 ease-out md:grayscale group-hover:grayscale-0"
                                    />
                                </div>
                                {selectedId !== member.id && (
                                    <>
                                        <div
                                            className={`pointer-events-none absolute inset-0 transition-opacity duration-200 ${
                                                showOverlay
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            }`}
                                            style={{
                                                background:
                                                    "radial-gradient(circle at bottom left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.45) 40%, transparent 70%)",
                                            }}
                                        />
                                        <div
                                            className={`absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 p-4 transition-opacity duration-200 ${
                                                showOverlay
                                                    ? "opacity-100"
                                                    : "pointer-events-none opacity-0"
                                            }`}
                                        >
                                            <p className="text-sm font-medium text-white">
                                                {member.name}
                                            </p>
                                            <p className="text-xs font-medium uppercase tracking-wide text-luxury-gold">
                                                {member.title}
                                            </p>
                                            <motion.button
                                                layoutId={`card-${member.id}`}
                                                transition={{
                                                    layout: SPRING_TRANSITION,
                                                }}
                                                type="button"
                                                onClick={() =>
                                                    openModal(member)
                                                }
                                                className="flex items-center gap-2 rounded-[100px] border border-white bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                                            >
                                                <span>Know more</span>
                                                <ArrowIcon />
                                            </motion.button>
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </motion.div>

                <motion.p
                    variants={fadeUp}
                    className="mb-4 mt-8 font-mono text-xs font-bold uppercase tracking-[0.25em] text-luxury-gold"
                >
                    Team Leads
                </motion.p>
                <div className="w-full sm:flex sm:justify-center">
                    <motion.div
                        variants={fadeUp}
                        className="flex w-full flex-col overflow-hidden rounded-3xl sm:h-80 sm:flex-row md:h-105"
                        style={
                            isDesktopAccordion
                                ? { width: `${RESTING_WIDTH * LEADS.length}%` }
                                : undefined
                        }
                    >
                        {LEADS.map((member) => (
                            <LeadCard
                                key={member.id}
                                member={member}
                                onClick={() => openModal(member)}
                                style={
                                    isDesktopAccordion
                                        ? { flex: "1 1 0%" }
                                        : undefined
                                }
                            />
                        ))}
                    </motion.div>
                </div>

                <AnimatePresence>
                    {selectedMember && (
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0, pointerEvents: "none" }}
                            animate={{ opacity: 1, pointerEvents: "auto" }}
                            exit={{ opacity: 0, pointerEvents: "none" }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                            onClick={requestClose}
                        >
                            <motion.div
                                ref={modalRef}
                                layoutId={`card-${selectedMember.id}`}
                                layout
                                transition={{ layout: SPRING_TRANSITION }}
                                onClick={(event) => event.stopPropagation()}
                                role="dialog"
                                aria-modal="true"
                                aria-label={selectedMember.name}
                                className="flex w-full max-w-lg flex-col rounded-3xl bg-white p-5 sm:p-5 shadow-2xl"
                            >
                                <motion.div
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        delay: 0.1,
                                        duration: 0.25,
                                        ease: EASE,
                                    }}
                                    className="flex flex-col"
                                >
                                    <button
                                        type="button"
                                        onClick={requestClose}
                                        aria-label="Close"
                                        className="flex shrink-0 items-center justify-center self-end rounded-full bg-transparent text-neutral-950 transition-colors hover:border-neutral-500 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                                    >
                                        <CloseIcon />
                                    </button>
                                    <div className="mt-4 flex items-center gap-2">
                                        <h3 className="text-xl font-semibold sm:text-2xl">
                                            {selectedMember.name}
                                        </h3>
                                        {selectedMember.linkedin && (
                                            <a
                                                href={selectedMember.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`${selectedMember.name} on LinkedIn`}
                                                className="flex h-9 w-9 shrink-0 items-center justify-center text-[#2868b2] transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-luxury-gold rounded-full"
                                            >
                                                <LinkedInIcon />
                                            </a>
                                        )}
                                    </div>
                                    <p className="mt-1 text-sm font-medium text-luxury-gold">
                                        {selectedMember.title}
                                    </p>
                                    <p className="mt-2 text-sm font-medium text-neutral-500">
                                        {selectedMember.byline}
                                    </p>
                                    {selectedMember.description && (
                                        <p className="mt-6 text-base leading-relaxed text-neutral-700">
                                            {selectedMember.description}
                                        </p>
                                    )}
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    variants={fadeUp}
                    className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
                >
                    <p className="text-base font-bold sm:text-lg">About us</p>
                    <div className="space-y-4 sm:w-1/2">
                        <p className="text-sm leading-relaxed text-neutral-700 sm:text-base">
                            At Elvora, we believe every brand has a story worth
                            remembering. We are a creative media and branding
                            agency dedicated to transforming ideas into
                            impactful digital experiences that inspire, engage,
                            and deliver results.
                        </p>
                        <p className="text-sm leading-relaxed text-neutral-700 sm:text-base">
                            From content creation and social media management to
                            branding, design, video production, and marketing
                            strategies, we help businesses build a powerful
                            presence in the digital world.
                        </p>
                        <p className="text-sm leading-relaxed text-neutral-700 sm:text-base">
                            Our approach combines creativity, strategy, and
                            innovation to create content that not only looks
                            exceptional but also drives meaningful growth.
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </MotionConfig>
    );
}

