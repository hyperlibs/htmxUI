# HTMXUI — Hyper Reactive HTMX on Steroids

> Original htmx completed HTML as a hypermedia. HTMXUI completes it as a **reactive, agent-friendly, composable application platform** — while remaining radically lean.

HTMXUI is not a UI library. It is a **deliberate fork and reinvention of htmx** into a hyperreactive, lean, hypermedia-first framework optimized for human developers *and* agentic AI coders.

**HTMXUI = HTMX + Shadcn-quality Components + Reactive Engine + Flash Search + Canvas Engine**

## The Core Stack

| Extension | Size | Purpose |
|---|---|---|
| **htmx-bolt.js** | ~2KB | Proxy-based reactive engine. Local state (`hx-state`), declarative bindings (`hx-text`, `hx-show`, `hx-class`, `hx-style`), actions (`hx-action`), server-driven sync via `HX-Trigger`. |
| **htmx-flash.js** | ~1KB | In-memory search engine. Pre-loads data, filters thousands of items in 0ms. Command palettes, instant filterable tables. |
| **htmx-canvas.js** | ~3KB | Visual node editor. Drag-and-drop (`hx-drag`), grid snapping (`hx-snap`), 2-layer nesting, dynamic Bézier connectors (`hx-connect`). |
| **100+ Components** | HTML | Shadcn/ui-quality copy-paste components. No NPM, no Virtual DOM, no build step for logic. |

## Benefits for Human Developers

1. Zero NPM, zero Virtual DOM — no `node_modules`, no React, no webpack
2. Server remains the source of truth — true hypermedia architecture
3. Copy-paste components — full ownership, no black-box abstractions
4. Instant local reactivity via Bolt — dropdowns, tabs, toggles without round-trips
5. Backend agnostic — Python, Go, PHP, Rust, Bun, any language that returns HTML
6. Tailwind-native theming — CSS variable system for dark mode and custom brands
7. Sub-3KB total client JS — smaller than a single React hook import
8. Progressive enhancement — start pure htmx, add Bolt/Flash only where needed
9. 7 layout primitives — dashboards, marketing, print, canvases, mobile-first
10. No build step for logic — HTML is the component, the server is the framework

## Benefits for Agentic AI Coders

1. Highly regular HTML structure — agents parse, generate, and modify UI with high success rates
2. Declarative attribute-based behavior — no imperative JS to reason about
3. Predictable composition — contracts that agents can reliably assemble
4. Minimal hidden side effects — what you see in the HTML is what happens
5. Machine-readable component patterns — consistent naming across 100+ components
6. No complex build toolchain — agents don't manage webpack/vite/turbopack configs
7. Server-driven mutations — modify UI by returning HTML fragments, not client state graphs
8. Copy-paste atomic components — compose UIs by concatenating well-defined HTML blocks
9. Small learnable grammar — `hx-state`, `hx-action`, `hx-text`, `hx-show` is the entire reactive API
10. Lower error surface — no JSX transpilation, no hook ordering, no hydration mismatches

## Design Pillars

| Pillar | Meaning | Non-Goal |
|---|---|---|
| **Hyperreactive** | Fine-grained reactivity that works with server-driven HTML | Becoming a full SPA framework |
| **Lean** | Minimal runtime, minimal concepts, maximal clarity | Feature bloat or "everything included" |
| **Hypermedia-first** | Server is the source of truth; HTML is the primary medium | Client-side state ownership |
| **Agentic-native** | Structure that AI agents can reliably generate & reason about | Human-only ergonomics |
| **Composable** | Clear contracts for assembling UI, behavior, and layouts | Opaque magic or coupled systems |

## Architecture

```
┌─────────────────────────────────────────────────────┐
│  Layer 4: Your Application                          │
│  Templates, domain components, agent-generated UI   │
└──────────────────────────┬──────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────┐
│  Layer 3: Composition & Layouts                     │
│  7 layout primitives, named regions, mobile variants│
└──────────────────────────┬──────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────┐
│  Layer 2: Hyperreactive Layer  ⚡                    │
│  Bolt (reactivity) + Flash (search) + Canvas        │
└──────────────────────────┬──────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────┐
│  Layer 1: Enhanced Hypermedia Core                   │
│  htmx requests, swapping, SSE, WebSocket, history   │
└─────────────────────────────────────────────────────┘
```

## Quick Start

```html
<!-- Include the core -->
<script src="https://unpkg.com/htmx.org@2.0.4"></script>
<script src="/htmx-bolt.js"></script>

<!-- Use reactive components -->
<div hx-ext="reactive" hx-state='{ "count": 0, "open": false }'>
  <button hx-action="count++">
    Clicked: <span hx-text="count">0</span>
  </button>
  <button hx-action="open = !open">Toggle</button>
  <div hx-show="open">I am reactive. No build step. No JSX.</div>
</div>
```

## Local Development

```bash
bun install
bun run server.ts
```

Then visit `http://localhost:3000`.

## Testing

```bash
bun test:ui
```

## License

MIT
