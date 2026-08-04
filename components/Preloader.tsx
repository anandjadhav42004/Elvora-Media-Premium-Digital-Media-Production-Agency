"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Prevent scrolling while loading
        document.body.style.overflow = "hidden";
        
        const timer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "";
        }, 2200); // 2.2 seconds loading animation

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="preloader"
                    initial={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-deep-black text-ivory-cream"
                >
                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: 150, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
                            className="font-display text-[clamp(4rem,15vw,12rem)] uppercase leading-[0.85] tracking-[-0.02em]"
                        >
                            Elvora
                        </motion.h1>
                    </div>
                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: 150, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.3 }}
                            className="font-display text-[clamp(4rem,15vw,12rem)] uppercase leading-[0.85] tracking-[-0.02em] text-luxury-gold"
                        >
                            Media
                        </motion.h1>
                    </div>

                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.6 }}
                        className="absolute bottom-12 h-[2px] w-48 bg-luxury-gold sm:w-64"
                        style={{ transformOrigin: "left" }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
