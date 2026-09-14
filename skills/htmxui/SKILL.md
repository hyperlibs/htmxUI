---
name: htmxui
description: "Author, inspect, validate, and debug high-performance reactive web applications using HTMXUI — the hyperreactive lean framework for human and AI agentic developers."
version: 1.0.0
author: "Hyperlibs Engineering"
license: "MIT"
tags:
  - htmx
  - hypermedia
  - reactivity
  - fullstack
  - tailwindcss
  - declarative-ui
  - agentic-coding
---

# HTMXUI Agent Skill Specification

HTMXUI is a hyperreactive, hypermedia-first web application framework engineered specifically for **human developers** and **autonomous AI coding agents**. It provides fine-grained signal reactivity, sub-millisecond in-memory search, enterprise data grids, physics-based FLIP animations, and accessible keyboard navigation without Virtual DOM overhead or multi-gigabyte client bundles.

---

## 1. Core Architectural Pillars

1. **Hypermedia Source of Truth**: The server handles data persistence, routing, and major mutations via standard HTTP (GET, POST, PUT, DELETE, PATCH).
2. **Deterministic Declarative Grammar**: Local client state and reactivity are declared directly on DOM nodes via `hx-*` attributes.
3. **Zero Virtual DOM & Zero Build**: HTML is parsed natively by the browser engine. No JSX compilation or bundlers required.
4. **CSP-Safe Execution**: Zero `eval()` / `new Function()` execution when `HTMXUI.config.strictCSP = true` or under strict Content Security Policies.
5. **Universal Diagnostic Protocol (`@diag`)**: Standardized error taxonomy (`HTMXUI-BOLT-xxx` ... `HTMXUI-SPATIAL-xxx`) with Levenshtein autocorrect.

---

## 2. Directive Grammar & Attribute Reference

### 2.1 Reactive State & Bindings (`htmx-bolt.js`)

| Directive | Type | Purpose | Example |
| :--- | :--- | :--- | :--- |
| `hx-state` | JSON / Attr | Declares local reactive scope. | `hx-state='{"count": 0, "open": false}'` |
| `<script type="application/json" hx-state>` | Child Node | Declares large/complex reactive state safely without HTML attribute escaping issues. | `<script type="application/json" hx-state>{"items": []}</script>` |
| `hx-text` | Expression | Binds node `textContent` to reactive expression. | `hx-text="count * 2"` |
| `hx-html` | Expression | Binds node `innerHTML` to reactive expression. | `hx-html="formattedSnippet"` |
| `hx-show` | Expression | Conditionally toggles CSS `display: none`. | `hx-show="open"` |
| `hx-if` | Expression | Conditionally inserts/removes `<template>` content. | `<template hx-if="user.isAdmin">...</template>` |
| `hx-for` | Iterator | Iterates over arrays on `<template>` nodes. | `<template hx-for="(item, idx) in items">...</template>` |
| `hx-model` | Property | Two-way input binding with automatic type casting (`.number`, `.boolean`, `.trim`). | `hx-model.number="price"` |
| `hx-action` | Action Expr | Event listener executing scoped mutations and HyperFX helpers. | `hx-action="count++; $toast('Incremented')"` |
| `hx-class` | Object Expr | Declarative conditional class map. | `hx-class="{'bg-primary': active, 'opacity-50': disabled}"` |
| `hx-style` | Object Expr | Declarative inline style map. | `hx-style="{'transform': 'scale(' + zoom + ')'}"` |
| `hx-computed` | Expression | Memoized computed property. | `hx-computed="total = qty * price"` |
| `hx-effect` | Expression | Side-effect executing on reactive dependency changes. | `hx-effect="console.log('Count changed:', count)"` |

### 2.2 HyperFX Action Helpers (`$*`)

Available inside all `hx-action` and `hx-effect` scopes:
- `$toggle('propertyName')`: Toggles boolean state property.
- `$toast('Message', type?)`: Dispatches ephemeral toast notification.
- `$copy('Text')`: Copies string to system clipboard.
- `$undo()` / `$redo()`: State history travel on elements with `hx-undoable`.
- `$focus('#selector')`: Programmatically focuses element.
- `$blast(options?)`: Triggers spatial particle physics burst.
- `$exportCSV('#gridSelector', 'export.csv')`: Columnar data export.

