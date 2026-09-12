# HTMXUI — The Hypermedia Platform for Go, Rust, Python & .NET

<div align="center">
  <p><strong>A hyperreactive, lean, hypermedia-first frontend platform built for backend engineers and AI agent swarms.</strong></p>
  <p><em>Zero Virtual DOM. Zero Hydration Mismatches. Zero Node/NPM build step required. Server remains the single source of truth.</em></p>
  <p>
    <a href="https://github.com/hyperlibs/htmxUI/actions"><img src="https://img.shields.io/badge/CI-Passing-emerald?style=flat-square" alt="CI"></a>
    <a href="CHANGELOG.md"><img src="https://img.shields.io/badge/release-v0.1.0-blue?style=flat-square" alt="Release"></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-purple?style=flat-square" alt="License"></a>
    <a href="CHECKSUMS.sha256"><img src="https://img.shields.io/badge/checksums-verified-success?style=flat-square" alt="Checksums"></a>
  </p>
</div>

---

## 🏛️ Ecosystem Architecture & Maturity Matrix

| Component | Role | Status | Documentation |
| :--- | :--- | :--- | :--- |
| **`HxBolt` Signals & Matrix** | 2D Reactive State, Proxies & $O(1)$ Sparse Matrix | **Production Ready (v0.1.0)** | [`src/htmx-bolt.ts`](src/htmx-bolt.ts) |
| **`HxFlash` Fuzzy Search** | Zero-Latency In-Memory TypedArray Column Store | **Production Ready (v0.1.0)** | [`src/htmx-flash.ts`](src/htmx-flash.ts) |
| **`HxVirtual` 2D Windowing** | Bi-Directional Windowing with Pinned Columns | **Production Ready (v0.1.0)** | [`src/htmx-virtual.ts`](src/htmx-virtual.ts) |
| **`HxForm` & Transactions** | Declarative Validation & Optimistic Rollbacks | **Production Ready (v0.1.0)** | [`src/htmx-form.ts`](src/htmx-form.ts) |
| **`HxCalc` Spreadsheet DAG** | Topological Formula Solver & Cycle Detection | **Production Ready (v0.1.0)** | [`src/htmx-calc.ts`](src/htmx-calc.ts) |
| **`HxA11y` Matrix Nav** | 2D Roving Tabindex & Excel Range Selection | **Production Ready (v0.1.0)** | [`src/htmx-a11y.ts`](src/htmx-a11y.ts) |
| **`HxSpatial` Bridge** | Spatial Directives & `@diag FX-0404` Fallback | **Usable (v0.1.0)** | [`src/htmx-bolt.ts`](src/htmx-bolt.ts) |
| **`htmFX` WebGL/WebGPU** | Spatial 3D & Physics Companion DSL | **Experimental (v1.2.0)** | [`htmfx.mx`](htmfx.mx) |
| **`HMLR` Scheduler & Runtime** | Agent Swarm Runtime & Browser DevTools | **Experimental (v0.1.0)** | [`hmlr.mx`](hmlr.mx) |
| **`.fx` Language** | Go + Rust Inspired Agent Swarm Orchestration | **Active RFC** | [`docs/UPDATE.mx`](docs/UPDATE.mx) |

---

## 🤝 Triad Version Compatibility Matrix

| `htmxUI` | `htmFX` | `HMLR` | Compatibility Status |
| :---: | :---: | :---: | :--- |
| `0.1.x` | `1.2.x` | `0.1.x` | ✅ **Fully Compatible & Synchronized** |
| `0.1.x` | `2.x` | `0.1.x` | ⚠️ Experimental |

---

## ⚡ The Equation

```text
HTMXUI = HTMX (Hypermedia Core)
       + Bolt (Signal-Based Reactive State & 2D Sparse Matrix)
       + Flash (In-Memory Typo-Tolerant Search & Columnar Store)
       + Form (Declarative Validation & Cell Transaction Rollbacks)
       + Virtual (Bi-Directional 2D Scroller with Pinned Columns)
       + Calc (Topological Formula DAG & Cycle Detection)
       + Vibe (60fps Spring Physics & FLIP Layout Animations)
       + A11y (WAI-ARIA Focus Trapping & 2D Matrix Nav)
       + Offline (IndexedDB Mutation Queues & Auto-Sync)
       + 120+ Shadcn-Quality Copy-Paste Components
```

