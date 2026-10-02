"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";
import { WHATSAPP_LINK } from "@/lib/whatsapp";

const FOOTER_LINKS = [
    { label: "Work", href: "#case-studies" },
    { label: "Services", href: "#services" },
    { label: "Pricing", href: "#pricing" },
    { label: "Team", href: "#team" },
    { label: "Contact", href: WHATSAPP_LINK, external: true },
];

function InstagramIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
    );
}

function LinkedInIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
            <path d="M4 9h2v11H4z" fill="currentColor" stroke="none" />
            <circle cx="5" cy="5" r="1.6" fill="currentColor" stroke="none" />
            <path d="M10 9v11M10 13c0-2.5 2-4 4-4s4 1.5 4 4v7" />
        </svg>
    );
}

function EmailIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 7l9 6 9-6" />
        </svg>
    );
}

function FacebookIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
            <path d="M14 21v-8h3l.5-4H14V6.5c0-1 .3-1.5 1.6-1.5H18V1.2C17.6 1.1 16.5 1 15.3 1 12.7 1 11 2.6 11 5.4V9H8v4h3v8h3z" />
        </svg>
    );
}

const SOCIALS = [
    { name: "Instagram", href: "https://www.instagram.com/elvoramediaofficial?igsh=MTRxMW95aDBhaG1pMw==", Icon: InstagramIcon },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/elvora-media-pvt-ltd/", Icon: LinkedInIcon },
    { name: "Email", href: "mailto:helloelvoramedia@gmail.com", Icon: EmailIcon },
    { name: "Facebook", href: "https://www.facebook.com/share/17sZckUKMU/?mibextid=wwXIfr", Icon: FacebookIcon },
];

export function Footer() {
    return (
        <footer className="bg-[#0a0a0a] relative overflow-hidden">

            {/* ── CTA BANNER ─────────────────────────────────── */}
            <div className="relative border-b border-white/[0.06]">
                {/* Grain texture overlay */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(179,138,75,0.08), transparent 70%)",
                    }}
                />

                <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={stagger(0.12)}
                        className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between"
                    >
                        <div className="max-w-2xl">
                            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
                                <span className="h-px w-8 bg-luxury-gold/50" />
                                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-luxury-gold">
                                    Ready to Elevate?
                                </span>
                            </motion.div>

                            <motion.h2
                                variants={fadeUp}
                                className="font-display text-5xl font-extrabold uppercase tracking-tight text-white leading-none sm:text-7xl"
                            >
                                Let&apos;s Build
                                <br />
                                <span className="font-serif italic font-normal text-luxury-gold">
                                    Something Iconic.
                                </span>
                            </motion.h2>

                            <motion.p variants={fadeUp} className="mt-5 text-sm text-neutral-400 max-w-md leading-relaxed">
                                From a single campaign to a full-scale brand universe — we&apos;re your dedicated cinematic production studio.
                            </motion.p>
                        </div>

                        <motion.div variants={fadeUp} className="flex flex-col gap-3 sm:flex-row">
                            <a
                                href={WHATSAPP_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                id="footer-cta-whatsapp"
                                className="group inline-flex items-center gap-2.5 rounded-full bg-luxury-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-black transition-all duration-300 hover:bg-champagne-gold hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luxury-gold"
                            >
                                <span>Start a Project</span>
                                <span className="transition-transform group-hover:translate-x-0.5">↗</span>
                            </a>
                            <a
                                href="mailto:helloelvoramedia@gmail.com"
                                id="footer-cta-email"
                                className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-white/70 transition-all duration-300 hover:border-white/40 hover:text-white focus-visible:outline-none"
                            >
                                <span>Email Us</span>
                                <span>→</span>
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* ── FOOTER BODY ────────────────────────────────── */}
            <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-12 pb-8">
                <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 md:grid-cols-6 mb-12">

                    {/* Brand column */}
                    <div className="col-span-2">
                        <span className="font-display text-xl font-extrabold uppercase tracking-tight text-white">
                            Elvora Media
                        </span>
                        <p className="mt-3 text-sm leading-relaxed text-neutral-500 max-w-xs">
                            A premium digital media and commercial production agency. We transform ambitious brands into iconic visual stories.
                        </p>

                        {/* Socials */}
                        <div className="mt-6 flex items-center gap-2.5">
                            {SOCIALS.map(({ name, href, Icon }) => {
                                const isMail = href.startsWith("mailto:");
                                return (
                                    <a
                                        key={name}
                                        href={href}
                                        target={isMail ? undefined : "_blank"}
                                        rel={isMail ? undefined : "noopener noreferrer"}
                                        aria-label={name}
                                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-neutral-400 transition-colors hover:border-luxury-gold/50 hover:text-luxury-gold"
                                    >
                                        <Icon />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Nav columns */}
                    <div className="col-span-2 sm:col-span-1 md:col-start-4">
                        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-600 mb-4">
                            Navigation
                        </p>
                        <ul className="flex flex-col gap-2.5">
                            {FOOTER_LINKS.map(({ label, href, external }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        target={external ? "_blank" : undefined}
                                        rel={external ? "noopener noreferrer" : undefined}
                                        className="text-sm text-neutral-500 transition-colors hover:text-white"
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact column */}
                    <div className="col-span-2 sm:col-span-1 md:col-start-5">
                        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-600 mb-4">
                            Contact
                        </p>
                        <ul className="flex flex-col gap-2.5 text-sm text-neutral-500">
                            <li>
                                <a href="mailto:helloelvoramedia@gmail.com" className="transition-colors hover:text-white">
                                    helloelvoramedia@gmail.com
                                </a>
                            </li>
                            <li>
                                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-luxury-gold">
                                    WhatsApp Us ↗
                                </a>
                            </li>
                            <li className="text-neutral-600">
                                Pune, Maharashtra, India
                            </li>
                        </ul>
                    </div>

                    {/* Recognition column */}
                    <div className="col-span-2 sm:col-span-1 md:col-start-6">
                        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-600 mb-4">
                            Recognition
                        </p>
                        <div className="flex flex-col gap-2">
                            {["3.4M+ Organic Views", "50+ Brand Campaigns", "Cinema-Grade Production"].map((item) => (
                                <span key={item} className="text-xs text-neutral-500">{item}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Monumental ELVORA Watermark */}
                <div className="select-none overflow-hidden text-center pointer-events-none -mx-5 sm:-mx-8">
                    <span className="font-display text-[clamp(4rem,20vw,16rem)] font-extrabold uppercase leading-none tracking-tight text-white/[0.03] block">
                        ELVORA
                    </span>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col gap-2 text-[11px] text-neutral-600 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between -mt-4">
                    <p>&copy; {new Date().getFullYear()} Elvora Media. All rights reserved.</p>
                    <div className="flex items-center gap-2">
                        <span>
                            Designed &amp; Developed by{" "}
                            <a
                                href="https://portfolio-eosin-seven-23.vercel.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-luxury-gold underline decoration-luxury-gold/30 underline-offset-4 transition-colors hover:text-white"
                            >
                                Anand Jadhav
                            </a>
                        </span>
                        <a
                            href="https://www.instagram.com/anannnnnd22?igsh=MXkwZ3JqOXBlandqaQ%3D%3D&utm_source=qr"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Anand Jadhav on Instagram"
                            className="text-neutral-600 transition-colors hover:text-luxury-gold"
                        >
                            <InstagramIcon />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
