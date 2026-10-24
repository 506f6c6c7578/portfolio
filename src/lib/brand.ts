import { site } from "../data/site";

export const brandColors = {
    primary: "#121212",
    body: "#ffffff",
    darkBody: "#1c1c1c",
    text: "#444444",
    textDark: "#040404",
    textLight: "#717171",
    light: "#f6f6f6"
} as const;

export const iconSizes = [180, 192, 512] as const;

export const favicon = { radius: 16, icoSize: 48 } as const;

export const ogImage = {
    path: "/og.png",
    width: 1200,
    height: 630,
    alt: `${site.name}, ${site.tagline}`
} as const;

export const logoMarkPath = "M25 22 15 32l10 10M39 22l10 10-10 10";

const logoMark = `<path d="${logoMarkPath}" fill="none" stroke="${brandColors.body}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;

const xmlEntities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;"
};

function escapeXml(value: string): string {
    return value.replace(/[&<>"']/g, (character) => xmlEntities[character]);
}

export function createLogoSvg({ size, radius }: { size: number; radius: number }): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64"><rect width="64" height="64" rx="${radius}" fill="${brandColors.primary}"/>${logoMark}</svg>`;
}

export function createOgImageSvg(illustrationDataUri: string): string {
    const { width, height } = ogImage;
    const fontFamily = "Signika, Heebo, Roboto, 'Segoe UI', Helvetica, Arial, sans-serif";

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${brandColors.body}"/>
  <rect x="${width - 460}" width="460" height="${height}" fill="${brandColors.light}"/>
  <image x="${width - 426}" y="${(height - 392) /
    2}" width="392" height="392" href="${illustrationDataUri}"/>
  <svg x="96" y="96" width="88" height="88" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="${brandColors.primary}"/>${logoMark}</svg>
  <text x="96" y="340" font-family="${fontFamily}" font-size="92" font-weight="700" fill="${brandColors.textDark}">${escapeXml(
        site.name)}</text>
  <text x="96" y="420" font-family="${fontFamily}" font-size="34" font-weight="600" fill="${brandColors.text}">${escapeXml(
        site.tagline)}</text>
  <text x="96" y="530" font-family="${fontFamily}" font-size="30" fill="${brandColors.textLight}">${escapeXml(
        new URL(site.url).host)}</text>
  <rect y="${height - 10}" width="${width}" height="10" fill="${brandColors.primary}"/>
</svg>`;
}
