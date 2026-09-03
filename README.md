# HTMXUI — Hyper Reactive HTMX on Steroids

<div align="center">
  <p><strong>A hyperreactive, lean, hypermedia-first framework built for human developers and Agentic AI coders.</strong></p>
  <p><em>Original htmx completed HTML as a hypermedia. HTMXUI completes it as a reactive, agent-friendly application platform — making heavy client-side SPAs obsolete.</em></p>
</div>

---

## ⚡ The Equation

```text
HTMXUI = HTMX (Hypermedia Core)
       + Bolt (Signal-Based Reactive State & Computed Values)
       + Flash (In-Memory Typo-Tolerant Fuzzy Search & Filters)
       + Form (Declarative Validation & Optimistic UI Engine)
       + Vibe (60fps FLIP Layout Animations & Stagger Sequences)
       + A11y (WAI-ARIA Focus Traps & Roving Tabindex)
       + Canvas (Spatial Node Visual Engine)
       + 100+ Shadcn-Quality Copy-Paste Components
```

---

## 📦 The Hyperreactive Suite

| Engine | Source (`src/`) | Distribution (`public/`) | Capabilities |
|---|---|---|---|
| **⚡ Bolt** | `htmx-bolt.ts` | `htmx-bolt.js` | Fine-grained signals, dependency tracking via deep Proxies, microtask batching, computed properties (`hx-computed`), effects (`hx-effect`), two-way binding (`hx-model`), structural loops (`hx-for`), structural conditionals (`hx-if`), event modifiers (`.prevent`, `.debounce`, `.outside`), global stores (`$store`), transitions (`hx-transition`), and fluid ScaleUI resizing. |
| **🔍 Flash** | `htmx-flash.ts` | `htmx-flash.js` | Typo-tolerant Levenshtein fuzzy search (`hx-flash-search`), multi-column filters (`hx-flash-filter`), client-side column sorting (`hx-flash-sort`), and pagination across thousands of records. |
| **📝 Form** | `htmx-form.ts` | `htmx-form.js` | Declarative validation rules (`hx-validate="required\|email\|min:3"`), form state machine (`$form.valid`, `$form.dirty`, `$form.errors`), and automatic optimistic UI rollback on server error. |
| **🌊 Vibe** | `htmx-vibe.ts` | `htmx-vibe.js` | FLIP layout animation engine that smoothly animates DOM swaps and list reorderings at 60fps. Includes stagger sequences (`hx-vibe-stagger`) and viewport scroll triggers (`hx-vibe-view`). |
| **♿ A11y** | `htmx-a11y.ts` | `htmx-a11y.js` | WAI-ARIA compliant modal focus trapping (`hx-trap-focus`), roving tabindex for keyboard navigation in menus/tabs, and dynamic live screen-reader announcements (`HxA11y.announce`). |
| **🎨 Canvas** | `htmx-canvas.js` | `htmx-canvas.js` | Spatial visual node editor engine with draggable nodes (`hx-drag`), grid auto-snapping (`hx-snap`), 2-layer nesting, dynamic Bézier elastic connectors (`hx-connect`), and coordinate badge telemetry. |
| **🧩 UI Library** | `views/components/` | HTML | 100+ Shadcn/ui-quality copy-paste components with dark mode, customizable design tokens, and zero Virtual DOM overhead. |

---

## 🎯 Benefits for Human Developers

1. **Zero NPM Runtime Dependencies**: No `node_modules`, no webpack or Vite build fragility.
2. **Sub-25KB Total Client Suite**: The complete reactive suite is smaller than a single React hook import bundle.
3. **Server Remains Source of Truth**: True hypermedia architecture with hyperreactive client ergonomics.
4. **Fine-Grained Signals**: Only the exact DOM nodes reading a changed property re-render. Zero brute-force DOM sweeps.
5. **Two-Way Binding with `hx-model`**: Clean synchronization for text, checkboxes, radios, and selects with `.lazy`, `.number`, `.trim`.
6. **Structural Loops (`hx-for`) & Conditionals (`hx-if`)**: Clean HTML template rendering without JSX transpilation.
7. **Backend Agnostic**: Works with Python (FastAPI/Django), Go, Rust, PHP (Laravel), Bun, Ruby on Rails, or Java.
8. **Built-in Accessible Focus Trapping & Roving Tabindex**: Instant compliance without third-party libraries.
9. **Fluid ScaleUI Resizing**: Interactive testing and responsive component scaling.
10. **Extensible for Framework Builders**: Full TypeScript definitions (`src/types.d.ts`) enabling community developers to build Next.js-equivalent fullstack platforms.

---

## 🤖 Benefits for Agentic AI Coders

1. **Highly Regular Declarative HTML**: AI agents can parse, generate, and refactor UI with near 100% success rate.
2. **Eliminates Hydration & Hook Ordering Errors**: No React Rules of Hooks, useEffect infinite loops, or SSR hydration mismatches.
3. **Unambiguous Grammar**: `hx-state`, `hx-model`, `hx-for`, `hx-if`, and `hx-on:event` form a predictable, learnable grammar.
4. **Server-Driven Atomic Mutations**: AI agents modify interfaces simply by returning standard HTML fragments.
5. **Zero Build Configuration Breakage**: Agents don't get trapped debugging tsconfig, Babel, or bundler plugin errors.
6. **Machine-Readable Component Contracts**: Uniform attribute standards across 100+ Shadcn-style components.
7. **Self-Contained Components**: Copy, paste, or mutate an HTML block without breaking distant client state graphs.
8. **Declarative Validation in Pure HTML**: Form validation rules encoded directly in attributes (`hx-validate="required|email"`).
9. **Global Store Telemetry**: Clean shared state manipulation via `$store.name` from client or server headers (`HX-Trigger`).
10. **Lower Token Overhead**: Concise declarative HTML requires fewer LLM context tokens to generate and maintain.

