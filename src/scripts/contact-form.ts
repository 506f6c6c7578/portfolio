import { type ActionErrorCode, actions } from "astro:actions";
import * as z from "zod/mini";
import {
    type ContactField,
    contactFormText,
    contactRequestSchema,
    contactSchema
} from "../lib/contact";
import { renderTurnstile } from "./turnstile";

const form = document.querySelector<HTMLFormElement>("[data-contact-form]");
const challenge = form?.querySelector<HTMLElement>("[data-contact-challenge]");
const submit = form?.querySelector<HTMLButtonElement>("[data-contact-submit]");
const submitLabel = form?.querySelector("[data-contact-submit-label]");
const status = form?.querySelector<HTMLElement>("[data-contact-status]");

const errorMessages: Partial<Record<ActionErrorCode, string>> = {
    FORBIDDEN: contactFormText.challengeFailed,
    TOO_MANY_REQUESTS: contactFormText.rateLimited
};

if (form && challenge && submit && submitLabel && status) {
    const fields = z.keyof(contactSchema).options.map((name) => ({
        name,
        input: form.elements.namedItem(name),
        error: form.querySelector(`[data-contact-error="${name}"]`)
    }));
    const touched = new Set<ContactField>();
    let sending = false;
    let resetChallenge: (() => void) | undefined;

    const update = () => {
        const result = contactRequestSchema.safeParse(Object.fromEntries(new FormData(form)));
        const errors = result.success ? {} : z.flattenError(result.error).fieldErrors;
        submit.disabled = sending || !result.success;
        fields.forEach(({ name, input, error }) => {
            const message = touched.has(name) ? (errors[name]?.[0] ?? "") : "";
            if (input instanceof Element) input.ariaInvalid = message ? "true" : null;
            if (error) error.textContent = message;
        });
        return result.success;
    };

    const setSending = (value: boolean) => {
        sending = value;
        form.ariaBusy = value ? "true" : null;
        submitLabel.textContent = value ? contactFormText.sending : contactFormText.submit;
        update();
    };

    const setStatus = (message: string, state: "success" | "error") => {
        status.textContent = message;
        status.dataset.state = state;
    };

    const send = async () => {
        try {
            const { error } = await actions.contact(new FormData(form));
            if (!error) {
                form.reset();
                touched.clear();
                setStatus(contactFormText.success, "success");
            } else {
                setStatus(errorMessages[error.code] ?? contactFormText.failure, "error");
            }
        } catch {
            setStatus(contactFormText.failure, "error");
        }
    };

    form.addEventListener(
        "focusin",
        () => {
            renderTurnstile(challenge, update).then(
                (reset) => (resetChallenge = reset),
                () => setStatus(contactFormText.challengeUnavailable, "error")
            );
        },
        { once: true }
    );

    form.addEventListener("input", update);

    form.addEventListener("change", (event) => {
        const field = fields.find(({ input }) => input === event.target);
        if (!field) return;
        touched.add(field.name);
        update();
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (sending || !update()) return;
        status.textContent = "";
        setSending(true);
        await send();
        resetChallenge?.();
        setSending(false);
    });

    update();
}
