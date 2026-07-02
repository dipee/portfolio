#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-$HOME/portfolio}"
COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.prod.yml}"

cd "$APP_DIR"

if [ ! -f "$COMPOSE_FILE" ]; then
  echo "Missing $APP_DIR/$COMPOSE_FILE"
  exit 1
fi

if [ ! -f .env ]; then
  echo "Missing $APP_DIR/.env"
  exit 1
fi

if [ -z "${GHCR_TOKEN:-}" ]; then
  echo "Set GHCR_TOKEN (GitHub PAT with read:packages) before running deploy."
  exit 1
fi

GHCR_USER="${GHCR_USER:-dipee}"

echo "→ Logging in to GHCR..."
echo "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_USER" --password-stdin

echo "→ Syncing compose file..."
git pull origin main 2>/dev/null || true

echo "→ Pulling latest image..."
docker compose -f "$COMPOSE_FILE" pull

echo "→ Starting containers..."
docker compose -f "$COMPOSE_FILE" up -d

echo "→ Pruning unused images..."
docker image prune -f

echo "→ Deploy complete."
docker compose -f "$COMPOSE_FILE" ps
