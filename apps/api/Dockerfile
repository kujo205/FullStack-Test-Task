FROM node:20-alpine

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy workspace packages
COPY packages ./packages
COPY apps/api ./apps/api

# Copy other config files
COPY turbo.json* ./

# Install dependencies
RUN pnpm install

# Set working directory to api
WORKDIR /app/apps/api

ENV PORT=4000
ENV NODE_ENV=production

# Expose port
EXPOSE $PORT

# Start with tsx (no build needed)
CMD ["pnpm", "tsx", "src/infra/http/index.ts"]