### 2.3 In-Memory Flash Search (`htmx-flash.js`)

| Directive | Purpose |
| :--- | :--- |
| `hx-flash-src="url"` | Fetches and indexes JSON payload into TypedArray columnar store. |
| `hx-flash-search="#input"` | Binds text input for 0ms sub-string and fuzzy token search. |
| `hx-flash-filter="field:value"` | Applies multi-column facet filters. |
| `hx-flash-sort="field:asc\|desc"` | Fast in-memory columnar sorting. |
| `hx-flash-limit="50"` | Limits rendered results for optimal DOM performance. |

### 2.4 Sparse Matrix & Realtime Streaming (`htmx-calc.js`)

| Directive | Purpose |
| :--- | :--- |
| `hx-matrix="name"` | Instantiates $O(1)$ coordinate-keyed sparse matrix. |
| `hx-cell="row,col"` | Subscribes cell directly to matrix updates. |
| `hx-stream-batch="60"` | Batches high-frequency WebSocket/SSE micro-deltas at 60 FPS via `requestAnimationFrame`. |
| `hx-calc="formula"` | Reactive spreadsheet calculation graph with topological DAG sort. |

### 2.5 Physics, FLIP & Motion (`htmx-vibe.js`)

| Directive | Purpose |
| :--- | :--- |
| `hx-vibe-flip` | First-Last-Invert-Play smooth DOM layout transitions. |
| `hx-vibe-stagger="50ms"` | Cascading entrance animation for child lists. |
| `hx-vibe-view` | View transitions API wrapper. |

### 2.6 Accessibility & Focus (`htmx-a11y.js`)

| Directive | Purpose |
| :--- | :--- |
| `hx-trap-focus` | Traps keyboard Tab focus inside dialogs/modals. |
| `hx-roving="arrows\|grid"` | Automatic WAI-ARIA roving tabindex keyboard navigation. |

---

## 3. Universal Error Taxonomy (`@diag`)

When HTMXUI encounters a syntax error, invalid state, or potential AI typo, it outputs a structured diagnostic string conforming to the `@diag` specification:

```
[@diag HTMXUI-BOLT-005] Unrecognized hx-* attribute detected (potential AI hallucination or typo).
  Target: <button.btn.btn-primary>
  Detail: Element has unknown attribute 'hx-click'. Did you mean 'hx-action'?
  Fix: Check the attribute spelling against the official HTMXUI schema in /schema/htmxui.json.
```

### 3.1 Catalog Index

| Code | Micro-Engine | Description | Typical Fix |
| :--- | :--- | :--- | :--- |
| `HTMXUI-BOLT-001` | Bolt | Malformed JSON in state declaration. | Use `<script type="application/json" hx-state>` to avoid quote escaping. |
| `HTMXUI-BOLT-002` | Bolt | Circular recursion in `hx-computed`. | Break cyclic formula loops. |
| `HTMXUI-BOLT-003` | Bolt | Malformed `hx-for` syntax. | Use `item in items` on a `<template>` tag. |
| `HTMXUI-BOLT-004` | Bolt | Undefined store or state reference. | Register store with `HxBolt.store('name', {...})`. |
| `HTMXUI-BOLT-005` | Bolt | Typo or hallucinated `hx-*` attribute. | Autocorrect according to Levenshtein suggestion. |
| `HTMXUI-BOLT-006` | Bolt | CSP Eval blocked dynamic evaluation. | Set `HTMXUI.config.strictCSP = true`. |
| `HTMXUI-CALC-001` | Calc | Cycle detected in calculation graph DAG. | Verify acyclic formula dependencies. |
| `HTMXUI-FORM-001` | Form | Validation constraint syntax error. | Check regex pattern in `hx-validate`. |
| `HTMXUI-VIBE-001` | Vibe | Negative or invalid spring physics parameters. | Set `stiffness > 0` and `mass > 0`. |
| `HTMXUI-FLASH-001` | Flash | Columnar store buffer mismatch. | Verify schema descriptor field keys. |
| `HTMXUI-A11Y-001` | A11y | Missing accessible name or broken roving boundary. | Add `aria-label` or verify `hx-roving` container. |
| `HTMXUI-VIRTUAL-001` | Virtual | Negative viewport or item height. | Ensure item height and container clientHeight > 0. |
| `HTMXUI-GRID-001` | Grid | Column definition mismatch. | Ensure column field matches row record key. |
| `HTMXUI-OFFLINE-001` | Offline | Mutation replay queue conflict. | Ensure server endpoint accepts replay payload. |

