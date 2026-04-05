FROM node:20-alpine as builder

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the React app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built React app
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy public HTML files to root
COPY --from=builder /app/public/*.html /usr/share/nginx/html/

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 5020

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5020 || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