---

## 🏗️ Architecture

```text
┌────────────────────────────────────────────────────────┐
│  Layer 4: Application Layer                            │
│  Templates, domain components, agent-generated UI      │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│  Layer 3: Composition & Layout System                  │
│  7 layout primitives, named regions, mobile scaffolds  │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│  Layer 2: Hyperreactive Suite ⚡                        │
│  Bolt (signals) + Flash (search) + Form + Vibe + A11y  │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│  Layer 1: Enhanced Hypermedia Core                      │
│  htmx requests, swapping, SSE, WebSockets, history     │
└────────────────────────────────────────────────────────┘
```

---

## 🎯 Scope & Honest Architectural Boundaries

HTMXUI is a **radically lean, hyperreactive foundational framework (~40KB)**. It does not attempt to be a monolithic game engine, GIS mapping suite, or medical imaging workstation out of the box. Instead, it provides the **reactive substrate and clean extension hooks** so developers can attach specialized libraries without friction:

| 🎯 Built-in Native Core Scope (~40KB) | 🔌 Extension Scope (`HTMXUI.directive`) |
|---|---|
| • **Fine-Grained Proxy Signals** (`<script hx-state>`, `HxBolt`) | • **3D WebGL / Scene Graphs** (Three.js, Babylon.js) |
| • **100k-Row Virtualized Data Grid** (`<hx-grid>`, `hx-virtual`) | • **Complex GIS Mapping** (Leaflet, Mapbox, OpenLayers) |
| • **Multi-Step Form Wizards** (`<form hx-wizard>`, `hx-depends`) | • **Custom Physics Engines** (Rapier, Cannon.js, Ammo.js) |
| • **Offline Mutation Queues** (`hx-offline`, IndexedDB) | • **Multi-Track Audio DSP** (Tone.js, AudioWorklets) |
| • **Kinetic Motion & Springs** (`hx-vibe-tilt`, `hx-vibe-spring`) | • **Specialized Medical / Scientific Renderers** (DICOM) |
| • **High-Velocity Action Helpers** (`HyperFX`: `$copy`, `$toast`, `$sound`) | • **Custom WebGPU Compute Pipelines** |
| • **120 FPS High-Frequency Game Loop Ticker** (`HxBolt.ticker`) | • **Third-Party Canvas / Animation Libraries** |

---

## 🚀 Quick Start

### 1. Include the Scripts

```html
<!-- Core HTMX -->
<script src="https://unpkg.com/htmx.org@2.0.4"></script>

<!-- HTMXUI Reactive Signal Engine -->
<script src="/htmx-bolt.js"></script>

<!-- Optional: Search, Forms, Animations, Accessibility, Virtualization, Grid, Offline -->
<script src="/htmx-flash.js"></script>
<script src="/htmx-form.js"></script>
<script src="/htmx-vibe.js"></script>
<script src="/htmx-a11y.js"></script>
<script src="/htmx-virtual.js"></script>
<script src="/htmx-grid.js"></script>
<script src="/htmx-offline.js"></script>
```

### 2. Reactive Component Example

```html
<div class="p-6 border rounded-xl space-y-4"
     hx-computed='{ totalPrice: items.reduce((sum, i) => sum + (i.price * i.qty), 0) }'>

  <!-- Recommended: Declare initial state via script block -->
  <script type="application/json" hx-state>
  {
    "newItem": "",
    "items": [
      { "id": 1, "name": "Mechanical Keyboard", "price": 120, "qty": 1 },
      { "id": 2, "name": "Wireless Mouse", "price": 60, "qty": 2 }
    ]
  }
  </script>

  <!-- Two-way binding -->
  <div class="flex gap-2">
    <input type="text" hx-model="newItem" placeholder="Item name..." class="px-3 py-2 border rounded flex-1">
    <button hx-on:click='if(newItem.trim()) { items.push({ id: Date.now(), name: newItem, price: 40, qty: 1 }); newItem = ""; }' class="bg-primary text-white px-4 py-2 rounded">
      Add
    </button>
  </div>

  <!-- Structural list rendering -->
  <div class="divide-y border rounded">
    <template hx-for="(item, idx) in items">
      <div class="p-3 flex items-center justify-between">
        <span hx-text="item.name" class="font-medium"></span>
        <div class="flex items-center gap-3">
          <span>$<span hx-text="item.price"></span></span>
          <input type="number" hx-model.number="item.qty" min="1" class="w-16 px-2 py-1 border rounded">
          <button hx-on:click="items.splice(idx, 1)" class="text-red-500 text-xs">Remove</button>
        </div>
      </div>
    </template>
  </div>

  <!-- Computed reactive total -->
  <div class="flex justify-between items-center font-bold text-base pt-2">
    <span>Total:</span>
    <span class="text-primary">$<span hx-text="totalPrice">0</span></span>
  </div>
</div>
```

---

## 🛠️ Local Development & Contributing

```bash
# Install dependencies
bun install

# Start documentation and preview server
bun run dev

# Compile TypeScript engines to public distribution bundles
bun run build:engines

# Build Tailwind CSS + Engines
bun run build

# Run Playwright E2E UI tests
bun test:ui
```

---

## 📄 License

MIT © [Hyperlibs](https://github.com/hyperlibs)
