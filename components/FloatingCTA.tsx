"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { buildCustomWhatsAppLink } from "@/lib/whatsapp";

export function FloatingCTA() {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (isDismissed) return null;

    const whatsappUrl = buildCustomWhatsAppLink(
        "Hi Elvora Media, I'd like to book a strategy call for my brand."
    );

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="fixed bottom-6 right-6 z-40 flex min-h-[44px] items-center gap-3 rounded-full border border-white/10 bg-[#111111] p-1.5 pl-5 pr-2 text-white shadow-xl max-sm:bottom-4 max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:right-auto max-sm:w-max"
                >
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors hover:text-[#B8955A] py-1"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Book Strategy Call</span>
                        <span className="text-[#B8955A]">↗</span>
                    </a>
                    <button
                        type="button"
                        onClick={() => setIsDismissed(true)}
                        aria-label="Dismiss strategy call button"
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-neutral-400 transition-colors hover:bg-white/20 hover:text-white"
                    >
                        &times;
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
