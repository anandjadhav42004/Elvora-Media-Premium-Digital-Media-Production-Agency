"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

export function ClientMarquee() {
    return (
        <section className="relative overflow-hidden border-y border-black/10 bg-[#faf7f0] py-8 sm:py-12">
            <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={stagger(0.1)}
                >
                    <motion.span
                        variants={fadeUp}
                        className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-neutral-800"
                    >
                        Trusted by High-Growth Brands &amp; Leaders
                    </motion.span>
                </motion.div>
            </div>
        </section>
    );
}
