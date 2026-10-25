import node from "@astrojs/node";
import { defineConfig, envField, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { site } from "./src/data/site";

const requestBodySizeLimit = 32 * 1024;

export default defineConfig({
    site: site.url,
    adapter: node({ mode: "standalone", bodySizeLimit: requestBodySizeLimit }),
    trailingSlash: "never",
    compressHTML: true,
    build: {
        format: "file",
        inlineStylesheets: "always"
    },
    vite: {
        build: {
            assetsInlineLimit: (filePath) => /[\\/]src[\\/]assets[\\/]logos[\\/]/.test(filePath) ? false : undefined
        },
        plugins: [
            {
                name: "bundle-server-dependencies",
                apply: "build",
                config: () => ({ ssr: { noExternal: true, external: ["sharp"] } })
            }
        ]
    },
    markdown: {
        syntaxHighlight: false
    },
    prefetch: {
        prefetchAll: true,
        defaultStrategy: "hover"
    },
    integrations: [sitemap({ lastmod: new Date() })],
    env: {
        schema: {
            RESEND_API_KEY: envField.string({ context: "server", access: "secret" }),
            TURNSTILE_SECRET_KEY: envField.string({ context: "server", access: "secret" }),
            TURNSTILE_SITE_KEY: envField.string({ context: "client", access: "public" })
        }
    },
    security: {
        actionBodySizeLimit: requestBodySizeLimit,
        allowedDomains: [{ hostname: new URL(site.url).hostname, protocol: "https" }],
        csp: {
            directives: [
                "default-src 'self'",
                "img-src 'self'",
                "connect-src 'self'",
                "manifest-src 'self'",
                "object-src 'none'",
                "base-uri 'self'",
                "form-action 'self'",
                "upgrade-insecure-requests"
            ]
        }
    },
    fonts: [
        {
            provider: fontProviders.fontsource(),
            name: "Signika",
            cssVariable: "--font-heading",
            weights: ["500 700"],
            styles: ["normal"],
            subsets: ["latin"],
            fallbacks: ["sans-serif"]
        },
        {
            provider: fontProviders.fontsource(),
            name: "Heebo",
            cssVariable: "--font-body",
            weights: ["400 600"],
            styles: ["normal"],
            subsets: ["latin"],
            fallbacks: ["sans-serif"]
        }
    ]
});
