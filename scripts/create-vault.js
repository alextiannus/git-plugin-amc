import fs from 'fs/promises';
import path from 'path';
import os from 'os';

const BRAND_SLUG = process.argv[2];
let PARENT_URL = process.argv[3];

if (!BRAND_SLUG) {
  console.error("Error: Brand slug is required. Usage: node scripts/create-vault.js <brand_slug> [parent_folder_url]");
  process.exit(1);
}

if (!PARENT_URL || PARENT_URL === 'null') {
  PARENT_URL = "https://12eat-ai.sg.larksuite.com/drive/folder/PbugfutjllCDM0dqMiIlN0orgZd";
}

const PARENT_TOKEN = PARENT_URL.split('?')[0].split('/').pop();

async function getCredentials() {
  const configPath = path.join(os.homedir(), '.openclaw', 'openclaw.json');
  try {
    const data = await fs.readFile(configPath, 'utf8');
    const config = JSON.parse(data);
    const appId = config.channels?.feishu?.appId;
    const appSecret = config.channels?.feishu?.appSecret;
    if (!appId || !appSecret) throw new Error("Credentials missing in openclaw.json");
    return { appId, appSecret };
  } catch (err) {
    console.error("Error reading OpenClaw config:", err.message);
    process.exit(1);
  }
}

async function getTenantAccessToken(appId, appSecret) {
  const res = await fetch("https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ app_id: appId, app_secret: appSecret })
  });
  const data = await res.json();
  if (data.code !== 0) throw new Error("Failed to get token: " + JSON.stringify(data));
  return data.tenant_access_token;
}

async function createFolder(token, name, folderToken) {
  const res = await fetch("https://open.larksuite.com/open-apis/drive/v1/files/create_folder", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({ name, folder_token: folderToken })
  });
  const data = await res.json();
  if (data.code !== 0) throw new Error("Failed to create folder: " + JSON.stringify(data));
  return data.data; // { token, url }
}

async function uploadFile(token, filePath, fileName, folderToken) {
  const stat = await fs.stat(filePath);
  const fileContent = await fs.readFile(filePath);
  const blob = new Blob([fileContent]);

  const formData = new FormData();
  formData.append("file_name", fileName);
  formData.append("parent_type", "explorer");
  formData.append("parent_node", folderToken);
  formData.append("size", stat.size.toString());
  formData.append("file", blob, fileName);

  const res = await fetch("https://open.larksuite.com/open-apis/drive/v1/files/upload_all", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: formData
  });
  const data = await res.json();
  if (data.code !== 0) throw new Error(`Failed to upload ${fileName}: ` + JSON.stringify(data));
  return data.data;
}

async function syncDirectory(token, localDir, remoteFolderToken) {
  const entries = await fs.readdir(localDir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(localDir, entry.name);
    if (entry.isDirectory()) {
      console.log(`[+] Creating folder: ${entry.name}`);
      const newFolder = await createFolder(token, entry.name, remoteFolderToken);
      await syncDirectory(token, fullPath, newFolder.token);
    } else if (entry.isFile()) {
      console.log(`  -> Uploading file: ${entry.name}`);
      await uploadFile(token, fullPath, entry.name, remoteFolderToken);
    }
  }
}

async function main() {
  console.log(`Starting Vault creation for ${BRAND_SLUG}...`);
  const { appId, appSecret } = await getCredentials();
  const token = await getTenantAccessToken(appId, appSecret);

  console.log(`Creating main vault folder: vault-${BRAND_SLUG}`);
  const rootFolder = await createFolder(token, `vault-${BRAND_SLUG}`, PARENT_TOKEN);

  const templatesDir = path.join(process.cwd(), 'vault-templates');
  
  try {
    await fs.access(templatesDir);
    console.log("Uploading templates...");
    await syncDirectory(token, templatesDir, rootFolder.token);
  } catch (err) {
    console.log("No vault-templates directory found or error accessing it:", err.message);
  }

  console.log("✅ Vault folder created successfully!");
  console.log(rootFolder.url);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
