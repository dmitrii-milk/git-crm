# Stage 1: Base image
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./

# Stage 2: Development
FROM base AS development
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

# Stage 3: Build the application
FROM base AS build

# Install dependencies needed for building on Alpine
RUN apk add --no-cache python3 make g++ curl

# Print environment information for debugging
RUN echo "Node version: $(node -v)" && \
    echo "NPM version: $(npm -v)" && \
    echo "Architecture: $(uname -m)" && \
    echo "OS: $(cat /etc/os-release | grep PRETTY_NAME)"

# Install all dependencies including devDependencies with verbose logging
RUN npm install --verbose

# Copy application files
COPY . .

# List project structure for debugging
RUN ls -la

# Add extra environment variables for debugging and native module compatibility
ENV VITE_DISABLE_NATIVE_MODULE=true
ENV DEBUG=vite:*
ENV NODE_ENV=production
ENV npm_config_loglevel=verbose

# Build the application with verbose logging
RUN echo "Starting build process..." && \
    NODE_OPTIONS="--max-old-space-size=8192" npm run build --verbose

# Stage 4: Serve the application with nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]