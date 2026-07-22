"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "./Container";
import { WHATSAPP_LINK } from "@/lib/whatsapp";

gsap.registerPlugin(ScrollTrigger);

type Service = {
    number: string;
    title: string;
};

type FloatingImage = {
    src: string;
    wrapperClass: string;
    rotateClass: string;
    eager?: boolean;
};

const FLOATING_IMAGES: FloatingImage[] = [
    {
        src: "/services1.png",
        wrapperClass:
            "left-1 top-30 h-20 w-20 sm:left-6 sm:top-10 sm:h-28 sm:w-28 lg:left-14 lg:top-14 lg:h-36 lg:w-36",
        rotateClass: "-rotate-12",
        eager: true,
    },
    {
        src: "/services2.png",
        wrapperClass:
            "right-1 top-30 h-28 w-20 sm:right-6 sm:top-[18%] sm:h-40 sm:w-28 lg:right-16 lg:top-[14%] lg:h-52 lg:w-36",
        rotateClass: "rotate-9",
    },
    {
        src: "/services3.png",
        wrapperClass:
            "bottom-6 left-1 h-24 w-24 sm:bottom-12 sm:left-8 sm:h-32 sm:w-32 lg:left-16 lg:h-40 lg:w-40",
        rotateClass: "-rotate-6",
    },
    {
        src: "/services4.png",
        wrapperClass:
            "bottom-6 right-1 h-24 w-24 sm:bottom-12 sm:right-8 sm:h-32 sm:w-32 lg:right-16 lg:h-40 lg:w-40",
        rotateClass: "rotate-[15deg]",
        eager: true,
    },
];

const SERVICES: Service[] = [
    { number: "01", title: "Client Priority" },
    { number: "02", title: "Growth Partner" },
    { number: "03", title: "Strategic DOM" },
    { number: "04", title: "Fine Production" },
    { number: "05", title: "Fluid Editing" },
    { number: "06", title: "Laser Marketing" },
    { number: "07", title: "Finance ROI" },
    { number: "08", title: "Full Transparency" },
    { number: "09", title: "Creative Agility" },
    { number: "10", title: "Enduring Scale" },
];

