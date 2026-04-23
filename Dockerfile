# 1. BASE
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# 2. DEPENDENCIAS
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
# Limpiamos la redundancia, solo ejecutamos PNPM
RUN pnpm install --frozen-lockfile

# 3. BUILDER (Construcción)
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# DEVSECOPS: Variables requeridas para que Payload/Next compilen correctamente el UI
# Debes pasarlas en el docker-compose usando 'args'
ARG NEXT_PUBLIC_API_URL
ARG SERVER_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV SERVER_URL=$SERVER_URL

# Deshabilitar telemetría para acelerar el build y evitar fugas de datos
ENV NEXT_TELEMETRY_DISABLED 1

RUN pnpm run build

RUN mkdir -p public

# 4. RUNNER (Producción)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000

# Primero: Creamos el usuario de seguridad para poder usarlo en los COPY
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Segundo: Creamos carpetas necesarias y damos permisos
RUN mkdir -p public .next && chown nextjs:nodejs public .next

# Tercero: Copiamos los archivos (Asegúrate de la ruta de tu payload.config)
# Si tu archivo está en la raíz, se queda así. 
# Si está en src/, cambia la ruta a /app/src/payload.config.ts
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/tsconfig.json ./

# Intentamos copiar el config. Si falla, es que está en src/
# Usamos un wildcard (*) o verificamos la ruta exacta:
COPY --from=builder --chown=nextjs:nodejs /app/src/payload.config.ts ./
COPY --from=builder --chown=nextjs:nodejs /app/src ./src 

# Cuarto: Instalamos sharp para el manejo de imágenes
RUN pnpm add sharp

USER nextjs
EXPOSE 3000

CMD npx payload migrate && HOSTNAME="0.0.0.0" node server.js