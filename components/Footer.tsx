"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";
import { WHATSAPP_LINK } from "@/lib/whatsapp";

const NAV_LINKS = [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#case-studies" },
    { label: "Pricing", href: "#pricing" },
    { label: "Team", href: "#team" },
];

const SOCIALS = [
    {
        name: "Instagram",
        href: "https://www.instagram.com/elvoramediaofficial?igsh=MTRxMW95aDBhaG1pMw==",
        label: "IG",
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/elvora-media-pvt-ltd/",
        label: "LI",
    },
    {
        name: "Facebook",
        href: "https://www.facebook.com/share/17sZckUKMU/?mibextid=wwXIfr",
        label: "FB",
    },
    {
        name: "Email",
        href: "mailto:helloelvoramedia@gmail.com",
        label: "Mail",
    },
];

export function Footer() {
    return (
        <footer className="bg-[#0B0B0B]">

            {/* CTA Section */}
            <div className="border-t border-white/[0.06]">
                <div className="mx-auto max-w-[1440px] px-5 sm:px-[clamp(24px,4vw,64px)] py-[72px] sm:py-[clamp(96px,10vw,160px)]">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={stagger(0.1)}
                    >
                        <motion.p variants={fadeUp} className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#6F6F6A] mb-5">
                            Ready to Start?
                        </motion.p>

                        <motion.h2
                            variants={fadeUp}
                            className="font-display text-5xl sm:text-7xl font-extrabold uppercase tracking-[-0.02em] text-white leading-none mb-8"
                        >
                            Let&apos;s Build
                            <br />
                            <span className="font-serif italic font-normal text-[#B8955A] tracking-normal">
                                Something Iconic.
                            </span>
                        </motion.h2>

                        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
                            <a
                                href={WHATSAPP_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                id="footer-cta-whatsapp"
                                className="inline-flex items-center gap-2 bg-white px-8 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#111111] transition-transform duration-200 hover:-translate-y-px focus-visible:outline-none"
                            >
                                <span>Start a Project</span>
                                <span>↗</span>
                            </a>
                            <a
                                href="mailto:helloelvoramedia@gmail.com"
                                id="footer-cta-email"
                                className="inline-flex items-center gap-2 border border-white/15 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white/60 transition-all duration-200 hover:border-white/30 hover:text-white focus-visible:outline-none"
                            >
                                <span>Email Us</span>
                                <span>→</span>
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Footer body */}
            <div className="border-t border-white/[0.06]">
                <div className="mx-auto max-w-[1440px] px-5 sm:px-[clamp(24px,4vw,64px)] py-12">
                    <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">

                        {/* Brand */}
                        <div className="max-w-xs">
                            <span className="font-display text-lg font-extrabold uppercase tracking-[-0.02em] text-white block mb-3">
                                Elvora Media
                            </span>
                            <p className="text-[13px] leading-relaxed text-[#6F6F6A]">
                                A premium digital media and commercial production agency. Pune, Maharashtra, India.
                            </p>
                            <div className="mt-5 flex items-center gap-4">
                                {SOCIALS.map(({ name, href, label }) => (
                                    <a
                                        key={name}
                                        href={href}
                                        target={href.startsWith("mailto:") ? undefined : "_blank"}
                                        rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                                        aria-label={name}
                                        className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#6F6F6A] transition-colors hover:text-white"
                                    >
                                        {label}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Nav */}
                        <nav aria-label="Footer navigation">
                            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-[#6F6F6A] mb-4">
                                Pages
                            </p>
                            <ul className="flex flex-col gap-2.5">
                                {NAV_LINKS.map(({ label, href }) => (
                                    <li key={label}>
                                        <a
                                            href={href}
                                            className="text-[13px] text-[#6F6F6A] transition-colors hover:text-white"
                                        >
                                            {label}
                                        </a>
                                    </li>
                                ))}
                                <li>
                                    <a
                                        href={WHATSAPP_LINK}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[13px] text-[#6F6F6A] transition-colors hover:text-white"
                                    >
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </nav>

                        {/* Contact */}
                        <div>
                            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-[#6F6F6A] mb-4">
                                Contact
                            </p>
                            <ul className="flex flex-col gap-2.5">
                                <li>
                                    <a href="mailto:helloelvoramedia@gmail.com" className="text-[13px] text-[#6F6F6A] transition-colors hover:text-white">
                                        helloelvoramedia@gmail.com
                                    </a>
                                </li>
                                <li>
                                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-[13px] text-[#B8955A] transition-colors hover:text-white">
                                        WhatsApp ↗
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Watermark */}
                    <div aria-hidden="true" className="mt-12 select-none overflow-hidden pointer-events-none">
                        <span className="font-display block text-[clamp(4rem,18vw,14rem)] font-extrabold uppercase leading-none tracking-[-0.02em] text-white/[0.03]">
                            ELVORA
                        </span>
                    </div>

                    {/* Bottom bar */}
                    <div className="flex flex-col gap-2 text-[11px] text-[#6F6F6A] border-t border-white/[0.06] pt-5 -mt-6 sm:flex-row sm:items-center sm:justify-between">
                        <p>&copy; {new Date().getFullYear()} Elvora Media. All rights reserved.</p>
                        <p>
                            Designed &amp; Developed by{" "}
                            <a
                                href="https://portfolio-eosin-seven-23.vercel.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/40 underline underline-offset-4 transition-colors hover:text-white"
                            >
                                Anand Jadhav
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
