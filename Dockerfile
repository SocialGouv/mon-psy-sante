# from https://nextjs.org/docs/deployment

# Builder
FROM node:14-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

ARG PRODUCTION

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .

RUN if [ -z "$PRODUCTION" ]; then echo "Copy staging values"; cp .env.staging .env.production; cp ./public/robots.staging.txt ./public/robots.txt; fi
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline


# Production image, copy all the files and run next
FROM node:14-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.js .
COPY --from=builder /app/sentry.client.config.ts .
COPY --from=builder /app/sentry.server.config.ts .
COPY --from=builder /app/.sequelizerc .
COPY --from=builder /app/.env.production ./.env
COPY --from=builder /app/package.json .
COPY --from=builder /app/src ./src
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/.next ./.next

USER node

CMD ["yarn", "start"]
