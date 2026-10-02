"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "./Container";
import { fadeUp, stagger } from "@/lib/motion";
import { WHATSAPP_LINK } from "@/lib/whatsapp";

type ServiceItem = {
    number: string;
    title: string;
    subtitle: string;
    category: string;
    description: string;
    deliverables: string[];
    imageSrc: string;
};

const SERVICES: ServiceItem[] = [
    {
        number: "01",
        title: "Commercial Film & Video Production",
        subtitle: "High-Paced Cinematic Direction",
        category: "Production",
        description:
            "From high-energy brand films to grand festive event coverage, we direct and produce cinema-grade video content with industry-standard cameras, custom color science, and dynamic rhythm.",
        deliverables: [
            "Concept Development & Scripting",
            "Cinema 4K Camera & Drone Direction",
            "Full Lighting & Sound Architecture",
            "Color Science (DaVinci Resolve)",
            "Commercial Sound Design & Score",
        ],
        imageSrc: "/code-hostel/thumb2.jpg",
    },
    {
        number: "02",
        title: "Brand Identity & Art Direction",
        subtitle: "Luxury Aesthetic & Positioning",
        category: "Branding",
        description:
            "We construct bespoke brand universes that command premium pricing. Clean typography, distinctive visual language, and cohesive digital touchpoints that make your brand unforgettable.",
        deliverables: [
            "Core Visual Identity & Marks",
            "Editorial Typography Guidelines",
            "Color Palette & Material Systems",
            "Packaging & Print Direction",
            "Comprehensive Brand Book",
        ],
        imageSrc: "/services3.png",
    },
    {
        number: "03",
        title: "Social-First Content & Reels",
        subtitle: "Viral Engineering & Retention",
        category: "Social",
        description:
            "Short-form video engineered for algorithmic dominance. We combine 2-second visual hooks, rapid pacing, and trend curation to generate millions of organic impressions.",
        deliverables: [
            "High-Retention Reel Architecture",
            "Hook Strategy & Scripting",
            "Micro-Storytelling & Editing",
            "Custom Audio Sync & SFX",
            "Monthly Content Production Calendar",
        ],
        imageSrc: "/services2.png",
    },
    {
        number: "04",
        title: "Performance Ads & Growth Media",
        subtitle: "Creative Engineered for Direct ROI",
        category: "Performance",
        description:
            "High-converting ad creatives designed specifically to lower CAC and maximize ROAS. We A/B test angles, hooks, and formats to turn paid traffic into reliable customer acquisition.",
        deliverables: [
            "Performance Creative Testing (Meta & Google)",
            "Direct-Response Ad Scripting",
            "UGC & Studio Hybrid Production",
            "Conversion Funnel Optimization",
            "Weekly Analytics & Iteration",
        ],
        imageSrc: "/services1.png",
    },
    {
        number: "05",
        title: "3D Motion Design & Post-Production",
        subtitle: "Hyper-Real Animation & Finishing",
        category: "Motion",
        description:
            "Elevate your product presentation with hyper-realistic 3D rendering, kinetic typographic animation, and seamless visual effects that standard cameras cannot capture.",
        deliverables: [
            "3D Product Visualizations",
            "Kinetic Typography & Titles",
            "CGI Commercial Sequences",
            "Motion Graphics Packages",
            "Ultra-Clean Visual Clean-up & Retouching",
        ],
        imageSrc: "/services4.png",
    },
];

export function ServicesShowcase() {
    const [activeIndex, setActiveIndex] = useState(0);

    const activeService = SERVICES[activeIndex];

    return (
        <section id="services" className="relative py-20 sm:py-32 bg-[#faf9f6] border-b border-black/[0.08]">
            <Container>
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={stagger(0.12)}
                    className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 pb-12 border-b border-black/[0.08]"
                >
                    <div>
                        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
                            <span className="h-px w-8 bg-luxury-gold/40" />
                            <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-luxury-gold uppercase">
                                02 &middot; Capabilities
                            </span>
                            <span className="h-px w-8 bg-luxury-gold/40" />
                        </motion.div>
                        <motion.h2 variants={fadeUp} className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-black font-extrabold">
                            Core Disciplines. <span className="font-serif italic font-normal text-luxury-gold">No Limits.</span>
                        </motion.h2>
                    </div>

                    <motion.p variants={fadeUp} className="max-w-md text-sm sm:text-base text-neutral-600 leading-relaxed">
                        Comprehensive media production and creative direction under one roof. Every execution is designed to elevate status and drive revenue.
                    </motion.p>
                </motion.div>

                {/* Editorial Catalogue Layout (Interactive Master-Detail) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 items-start">
                    {/* Left: Service Accordion List (7 cols) */}
                    <div className="lg:col-span-7 flex flex-col divide-y divide-black/[0.08]">
                        {SERVICES.map((service, index) => {
                            const isCurrent = activeIndex === index;
                            return (
                                <div
                                    key={service.number}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    onClick={() => setActiveIndex(index)}
                                    className={`group cursor-pointer py-8 transition-all duration-300 ${
                                        isCurrent ? "opacity-100" : "opacity-60 hover:opacity-100"
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-start gap-6 sm:gap-8">
                                            <span className="font-mono text-sm font-bold tracking-wider text-luxury-gold pt-1">
                                                {service.number}
                                            </span>
                                            <div>
                                                <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-black transition-colors group-hover:text-black">
                                                    {service.title}
                                                </h3>
                                                <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-neutral-500">
                                                    {service.subtitle}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center pt-1">
                                            <span
                                                className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs transition-all duration-300 ${
                                                    isCurrent
                                                        ? "border-black bg-black text-white rotate-45"
                                                        : "border-black/15 text-neutral-500 group-hover:border-black group-hover:text-black"
                                                }`}
                                            >
                                                →
                                            </span>
                                        </div>
                                    </div>

                                    {/* Expanded Detail for Mobile & Active */}
                                    <AnimatePresence>
                                        {isCurrent && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                                className="overflow-hidden pl-10 sm:pl-14 pt-4"
                                            >
                                                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed max-w-xl">
                                                    {service.description}
                                                </p>

                                                {/* Deliverables Pills */}
                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {service.deliverables.map((item, dIdx) => (
                                                        <span
                                                            key={dIdx}
                                                            className="rounded-full border border-black/10 bg-neutral-50 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-neutral-800"
                                                        >
                                                            {item}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div className="mt-6 pt-4 border-t border-black/[0.04] flex items-center gap-4">
                                                    <a
                                                        href={WHATSAPP_LINK}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-black hover:text-luxury-gold transition-colors"
                                                    >
                                                        <span>Inquire for {service.category}</span>
                                                        <span>↗</span>
                                                    </a>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right: Sticky Editorial Media Card (5 cols) */}
                    <div className="lg:col-span-5 sticky top-28 hidden lg:block">
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-black/[0.08] bg-neutral-900 shadow-xl">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeService.number}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    className="relative h-full w-full"
                                >
                                    <Image
                                        src={activeService.imageSrc}
                                        alt={activeService.title}
                                        fill
                                        sizes="40vw"
                                        className="object-cover"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

                                    <div className="absolute bottom-6 left-6 right-6 text-white">
                                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-luxury-gold block mb-1">
                                            [ Discipline {activeService.number} ]
                                        </span>
                                        <h4 className="font-display text-2xl font-bold uppercase tracking-tight text-white leading-tight">
                                            {activeService.title}
                                        </h4>
                                        <p className="mt-2 text-xs text-neutral-300 font-mono">
                                            {activeService.subtitle}
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
