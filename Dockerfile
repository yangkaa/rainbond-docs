FROM docker.m.daocloud.io/node:18-alpine AS builder

WORKDIR /app

COPY package.json ./
RUN npm install --legacy-peer-deps --registry=https://registry.npmmirror.com

COPY . .
RUN npm run build

FROM docker.m.daocloud.io/nginx:1.21.6-alpine

COPY --from=builder /app/build/ /app/
COPY nginx.conf /etc/nginx/nginx.conf
