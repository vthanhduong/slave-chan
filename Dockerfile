# Stage 1: Install & Build
FROM node:22-alpine AS builder

ARG DATABASE_URL
ARG AI_GATEWAY_API_KEY

WORKDIR /app
COPY package*.json ./

RUN echo "DATABASE_URL=$DATABASE_URL" >> .env && \
  echo "AI_GATEWAY_API_KEY=$AI_GATEWAY_API_KEY" >> .env

RUN npm install
COPY . .
RUN npm run build

# Stage 2: Runner
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Nuxt build xong nằm hết trong .output
COPY --from=builder /app/.output ./.output

# Nuxt chạy mặc định qua file server/index.mjs trong .output
EXPOSE 3000
ENV PORT 3000

CMD ["node", ".output/server/index.mjs"]
