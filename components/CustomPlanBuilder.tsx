"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "./Container";
import { fadeUp, stagger } from "@/lib/motion";
import { buildCustomWhatsAppLink } from "@/lib/whatsapp";

type Deliverable = {
    id: string;
    name: string;
    description: string;
    minPrice: number;
    maxPrice: number;
};

type AddOn = {
    id: string;
    name: string;
    price: number;
};

const DELIVERABLES: Deliverable[] = [
    { id: "commercial-film", name: "Commercial 4K Brand Film", description: "TVC-grade cinematography, full lighting, custom score", minPrice: 40000, maxPrice: 90000 },
    { id: "reels-package", name: "High-Retention Reels Package", description: "8-12 short-form cuts engineered for 2-second hook retention", minPrice: 25000, maxPrice: 45000 },
    { id: "brand-identity", name: "Luxury Visual Identity & Direction", description: "Typography, color science, guidelines, social grid", minPrice: 30000, maxPrice: 60000 },
    { id: "social-retainer", name: "Full Social Growth Retainer", description: "End-to-end production, daily stories, community growth", minPrice: 50000, maxPrice: 85000 },
    { id: "performance-ads", name: "Performance Ad Creatives", description: "Direct-response hooks, multi-angle A/B test variations", minPrice: 25000, maxPrice: 50000 },
];

const TIMELINES = [
    { id: "urgent", name: "Urgent (2–3 Weeks)", multiplier: 1.15 },
    { id: "standard", name: "Standard (1 Month)", multiplier: 1.0 },
    { id: "flexible", name: "Multi-Month / Retainer", multiplier: 0.95 },
];

const ADD_ONS: AddOn[] = [
    { id: "drone", name: "Cinema 4K Drone Aerials", price: 15000 },
    { id: "actors", name: "Professional Model & Actor Casting", price: 20000 },
    { id: "studio", name: "Studio & Lighting Set Architecture", price: 18000 },
    { id: "sound", name: "Custom Sound Design & Original Score", price: 12000 },
    { id: "ad-variations", name: "5x Additional Ad Hook Cuts", price: 10000 },
];

