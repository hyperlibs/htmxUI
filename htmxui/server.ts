const GETTING_STARTED = ["introduction", "installation"];
const COMPONENTS = [
  "accordion","alert","alert-dialog","aspect-ratio","avatar","avatar-group","badge","banner",
  "breadcrumb","button","button-group","calendar","card","carousel","checkbox","checkbox-group",
  "chip","collapsible","color-picker","combobox","command","container","context-menu","data-table",
  "date-picker","dialog","divider","drawer","dropdown-menu","empty-state","error-message",
  "file-upload","flash-search","form","hover-card","icon","image","indicator","input","input-otp","kbd","label",
  "layout-block","layout-canvas","layout-grid","layout-page","layout-print","layout-scaffold","layout-web",
  "link","list","list-item","loading-spinner","masonry-grid","menubar","message-bubble",
  "navigation-menu","notification","number-input","page-header","pagination","panel",
  "password-input","pin-input","popover","profile-badge","progress","progress-bar","pulse",
  "radio-button","radio-group","rating","resizable","ribbon","scroll-area","search-input",
  "select","separator","sheet","sidebar","skeleton","slider","slider-range","snackbar","splitter",
  "stat-card","stepper","submenu","switch","table","tabs","tag","text","textarea","timeline",
  "time-picker","toast","toggle","toggle-group","toggle-switch","toolbar","tooltip","tree-view","user-card",
  "video-player","watermark","wizard","date-range-picker"
];

