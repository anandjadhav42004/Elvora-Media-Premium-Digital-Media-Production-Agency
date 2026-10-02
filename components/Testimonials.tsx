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
        metricBadge: "3.4M Views",
        imageSrc: "/IMG-20260702-WA0000.jpg.jpeg",
    },
    {
        id: "2",
        quote: "Elvora transformed our brand presence entirely. The cinematic quality of the content they produce is on par with international campaigns.",
        author: "Daksh Chandgaonkar",
        role: "Creative Director",
        company: "Elvora Media",
        metricBadge: "2× Revenue",
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

    const go = (to: number) => {
        setDirection(to > currentIndex ? 1 : -1);
        setCurrentIndex(to);
    };

    const next = () => go((currentIndex + 1) % TESTIMONIALS.length);
    const prev = () => go(currentIndex === 0 ? TESTIMONIALS.length - 1 : currentIndex - 1);

    useEffect(() => {
        const t = setTimeout(next, 7000);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex]);

    const current = TESTIMONIALS[currentIndex];

    const variants = {
        enter: (d: number) => ({ opacity: 0, x: d * 32 }),
        center:               { opacity: 1, x: 0 },
        exit:  (d: number) => ({ opacity: 0, x: d * -32 }),
    };

    return (
        <section className="py-[72px] sm:py-[clamp(96px,10vw,160px)] bg-[#0B0B0B]">
            <Container>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={stagger(0.1)}
                    className="flex flex-col items-center text-center"
                >
                    {/* Label */}
                    <motion.p variants={fadeUp} className="font-mono text-[10px] font-semibold tracking-[0.25em] uppercase text-[#6F6F6A] mb-4">
                        Client Voice
                    </motion.p>

                    <motion.h2
                        variants={fadeUp}
                        className="font-display text-4xl font-extrabold uppercase tracking-[-0.02em] text-white sm:text-6xl"
                    >
                        What Clients{" "}
                        <span className="font-serif italic font-normal text-[#B8955A] tracking-normal">Say</span>
                    </motion.h2>

                    {/* Testimonial */}
                    <motion.div variants={fadeUp} className="mt-16 w-full max-w-2xl">
                        <div
                            className="relative overflow-hidden"
                            onDragStart={(e) => e.preventDefault()}
                        >
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={current.id}
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    onDragEnd={(_, info) => {
                                        if (info.offset.x < -50) next();
                                        if (info.offset.x > 50) prev();
                                    }}
                                    className="cursor-grab active:cursor-grabbing"
                                >
                                    {/* Stars */}
                                    <div className="flex justify-center gap-1 text-[#B8955A] text-sm mb-8">
                                        {"★".repeat(5)}
                                    </div>

                                    {/* Quote */}
                                    <p className="font-serif text-xl italic leading-relaxed text-white/85 sm:text-2xl">
                                        &ldquo;{current.quote}&rdquo;
                                    </p>

                                    {/* Author */}
                                    <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
                                        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-white/10">
                                            <Image
                                                src={current.imageSrc}
                                                alt={current.author}
                                                fill
                                                sizes="48px"
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="text-center sm:text-left">
                                            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                                                {current.author}
                                            </h4>
                                            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6F6F6A] mt-0.5">
                                                {current.role} &middot; {current.company}
                                            </p>
                                        </div>
                                        <span className="font-mono text-[9px] uppercase tracking-[0.18em] border border-[#B8955A]/30 text-[#B8955A] px-3 py-1 sm:ml-2">
                                            {current.metricBadge}
                                        </span>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Navigation */}
                        <div className="mt-10 flex items-center justify-center gap-4">
                            <button
                                type="button"
                                onClick={prev}
                                aria-label="Previous testimonial"
                                className="flex h-9 w-9 items-center justify-center border border-white/10 text-white/40 transition-colors hover:border-white/30 hover:text-white focus-visible:outline-none"
                            >
                                ←
                            </button>

                            <div className="flex gap-2">
                                {TESTIMONIALS.map((_, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => go(idx)}
                                        aria-label={`Go to slide ${idx + 1}`}
                                        className={`h-px transition-all duration-400 ${idx === currentIndex ? "w-8 bg-[#B8955A]" : "w-4 bg-white/20"}`}
                                    />
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={next}
                                aria-label="Next testimonial"
                                className="flex h-9 w-9 items-center justify-center border border-white/10 text-white/40 transition-colors hover:border-white/30 hover:text-white focus-visible:outline-none"
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
