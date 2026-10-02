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
                    className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border border-luxury-gold/40 bg-deep-black/95 p-1.5 pl-5 pr-2.5 text-ivory-cream shadow-2xl backdrop-blur-md max-sm:bottom-4 max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:right-auto max-sm:w-max"
                >
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-luxury-gold transition-colors hover:text-white"
                    >
                        <span>Book Strategy Call 💬</span>
                    </a>
                    <button
                        type="button"
                        onClick={() => setIsDismissed(true)}
                        aria-label="Dismiss strategy call button"
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-neutral-400 transition-colors hover:bg-white/20 hover:text-white"
                    >
                        &times;
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
