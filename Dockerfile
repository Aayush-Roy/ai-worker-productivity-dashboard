

# # Build stage
# FROM node:20-alpine AS builder

# WORKDIR /app

# RUN apk add --no-cache openssl

# RUN corepack enable && corepack prepare pnpm@latest --activate

# COPY package.json pnpm-lock.yaml* ./
# COPY prisma ./prisma/

# RUN pnpm install --frozen-lockfile

# RUN pnpm prisma generate

# COPY . .

# RUN pnpm build


# # Production stage
# FROM node:20-alpine AS runner

# WORKDIR /app

# RUN apk add --no-cache openssl

# ENV NODE_ENV=production

# RUN corepack enable && corepack prepare pnpm@latest --activate

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static
# COPY --from=builder /app/prisma ./prisma

# USER nextjs

# EXPOSE 3000

# CMD ["node","server.js"]
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install openssl for Prisma
RUN apk add --no-cache openssl

# Copy package files (using wildcard to get both package.json and package-lock.json)
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies using npm
RUN npm install

# Generate Prisma Client
RUN npx prisma generate

# Copy the rest of the source code
COPY . .

# Build the Next.js app
RUN npm run build


# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Install openssl for production runtime
RUN apk add --no-cache openssl

ENV NODE_ENV=production

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone build and static files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

# Set the correct permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

# Next.js standalone server
CMD ["node", "server.js"]