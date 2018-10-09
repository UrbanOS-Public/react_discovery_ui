FROM node:10.3.0-alpine AS builder
COPY . /app/src
WORKDIR /app/src
RUN npm ci
RUN npm run build
RUN npm test

FROM nginx
COPY --from=builder /app/src/dist /usr/share/nginx/html
COPY --from=builder /app/src/run.sh /run.sh
WORKDIR /usr/share/nginx/html
CMD ["/run.sh"]
