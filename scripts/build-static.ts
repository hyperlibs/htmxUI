import fs from "fs";
import path from "path";

const DIST_DIR = path.join(__dirname, "..", "dist");

// Clean and recreate dist
if (fs.existsSync(DIST_DIR)) {
  fs.rmSync(DIST_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DIST_DIR, { recursive: true });

const GETTING_STARTED = ["introduction", "installation", "rosetta-stone", "common-ai-hallucinations", "directives-guide"];
const COMPONENTS = [
  "accordion","alert","alert-dialog","aspect-ratio","avatar","avatar-group","badge","banner",
  "breadcrumb","button","button-group","calendar","card","carousel","checkbox","checkbox-group",
  "chip","collapsible","color-picker","combobox","command","container","context-menu","data-table",
  "date-picker","dialog","divider","drawer","dropdown-menu","empty-state","error-message",
  "file-upload","flash-search","form","hover-card","icon","image","indicator","input","input-otp","kbd","label",
  "layout-block","layout-canvas","layout-grid","layout-page","layout-print","layout-scaffold","layout-web","layout-mweb","layout-mapp",
  "link","list","list-item","loading-spinner","masonry-grid","menubar","message-bubble",
  "navigation-menu","notification","number-input","page-header","pagination","panel",
  "password-input","pin-input","popover","profile-badge","progress","progress-bar","pulse",
  "radio-button","radio-group","rating","resizable","ribbon","scroll-area","search-input",
  "select","separator","sheet","sidebar","skeleton","slider","slider-range","snackbar","splitter",
  "stat-card","stepper","submenu","switch","table","tabs","tag","text","textarea","timeline",
  "time-picker","toast","toggle","toggle-group","toggle-switch","toolbar","tooltip","tree-view","user-card",
  "video-player","watermark","wizard","hx-wizard","date-range-picker","hx-grid","hx-virtual","hx-offline","hollywood-webfx"
];

function formatName(slug: string): string {
  return slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function buildSidebar(active: string): string {
  let html = `<div class="mb-6"><h4 class="mb-2 px-3 text-sm font-semibold tracking-tight">Getting Started</h4><div class="space-y-1">`;
  html += GETTING_STARTED.map(c => {
    const isActive = c === active;
    return `<a href="/docs/components/${c}/" class="block rounded-md px-3 py-1.5 text-sm ${isActive ? 'bg-accent font-medium text-accent-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'} transition-colors">${formatName(c)}</a>`;
  }).join("\n");
  html += `</div></div><div><h4 class="mb-2 px-3 text-sm font-semibold tracking-tight">Components</h4><div class="space-y-1">`;
  html += COMPONENTS.map(c => {
    const isActive = c === active;
    return `<a href="/docs/components/${c}/" class="block rounded-md px-3 py-1.5 text-sm ${isActive ? 'bg-accent font-medium text-accent-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'} transition-colors">${formatName(c)}</a>`;
  }).join("\n");
  html += `</div></div>`;
  return html;
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function buildComponentPage(slug: string): string {
  const name = formatName(slug);
  const sidebar = buildSidebar(slug);
  const filePath = path.join(__dirname, "..", "views", "components", `${slug}.html`);
  const sourceHtml = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "<!-- Component source not found -->";
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} — HTMXUI</title>
  <script src="https://unpkg.com/htmx.org@2.0.4" crossorigin="anonymous"></script>
  <script src="/htmx-bolt.js"></script>
  <script src="/htmx-flash.js"></script>
  <script src="/htmx-form.js"></script>
  <script src="/htmx-vibe.js"></script>
  <script src="/htmx-a11y.js"></script>
  <script src="/htmx-virtual.js"></script>
  <script src="/htmx-grid.js"></script>
  <script src="/htmx-offline.js"></script>
  <script src="/htmx-devtools.js"></script>
  <script src="/htmx-canvas.js"></script>
  <link rel="stylesheet" href="/styles.css">
  <style>
    .code-block { background: #1e293b; color: #e2e8f0; border-radius: 0.5rem; padding: 1rem; overflow-x: auto; font-size: 0.8rem; line-height: 1.6; }
    .code-block code { font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace; }
  </style>
</head>
<body class="bg-background text-foreground antialiased min-h-screen">
  <div class="flex min-h-screen">
    <aside id="doc-sidebar" class="hidden lg:flex w-60 flex-col border-r border-border bg-card overflow-y-auto sticky top-0 h-screen">
      <div class="flex h-14 items-center border-b border-border px-4">
        <a href="/" class="flex items-center gap-2">
          <svg class="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
          <span class="font-bold text-lg tracking-tight">HTMXUI</span>
        </a>
      </div>
      <div class="flex-1 p-3 overflow-y-auto">${sidebar}</div>
    </aside>
    <main class="flex-1 flex flex-col min-w-0">
      <header class="h-14 border-b border-border flex items-center justify-between px-6 bg-card sticky top-0 z-30">
        <div class="flex items-center gap-4">
          <h1 class="font-semibold text-base">${name}</h1>
          <a href="/demo/" class="text-xs bg-primary/10 text-primary font-medium px-2.5 py-1 rounded-full hover:bg-primary/20 transition-colors">Live Demos Hub</a>
        </div>
        <a href="https://github.com/hyperlibs/htmxUI" target="_blank" class="text-xs text-muted-foreground hover:text-foreground">GitHub ↗</a>
      </header>
      <div class="flex-1 p-8 max-w-5xl mx-auto w-full space-y-8">
        <div class="space-y-2">
          <h1 class="text-3xl font-extrabold tracking-tight">${name}</h1>
          <p class="text-muted-foreground text-sm">Interactive Shadcn-quality hypermedia component for HTMXUI.</p>
        </div>
        <div class="space-y-4">
          <h2 class="text-xl font-bold tracking-tight">Interactive Preview</h2>
          <div class="rounded-xl border border-border p-8 bg-card shadow-sm flex items-center justify-center min-h-[160px]">
            <div class="w-full max-w-xl flex flex-col items-center gap-4">${sourceHtml}</div>
          </div>
        </div>
        <div class="space-y-4">
          <h2 class="text-xl font-bold tracking-tight">HTML Source</h2>
          <div class="code-block"><pre><code>${escapeHtml(sourceHtml)}</code></pre></div>
        </div>
      </div>
    </main>
  </div>
</body>
</html>`;
}

function writePage(relPath: string, content: string) {
  const fullPath = path.join(DIST_DIR, relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, "utf8");
}

console.log("Building static HTMXUI site for Cloudflare Pages...");

// 1. Root redirect / landing
writePage("index.html", `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=/demo/"></head><body><script>location.href='/demo/';</script></body></html>`);

// 2. Demos Hub
const demoHubHtml = fs.readFileSync(path.join(__dirname, "..", "views", "demos-hub.html"), "utf8");
writePage("demo/index.html", demoHubHtml);
writePage("demos/index.html", demoHubHtml);

// 3. Flagship Demos
const tailadminHtml = fs.readFileSync(path.join(__dirname, "..", "views", "app-tailadmin.html"), "utf8");
writePage("demo/tailadmin/index.html", tailadminHtml);
writePage("app/tailadmin/index.html", tailadminHtml);

const erpHtml = fs.readFileSync(path.join(__dirname, "..", "views", "app-erp.html"), "utf8");
writePage("demo/erp/index.html", erpHtml);
writePage("app/erp/index.html", erpHtml);

const hypersheetHtml = fs.readFileSync(path.join(__dirname, "..", "views", "app-hypersheet.html"), "utf8");
writePage("demo/hypersheet/index.html", hypersheetHtml);
writePage("app/hypersheet/index.html", hypersheetHtml);

const universeHtml = fs.readFileSync(path.join(__dirname, "..", "views", "app-universe.html"), "utf8");
writePage("demo/universe/index.html", universeHtml);
writePage("app/universe/index.html", universeHtml);
writePage("cosmos/index.html", universeHtml);

// 4. Docs Component Pages
[...GETTING_STARTED, ...COMPONENTS].forEach(slug => {
  const pageHtml = buildComponentPage(slug);
  writePage(`docs/components/${slug}/index.html`, pageHtml);
});
writePage("docs/index.html", `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=/docs/components/introduction/"></head><body><script>location.href='/docs/components/introduction/';</script></body></html>`);

// 5. Mock Invoices API for ERP
const invoices = Array.from({ length: 500 }, (_, i) => ({
  id: `INV-${100000 + i}`,
  customer: ["Acme Corp", "Globex LLC", "Initech", "Umbrella Co", "Stark Industries", "Wayne Enterprises", "Cyberdyne", "Soylent Corp"][i % 8],
  amount: (Math.random() * 5000 + 100).toFixed(2),
  status: ["Paid", "Pending", "Overdue", "Draft", "Processing"][i % 5],
  date: new Date(Date.now() - (i * 86400000)).toISOString().split("T")[0]
}));
writePage("api/erp-invoices.json", JSON.stringify(invoices));

// 6. Copy Public Assets
function copyDir(src: string, dest: string) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDir(path.join(__dirname, "..", "public"), DIST_DIR);

// Copy styles.css to root of dist
if (fs.existsSync(path.join(__dirname, "..", "public", "styles", "output.css"))) {
  fs.copyFileSync(path.join(__dirname, "..", "public", "styles", "output.css"), path.join(DIST_DIR, "styles.css"));
}

// 7. Schema files
if (fs.existsSync(path.join(__dirname, "..", "schema", "htmxui.json"))) {
  writePage("schema/htmxui.json", fs.readFileSync(path.join(__dirname, "..", "schema", "htmxui.json"), "utf8"));
}

console.log("✅ Static build complete! Output generated in dist/");
