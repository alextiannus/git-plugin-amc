import fs from 'fs/promises';
import path from 'path';
import os from 'os';

const BRAND_SLUG = process.argv[2];
const PARENT_URL = process.argv[3]; // optional — if omitted, vault goes to Lark Drive root

if (!BRAND_SLUG) {
  console.error("Error: Brand slug is required. Usage: node scripts/create-vault.js <brand_slug> [parent_folder_url]");
  process.exit(1);
}

// PARENT_TOKEN is resolved at runtime inside main() — see getRootFolderToken()

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

/**
 * Resolve the parent folder token:
 * - If a URL was passed as argv[3], extract token from it.
 * - Otherwise, call the Lark API to get the user's own Drive root folder token.
 */
async function resolveParentToken(accessToken) {
  if (PARENT_URL) {
    const token = PARENT_URL.split('?')[0].split('/').pop();
    console.log(`Using specified parent folder token: ${token}`);
    return token;
  }

  // No parent URL supplied → create vault in the user's Lark Drive root
  console.log("No parent folder specified — fetching Lark Drive root folder...");
  const res = await fetch("https://open.larksuite.com/open-apis/drive/explorer/v2/root_folder/meta", {
    method: "GET",
    headers: { "Authorization": `Bearer ${accessToken}` }
  });
  const data = await res.json();
  if (data.code !== 0) throw new Error("Failed to get root folder: " + JSON.stringify(data));
  const rootToken = data.data?.token;
  if (!rootToken) throw new Error("Root folder token not found in response: " + JSON.stringify(data));
  console.log(`Using Lark Drive root folder token: ${rootToken}`);
  return rootToken;
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

// Maps local relative path to remote folder token
const folderMap = new Map();

async function syncDirectory(token, localDir, remoteFolderToken, baseDir) {
  const entries = await fs.readdir(localDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const fullPath = path.join(localDir, entry.name);
    const relPath = path.relative(baseDir, fullPath);
    
    if (entry.isDirectory()) {
      console.log(`[+] Creating folder: ${entry.name}`);
      const newFolder = await createFolder(token, entry.name, remoteFolderToken);
      folderMap.set(relPath, newFolder.token);
      await syncDirectory(token, fullPath, newFolder.token, baseDir);
    } else if (entry.isFile()) {
      console.log(`  -> Uploading file: ${entry.name}`);
      await uploadFile(token, fullPath, entry.name, remoteFolderToken);
    }
  }
}

async function createBitable(token, name, folderToken) {
  const res = await fetch("https://open.larksuite.com/open-apis/bitable/v1/apps", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({ name, folder_token: folderToken })
  });
  const data = await res.json();
  if (data.code !== 0) throw new Error("Failed to create Bitable: " + JSON.stringify(data));
  return data.data.app;
}

async function addBitableField(token, appToken, tableId, fieldConfig) {
  const res = await fetch(`https://open.larksuite.com/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/fields`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(fieldConfig)
  });
  const data = await res.json();
  if (data.code !== 0) {
    console.warn(`Warning: Failed to add field ${fieldConfig.field_name}:`, data.msg);
  }
}

async function setupPostScheduleBitable(token, folderToken) {
  console.log(`  -> Creating Content Schedule Bitable...`);
  const app = await createBitable(token, "Content Schedule", folderToken);
  
  await addBitableField(token, app.app_token, app.default_table_id, { field_name: "Date", type: 5 });
  await addBitableField(token, app.app_token, app.default_table_id, { field_name: "Time", type: 1 });
  await addBitableField(token, app.app_token, app.default_table_id, { 
    field_name: "Platform", 
    type: 3, 
    property: { options: [{name: "instagram"}, {name: "tiktok"}, {name: "rednote"}, {name: "facebook"}, {name: "youtube"}, {name: "x"}, {name: "googlemap"}] }
  });
  await addBitableField(token, app.app_token, app.default_table_id, { field_name: "Topic Slug", type: 1 });
  await addBitableField(token, app.app_token, app.default_table_id, { field_name: "Format", type: 1 });
  await addBitableField(token, app.app_token, app.default_table_id, { 
    field_name: "Status", 
    type: 3, 
    property: { options: [{name: "draft"}, {name: "pending-approval"}, {name: "approved"}, {name: "published"}, {name: "rejected"}, {name: "held"}] }
  });
  await addBitableField(token, app.app_token, app.default_table_id, { field_name: "Post Record", type: 15 });
  console.log(`    -> Content Schedule Bitable URL: ${app.url || `https://larksuite.com/base/${app.app_token}`}`);
}

async function setupMediaIndexBitable(token, folderToken) {
  console.log(`  -> Creating Media Index Bitable...`);
  const app = await createBitable(token, "Media Index", folderToken);
  
  await addBitableField(token, app.app_token, app.default_table_id, { field_name: "Date", type: 5 });
  await addBitableField(token, app.app_token, app.default_table_id, { field_name: "Folder", type: 1 });
  await addBitableField(token, app.app_token, app.default_table_id, { field_name: "Content", type: 1 });
  await addBitableField(token, app.app_token, app.default_table_id, { 
    field_name: "Source", 
    type: 3, 
    property: { options: [{name: "Brand-owned"}, {name: "Customer"}, {name: "Stock"}] }
  });
  await addBitableField(token, app.app_token, app.default_table_id, { field_name: "License", type: 1 });
  await addBitableField(token, app.app_token, app.default_table_id, { 
    field_name: "Used In", 
    type: 4, 
    property: { options: [{name: "instagram"}, {name: "tiktok"}, {name: "rednote"}, {name: "facebook"}, {name: "youtube"}, {name: "x"}, {name: "googlemap"}] }
  });
  await addBitableField(token, app.app_token, app.default_table_id, { field_name: "File", type: 17 });
  console.log(`    -> Media Index Bitable URL: ${app.url || `https://larksuite.com/base/${app.app_token}`}`);
}

async function main() {
  console.log(`Starting Vault creation for ${BRAND_SLUG}...`);
  const { appId, appSecret } = await getCredentials();
  const token = await getTenantAccessToken(appId, appSecret);

  // Resolve parent folder: user's Lark Drive root (default) or specified URL
  const parentToken = await resolveParentToken(token);

  console.log(`Creating main vault folder: vault-${BRAND_SLUG}`);
  const rootFolder = await createFolder(token, `vault-${BRAND_SLUG}`, parentToken);

  const templatesDir = path.join(process.cwd(), 'vault-templates');
  
  let hasTemplates = false;
  try {
    await fs.access(templatesDir);
    hasTemplates = true;
  } catch (err) {
    console.log("No vault-templates directory found, skipping template upload.");
  }

  if (hasTemplates) {
    console.log("Uploading templates and creating folders...");
    await syncDirectory(token, templatesDir, rootFolder.token, templatesDir);
    
    // Generate native Bitables in the respective folders
    const postFolderToken = folderMap.get('post');
    if (postFolderToken) {
      await setupPostScheduleBitable(token, postFolderToken);
    }
    
    const mediaFolderToken = folderMap.get('media');
    if (mediaFolderToken) {
      await setupMediaIndexBitable(token, mediaFolderToken);
    }
  }

  console.log("✅ Vault folder created successfully with native Bitables!");
  console.log(rootFolder.url);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
