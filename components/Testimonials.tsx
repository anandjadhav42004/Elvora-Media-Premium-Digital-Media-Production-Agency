"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
        quote: "The speed and visual standard of their editing team is unmatched. Every single video cut feels premium, sharp, and algorithm-optimized.",
        author: "Shreevardhan Rathore",
        role: "Managing Director",
        company: "Elvora Media",
        metricBadge: "3.4M Organic Views",
        imageSrc: "/IMG-20260702-WA0000.jpg.jpeg",
    },
    {
        id: "2",
        quote: "Elvora transformed our brand presence entirely. The cinematic quality of the content they produce is on par with international campaigns.",
        author: "Daksh Chandgaonkar",
        role: "Creative Director",
        company: "Elvora Media",
        metricBadge: "2× Revenue Growth",
        imageSrc: "/daksh-chandgaonkar.jpg",
    },
    {
        id: "3",
        quote: "From concept to final delivery, the entire process was seamless and the output was spectacular. Our audience engagement tripled in 60 days.",
        author: "Yash Borate",
        role: "Finance & Marketing",
        company: "Elvora Media",
        metricBadge: "3× Engagement",
        imageSrc: "/IMG-20260528-WA0013.jpg.jpeg",
    },
];

export function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
    };

    // Auto-advance
    useEffect(() => {
        const t = setTimeout(() => nextSlide(), 6000);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex]);

    const current = TESTIMONIALS[currentIndex];

    const variants = {
        enter: (d: number) => ({ opacity: 0, x: d * 40, scale: 0.97 }),
        center: { opacity: 1, x: 0, scale: 1 },
        exit: (d: number) => ({ opacity: 0, x: d * -40, scale: 0.97 }),
    };

    return (
        <section className="py-20 sm:py-32 bg-[#0a0a0a] relative overflow-hidden">
            {/* Subtle radial glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(179,138,75,0.07), transparent 70%)",
                }}
            />

            <Container>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={stagger(0.1)}
                    className="flex flex-col items-center text-center"
                >
                    {/* Label */}
                    <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
                        <span className="h-px w-10 bg-luxury-gold/50" />
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-luxury-gold">
                            Client Voice
                        </span>
                        <span className="h-px w-10 bg-luxury-gold/50" />
                    </motion.div>

                    <motion.h2
                        variants={fadeUp}
                        className="font-display text-4xl font-extrabold uppercase tracking-tight text-white sm:text-6xl"
                    >
                        What Our Clients{" "}
                        <span className="font-serif italic font-normal text-luxury-gold">Say</span>
                    </motion.h2>

                    {/* Testimonial Carousel */}
                    <motion.div variants={fadeUp} className="mt-16 w-full max-w-3xl relative">
                        {/* Large decorative quote mark */}
                        <span
                            aria-hidden="true"
                            className="absolute -top-8 left-0 font-serif text-[7rem] leading-none text-luxury-gold/10 select-none pointer-events-none"
                        >
                            &ldquo;
                        </span>

                        <div
                            className="relative overflow-hidden"
                            onMouseEnter={() => {/* pause auto-advance on hover handled by effect cleanup */}}
                        >
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={current.id}
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    onDragEnd={(_, info) => {
                                        if (info.offset.x < -50) nextSlide();
                                        if (info.offset.x > 50) prevSlide();
                                    }}
                                    className="cursor-grab active:cursor-grabbing"
                                >
                                    {/* Stars */}
                                    <div className="flex justify-center gap-1.5 text-luxury-gold text-base mb-8">
                                        {"★".repeat(5)}
                                    </div>

                                    {/* Quote */}
                                    <p className="font-serif text-xl italic leading-relaxed text-white/90 sm:text-2xl md:text-3xl font-medium">
                                        &ldquo;{current.quote}&rdquo;
                                    </p>

                                    {/* Author Row */}
                                    <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-5">
                                        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full border border-luxury-gold/40">
                                            <Image
                                                src={current.imageSrc}
                                                alt={current.author}
                                                fill
                                                sizes="56px"
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="text-center sm:text-left">
                                            <h4 className="font-display text-base font-bold uppercase tracking-wider text-white">
                                                {current.author}
                                            </h4>
                                            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 mt-0.5">
                                                {current.role} &middot;{" "}
                                                <span className="text-luxury-gold">{current.company}</span>
                                            </p>
                                        </div>

                                        {/* Metric badge */}
                                        <div className="sm:ml-2 flex-shrink-0 rounded-full border border-luxury-gold/30 bg-luxury-gold/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-luxury-gold">
                                            {current.metricBadge}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Navigation */}
                        <div className="mt-10 flex items-center justify-center gap-5">
                            <button
                                type="button"
                                onClick={prevSlide}
                                aria-label="Previous testimonial"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-luxury-gold hover:text-luxury-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-luxury-gold"
                            >
                                ←
                            </button>

                            <div className="flex gap-2">
                                {TESTIMONIALS.map((_, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => { setDirection(idx > currentIndex ? 1 : -1); setCurrentIndex(idx); }}
                                        aria-label={`Go to slide ${idx + 1}`}
                                        className={`h-1.5 rounded-full transition-all duration-400 ${
                                            idx === currentIndex
                                                ? "w-8 bg-luxury-gold"
                                                : "w-1.5 bg-white/20 hover:bg-white/40"
                                        }`}
                                    />
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={nextSlide}
                                aria-label="Next testimonial"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-luxury-gold hover:text-luxury-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-luxury-gold"
                            >
                                →
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
