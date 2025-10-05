FROM node:24 AS builder

RUN apt-get update && apt-get install -y -q --no-install-recommends \
        make

WORKDIR /app

COPY package*.json ./
COPY Makefile ./

RUN make deps

COPY . .

RUN make build

FROM node:24

WORKDIR /app

COPY --from=builder /app/dist ./dist

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

ENTRYPOINT ["node", "dist/index.js"]