---

## 4. Anti-Hallucination Rules for AI Agents

When generating code for HTMXUI:
1. **DO NOT** emit React, JSX, `useState`, `useEffect`, or Virtual DOM concepts.
2. **DO NOT** invent custom event attributes like `hx-click`, `hx-change`, or `hx-submit`. Use `hx-action` or standard HTMX `hx-post` / `hx-trigger`.
3. **DO NOT** put complex JSON with nested unescaped quotes inside `hx-state="..."`. Instead, use `<script type="application/json" hx-state>` inside the element.
4. **DO** use Tailwind CSS utility classes and design tokens (`bg-background`, `text-foreground`, `border-border`, `bg-card`, etc.).
5. **DO** return partial HTML fragments from server endpoints intended for HTMX swaps.

---

## 5. Standard Component Template Examples

### 5.1 Interactive Counter with Toast
```html
<div class="p-6 bg-card text-card-foreground border border-border rounded-xl shadow-sm space-y-4"
     hx-state='{"count": 0}'>
  <div class="flex items-center gap-4">
    <button class="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 font-medium"
            hx-action="count > 0 ? count-- : null">
      -
    </button>
    <span class="text-2xl font-bold font-mono" hx-text="count">0</span>
    <button class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 font-medium"
            hx-action="count++; $toast('Count: ' + count)">
      +
    </button>
  </div>
</div>
```

### 5.2 Server-Swapped Form with Client Validation & Optimistic UI
```html
<form hx-post="/api/comments"
      hx-target="#comment-list"
      hx-swap="afterbegin"
      hx-indicator="#saving-spinner"
      hx-state='{"author": "", "content": "", "valid": false}'
      hx-effect="valid = author.trim().length > 0 && content.trim().length >= 5"
      class="space-y-4">
  <div>
    <label class="block text-sm font-medium mb-1">Author</label>
    <input type="text"
           name="author"
           hx-model="author"
           class="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
           placeholder="Your name" />
  </div>
  <div>
    <label class="block text-sm font-medium mb-1">Comment</label>
    <textarea name="content"
              hx-model="content"
              class="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
              rows="3"
              placeholder="Minimum 5 characters..."></textarea>
  </div>
  <button type="submit"
          hx-class="{'opacity-50 cursor-not-allowed': !valid, 'hover:bg-primary/90': valid}"
          class="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg transition-all">
    Post Comment
  </button>
  <span id="saving-spinner" class="htmx-indicator ml-2 text-sm text-muted-foreground">Posting...</span>
</form>
```

### 5.3 High-Speed Instant Flash Search
```html
<div class="space-y-4" hx-flash-src="/api/products.json">
  <input type="search"
         id="product-search"
         hx-flash-search
         placeholder="Instant search 10,000+ items..."
         class="w-full px-4 py-2.5 bg-background border border-input rounded-xl" />
  
  <div hx-flash-container class="grid grid-cols-1 md:grid-cols-3 gap-4" hx-flash-limit="24">
    <!-- Flash engine renders filtered cards into this container in 0ms -->
  </div>
</div>
```

---

## 6. Official Resources & Specifications

- **Live Documentation & Demo Hub**: [https://htmxui.cgb.workers.dev/](https://htmxui.cgb.workers.dev/)
- **Interactive Component Gallery**: [https://htmxui.cgb.workers.dev/demo/](https://htmxui.cgb.workers.dev/demo/)
- **GitHub Repository**: [https://github.com/hyperlibs/htmxUI](https://github.com/hyperlibs/htmxUI)
- **Attribute Schema**: `/schema/htmxui.json`
- **Security Policy**: `/docs/SECURITY.md`
