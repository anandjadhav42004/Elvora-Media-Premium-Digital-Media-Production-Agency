"use client";

import { motion } from "framer-motion";
import { Container } from "./Container";
import { fadeUp, stagger } from "@/lib/motion";
import { buildCustomWhatsAppLink } from "@/lib/whatsapp";

const CheckIcon = () => (
    <svg className="w-4 h-4 flex-shrink-0 text-luxury-gold mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const PlusIcon = () => (
    <svg className="w-4 h-4 flex-shrink-0 text-luxury-gold mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="16"></line>
        <line x1="8" y1="12" x2="16" y2="12"></line>
    </svg>
);

export function Pricing() {
    const plans = [
        {
            num: "01",
            name: "BASE PLAN",
            price: "₹30K–50K",
            subtitle: "Build your presence.",
            features: [
                { text: "12-15 Creative Posts", icon: <CheckIcon /> },
                { text: "4-6 Reels", icon: <CheckIcon /> },
                { text: "8-10 Stories", icon: <CheckIcon /> },
                { text: "Caption & Hashtag Strategy", icon: <CheckIcon /> },
                { text: "Monthly Content Calendar", icon: <CheckIcon /> },
                { text: "Basic Community Management", icon: <CheckIcon /> },
                { text: "Monthly Performance Report", icon: <CheckIcon /> },
                { text: "Creative Direction", icon: <CheckIcon /> },
            ],
            idealFor: "Startups\nLocal Businesses\nNew Brands",
            bgClass: "bg-[#e8d9c5]",
            popular: false
        },
        {
            num: "02",
            name: "MID PLAN",
            price: "₹51K–70K",
            subtitle: "Turn attention into growth.",
            features: [
                { text: "Everything in Base Plan", icon: <PlusIcon /> },
                { text: "16-20 Premium Posts", icon: <CheckIcon /> },
                { text: "6-8 Reels", icon: <CheckIcon /> },
                { text: "10-15 Stories", icon: <CheckIcon /> },
                { text: "Advanced Content Strategy", icon: <CheckIcon /> },
                { text: "Trend & Competitor Research", icon: <CheckIcon /> },
                { text: "Community Engagement", icon: <CheckIcon /> },
                { text: "Campaign Planning", icon: <CheckIcon /> },
                { text: "Monthly Optimization", icon: <CheckIcon /> },
                { text: "Detailed Analytics & Insights", icon: <CheckIcon /> },
                { text: "Priority Support", icon: <CheckIcon /> },
            ],
            idealFor: "Growing Businesses\nD2C Brands\nPersonal Brands",
            bgClass: "bg-[#f5ead5]",
            popular: true
        },
        {
            num: "03",
            name: "PREMIUM PLAN",
            price: "₹71K–1L",
            subtitle: "Build a brand people remember.",
            features: [
                { text: "Everything in Mid Plan", icon: <PlusIcon /> },
                { text: "20-25+ Premium Posts", icon: <CheckIcon /> },
                { text: "8-12 Reels", icon: <CheckIcon /> },
                { text: "15+ Stories", icon: <CheckIcon /> },
                { text: "Complete Social Media Management", icon: <CheckIcon /> },
                { text: "Advanced Brand Strategy", icon: <CheckIcon /> },
                { text: "Campaign & Launch Planning", icon: <CheckIcon /> },
                { text: "Influencer Collaboration Strategy", icon: <CheckIcon /> },
                { text: "Paid Ads Management*", icon: <CheckIcon /> },
                { text: "Content Shoot Direction", icon: <CheckIcon /> },
                { text: "Advanced Monthly Reporting", icon: <CheckIcon /> },
                { text: "Monthly Strategy Consultation", icon: <CheckIcon /> },
                { text: "Priority Creative Support", icon: <CheckIcon /> },
            ],
            idealFor: "Established Brands\nPremium Businesses\nHigh-Growth Companies",
            bgClass: "bg-[linear-gradient(180deg,#e0c38a_0%,#b58c56_100%)]",
            popular: false
        }
    ];

    const dmLink = buildCustomWhatsAppLink("Hi Elvora Media, I would like to get a custom proposal (GROW).");

    return (
        <section id="pricing" className="py-20 sm:py-32 bg-[#faf7f0] relative overflow-hidden">
            <Container>
                {/* Header Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={stagger(0.15)}
                    className="flex flex-col items-center text-center mb-16 sm:mb-24"
                >
                    <motion.div variants={fadeUp} className="relative mb-6">
                        <span className="font-script text-4xl sm:text-5xl text-neutral-600 -rotate-6 inline-block mr-2 transform origin-bottom-right">
                            crafted for growth
                        </span>
                        <span className="text-xl inline-block -rotate-6">♡</span>
                    </motion.div>
                    
                    <motion.h2 variants={fadeUp} className="font-display text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-deep-black leading-[1.1]">
                        Not Just<br />Social Media.
                    </motion.h2>
                    <motion.p variants={fadeUp} className="mt-4 text-xl sm:text-2xl font-bold uppercase tracking-[0.1em] text-luxury-gold">
                        A Complete Brand Presence.
                    </motion.p>
                    <motion.div variants={fadeUp} className="mt-8 flex items-center justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 w-full flex-wrap">
                        <span>Strategy</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                        <span>Content</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                        <span>Engagement</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                        <span>Growth</span>
                    </motion.div>
                </motion.div>

                {/* Cards Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-start max-w-7xl mx-auto">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={plan.num}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.6, delay: idx * 0.2 }}
                            className={`relative w-full rounded-[2rem] p-8 sm:p-10 shadow-2xl ${plan.bgClass} ${plan.popular ? 'lg:-translate-y-8 z-10 border-2 border-white ring-4 ring-black/5' : 'border border-black/5'} overflow-hidden`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-deep-black text-white text-[10px] font-bold uppercase tracking-[0.2em] py-2 px-6 shadow-xl rounded-b-lg">
                                    Most Popular
                                </div>
                            )}

                            <div className="flex flex-col items-center text-center mt-4">
                                <div className="w-12 h-12 rounded-full bg-deep-black text-white flex items-center justify-center font-display text-xl font-bold mb-6">
                                    {plan.num}
                                </div>
                                <h3 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-neutral-700 mb-4 border-b border-black/10 pb-4 w-full">
                                    {plan.name}
                                </h3>
                                <div className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-deep-black mb-2">
                                    {plan.price}
                                </div>
                                <div className="text-xs font-bold uppercase tracking-wider text-neutral-600 mb-6">
                                    / Month
                                </div>
                                <div className="font-script text-3xl text-luxury-gold mb-8">
                                    {plan.subtitle}
                                </div>
                            </div>

                            <ul className="space-y-4 mb-10 text-sm font-medium text-neutral-800">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        {feature.icon}
                                        <span className="leading-snug text-left">{feature.text}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-8 border-t border-black/10 mt-auto text-left">
                                <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-500 mb-3">
                                    Ideal For:
                                </div>
                                <div className="text-sm font-bold text-deep-black leading-relaxed whitespace-pre-line">
                                    {plan.idealFor}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={stagger(0.15)}
                    className="mt-20 sm:mt-32 flex flex-col items-center text-center relative"
                >
                    <div className="absolute top-0 right-0 lg:-right-10 origin-bottom-right -rotate-90 hidden lg:block text-[9px] font-bold tracking-[0.15em] text-neutral-400 uppercase w-[500px] text-right">
                        *AD SPEND, INFLUENCER FEES AND PRODUCTION COSTS ARE SEPARATE.
                    </div>

                    <motion.div variants={fadeUp} className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">
                        Don't just post.
                    </motion.div>
                    <motion.h2 variants={fadeUp} className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-deep-black mb-6">
                        Build a presence.
                    </motion.h2>
                    <motion.div variants={fadeUp} className="flex flex-col items-center mb-10">
                        <div className="font-display text-xl sm:text-2xl font-bold tracking-[0.3em] uppercase text-deep-black mb-2 flex items-center">
                            Elvora <span className="text-luxury-gold mx-2 text-sm">×</span> Media
                        </div>
                        <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                            Strategy × Creativity × Growth
                        </div>
                    </motion.div>

                    <motion.a
                        variants={fadeUp}
                        href={dmLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-wrap justify-center items-center gap-4 bg-deep-black text-white px-8 py-4 rounded-full shadow-2xl hover:bg-neutral-800 transition-all hover:scale-105"
                    >
                        <span className="font-mono text-sm font-bold uppercase tracking-wider">
                            DM "GROW"
                        </span>
                        <span className="text-xs font-medium opacity-80">FOR A CUSTOM PROPOSAL</span>
                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1 text-luxury-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </motion.a>

                    <div className="mt-12 lg:hidden text-[9px] font-bold tracking-[0.15em] text-neutral-400 uppercase">
                        *AD SPEND, INFLUENCER FEES AND PRODUCTION COSTS ARE SEPARATE.
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
