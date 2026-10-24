import * as z from "zod/mini";

export const contactFieldLimits = {
    email: { maxlength: 254 },
    subject: { maxlength: 150 },
    message: { minlength: 10, maxlength: 4000 }
} as const;

const { email, subject, message } = contactFieldLimits;

export const contactSchema = z.object({
    email: z.pipe(
        z.string().check(z.trim()),
        z
            .email({ error: "Saisis une adresse e-mail valide." })
            .check(z.maxLength(email.maxlength,
                { error: `L'adresse e-mail ne doit pas dépasser ${email.maxlength} caractères.` }))
    ),
    subject: z
        .string()
        .check(
            z.trim(),
            z.minLength(1, { error: "Indique le sujet de ton message." }),
            z.maxLength(subject.maxlength,
                { error: `Le sujet ne doit pas dépasser ${subject.maxlength} caractères.` }),
            z.regex(/^\P{Cc}*$/u, { error: "Le sujet contient des caractères non autorisés." })
        ),
    message: z
        .string()
        .check(
            z.trim(),
            z.minLength(message.minlength,
                { error: `Ton message doit contenir au moins ${message.minlength} caractères.` }),
            z.maxLength(message.maxlength,
                { error: `Ton message ne doit pas dépasser ${message.maxlength} caractères.` })
        )
});

export const turnstile = {
    origin: "https://challenges.cloudflare.com",
    responseField: "cf-turnstile-response"
} as const;

export const contactRequestSchema = z.extend(contactSchema, {
    [turnstile.responseField]: z.string().check(z.minLength(1), z.maxLength(2048))
});

export type ContactField = keyof typeof contactSchema.shape;

export const contactFormText = {
    submit: "Envoyer",
    sending: "Envoi...",
    success: "Merci ! Ton message a bien été envoyé, je te réponds dès que possible.",
    failure: "Ton message n'a pas pu être envoyé. Réessaie dans quelques instants ou écris-moi directement par e-mail.",
    rateLimited: "Tu as envoyé trop de messages en peu de temps. Patiente quelques minutes avant de réessayer.",
    challengeFailed: "La vérification anti-spam a échoué. Réessaie dans quelques instants.",
    challengeUnavailable: "La vérification anti-spam n'a pas pu se charger. Désactive ton bloqueur de contenu ou écris-moi directement par e-mail."
} as const;
