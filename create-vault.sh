#!/bin/bash
# ─────────────────────────────────────────────────────────────
# F&B Content Engine — Vault Creator
# Uses Lark/Feishu Open API to create a brand vault folder.
# ─────────────────────────────────────────────────────────────

BRAND_SLUG=$1
PARENT_URL=$2

if [ -z "$BRAND_SLUG" ]; then
  echo "Error: Brand slug is required. Usage: ./create-vault.sh <brand_slug> [parent_folder_url]"
  exit 1
fi

if [ -z "$PARENT_URL" ] || [ "$PARENT_URL" == "null" ]; then
  # Default to AI Workspaces folder if not provided
  PARENT_URL="https://12eat-ai.sg.larksuite.com/drive/folder/PbugfutjllCDM0dqMiIlN0orgZd"
fi

# Extract the folder token from the URL (removes query params if any, and gets the last path segment)
PARENT_TOKEN=$(echo "$PARENT_URL" | sed 's/?.*//' | awk -F/ '{print $NF}')

# Get App ID and Secret from OpenClaw config
OPENCLAW_CONFIG="$HOME/.openclaw/openclaw.json"
if [ ! -f "$OPENCLAW_CONFIG" ]; then
  echo "Error: OpenClaw config not found at $OPENCLAW_CONFIG"
  exit 1
fi

APP_ID=$(jq -r '.channels.feishu.appId' "$OPENCLAW_CONFIG")
APP_SECRET=$(jq -r '.channels.feishu.appSecret' "$OPENCLAW_CONFIG")

if [ "$APP_ID" == "null" ] || [ -z "$APP_ID" ]; then
  echo "Error: Feishu/Lark app credentials not found in config."
  exit 1
fi

# Get Tenant Access Token
TOKEN_RES=$(curl -s -X POST https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "{\"app_id\":\"${APP_ID}\",\"app_secret\":\"${APP_SECRET}\"}")

TOKEN=$(echo "$TOKEN_RES" | jq -r .tenant_access_token)

if [ "$TOKEN" == "null" ] || [ -z "$TOKEN" ]; then
  echo "Error: Failed to get access token."
  echo "$TOKEN_RES"
  exit 1
fi

# Create Folder
CREATE_RES=$(curl -s -X POST "https://open.larksuite.com/open-apis/drive/v1/files/create_folder" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "{\"name\":\"vault-${BRAND_SLUG}\",\"folder_token\":\"${PARENT_TOKEN}\"}")

CODE=$(echo "$CREATE_RES" | jq -r .code)
if [ "$CODE" != "0" ]; then
  echo "Error: Failed to create folder."
  echo "$CREATE_RES"
  exit 1
fi

NEW_FOLDER_URL=$(echo "$CREATE_RES" | jq -r .data.url)

echo "✅ Vault folder created successfully!"
echo "$NEW_FOLDER_URL"
