#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import os from 'os';

// Ensure correct number of arguments
if (process.argv.length < 5) {
  console.error("Usage: node set-mcp-env.js <tool_name> <env_key> <env_value>");
  console.error("Example: node set-mcp-env.js postfast POSTFAST_API_KEY pk_12345");
  process.exit(1);
}

const toolName = process.argv[2];
const envKey = process.argv[3];
const envValue = process.argv[4];

// Resolve path to openclaw.json
const configPath = path.join(os.homedir(), '.openclaw', 'openclaw.json');

let config = {};

// Load existing config if it exists
if (fs.existsSync(configPath)) {
  try {
    const rawData = fs.readFileSync(configPath, 'utf8');
    config = JSON.parse(rawData);
  } catch (err) {
    console.error(`Error parsing ${configPath}:`, err.message);
    process.exit(1);
  }
} else {
  // Ensure directory exists
  const dirPath = path.dirname(configPath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Ensure nested structure exists
if (!config.mcp) {
  config.mcp = {};
}
if (!config.mcp[toolName]) {
  config.mcp[toolName] = {};
}
if (!config.mcp[toolName].env) {
  config.mcp[toolName].env = {};
}

// Set the value
config.mcp[toolName].env[envKey] = envValue;

// Write back to file
try {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
  console.log(`✅ Successfully updated ${envKey} for mcp.${toolName} in ${configPath}`);
} catch (err) {
  console.error(`Error writing to ${configPath}:`, err.message);
  process.exit(1);
}
