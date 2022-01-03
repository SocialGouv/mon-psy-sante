ARG PRODUCTION

FROM node:14-alpine as builder

COPY . .

RUN yarn --production --frozen-lockfile --prefer-offline && yarn cache clean
RUN yarn build
RUN yarn export


FROM ghcr.io/socialgouv/docker/nginx:6.64.2

ARG PRODUCTION

COPY --from=builder /out /usr/share/nginx/html

RUN if [ ! -z "$PRODUCTION" ]; then echo "PRODUCTION">/usr/share/nginx/html/env.html; else echo "DEV">/usr/share/nginx/html/env.html; fi

