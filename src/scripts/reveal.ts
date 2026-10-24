import { inView } from "motion";
import { animate } from "motion/mini";

const offsets = {
    up: "translate(0, 2rem)",
    left: "translate(-3rem, 0)",
    right: "translate(3rem, 0)"
} as const;

type Direction = keyof typeof offsets;

const isDirection = (value: string | undefined): value is Direction => value !==
    undefined &&
    value in
    offsets;

const reveal = (element: Element) => {
    if (!(element instanceof HTMLElement)) return;
    const { animate: direction, animateDelay } = element.dataset;
    animate(
        element,
        {
            opacity: [0, 1],
            transform: [offsets[isDirection(direction) ? direction : "up"], "translate(0, 0)"]
        },
        { duration: 0.8, delay: Number(animateDelay) || 0, ease: [0.22, 1, 0.36, 1] }
    );
};

if (matchMedia("(prefers-reduced-motion: no-preference)").matches) {
    const initialObserver = new IntersectionObserver((entries) => {
        initialObserver.disconnect();
        const hiddenElements = entries.flatMap(({ isIntersecting, target }) =>
            !isIntersecting && target instanceof HTMLElement ? [target] : []
        );
        hiddenElements.forEach((element) => {
            element.style.opacity = "0";
        });
        inView(hiddenElements, reveal, { amount: 0.2 });
    });
    document.querySelectorAll("[data-animate]")
        .forEach((element) => initialObserver.observe(element));
}
