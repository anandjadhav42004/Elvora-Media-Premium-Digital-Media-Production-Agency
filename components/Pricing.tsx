"use client";

import { motion } from "framer-motion";
import { Container } from "./Container";
import { fadeUp, stagger } from "@/lib/motion";
import { buildCustomWhatsAppLink } from "@/lib/whatsapp";

const CheckIcon = ({ dark = false }: { dark?: boolean }) => (
    <svg className={`w-4 h-4 flex-shrink-0 mt-0.5 ${dark ? "text-luxury-gold" : "text-black"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const PlusIcon = ({ dark = false }: { dark?: boolean }) => (
    <svg className={`w-4 h-4 flex-shrink-0 mt-0.5 ${dark ? "text-luxury-gold" : "text-black"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="16"></line>
        <line x1="8" y1="12" x2="16" y2="12"></line>
    </svg>
);

export function Pricing() {
    const plans = [
        {
            num: "01",
            name: "STARTER PRODUCTION",
            price: "₹30K–50K",
            subtitle: "Establish baseline cinematic presence.",
            features: [
                { text: "12-15 Creative Editorial Posts" },
                { text: "4-6 High-Paced Reels" },
                { text: "8-10 Brand Stories" },
                { text: "Caption & Strategic Hook Copy" },
                { text: "Monthly Content Calendar" },
                { text: "Basic Community Management" },
                { text: "Monthly Performance Report" },
                { text: "Dedicated Creative Direction" },
            ],
            idealFor: "Emerging Startups\nLocal Boutiques\nNew Brand Launches",
            isPopular: false,
        },
        {
            num: "02",
            name: "SCALE AGENCY RETAINER",
            price: "₹51K–70K",
            subtitle: "Turn audience attention into high ROI.",
            features: [
                { text: "Everything in Starter Production", isPlus: true },
                { text: "16-20 Premium Posts & Carousels" },
                { text: "6-8 Cinema-Grade Reels" },
                { text: "10-15 Interactive Stories" },
                { text: "Advanced Algorithmic Content Strategy" },
                { text: "Trend & Competitor Intelligence" },
                { text: "Active Community Nurturing" },
                { text: "Integrated Campaign Direction" },
                { text: "Deep Performance Analytics & Insights" },
                { text: "Priority Studio Turnaround" },
            ],
            idealFor: "Scaling D2C Brands\nGrowth Ventures\nPersonal Brands",
            isPopular: true,
        },
        {
            num: "03",
            name: "ENTERPRISE COMMERCIAL",
            price: "₹71K–1L+",
            subtitle: "Build an iconic, market-defining brand.",
            features: [
                { text: "Everything in Scale Agency Retainer", isPlus: true },
                { text: "20-25+ Bespoke Editorial Posts" },
                { text: "8-12 Full-Scale Commercial Reels" },
                { text: "15+ Daily Stories & Highlights" },
                { text: "End-to-End Social Media Dominance" },
                { text: "Full Creative Shoot & Set Direction" },
                { text: "Influencer Collaboration Architecture" },
                { text: "Paid Ads Management & Creatives" },
                { text: "Executive Strategy Consultation" },
                { text: "VIP 24/7 Production Support" },
            ],
            idealFor: "Established Luxury Brands\nHigh-Growth Enterprises\nMarket Leaders",
            isPopular: false,
        },
    ];

    const dmLink = buildCustomWhatsAppLink("Hi Elvora Media, I would like to get a custom proposal (GROW).");

    return (
        <section id="pricing" className="py-20 sm:py-32 bg-white border-b border-black/[0.08] relative overflow-hidden">
            <Container>
                {/* Header Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={stagger(0.1)}
                    className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end pb-12 border-b border-black/[0.08] mb-16"
                >
                    <div>
                        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
                            <span className="h-px w-8 bg-luxury-gold/40" />
                            <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-luxury-gold uppercase">
                                05 &middot; Investment Architecture
                            </span>
                            <span className="h-px w-8 bg-luxury-gold/40" />
                        </motion.div>
                        <motion.h2 variants={fadeUp} className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-black">
                            Predictable Retainers. <span className="font-serif italic font-normal text-luxury-gold">Unrivalled Output.</span>
                        </motion.h2>
                    </div>

                    <motion.p variants={fadeUp} className="max-w-md text-sm sm:text-base text-neutral-600 leading-relaxed">
                        Transparent monthly production retainers structured to give you a dedicated in-house media team at a fraction of agency overhead.
                    </motion.p>
                </motion.div>

                {/* Cards Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-7xl mx-auto">
                    {plans.map((plan, idx) => {
                        const isDark = plan.isPopular;
                        return (
                            <motion.div
                                key={plan.num}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.4, delay: idx * 0.1, type: "spring", stiffness: 100 }}
                                className={`relative flex flex-col justify-between rounded-3xl p-8 sm:p-10 transition-all duration-500 ${
                                    isDark
                                        ? "bg-black text-white shadow-2xl lg:-translate-y-4 border border-black"
                                        : "bg-neutral-50/60 text-black border border-black/[0.08] hover:border-black/30 hover:bg-white"
                                }`}
                            >
                                {isDark && (
                                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-luxury-gold text-black text-[10px] font-bold uppercase tracking-[0.25em] py-1 px-4 rounded-full shadow-md">
                                        Most Popular Tier
                                    </div>
                                )}

                                <div>
                                    <div className="flex items-center justify-between pb-6 border-b border-black/[0.08] dark:border-white/10">
                                        <span className={`font-mono text-xs font-bold uppercase tracking-[0.2em] ${isDark ? "text-luxury-gold" : "text-neutral-500"}`}>
                                            [ Tier {plan.num} ]
                                        </span>
                                        <span className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                                            isDark ? "border-white/20 text-neutral-300" : "border-black/10 text-neutral-600"
                                        }`}>
                                            Monthly Retainer
                                        </span>
                                    </div>

                                    <div className="pt-6">
                                        <h3 className="font-display text-2xl font-bold uppercase tracking-tight">
                                            {plan.name}
                                        </h3>
                                        <p className={`mt-1 font-serif italic text-sm ${isDark ? "text-neutral-300" : "text-neutral-600"}`}>
                                            {plan.subtitle}
                                        </p>
                                    </div>

                                    <div className="mt-6 flex items-baseline gap-2">
                                        <span className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight">
                                            {plan.price}
                                        </span>
                                        <span className={`font-mono text-xs uppercase tracking-wider ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                                            / month
                                        </span>
                                    </div>

                                    <ul className="mt-8 space-y-3.5 text-xs sm:text-sm font-normal">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                {feature.isPlus ? (
                                                    <PlusIcon dark={isDark} />
                                                ) : (
                                                    <CheckIcon dark={isDark} />
                                                )}
                                                <span className={`leading-snug ${isDark ? "text-neutral-200" : "text-neutral-700"}`}>
                                                    {feature.text}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-10 pt-6 border-t border-black/[0.08] dark:border-white/10">
                                    <div className={`text-[10px] font-mono uppercase tracking-[0.2em] mb-2 ${isDark ? "text-luxury-gold" : "text-neutral-500"}`}>
                                        Ideal For:
                                    </div>
                                    <div className={`text-xs font-medium leading-relaxed whitespace-pre-line mb-6 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                                        {plan.idealFor}
                                    </div>

                                    <a
                                        href={buildCustomWhatsAppLink(`Hi Elvora Media, I am interested in the ${plan.name} (${plan.price}/month).`)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-xs font-bold uppercase tracking-[0.2em] transition-all cursor-pointer ${
                                            isDark
                                                ? "bg-white text-black hover:bg-neutral-200"
                                                : "bg-black text-white hover:bg-neutral-800"
                                        }`}
                                    >
                                        <span>Select {plan.name}</span>
                                        <span>↗</span>
                                    </a>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Footer Banner */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={stagger(0.1)}
                    className="mt-16 sm:mt-24 p-8 sm:p-12 rounded-3xl bg-neutral-950 text-white flex flex-col md:flex-row items-center justify-between gap-8"
                >
                    <div>
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-luxury-gold block mb-2">
                            Need a Tailored Production Scope?
                        </span>
                        <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                            Build A Custom Campaign Scope
                        </h3>
                        <p className="mt-2 text-sm text-neutral-400 max-w-xl">
                            Select individual film shoots, reel batches, brand identity kits, or performance creative packages tailored to your exact roadmap.
                        </p>
                    </div>

                    <a
                        href={dmLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black hover:bg-neutral-200 transition-transform hover:scale-105"
                    >
                        <span>DM "GROW" For Custom Proposal ↗</span>
                    </a>
                </motion.div>
            </Container>
        </section>
    );
}
