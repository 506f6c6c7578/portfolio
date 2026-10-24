import { TURNSTILE_SECRET_KEY } from "astro:env/server";
import * as z from "zod/mini";
import { turnstile } from "./contact";

const endpoint = `${turnstile.origin}/turnstile/v0/siteverify`;
const timeout = 5_000;

const verificationSchema = z.object({
    success: z.boolean(),
    "error-codes": z.optional(z.array(z.string()))
});

export async function verifyTurnstile(token: string, remoteIp: string): Promise<boolean> {
    try {
        const response = await fetch(endpoint, {
            method: "POST",
            body: new URLSearchParams({
                secret: TURNSTILE_SECRET_KEY,
                response: token,
                remoteip: remoteIp
            }),
            signal: AbortSignal.timeout(timeout)
        });
        const {
            success,
            "error-codes": errorCodes = []
        } = verificationSchema.parse(await response.json());
        if (!success) console.warn("Vérification Turnstile refusée :", errorCodes.join(", "));
        return success;
    } catch (error) {
        console.error("Échec de la vérification Turnstile :", error);
        return false;
    }
}
