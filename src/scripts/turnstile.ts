import { TURNSTILE_SITE_KEY } from "astro:env/client";
import { turnstile } from "../lib/contact";

interface TurnstileOptions {
    sitekey: string;
    callback: () => void;
    "error-callback": () => void;
    "expired-callback": () => void;
    "before-interactive-callback": () => void;
    "after-interactive-callback": () => void;
    "response-field-name": string;
    appearance: "always" | "execute" | "interaction-only";
    size: "normal" | "flexible" | "compact";
    language: string;
}

interface Turnstile {
    render: (container: HTMLElement, options: TurnstileOptions) => string | undefined;
    reset: (widgetId: string) => void;
}

declare global {
    interface Window {
        turnstile?: Turnstile;
    }
}

const loadTurnstile = () =>
    new Promise<Turnstile>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = `${turnstile.origin}/turnstile/v0/api.js?render=explicit`;
        script.async = true;
        script.addEventListener("load",
            () => (window.turnstile ? resolve(window.turnstile) : reject(new Error(
                "Turnstile indisponible"))));
        script.addEventListener("error",
            () => reject(new Error("Chargement de Turnstile impossible")));
        document.head.append(script);
    });

export async function renderTurnstile(
    container: HTMLElement,
    onChange: () => void
): Promise<() => void> {
    const api = await loadTurnstile();
    const widgetId = api.render(container, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: onChange,
        "error-callback": onChange,
        "expired-callback": onChange,
        "before-interactive-callback": () => container.toggleAttribute("data-interactive", true),
        "after-interactive-callback": () => container.toggleAttribute("data-interactive", false),
        "response-field-name": turnstile.responseField,
        appearance: "interaction-only",
        size: "flexible",
        language: document.documentElement.lang
    });
    if (widgetId === undefined) throw new Error("Affichage de Turnstile impossible");
    return () => api.reset(widgetId);
}
