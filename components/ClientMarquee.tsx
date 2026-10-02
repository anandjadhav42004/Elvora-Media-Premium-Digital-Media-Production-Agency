"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

const TAGS = [
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
        <section className="relative overflow-hidden border-b border-black/[0.07] bg-[#F7F6F2] py-5 sm:py-7">
            <div className="mx-auto max-w-[1440px] px-5 text-center mb-4">
                <motion.p
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={fadeUp}
                    className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-[#6F6F6A]"
                >
                    Bespoke Creative Capabilities &middot; Season 2026
                </motion.p>
            </div>

            {/* Infinite marquee */}
            <div className="relative flex w-full overflow-hidden select-none py-2">
                <motion.div
                    className="flex shrink-0 items-center gap-10 whitespace-nowrap"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                >
                    {[...TAGS, ...TAGS].map((tag, idx) => (
                        <div key={idx} className="flex items-center gap-10">
                            <span className="font-display text-sm font-bold uppercase tracking-[0.18em] text-[#111111]">
                                {tag}
                            </span>
                            <span className="text-[#6F6F6A] text-xs">✦</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
