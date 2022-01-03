ARG PRODUCTION

FROM node:14-alpine as builder

COPY . .

RUN yarn --production --frozen-lockfile --prefer-offline && yarn cache clean
RUN yarn build
RUN yarn export


FROM ghcr.io/socialgouv/docker/nginx:6.64.2

ARG PRODUCTION

COPY --from=builder /out /usr/share/nginx/html

# Create a robots.txt based on PRODUCTION build argument
RUN if [ ! -z "$PRODUCTION" ]; then echo -e "User-agent: *\nAllow: /">/usr/share/nginx/html/robots.txt; else echo -e "User-agent: *\nDisallow: /">/usr/share/nginx/html/robots.txt; fi

