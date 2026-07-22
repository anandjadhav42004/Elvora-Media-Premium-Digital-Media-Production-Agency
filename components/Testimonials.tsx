"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "./Container";
import { fadeUp, stagger } from "@/lib/motion";

type Testimonial = {
    id: string;
    quote: string;
    author: string;
    role: string;
    company: string;
    metricBadge: string;
    imageSrc: string;
};

const TESTIMONIALS: Testimonial[] = [
    {
        id: "1",
        quote: "Elvora Media transformed our brand presence completely. Their content strategy and video production brought us high-ticket clients we couldn't reach before.",
        author: "Somya Patel",
        role: "Founder & Director",
        company: "Sculptura",
        metricBadge: "+280% Revenue Growth",
        imageSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    },
    {
        id: "2",
        quote: "The speed and visual standard of their editing team is unmatched. Every single video cut feels premium, sharp, and algorithm-optimized.",
        author: "Rohan Verma",
        role: "Managing Partner",
        company: "WeCrafted Media",
        metricBadge: "3.4M Organic Views",
        imageSrc: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
    },
];

export function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
    };

    const current = TESTIMONIALS[currentIndex];

    return (
        <section className="py-16 sm:py-24 bg-white border-y border-black/10 overflow-hidden">
            <Container>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={stagger(0.12)}
                    className="flex flex-col items-center text-center"
                >
                    <motion.span variants={fadeUp} className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-luxury-gold">
                        Client Testimonials
                    </motion.span>
                    <motion.h2 variants={fadeUp} className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-deep-black sm:text-5xl">
                        What Industry Leaders Say
                    </motion.h2>

                    {/* Active Testimonial Card */}
                    <div className="mt-12 w-full max-w-4xl">
                        <motion.div
                            key={current.id}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragEnd={(_, info) => {
                                if (info.offset.x < -50) nextSlide();
                                if (info.offset.x > 50) prevSlide();
                            }}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="relative cursor-grab active:cursor-grabbing flex flex-col items-center rounded-3xl border border-black/10 bg-[#faf7f0] p-8 sm:p-12 shadow-sm"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 text-luxury-gold text-lg">
                                {"★".repeat(5)}
                            </div>

                            {/* Quote */}
                            <p className="mt-6 font-serif text-lg italic leading-relaxed text-neutral-800 sm:text-2xl">
                                &ldquo;{current.quote}&rdquo;
                            </p>

                            {/* Author details */}
                            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
                                <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-luxury-gold">
                                    <Image
                                        src={current.imageSrc}
                                        alt={current.author}
                                        fill
                                        sizes="56px"
                                        className="object-cover"
                                    />
                                </div>
                                <div className="text-center sm:text-left">
                                    <h4 className="font-display text-base font-bold text-deep-black">
                                        {current.author}
                                    </h4>
                                    <p className="font-mono text-xs uppercase tracking-wider text-neutral-500">
                                        {current.role} &middot; <span className="text-luxury-gold font-semibold">{current.company}</span>
                                    </p>
                                </div>
                                <div className="sm:ml-4 rounded-full bg-deep-black px-3.5 py-1 text-xs font-semibold text-luxury-gold">
                                    {current.metricBadge}
                                </div>
                            </div>
                        </motion.div>

                        {/* Navigation controls */}
                        <div className="mt-6 flex items-center justify-center gap-4">
                            <button
                                type="button"
                                onClick={prevSlide}
                                aria-label="Previous testimonial"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-neutral-800 transition-colors hover:border-luxury-gold hover:text-luxury-gold focus:outline-none"
                            >
                                &larr;
                            </button>
                            <div className="flex gap-2">
                                {TESTIMONIALS.map((_, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => setCurrentIndex(idx)}
                                        aria-label={`Go to slide ${idx + 1}`}
                                        className={`h-2 rounded-full transition-all ${
                                            idx === currentIndex ? "w-6 bg-luxury-gold" : "w-2 bg-neutral-300"
                                        }`}
                                    />
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={nextSlide}
                                aria-label="Next testimonial"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-neutral-800 transition-colors hover:border-luxury-gold hover:text-luxury-gold focus:outline-none"
                            >
                                &rarr;
                            </button>
                        </div>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