export function ServicesShowcase() {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = useRef<HTMLElement | null>(null);
    const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const floatRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!sectionRef.current) return;

        const items = itemRefs.current.filter(
            (item): item is HTMLButtonElement => item !== null,
        );
        if (items.length === 0) return;

        ScrollTrigger.config({ ignoreMobileResize: true });

        const mm = gsap.matchMedia();

        mm.add(
            { isMobile: "(max-width: 639px)", isDesktop: "(min-width: 640px)" },
            (context) => {
                const conditions = context.conditions as { isMobile: boolean };
                const isMobile = conditions.isMobile;
                const pinFactor = isMobile ? 1.6 : 2.2;
                const rowHeight = isMobile ? 52 : 76;
                const steps = items.length - 1;

                const applyPositions = (activePosition: number) => {
                    items.forEach((item, i) => {
                        const offset = i - activePosition;
                        const absOffset = Math.abs(offset);
                        const opacity = Math.max(0, 1 - absOffset * 0.4);
                        const scale = Math.max(0.75, 1 - absOffset * 0.12);
                        // Update styles directly instead of via gsap.quickSetter(). On iOS
                        // WebKit, GSAP's quickSetter falls back to
                        // element.setAttribute(prop, value), which throws and crashes the
                        // whole page on every iPhone (it works via .style on other
                        // platforms, which is why it only broke on iOS). Writing to .style
                        // ourselves avoids GSAP's setter entirely and renders identically
                        // everywhere. The -50% centers each row (they sit at top: 50%).
                        item.style.transform = `translateY(-50%) translateY(${
                            offset * rowHeight
                        }px) scale(${scale})`;
                        item.style.opacity = String(opacity);
                        item.style.pointerEvents =
                            opacity < 0.05 ? "none" : "auto";
                    });
                };

                applyPositions(0);

                const wanderTweens: (gsap.core.Tween | null)[] = [];
                const wanderRange = isMobile ? 8 : 16;

                const floats = floatRefs.current.filter(
                    (floatEl): floatEl is HTMLDivElement => floatEl !== null,
                );

                if (floats.length > 0 && sectionRef.current) {
                    const sectionRect =
                        sectionRef.current.getBoundingClientRect();
                    const sectionCenterX =
                        sectionRect.left + sectionRect.width / 2;
                    const sectionCenterY =
                        sectionRect.top + sectionRect.height / 2;

                    floats.forEach((floatEl, i) => {
                        const rect = floatEl.getBoundingClientRect();
                        const elCenterX = rect.left + rect.width / 2;
                        const elCenterY = rect.top + rect.height / 2;
                        const dx = sectionCenterX - elCenterX;
                        const dy = sectionCenterY - elCenterY;

                        const startWander = () => {
                            const wander = () => {
                                wanderTweens[i] = gsap.to(floatEl, {
                                    x: gsap.utils.random(
                                        -wanderRange,
                                        wanderRange,
                                    ),
                                    y: gsap.utils.random(
                                        -wanderRange * 0.85,
                                        wanderRange * 0.85,
                                    ),
                                    duration: gsap.utils.random(4, 7),
                                    ease: "sine.inOut",
                                    onComplete: wander,
                                });
                            };
                            wander();
                        };

                        gsap.set(floatEl, { x: dx, y: dy });
                        gsap.to(floatEl, {
                            x: 0,
                            y: 0,
                            opacity: 1,
                            duration: 1.2,
                            ease: "power3.out",
                            delay: i * 0.1,
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: "top 75%",
                                toggleActions: "play none none reverse",
                            },
                            onComplete: startWander,
                        });
                    });
                }

                ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: "top top",
                    end: () => `+=${window.innerHeight * pinFactor}`,
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        const activePosition = self.progress * steps;
                        applyPositions(activePosition);
                        const nextIndex = Math.round(
                            Math.min(steps, Math.max(0, activePosition)),
                        );
                        setActiveIndex((current) =>
                            current === nextIndex ? current : nextIndex,
                        );
                    },
                });

                return () => {
                    wanderTweens.forEach((tween) => tween?.kill());
                };
            },
        );

        return () => mm.revert();
    }, []);

    return (
        <section
            id="services"
            ref={sectionRef}
            className="relative h-svh overflow-hidden bg-[#faf7f0] py-12 sm:py-16"
        >
            {FLOATING_IMAGES.map((image, index) => (
                <div
                    key={image.src}
                    ref={(el) => {
                        floatRefs.current[index] = el;
                    }}
                    aria-hidden="true"
                    className={`group absolute z-0 block opacity-0 will-change-transform ${image.wrapperClass}`}
                >
                    <div
                        className={`relative h-full w-full transition-transform duration-700 ease-out will-change-transform ${image.rotateClass} group-hover:rotate-0 group-hover:scale-105`}
                    >
                        <Image
                            src={image.src}
                            alt=""
                            fill
                            loading={image.eager ? "eager" : "lazy"}
                            sizes="(max-width: 1024px) 25vw, 220px"
                            className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.3)]"
                        />
                    </div>
                </div>
            ))}

            <Container className="relative z-10 flex h-full flex-col items-center justify-between pointer-events-none">
                <h2 className="text-center text-3xl font-semibold leading-tight text-deep-black sm:text-4xl md:text-5xl">
                    What Can We Do
                    <br />
                    <span className="text-luxury-gold">For your Business?</span>
                </h2>

                <div className="relative h-64 w-full overflow-hidden pointer-events-auto sm:h-80 md:h-96">
                    {SERVICES.map((service, index) => {
                        const isActive = index === activeIndex;
                        return (
                            <button
                                key={service.number}
                                ref={(el) => {
                                    itemRefs.current[index] = el;
                                }}
                                type="button"
                                onMouseEnter={() => setActiveIndex(index)}
                                onFocus={() => setActiveIndex(index)}
                                className={`absolute inset-x-0 top-1/2 flex items-center justify-center gap-2 px-2 py-3 text-center transition-colors duration-300 sm:gap-4 sm:px-4 ${
                                    isActive
                                        ? "bg-linear-to-r from-transparent via-black/5 to-transparent"
                                        : ""
                                }`}
                            >
                                <span className="flex items-baseline gap-2 sm:gap-6">
                                    <span
                                        className={`whitespace-nowrap text-lg font-medium transition-colors duration-300 sm:text-3xl ${
                                            isActive
                                                ? "text-luxury-gold"
                                                : "text-muted-grey"
                                        }`}
                                    >
                                        {service.number}
                                    </span>
                                    <span
                                        className={`whitespace-nowrap text-lg font-medium transition-colors duration-300 sm:text-3xl ${
                                            isActive
                                                ? "text-deep-black"
                                                : "text-muted-grey"
                                        }`}
                                    >
                                        {service.title}
                                    </span>
                                </span>
                                <span
                                    aria-hidden="true"
                                    className={`hidden font-serif text-3xl text-luxury-gold transition-opacity duration-300 sm:inline-block sm:text-4xl ${
                                        isActive ? "opacity-100" : "opacity-0"
                                    }`}
                                >
                                    &rdquo;
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div className="pointer-events-auto flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <span className="text-sm text-muted-grey">
                        Have other idea?
                    </span>
                    <a
                        href={WHATSAPP_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-full bg-[linear-gradient(90deg,#b58c56,#e0c38a,#b58c56)] py-2 pl-5 pr-2 text-sm font-medium text-deep-black transition-[filter] duration-300 hover:brightness-95"
                    >
                        Explore Our Services
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-deep-black text-ivory-cream">
                            »
                        </span>
                    </a>
                </div>
            </Container>
        </section>
    );
}
