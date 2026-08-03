"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { buildCustomWhatsAppLink } from "@/lib/whatsapp";

type InquiryModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const SERVICES = [
    "Commercial Video Reel & Editing",
    "Luxury Visual Identity & Branding",
    "Performance Marketing & Ads",
    "Social Media Grid & Strategy",
    "Full-Scale Media Launch Campaign",
];

const BUDGET_RANGES = [
    "Under $2,000 / ₹1,50,000",
    "$2,000 - $5,000",
    "$5,000 - $10,000",
    "$10,000+",
];

function CloseIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
        </svg>
    );
}

export function InquiryModal({ isOpen, onClose }: InquiryModalProps) {
    const [name, setName] = useState("");
    const [service, setService] = useState(SERVICES[0]);
    const [budget, setBudget] = useState(BUDGET_RANGES[1]);
    const [message, setMessage] = useState("");
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const previousActiveElement = document.activeElement as HTMLElement | null;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
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
            modalRef.current?.querySelector<HTMLInputElement>("input")?.focus();
        }, 50);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKeyDown);
            previousActiveElement?.focus();
        };
    }, [isOpen, onClose]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formattedText = `Hi Elvora Media team!\n\nName: ${name || "Client"}\nInterested Service: ${service}\nTarget Budget: ${budget}\nProject Details: ${message || "Interested in starting a project."}`;

        const whatsappUrl = buildCustomWhatsAppLink(formattedText);
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="inquiry-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        ref={modalRef}
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 28 }}
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Start a Project - Elvora Media Quick Inquiry"
                        className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-black/10 text-deep-black"
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close modal"
                            className="absolute top-6 right-6 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-800 transition-colors hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                        >
                            <CloseIcon />
                        </button>

                        <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-luxury-gold">
                            Quick Project Inquiry
                        </div>
                        <h3 className="mt-1 font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-deep-black">
                            Start Your <span className="text-luxury-gold">Project</span>
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-neutral-700 font-medium leading-relaxed">
                            Fill out brief details below and connect directly with our production lead on WhatsApp.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                            <div>
                                <label htmlFor="inquiry-name" className="block font-mono text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                                    Your Name / Brand
                                </label>
                                <input
                                    id="inquiry-name"
                                    type="text"
                                    required
                                    placeholder="e.g. Alex Vance or Brand Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full rounded-xl border border-black/15 bg-[#faf7f0] px-4 py-2.5 text-sm text-deep-black placeholder-neutral-500 focus:border-luxury-gold focus:bg-white focus:outline-none focus:ring-2 focus:ring-luxury-gold/30 transition-colors"
                                />
                            </div>

                            <div>
                                <label htmlFor="inquiry-service" className="block font-mono text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                                    Service Needed
                                </label>
                                <select
                                    id="inquiry-service"
                                    value={service}
                                    onChange={(e) => setService(e.target.value)}
                                    className="w-full rounded-xl border border-black/15 bg-[#faf7f0] px-4 py-2.5 text-sm text-deep-black focus:border-luxury-gold focus:bg-white focus:outline-none focus:ring-2 focus:ring-luxury-gold/30 transition-colors"
                                >
                                    {SERVICES.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="inquiry-budget" className="block font-mono text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                                    Budget Range
                                </label>
                                <select
                                    id="inquiry-budget"
                                    value={budget}
                                    onChange={(e) => setBudget(e.target.value)}
                                    className="w-full rounded-xl border border-black/15 bg-[#faf7f0] px-4 py-2.5 text-sm text-deep-black focus:border-luxury-gold focus:bg-white focus:outline-none focus:ring-2 focus:ring-luxury-gold/30 transition-colors"
                                >
                                    {BUDGET_RANGES.map((b) => (
                                        <option key={b} value={b}>
                                            {b}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="inquiry-message" className="block font-mono text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                                    Project Brief & Goals
                                </label>
                                <textarea
                                    id="inquiry-message"
                                    rows={3}
                                    placeholder="Tell us a little about your project goals or timeline..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full rounded-xl border border-black/15 bg-[#faf7f0] px-4 py-2.5 text-sm text-deep-black placeholder-neutral-500 focus:border-luxury-gold focus:bg-white focus:outline-none focus:ring-2 focus:ring-luxury-gold/30 transition-colors resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="mt-2 w-full rounded-full bg-[linear-gradient(90deg,#b58c56,#e0c38a,#b58c56)] py-3.5 px-6 font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-deep-black shadow-lg transition-transform hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                            >
                                Send Inquiry to WhatsApp &rarr;
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
