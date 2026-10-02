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
    "₹30K - ₹50K (Base Plan)",
    "₹51K - ₹70K (Mid Plan)",
    "₹71K - ₹1L (Premium Plan)",
    "Custom / Enterprise",
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
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
                    onClick={onClose}
                >
                    <motion.div
                        ref={modalRef}
                        initial={{ scale: 0.98, opacity: 0, y: 12 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.98, opacity: 0, y: 12 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Start a Project - Elvora Media Quick Inquiry"
                        className="relative w-full max-h-[92dvh] overflow-y-auto max-w-lg rounded-xl bg-white p-5 sm:p-8 shadow-2xl border border-black/10 text-[#111111]"
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close modal"
                            className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-[#111111] transition-colors hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-black"
                        >
                            <CloseIcon />
                        </button>

                        <div className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#B8955A]">
                            Quick Project Inquiry
                        </div>
                        <h3 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#111111]">
                            Start Your <span className="font-serif italic font-normal text-[#B8955A]">Project</span>
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-[#6F6F6A] leading-relaxed">
                            Fill out brief details below and connect directly with our production lead on WhatsApp.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                            <div>
                                <label htmlFor="inquiry-name" className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#111111] mb-1">
                                    Your Name / Brand
                                </label>
                                <input
                                    id="inquiry-name"
                                    type="text"
                                    required
                                    placeholder="e.g. Alex Vance or Brand Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full border border-black/15 bg-[#F7F6F2] px-4 py-2.5 text-sm text-[#111111] placeholder-neutral-400 focus:border-black focus:bg-white focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                                />
                            </div>

                            <div>
                                <label htmlFor="inquiry-service" className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#111111] mb-1">
                                    Service Needed
                                </label>
                                <select
                                    id="inquiry-service"
                                    value={service}
                                    onChange={(e) => setService(e.target.value)}
                                    className="w-full border border-black/15 bg-[#F7F6F2] px-4 py-2.5 text-sm text-[#111111] focus:border-black focus:bg-white focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                                >
                                    {SERVICES.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="inquiry-budget" className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#111111] mb-1">
                                    Budget Range
                                </label>
                                <select
                                    id="inquiry-budget"
                                    value={budget}
                                    onChange={(e) => setBudget(e.target.value)}
                                    className="w-full border border-black/15 bg-[#F7F6F2] px-4 py-2.5 text-sm text-[#111111] focus:border-black focus:bg-white focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                                >
                                    {BUDGET_RANGES.map((b) => (
                                        <option key={b} value={b}>
                                            {b}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="inquiry-message" className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#111111] mb-1">
                                    Project Brief & Goals
                                </label>
                                <textarea
                                    id="inquiry-message"
                                    rows={3}
                                    placeholder="Tell us a little about your project goals or timeline..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full border border-black/15 bg-[#F7F6F2] px-4 py-2.5 text-sm text-[#111111] placeholder-neutral-400 focus:border-black focus:bg-white focus:outline-none focus:ring-1 focus:ring-black transition-colors resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="mt-2 w-full min-h-[44px] border border-black bg-black py-3.5 px-6 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
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
