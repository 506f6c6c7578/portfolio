# syntax=docker/dockerfile:1.7

FROM node:24.18.1-alpine3.24@sha256:f70403e87646dc51b45295f4b8b70cdad0b63d2297c4c9899119b03f7af7a6b3 AS base

ENV CI=true \
    ASTRO_TELEMETRY_DISABLED=1

WORKDIR /app

RUN npm install --global --ignore-scripts pnpm@12.6.0 && npm cache clean --force

COPY package.json pnpm-lock.yaml ./

FROM base AS build

RUN apk add --no-cache fontconfig font-roboto

ARG TURNSTILE_SITE_KEY

RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

COPY astro.config.ts tsconfig.json ./
COPY src ./src

RUN pnpm build \
    && find dist/client -type f \( -name '*.html' -o -name '*.css' -o -name '*.js' -o -name '*.svg' -o -name '*.txt' -o -name '*.xml' -o -name '*.webmanifest' \) \
        -exec sh -c 'gzip -9 -n -c "$1" > "$1.gz"' _ {} \;

FROM node:24.18.1-alpine3.24@sha256:f70403e87646dc51b45295f4b8b70cdad0b63d2297c4c9899119b03f7af7a6b3 AS contact

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=4321

WORKDIR /app

COPY --chown=root:root --from=build /app/dist/server ./dist/server

USER node

EXPOSE 4321

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "fetch('http://127.0.0.1:4321/').then(() => process.exit(0), () => process.exit(1))"

CMD ["node", "dist/server/entry.mjs"]

FROM nginxinc/nginx-unprivileged:1.30.6-alpine3.24@sha256:f5116ed4606f3eb015dd4a8e28cb9b351476dc0ad4bc6e9f93b19cec130cdf03 AS web

COPY --chown=root:root docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --chown=root:root docker/security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --chown=root:root --from=build /app/dist/client /srv/portfolio

USER 101

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -q -O /dev/null http://127.0.0.1:8080/ || exit 1