const CheckIcon = () => (
    <svg className="w-3.5 h-3.5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

export function CustomPlanBuilder() {
    const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
    const [selectedDeliverables, setSelectedDeliverables] = useState<string[]>(["commercial-film"]);
    const [selectedTimeline, setSelectedTimeline] = useState<string>("Standard (1 Month)");
    const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

    const toggleDeliverable = (id: string) => {
        setSelectedDeliverables(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    const toggleAddOn = (id: string) => {
        setSelectedAddOns(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    // Calculations
    const chosenDeliverables = DELIVERABLES.filter(d => selectedDeliverables.includes(d.id));
    const chosenAddOns = ADD_ONS.filter(a => selectedAddOns.includes(a.id));

    const timelineObj = TIMELINES.find(t => t.name === selectedTimeline) || TIMELINES[1];
    const baseMin = chosenDeliverables.reduce((acc, curr) => acc + curr.minPrice, 0);
    const baseMax = chosenDeliverables.reduce((acc, curr) => acc + curr.maxPrice, 0);
    const addOnTotal = chosenAddOns.reduce((acc, curr) => acc + curr.price, 0);

    const totalMin = Math.round((baseMin * timelineObj.multiplier) + addOnTotal);
    const totalMax = Math.round((baseMax * timelineObj.multiplier) + addOnTotal);

    const formatCurrency = (val: number) => {
        if (val === 0) return "₹0";
        if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
        if (val >= 1000) return `₹${(val / 1000).toFixed(0)}K`;
        return `₹${val}`;
    };

    const canProceedFromStep1 = selectedDeliverables.length > 0;
    const canProceedFromStep2 = Boolean(selectedTimeline);

    const handleSendWhatsApp = () => {
        const deliverableNames = chosenDeliverables.map(d => d.name).join(", ");
        const addOnNames = chosenAddOns.length > 0 ? chosenAddOns.map(a => a.name).join(", ") : "None";
        const estimatedBudget = `${formatCurrency(totalMin)} – ${formatCurrency(totalMax)}`;

        const msg = `Hi Elvora Media, I've configured a custom production scope!\n\n` +
            `• Deliverable(s): ${deliverableNames}\n` +
            `• Timeline: ${selectedTimeline}\n` +
            `• Add-Ons: ${addOnNames}\n` +
            `• Estimated Investment: ${estimatedBudget}\n\n` +
            `Let's discuss scheduling and next steps!`;

        window.open(buildCustomWhatsAppLink(msg), "_blank");
    };

    return (
        <section id="estimator" className="py-20 sm:py-32 bg-white relative overflow-hidden border-b border-black/[0.06]">
            <Container>
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={stagger(0.08)}
                    className="max-w-3xl mb-12"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <span className="font-mono text-[10px] font-bold tracking-[0.25em] text-neutral-400 uppercase">
                            [ 06 &middot; Scope Configurator ]
                        </span>
                    </div>
                    <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-deep-black">
                        Custom Plan Builder. <span className="font-serif italic font-normal text-luxury-gold">Bespoke Production.</span>
                    </h2>
                    <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed max-w-xl">
                        Design an exact production scope tailored to your brand&apos;s requirements. Select deliverables, turnaround speed, and production add-ons.
                    </p>
                </motion.div>

                {/* 3-Step Wizard Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    {/* Left: Step Form (7 cols) */}
                    <div className="lg:col-span-7">
                        {/* Step Navigation Tabs */}
                        <div className="flex items-center gap-2 pb-6 border-b border-black/[0.08] mb-8 font-mono text-[10px] uppercase tracking-[0.2em]">
                            <button
                                type="button"
                                onClick={() => setCurrentStep(1)}
                                className={`px-4 py-2 border transition-all cursor-pointer ${
                                    currentStep === 1
                                        ? "border-black bg-black text-white font-bold"
                                        : "border-black/10 bg-neutral-50 text-neutral-600 hover:border-black/40"
                                }`}
                            >
                                01 &middot; Deliverable
                            </button>
                            <button
                                type="button"
                                onClick={() => canProceedFromStep1 && setCurrentStep(2)}
                                disabled={!canProceedFromStep1}
                                className={`px-4 py-2 border transition-all ${
                                    currentStep === 2
                                        ? "border-black bg-black text-white font-bold"
                                        : canProceedFromStep1
                                            ? "border-black/10 bg-neutral-50 text-neutral-600 hover:border-black/40 cursor-pointer"
                                            : "border-black/5 bg-neutral-100 text-neutral-300 cursor-not-allowed"
                                }`}
                            >
                                02 &middot; Timeline
                            </button>
                            <button
                                type="button"
                                onClick={() => canProceedFromStep1 && canProceedFromStep2 && setCurrentStep(3)}
                                disabled={!canProceedFromStep1 || !canProceedFromStep2}
                                className={`px-4 py-2 border transition-all ${
                                    currentStep === 3
                                        ? "border-black bg-black text-white font-bold"
                                        : canProceedFromStep1 && canProceedFromStep2
                                            ? "border-black/10 bg-neutral-50 text-neutral-600 hover:border-black/40 cursor-pointer"
                                            : "border-black/5 bg-neutral-100 text-neutral-300 cursor-not-allowed"
                                }`}
                            >
                                03 &middot; Add-Ons
                            </button>
                        </div>

                        {/* Step Content */}
                        <div className="min-h-[320px]">
                            {/* STEP 01: DELIVERABLE */}
                            {currentStep === 1 && (
                                <motion.div
                                    key="step-1"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.25 }}
                                    className="space-y-3"
                                >
                                    <div className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-4">
                                        Select primary deliverables (at least 1):
                                    </div>
                                    {DELIVERABLES.map(d => {
                                        const isSelected = selectedDeliverables.includes(d.id);
                                        return (
                                            <div
                                                key={d.id}
                                                onClick={() => toggleDeliverable(d.id)}
                                                className={`p-4 border transition-all cursor-pointer flex items-start gap-4 ${
                                                    isSelected
                                                        ? "border-black bg-neutral-50/80 shadow-sm"
                                                        : "border-black/[0.08] bg-white hover:border-black/30"
                                                }`}
                                            >
                                                <div className={`mt-0.5 w-4 h-4 flex items-center justify-center border transition-colors ${
                                                    isSelected ? "bg-black border-black text-white" : "border-black/20"
                                                }`}>
                                                    {isSelected && <CheckIcon />}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-display text-base font-bold uppercase tracking-tight text-deep-black">
                                                            {d.name}
                                                        </span>
                                                        <span className="font-mono text-xs text-neutral-500">
                                                            {formatCurrency(d.minPrice)}+
                                                        </span>
                                                    </div>
                                                    <p className="mt-1 text-xs text-neutral-500 font-normal">
                                                        {d.description}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    <div className="pt-6 flex justify-end">
                                        <button
                                            type="button"
                                            onClick={() => setCurrentStep(2)}
                                            disabled={!canProceedFromStep1}
                                            className={`px-7 py-3 text-[11px] font-mono font-bold uppercase tracking-[0.2em] border transition-all ${
                                                canProceedFromStep1
                                                    ? "bg-black text-white border-black hover:bg-neutral-800 cursor-pointer"
                                                    : "bg-neutral-200 text-neutral-400 border-neutral-200 cursor-not-allowed"
                                            }`}
                                        >
                                            Next: Step 02 &rarr;
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 02: TIMELINE */}
                            {currentStep === 2 && (
                                <motion.div
                                    key="step-2"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.25 }}
                                    className="space-y-4"
                                >
                                    <div className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-4">
                                        Select expected delivery timeline:
                                    </div>
                                    <div className="space-y-3">
                                        {TIMELINES.map(t => {
                                            const isSelected = selectedTimeline === t.name;
                                            return (
                                                <div
                                                    key={t.id}
                                                    onClick={() => setSelectedTimeline(t.name)}
                                                    className={`p-4 border transition-all cursor-pointer flex items-center justify-between ${
                                                        isSelected
                                                            ? "border-black bg-neutral-50/80 shadow-sm"
                                                            : "border-black/[0.08] bg-white hover:border-black/30"
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                                            isSelected ? "border-black bg-black" : "border-black/30"
                                                        }`}>
                                                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                                                        </div>
                                                        <span className="font-display text-base font-bold uppercase tracking-tight text-deep-black">
                                                            {t.name}
                                                        </span>
                                                    </div>
                                                    <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                                                        {t.id === "urgent" ? "Priority Studio Slot" : t.id === "standard" ? "Standard Turnaround" : "Dedicated Retainer Rate"}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="pt-6 flex justify-between">
                                        <button
                                            type="button"
                                            onClick={() => setCurrentStep(1)}
                                            className="px-6 py-3 text-[11px] font-mono font-bold uppercase tracking-[0.2em] border border-black/20 text-black hover:border-black cursor-pointer"
                                        >
                                            &larr; Back
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setCurrentStep(3)}
                                            disabled={!canProceedFromStep2}
                                            className={`px-7 py-3 text-[11px] font-mono font-bold uppercase tracking-[0.2em] border transition-all ${
                                                canProceedFromStep2
                                                    ? "bg-black text-white border-black hover:bg-neutral-800 cursor-pointer"
                                                    : "bg-neutral-200 text-neutral-400 border-neutral-200 cursor-not-allowed"
                                            }`}
                                        >
                                            Next: Step 03 &rarr;
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 03: ADD-ONS */}
                            {currentStep === 3 && (
                                <motion.div
                                    key="step-3"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.25 }}
                                    className="space-y-3"
                                >
                                    <div className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-4">
                                        Select production enhancements &amp; add-ons (optional):
                                    </div>
                                    {ADD_ONS.map(a => {
                                        const isSelected = selectedAddOns.includes(a.id);
                                        return (
                                            <div
                                                key={a.id}
                                                onClick={() => toggleAddOn(a.id)}
                                                className={`p-4 border transition-all cursor-pointer flex items-center justify-between ${
                                                    isSelected
                                                        ? "border-black bg-neutral-50/80 shadow-sm"
                                                        : "border-black/[0.08] bg-white hover:border-black/30"
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-4 h-4 flex items-center justify-center border transition-colors ${
                                                        isSelected ? "bg-black border-black text-white" : "border-black/20"
                                                    }`}>
                                                        {isSelected && <CheckIcon />}
                                                    </div>
                                                    <span className="font-display text-sm sm:text-base font-bold uppercase tracking-tight text-deep-black">
                                                        {a.name}
                                                    </span>
                                                </div>
                                                <span className="font-mono text-xs text-neutral-500">
                                                    +{formatCurrency(a.price)}
                                                </span>
                                            </div>
                                        );
                                    })}

                                    <div className="pt-6 flex justify-between">
                                        <button
                                            type="button"
                                            onClick={() => setCurrentStep(2)}
                                            className="px-6 py-3 text-[11px] font-mono font-bold uppercase tracking-[0.2em] border border-black/20 text-black hover:border-black cursor-pointer"
                                        >
                                            &larr; Back
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Right: Estimated Investment Card (5 cols) */}
                    <div className="lg:col-span-5 lg:sticky lg:top-24">
                        <div className="border border-black bg-neutral-950 text-white p-8 sm:p-10 shadow-2xl relative overflow-hidden">
                            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-luxury-gold mb-2">
                                Proposal Synthesis
                            </div>
                            <h3 className="font-display text-2xl uppercase tracking-tight text-white mb-6">
                                Estimated Investment
                            </h3>

                            {/* Price range */}
                            <div className="pb-6 border-b border-white/10 mb-6">
                                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400 block mb-1">
                                    Project Range
                                </span>
                                <div className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                                    {formatCurrency(totalMin)} &ndash; {formatCurrency(totalMax)}
                                </div>
                                <span className="font-mono text-[10px] text-neutral-400 block mt-1">
                                    Estimated studio commitment for selected scope
                                </span>
                            </div>

                            {/* Summary checklist */}
                            <div className="space-y-3 mb-8 text-xs font-mono">
                                <div className="flex justify-between items-center text-neutral-300 pb-2 border-b border-white/10">
                                    <span className="text-neutral-400">Deliverables ({chosenDeliverables.length})</span>
                                    <span className="text-white font-bold">{chosenDeliverables.length > 0 ? "Selected" : "None"}</span>
                                </div>
                                <div className="flex justify-between items-center text-neutral-300 pb-2 border-b border-white/10">
                                    <span className="text-neutral-400">Turnaround</span>
                                    <span className="text-white font-bold">{selectedTimeline}</span>
                                </div>
                                <div className="flex justify-between items-center text-neutral-300 pb-2 border-b border-white/10">
                                    <span className="text-neutral-400">Add-Ons ({chosenAddOns.length})</span>
                                    <span className="text-white font-bold">{chosenAddOns.length > 0 ? `+${chosenAddOns.length} Selected` : "None"}</span>
                                </div>
                            </div>

                            {/* Direct WhatsApp Action Button */}
                            <button
                                type="button"
                                onClick={handleSendWhatsApp}
                                disabled={!canProceedFromStep1}
                                className={`w-full py-4 text-center font-mono text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                                    canProceedFromStep1
                                        ? "bg-white text-black hover:bg-neutral-200 cursor-pointer shadow-lg"
                                        : "bg-white/10 text-white/40 cursor-not-allowed"
                                }`}
                            >
                                Send Scope on WhatsApp &rarr;
                            </button>

                            <p className="mt-3 text-[10px] font-mono text-neutral-500 text-center uppercase tracking-wider">
                                Direct connection with Director Suyash Mali
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