function formatName(slug: string): string {
  return slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function buildSidebar(active: string): string {
  let html = `<div class="mb-6"><h4 class="mb-2 px-3 text-sm font-semibold tracking-tight">Getting Started</h4><div class="space-y-1">`;
  html += GETTING_STARTED.map(c => {
    const isActive = c === active;
    return `<a href="/docs/components/${c}" class="block rounded-md px-3 py-1.5 text-sm ${isActive ? 'bg-accent font-medium text-accent-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'} transition-colors">${formatName(c)}</a>`;
  }).join("\n");
  html += `</div></div><div><h4 class="mb-2 px-3 text-sm font-semibold tracking-tight">Components</h4><div class="space-y-1">`;
  html += COMPONENTS.map(c => {
    const isActive = c === active;
    return `<a href="/docs/components/${c}" class="block rounded-md px-3 py-1.5 text-sm ${isActive ? 'bg-accent font-medium text-accent-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'} transition-colors">${formatName(c)}</a>`;
  }).join("\n");
  html += `</div></div>`;
  return html;
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

import { DEMOS } from "./demos.ts";

const NO_SCALE_UI = [
  "badge", "chip", "icon", "indicator", "kbd", "link", "tag", 
  "checkbox", "radio-group", "switch", "slider", "input-otp", 
  "dialog", "drawer", "sheet", "modal", "context-menu", "hover-card", "tooltip", "popover",
  "accordion", "collapsible", "date-picker", "progress", "progress-bar", "toggle", "toggle-group", "toggle-switch"
];

async function buildComponentPage(slug: string): Promise<string> {
  const name = formatName(slug);
  const sidebar = buildSidebar(slug);
  const sourceFile = Bun.file(`views/components/${slug}.html`);
  const sourceHtml = await sourceFile.exists() ? await sourceFile.text() : "<!-- Component source not found -->";
  
  const demo = DEMOS[slug] || (await sourceFile.exists() ? sourceHtml : `<div class="flex items-center justify-center py-12 text-muted-foreground text-sm">Interactive demo coming soon.</div>`);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} — HTMXUI</title>
  <script src="https://unpkg.com/htmx.org@2.0.4" crossorigin="anonymous"></script>
  <script src="/htmx-bolt.js"></script>
  <script src="/htmx-flash.js"></script>
  <script src="/htmx-canvas.js"></script>
  <link rel="stylesheet" href="/styles.css">
  <style>
    .code-block { background: #1e293b; color: #e2e8f0; border-radius: 0.5rem; padding: 1rem; overflow-x: auto; font-size: 0.8rem; line-height: 1.6; }
    .code-block code { font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace; }
  </style>
</head>
<body class="bg-background text-foreground antialiased min-h-screen">
  <div class="flex min-h-screen">

    <!-- Sidebar -->
    <aside id="doc-sidebar" class="hidden lg:flex w-60 flex-col border-r border-border bg-card overflow-y-auto sticky top-0 h-screen">
      <div class="flex h-14 items-center border-b border-border px-4">
        <a href="/" class="flex items-center gap-2">
          <svg class="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
          <span class="font-bold text-lg tracking-tight">HTMXUI</span>
        </a>
      </div>
      <div class="p-3 border-b border-border">
        <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">Getting Started</p>
        <a href="/" class="block rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors">Introduction</a>
        <a href="/" class="block rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors">Installation</a>
      </div>
      <div class="flex-1 p-3 overflow-y-auto">
        <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">Components</p>
        ${sidebar}
      </div>
    </aside>
    <script>
      const sidebar = document.getElementById('doc-sidebar');
      const savedScroll = sessionStorage.getItem('sidebar-scroll');
      if (savedScroll) sidebar.scrollTop = parseInt(savedScroll, 10);
      sidebar.addEventListener('scroll', () => sessionStorage.setItem('sidebar-scroll', sidebar.scrollTop));
    </script>

    <!-- Main -->
    <div class="flex-1 flex flex-col min-w-0">
      <header class="sticky top-0 z-30 flex h-14 items-center border-b border-border bg-background/95 backdrop-blur px-6">
        <nav class="flex items-center gap-1 text-sm text-muted-foreground">
          <a href="/" class="hover:text-foreground transition-colors">Docs</a>
          <span>/</span>
          <a href="/" class="hover:text-foreground transition-colors">Components</a>
          <span>/</span>
          <span class="text-foreground font-medium">${name}</span>
        </nav>
      </header>

      <main class="flex-1 p-6 lg:p-10 max-w-4xl">
        <!-- Title -->
        <div class="space-y-2 mb-8">
          <h1 class="text-3xl font-bold tracking-tight">${name}</h1>
          <p class="text-lg text-muted-foreground">A versatile ${name.toLowerCase()} component for building modern interfaces with HTMX.</p>
        </div>

        <!-- Preview Section -->
        <div class="mb-10">
          <div class="flex items-center justify-between mb-4">
            <div class="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
              <button onclick="document.getElementById('preview-panel').style.display='block';document.getElementById('code-panel').style.display='none';this.classList.add('bg-background','text-foreground','shadow-sm');this.nextElementSibling.classList.remove('bg-background','text-foreground','shadow-sm')" class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium bg-background text-foreground shadow-sm">Preview</button>
              <button onclick="document.getElementById('preview-panel').style.display='none';document.getElementById('code-panel').style.display='block';this.classList.add('bg-background','text-foreground','shadow-sm');this.previousElementSibling.classList.remove('bg-background','text-foreground','shadow-sm')" class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium">Code</button>
            </div>
            
            ${!NO_SCALE_UI.includes(slug) ? `
            <label class="flex items-center space-x-2 cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
              <input type="checkbox" class="h-4 w-4 accent-primary rounded border-input" onchange="toggleScaleUI(this.checked)">
              <span>Test Component Resizing (scaleui="1")</span>
            </label>
            ` : ''}
          </div>

          <div id="preview-panel" class="rounded-xl border border-border bg-background p-8 overflow-hidden relative">
            <div id="preview-content">
              ${demo}
            </div>
          </div>
          
          <script>
            function toggleScaleUI(enabled) {
              const content = document.getElementById('preview-content');
              
              // We want to apply scaleui="1" to the root interactive elements of the demo
              // If it's a section wrapper (like most demos), we apply it to its children instead so they can be resized individually
              const firstChild = content.firstElementChild;
              let targets = [firstChild];
              
              if (firstChild && firstChild.tagName === 'SECTION') {
                if (firstChild.children.length > 0) {
                    targets = Array.from(firstChild.children);
                }
              }
              
              targets.forEach(target => {
                if (enabled) {
                  target.setAttribute('scaleui', '1');
                } else {
                  target.removeAttribute('scaleui');
                }
              });
            }
          </script>
          <div id="code-panel" style="display:none" class="rounded-xl border border-border overflow-hidden">
            <div class="flex items-center justify-between bg-muted/50 px-4 py-2 border-b border-border">
              <span class="text-xs font-medium text-muted-foreground">${slug}.html</span>
              <button onclick="navigator.clipboard.writeText(document.getElementById('source-code').innerText)" class="text-xs text-muted-foreground hover:text-foreground transition-colors">Copy</button>
            </div>
            <div class="code-block"><code id="source-code"><pre class="whitespace-pre-wrap">${escapeHtml(sourceHtml)}</pre></code></div>
          </div>
        </div>

        <!-- Usage Section -->
        <div class="space-y-4 mb-10">
          <h2 class="text-xl font-semibold tracking-tight border-b border-border pb-2">Usage</h2>
          <p class="text-sm text-muted-foreground leading-relaxed">
            Copy the component HTML into your project template. All components are backend-agnostic — replace <code class="bg-muted px-1 py-0.5 rounded text-xs font-mono">{placeholder}</code> values with your backend template variables.
            Components include <code class="bg-muted px-1 py-0.5 rounded text-xs font-mono">hx-ext="reactive"</code> for htmx-bolt integration.
          </p>
          <div class="code-block"><code><pre>&lt;!-- Import in your layout --&gt;
&lt;script src="https://unpkg.com/htmx.org@2.0.4"&gt;&lt;/script&gt;
&lt;script src="/htmx-bolt.js"&gt;&lt;/script&gt;

&lt;!-- Use the component --&gt;
&lt;div hx-ext="reactive" hx-state="{ themeColor: 'primary', size: 'md' }"&gt;
  &lt;!-- ${name} component goes here --&gt;
&lt;/div&gt;</pre></code></div>
        </div>

        <!-- HTMX Integration -->
        <div class="space-y-4">
          <h2 class="text-xl font-semibold tracking-tight border-b border-border pb-2">HTMX Integration</h2>
          <p class="text-sm text-muted-foreground leading-relaxed">
            This component works natively with HTMX attributes. Add <code class="bg-muted px-1 py-0.5 rounded text-xs font-mono">hx-post</code>, <code class="bg-muted px-1 py-0.5 rounded text-xs font-mono">hx-get</code>, or <code class="bg-muted px-1 py-0.5 rounded text-xs font-mono">hx-trigger</code> to make it communicate with any backend.
          </p>
          <div class="code-block"><code><pre>&lt;!-- Server-driven reactivity --&gt;
&lt;${slug === 'button' ? 'button' : 'div'} 
  hx-get="/api/${slug}/data"
  hx-trigger="${slug === 'input' || slug === 'textarea' || slug === 'search-input' ? 'keyup changed delay:500ms' : 'click'}"
  hx-target="#result"
  hx-swap="innerHTML"
&gt;
  ...
&lt;/${slug === 'button' ? 'button' : 'div'}&gt;

&lt;!-- Server can update client state via header --&gt;
&lt;!-- HX-Trigger: {"hxStateUpdate": {"target": "#my-${slug}", "state": {"themeColor": "destructive"}}} --&gt;</pre></code></div>
        </div>

      </main>
    </div>
  </div>
</body>
</html>`;
}

// Landing page (dashboard)
const dashboardHtml = await Bun.file("views/layout-dashboard.html").text().catch(() => "");

const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/") {
      return new Response(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>HTMXUI - The Modern HTMX Component Library</title>
  <script src="https://unpkg.com/htmx.org@2.0.4" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="/styles.css">
</head>
<body class="bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground min-h-screen flex flex-col">
  <header class="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between max-w-7xl">
      <div class="flex items-center gap-3 font-bold text-xl tracking-tight">
        <div class="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm shadow-sm">H</div>
        HTMXUI
      </div>
      <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
        <a href="/docs/components/installation" class="hover:text-foreground transition-colors">Documentation</a>
        <a href="/docs/components/button" class="hover:text-foreground transition-colors">Components</a>
        <a href="https://github.com/your-repo" class="hover:text-foreground transition-colors">GitHub</a>
      </nav>
    </div>
  </header>
  <main class="flex-1 flex flex-col">
    <section class="py-32 px-4 text-center flex flex-col items-center justify-center relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none"></div>
      <div class="relative z-10 flex flex-col items-center">
        <div class="inline-flex items-center rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm font-medium mb-8 backdrop-blur-sm text-primary">
          🎉 Version 1.0 is now live
        </div>
        <h1 class="text-5xl md:text-7xl font-extrabold tracking-tighter max-w-4xl mb-8 leading-[1.1]">
          Beautiful UI components for <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">HTMX</span>.
        </h1>
        <p class="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed">
          Accessible. Customizable. Zero NPM bloat. Build modern SaaS applications entirely in HTML with the power of HTMX and Tailwind CSS.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <a href="/docs/components/installation" class="inline-flex items-center justify-center h-14 px-8 rounded-md bg-primary text-primary-foreground font-semibold text-lg transition-colors hover:bg-primary/90 shadow-lg hover:shadow-xl w-full sm:w-auto">
            Get Started
          </a>
          <a href="/docs/components/button" class="inline-flex items-center justify-center h-14 px-8 rounded-md border border-input bg-background font-semibold text-lg transition-colors hover:bg-muted shadow-sm w-full sm:w-auto">
            Browse Components
          </a>
        </div>
      </div>
    </section>
    <section class="border-t border-border bg-muted/30 py-24 px-4">
      <div class="container mx-auto grid md:grid-cols-3 gap-8 max-w-7xl">
        <div class="bg-background p-8 rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow">
          <div class="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 text-2xl">⚡</div>
          <h3 class="text-xl font-bold mb-3">Zero JS Bloat</h3>
          <p class="text-muted-foreground leading-relaxed">No React, no Virtual DOM. Powered entirely by native browser APIs and lightweight HTMX extensions like htmx-bolt.</p>
        </div>
        <div class="bg-background p-8 rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow">
          <div class="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 text-2xl">🎨</div>
          <h3 class="text-xl font-bold mb-3">100+ Components</h3>
          <p class="text-muted-foreground leading-relaxed">From basic buttons to deeply complex data tables and interactive visual node canvases. Copy and paste directly into your apps.</p>
        </div>
        <div class="bg-background p-8 rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow">
          <div class="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 text-2xl">🚀</div>
          <h3 class="text-xl font-bold mb-3">Backend Agnostic</h3>
          <p class="text-muted-foreground leading-relaxed">Use with Python, Go, PHP, or Bun. If your backend can return HTML, you can use HTMXUI to build single-page app experiences.</p>
        </div>
      </div>
    </section>
  </main>
  <footer class="border-t border-border py-12 text-center text-sm text-muted-foreground bg-background">
    <p>Built for the HTMX community. Engineered for speed.</p>
  </footer>
</body>
</html>`, { headers: { "Content-Type": "text/html" } });
    }

    if (url.pathname === "/styles.css") {
      return new Response(Bun.file("public/styles/output.css"), { headers: { "Content-Type": "text/css" } });
    }

    if (url.pathname === "/htmx-bolt.js") {
      return new Response(Bun.file("public/htmx-bolt.js"), { headers: { "Content-Type": "application/javascript" } });
    }

    if (url.pathname === "/htmx-flash.js") {
      return new Response(Bun.file("public/htmx-flash.js"), { headers: { "Content-Type": "application/javascript" } });
    }

    if (url.pathname === "/htmx-canvas.js") {
      return new Response(Bun.file("public/htmx-canvas.js"), { headers: { "Content-Type": "application/javascript" } });
    }

    if (url.pathname === "/inventory.json") {
      return new Response(Bun.file("public/inventory.json"), { headers: { "Content-Type": "application/json" } });
    }

    // Component doc pages
    const match = url.pathname.match(/^\/docs\/components\/(.+)$/);
    if (match) {
      const slug = match[1];
      if (COMPONENTS.includes(slug)) {
        return new Response(await buildComponentPage(slug), { headers: { "Content-Type": "text/html" } });
      }
    }

    // Redirect /docs to first component
    if (url.pathname === "/docs" || url.pathname === "/docs/") {
      return Response.redirect("/docs/components/accordion", 302);
    }

    // Home page — redirect to docs
    if (url.pathname === "/") {
      return Response.redirect("/docs/components/button", 302);
    }

    return new Response("Not Found", { status: 404 });
  }
});

console.log(`HTMXUI Docs running at http://localhost:${server.port}`);
