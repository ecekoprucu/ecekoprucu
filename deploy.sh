#!/usr/bin/env bash
# Deploy the site to the EC2 server.
#
#   ./deploy.sh          build the current commit, push it to ECR, and run it on the server
#   ./deploy.sh <tag>    redeploy an image that's already in ECR (e.g. to roll back to an older commit)
#
# Images are tagged with the short git commit hash, so every deploy can be traced back to a commit.
set -euo pipefail

cd "$(dirname "$0")"

# Server and account details live in deploy.env, which is gitignored (this repo is public).
# It needs REGION, REPO (ECR repository URI), SERVER (user@ip) and SSH_KEY (path to .pem).
if [ ! -f deploy.env ]; then
  echo "Missing deploy.env. Create it with REGION, REPO, SERVER and SSH_KEY." >&2
  exit 1
fi
# shellcheck source=/dev/null
source deploy.env
: "${REGION:?set REGION in deploy.env}" "${REPO:?set REPO in deploy.env}"
: "${SERVER:?set SERVER in deploy.env}" "${SSH_KEY:?set SSH_KEY in deploy.env}"
SSH_KEY=${SSH_KEY/#\~/$HOME}

echo "==> Logging in to ECR"
aws ecr get-login-password --region "$REGION" | docker login --username AWS --password-stdin "${REPO%/*}" >/dev/null

if [ $# -ge 1 ]; then
  TAG=$1
  echo "==> Redeploying existing image ${TAG}"
else
  if [ -n "$(git status --porcelain)" ]; then
    echo "You have uncommitted changes. Commit them first so the deployed version matches a commit." >&2
    exit 1
  fi
  TAG=$(git rev-parse --short HEAD)
  echo "==> Building and pushing ${TAG}"
  docker buildx build --platform linux/arm64 -t "${REPO}:${TAG}" -t "${REPO}:latest" --push .
fi

echo "==> Restarting the container on the server"
ssh -i "$SSH_KEY" -o ConnectTimeout=10 "$SERVER" bash -s -- "$REPO" "$TAG" "$REGION" <<'REMOTE'
set -euo pipefail
REPO=$1 TAG=$2 REGION=$3
aws ecr get-login-password --region "$REGION" | docker login --username AWS --password-stdin "${REPO%/*}" >/dev/null
docker pull -q "${REPO}:${TAG}"
docker rm -f site >/dev/null 2>&1 || true
docker run -d --name site --restart unless-stopped -p 80:80 "${REPO}:${TAG}" >/dev/null

for _ in $(seq 10); do
  if curl -sf -o /dev/null http://localhost/; then
    docker image prune -af >/dev/null   # free disk space; old versions can be pulled from ECR again
    echo "Site is up, running ${TAG}"
    exit 0
  fi
  sleep 1
done
echo "Container did not respond. Check: docker logs site" >&2
exit 1
REMOTE

echo "==> Done: https://www.ecekoprucu.com"
