FROM node:24 AS builder

RUN apt-get update && apt-get install -y -q --no-install-recommends \
        make

WORKDIR /app

COPY package*.json ./
COPY Makefile ./

RUN make deps

COPY . .

RUN make build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy built static files from builder
COPY --from=builder /app/dist/public ./

COPY infra/images/runtime-files/nginx.conf /etc/nginx/nginx.conf

EXPOSE 9090

ENTRYPOINT ["nginx", "-g", "daemon off;"]
