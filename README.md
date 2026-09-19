# HTMXUI — The Hypermedia Platform for Go, Rust, Python & .NET

<div align="center">
  <p><strong>A hyperreactive, lean, hypermedia-first frontend platform built for backend engineers and AI agent swarms.</strong></p>
  <p><em>Zero Virtual DOM. Zero Hydration Mismatches. Zero Node/NPM build step required. Server remains the single source of truth.</em></p>
  <p>
    <a href="https://github.com/hyperlibs/htmxUI/actions/workflows/ci.yml"><img src="https://github.com/hyperlibs/htmxUI/actions/workflows/ci.yml/badge.svg" alt="CI Status"></a>
    <a href="CHANGELOG.md"><img src="https://img.shields.io/badge/release-v0.10.30-blue?style=flat-square" alt="Release"></a>
    <a href="https://htmxui.cgb.workers.dev/demo/"><img src="https://img.shields.io/badge/Cloudflare-Live_Deployment-F38020?logo=cloudflare&style=flat-square" alt="Cloudflare Deployment"></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-purple?style=flat-square" alt="License"></a>
    <a href="CHECKSUMS.sha256"><img src="https://img.shields.io/badge/SHA--256-12%2F12_Verified-emerald?style=flat-square" alt="Checksums"></a>
  </p>
  <p>
    <a href="https://htmxui.cgb.workers.dev/demo/"><strong>⚡ Live Demos on Cloudflare</strong></a> &nbsp;•&nbsp; 
    <a href="https://htmxui.cgb.workers.dev/docs/components/introduction/"><strong>📖 Documentation</strong></a> &nbsp;•&nbsp; 
    <a href="#-about-us--the-hyperlibs-mission"><strong>👥 About Us</strong></a> &nbsp;•&nbsp; 
    <a href="https://github.com/hyperlibs/htmxUI"><strong>⭐ GitHub</strong></a>
  </p>
</div>

---

> [!IMPORTANT]
> ### 📢 19-Sep-2026: Architecture Milestone — HTMXUI is now a Standalone Hypermedia UI Framework
> As of September 2026, **HTMXUI** operates as a fully independent, production-grade hypermedia platform. Featuring its own dedicated 10-engine core (~48KB gzipped), 61-test automated multi-OS verification suite, and live multi-cloud deployment targets, HTMXUI gives systems developers the power to build rich reactive web applications directly from backend code.

---

## 🗺️ Upcoming Strategic Milestones & Ecosystem Roadmap

1. **🐹 Optimized UI Framework for Go (Golang)**:
   - First-class template adapters for `a-h/templ`, standard `html/template`, `Echo`, `Gin`, and `Chi`.
   - Zero-allocation Go SSE publishers for streaming atomic cell mutations into `HxBolt.matrix`.

2. **🦀 Optimized UI Framework for Rust**:
   - Compile-time checked hypermedia macros for `askama` and `maud`.
   - Native `Axum` and `Actix-Web` SSE broadcast channels powering real-time HTMXUI micro-deltas.

3. **🐍 Optimized UI Framework for Python**:
   - Native integration with `FastAPI`, `Django`, and `Flask`.
   - Reusable Jinja2 macro package for all 120+ pre-built HTMXUI components.

4. **⚡ `hx-zap` — Mobile-First & Embedded UI Framework**:
   - Sub-4KB touch gesture, swipe, and offline-first micro-engine for mobile WebViews, POS terminals, medical displays, and IoT dashboards.

5. **🖥️ Native Desktop via Tauri 2.0 (Rust & Tokio)**:
   - Cross-platform desktop & mobile packaging (macOS, Windows, Linux, iOS, Android).
   - Produces ultra-compact **< 5MB native binaries** with zero Node/Electron memory overhead.

---

## 🏛️ Ecosystem Architecture & Maturity Matrix

