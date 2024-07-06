FROM node:22.4.0-slim as builder

WORKDIR /app
COPY . /app
RUN yarn global add pnpm &&\
  pnpm install --frozen-lockfile &&\
  pnpm run build

FROM httpd:alpine3.20
WORKDIR /usr/local/apache2/htdocs
EXPOSE 8888
COPY --chown=www-data:www-data --from=builder /app/dist /usr/local/apache2/htdocs
RUN apk add libcap && chown -hR www-data:www-data /usr/local/apache2/ && \
  setcap 'cap_net_bind_service=+ep' /usr/local/apache2/bin/httpd
USER www-data
