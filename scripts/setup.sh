#!/usr/bin/env bash
set -euo pipefail

echo "=== Nexus Links Setup ==="

echo "1. Checking Docker..."
if ! command -v docker &>/dev/null; then
  echo "Docker is required. Install it from https://docs.docker.com/engine/install/"
  exit 1
fi

echo "2. Starting PostgreSQL and pgAdmin..."
docker compose -f docker/docker-compose.yml up -d

echo "   Waiting for PostgreSQL to be healthy..."
until docker compose -f docker/docker-compose.yml exec -T postgres pg_isready -U nexus -d nexus-links &>/dev/null; do
  sleep 1
done
echo "   PostgreSQL is ready."

echo "3. Copying environment files..."
cp -n apps/api/.env.example apps/api/.env 2>/dev/null || true
cp -n apps/web/.env.example apps/web/.env 2>/dev/null || true

echo "4. Generating Prisma client..."
pnpm exec prisma generate

echo "5. Pushing database schema..."
pnpm exec prisma db push

echo ""
echo "Setup complete! Run 'pnpm dev' to start."
