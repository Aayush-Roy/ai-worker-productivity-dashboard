# # Build stage
# FROM node:20-alpine AS builder

# WORKDIR /app

# # Install pnpm
# RUN corepack enable && corepack prepare pnpm@latest --activate

# # Copy package files
# COPY package.json pnpm-lock.yaml* ./
# COPY prisma ./prisma/

# # Install dependencies
# RUN pnpm install --frozen-lockfile

# # Generate Prisma client
# RUN pnpm prisma generate

# # Copy source code
# COPY . .

# # Build the application
# RUN pnpm build

# # Production stage
# FROM node:20-alpine AS runner

# WORKDIR /app

# ENV NODE_ENV=production

# # Install pnpm
# RUN corepack enable && corepack prepare pnpm@latest --activate

# # Create non-root user
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# # Copy built application
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static
# COPY --from=builder /app/prisma ./prisma
# COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# USER nextjs

# EXPOSE 3000

# ENV PORT=3000
# ENV HOSTNAME="0.0.0.0"

# CMD ["node", "server.js"]

# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache openssl

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml* ./
COPY prisma ./prisma/

RUN pnpm install --frozen-lockfile

RUN pnpm prisma generate

COPY . .

RUN pnpm build


# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

RUN apk add --no-cache openssl

ENV NODE_ENV=production

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

USER nextjs

EXPOSE 3000

CMD ["node","server.js"]