# 📜 Changelog — `htmxUI`

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0] - 2026-09-12

### 🌟 Initial Production Release (The Hypermedia Platform for Go, Rust, Python & .NET)

`htmxUI` v0.1.0 provides a complete, hyperreactive, node-free hypermedia platform designed for backend developers.

### 🚀 10 Modular Core Micro-Engines (~48KB total)
- **`HxBolt` (`htmx-bolt.js`)**: Signal-based reactive state proxy, microtask batching scheduler, typo guard, and 120 FPS high-frequency ticker.
- **`HxBolt.matrix`**: Atomic 2D Sparse Matrix Signals with $O(1)$ cell indexing and subscriber callbacks.
- **`HxFlash` (`htmx-flash.js`)**: In-memory zero-latency fuzzy search, multi-column filtering, and TypedArray columnar store (`createColumnStore`).
- **`HxVirtual` (`htmx-virtual.js`)**: Bi-directional 2D windowing virtualization with pinned rows and columns for million-row tables.
- **`HxCalc` (`htmx-calc.js`)**: Reactive spreadsheet formula engine with topological sorting DAG and circular reference detection (`#CYCLE!`).
- **`HxForm` (`htmx-form.js`)**: Declarative form validation state machine, optimistic updates, and cell transaction rollback manager (`Ctrl+Z`/`Ctrl+Y`).
- **`HxVibe` (`htmx-vibe.js`)**: Spring physics solver, FLIP layout animation manager, and intersection view transitions.
- **`HxA11y` (`htmx-a11y.js`)**: WAI-ARIA focus trap, roving tabindex, and 2D matrix navigation with Excel-style bounding box range selection.
- **`HxOffline` (`htmx-offline.js`)**: Offline queueing with automatic backoff and IndexedDB persistence.
- **`HxDevTools` (`htmx-devtools.js`)**: Real-time signal inspector, swap latency timer, and `@diag` telemetry HUD.

### 🌐 Protocols & Integrations
- **HyperStream Micro-Delta Protocol**: Server-driven delta parsing (`Δrow:col:val:flashClass`) over SSE or WebSockets with 60 FPS RAF batching.
- **Autonomous Spatial Bridge (`HxSpatial`)**: Directs `[hx-3d]`, `[3denv]`, `[3datmos]`, `[3dfx]`, and `<hx-viewport>` elements to `htmFX` with `@diag FX-0404` fallback.
- **Canonical Schema & Machine Discovery**: Published `llms.txt` and `schema/htmxui.json` covering all component grammar and attributes.