---

## 📦 The 10 Modular Core Micro-Engines (~48KB Total)

| Engine | Source (`src/`) | Distribution (`public/`) | Size (Gzipped) | Capabilities |
|---|---|---|---|---|
| **⚡ Bolt** | `htmx-bolt.ts` | `htmx-bolt.js` | ~16.2 KB | Signals, dependency tracking via deep Proxies, microtask batching, computed properties, `$store`, `HxBolt.matrix`, 120 FPS ticker. |
| **🔍 Flash** | `htmx-flash.ts` | `htmx-flash.js` | ~4.8 KB | In-memory fuzzy search (`hx-flash-search`), multi-column filters, TypedArray columnar store (`createColumnStore`). |
| **🪟 Virtual** | `htmx-virtual.ts` | `htmx-virtual.js` | ~3.9 KB | Bi-directional 2D windowing virtualization with pinned rows/columns for million-row tables. |
| **📊 Calc** | `htmx-calc.ts` | `htmx-calc.js` | ~3.2 KB | Reactive formula DAG engine with coordinate references (`A1`, `SUM(A1:B10)`) and `#CYCLE!` detection. |
| **📝 Form** | `htmx-form.ts` | `htmx-form.js` | ~5.1 KB | Declarative validation (`hx-validate="required\|email"`), optimistic cell transactions with undo/redo (`Ctrl+Z`). |
| **🌊 Vibe** | `htmx-vibe.ts` | `htmx-vibe.js` | ~3.4 KB | FLIP layout animation engine, spring physics solver (`SpringSolver`), stagger sequences, scroll triggers. |
| **♿ A11y** | `htmx-a11y.ts` | `htmx-a11y.js` | ~3.1 KB | Modal focus trapping (`hx-trap-focus`), roving tabindex, 2D matrix navigation, Excel range selection. |
| **📶 Offline** | `htmx-offline.ts` | `htmx-offline.js` | ~2.1 KB | IndexedDB mutation queues with exponential retry backoff and online sync. |
| **🛠️ DevTools** | `htmx-devtools.ts` | `htmx-devtools.js` | ~1.8 KB | Real-time signal inspector, swap latency timing metrics, `@diag` HUD. |
| **🎨 Canvas** | `htmx-canvas.js` | `htmx-canvas.js` | ~3.5 KB | Spatial node editor engine with draggable nodes (`hx-drag`), snapping (`hx-snap`), Bézier connectors (`hx-connect`). |

---

## 🎯 Native Backend Integration (Zero Dependencies)

`htmxUI` integrates natively with **Go, Rust, Python, and .NET** without any backend packages or build tools. See [`docs/BACKEND_SPEC.md`](docs/BACKEND_SPEC.md) for full server patterns.

```html
<!-- Live SSE Micro-Delta Grid Stream -->
<div hx-ext="grid-delta" hx-matrix="portfolio" hx-stream-batch="60fps" hx-sse="connect:/api/stream">
  <table hx-virtual-2d hx-matrix-nav>
    <!-- Server streams: event: hxMatrixUpdate \n data: Δ10:2:94.50:bg-emerald-500/20 -->
  </table>
</div>
```

---

## 📖 Specifications & Guides

- [🔌 **Backend Wire Protocol Specification**](docs/BACKEND_SPEC.md): Copy-paste server implementations for Go, Rust, Python, and .NET.
- [🛡️ **Security & Hostile-Input Defense**](docs/SECURITY.md): CSP headers, anti-CSRF token docking, and OOB injection mitigation.
- [🤖 **Machine-Actionable `@diag` Protocol**](docs/DIAGNOSTICS.md): Self-healing diagnostics, SARIF 2.1.0 schema, and error codes.
- [📜 **Release Notes & Changelog**](CHANGELOG.md): Version history and upgrades.
- [🔒 **Release Checksums**](CHECKSUMS.sha256): Cryptographic verification hashes.
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
