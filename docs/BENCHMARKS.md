# HTMXUI Official Performance & Benchmark Suite

> Automated, reproducible benchmarks measured using un run benchmark across all 10 HTMXUI micro-engines and core algorithms.

---

## 1. Micro-Engine Payload Footprint

| Micro-Engine | Responsibility | Raw Size | Gzipped Size |
| :--- | :--- | :--- | :--- |
| **htmx-bolt.js** | Fine-grained signals, zero-val parser, auto-fallback | 85.84 KB | **19.18 KB** |
| **htmx-flash.js** | In-memory search & TypedArray columnar queries | 16.83 KB | **4.26 KB** |
| **htmx-vibe.js** | Damped harmonic oscillator physics & FLIP motions | 11.65 KB | **3.25 KB** |
| **htmx-calc.js** | Reactive formula engine & Kahn's DAG topological sort | 11.62 KB | **3.18 KB** |
| **htmx-form.js** | Declarative validation & optimistic undo/redo | 17.47 KB | **4.40 KB** |
| **htmx-grid.js** | Virtualized data grid with pinned column frozen panes | 19.85 KB | **5.17 KB** |
| **htmx-virtual.js** | 2D bi-directional windowing scroller | 13.67 KB | **3.27 KB** |
| **htmx-offline.js** | Background sync & offline IndexedDB cache | 7.72 KB | **2.32 KB** |
| **htmx-a11y.js** | Roving tabindex & screen-reader ARIA live region | 11.44 KB | **3.02 KB** |
| **htmx-devtools.js** | Reactive signal graph inspector & @diag telemetry | 6.13 KB | **2.03 KB** |
| **TOTAL (All 10 Engines)** | **Complete Full-Stack Frontend Capability** | **202.20 KB** | **50.08 KB** |

*For comparison, eact-dom alone is ~130 KB raw / ~42 KB gzip — before any state management library (Zustand/Redux), router, component primitives, physics, or virtualized grid is added.*

---

## 2. Core Algorithmic Benchmarks

### A. 2D Coordinate Sparse Matrix ((1)$)
- **Benchmark**: 10,000 coordinate-keyed cell updates on live tick grid.
- **Throughput**: **676,338 writes / second**
- **Latency**: **0.0014 ms** per cell mutation

### B. In-Memory Columnar Search (TypedArray Indexing)
- **Benchmark**: 1,000 range filter queries across a 10,000-row columnar store.
- **Latency**: **0.18 ms** average query latency
- **Throughput**: **5,500+ multi-column queries / second**

### C. Kahn's DAG Formula Topological Sort
- **Benchmark**: Evaluating a 500-level deep chained formula dependency graph.
- **Latency**: **0.16 ms** total cascade evaluation time
- **Acyclic Verification**: Automatic circular dependency detection (#CYCLE!) in < 1 ms

### D. Zero-val Recursive Descent Parser Throughput
- **Benchmark**: 10,000 complex array .reduce() arrow closures and arithmetic expressions evaluated under strict CSP without 
ew Function().
- **Throughput**: **2,600+ expressions / second**

---

## How to Reproduce
Run the automated benchmark suite locally:
`ash
bun run build
bun run benchmark
`
