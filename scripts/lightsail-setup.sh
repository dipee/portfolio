#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-$HOME/portfolio}"
REPO_URL="${REPO_URL:-https://github.com/dipee/portfolio.git}"

echo "→ Installing Docker (if needed)..."
if ! command -v docker >/dev/null 2>&1; then
  sudo apt-get update
  sudo apt-get install -y docker.io docker-compose-v2 git
  sudo usermod -aG docker "$USER"
  echo "Docker installed. Log out and back in, then re-run this script."
  exit 0
fi

if [ ! -d "$APP_DIR/.git" ]; then
  echo "→ Cloning repository..."
  git clone "$REPO_URL" "$APP_DIR"
fi

cd "$APP_DIR"

if [ ! -f .env ]; then
  echo "Create $APP_DIR/.env with DATABASE_URL and NEXT_PUBLIC_SITE_URL, then re-run."
  exit 1
fi

chmod +x scripts/deploy.sh
./scripts/deploy.sh

echo ""
echo "Setup complete. App should be running on http://127.0.0.1:3000"
echo "Point Caddy/nginx at port 3000 for HTTPS."
