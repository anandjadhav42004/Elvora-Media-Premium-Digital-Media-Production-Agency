"use client";

import { motion } from "framer-motion";
import { fadeUp, popIn, stagger } from "@/lib/motion";
import { WHATSAPP_LINK } from "@/lib/whatsapp";

const FOOTER_LINKS = [
    { label: "About", href: "#team" },
    {
        label: "Contact Us",
        href: WHATSAPP_LINK,
        external: true,
    },
];

function InstagramIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            className="h-4 w-4"
            aria-hidden="true"
        >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle
                cx="17.5"
                cy="6.5"
                r="1"
                fill="currentColor"
                stroke="none"
            />
        </svg>
    );
}

function LinkedInIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
        >
            <path d="M4 9h2v11H4z" fill="currentColor" stroke="none" />
            <circle cx="5" cy="5" r="1.6" fill="currentColor" stroke="none" />
            <path d="M10 9v11M10 13c0-2.5 2-4 4-4s4 1.5 4 4v7" />
        </svg>
    );
}

function EmailIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
        >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 7l9 6 9-6" />
        </svg>
    );
}

function FacebookIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
        >
            <path d="M14 21v-8h3l.5-4H14V6.5c0-1 .3-1.5 1.6-1.5H18V1.2C17.6 1.1 16.5 1 15.3 1 12.7 1 11 2.6 11 5.4V9H8v4h3v8h3z" />
        </svg>
    );
}

const SOCIALS = [
    {
        name: "Instagram",
        href: "https://www.instagram.com/elvoramediaofficial?igsh=MTRxMW95aDBhaG1pMw==",
        Icon: InstagramIcon,
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/elvora-media-pvt-ltd/",
        Icon: LinkedInIcon,
    },
    {
        name: "Email",
        href: "mailto:helloelvoramedia@gmail.com",
        Icon: EmailIcon,
    },
    {
        name: "Facebook",
        href: "https://www.facebook.com/share/17sZckUKMU/?mibextid=wwXIfr",
        Icon: FacebookIcon,
    },
];

export function Footer() {
    return (
        <footer className="pt-12 sm:pt-16">
            <div className="mx-auto w-full max-w-432 px-5">
                <div className="relative overflow-hidden rounded-t-3xl bg-deep-black p-8 sm:p-12">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0"
                        style={{
                            background:
                                "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.08), transparent 60%)",
                        }}
                    />

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={stagger(0.15)}
                    >
                        <motion.div
                            variants={stagger(0.12)}
                            className="relative"
                        >
                            <motion.span
                                aria-hidden="true"
                                variants={popIn}
                                className="block font-serif text-5xl leading-none text-champagne-gold sm:text-6xl"
                            >
                                &ldquo;
                            </motion.span>
                            <motion.h2
                                variants={fadeUp}
                                className="mt-2 text-2xl font-semibold leading-tight text-ivory-cream sm:text-3xl md:text-4xl"
                            >
                                See How We Bring
                                <br />
                                Your Idea Into Reality
                            </motion.h2>
                        </motion.div>

                        <motion.div
                            variants={stagger(0.1)}
                            className="relative mt-12 flex flex-col gap-10 sm:mt-16 sm:flex-row sm:items-start sm:justify-between"
                        >
                            <motion.div variants={fadeUp} className="max-w-xs">
                                <span className="text-lg font-semibold text-ivory-cream">
                                    Elvora Media
                                </span>
                                <p className="mt-3 text-sm leading-relaxed text-muted-grey">
                                    A creative media and branding agency helping
                                    ambitious businesses build a powerful
                                    presence in the digital world.
                                </p>
                            </motion.div>

                            <motion.nav variants={fadeUp} aria-label="Footer">
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-grey">
                                    Quick Links
                                </p>
                                <motion.ul
                                    variants={stagger(0.08)}
                                    className="mt-4 flex flex-col gap-2"
                                >
                                    {FOOTER_LINKS.map(
                                        ({ label, href, external }) => (
                                            <motion.li
                                                key={label}
                                                variants={fadeUp}
                                            >
                                                <a
                                                    href={href}
                                                    target={
                                                        external
                                                            ? "_blank"
                                                            : undefined
                                                    }
                                                    rel={
                                                        external
                                                            ? "noopener noreferrer"
                                                            : undefined
                                                    }
                                                    className="text-sm text-ivory-cream/80 transition-colors hover:text-ivory-cream"
                                                >
                                                    {label}
                                                </a>
                                            </motion.li>
                                        ),
                                    )}
                                </motion.ul>
                            </motion.nav>

                            <motion.div variants={fadeUp}>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-grey">
                                    Follow Us
                                </p>
                                <motion.div
                                    variants={stagger(0.06)}
                                    className="mt-4 flex items-center gap-3"
                                >
                                    {SOCIALS.map(({ name, href, Icon }) => {
                                        const isMail =
                                            href.startsWith("mailto:");
                                        return (
                                            <motion.a
                                                key={name}
                                                variants={popIn}
                                                href={href}
                                                target={
                                                    isMail
                                                        ? undefined
                                                        : "_blank"
                                                }
                                                rel={
                                                    isMail
                                                        ? undefined
                                                        : "noopener noreferrer"
                                                }
                                                aria-label={name}
                                                whileHover={{ scale: 1.1 }}
                                                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-ivory-cream transition-colors hover:bg-white/20"
                                            >
                                                <Icon />
                                            </motion.a>
                                        );
                                    })}
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            variants={fadeUp}
                            className="relative mt-12 flex flex-col gap-2 text-xs text-muted-grey border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <p>
                                &copy; {new Date().getFullYear()} Elvora Media.
                                All rights reserved.
                            </p>
                            <div className="flex items-center gap-2">
                                <span>
                                    Designed & Developed by{" "}
                                    <a
                                        href="https://portfolio-three-swart-hx117dkm48.vercel.app"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-semibold text-luxury-gold underline decoration-luxury-gold/50 underline-offset-4 transition-colors hover:text-ivory-cream"
                                    >
                                        Anand Jadhav
                                    </a>
                                </span>
                                <a
                                    href="https://www.instagram.com/anannnnnd22?igsh=MXkwZ3JqOXBlandqaQ%3D%3D&utm_source=qr"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Anand Jadhav on Instagram"
                                    className="text-ivory-cream/80 transition-colors hover:text-luxury-gold"
                                >
                                    <InstagramIcon />
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
}
