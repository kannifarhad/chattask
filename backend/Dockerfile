# ---------- Stage 1: Build the app and prepare the production bundle ----------
FROM node:20-slim AS build

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install only production dependencies first for faster caching
COPY package.json .
COPY package-lock.json .
RUN npm install

# Copy the full source code into the image
COPY . .

# Copy production environment variables and rename it to `.env`
# Prisma and the app expect `.env` during build/seed/migration
COPY .env.production .env

# Generate Prisma client for the current platform
RUN npx prisma generate

# Apply DB schema using Prisma migrations
RUN npx prisma migrate deploy

# Seed the database with initial data (uses the generated Prisma client)
RUN npm run db:seed

# Build the NestJS app (compiles TypeScript to JavaScript)
RUN npm run build

# ---------- Stage 2: Create a lightweight production image ----------
FROM node:20-slim

# Install minimal dependencies required to run the app
RUN apt update && apt install libssl-dev dumb-init -y --no-install-recommends

# Set the working directory for the app
WORKDIR /usr/src/app

# Copy the built application and production files from the build stage
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/.env.production .env
COPY --chown=node:node --from=build /usr/src/app/package.json .
COPY --chown=node:node --from=build /usr/src/app/package-lock.json .
COPY --chown=node:node --from=build /usr/src/app/prisma ./prisma

# Install only production dependencies (omit devDependencies)
RUN npm install --omit=dev

# Copy generated Prisma client (includes query engine binaries)
COPY --chown=node:node --from=build /usr/src/app/node_modules/.prisma/client ./node_modules/.prisma/client

# Expose the app port
EXPOSE 9000

# Start the app using dumb-init for proper signal handling (graceful shutdown)
CMD ["dumb-init", "node", "dist/src/main"]