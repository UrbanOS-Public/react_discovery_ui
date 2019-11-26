FROM node:12.13.1 AS builder
COPY . /app/src
WORKDIR /app/src
RUN export NODE_OPTS="--max-old-space-size=8192"
RUN npm ci
RUN npm run build

FROM nginx
COPY --from=builder /app/src/dist /usr/share/nginx/html
COPY --from=builder /app/src/run.sh /run.sh
COPY --from=builder /app/src/nginx-default.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
CMD ["/run.sh"]
