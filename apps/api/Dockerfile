FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy root configurations
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json* ./

# Copy packages and the api app
COPY packages ./packages
COPY apps/api ./apps/api

# Install dependencies (all needed for the build)
RUN pnpm install --frozen-lockfile

WORKDIR /app/apps/api

ENV PORT=4000
ENV NODE_ENV=production
EXPOSE $PORT
