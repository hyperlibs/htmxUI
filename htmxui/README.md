# HTMXUI

Beautiful, accessible, and highly customizable UI components built explicitly for the HTMX ecosystem.

HTMXUI is not an NPM package. It's a collection of HTML, CSS, and hyper-lean vanilla JavaScript extensions that you copy and paste into your own apps. It achieves the visual fidelity of modern React frameworks (like shadcn/ui) while maintaining the zero-bloat, server-driven philosophy of HTMX.

## Features

- **100+ Components**: Everything from Buttons and Dialogs to advanced Layout Primitives, Data Tables, and Interactive Node Canvases.
- **Zero NPM Bloat**: No virtual DOM, no complex build steps for logic. 
- **Framework Agnostic**: Works perfectly with Python (FastAPI/Django), Go, PHP, or Bun. If your backend returns HTML, HTMXUI works.
- **`htmx-bolt.js`**: A microscopic (~2KB) extension providing instant client-side reactivity for ephemeral UI states (like dropdowns and tabs).
- **`htmx-flash.js`**: A 0ms-latency, purely in-memory search algorithm capable of filtering 5,000+ items instantly.
- **`htmx-canvas.js`**: A vanilla JS node-editor engine supporting 2-layer drag-and-drop nesting, grid snapping, and bezier connectors.

## Getting Started

Visit the documentation to browse the components and get installation instructions.

1. Install Tailwind CSS.
2. Include HTMX and `htmx-bolt.js`.
3. Add the base CSS theme variables.
4. Browse and copy components!

## Local Development

To run the documentation and component explorer locally:

```bash
bun install
bun run server.ts
```

Then visit `http://localhost:3000` in your browser.

## Testing

The framework includes a comprehensive Playwright test suite that automatically validates the rendering, reactivity, and resizing behaviors of all 100+ components.

```bash
bun test:ui
```

## License
MIT