| Component | Role | Status | Documentation |
| :--- | :--- | :--- | :--- |
| **`HxBolt` Signals & Matrix** | 2D Reactive State, Proxies & $O(1)$ Sparse Matrix | **Production Ready (v0.10.30)** | [`src/htmx-bolt.ts`](src/htmx-bolt.ts) |
| **`HxFlash` Fuzzy Search** | Zero-Latency In-Memory TypedArray Column Store | **Production Ready (v0.10.30)** | [`src/htmx-flash.ts`](src/htmx-flash.ts) |
| **`HxVirtual` 2D Windowing** | Bi-Directional Windowing with Pinned Columns | **Production Ready (v0.10.30)** | [`src/htmx-virtual.ts`](src/htmx-virtual.ts) |
| **`HxForm` & Transactions** | Declarative Validation & Optimistic Rollbacks | **Production Ready (v0.10.30)** | [`src/htmx-form.ts`](src/htmx-form.ts) |
| **`HxCalc` Spreadsheet DAG** | Topological Formula Solver & Cycle Detection | **Production Ready (v0.10.30)** | [`src/htmx-calc.ts`](src/htmx-calc.ts) |
| **`HxA11y` Matrix Nav** | 2D Roving Tabindex & Excel Range Selection | **Production Ready (v0.10.30)** | [`src/htmx-a11y.ts`](src/htmx-a11y.ts) |
| **`HxSim` Kinetic Physics** | Boids, N-Body Gravity, Momentum, Cellular Automata | **Production Ready (v0.10.30)** | [`src/htmx-sim.ts`](src/htmx-sim.ts) |
| **`HxVibe` Spring Kinetics** | 60fps FLIP Layout Animations & Physics Solvers | **Production Ready (v0.10.30)** | [`src/htmx-vibe.ts`](src/htmx-vibe.ts) |
| **`HxOffline` Mutation Queue** | IndexedDB Transaction Queue & Auto-Sync | **Production Ready (v0.10.30)** | [`src/htmx-offline.ts`](src/htmx-offline.ts) |
| **`HxDevTools` & `@diag`** | Real-Time Telemetry & SARIF 2.1.0 Diagnostics | **Production Ready (v0.10.30)** | [`src/htmx-devtools.ts`](src/htmx-devtools.ts) |

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
       + Sim (Particle Kinetics, Boids Flocking & Conway Life)
       + Offline (IndexedDB Mutation Queues & Auto-Sync)
       + 120+ Production-Grade Copy-Paste Components
```

---

## 📦 The 10 Modular Core Micro-Engines (~48KB Total Gzipped)

| Engine | Source (`src/`) | Distribution (`public/`) | Size (Gzipped) | Mathematical & Algorithmic Foundation | Capabilities |
|---|---|---|---|---|---|
| **⚡ Bolt** | `htmx-bolt.ts` | `htmx-bolt.js` | ~16.2 KB | $O(1)$ coordinate-keyed sparse matrix & microtask batching | Signals, dependency tracking via deep Proxies, computed properties, `$store`, `HxBolt.matrix`, 120 FPS ticker, zero-eval safe evaluator. |
| **🔍 Flash** | `htmx-flash.ts` | `htmx-flash.js` | ~4.8 KB | TypedArray columnar indexing & bitmask query filters | In-memory fuzzy search (`hx-flash-search`), multi-column filters, TypedArray columnar store (`createColumnStore`). |
| **🪟 Virtual** | `htmx-virtual.ts` | `htmx-virtual.js` | ~3.9 KB | $O(1)$ spatial slicing & binary row-height bisecting | Bi-directional 2D windowing virtualization with pinned rows/columns for million-row tables. |
| **📊 Calc** | `htmx-calc.ts` | `htmx-calc.js` | ~3.2 KB | Kahn's algorithm topological DAG sort & cycle detection | Reactive formula DAG engine with coordinate references (`A1`, `SUM(A1:B10)`) and `#CYCLE!` detection. |
| **📝 Form** | `htmx-form.ts` | `htmx-form.js` | ~5.1 KB | Deterministic finite-state machine (FSM) validation | Declarative validation (`hx-validate="required\|email"`), optimistic cell transactions with undo/redo (`Ctrl+Z`). |
| **🌊 Vibe** | `htmx-vibe.ts` | `htmx-vibe.js` | ~3.4 KB | Damped harmonic oscillator kinematics: $m \ddot{x} + c \dot{x} + kx = 0$ | FLIP layout animation engine, spring physics solver (`SpringSolver`), stagger sequences, scroll triggers. |
| **🧬 Sim** | `htmx-sim.ts` | `htmx-sim.js` | ~4.2 KB | Particle physics, Boids Reynolds rules, 2D Barnes-Hut gravity | Swarm intelligence flocking, N-Body orbital dynamics, elastic momentum, 23/3 Conway Life, slime mould sensors. |
| **♿ A11y** | `htmx-a11y.ts` | `htmx-a11y.js` | ~3.1 KB | WAI-ARIA roving coordinate space navigation | Modal focus trapping (`hx-trap-focus`), roving tabindex, 2D matrix navigation, Excel range selection. |
| **📶 Offline** | `htmx-offline.ts` | `htmx-offline.js` | ~2.1 KB | FIFO transaction journal with exponential backoff | IndexedDB mutation queues with exponential retry backoff and online sync. |
| **🛠️ DevTools** | `htmx-devtools.ts` | `htmx-devtools.js` | ~1.8 KB | Telemetry bridge & SARIF 2.1.0 diagnostic stream | Real-time signal inspector, swap latency timing metrics, `@diag` HUD. |

