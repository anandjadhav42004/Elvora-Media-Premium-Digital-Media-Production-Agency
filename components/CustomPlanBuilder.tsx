"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "./Container";
import { fadeUp, stagger } from "@/lib/motion";
import { buildCustomWhatsAppLink } from "@/lib/whatsapp";
import { MagneticWrapper } from "./MagneticWrapper";

const AVAILABLE_SERVICES = [
    { id: "smm", name: "Social Media Management", minPrice: 20000, maxPrice: 40000 },
    { id: "reels", name: "Reels / Short-Form Video", minPrice: 15000, maxPrice: 30000 },
    { id: "ads", name: "Performance Ads (Meta/Google)", minPrice: 20000, maxPrice: 50000 },
    { id: "strategy", name: "Brand Strategy & Positioning", minPrice: 25000, maxPrice: 60000 },
    { id: "shoot", name: "Professional Content Shoot", minPrice: 30000, maxPrice: 80000 },
    { id: "influencer", name: "Influencer Marketing", minPrice: 15000, maxPrice: 45000 },
];

const CheckIcon = () => (
    <svg className="w-3.5 h-3.5 text-deep-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

export function CustomPlanBuilder() {
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [timeline, setTimeline] = useState("Standard (1 Month)");

    const toggleService = (id: string) => {
        setSelectedServices(prev => 
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    // Calculate dynamic budget based on selected services
    const selectedItems = AVAILABLE_SERVICES.filter(s => selectedServices.includes(s.id));
    const totalMin = selectedItems.reduce((acc, curr) => acc + curr.minPrice, 0);
    const totalMax = selectedItems.reduce((acc, curr) => acc + curr.maxPrice, 0);

    const formatCurrency = (val: number) => {
        if (val === 0) return "₹0";
        if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
        if (val >= 1000) return `₹${(val / 1000).toFixed(0)}K`;
        return `₹${val}`;
    };

    const isReady = selectedServices.length > 0;

    const handleBuildPlan = () => {
        const serviceNames = selectedItems.map(s => s.name).join(", ");
        const estimatedBudget = `${formatCurrency(totalMin)} - ${formatCurrency(totalMax)}`;
        const msg = `Hi Elvora Media, I've built a custom plan!\n\nServices: ${serviceNames}\nTimeline: ${timeline}\nEstimated Budget: ${estimatedBudget}\n\nLet's discuss!`;
        window.open(buildCustomWhatsAppLink(msg), "_blank");
    };

    return (
        <section className="py-24 sm:py-32 bg-white relative overflow-hidden border-t border-black/5">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
                    {/* Left: Configuration */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={stagger(0.1)}
                    >
                        <motion.div variants={fadeUp}>
                            <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-luxury-gold mb-3">
                                Create Your Own
                            </div>
                            <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-deep-black mb-6">
                                Custom Package Builder
                            </h2>
                            <p className="text-sm sm:text-base font-medium text-neutral-600 mb-10 max-w-md">
                                Don't see a plan that fits exactly? Select the specific services you need and instantly get a tailored estimate.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeUp} className="mb-10">
                            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-deep-black mb-4 flex items-center gap-2">
                                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-black/5 text-[9px]">01</span>
                                Select Services
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {AVAILABLE_SERVICES.map(service => {
                                    const isSelected = selectedServices.includes(service.id);
                                    return (
                                        <button
                                            key={service.id}
                                            onClick={() => toggleService(service.id)}
                                            className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-300 group ${
                                                isSelected 
                                                ? "border-luxury-gold bg-luxury-gold/5" 
                                                : "border-black/10 bg-neutral-50 hover:border-black/30 hover:bg-white"
                                            }`}
                                        >
                                            <div className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border transition-colors ${
                                                isSelected ? "bg-luxury-gold border-luxury-gold" : "border-black/20 group-hover:border-black/40"
                                            }`}>
                                                {isSelected && <CheckIcon />}
                                            </div>
                                            <span className={`text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-deep-black' : 'text-neutral-600 group-hover:text-deep-black'}`}>
                                                {service.name}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>

                        <motion.div variants={fadeUp}>
                            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-deep-black mb-4 flex items-center gap-2">
                                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-black/5 text-[9px]">02</span>
                                Expected Timeline
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {["Urgent (2-3 Weeks)", "Standard (1 Month)", "Flexible"].map(t => (
                                    <button
                                        key={t}
                                        onClick={() => setTimeline(t)}
                                        className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors border ${
                                            timeline === t
                                            ? "bg-deep-black text-white border-deep-black"
                                            : "bg-white text-neutral-600 border-black/10 hover:border-black/30"
                                        }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right: Estimate Summary Sticky Card */}
                    <div className="lg:sticky lg:top-32 h-auto relative">
                        {/* Decorative background element */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(181,140,86,0.1),transparent_50%)] rounded-[2rem] pointer-events-none" />
                        
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                            className="bg-deep-black text-white p-8 sm:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden"
                        >
                            <div className="font-script text-3xl text-luxury-gold mb-6">
                                Your Estimate
                            </div>

                            <div className="min-h-[150px]">
                                <AnimatePresence mode="wait">
                                    {isReady ? (
                                        <motion.div 
                                            key="has-items"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-2">
                                                Estimated Range
                                            </div>
                                            <div className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mb-8">
                                                {formatCurrency(totalMin)} - {formatCurrency(totalMax)}
                                            </div>

                                            <div className="space-y-3 mb-8">
                                                {selectedItems.map(item => (
                                                    <div key={item.id} className="flex justify-between items-center text-xs font-medium text-neutral-300 border-b border-white/10 pb-3">
                                                        <span>{item.name}</span>
                                                        <span className="text-luxury-gold">Included</span>
                                                    </div>
                                                ))}
                                                <div className="flex justify-between items-center text-xs font-medium text-neutral-300 border-b border-white/10 pb-3">
                                                    <span>Timeline</span>
                                                    <span className="text-white font-bold">{timeline}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div 
                                            key="empty"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex flex-col items-center justify-center h-full text-center py-10"
                                        >
                                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                                <span className="text-xl">✨</span>
                                            </div>
                                            <div className="text-sm font-medium text-neutral-400">
                                                Select services on the left to instantly build your tailored package and calculate an estimated budget.
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <MagneticWrapper className="w-full mt-4" strength={30}>
                                <button
                                    onClick={handleBuildPlan}
                                    disabled={!isReady}
                                    className={`w-full py-4 rounded-full font-mono text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                                        isReady
                                        ? "bg-luxury-gold text-deep-black hover:bg-white shadow-[0_0_20px_rgba(181,140,86,0.3)] hover:scale-[1.02]"
                                        : "bg-white/10 text-white/40 cursor-not-allowed"
                                    }`}
                                >
                                    {isReady ? "Submit Custom Proposal →" : "Awaiting Selections"}
                                </button>
                            </MagneticWrapper>
                        </motion.div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
