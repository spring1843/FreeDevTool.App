FROM node:24 AS builder

RUN apt-get update && apt-get install -y -q --no-install-recommends \
        make

WORKDIR /app

COPY package*.json ./
COPY Makefile ./

RUN make deps

COPY . .

RUN make build-static

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy built static files from builder
COPY --from=builder /app/dist/public ./

# Copy entrypoint script
COPY infra/images/runtime-files/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Default port (can be overridden with -e PORT=xxxx)
ENV PORT=9090

EXPOSE ${PORT}

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:${PORT}/health || exit 1

ENTRYPOINT ["/entrypoint.sh"]
