import { ActionError, defineAction } from "astro:actions";
import { site } from "../data/site";
import { contactRequestSchema, turnstile } from "../lib/contact";
import { sendEmail } from "../lib/resend";
import { verifyTurnstile } from "../lib/turnstile";

export const server = {
    contact: defineAction({
        accept: "form",
        input: contactRequestSchema,
        handler: async (
            { [turnstile.responseField]: token, email, subject, message },
            { clientAddress }
        ) => {
            if (!(await verifyTurnstile(token, clientAddress))) {
                throw new ActionError({
                    code: "FORBIDDEN",
                    message: "La vérification anti-spam a échoué."
                });
            }

            try {
                await sendEmail({
                    from: `${site.name} <${site.email}>`,
                    to: site.email,
                    replyTo: email,
                    subject: `[Contact] ${subject}`,
                    text: `De : ${email}\n\n${message}`
                });
            } catch (error) {
                console.error("Échec de l'envoi du message de contact :", error);
                throw new ActionError({
                    code: "BAD_GATEWAY",
                    message: "L'envoi du message a échoué."
                });
            }
        }
    })
};
