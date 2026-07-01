#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-$HOME/portfolio}"

cd "$APP_DIR"

echo "→ Pulling latest code..."
git fetch origin main
git reset --hard origin/main

echo "→ Building and starting containers..."
docker compose up -d --build

echo "→ Pruning unused images..."
docker image prune -f

echo "→ Deploy complete."
docker compose ps
