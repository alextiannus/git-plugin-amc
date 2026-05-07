#!/bin/bash

echo "============================================="
echo "准备发布 @12eat-ai/mcp-gbp 到 NPM"
echo "============================================="
echo ""
echo "1. 安装依赖..."
npm install

echo ""
echo "2. 登录 NPM (需要您有 @12eat-ai 组织的权限)..."
npm login

echo ""
echo "3. 发布包..."
npm publish --access public

echo ""
echo "如果发布成功，您现在可以在 OpenClaw 中正常使用 mcp.gbp 了！"
