# Этап базового окружения с Bun
FROM oven/bun:1 AS base
WORKDIR /app

# Этап установки зависимостей
FROM base AS deps
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
COPY ../.env .env  
RUN cd /temp/dev && bun install --frozen-lockfile

# Сборка приложения
FROM base AS builder
WORKDIR /app
COPY --from=deps /temp/dev/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production

RUN bunx prisma generate  # Использование bunx для prisma
RUN bunx prisma migrate deploy  # Использование bunx для prisma
RUN bunx run build  # Использование bunx для сборки

# Проверка содержимого /app/.next
RUN ls -alh /app/.next

# Финальный этап для развертывания приложения с Nginx
FROM nginx:alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Установка зависимостей Nginx и создание конфигурации для Next.js 15
RUN apk add --no-cache bash curl

# Создание пользователя для безопасности
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копирование конфигурации Nginx
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# Создание директории и установка правильных прав для кэша prerender
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Копирование скомпилированного приложения
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

USER nextjs

# Настройка порта
EXPOSE 3000

ENV PORT=3000

# Копирование статики для Nginx
COPY --from=builder /app/public /usr/share/nginx/html

# Запуск приложения с Nginx
CMD ["nginx", "-g", "daemon off;"]
