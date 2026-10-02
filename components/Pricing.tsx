"use client";

import { motion } from "framer-motion";
import { Container } from "./Container";
import { fadeUp, stagger } from "@/lib/motion";
import { buildCustomWhatsAppLink } from "@/lib/whatsapp";

const CheckIcon = ({ dark = false }: { dark?: boolean }) => (
    <svg className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${dark ? "text-[#B8955A]" : "text-[#111111]"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const PlusIcon = ({ dark = false }: { dark?: boolean }) => (
    <svg className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${dark ? "text-[#B8955A]" : "text-[#111111]"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

    const dmLink = buildCustomWhatsAppLink("Hi Elvora Media, I would like to get a custom proposal.");

    return (
        <section id="pricing" className="py-[72px] sm:py-[clamp(96px,10vw,160px)] bg-[#F7F6F2] border-b border-black/[0.08]">
            <Container>
                {/* Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={stagger(0.1)}
                    className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between pb-12 border-b border-black/[0.08] mb-14"
                >
                    <div>
                        <motion.p variants={fadeUp} className="font-mono text-[10px] font-semibold tracking-[0.25em] uppercase text-[#6F6F6A] mb-3">
                            05 / Investment
                        </motion.p>
                        <motion.h2 variants={fadeUp} className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-[-0.02em] text-[#111111]">
                            Predictable Retainers.{" "}
                            <span className="font-serif italic font-normal text-[#B8955A] tracking-normal">Unrivalled Output.</span>
                        </motion.h2>
                    </div>

                    <motion.p variants={fadeUp} className="max-w-md text-[15px] text-[#6F6F6A] leading-relaxed">
                        Transparent monthly production retainers structured to give you a dedicated in-house media team at a fraction of agency overhead.
                    </motion.p>
                </motion.div>

                {/* Plan cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                    {plans.map((plan, idx) => {
                        const isDark = plan.isPopular;
                        return (
                            <motion.div
                                key={plan.num}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                className={`relative flex flex-col justify-between p-8 sm:p-10 transition-all duration-300 ${
                                    isDark
                                        ? "bg-[#111111] text-white lg:-translate-y-4"
                                        : "bg-white text-[#111111] border border-black/[0.08] hover:border-black/20"
                                }`}
                            >
                                {isDark && (
                                    <div className="absolute -top-3 left-8 bg-[#B8955A] text-black text-[9px] font-bold uppercase tracking-[0.25em] py-1 px-3">
                                        Most Selected
                                    </div>
                                )}

                                <div>
                                    {/* Tier header */}
                                    <div className="flex items-center justify-between pb-5 border-b border-current/10 mb-6">
                                        <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.22em] ${isDark ? "text-[#B8955A]" : "text-[#6F6F6A]"}`}>
                                            Tier {plan.num}
                                        </span>
                                        <span className={`font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 border ${isDark ? "border-white/15 text-white/50" : "border-black/10 text-[#6F6F6A]"}`}>
                                            Monthly
                                        </span>
                                    </div>

                                    <h3 className="font-display text-2xl font-bold uppercase tracking-[-0.02em]">
                                        {plan.name}
                                    </h3>
                                    <p className={`mt-1.5 font-serif italic text-sm ${isDark ? "text-white/60" : "text-[#6F6F6A]"}`}>
                                        {plan.subtitle}
                                    </p>

                                    <div className="mt-5 flex items-baseline gap-2">
                                        <span className="font-display text-4xl sm:text-5xl font-extrabold tracking-[-0.02em]">
                                            {plan.price}
                                        </span>
                                        <span className={`font-mono text-[10px] uppercase tracking-wider ${isDark ? "text-white/40" : "text-[#6F6F6A]"}`}>
                                            / month
                                        </span>
                                    </div>

                                    <ul className="mt-7 space-y-3 text-sm">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-2.5">
                                                {feature.isPlus ? <PlusIcon dark={isDark} /> : <CheckIcon dark={isDark} />}
                                                <span className={`leading-snug ${isDark ? "text-white/75" : "text-[#6F6F6A]"}`}>
                                                    {feature.text}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-8 pt-5 border-t border-current/10">
                                    <p className={`text-[10px] font-mono uppercase tracking-[0.2em] mb-2 ${isDark ? "text-[#B8955A]" : "text-[#6F6F6A]"}`}>
                                        Ideal For
                                    </p>
                                    <p className={`text-xs leading-relaxed whitespace-pre-line mb-6 ${isDark ? "text-white/60" : "text-[#6F6F6A]"}`}>
                                        {plan.idealFor}
                                    </p>

                                    <a
                                        href={buildCustomWhatsAppLink(`Hi Elvora Media, I am interested in the ${plan.name} (${plan.price}/month).`)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex w-full items-center justify-center gap-2 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-transform duration-200 hover:-translate-y-px cursor-pointer ${
                                            isDark
                                                ? "bg-white text-[#111111] hover:bg-neutral-100"
                                                : "bg-[#111111] text-white hover:bg-black/80"
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

                {/* Custom scope banner */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={stagger(0.1)}
                    className="mt-12 p-8 sm:p-12 bg-[#0B0B0B] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
                >
                    <div>
                        <motion.p variants={fadeUp} className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#B8955A] mb-2">
                            Need something bespoke?
                        </motion.p>
                        <motion.h3 variants={fadeUp} className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-[-0.02em] text-white">
                            Build a Custom Campaign Scope
                        </motion.h3>
                        <motion.p variants={fadeUp} className="mt-2 text-[15px] text-white/50 max-w-lg">
                            Select individual film shoots, reel batches, brand identity kits, or performance creative packages tailored to your exact roadmap.
                        </motion.p>
                    </div>

                    <a
                        href={dmLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 bg-white px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111] transition-transform duration-200 hover:-translate-y-px"
                    >
                        Get Custom Proposal ↗
                    </a>
                </motion.div>
            </Container>
        </section>
    );
}
