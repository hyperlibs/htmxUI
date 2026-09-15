# Security Policy & Enterprise Threat Model

HTMXUI is engineered for high-security, regulated, and bank-grade web applications. This document details our Content Security Policy (CSP) Level 3 architecture, declarative Role-Based Access Control (RBAC) model, memory safety guarantees, and vulnerability reporting procedures.

---

## 1. Strict Zero-`eval` Architecture (CSP Level 3 Compliance)

Unlike legacy reactive libraries that rely on `new Function(...)` or `eval()`, HTMXUI runs in **Strict Zero-Eval mode by default (`strictCSP: true`)**:

```http
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';
```

- **No `unsafe-eval` Required**: HTMXUI executes all reactive attributes (`hx-state`, `hx-action`, `hx-text`, `hx-show`, `hx-class`, `hx-computed`) through a hand-crafted, recursive-descent AST parser.
- **AST Sandboxing**: The parser strictly rejects dangerous global access (`window`, `document`, `globalThis`, `eval`, `Function`, `constructor`, `__proto__`).
- **No Dynamic Compilation**: Expressions and arrow closures (`reduce`, `map`, `filter`) are parsed into safe closure trees and evaluated against isolated proxy scopes.

---

## 2. Bank-Grade Role-Based Access Control (RBAC) & Authorization

HTMXUI provides first-class, client-side authorization directives (`hx-role` and `hx-can`) with reactive signal enforcement:

### Directives Specification
| Directive | Syntax Example | Behavior |
| :--- | :--- | :--- |
| `hx-role` | `hx-role="admin, compliance"` | Hides element (`display: none !important`, `hidden`, `aria-hidden="true"`) if user lacks role. |
| `hx-role.disable` | `hx-role.disable="manager"` | Sets `disabled="true"`, `aria-disabled="true"`, and `pointer-events-none opacity-50`. |
| `hx-role.redact` | `hx-role.redact="executive"` | Masks innerHTML with `[REDACTED — RESTRICTED ACCESS]` and sets `aria-hidden="true"`. |
| `hx-can` | `hx-can="trade:execute & !account:freeze"` | Enforces granular verb/resource permissions with `&` (AND), `\|` (OR), and `!` (NOT). |
| `hx-can.disable` | `hx-can.disable="wire:transfer"` | Disables interactive transfer buttons when permission is lacking. |
| `hx-can.redact` | `hx-can.redact="ssn:view"` | Redacts sensitive PII fields. |

### Defense-in-Depth Principle
> [!IMPORTANT]
> Client-side RBAC directives (`hx-role` / `hx-can`) manage **presentation, UX safety, and accessibility trees**. In accordance with banking security standards (FFIEC, PCI-DSS 4.0, SOC2 Type II), all server-side endpoints must independently validate authorization on incoming hypermedia requests (`HX-Request`).

### Security Audit Telemetry
When an unauthorized element interaction is attempted or blocked:
1. Dispatches `htmx:auth-denied` CustomEvent on `window` and target element with `{ el, required, type, userRoles, userPermissions }`.
2. Emits structured diagnostic records `@diag HTMXUI-AUTH-001` (role violation) and `@diag HTMXUI-AUTH-002` (permission violation) in `diagnosticHistory`.

---

## 3. Server-Driven Security Synchronization

HTMXUI supports hypermedia security synchronization via HTTP headers:
- `HX-Auth-Roles: admin, compliance, trader`
- `HX-Auth-Permissions: trade:execute, account:read, wire:approve`

When these headers are received on any HTMX response, `HxBolt.auth` automatically updates its reactive state, triggering instantaneous DOM-wide re-evaluation of all `hx-role` and `hx-can` elements with zero page reload.

---

## 4. Memory Isolation & TypedArray Safety

- **ColumnStore & SparseMatrix Bounds**: In-memory analytical searches (`HxFlash` ColumnStore) and 2D spreadsheet grids (`SparseMatrix`) operate over explicit `Float64Array` and `Int32Array` buffers with strict index bounds checks, preventing out-of-bounds reads and memory leaks.
- **Microtask Batching**: Signals and DOM mutations are flushed deterministically using `queueMicrotask`, preventing infinite render cycles.

---

## 5. Vulnerability Reporting & Disclosure Policy

We take security vulnerabilities seriously. If you discover a security issue or vulnerability in HTMXUI, please report it privately:

- **Security Team Email**: `security@hypermedia.tools` (or open a private security advisory on GitHub).
- **PGP Key ID**: `4A8E 91B2 C3F0 7D45`
- **Response SLA**:
  - Initial Acknowledgement: **Within 24 hours**
  - Triage & Assessment: **Within 48 hours**
  - Patch Release & Advisory: **Within 7 business days**

Please **do not** report security vulnerabilities via public GitHub issues or public discussions.

---

## 6. Supported Versions

| Version | Status | Security Support |
| :--- | :--- | :--- |
| `1.x` (Latest) | Current | :white_check_mark: Full Support |
| `< 1.0` | Deprecated | :x: End of Life |
