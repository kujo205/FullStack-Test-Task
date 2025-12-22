FROM node:20-alpine AS builder
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# 1. Copy workspace manifests
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY packages/typescript-config/package.json ./packages/typescript-config/
COPY packages/biome-config/package.json ./packages/biome-config/
COPY apps/web/package.json ./apps/web/
COPY apps/api/package.json ./apps/api/

# 2. Install ALL dependencies
# (This is fast because we only copied package.jsons so far)
RUN pnpm install --frozen-lockfile

# 3. Copy ALL source code
# (Vite needs the API folder because of your TSConfig/Vite setup)
COPY . .

# 4. Build only the web app
RUN pnpm turbo run build --filter=web

# 5. Production Runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Copy only the compiled output
COPY --from=builder /app/apps/web/.output ./apps/web/.output

ENV PORT=3000

EXPOSE $PORT
CMD ["node", "apps/web/.output/server/index.mjs"]
