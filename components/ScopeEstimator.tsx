"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "./Container";
import { fadeUp, stagger } from "@/lib/motion";
import { buildCustomWhatsAppLink } from "@/lib/whatsapp";

const SERVICES_OPTIONS = [
    { id: "branding", title: "Branding & Visual Identity", desc: "Logo, brand guidelines & positioning" },
    { id: "video", title: "Video Production & Editing", desc: "Shorts, ads, reels & showreels" },
    { id: "social", title: "Social Media Management", desc: "Content creation, scheduling & growth" },
    { id: "ads", title: "Performance Ads & Strategy", desc: "Meta/Google ads with ROI focus" },
    { id: "full", title: "Full Agency Retainer", desc: "Complete end-to-end media partnership" },
];

const TIMELINE_OPTIONS = [
    { id: "urgent", title: "Urgent (Within 2 Weeks)" },
    { id: "standard", title: "Standard (1 Month)" },
    { id: "flexible", title: "Flexible / Planning" },
];

const BUDGET_OPTIONS = [
    { id: "starter", title: "₹50k - ₹1.5L", desc: "Single focused project" },
    { id: "growth", title: "₹1.5L - ₹4L", desc: "Multi-channel campaign" },
    { id: "scale", title: "₹4L+", desc: "Full brand transformation" },
];

export function ScopeEstimator() {
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState(SERVICES_OPTIONS[0]);
    const [selectedTimeline, setSelectedTimeline] = useState(TIMELINE_OPTIONS[1]);
    const [selectedBudget, setSelectedBudget] = useState(BUDGET_OPTIONS[1]);

    const generatedMessage = `Hi Elvora Media, I'm interested in ${selectedService.title} with a ${selectedTimeline.title} timeline and budget of ${selectedBudget.title}. Let's discuss!`;
    const whatsappLink = buildCustomWhatsAppLink(generatedMessage);

    return (
        <section id="estimator" className="py-16 sm:py-24 bg-[#faf7f0]">
            <Container>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={stagger(0.12)}
                    className="mx-auto max-w-4xl rounded-3xl border border-black/10 bg-white p-6 sm:p-12 shadow-xl"
                >
                    <motion.div variants={fadeUp} className="text-center">
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-luxury-gold">
                            Interactive Project Wizard
                        </span>
                        <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-deep-black sm:text-4xl">
                            Estimate Your Scope & Launch
                        </h2>
                        <p className="mt-2 text-sm text-neutral-800 font-medium">
                            Configure your project goals in 3 simple steps to get an instant tailored inquiry setup.
                        </p>
                    </motion.div>

                    {/* Step indicator */}
                    <div className="mt-8 flex justify-center gap-2">
                        {[1, 2, 3].map((num) => (
                            <button
                                key={num}
                                type="button"
                                onClick={() => setStep(num)}
                                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                                    step === num
                                        ? "bg-deep-black text-ivory-cream ring-2 ring-luxury-gold"
                                        : step > num
                                        ? "bg-luxury-gold text-deep-black"
                                        : "bg-neutral-200 text-neutral-700"
                                }`}
                            >
                                {step > num ? "✓" : num}
                            </button>
                        ))}
                    </div>

                    {/* Step Content */}
                    <div className="mt-10">
                        {step === 1 && (
                            <div className="space-y-4">
                                <h3 className="font-display text-lg font-bold text-deep-black">
                                    Step 1: Select Primary Service
                                </h3>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {SERVICES_OPTIONS.map((opt) => (
                                        <button
                                            key={opt.id}
                                            type="button"
                                            onClick={() => setSelectedService(opt)}
                                            className={`flex flex-col text-left p-4 rounded-2xl border transition-all duration-300 ${
                                                selectedService.id === opt.id
                                                    ? "border-luxury-gold bg-luxury-gold/10 shadow-md"
                                                    : "border-black/15 bg-neutral-50 hover:border-black/30"
                                            }`}
                                        >
                                            <span className="font-display text-sm font-bold text-deep-black">{opt.title}</span>
                                            <span className="font-mono text-xs text-neutral-700 font-medium mt-1">{opt.desc}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-4">
                                <h3 className="font-display text-lg font-bold text-deep-black">
                                    Step 2: Select Project Timeline
                                </h3>
                                <div className="grid gap-3 sm:grid-cols-3">
                                    {TIMELINE_OPTIONS.map((opt) => (
                                        <button
                                            key={opt.id}
                                            type="button"
                                            onClick={() => setSelectedTimeline(opt)}
                                            className={`flex flex-col items-center justify-center text-center p-5 rounded-2xl border transition-all duration-300 ${
                                                selectedTimeline.id === opt.id
                                                    ? "border-luxury-gold bg-luxury-gold/10 shadow-md"
                                                    : "border-black/15 bg-neutral-50 hover:border-black/30"
                                            }`}
                                        >
                                            <span className="font-display text-sm font-bold text-deep-black">{opt.title}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-4">
                                <h3 className="font-display text-lg font-bold text-deep-black">
                                    Step 3: Select Estimated Investment
                                </h3>
                                <div className="grid gap-3 sm:grid-cols-3">
                                    {BUDGET_OPTIONS.map((opt) => (
                                        <button
                                            key={opt.id}
                                            type="button"
                                            onClick={() => setSelectedBudget(opt)}
                                            className={`flex flex-col text-left p-4 rounded-2xl border transition-all duration-300 ${
                                                selectedBudget.id === opt.id
                                                    ? "border-luxury-gold bg-luxury-gold/10 shadow-md"
                                                    : "border-black/15 bg-neutral-50 hover:border-black/30"
                                            }`}
                                        >
                                            <span className="font-display text-base font-bold text-luxury-gold">{opt.title}</span>
                                            <span className="font-mono text-xs text-neutral-700 font-medium mt-1">{opt.desc}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Controls & Output */}
                    <div className="mt-10 flex flex-col items-center justify-between border-t border-black/10 pt-6 sm:flex-row">
                        <div className="flex gap-3">
                            {step > 1 && (
                                <button
                                    type="button"
                                    onClick={() => setStep(step - 1)}
                                    className="rounded-full border border-black/20 px-5 py-2 text-xs font-semibold uppercase text-deep-black transition-colors hover:bg-neutral-100"
                                >
                                    &larr; Back
                                </button>
                            )}
                            {step < 3 && (
                                <button
                                    type="button"
                                    onClick={() => setStep(step + 1)}
                                    className="rounded-full bg-deep-black px-6 py-2 text-xs font-semibold uppercase text-ivory-cream transition-transform hover:scale-105"
                                >
                                    Next Step &rarr;
                                </button>
                            )}
                        </div>

                        {step === 3 && (
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 sm:mt-0 flex items-center gap-3 rounded-full bg-[linear-gradient(90deg,#b58c56,#e0c38a,#b58c56)] py-3 px-8 text-sm font-bold text-deep-black shadow-lg transition-transform hover:scale-105"
                            >
                                Book Call With This Estimate 💬 &rarr;
                            </a>
                        )}
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
