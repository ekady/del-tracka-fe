# Build Stage
FROM node:20-alpine AS builder
WORKDIR /app

# Install PNPM
RUN npm install -g pnpm

# Copy package files first (for caching)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod=false

# Copy source code
COPY . .

# Build the Next.js app
RUN pnpm build

# Prune dev dependencies
RUN pnpm prune --prod

# Production Stage
FROM node:20-alpine AS production
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Copy only necessary files from builder
# COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public

COPY --from=builder /app/.next/standalone/.next ./.next
COPY --from=builder /app/.next/standalone/node_modules ./node_modules
COPY --from=builder /app/.next/standalone/server.js ./server.js
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 && \
    chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]