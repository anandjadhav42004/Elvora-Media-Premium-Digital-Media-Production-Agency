"use client";

import { useEffect, useId, useRef, useState } from "react";

const SIZE = 152;
const RADIUS = 78;
const FOLLOW_EASE = 0.16;
const ROTATION_SPEED = 18; // degrees per second
const MIN_SCALE = 0.55;
const SPEED_TO_SHRINK = 0.15; // scale lost per px/ms of movement
const SCALE_EASE = 0.15;
const SKEW_FACTOR = 14; // degrees of skew per px/ms of movement
const MAX_SKEW = 18;
const SKEW_EASE = 0.15;
const HOVER_SCALE = 0.4; // cursor size over clickable elements, so the target is visible
const HOVER_PROBE_RADIUS = 16; // px of slack around the pointer so small links/icons still register as hovered

const INTERACTIVE_SELECTOR =
    'a, button, input, select, textarea, label, summary, [role="button"], [role="link"], [data-cursor-pointer]';

// sampled around the pointer instead of just its exact pixel, so small targets
// (icons, nav links) still trigger the hover state without needing pixel-perfect aim
const PROBE_OFFSETS: Array<[number, number]> = [
    [0, 0],
    [HOVER_PROBE_RADIUS, 0],
    [-HOVER_PROBE_RADIUS, 0],
    [0, HOVER_PROBE_RADIUS],
    [0, -HOVER_PROBE_RADIUS],
];

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

function isInteractiveElement(el: Element | null) {
    if (!el) return false;
    return !!el.closest(INTERACTIVE_SELECTOR);
}

function isNearInteractive(x: number, y: number) {
    for (const [dx, dy] of PROBE_OFFSETS) {
        if (isInteractiveElement(document.elementFromPoint(x + dx, y + dy))) {
            return true;
        }
    }
    return false;
}

export function ElvoraCursor() {
    const pathId = useId();
    const badgeRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<SVGGElement>(null);
    const [enabled, setEnabled] = useState(false);
    const [visible, setVisible] = useState(false);

    const pos = useRef({ x: 0, y: 0 });
    const target = useRef({ x: 0, y: 0 });
    const prevPos = useRef({ x: 0, y: 0 });
    const rotation = useRef(0);
    const scale = useRef(1);
    const skew = useRef({ x: 0, y: 0 });
    const hasPositioned = useRef(false);
    const isOverInteractive = useRef(false);

    useEffect(() => {
        const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (canHover && !reduceMotion) {
            const timer = requestAnimationFrame(() => setEnabled(true));
            return () => cancelAnimationFrame(timer);
        }
    }, []);

    useEffect(() => {
        if (!enabled) return;

        document.body.classList.add("elvora-cursor-active");

        function onMouseMove(event: MouseEvent) {
            target.current.x = event.clientX;
            target.current.y = event.clientY;
            if (!hasPositioned.current) {
                pos.current.x = event.clientX;
                pos.current.y = event.clientY;
                hasPositioned.current = true;
            }
            setVisible(true);
        }

        function onMouseLeave() {
            setVisible(false);
        }

        window.addEventListener("mousemove", onMouseMove);
        document.documentElement.addEventListener("mouseleave", onMouseLeave);

        let frameId: number;
        let lastTime = performance.now();

        function tick(now: number) {
            const dt = Math.min(now - lastTime, 48);
            lastTime = now;

            isOverInteractive.current = isNearInteractive(
                target.current.x,
                target.current.y
            );

            pos.current.x += (target.current.x - pos.current.x) * FOLLOW_EASE;
            pos.current.y += (target.current.y - pos.current.y) * FOLLOW_EASE;

            const dx = pos.current.x - prevPos.current.x;
            const dy = pos.current.y - prevPos.current.y;
            prevPos.current.x = pos.current.x;
            prevPos.current.y = pos.current.y;

            const vx = dt > 0 ? dx / dt : 0;
            const vy = dt > 0 ? dy / dt : 0;
            const speed = Math.sqrt(vx * vx + vy * vy); // px/ms

            const speedScale = Math.max(
                MIN_SCALE,
                1 - speed * SPEED_TO_SHRINK
            );
            const targetScale = isOverInteractive.current
                ? Math.min(speedScale, HOVER_SCALE)
                : speedScale;
            scale.current += (targetScale - scale.current) * SCALE_EASE;

            const targetSkewX = clamp(vy * SKEW_FACTOR, -MAX_SKEW, MAX_SKEW);
            const targetSkewY = clamp(vx * SKEW_FACTOR, -MAX_SKEW, MAX_SKEW);
            skew.current.x += (targetSkewX - skew.current.x) * SKEW_EASE;
            skew.current.y += (targetSkewY - skew.current.y) * SKEW_EASE;

            if (badgeRef.current) {
                badgeRef.current.style.transform = `translate3d(${
                    pos.current.x - SIZE / 2
                }px, ${pos.current.y - SIZE / 2}px, 0) scale(${
                    scale.current
                }) skewX(${skew.current.x}deg) skewY(${skew.current.y}deg)`;
            }

            rotation.current =
                (rotation.current + (ROTATION_SPEED * dt) / 1000) % 360;
            if (ringRef.current) {
                ringRef.current.style.transform = `rotate(${rotation.current}deg)`;
            }

            frameId = requestAnimationFrame(tick);
        }
        frameId = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            document.documentElement.removeEventListener(
                "mouseleave",
                onMouseLeave
            );
            cancelAnimationFrame(frameId);
            document.body.classList.remove("elvora-cursor-active");
        };
    }, [enabled]);

    if (!enabled) return null;

    const circumference = Math.round(2 * Math.PI * RADIUS);

    return (
        <div
            ref={badgeRef}
            aria-hidden="true"
            className={`pointer-events-none fixed left-0 top-0 z-9999 mix-blend-difference font-mono will-change-transform transition-opacity duration-300 ${
                visible ? "opacity-100" : "opacity-0"
            }`}
            style={{ width: SIZE, height: SIZE }}
        >
            <svg viewBox="0 0 200 200" className="h-full w-full">
                <defs>
                    <path
                        id={pathId}
                        d={`M 100,100 m -${RADIUS},0 a ${RADIUS},${RADIUS} 0 1,1 ${
                            RADIUS * 2
                        },0 a ${RADIUS},${RADIUS} 0 1,1 -${RADIUS * 2},0`}
                    />
                </defs>

                <g ref={ringRef} style={{ transformOrigin: "100px 100px" }}>
                    <text
                        className="fill-white font-bold"
                        fontSize="15"
                        letterSpacing="3.5"
                        textLength={circumference}
                        lengthAdjust="spacingAndGlyphs"
                    >
                        <textPath href={`#${pathId}`} xlinkHref={`#${pathId}`}>
                            ELVORA • ELVORA • ELVORA • ELVORA • ELVORA •{" "}
                        </textPath>
                    </text>
                </g>

                <path
                    d="M100 60.4 C102.4 79.6 120.4 97.6 139.6 100 C120.4 102.4 102.4 120.4 100 139.6 C97.6 120.4 79.6 102.4 60.4 100 C79.6 97.6 97.6 79.6 100 60.4 Z"
                    className="fill-white"
                />
            </svg>
        </div>
    );
}
