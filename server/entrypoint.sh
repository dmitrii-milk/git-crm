#!/bin/sh

# Run migrations
echo "Running Prisma migrations..."
npx prisma migrate deploy

# Start the app
echo "Starting NestJS app..."
node dist/main