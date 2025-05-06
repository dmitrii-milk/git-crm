# Multi-stage build for Node.js application

# ==== BUILDER STAGE ====
FROM node:20-alpine3.20 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies including development ones
RUN npm ci

# Copy prisma schema
COPY prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# ==== PRODUCTION STAGE ====
FROM node:20-alpine3.20 AS production

# Set working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy prisma schema and generated client
COPY prisma ./prisma/
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Copy entrypoint.sh
COPY --from=builder /app/entrypoint.sh ./entrypoint.sh

# Create a non-root user and switch to it
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 -G nodejs

# Ownership to nestjs user
RUN chown -R nestjs:nodejs /app
RUN chmod +x /app/entrypoint.sh

USER nestjs

# Expose application port
EXPOSE 3001

CMD ["/app/entrypoint.sh"]
