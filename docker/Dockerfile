# Этап базового окружения с Bun
FROM oven/bun:1 AS base
WORKDIR /app

# Этап установки зависимостей
FROM base AS deps
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Сборка приложения
FROM base AS builder
WORKDIR /app
COPY --from=deps /temp/dev/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production

RUN bun prisma generate
RUN bunx prisma migrate deploy
RUN bun run build

# Финальный этап для развертывания приложения
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Создание пользователя для безопасности
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Создание директории и установка правильных прав для кэша prerender
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Копирование скомпилированного приложения
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# Запуск приложения
CMD ["bun", "start"]
