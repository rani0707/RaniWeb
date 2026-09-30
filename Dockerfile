# syntax=docker/dockerfile:1.7

# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Install build deps only for the build stage
RUN apk add --no-cache libc6-compat

# Copy dependency manifests first so the install layer is cache-friendly
COPY package*.json ./

# `--ignore-scripts` prevents arbitrary postinstall scripts (potential RCE vector
# if a dependency is compromised) from running during the build.
RUN npm ci --ignore-scripts

COPY . .

RUN npm run build

# Stage 2: Production runtime
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# wget + tini are needed for HEALTHCHECK and proper signal handling
RUN apk add --no-cache wget tini && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy only the artefacts we need to serve
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE ${PORT}

ENV PORT=${PORT}
ENV HOSTNAME=${HOST}

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:${PORT} || exit 1

# tini reaps zombie processes and forwards signals to the node server
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "server.js"]