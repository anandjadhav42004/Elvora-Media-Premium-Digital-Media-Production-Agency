"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

const EDITORIAL_TAGS = [
    "COMMERCIAL PRODUCTION",
    "BRAND IDENTITY",
    "FESTIVE CAMPAIGNS",
    "CINEMATIC COLOR SCIENCE",
    "PERFORMANCE MEDIA",
    "DOCUMENTARY DIRECTION",
    "SOCIAL-FIRST GROWTH",
    "MOTION & 3D DESIGN",
];

export function ClientMarquee() {
    return (
        <section className="relative overflow-hidden border-b border-black/[0.08] bg-neutral-50/50 py-6 sm:py-8">
            <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8 mb-4">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={stagger(0.1)}
                    className="flex items-center justify-center gap-3"
                >
                    <span className="h-[1px] w-8 bg-black/20" />
                    <motion.span
                        variants={fadeUp}
                        className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500"
                    >
                        Bespoke Creative Capabilities &middot; Season 2026
                    </motion.span>
                    <span className="h-[1px] w-8 bg-black/20" />
                </motion.div>
            </div>

            {/* Seamless Infinite Editorial Marquee */}
            <div className="relative flex w-full overflow-hidden select-none py-2">
                <motion.div
                    className="flex shrink-0 items-center gap-8 whitespace-nowrap"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {[...EDITORIAL_TAGS, ...EDITORIAL_TAGS].map((tag, idx) => (
                        <div key={idx} className="flex items-center gap-8">
                            <span className="font-display text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-neutral-800 hover:text-black transition-colors">
                                {tag}
                            </span>
                            <span className="text-luxury-gold text-xs">✦</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
