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
  const isGettingStarted = GETTING_STARTED.includes(slug);
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
  <script src="/htmx-form.js"></script>
  <script src="/htmx-vibe.js"></script>
  <script src="/htmx-a11y.js"></script>
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
      <div class="flex-1 p-3 overflow-y-auto">
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
        ${isGettingStarted ? `
          ${demo}
        ` : `
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
        `}
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
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTMXUI — Hyper Reactive HTMX on Steroids</title>
  <script src="https://unpkg.com/htmx.org@2.0.4" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="/styles.css">
</head>
<body class="bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground min-h-screen flex flex-col">

  <!-- Header -->
  <header class="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between max-w-7xl">
      <div class="flex items-center gap-3 font-bold text-xl tracking-tight">
        <div class="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm shadow-sm font-black">H</div>
        HTMXUI
      </div>
      <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
        <a href="/docs/components/introduction" class="hover:text-foreground transition-colors">Documentation</a>
        <a href="/docs/components/button" class="hover:text-foreground transition-colors">Components</a>
        <a href="https://github.com/hyperlibs/htmxUI" class="hover:text-foreground transition-colors">GitHub</a>
      </nav>
    </div>
  </header>

  <main class="flex-1 flex flex-col">

    <!-- Hero -->
    <section class="py-28 md:py-36 px-4 text-center flex flex-col items-center justify-center relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none"></div>
      <div class="relative z-10 flex flex-col items-center max-w-5xl mx-auto">
        <div class="inline-flex items-center rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm font-medium mb-8 backdrop-blur-sm text-primary">
          ⚡ Hyper Reactive HTMX on Steroids
        </div>
        <h1 class="text-5xl md:text-7xl font-extrabold tracking-tighter max-w-4xl mb-6 leading-[1.05]">
          HTMX + Shadcn + <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Reactive Engine</span>
        </h1>
        <p class="text-lg md:text-xl text-muted-foreground max-w-3xl mb-6 leading-relaxed">
          HTMXUI is not a UI library. It is a <strong class="text-foreground">deliberate fork and reinvention of htmx</strong> into a hyperreactive, lean framework. 100+ Shadcn-quality components. ~2KB reactive engine. Zero NPM bloat.
        </p>
        <p class="text-base text-muted-foreground max-w-2xl mb-10 leading-relaxed">
          Built for human developers <em>and</em> agentic AI coders who need predictable, composable, server-driven UIs.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <a href="/docs/components/introduction" class="inline-flex items-center justify-center h-14 px-8 rounded-md bg-primary text-primary-foreground font-semibold text-lg transition-colors hover:bg-primary/90 shadow-lg hover:shadow-xl w-full sm:w-auto">
            Get Started
          </a>
          <a href="/docs/components/button" class="inline-flex items-center justify-center h-14 px-8 rounded-md border border-input bg-background font-semibold text-lg transition-colors hover:bg-muted shadow-sm w-full sm:w-auto">
            Browse Components
          </a>
        </div>
      </div>
    </section>

    <!-- The Stack -->
    <section class="border-t border-border bg-muted/20 py-20 px-4">
      <div class="container mx-auto max-w-7xl">
        <div class="text-center mb-14">
          <h2 class="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">The Core Stack</h2>
          <p class="text-muted-foreground text-lg max-w-2xl mx-auto">Four microscopic extensions that complete HTML as a reactive, composable application platform.</p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-background p-6 rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow">
            <div class="h-10 w-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4 text-lg font-bold">⚡</div>
            <h3 class="text-lg font-bold mb-2">htmx-bolt.js</h3>
            <p class="text-sm text-muted-foreground leading-relaxed">~2KB reactive engine. Proxy-based local state, declarative bindings, server-driven state sync via HX-Trigger. The missing middle ground.</p>
          </div>
          <div class="bg-background p-6 rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow">
            <div class="h-10 w-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4 text-lg font-bold">🔍</div>
            <h3 class="text-lg font-bold mb-2">htmx-flash.js</h3>
            <p class="text-sm text-muted-foreground leading-relaxed">In-memory search engine. Loads data once, filters thousands of items in 0ms. Perfect for command palettes & instant search.</p>
          </div>
          <div class="bg-background p-6 rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow">
            <div class="h-10 w-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4 text-lg font-bold">🎨</div>
            <h3 class="text-lg font-bold mb-2">htmx-canvas.js</h3>
            <p class="text-sm text-muted-foreground leading-relaxed">Visual node editor engine. Drag-and-drop, grid snapping, 2-layer nesting, dynamic Bézier connectors. Pure vanilla JS.</p>
          </div>
          <div class="bg-background p-6 rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow">
            <div class="h-10 w-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4 text-lg font-bold">📦</div>
            <h3 class="text-lg font-bold mb-2">100+ Components</h3>
            <p class="text-sm text-muted-foreground leading-relaxed">Shadcn/ui-quality HTML components. Copy-paste directly. No NPM, no Virtual DOM, no build step for logic. Full ownership.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits for Developers -->
    <section class="border-t border-border py-20 px-4">
      <div class="container mx-auto max-w-7xl grid lg:grid-cols-2 gap-16">
        <div>
          <div class="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-semibold mb-4 text-primary">FOR HUMAN DEVELOPERS</div>
          <h2 class="text-3xl font-extrabold tracking-tight mb-6">Why developers choose HTMXUI</h2>
          <ol class="space-y-3 text-sm text-foreground">
            <li class="flex gap-3"><span class="font-bold text-primary shrink-0">01.</span><span>Zero NPM, zero Virtual DOM — no node_modules, no React, no webpack</span></li>
            <li class="flex gap-3"><span class="font-bold text-primary shrink-0">02.</span><span>Server remains the source of truth — true hypermedia architecture</span></li>
            <li class="flex gap-3"><span class="font-bold text-primary shrink-0">03.</span><span>Copy-paste components — full ownership, no black-box abstractions</span></li>
            <li class="flex gap-3"><span class="font-bold text-primary shrink-0">04.</span><span>Instant local reactivity via Bolt — dropdowns, tabs, toggles without round-trips</span></li>
            <li class="flex gap-3"><span class="font-bold text-primary shrink-0">05.</span><span>Backend agnostic — Python, Go, PHP, Rust, Bun, any language that returns HTML</span></li>
            <li class="flex gap-3"><span class="font-bold text-primary shrink-0">06.</span><span>Tailwind-native theming — CSS variable system for dark mode and custom brands</span></li>
            <li class="flex gap-3"><span class="font-bold text-primary shrink-0">07.</span><span>Sub-3KB total client JS — smaller than a single React hook import</span></li>
            <li class="flex gap-3"><span class="font-bold text-primary shrink-0">08.</span><span>Progressive enhancement — start pure htmx, add Bolt/Flash only where needed</span></li>
            <li class="flex gap-3"><span class="font-bold text-primary shrink-0">09.</span><span>7 layout primitives — dashboards, marketing, print, canvases, mobile-first</span></li>
            <li class="flex gap-3"><span class="font-bold text-primary shrink-0">10.</span><span>No build step for logic — HTML is the component, the server is the framework</span></li>
          </ol>
        </div>
        <div>
          <div class="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-semibold mb-4 text-primary">FOR AGENTIC AI CODERS</div>
          <h2 class="text-3xl font-extrabold tracking-tight mb-6">Why AI agents prefer HTMXUI</h2>
          <ol class="space-y-3 text-sm text-foreground">
            <li class="flex gap-3"><span class="font-bold text-primary shrink-0">01.</span><span>Highly regular HTML structure — agents parse, generate, and modify UI with high success rates</span></li>
            <li class="flex gap-3"><span class="font-bold text-primary shrink-0">02.</span><span>Declarative attribute-based behavior — no imperative JS to reason about</span></li>
            <li class="flex gap-3"><span class="font-bold text-primary shrink-0">03.</span><span>Predictable composition — contracts that agents can reliably assemble</span></li>
            <li class="flex gap-3"><span class="font-bold text-primary shrink-0">04.</span><span>Minimal hidden side effects — what you see in the HTML is what happens</span></li>
            <li class="flex gap-3"><span class="font-bold text-primary shrink-0">05.</span><span>Machine-readable component patterns — consistent naming across 100+ components</span></li>
            <li class="flex gap-3"><span class="font-bold text-primary shrink-0">06.</span><span>No complex build toolchain — agents don't manage webpack/vite/turbopack configs</span></li>
            <li class="flex gap-3"><span class="font-bold text-primary shrink-0">07.</span><span>Server-driven mutations — modify UI by returning HTML fragments, not client state graphs</span></li>
            <li class="flex gap-3"><span class="font-bold text-primary shrink-0">08.</span><span>Copy-paste atomic components — compose UIs by concatenating well-defined HTML blocks</span></li>
            <li class="flex gap-3"><span class="font-bold text-primary shrink-0">09.</span><span>Small learnable grammar — hx-state, hx-action, hx-text, hx-show is the entire reactive API</span></li>
            <li class="flex gap-3"><span class="font-bold text-primary shrink-0">10.</span><span>Lower error surface — no JSX transpilation, no hook ordering, no hydration mismatches</span></li>
          </ol>
        </div>
      </div>
    </section>

    <!-- Architecture -->
    <section class="border-t border-border bg-muted/20 py-20 px-4">
      <div class="container mx-auto max-w-3xl text-center">
        <h2 class="text-3xl font-extrabold tracking-tight mb-4">Architecture</h2>
        <p class="text-muted-foreground text-base mb-10">Each layer is optional and progressive. Use only what you need.</p>
        <div class="space-y-3">
          <div class="bg-background border border-border rounded-xl p-5 text-sm font-medium shadow-sm">
            <span class="text-muted-foreground">Layer 4:</span> <strong>Your Application</strong> <span class="text-muted-foreground">— Templates, domain components, agent-generated UI</span>
          </div>
          <div class="flex justify-center text-muted-foreground text-lg">↓</div>
          <div class="bg-background border border-border rounded-xl p-5 text-sm font-medium shadow-sm">
            <span class="text-muted-foreground">Layer 3:</span> <strong>Composition & Layouts</strong> <span class="text-muted-foreground">— 7 layout primitives, named regions, mobile variants</span>
          </div>
          <div class="flex justify-center text-muted-foreground text-lg">↓</div>
          <div class="bg-primary/5 border-2 border-primary/30 rounded-xl p-5 text-sm font-medium shadow-sm">
            <span class="text-primary font-semibold">Layer 2:</span> <strong class="text-primary">Hyperreactive Layer</strong> <span class="text-muted-foreground">— Bolt (reactivity) + Flash (search) + Canvas (spatial)</span>
          </div>
          <div class="flex justify-center text-muted-foreground text-lg">↓</div>
          <div class="bg-background border border-border rounded-xl p-5 text-sm font-medium shadow-sm">
            <span class="text-muted-foreground">Layer 1:</span> <strong>Enhanced Hypermedia Core</strong> <span class="text-muted-foreground">— htmx requests, swapping, SSE, WebSocket, history</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Design Pillars -->
    <section class="border-t border-border py-20 px-4">
      <div class="container mx-auto max-w-5xl">
        <h2 class="text-3xl font-extrabold tracking-tight mb-10 text-center">Design Pillars</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="border-b-2 border-border">
                <th class="text-left py-3 px-4 font-semibold">Pillar</th>
                <th class="text-left py-3 px-4 font-semibold">Meaning</th>
                <th class="text-left py-3 px-4 font-semibold text-muted-foreground">Non-Goal</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr><td class="py-3 px-4 font-bold text-primary">Hyperreactive</td><td class="py-3 px-4">Fine-grained reactivity that works with server-driven HTML</td><td class="py-3 px-4 text-muted-foreground">Becoming a full SPA framework</td></tr>
              <tr><td class="py-3 px-4 font-bold text-primary">Lean</td><td class="py-3 px-4">Minimal runtime, minimal concepts, maximal clarity</td><td class="py-3 px-4 text-muted-foreground">Feature bloat or "everything included"</td></tr>
              <tr><td class="py-3 px-4 font-bold text-primary">Hypermedia-first</td><td class="py-3 px-4">Server is the source of truth; HTML is the primary medium</td><td class="py-3 px-4 text-muted-foreground">Client-side state ownership</td></tr>
              <tr><td class="py-3 px-4 font-bold text-primary">Agentic-native</td><td class="py-3 px-4">Structure that AI agents can reliably generate & reason about</td><td class="py-3 px-4 text-muted-foreground">Human-only ergonomics</td></tr>
              <tr><td class="py-3 px-4 font-bold text-primary">Composable</td><td class="py-3 px-4">Clear contracts for assembling UI, behavior, and layouts</td><td class="py-3 px-4 text-muted-foreground">Opaque magic or coupled systems</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

  </main>

  <footer class="border-t border-border py-12 px-4">
    <div class="container mx-auto max-w-7xl text-center">
      <p class="text-sm text-muted-foreground mb-2">HTMXUI — Hyper Reactive HTMX on Steroids</p>
      <p class="text-xs text-muted-foreground">Original htmx completed HTML as a hypermedia. HTMXUI completes it as a reactive, agent-friendly, composable application platform.</p>
    </div>
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

    if (url.pathname === "/htmx-form.js") {
      return new Response(Bun.file("public/htmx-form.js"), { headers: { "Content-Type": "application/javascript" } });
    }

    if (url.pathname === "/htmx-vibe.js") {
      return new Response(Bun.file("public/htmx-vibe.js"), { headers: { "Content-Type": "application/javascript" } });
    }

    if (url.pathname === "/htmx-a11y.js") {
      return new Response(Bun.file("public/htmx-a11y.js"), { headers: { "Content-Type": "application/javascript" } });
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
      if (COMPONENTS.includes(slug) || GETTING_STARTED.includes(slug)) {
        return new Response(await buildComponentPage(slug), { headers: { "Content-Type": "text/html" } });
      }
    }

    // Redirect /docs to introduction
    if (url.pathname === "/docs" || url.pathname === "/docs/") {
      return Response.redirect("/docs/components/introduction", 302);
    }

    return new Response("Not Found", { status: 404 });
  }
});

console.log(`HTMXUI Docs running at http://localhost:${server.port}`);
