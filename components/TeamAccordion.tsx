"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";
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
        description: "Ensuring smooth operational workflows and project deliveries across all media campaigns.",
    },
    {
        id: "editing-director",
        name: "Anshita Pahade",
        title: "Editing Director",
        byline: "",
        photoSrc: "/anshita.jpg",
        description: "Leading the post-production and editing pipeline to maintain Elvora's signature premium quality.",
    },
];

const EXPANDED_WIDTH = 34;
const RESTING_WIDTH = (100 - EXPANDED_WIDTH) / (DIRECTORS.length - 1);
const TRANSITION = { duration: 0.45, ease: EASE };
const SPRING_TRANSITION = { type: "spring", stiffness: 260, damping: 20 };

function LinkedInIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    );
}

function BackFaceContent({ member }: { member: TeamMember }) {
    return (
        <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center bg-deep-black p-6 text-center shadow-inner"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
            <h3 className="font-display text-2xl font-bold text-luxury-gold sm:text-3xl">
                {member.name}
            </h3>
            <div className="mt-1 flex items-center gap-2">
                <p className="font-mono text-xs uppercase tracking-widest text-ivory-cream/80">
                    {member.title}
                </p>
                {member.linkedin && (
                    <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[#2868b2] transition-colors hover:text-white"
                    >
                        <LinkedInIcon />
                    </a>
                )}
            </div>
            {member.byline && (
                <p className="mt-2 text-sm font-medium text-neutral-400">
                    {member.byline}
                </p>
            )}
            {member.description && (
                <p className="mt-4 text-sm leading-relaxed text-neutral-300 line-clamp-6">
                    {member.description}
                </p>
            )}
            <p className="mt-auto font-mono text-[10px] uppercase tracking-[0.2em] text-luxury-gold/50">
                Click to flip back
            </p>
        </div>
    );
}

function LeadCard({
    member,
    style,
    isFlipped,
    onClick,
}: {
    member: TeamMember;
    style?: React.CSSProperties;
    isFlipped: boolean;
    onClick: () => void;
}) {
    return (
        <motion.div
            variants={fadeUp}
            style={{ ...style, perspective: 1200 }}
            className="group relative aspect-square w-full shrink-0 cursor-pointer sm:aspect-auto sm:h-full focus:outline-none focus:ring-2 focus:ring-luxury-gold/60"
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onClick();
                }
            }}
        >
            <motion.div
                className="relative h-full w-full rounded-3xl sm:rounded-none overflow-hidden sm:border-l sm:border-black/5"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={SPRING_TRANSITION}
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 h-full w-full bg-neutral-100"
                    style={{ backfaceVisibility: "hidden" }}
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
                        className="pointer-events-none absolute inset-0 transition-opacity duration-300 group-hover:opacity-80"
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
                </div>

                {/* Back Face */}
                <BackFaceContent member={member} />
            </motion.div>
        </motion.div>
    );
}

export function TeamAccordion() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [flippedId, setFlippedId] = useState<string | null>(null);
    const [isDesktopAccordion, setIsDesktopAccordion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 640px)");
        const update = () => setIsDesktopAccordion(mediaQuery.matches);
        update();
        mediaQuery.addEventListener("change", update);
        return () => mediaQuery.removeEventListener("change", update);
    }, []);

    function toggleFlip(memberId: string) {
        setFlippedId((prev) => (prev === memberId ? null : memberId));
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
                    className="flex w-full flex-col gap-4 sm:gap-0 overflow-hidden sm:rounded-3xl sm:h-80 sm:flex-row md:h-105"
                >
                    {DIRECTORS.map((member, index) => {
                        const isActive = index === activeIndex;
                        const isFlipped = flippedId === member.id;
                        const showOverlay = isActive || !isDesktopAccordion;

                        return (
                            <div
                                key={member.id}
                                tabIndex={0}
                                role="button"
                                aria-label={`${member.name} - ${member.title}`}
                                aria-expanded={isActive}
                                onMouseEnter={() => {
                                    if (activeIndex !== index) setFlippedId(null);
                                    setActiveIndex(index);
                                }}
                                onFocus={() => {
                                    if (activeIndex !== index) setFlippedId(null);
                                    setActiveIndex(index);
                                }}
                                onClick={() => {
                                    setActiveIndex(index);
                                    toggleFlip(member.id);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        setActiveIndex(index);
                                        toggleFlip(member.id);
                                    }
                                }}
                                style={{
                                    ...(isDesktopAccordion
                                        ? {
                                              flexGrow: isActive ? EXPANDED_WIDTH : RESTING_WIDTH,
                                              flexBasis: 0,
                                          }
                                        : {}),
                                    perspective: 1200,
                                }}
                                className="group relative aspect-square w-full shrink-0 cursor-pointer sm:aspect-auto sm:h-full sm:w-auto transition-all duration-500 ease-in-out rounded-3xl sm:rounded-none overflow-visible"
                            >
                                <motion.div
                                    className="relative h-full w-full rounded-3xl sm:rounded-none overflow-hidden sm:border-l sm:border-black/5"
                                    style={{ transformStyle: "preserve-3d" }}
                                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                                    transition={SPRING_TRANSITION}
                                >
                                    {/* Front Face */}
                                    <div
                                        className="absolute inset-0 h-full w-full bg-neutral-100"
                                        style={{ backfaceVisibility: "hidden" }}
                                    >
                                        <div
                                            className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105"
                                            style={
                                                member.imageScale
                                                    ? { inset: `${-(member.imageScale - 1) * 50}%` }
                                                    : undefined
                                            }
                                        >
                                            <Image
                                                src={member.photoSrc}
                                                alt={member.name}
                                                fill
                                                sizes={
                                                    member.imageScale
                                                        ? `(max-width: 640px) ${Math.round(40 * member.imageScale)}vw, ${Math.round(300 * member.imageScale)}px`
                                                        : "(max-width: 640px) 40vw, 300px"
                                                }
                                                style={{ objectPosition: member.imagePosition }}
                                                className="object-cover transition-all duration-500 ease-out md:grayscale group-hover:grayscale-0"
                                            />
                                        </div>
                                        <div
                                            className={`pointer-events-none absolute inset-0 transition-opacity duration-200 ${
                                                showOverlay ? "opacity-100" : "opacity-0"
                                            }`}
                                            style={{
                                                background: "radial-gradient(circle at bottom left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.45) 40%, transparent 70%)",
                                            }}
                                        />
                                        <div
                                            className={`absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 p-4 transition-opacity duration-200 ${
                                                showOverlay ? "opacity-100" : "pointer-events-none opacity-0"
                                            }`}
                                        >
                                            <p className="text-sm font-medium text-white">{member.name}</p>
                                            <p className="text-xs font-medium uppercase tracking-wide text-luxury-gold">{member.title}</p>
                                            <div className="flex items-center gap-2 rounded-[100px] border border-white/30 bg-black/20 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-white transition-colors group-hover:bg-white group-hover:text-black">
                                                <span>{isFlipped ? "Close" : "Know more"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Back Face */}
                                    <BackFaceContent member={member} />
                                </motion.div>
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
                        className="flex w-full flex-col gap-4 sm:gap-0 sm:rounded-3xl overflow-hidden sm:h-80 sm:flex-row md:h-105"
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
                                isFlipped={flippedId === member.id}
                                onClick={() => toggleFlip(member.id)}
                                style={isDesktopAccordion ? { flex: "1 1 0%" } : undefined}
                            />
                        ))}
                    </motion.div>
                </div>

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
