#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-$HOME/portfolio}"
REPO_URL="${REPO_URL:-https://github.com/dipee/portfolio.git}"
COMPOSE_FILE="docker-compose.prod.yml"

echo "→ Installing Docker (if needed)..."
if ! command -v docker >/dev/null 2>&1; then
  sudo apt-get update
  sudo apt-get install -y docker.io docker-compose-v2 git
  sudo usermod -aG docker "$USER"
  echo "Docker installed. Log out and back in, then re-run this script."
  exit 0
fi

mkdir -p "$APP_DIR"
cd "$APP_DIR"

if [ ! -f "$COMPOSE_FILE" ]; then
  if [ -d .git ]; then
    echo "→ Updating repository..."
    git pull origin main
  else
    echo "→ Cloning repository..."
    git clone "$REPO_URL" "$APP_DIR"
    cd "$APP_DIR"
  fi
fi

if [ ! -f "$COMPOSE_FILE" ]; then
  echo "Missing $COMPOSE_FILE after clone."
  exit 1
fi

if [ ! -f .env ]; then
  cat <<EOF
Create $APP_DIR/.env with:

  DATABASE_URL="postgresql://..."
  NEXT_PUBLIC_SITE_URL="https://dipendranath.com.np"

Then deploy with:

  export GHCR_TOKEN="your_github_pat_with_read_packages"
  bash scripts/deploy.sh
EOF
  exit 1
fi

chmod +x scripts/deploy.sh 2>/dev/null || true

echo ""
echo "Setup files ready in $APP_DIR"
echo "Run: export GHCR_TOKEN=... && bash scripts/deploy.sh"
