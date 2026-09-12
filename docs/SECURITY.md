# 🛡️ Security & Hostile-Input Defense Model

`htmxUI` operates on a hypermedia architecture where the server is the single source of truth. This document establishes the formal security rules, Content Security Policy (CSP) guidelines, and injection mitigations.

---

## 🔒 1. Out-of-Band (OOB) HTML Injection Defense

### Threat
If user-generated content (e.g. comments, usernames) is rendered raw into server-streamed HTML without escaping, malicious users could inject `hx-swap-oob="true"` or arbitrary `<script>` tags to overwrite sensitive UI elements (such as navigation bars or form action buttons).

### Defense Mandate
1. **Server-Side Template Escaping**: All server templates (Go `html/template`, Python `Jinja2`, Rust `Askama`, C# `Razor`) MUST HTML-escape user variables by default.
2. **Safe Swap Targets**: `htmxUI` restricts OOB swaps to elements with explicit IDs and warns if an untrusted swap target attempts to replace `document.body` or `document.head`.

---

## 📋 2. Content Security Policy (CSP) Compatibility

`htmxUI` is designed to operate under strict CSP environments **without requiring `'unsafe-inline'` for script execution or `'unsafe-eval'`**.

### Recommended Production CSP Header

```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-rAnd0m123'; style-src 'self' 'unsafe-inline'; connect-src 'self'; img-src 'self' data:; object-src 'none'; frame-ancestors 'none';
```

### JSON-Based State Parsing
`HxBolt` supports declarative JSON state via safe `<script type="application/json" hx-state>` children, avoiding `eval()` and adhering strictly to CSP nonces.

```html
<div hx-state>
  <script type="application/json" hx-state nonce="rAnd0m123">
    {
      "user": "Alice",
      "balance": 1500.0
    }
  </script>
  <span hx-text="user"></span>
</div>
```

---

## 🔑 3. CSRF (Cross-Site Request Forgery) Token Docking

To prevent unauthorized form mutations and state modifications, `htmxUI` automatically docks CSRF tokens from the document `<meta>` tag into all outgoing requests.

```html
<!-- In HTML Header -->
<meta name="csrf-token" content="d83f9a2b8e4c71a0">
```

`htmx` automatically attaches this header to all `hx-post`, `hx-put`, `hx-patch`, and `hx-delete` requests via `X-CSRF-Token` or `HX-Headers`.

---

## 🚫 4. DOM Clobbering Mitigation

`htmxUI` attributes use the standardized `hx-*` prefix and access state through explicit proxy sandboxes (`$store`, `$refs`, `$el`, `$event`) rather than polluting the global `window` object with element IDs.
