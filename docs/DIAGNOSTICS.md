# 🤖 Machine-Actionable `@diag` Protocol Specification

`@diag` is the universal, machine-readable diagnostic and autonomous self-healing protocol across the Hyperlibs ecosystem (`htmxUI`, `HMLR`, `htmFX`, `.fx`).

---

## 📋 Diagnostic Grammar (.mx Format)

```mx
@diag FX-POLICY-004
  severity: error
  phase: execution
  file: src/agents/deployer.fx
  span: 42:8-42:26
  agent: DeployerAgent
  culprit: git.push(main)
  cause: action denied by Casbin policy
  safe_replacement:
    field: command
    old: git.push(main)
    new: git.push(release-staging)
  confidence: 0.98
  auto_apply: true
  first_seen: 2026-09-12T19:40:00Z
  state: active
  resolution: human_escalation_required
```

---

## 🎯 Diagnostic Fields & Types

| Field | Type | Description |
| :--- | :--- | :--- |
| **`code`** | `string` | Unique error identifier (e.g. `FX-0404`, `FX-POLICY-004`, `HTMXUI-BOLT-001`). |
| **`severity`** | `enum` | `error` \| `warning` \| `info` \| `hint`. |
| **`phase`** | `enum` | `compile` \| `validate` \| `scheduling` \| `execution` \| `runtime`. |
| **`span`** | `string` | Source location in `line:col-line:col` format. |
| **`culprit`** | `string` | The specific property, tool, or AST node that caused the failure. |
| **`cause`** | `string` | Human and machine-readable explanation of why the check failed. |
| **`safe_replacement`** | `object` | Structured replacement delta (if an automated fix is possible). |
| **`confidence`** | `float` | Reliability score ($0.0 \dots 1.0$) of the proposed automated fix. |
| **`auto_apply`** | `boolean` | Whether a supervisor agent is permitted to apply this fix automatically. |

---

## 📤 Output Adapters (SARIF & JSONL)

The runtime supports exporting diagnostics in standard formats:
1. **SARIF 2.1.0** (Static Analysis Results Interchange Format): Natively consumed by VS Code, GitHub Actions, and CI security scanners.
2. **JSON Lines (JSONL)**: High-speed streaming format for autonomous AI agent repair loops.
3. **ANSI Colored Terminal Output**: Instant developer ergonomics in CLI tools (`hx-diag`).
