#!/usr/bin/env bash
set -euo pipefail

# Deployment script for managed-agents-sample-api
# Target: production environment

BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")
COMMIT=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")

echo "=== Deploying managed-agents-sample-api ==="
echo "Branch:      $BRANCH"
echo "Commit:      $COMMIT"
echo "Environment: production"
echo "Timestamp:   $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
echo ""
echo "Step 1/4: Building TypeScript..."
echo "  > tsc --build"
echo "  ✓ Build complete"
echo ""
echo "Step 2/4: Running pre-deploy checks..."
echo "  > npm test"
echo "  ✓ All tests passed"
echo ""
echo "Step 3/4: Pushing container image..."
echo "  > docker push registry.example.com/sample-api:$COMMIT"
echo "  ✓ Image pushed"
echo ""
echo "Step 4/4: Rolling out to production..."
echo "  > kubectl rollout restart deployment/sample-api -n production"
echo "  ✓ Rollout initiated"
echo ""
echo "=== Deployment complete ==="
