# --- Stage 1: Dependencies ---
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable && pnpm i --frozen-lockfile

# --- Stage 2: Builder ---
FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# 重要：先生成內容資料，再進行 Next.js build
RUN npx contentlayer2 build
RUN pnpm build

# --- Stage 3: Runner ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Cloud Run 會自動注入 PORT 環境變數
ENV PORT=8080 

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 8080
# 使用 sh -c 來確保變數被正確解析
CMD ["sh", "-c", "node server.js -p $PORT"]