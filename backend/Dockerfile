FROM node:22.15.0-alpine AS base
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS development
COPY . .
EXPOSE 3000
CMD ["pnpm", "run", "start:dev"]

FROM base AS builder
COPY . .
RUN pnpm run build

FROM base AS prod-deps
RUN pnpm prune --prod

FROM node:22.15.0-alpine AS production
RUN apk add --no-cache dumb-init
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
EXPOSE 3000
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main"]
