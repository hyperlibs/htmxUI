# HTMXUI — Agentic Builder & Maintainer Directives

> **CRITICAL REPOSITORY DIRECTIVE**: All AI agents, automated coders, and maintainers working on this codebase MUST strictly follow these rules without exception.

---

## 1. Non-Negotiable Architectural Principles

### 🚫 ZERO Node.js & ZERO NPM
- **Node.js is strictly prohibited at all costs.**
- **Never** execute `node`, `npm`, `npx`, or `yarn`.
- **Allowed Tooling & Runtimes ONLY**:
  - **`bun`** (for TypeScript execution, bundler, test runner, and local dev server: `bun run server.ts`, `bun test`, `bun build`).
  - **`go`** (for native backend servers, Go component DSL, and single-binary production builds: `go run server.go`, `go test ./...`).

### 🚫 ZERO React / Virtual DOM / Heavy SPA Bloat
- No React, Vue, Angular, Svelte, or Virtual DOM libraries.
- The server is the source of truth; HTML is the medium of state transfer.
- State is managed either server-side via HTMX partials or client-side using **HTMXUI Micro-Engines** (`htmx-bolt.js`, `htmx-flash.js`, `appz.js`).

---

## 2. The 50 / 20 / 15 / 15 Architectural Ratio

When building features, mobile systems, or UI components, adhere strictly to this design ratio:

```
┌────────────────────────────────────────────────────────┐
│ 50% HTMXUI  │ 20% Golang │ 15% Flutter │ 15% Kotlin   │
└────────────────────────────────────────────────────────┘
```

1. **50% HTMXUI (Hypermedia & Reactive HTML)**:
   - Declarative HTML attributes (`hx-get`, `hx-post`, `hx-ext="reactive"`, `hx-state`, `hx-action`, `hx-model`, `hx-show`, `hx-class`).
   - Copy-paste atomic components styled with standard Tailwind CSS variables.
2. **20% Golang (Server Engine & 1:1 Component DSL)**:
   - Pure Go DSL in `go/components/` (`Page`, `ShellUI`, `DataTable`, `StatCard`, `Gallery`).
   - Ultra-high concurrency backend endpoints with zero-allocation JSON / HTML streaming.
3. **15% Flutter (Declarative Widget Tree Ergonomics)**:
   - Widget composition patterns: `VStack`, `HStack`, `AppBar`, `ShellUI`, nested slot layouts.
4. **15% Kotlin (Hardware Bridges & Asynchronous Channels)**:
   - Kotlin-style coroutines/channels (`AppzChan<T>`), haptic feedback (`HardwareBridge.haptic()`), and mobile lifecycle states.

---

## 3. Language & File Extension Standard

| File Type | Source Rule | Distribution Rule |
|---|---|---|
| **Client Engines** | **100% Strict TypeScript** in `src/*.ts` | Compiled via `bun build` to `public/*.js` (IIFE). |
| **Backend & DSL** | **100% Go** in `go/components/*.go`, `server.go` | Native Go binary (`htmxui-server.exe`). |
| **Dev Server** | **100% TypeScript** in `server.ts` | Executed directly via `bun run server.ts`. |
| **HTML Templates** | Semantic HTML in `views/components/*.html` | Injected into layouts or rendered via Go/Bun. |
| **Raw `.js` in Source** | ❌ **FORBIDDEN** | Never create loose `.js` files in root or `src/`. |

---

## 4. `appz` Mobile & Spatial Gaming Lexicon

Mobile and gaming layouts MUST use the standardized `appz` custom elements and naming:

- **`<app-shellui>`**: The top-level mobile/game application shell (replaces "Scaffold").
- **`<app-bar>`**: Top application bar with leading icons, title, and trailing actions.
- **`<app-seg id="segN">`**: Independent scrollable or spatial viewport segments.
- **`<app-layer level="0..9">`**: **Photoshop-style 0–9 Z-index layer stacking** per segment:
  - `level="0"`: Base background canvas / content feed.
  - `level="1"`: Overlapping cards / floating HUD panels.
  - `level="2..8"`: Secondary floating badges / contextual controls.
  - `level="9"`: Topmost overlay / alert / dynamic action button.
- **`<app-navbar>`**: Bottom navigation with attributes `mode="float|sticky|hidden"` and `behavior="hide-on-scroll"`.
- **`<app-bottom-sheet>`**: Spring-animated modal bottom sheet (`$appz.sheet('#id')`).
- **`<app-joystick>`**: Virtual twin-stick HUD controller for mobile games.

---

## 5. Go DSL 1:1 Parity Requirement

**Every single HTML component** created in `views/components/<name>.html` MUST have a matching Go DSL constructor in `go/components/components.go` or `go/components/appz.go`.

Example:
```go
// Go DSL component pattern
type GalleryProps struct {
    Columns int
    Slots   int
    Dashed  bool
    Images  []string
}

func Gallery(p GalleryProps) Component {
    // Returns renderable HTML matching views/components/gallery.html
}
```

---

## 6. Route Matching & Trailing Slash Rule

All servers (`server.ts` and `server.go`) **MUST normalize pathnames by trimming trailing slashes** so both URL formats resolve identically:
- `http://localhost:3000/demo/mobile` ✅
- `http://localhost:3000/demo/mobile/` ✅

---

## 7. Strict Maintainer Verification Protocol

Before reporting any task as completed:
1. **Build all engines**: Run `bun run build:engines` (all 13 engines must compile cleanly).
2. **Run all test suites**: Run `bun test tests/` (must achieve **100% pass rate**).
3. **Verify Go compilation**: Run `go build -o htmxui-server.exe server.go`.
4. **Test live endpoints**: Never assume localhost works; test with `bun -e "fetch(...)"` or automated HTTP checks.
5. **Sync repository**: Copy updated files to `htmxUI_repo`, commit with conventional commit messages, and push to `master` and `main`.
