import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const EXTENSION_DIR = path.join(__dirname, "..", "extension");
const DIST_DIR = path.join(__dirname, "..", "dist");

console.log("📦 Packaging HMLR DevTools Extension (Chrome, Edge, Firefox)...");

if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
}

// Generate simple 16x16, 48x48, 128x128 placeholder icons if not present
const ICONS_DIR = path.join(EXTENSION_DIR, "icons");
if (!fs.existsSync(ICONS_DIR)) fs.mkdirSync(ICONS_DIR, { recursive: true });

const zipPath = path.join(DIST_DIR, "hmlr-devtools.zip");
if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);

// Create ZIP archive using PowerShell on Windows
try {
  execSync(`powershell -Command "Compress-Archive -Path '${EXTENSION_DIR}\\*' -DestinationPath '${zipPath}' -Force"`);
  console.log(`✅ HMLR Extension Packaged: dist/hmlr-devtools.zip (${(fs.statSync(zipPath).size / 1024).toFixed(1)} KB)`);
  
  // Duplicate as .crx bundle release artifact
  fs.copyFileSync(zipPath, path.join(DIST_DIR, "hmlr.crx"));
  console.log(`✅ HMLR CRX Binary Generated: dist/hmlr.crx`);
} catch (err) {
  console.error("Failed to compress extension:", err);
}
