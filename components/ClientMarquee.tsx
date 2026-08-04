"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

type ClientLogo = {
    name: string;
    tagline: string;
    symbol: string;
};

const CLIENT_LOGOS: ClientLogo[] = [
    { name: "Sculptura", tagline: "Luxury Wellness", symbol: "✦" },
    { name: "WeCrafted", tagline: "Digital Media", symbol: "❖" },
    { name: "Somsbliss", tagline: "Aesthetic Brand", symbol: "◈" },
    { name: "Verve Global", tagline: "E-Commerce", symbol: "▲" },
    { name: "Code Hostels", tagline: "Tech Living", symbol: "⬡" },
    { name: "The Engineers Club", tagline: "Developer Community", symbol: "⚡" },
    { name: "Nature One", tagline: "Fresh Produce Exporter", symbol: "🌿" },
];

export function ClientMarquee() {
    const [isHovered, setIsHovered] = useState(false);
    // Duplicate for seamless infinite looping
    const marqueeItems = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];

    return (
        <section className="relative overflow-hidden border-y border-black/10 bg-[#faf7f0] py-8 sm:py-12">
            <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={stagger(0.1)}
                    className="mb-6 sm:mb-8"
                >
                    <motion.span
                        variants={fadeUp}
                        className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-neutral-800"
                    >
                        Trusted by High-Growth Brands & Leaders
                    </motion.span>
                </motion.div>
            </div>

            {/* Gradient edge masks for smooth fade */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#faf7f0] to-transparent sm:w-32" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#faf7f0] to-transparent sm:w-32" />

            {/* Marquee Track */}
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group flex overflow-hidden select-none"
            >
                <motion.div
                    className="flex shrink-0 items-center gap-8 sm:gap-16 pr-8 sm:pr-16"
                    animate={isHovered ? {} : { x: ["0%", "-50%"] }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{ willChange: "transform" }}
                >
                    {marqueeItems.map((client, index) => (
                        <div
                            key={`${client.name}-${index}`}
                            className="group/item flex shrink-0 items-center gap-3 rounded-full border border-black/15 bg-white/80 px-5 py-2.5 backdrop-blur-xs transition-all duration-300 md:grayscale hover:border-luxury-gold/50 hover:bg-white hover:shadow-md hover:shadow-luxury-gold/10 hover:grayscale-0"
                        >
                            <span className="text-base text-luxury-gold transition-transform duration-300 group-hover/item:scale-125">
                                {client.symbol}
                            </span>
                            <div className="flex flex-col text-left">
                                <span className="font-display text-sm font-bold uppercase tracking-wider text-neutral-900 transition-colors duration-300 group-hover/item:text-black">
                                    {client.name}
                                </span>
                                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-700">
                                    {client.tagline}
                                </span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
