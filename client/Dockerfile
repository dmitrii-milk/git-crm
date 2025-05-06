# Step 1: Build the React app with Vite
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and lock file first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

ENV VITE_API_URL=http://localhost:3001/api/v1

# Build the app (Vite output goes to dist/)
RUN npm run build

# Step 2: Serve with NGINX
FROM nginx:stable-alpine

# Copy custom NGINX config (defined below)
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built app from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 3002
EXPOSE 3002

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]