---

## ⚡ Verified Performance & Automated Benchmarks

HTMXUI includes an automated, reproducible benchmark suite (`bun test`) measuring real runtime throughput and payload efficiency:

- **Complete 10-Engine Suite**: **50.08 KB total gzip** (smaller than `react-dom` alone before components or state libraries).
- **Atomic 2D Sparse Matrix**: **670,000+ cell writes / second** in $O(1)$ coordinate space.
- **In-Memory Columnar Search**: **0.18 ms query latency** across 10,000 rows.
- **DAG Topological Solver**: **0.16 ms cascade resolution** across 500-level formula dependencies.
- **Zero-`eval` Strict CSP Parser**: **2,600+ complex expressions & arrow closures / second** with zero dynamic `new Function()`.
- **Automated Test Suite**: **61/61 tests passing across 11 test suites in <400ms**.

---

## 🎮 Live Flagship Demos

Experience complete, production-grade applications built with zero React/Node runtime:

> [!TIP]
> **⚡ Live Cloudflare Deployment**: [htmxui.cgb.workers.dev/demo/](https://htmxui.cgb.workers.dev/demo/)  
> **💻 Instant Local Run**: `bun run dev` (or `node server.js` $\to$ `http://localhost:3000/demo`).  
> **🚀 Deploy to Cloudflare**: `bun run deploy:pages` (or `bun run deploy:worker`).

| Flagship Demo | Live Cloudflare URL | Source View | Capabilities Demonstrated | Stack / Engines |
| :--- | :--- | :--- | :--- | :--- |
| **🎯 Verifiable Demos Hub** | [**/demo/**](https://htmxui.cgb.workers.dev/demo/) | [`views/demos-hub.html`](views/demos-hub.html) | Master index of live interactive previews, stress tests, and showcases. | All 10 Engines |
| **📊 HyperAdmin Dashboard** | [**/demo/tailadmin/**](https://htmxui.cgb.workers.dev/demo/tailadmin/) | [`views/app-tailadmin.html`](views/app-tailadmin.html) | 100% pure HTMXUI enterprise admin panel with zero React/Node runtime. Dynamic sales/profit analytics, recent channels, dark/light theme, and reactive sidebar navigation. | `HxBolt`, `HxFlash`, `HxVibe` |
| **🏢 Enterprise HyperERP** | [**/demo/erp/**](https://htmxui.cgb.workers.dev/demo/erp/) | [`views/app-erp.html`](views/app-erp.html) | 10,000+ virtualized rows, zero-latency in-memory fuzzy search, and multi-tier analytics. | `HxVirtual`, `HxFlash`, `HxGrid` |
| **📈 HyperSheet Spreadsheet** | [**/demo/hypersheet/**](https://htmxui.cgb.workers.dev/demo/hypersheet/) | [`views/app-hypersheet.html`](views/app-hypersheet.html) | 2D reactive spreadsheet with topological formula DAGs, coordinate resolution (`SUM(A1:B5)`), cycle detection, and roving 2D tabindex navigation. | `HxCalc`, `HxA11y`, `HxBolt.matrix` |
| **🌌 Cosmic 3D Universe** | [**/demo/universe/**](https://htmxui.cgb.workers.dev/demo/universe/) | [`views/app-universe.html`](views/app-universe.html) | Autonomous procedural universe viewport with domain-warped solar convection shaders and relativistic accretion disk simulations. | `HxBolt`, `HxSim`, `HxVibe` |

---

## 📖 Specifications & Guides

- [🔌 **Backend Wire Protocol Specification**](docs/BACKEND_SPEC.md): Copy-paste server implementations for Go, Rust, Python, and .NET.
- [🛡️ **Security & Hostile-Input Defense**](docs/SECURITY.md): CSP headers, anti-CSRF token docking, and OOB injection mitigation.
- [🤖 **Machine-Actionable `@diag` Protocol**](docs/DIAGNOSTICS.md): Self-healing diagnostics, SARIF 2.1.0 schema, and error codes.
- [📜 **Release Notes & Changelog**](CHANGELOG.md): Version history and upgrades.
- [🔒 **Release Checksums**](CHECKSUMS.sha256): Cryptographic verification hashes (12/12 verified).

---

## 🚀 Quick Start

### 1. Include the Scripts

```html
<!-- Core HTMX -->
<script src="https://unpkg.com/htmx.org@2.0.4"></script>

<!-- HTMXUI Reactive Signal Engine -->
<script src="/htmx-bolt.js"></script>

<!-- Optional: Search, Forms, Animations, Accessibility, Virtualization, Grid, Offline, Sim -->
<script src="/htmx-flash.js"></script>
<script src="/htmx-form.js"></script>
<script src="/htmx-vibe.js"></script>
<script src="/htmx-a11y.js"></script>
<script src="/htmx-virtual.js"></script>
<script src="/htmx-grid.js"></script>
<script src="/htmx-offline.js"></script>
<script src="/htmx-sim.js"></script>
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

# Run automated unit test suite (61/61 passing)
bun test

# Verify SHA-256 release checksums
sha256sum -c CHECKSUMS.sha256
```

---

## 👥 About Us & The Hyperlibs Mission

[**Hyperlibs**](https://github.com/hyperlibs) is an open-source systems research and engineering collective dedicated to liberating backend engineers, systems developers, and AI agents from the complexity of modern client-side JavaScript stacks.

### 🧭 Core Principles
1. **Zero Virtual DOM**: HTML elements are the primary components; the server remains the single source of truth.
2. **Lean & Hyperreactive**: All 10 micro-engines together weigh under ~48KB gzipped—smaller than a typical React hydration runtime.
3. **Deterministic Structure**: Predictable declarative attributes (`hx-state`, `hx-action`, `hx-text`, `hx-show`, `@diag`) make UI easily inspectable and maintainable.
4. **Backend Freedom**: First-class support for Go, Rust, Python, .NET, PHP, and Bun with zero client build toolchains.

- 🚀 **Live Previews**: [Verifiable Live Demos — HTMXUI](https://htmxui.cgb.workers.dev/demo/)
- 📖 **Read More**: [Introduction & Architecture Documentation](https://htmxui.cgb.workers.dev/docs/components/introduction/)
- 💬 **Community & Discussions**: [GitHub Discussions](https://github.com/hyperlibs/htmxUI/discussions)
- 🤝 **Organization**: [github.com/hyperlibs](https://github.com/hyperlibs)

---

## 📄 License

MIT © [Hyperlibs](https://github.com/hyperlibs)
