#!/usr/bin/env node

import { execSync } from 'child_process';

// Ensure correct number of arguments
if (process.argv.length < 5) {
  console.error("Usage: node set-mcp-env.js <tool_name> <env_key> <env_value>");
  console.error("Example: node set-mcp-env.js postfast POSTFAST_API_KEY pk_12345");
  process.exit(1);
}

const toolName = process.argv[2];
const envKey = process.argv[3];
const envValue = process.argv[4];

// Determine the correct configuration path based on whether it's an OpenClaw skill or an MCP server
let configPath = `mcp.servers.${toolName}.env.${envKey}`;
if (toolName === 'postfast') {
  // PostFast is an OpenClaw skill, not an MCP server
  configPath = `skills.entries.${toolName}.config.env.${envKey}`;
}

try {
  // Use native openclaw config set to safely merge and avoid gateway race conditions
  const command = `openclaw config set ${configPath} ${envValue}`;
  console.log(`Executing: ${command}`);
  const output = execSync(command, { encoding: 'utf8', stdio: 'inherit' });
  console.log(`✅ Successfully updated ${envKey} via native openclaw config (${configPath}).`);
  console.log(`Please run 'openclaw gateway restart' to apply changes.`);
} catch (err) {
  console.error(`❌ Error updating configuration via openclaw config:`, err.message);
  process.exit(1);
}
