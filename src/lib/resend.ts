import { RESEND_API_KEY } from "astro:env/server";

interface Email {
    from: string;
    to: string;
    replyTo: string;
    subject: string;
    text: string;
}

const endpoint = "https://api.resend.com/emails";
const timeout = 10_000;

export async function sendEmail({ replyTo, ...email }: Email): Promise<void> {
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...email, reply_to: replyTo }),
        signal: AbortSignal.timeout(timeout)
    });

    if (!response.ok) throw new Error(`Resend a refusé l'envoi (HTTP ${response.status})`);
}
