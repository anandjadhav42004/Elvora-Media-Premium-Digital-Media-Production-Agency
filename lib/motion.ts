export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: EASE },
    },
};

export const popIn = {
    hidden: { opacity: 0, y: 10, scale: 0.6 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.45, ease: EASE },
    },
};

export function stagger(staggerChildren: number, delayChildren = 0) {
    return {
        hidden: {},
        visible: { transition: { staggerChildren, delayChildren } },
    };
}
