(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __moduleCache = /* @__PURE__ */ new WeakMap;
  var __toCommonJS = (from) => {
    var entry = __moduleCache.get(from), desc;
    if (entry)
      return entry;
    entry = __defProp({}, "__esModule", { value: true });
    if (from && typeof from === "object" || typeof from === "function")
      __getOwnPropNames(from).map((key) => !__hasOwnProp.call(entry, key) && __defProp(entry, key, {
        get: () => from[key],
        enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
      }));
    __moduleCache.set(from, entry);
    return entry;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, {
        get: all[name],
        enumerable: true,
        configurable: true,
        set: (newValue) => all[name] = () => newValue
      });
  };

  // src/htmx-bolt.ts
  var exports_htmx_bolt = {};
  __export(exports_htmx_bolt, {
    unregisterModal: () => unregisterModal,
    undoState: () => undoState,
    streamBatch: () => streamBatch,
    safeExecuteAction: () => safeExecuteAction,
    safeEvaluate: () => safeEvaluate,
    runWithEffect: () => runWithEffect,
    reportError: () => reportError,
    registerModal: () => registerModal,
    redoState: () => redoState,
    recordStateSnapshot: () => recordStateSnapshot,
    playProceduralSound: () => playProceduralSound,
    parseMicroDelta: () => parseMicroDelta,
    initComponent: () => initComponent,
    getDiagnostics: () => getDiagnostics,
    formatDiag: () => formatDiag,
    executeAction: () => executeAction,
    evaluateExpression: () => evaluateExpression,
    diagnosticHistory: () => diagnosticHistory,
    createReactiveObject: () => createReactiveObject,
    config: () => config,
    clearDiagnostics: () => clearDiagnostics,
    applyTransition: () => applyTransition,
    SparseMatrix: () => SparseMatrix,
    SignalTracker: () => SignalTracker,
    HyperFX: () => HyperFX,
    HxSpatial: () => HxSpatial,
    HxBolt: () => HxBolt,
    ERROR_CATALOG: () => ERROR_CATALOG
  });
  var config = {
    strictMode: false,
    strictCSP: false,
    debug: false,
    version: "1.0.0"
  };
  var ERROR_CATALOG = {
    "HTMXUI-BOLT-001": {
      title: 'Invalid JSON syntax in <script type="application/json" hx-state> or hx-state attribute.',
      fix: 'Verify JSON formatting. Ensure all keys and strings use valid double quotes, or use a <script type="application/json" hx-state> child element.'
    },
    "HTMXUI-BOLT-002": {
      title: "Circular dependency or recursion detected in hx-computed property.",
      fix: "Check expressions in hx-computed to ensure property A does not depend directly or indirectly on itself."
    },
    "HTMXUI-BOLT-003": {
      title: "Invalid hx-for syntax.",
      fix: 'Expected format: "item in items" or "(item, index) in items". Ensure hx-for is placed directly on a <template> tag.'
    },
    "HTMXUI-BOLT-004": {
      title: "Referenced undefined property or global store.",
      fix: 'Ensure the property exists in local hx-state or the store was registered via HxBolt.store("name", initialValue).'
    },
    "HTMXUI-BOLT-005": {
      title: "Unrecognized hx-* attribute detected (potential AI hallucination or typo).",
      fix: "Check the attribute spelling against the official HTMXUI schema in /schema/htmxui.json."
    },
    "HTMXUI-BOLT-006": {
      title: "CSP EvalError blocked dynamic evaluation. Automatic fallback engaged.",
      fix: "Set HTMXUI.config.strictCSP = true to bypass new Function completely, or ensure expression matches safe parser grammar."
    },
    "HTMXUI-CALC-001": {
      title: "Cycle or unbounded dependency detected in formula calculation graph.",
      fix: "Review spreadsheet formulas to ensure topological ordering DAG is acyclic without recursive self-references."
    },
    "HTMXUI-FORM-001": {
      title: "Invalid form validation pattern or missing constraint handler.",
      fix: "Verify regex syntax in hx-validate pattern or ensure named custom validator is registered."
    },
    "HTMXUI-VIBE-001": {
      title: "Invalid spring physics parameters (mass, stiffness, damping <= 0).",
      fix: "Ensure stiffness > 0, mass > 0, and damping >= 0 for stable harmonic oscillator convergence."
    },
    "HTMXUI-FLASH-001": {
      title: "IndexedDB or Columnar Store schema synchronization error.",
      fix: "Verify search field descriptors and ensure typed buffer allocations match column types."
    },
    "HTMXUI-A11Y-001": {
      title: "Missing accessible name (aria-label/aria-labelledby) or roving tabindex boundary violation.",
      fix: "Add descriptive aria-label to interactive element or wrap roving children in container with hx-roving."
    },
    "HTMXUI-VIRTUAL-001": {
      title: "Invalid or negative viewport/item dimensions in virtual scroller.",
      fix: "Ensure hx-virtual-height, item height, and container clientHeight are positive non-zero numbers."
    },
    "HTMXUI-GRID-001": {
      title: "Column definition type mismatch or missing accessor in enterprise data grid.",
      fix: "Verify column defs array matches data record keys and column renderer types."
    },
    "HTMXUI-OFFLINE-001": {
      title: "Mutation replay queue persistence or sync conflict.",
      fix: "Inspect IndexedDB mutation queue and ensure server endpoint accepts batch replay schema."
    },
    "HTMXUI-DEVTOOLS-001": {
      title: "DevTools telemetry bridge disconnected or invalid state inspection payload.",
      fix: "Ensure HxDevTools.mount() is active and inspect target element contains valid reactive proxy."
    },
    "HTMXUI-SPATIAL-001": {
      title: "Depth layer overflow or missing 3D transform-style context.",
      fix: "Verify container has perspective and transform-style: preserve-3d configured."
    }
  };
  var diagnosticHistory = [];
  function getDiagnostics() {
    return [...diagnosticHistory];
  }
  function clearDiagnostics() {
    diagnosticHistory.length = 0;
  }
  function formatDiag(code, detail, el = null) {
    const meta = ERROR_CATALOG[code] || { title: "Unknown runtime error", fix: "Consult /schema/htmxui.json" };
    const tag = el ? `<${el.tagName.toLowerCase()}${el.id ? "#" + el.id : ""}${el.className ? "." + el.className.split(" ").slice(0, 2).join(".") : ""}>` : "[Element]";
    return `[@diag ${code}] ${meta.title}
  Target: ${tag}
  Detail: ${detail}
  Fix: ${meta.fix}`;
  }
  function reportError(code, detail, el = null) {
    const meta = ERROR_CATALOG[code] || { title: "Unknown runtime error", fix: "Consult /schema/htmxui.json" };
    const message = formatDiag(code, detail, el);
    const diagRecord = {
      code,
      title: meta.title,
      fix: meta.fix,
      detail,
      target: el ? el.tagName.toLowerCase() : undefined,
      timestamp: Date.now()
    };
    diagnosticHistory.push(diagRecord);
    if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") {
      try {
        window.dispatchEvent(new CustomEvent("htmx:diag", { detail: diagRecord }));
      } catch {}
    }
    if (config.strictMode) {
      throw new Error(message);
    } else {
      console.warn(`%c${message}`, "color: #ef4444; font-weight: bold;", el);
    }
  }
  var KNOWN_ATTRIBUTES = new Set([
    "hx-get",
    "hx-post",
    "hx-put",
    "hx-delete",
    "hx-patch",
    "hx-target",
    "hx-swap",
    "hx-trigger",
    "hx-ext",
    "hx-select",
    "hx-select-oob",
    "hx-indicator",
    "hx-push-url",
    "hx-replace-url",
    "hx-params",
    "hx-headers",
    "hx-vals",
    "hx-vars",
    "hx-include",
    "hx-sync",
    "hx-boost",
    "hx-confirm",
    "hx-disabled-elt",
    "hx-disinherit",
    "hx-encoding",
    "hx-history",
    "hx-history-elt",
    "hx-preserve",
    "hx-prompt",
    "hx-request",
    "hx-ws",
    "hx-sse",
    "hx-state",
    "hx-computed",
    "hx-effect",
    "hx-model",
    "hx-text",
    "hx-html",
    "hx-show",
    "hx-if",
    "hx-for",
    "hx-class",
    "hx-style",
    "hx-ref",
    "hx-action",
    "hx-can",
    "hx-role",
    "hx-modal",
    "hx-undoable",
    "hx-undo",
    "hx-redo",
    "hx-cell",
    "hx-matrix",
    "hx-matrix-cell",
    "hx-stream-batch",
    "hx-virtual-2d",
    "hx-matrix-nav",
    "hx-calc",
    "hx-pinned-left",
    "hx-pinned-right",
    "hx-virtual-row-height",
    "hx-virtual-col-width",
    "hx-transition",
    "hx-transition:enter",
    "hx-transition:enter-start",
    "hx-transition:enter-end",
    "hx-transition:leave",
    "hx-transition:leave-start",
    "hx-transition:leave-end",
    "hx-validate",
    "hx-error-for",
    "hx-optimistic",
    "hx-wizard",
    "hx-step",
    "hx-depends",
    "hx-wizard-next",
    "hx-wizard-prev",
    "hx-wizard-next-text",
    "hx-wizard-submit-text",
    "hx-virtual",
    "hx-virtual-item",
    "hx-virtual-height",
    "hx-virtual-buffer",
    "hx-virtual-src",
    "hx-grid",
    "hx-grid-src",
    "hx-grid-row-height",
    "hx-flash-src",
    "hx-flash-db",
    "hx-flash-search",
    "hx-flash-filter",
    "hx-flash-sort",
    "hx-flash-limit",
    "hx-flash-empty",
    "hx-vibe-flip",
    "hx-vibe-stagger",
    "hx-vibe-view",
    "hx-vibe-initial",
    "hx-vibe-once",
    "hx-motion-flip",
    "hx-motion-stagger",
    "hx-motion-view",
    "hx-motion-initial",
    "hx-motion-once",
    "hx-trap-focus",
    "hx-roving",
    "scaleui",
    "hx-3d",
    "3denv",
    "3datmos",
    "3dfx",
    "hx-spatial",
    "hx-spatial-focus",
    "hx-spatial-explode",
    "hx-sim",
    "hx-sim-count",
    "hx-sim-speed",
    "hx-sim-interactive",
    "hx-sim-trails",
    "hx-sim-theme"
  ]);
  function levenshteinDistance(a, b) {
    if (a.length === 0)
      return b.length;
    if (b.length === 0)
      return a.length;
    const matrix = [];
    for (let i = 0;i <= b.length; i++)
      matrix[i] = [i];
    for (let j = 0;j <= a.length; j++)
      matrix[0][j] = j;
    for (let i = 1;i <= b.length; i++) {
      for (let j = 1;j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1] + 1);
        }
      }
    }
    return matrix[b.length][a.length];
  }
  function checkAttributeTypos(el) {
    if (!el.attributes)
      return;
    for (const attr of Array.from(el.attributes)) {
      const name = attr.name;
      if (name.startsWith("hx-") && !name.startsWith("hx-on:") && !name.startsWith("hx-bind:") && !name.startsWith("hx-model.") && !name.startsWith("hx-action-") && !name.startsWith("hx-msg-") && !name.startsWith("hx-state:") && !name.startsWith("hx-transition:") && !name.startsWith("hx-validate:") && !name.startsWith("hx-stream:") && !name.startsWith("hx-matrix:")) {
        if (!KNOWN_ATTRIBUTES.has(name)) {
          let closest = "";
          let minDistance = 4;
          for (const known of KNOWN_ATTRIBUTES) {
            const dist = levenshteinDistance(name, known);
            if (dist < minDistance) {
              minDistance = dist;
              closest = known;
            }
          }
          const suggestion = closest ? ` Did you mean '${closest}'?` : "";
          reportError("HTMXUI-BOLT-005", `Element has unknown attribute '${name}'.${suggestion}`, el);
        }
      }
    }
  }
  var stores = {};
  var activeEffect = null;
  var effectStack = [];
  var pendingEffects = new Set;
  var isFlushing = false;
  function queueEffect(effect) {
    pendingEffects.add(effect);
    if (!isFlushing) {
      isFlushing = true;
      queueMicrotask(flushEffects);
    }
  }
  function flushEffects() {
    const effectsToRun = Array.from(pendingEffects);
    pendingEffects.clear();
    isFlushing = false;
    for (const effect of effectsToRun) {
      effect();
    }
  }

  class SignalTracker {
    subscribers = new Set;
    depend() {
      if (activeEffect) {
        this.subscribers.add(activeEffect);
      }
    }
    notify() {
      for (const effect of Array.from(this.subscribers)) {
        queueEffect(effect);
      }
    }
  }
  function createReactiveObject(target, rootNotify = null, path = "") {
    if (target === null || typeof target !== "object" || target.__isProxy) {
      return target;
    }
    const signalMap = new Map;
    function getSignal(prop) {
      if (!signalMap.has(prop)) {
        signalMap.set(prop, new SignalTracker);
      }
      return signalMap.get(prop);
    }
    for (const key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        const val = target[key];
        if (typeof val === "object" && val !== null) {
          target[key] = createReactiveObject(val, rootNotify, path ? `${path}.${key}` : key);
        }
      }
    }
    const proxy = new Proxy(target, {
      has(obj, prop) {
        if (prop === Symbol.unscopables)
          return false;
        if (typeof prop === "string") {
          if (prop in obj || Object.prototype.hasOwnProperty.call(obj, prop))
            return true;
          const globals = ["Math", "Date", "JSON", "Number", "String", "Boolean", "Array", "Object", "parseInt", "parseFloat", "isNaN", "isFinite", "console", "window", "document", "event", "$event", "$el", "$eventValue", "$store", "$refs", "$form", "$calc", "$copy", "$toast", "$sound", "$blast", "$focus", "$undo", "$redo", "$exportCSV", "$toggle"];
          if (globals.includes(prop))
            return false;
          return true;
        }
        return prop in obj;
      },
      get(obj, prop, receiver) {
        if (prop === "__isProxy")
          return true;
        if (prop === "__raw")
          return obj;
        if (prop === Symbol.unscopables)
          return;
        if (typeof prop === "string") {
          getSignal(prop).depend();
        }
        return Reflect.get(obj, prop, receiver);
      },
      set(obj, prop, value) {
        const oldVal = obj[prop];
        if (oldVal === value && typeof value !== "object") {
          return true;
        }
        const wrappedVal = typeof value === "object" && value !== null ? createReactiveObject(value, rootNotify, path ? `${path}.${String(prop)}` : String(prop)) : value;
        obj[prop] = wrappedVal;
        if (typeof prop === "string") {
          getSignal(prop).notify();
          recordStateSnapshot(obj);
          if (config.debug) {
            console.log(`[htmx-bolt:debug] ⚡ Signal mutated: "${path ? path + "." : ""}${String(prop)}"`, { oldVal, newVal: value });
          }
          if (rootNotify)
            rootNotify();
        }
        return true;
      },
      deleteProperty(obj, prop) {
        const has = prop in obj;
        const result = Reflect.deleteProperty(obj, prop);
        if (has && typeof prop === "string") {
          getSignal(prop).notify();
          if (rootNotify)
            rootNotify();
        }
        return result;
      }
    });
    return proxy;
  }

  class SparseMatrix {
    rows;
    cols;
    data = new Map;
    signals = new Map;
    cellSubscribers = new Map;
    allSubscribers = new Set;
    constructor(rows = 1e6, cols = 16384, initialData) {
      this.rows = rows;
      this.cols = cols;
      if (initialData) {
        if (Array.isArray(initialData)) {
          for (const [r, c, val] of initialData) {
            this.data.set(`${r}:${c}`, val);
          }
        } else {
          for (const [key, val] of Object.entries(initialData)) {
            this.data.set(key, val);
          }
        }
      }
    }
    getCellSignal(key) {
      let sig = this.signals.get(key);
      if (!sig) {
        sig = new SignalTracker;
        this.signals.set(key, sig);
      }
      return sig;
    }
    get(row, col) {
      const key = `${row}:${col}`;
      this.getCellSignal(key).depend();
      return this.data.get(key);
    }
    set(row, col, value, flashClass) {
      const key = `${row}:${col}`;
      const oldVal = this.data.get(key);
      if (oldVal === value && !flashClass)
        return;
      if (value === undefined || value === null || value === "") {
        this.data.delete(key);
      } else {
        this.data.set(key, value);
      }
      if (this.signals.has(key)) {
        this.signals.get(key).notify();
      }
      const subs = this.cellSubscribers.get(key);
      if (subs) {
        for (const cb of Array.from(subs)) {
          cb(value, flashClass);
        }
      }
      for (const cb of Array.from(this.allSubscribers)) {
        cb(row, col, value, flashClass);
      }
    }
    batch(updates) {
      for (const [r, c, val, flashClass] of updates) {
        this.set(r, c, val, flashClass);
      }
    }
    subscribe(row, col, callback) {
      const key = `${row}:${col}`;
      if (!this.cellSubscribers.has(key)) {
        this.cellSubscribers.set(key, new Set);
      }
      const set = this.cellSubscribers.get(key);
      set.add(callback);
      return () => {
        set.delete(callback);
        if (set.size === 0)
          this.cellSubscribers.delete(key);
      };
    }
    subscribeAll(callback) {
      this.allSubscribers.add(callback);
      return () => this.allSubscribers.delete(callback);
    }
    toObject() {
      const obj = {};
      for (const [k, v] of this.data.entries()) {
        obj[k] = v;
      }
      return obj;
    }
    clear() {
      const keys = Array.from(this.data.keys());
      this.data.clear();
      for (const key of keys) {
        if (this.signals.has(key))
          this.signals.get(key).notify();
        const subs = this.cellSubscribers.get(key);
        if (subs) {
          for (const cb of Array.from(subs))
            cb(undefined);
        }
      }
    }
    size() {
      return this.data.size;
    }
  }
  var matrices = {};
  var streamBatchQueues = new Map;
  var streamBatchRafIds = new Map;
  function streamBatch(callback, fps = 60) {
    const interval = 1000 / fps;
    let queue = streamBatchQueues.get(fps);
    if (!queue) {
      queue = new Set;
      streamBatchQueues.set(fps, queue);
    }
    queue.add(callback);
    if (!streamBatchRafIds.has(fps)) {
      if (typeof requestAnimationFrame !== "undefined" && fps >= 60) {
        const id = requestAnimationFrame(() => {
          streamBatchRafIds.delete(fps);
          const toRun = Array.from(queue);
          queue.clear();
          for (const fn of toRun) {
            try {
              fn();
            } catch (err) {
              console.error("[HxBolt:streamBatch]", err);
            }
          }
        });
        streamBatchRafIds.set(fps, id);
      } else {
        const id = setTimeout(() => {
          streamBatchRafIds.delete(fps);
          const toRun = Array.from(queue);
          queue.clear();
          for (const fn of toRun) {
            try {
              fn();
            } catch (err) {
              console.error("[HxBolt:streamBatch]", err);
            }
          }
        }, interval);
        streamBatchRafIds.set(fps, id);
      }
    }
  }
  function parseMicroDelta(deltaText, targetMatrix) {
    const deltas = [];
    if (!deltaText)
      return deltas;
    const lines = deltaText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    for (const line of lines) {
      let clean = line;
      if (clean.startsWith("Δ") || clean.startsWith("delta:")) {
        clean = clean.replace(/^(Δ|delta:)\s*/, "");
      }
      const parts = clean.split(":");
      if (parts.length >= 3) {
        const row = parseInt(parts[0], 10);
        const col = parseInt(parts[1], 10);
        let val = parts[2];
        if (!isNaN(val) && val !== "") {
          val = Number(val);
        }
        const flashClass = parts[3] || undefined;
        if (!isNaN(row) && !isNaN(col)) {
          deltas.push({ row, col, val, flashClass });
          if (targetMatrix) {
            targetMatrix.set(row, col, val, flashClass);
          }
        }
      }
    }
    return deltas;
  }
  var audioCtx = null;
  function getAudioContext() {
    if (typeof window === "undefined")
      return null;
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass)
        audioCtx = new AudioContextClass;
    }
    return audioCtx;
  }
  function playProceduralSound(name = "click") {
    const ctx = getAudioContext();
    if (!ctx)
      return;
    if (ctx.state === "suspended")
      ctx.resume();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    if (name === "ping") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.15);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (name === "click") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.05);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (name === "whoosh") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.2);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (name === "success") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08);
      osc.frequency.setValueAtTime(783.99, now + 0.16);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (name === "error") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.setValueAtTime(160, now + 0.1);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    }
  }
  var HyperFX = {
    copy(text) {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        return navigator.clipboard.writeText(String(text)).then(() => true).catch(() => false);
      }
      return Promise.resolve(false);
    },
    toast(message, type = "info") {
      if (typeof document !== "undefined") {
        document.body.dispatchEvent(new CustomEvent("htmx:toast", { detail: { message, type } }));
        let container = document.getElementById("htmxui-toast-container");
        if (!container) {
          container = document.createElement("div");
          container.id = "htmxui-toast-container";
          container.className = "fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none";
          document.body.appendChild(container);
        }
        const toastEl = document.createElement("div");
        toastEl.className = "px-4 py-2 rounded-xl text-xs font-medium shadow-2xl transition-all transform translate-y-4 opacity-0 pointer-events-auto flex items-center gap-2 border " + (type === "success" ? "bg-emerald-950 text-emerald-200 border-emerald-800" : type === "error" ? "bg-rose-950 text-rose-200 border-rose-800" : type === "warning" ? "bg-amber-950 text-amber-200 border-amber-800" : "bg-slate-900 text-slate-100 border-slate-800");
        toastEl.innerHTML = `<span>${type === "success" ? "✓" : type === "error" ? "✕" : "ℹ"}</span><span>${message}</span>`;
        container.appendChild(toastEl);
        requestAnimationFrame(() => {
          toastEl.classList.remove("translate-y-4", "opacity-0");
          toastEl.classList.add("translate-y-0", "opacity-100");
        });
        setTimeout(() => {
          toastEl.classList.add("opacity-0", "translate-y-2");
          setTimeout(() => toastEl.remove(), 300);
        }, 3000);
      }
    },
    sound: playProceduralSound,
    blast(el, opts) {
      if (typeof window !== "undefined" && window.HxVibe && window.HxVibe.triggerBlast) {
        window.HxVibe.triggerBlast(el, opts?.radius || 250, opts?.force || 40);
      }
    },
    focus(selector) {
      if (typeof document !== "undefined") {
        const target = document.querySelector(selector);
        if (target)
          target.focus();
      }
    },
    registry: {},
    register(name, fn) {
      const key = name.startsWith("$") ? name : "$" + name;
      HyperFX.registry[key] = fn;
    },
    extend(plugins) {
      Object.entries(plugins).forEach(([name, fn]) => {
        HyperFX.register(name, fn);
      });
    },
    undo: undoState,
    redo: redoState,
    exportCSV(gridSelector, filename) {
      if (typeof document !== "undefined") {
        const gridEl = document.querySelector(gridSelector);
        if (gridEl && gridEl._hxGrid) {
          gridEl._hxGrid.exportCSV(filename);
        }
      }
    },
    sim(selector, action, val) {
      if (typeof window !== "undefined" && window.HxSim) {
        const runner = window.HxSim.getRunner(selector);
        if (runner) {
          if (action === "preset")
            runner.setPreset(val);
          else if (action === "reset")
            runner.reset();
          else if (action === "speed")
            runner.config.speed = Number(val) || 1;
          return runner.getStats();
        }
      }
      return;
    }
  };
  function findTopLevelChar(str, char) {
    let depthParen = 0;
    let depthBrace = 0;
    let depthBracket = 0;
    let inQuote = null;
    for (let i = 0;i < str.length; i++) {
      const ch = str[i];
      if (inQuote) {
        if (ch === inQuote && str[i - 1] !== "\\")
          inQuote = null;
        continue;
      }
      if (ch === '"' || ch === "'" || ch === "`") {
        inQuote = ch;
        continue;
      }
      if (depthParen === 0 && depthBrace === 0 && depthBracket === 0 && ch === char) {
        return i;
      }
      if (ch === "(")
        depthParen++;
      else if (ch === ")")
        depthParen--;
      else if (ch === "{")
        depthBrace++;
      else if (ch === "}")
        depthBrace--;
      else if (ch === "[")
        depthBracket++;
      else if (ch === "]")
        depthBracket--;
    }
    return -1;
  }
  function findMatchingOpenParen(str) {
    if (!str.endsWith(")"))
      return -1;
    let depth = 0;
    let inQuote = null;
    for (let i = str.length - 1;i >= 0; i--) {
      const ch = str[i];
      if (inQuote) {
        if (ch === inQuote && str[i - 1] !== "\\")
          inQuote = null;
        continue;
      }
      if (ch === '"' || ch === "'" || ch === "`") {
        inQuote = ch;
        continue;
      }
      if (ch === ")")
        depth++;
      else if (ch === "(") {
        depth--;
        if (depth === 0)
          return i;
      }
    }
    return -1;
  }
  function findLastTopLevelChar(str, char) {
    let depthParen = 0;
    let depthBrace = 0;
    let depthBracket = 0;
    let inQuote = null;
    let lastIdx = -1;
    for (let i = 0;i < str.length; i++) {
      const ch = str[i];
      if (inQuote) {
        if (ch === inQuote && str[i - 1] !== "\\")
          inQuote = null;
        continue;
      }
      if (ch === '"' || ch === "'" || ch === "`") {
        inQuote = ch;
        continue;
      }
      if (depthParen === 0 && depthBrace === 0 && depthBracket === 0 && ch === char) {
        lastIdx = i;
      }
      if (ch === "(")
        depthParen++;
      else if (ch === ")")
        depthParen--;
      else if (ch === "{")
        depthBrace++;
      else if (ch === "}")
        depthBrace--;
      else if (ch === "[")
        depthBracket++;
      else if (ch === "]")
        depthBracket--;
    }
    return lastIdx;
  }
  function interpolateTemplateLiteral(str, context, extraScope) {
    let result = "";
    let i = 0;
    while (i < str.length) {
      if (str[i] === "$" && str[i + 1] === "{") {
        const start = i + 2;
        let depth = 1;
        let j = start;
        let inQuote = null;
        while (j < str.length && depth > 0) {
          const ch = str[j];
          if (inQuote) {
            if (ch === inQuote && str[j - 1] !== "\\")
              inQuote = null;
          } else if (ch === '"' || ch === "'" || ch === "`") {
            inQuote = ch;
          } else if (ch === "{") {
            depth++;
          } else if (ch === "}") {
            depth--;
          }
          j++;
        }
        const expr = str.slice(start, j - 1);
        const val = safeEvaluate(expr, context, extraScope);
        result += val !== undefined && val !== null ? String(val) : "";
        i = j;
      } else {
        result += str[i];
        i++;
      }
    }
    return result;
  }
  function findTopLevelOperator(str, ops) {
    let depthParen = 0;
    let depthBrace = 0;
    let depthBracket = 0;
    let inQuote = null;
    for (let i = 0;i < str.length; i++) {
      const ch = str[i];
      if (inQuote) {
        if (ch === inQuote && str[i - 1] !== "\\")
          inQuote = null;
        continue;
      }
      if (ch === '"' || ch === "'" || ch === "`") {
        inQuote = ch;
        continue;
      }
      if (depthParen === 0 && depthBrace === 0 && depthBracket === 0) {
        for (const op of ops) {
          if (str.startsWith(op, i)) {
            if (op === "=" && (str.startsWith("==", i) || str.startsWith("===", i) || str.startsWith("=>", i)))
              continue;
            if (op === "!" && (str.startsWith("!=", i) || str.startsWith("!==", i)))
              continue;
            if (op === "<" && (str.startsWith("<=", i) || str.startsWith("<<", i)))
              continue;
            if (op === ">" && (str.startsWith(">=", i) || str.startsWith(">>", i)))
              continue;
            if (op === "+" && str.startsWith("++", i))
              continue;
            if (op === "-" && str.startsWith("--", i))
              continue;
            if (op === "&" && str.startsWith("&&", i))
              continue;
            if (op === "|" && str.startsWith("||", i))
              continue;
            return { op, index: i };
          }
        }
      }
      if (ch === "(")
        depthParen++;
      else if (ch === ")")
        depthParen--;
      else if (ch === "{")
        depthBrace++;
      else if (ch === "}")
        depthBrace--;
      else if (ch === "[")
        depthBracket++;
      else if (ch === "]")
        depthBracket--;
    }
    return null;
  }
  function splitArguments(argsStr) {
    const result = [];
    let depthParen = 0;
    let depthBrace = 0;
    let depthBracket = 0;
    let inQuote = null;
    let current = "";
    for (let i = 0;i < argsStr.length; i++) {
      const ch = argsStr[i];
      if (inQuote) {
        current += ch;
        if (ch === inQuote && argsStr[i - 1] !== "\\")
          inQuote = null;
        continue;
      }
      if (ch === '"' || ch === "'" || ch === "`") {
        inQuote = ch;
        current += ch;
        continue;
      }
      if (ch === "," && depthParen === 0 && depthBrace === 0 && depthBracket === 0) {
        result.push(current.trim());
        current = "";
        continue;
      }
      if (ch === "(")
        depthParen++;
      else if (ch === ")")
        depthParen--;
      else if (ch === "{")
        depthBrace++;
      else if (ch === "}")
        depthBrace--;
      else if (ch === "[")
        depthBracket++;
      else if (ch === "]")
        depthBracket--;
      current += ch;
    }
    if (current.trim())
      result.push(current.trim());
    return result;
  }
  function getNestedProperty(obj, path) {
    if (!obj)
      return;
    const tokens = path.replace(/\[['"]?([^\]'"]+)['"]?\]/g, ".$1").replace(/^\./, "").split(".");
    let curr = obj;
    for (const token of tokens) {
      if (curr === null || curr === undefined)
        return;
      curr = curr[token];
    }
    return curr;
  }
  function setNestedProperty(obj, path, value) {
    if (!obj)
      return;
    const tokens = path.replace(/\[['"]?([^\]'"]+)['"]?\]/g, ".$1").replace(/^\./, "").split(".");
    let curr = obj;
    for (let i = 0;i < tokens.length - 1; i++) {
      const token = tokens[i];
      if (!(token in curr) || curr[token] === null || typeof curr[token] !== "object") {
        curr[token] = {};
      }
      curr = curr[token];
    }
    curr[tokens[tokens.length - 1]] = value;
  }
  function safeEvaluate(expr, context, extraScope = {}) {
    if (!expr || typeof expr !== "string")
      return;
    const trimmed = expr.trim();
    if (!trimmed)
      return;
    const ctx = context && typeof context === "object" ? context : {};
    const scope = { ...ctx, ...extraScope };
    const qIdx = findTopLevelChar(trimmed, "?");
    if (qIdx !== -1) {
      const colonIdx = findTopLevelChar(trimmed.slice(qIdx + 1), ":");
      if (colonIdx !== -1) {
        const condStr = trimmed.slice(0, qIdx).trim();
        const trueStr = trimmed.slice(qIdx + 1, qIdx + 1 + colonIdx).trim();
        const falseStr = trimmed.slice(qIdx + 1 + colonIdx + 1).trim();
        const condVal = safeEvaluate(condStr, context, extraScope);
        return condVal ? safeEvaluate(trueStr, context, extraScope) : safeEvaluate(falseStr, context, extraScope);
      }
    }
    const arrowMatch = findTopLevelOperator(trimmed, ["=>"]);
    if (arrowMatch) {
      const rawParams = trimmed.slice(0, arrowMatch.index).trim();
      const rawBody = trimmed.slice(arrowMatch.index + 2).trim();
      let cleanParamsStr = rawParams;
      if (cleanParamsStr.startsWith("(") && cleanParamsStr.endsWith(")")) {
        cleanParamsStr = cleanParamsStr.slice(1, -1).trim();
      }
      const paramNames = cleanParamsStr ? cleanParamsStr.split(",").map((p) => p.trim()) : [];
      let bodyExpr = rawBody;
      if (bodyExpr.startsWith("{") && bodyExpr.endsWith("}")) {
        const innerBody = bodyExpr.slice(1, -1).trim();
        if (innerBody.startsWith("return ")) {
          bodyExpr = innerBody.slice(7).replace(/;$/, "").trim();
        } else {
          bodyExpr = innerBody.replace(/;$/, "").trim();
        }
      }
      return (...args) => {
        const callScope = { ...extraScope };
        paramNames.forEach((name, idx) => {
          if (name)
            callScope[name] = args[idx];
        });
        return safeEvaluate(bodyExpr, context, callScope);
      };
    }
    const firstPipe = findTopLevelOperator(trimmed, ["|>"]);
    if (firstPipe) {
      const segments = [];
      let curr = trimmed;
      let match = findTopLevelOperator(curr, ["|>"]);
      while (match) {
        segments.push(curr.slice(0, match.index).trim());
        curr = curr.slice(match.index + 2).trim();
        match = findTopLevelOperator(curr, ["|>"]);
      }
      segments.push(curr.trim());
      let val = safeEvaluate(segments[0], context, extraScope);
      for (let i = 1;i < segments.length; i++) {
        const seg = segments[i];
        if (seg.endsWith(")") && seg.includes("(")) {
          const openIdx = findMatchingOpenParen(seg);
          if (openIdx !== -1) {
            const fnTarget = safeEvaluate(seg.slice(0, openIdx), context, extraScope);
            const innerArgs = splitArguments(seg.slice(openIdx + 1, -1)).map((a) => safeEvaluate(a, context, extraScope));
            if (typeof fnTarget === "function") {
              val = fnTarget(val, ...innerArgs);
              continue;
            }
          }
        }
        const fn = safeEvaluate(seg, context, extraScope);
        if (typeof fn === "function") {
          val = fn(val);
        }
      }
      return val;
    }
    const orMatch = findTopLevelOperator(trimmed, ["||", "??"]);
    if (orMatch) {
      const left = safeEvaluate(trimmed.slice(0, orMatch.index), context, extraScope);
      const rightStr = trimmed.slice(orMatch.index + orMatch.op.length);
      if (orMatch.op === "||") {
        return left || safeEvaluate(rightStr, context, extraScope);
      } else {
        return left ?? safeEvaluate(rightStr, context, extraScope);
      }
    }
    const andMatch = findTopLevelOperator(trimmed, ["&&"]);
    if (andMatch) {
      const left = safeEvaluate(trimmed.slice(0, andMatch.index), context, extraScope);
      if (!left)
        return left;
      return safeEvaluate(trimmed.slice(andMatch.index + andMatch.op.length), context, extraScope);
    }
    const compMatch = findTopLevelOperator(trimmed, ["===", "!==", "==", "!=", "<=", ">=", "<", ">"]);
    if (compMatch) {
      const left = safeEvaluate(trimmed.slice(0, compMatch.index), context, extraScope);
      const right = safeEvaluate(trimmed.slice(compMatch.index + compMatch.op.length), context, extraScope);
      switch (compMatch.op) {
        case "===":
          return left === right;
        case "!==":
          return left !== right;
        case "==":
          return left == right;
        case "!=":
          return left != right;
        case "<=":
          return left <= right;
        case ">=":
          return left >= right;
        case "<":
          return left < right;
        case ">":
          return left > right;
      }
    }
    const addSubMatch = findTopLevelOperator(trimmed, ["+", "-"]);
    if (addSubMatch && addSubMatch.index > 0) {
      const left = safeEvaluate(trimmed.slice(0, addSubMatch.index), context, extraScope);
      const right = safeEvaluate(trimmed.slice(addSubMatch.index + addSubMatch.op.length), context, extraScope);
      return addSubMatch.op === "+" ? left + right : left - right;
    }
    const mulDivMatch = findTopLevelOperator(trimmed, ["*", "/", "%"]);
    if (mulDivMatch) {
      const left = safeEvaluate(trimmed.slice(0, mulDivMatch.index), context, extraScope);
      const right = safeEvaluate(trimmed.slice(mulDivMatch.index + mulDivMatch.op.length), context, extraScope);
      if (mulDivMatch.op === "*")
        return left * right;
      if (mulDivMatch.op === "/")
        return left / right;
      if (mulDivMatch.op === "%")
        return left % right;
    }
    if (trimmed.startsWith("!")) {
      return !safeEvaluate(trimmed.slice(1), context, extraScope);
    }
    if (trimmed.startsWith("+") && isNaN(Number(trimmed))) {
      return +safeEvaluate(trimmed.slice(1), context, extraScope);
    }
    if (trimmed.startsWith("-") && isNaN(Number(trimmed))) {
      return -safeEvaluate(trimmed.slice(1), context, extraScope);
    }
    if (trimmed.startsWith("(") && trimmed.endsWith(")")) {
      let d = 0;
      let valid = true;
      for (let i = 0;i < trimmed.length - 1; i++) {
        if (trimmed[i] === "(")
          d++;
        else if (trimmed[i] === ")")
          d--;
        if (d === 0) {
          valid = false;
          break;
        }
      }
      if (valid) {
        return safeEvaluate(trimmed.slice(1, -1), context, extraScope);
      }
    }
    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
      const inner = trimmed.slice(1, -1).trim();
      if (!inner)
        return {};
      const entries = splitArguments(inner);
      const result = {};
      for (const entry of entries) {
        const colonIdx = findTopLevelChar(entry, ":");
        if (colonIdx !== -1) {
          let key = entry.slice(0, colonIdx).trim();
          if (key.startsWith("'") && key.endsWith("'") || key.startsWith('"') && key.endsWith('"')) {
            key = key.slice(1, -1);
          }
          const valExpr = entry.slice(colonIdx + 1).trim();
          result[key] = safeEvaluate(valExpr, context, extraScope);
        }
      }
      return result;
    }
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      const inner = trimmed.slice(1, -1).trim();
      if (!inner)
        return [];
      return splitArguments(inner).map((arg) => safeEvaluate(arg, context, extraScope));
    }
    if (trimmed.startsWith("`") && trimmed.endsWith("`")) {
      const inner = trimmed.slice(1, -1);
      return interpolateTemplateLiteral(inner, context, extraScope);
    }
    if (trimmed.startsWith("'") && trimmed.endsWith("'") || trimmed.startsWith('"') && trimmed.endsWith('"')) {
      return trimmed.slice(1, -1);
    }
    if (!isNaN(Number(trimmed))) {
      return Number(trimmed);
    }
    if (trimmed === "true")
      return true;
    if (trimmed === "false")
      return false;
    if (trimmed === "null")
      return null;
    if (trimmed === "undefined")
      return;
    if (trimmed.endsWith(")")) {
      const openParenIdx = findMatchingOpenParen(trimmed);
      if (openParenIdx !== -1) {
        const calleeStr = trimmed.slice(0, openParenIdx).trim();
        const argsStr = trimmed.slice(openParenIdx + 1, -1).trim();
        const args = argsStr ? splitArguments(argsStr).map((arg) => safeEvaluate(arg, context, extraScope)) : [];
        let fn;
        let fnThis = ctx;
        if (calleeStr.includes(".")) {
          const lastDot = calleeStr.lastIndexOf(".");
          const parentPath = calleeStr.slice(0, lastDot);
          const method = calleeStr.slice(lastDot + 1);
          const parentVal = safeEvaluate(parentPath, context, extraScope);
          if (parentVal && typeof parentVal[method] === "function") {
            fn = parentVal[method];
            fnThis = parentVal;
          }
        } else {
          if (calleeStr in extraScope && typeof extraScope[calleeStr] === "function") {
            fn = extraScope[calleeStr];
            fnThis = extraScope;
          } else if (calleeStr in ctx && typeof ctx[calleeStr] === "function") {
            fn = ctx[calleeStr];
            fnThis = ctx;
          } else if (typeof globalThis[calleeStr] === "function") {
            fn = globalThis[calleeStr];
            fnThis = globalThis;
          }
        }
        if (typeof fn === "function") {
          return fn.apply(fnThis, args);
        }
      }
    }
    const lastDotIdx = findLastTopLevelChar(trimmed, ".");
    if (lastDotIdx > 0) {
      const leftExpr = trimmed.slice(0, lastDotIdx).trim();
      const rightProp = trimmed.slice(lastDotIdx + 1).trim();
      if (leftExpr.endsWith(")") || leftExpr.endsWith("]") || leftExpr.endsWith("}")) {
        const leftVal = safeEvaluate(leftExpr, context, extraScope);
        if (leftVal !== undefined && leftVal !== null) {
          return leftVal[rightProp];
        }
      }
    }
    if (trimmed in extraScope)
      return extraScope[trimmed];
    if (trimmed in ctx)
      return ctx[trimmed];
    const nestedVal = getNestedProperty(scope, trimmed);
    if (nestedVal !== undefined)
      return nestedVal;
    if (trimmed in globalThis)
      return globalThis[trimmed];
    return;
  }
  function safeExecuteAction(expr, context, extraScope = {}) {
    if (!expr || typeof expr !== "string")
      return;
    const ctx = context && typeof context === "object" ? context : {};
    const statements = [];
    let depthParen = 0;
    let depthBrace = 0;
    let depthBracket = 0;
    let inQuote = null;
    let current = "";
    for (let i = 0;i < expr.length; i++) {
      const ch = expr[i];
      if (inQuote) {
        current += ch;
        if (ch === inQuote && expr[i - 1] !== "\\")
          inQuote = null;
        continue;
      }
      if (ch === '"' || ch === "'" || ch === "`") {
        inQuote = ch;
        current += ch;
        continue;
      }
      if (ch === ";" && depthParen === 0 && depthBrace === 0 && depthBracket === 0) {
        if (current.trim())
          statements.push(current.trim());
        current = "";
        continue;
      }
      if (ch === "(")
        depthParen++;
      else if (ch === ")")
        depthParen--;
      else if (ch === "{")
        depthBrace++;
      else if (ch === "}")
        depthBrace--;
      else if (ch === "[")
        depthBracket++;
      else if (ch === "]")
        depthBracket--;
      current += ch;
    }
    if (current.trim())
      statements.push(current.trim());
    let lastResult = undefined;
    for (const stmt of statements) {
      const trimmed = stmt.trim();
      if (!trimmed)
        continue;
      if (trimmed.endsWith("++")) {
        const target = trimmed.slice(0, -2).trim();
        const val = safeEvaluate(target, ctx, extraScope);
        setNestedProperty(ctx, target, (Number(val) || 0) + 1);
        lastResult = (Number(val) || 0) + 1;
        continue;
      }
      if (trimmed.endsWith("--")) {
        const target = trimmed.slice(0, -2).trim();
        const val = safeEvaluate(target, ctx, extraScope);
        setNestedProperty(ctx, target, (Number(val) || 0) - 1);
        lastResult = (Number(val) || 0) - 1;
        continue;
      }
      if (trimmed.startsWith("++")) {
        const target = trimmed.slice(2).trim();
        const val = safeEvaluate(target, ctx, extraScope);
        setNestedProperty(ctx, target, (Number(val) || 0) + 1);
        lastResult = (Number(val) || 0) + 1;
        continue;
      }
      if (trimmed.startsWith("--")) {
        const target = trimmed.slice(2).trim();
        const val = safeEvaluate(target, ctx, extraScope);
        setNestedProperty(ctx, target, (Number(val) || 0) - 1);
        lastResult = (Number(val) || 0) - 1;
        continue;
      }
      const compoundMatch = findTopLevelOperator(trimmed, ["+=", "-=", "*=", "/="]);
      if (compoundMatch) {
        const target = trimmed.slice(0, compoundMatch.index).trim();
        const rightVal = safeEvaluate(trimmed.slice(compoundMatch.index + compoundMatch.op.length), ctx, extraScope);
        const leftVal = safeEvaluate(target, ctx, extraScope);
        let newVal = leftVal;
        if (compoundMatch.op === "+=")
          newVal = leftVal + rightVal;
        else if (compoundMatch.op === "-=")
          newVal = leftVal - rightVal;
        else if (compoundMatch.op === "*=")
          newVal = leftVal * rightVal;
        else if (compoundMatch.op === "/=")
          newVal = leftVal / rightVal;
        setNestedProperty(ctx, target, newVal);
        lastResult = newVal;
        continue;
      }
      const assignMatch = findTopLevelOperator(trimmed, ["="]);
      if (assignMatch) {
        const target = trimmed.slice(0, assignMatch.index).trim();
        const rightVal = safeEvaluate(trimmed.slice(assignMatch.index + 1), ctx, extraScope);
        setNestedProperty(ctx, target, rightVal);
        lastResult = rightVal;
        continue;
      }
      lastResult = safeEvaluate(trimmed, ctx, extraScope);
    }
    return lastResult;
  }
  function evaluateExpression(expr, context, extraScope = {}) {
    if (!expr || typeof expr !== "string")
      return;
    const ctx = context && typeof context === "object" ? context : {};
    const fxScope = {
      $store: stores,
      $refs: ctx.__refs || {},
      $el: extraScope.$el || null,
      $event: extraScope.$event || null,
      $eventValue: extraScope.$eventValue,
      $form: ctx.$form || {},
      $copy: HyperFX.copy,
      $toast: HyperFX.toast,
      $sound: HyperFX.sound,
      $blast: (opts) => HyperFX.blast(extraScope.$el, opts),
      $focus: HyperFX.focus,
      $undo: HyperFX.undo,
      $redo: HyperFX.redo,
      $exportCSV: HyperFX.exportCSV,
      $sim: HyperFX.sim,
      $toggle: (key) => {
        if (ctx)
          ctx[key] = !ctx[key];
      },
      ...HyperFX.registry,
      ...extraScope
    };
    try {
      const res = safeEvaluate(expr, ctx, fxScope);
      if (res !== undefined || config.strictCSP) {
        return res;
      }
    } catch (safeErr) {
      if (config.strictCSP) {
        reportError("HTMXUI-BOLT-006", `Zero-eval evaluation error: ${safeErr.message}`, extraScope.$el);
        return;
      }
    }
    if (config.strictCSP) {
      return safeEvaluate(expr, ctx, fxScope);
    }
    const scopeKeys = Object.keys(fxScope);
    const scopeValues = Object.values(fxScope);
    const trimmed = expr.trim();
    try {
      const fn = new Function(...scopeKeys, `with(this) { return (${trimmed}); }`);
      return fn.apply(ctx, scopeValues);
    } catch (e) {
      try {
        const fn = new Function(...scopeKeys, `with(this) { ${expr}; }`);
        return fn.apply(ctx, scopeValues);
      } catch (err) {
        if (config.debug) {
          console.warn(`[htmx-bolt] Evaluation fallback error in "${expr}":`, err.message);
        }
        return;
      }
    }
  }
  function executeAction(expr, context, extraScope = {}) {
    if (!expr || typeof expr !== "string")
      return;
    const ctx = context && typeof context === "object" ? context : {};
    const fxScope = {
      $store: stores,
      $refs: ctx.__refs || {},
      $el: extraScope.$el || null,
      $event: extraScope.$event || null,
      $eventValue: extraScope.$eventValue,
      $form: ctx.$form || {},
      $copy: HyperFX.copy,
      $toast: HyperFX.toast,
      $sound: HyperFX.sound,
      $blast: (opts) => HyperFX.blast(extraScope.$el, opts),
      $focus: HyperFX.focus,
      $undo: HyperFX.undo,
      $redo: HyperFX.redo,
      $exportCSV: HyperFX.exportCSV,
      $sim: HyperFX.sim,
      $toggle: (key) => {
        if (ctx)
          ctx[key] = !ctx[key];
      },
      ...HyperFX.registry,
      ...extraScope
    };
    try {
      return safeExecuteAction(expr, ctx, fxScope);
    } catch (safeErr) {
      if (config.strictCSP) {
        reportError("HTMXUI-BOLT-006", `Zero-eval action error: ${safeErr.message}`, extraScope.$el);
        return;
      }
    }
    if (config.strictCSP) {
      return safeExecuteAction(expr, ctx, fxScope);
    }
    const scopeKeys = Object.keys(fxScope);
    const scopeValues = Object.values(fxScope);
    try {
      const fn = new Function(...scopeKeys, `with(this) { ${expr}; }`);
      return fn.apply(ctx, scopeValues);
    } catch (err) {
      reportError("HTMXUI-BOLT-004", `Action execution error in "${expr}": ${err.message}`, extraScope.$el);
    }
  }
  function runWithEffect(effectFn) {
    const effect = () => {
      effectStack.push(effect);
      activeEffect = effect;
      try {
        effectFn();
      } finally {
        effectStack.pop();
        activeEffect = effectStack[effectStack.length - 1] || null;
      }
    };
    effect();
    return effect;
  }
  function applyTransition(el, stage, type = "enter") {
    const transitionPreset = el.getAttribute("hx-transition");
    const enterClass = el.getAttribute("hx-transition:enter") || "";
    const enterStart = el.getAttribute("hx-transition:enter-start") || "";
    const enterEnd = el.getAttribute("hx-transition:enter-end") || "";
    const leaveClass = el.getAttribute("hx-transition:leave") || "";
    const leaveStart = el.getAttribute("hx-transition:leave-start") || "";
    const leaveEnd = el.getAttribute("hx-transition:leave-end") || "";
    if (transitionPreset) {
      const presets = {
        fade: {
          enter: "transition-opacity duration-200",
          enterStart: "opacity-0",
          enterEnd: "opacity-100",
          leave: "transition-opacity duration-150",
          leaveStart: "opacity-100",
          leaveEnd: "opacity-0"
        },
        slide: {
          enter: "transition-all duration-200 ease-out",
          enterStart: "opacity-0 -translate-y-2",
          enterEnd: "opacity-100 translate-y-0",
          leave: "transition-all duration-150 ease-in",
          leaveStart: "opacity-100 translate-y-0",
          leaveEnd: "opacity-0 -translate-y-2"
        },
        scale: {
          enter: "transition-all duration-200 ease-out",
          enterStart: "opacity-0 scale-95",
          enterEnd: "opacity-100 scale-100",
          leave: "transition-all duration-150 ease-in",
          leaveStart: "opacity-100 scale-100",
          leaveEnd: "opacity-0 scale-95"
        }
      };
      const p = presets[transitionPreset] || presets.fade;
      if (type === "enter") {
        runCssTransition(el, p.enter, p.enterStart, p.enterEnd);
      } else {
        return runCssTransition(el, p.leave, p.leaveStart, p.leaveEnd);
      }
      return Promise.resolve();
    }
    if (enterClass || leaveClass) {
      if (type === "enter") {
        runCssTransition(el, enterClass, enterStart, enterEnd);
      } else {
        return runCssTransition(el, leaveClass, leaveStart, leaveEnd);
      }
    }
    return Promise.resolve();
  }
  function runCssTransition(el, baseClasses, startClasses, endClasses) {
    return new Promise((resolve) => {
      const addList = (str) => str.split(/\s+/).filter(Boolean);
      const base = addList(baseClasses);
      const start = addList(startClasses);
      const end = addList(endClasses);
      el.classList.add(...base, ...start);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.classList.remove(...start);
          el.classList.add(...end);
          const onEnd = () => {
            el.removeEventListener("transitionend", onEnd);
            el.classList.remove(...base);
            resolve();
          };
          el.addEventListener("transitionend", onEnd, { once: true });
          setTimeout(onEnd, 400);
        });
      });
    });
  }
  var elementStates = new WeakMap;
  function initComponent(rootEl) {
    if (elementStates.has(rootEl))
      return elementStates.get(rootEl);
    checkAttributeTypos(rootEl);
    let initialData = {};
    const stateScript = rootEl.querySelector(':scope > script[type="application/json"][hx-state], :scope > script[type="text/hx-state"], :scope > script[hx-state]');
    if (stateScript && stateScript.textContent) {
      try {
        initialData = JSON.parse(stateScript.textContent.trim());
      } catch (e) {
        try {
          initialData = new Function(`return (${stateScript.textContent.trim()})`)();
        } catch (err) {
          reportError("HTMXUI-BOLT-001", `Failed to parse <script hx-state> content: ${err.message}`, rootEl);
        }
      }
    } else {
      const stateAttr = rootEl.getAttribute("hx-state");
      if (stateAttr) {
        try {
          initialData = new Function(`return (${stateAttr})`)();
        } catch (e) {
          reportError("HTMXUI-BOLT-001", `Invalid hx-state attribute expression: ${stateAttr}`, rootEl);
        }
      }
    }
    const refs = {};
    initialData.__refs = refs;
    rootEl.querySelectorAll("[hx-ref]").forEach((el) => {
      const refName = el.getAttribute("hx-ref");
      if (refName)
        refs[refName] = el;
    });
    const reactiveState = createReactiveObject(initialData);
    elementStates.set(rootEl, reactiveState);
    const computedAttr = rootEl.getAttribute("hx-computed");
    if (computedAttr) {
      try {
        const computedDef = new Function(`return (${computedAttr})`)();
        for (const [key, expr] of Object.entries(computedDef)) {
          runWithEffect(() => {
            const val = evaluateExpression(expr, reactiveState, { $el: rootEl });
            reactiveState[key] = val;
          });
        }
      } catch (e) {
        reportError("HTMXUI-BOLT-002", `Invalid hx-computed definition: ${computedAttr}`, rootEl);
      }
    }
    rootEl.querySelectorAll("[hx-effect]").forEach((el) => {
      const expr = el.getAttribute("hx-effect");
      runWithEffect(() => {
        evaluateExpression(expr, reactiveState, { $el: el });
      });
    });
    bindDirectives(rootEl, reactiveState);
    bindEvents(rootEl, reactiveState);
    processStructuralDirectives(rootEl, reactiveState);
    return reactiveState;
  }
  function processStructuralDirectives(rootEl, state) {
    const ifTemplates = Array.from(rootEl.querySelectorAll("template[hx-if], [hx-if]"));
    ifTemplates.forEach((el) => {
      if (el._hxIfProcessed)
        return;
      el._hxIfProcessed = true;
      checkAttributeTypos(el);
      const expr = el.getAttribute("hx-if");
      const isTemplate = el.tagName === "TEMPLATE";
      const anchor = document.createComment(`hx-if: ${expr}`);
      el.parentNode?.insertBefore(anchor, el);
      let renderedEl = isTemplate ? null : el;
      if (isTemplate)
        el.remove();
      runWithEffect(() => {
        const condition = Boolean(evaluateExpression(expr, state, { $el: el }));
        if (condition) {
          if (!renderedEl) {
            renderedEl = isTemplate ? el.content.firstElementChild?.cloneNode(true) : el;
            if (renderedEl && anchor.parentNode) {
              anchor.parentNode.insertBefore(renderedEl, anchor.nextSibling);
              bindDirectives(renderedEl, state);
              bindEvents(renderedEl, state);
              applyTransition(renderedEl, "enter");
            }
          } else {
            renderedEl.style.display = "";
          }
        } else {
          if (renderedEl) {
            applyTransition(renderedEl, "leave").then(() => {
              if (isTemplate && renderedEl && renderedEl.parentNode) {
                renderedEl.parentNode.removeChild(renderedEl);
                renderedEl = null;
              } else if (renderedEl) {
                renderedEl.style.display = "none";
              }
            });
          }
        }
      });
    });
    const forTemplates = Array.from(rootEl.querySelectorAll("template[hx-for]"));
    forTemplates.forEach((template) => {
      if (template._hxForProcessed)
        return;
      template._hxForProcessed = true;
      checkAttributeTypos(template);
      const forExpr = template.getAttribute("hx-for");
      const match = forExpr.match(/^\s*(?:\(?\s*(\w+)\s*(?:,\s*(\w+))?\s*\)?)\s+in\s+(.+)\s*$/);
      if (!match) {
        reportError("HTMXUI-BOLT-003", `Invalid hx-for expression "${forExpr}". Must be "item in items" or "(item, idx) in items".`, template);
        return;
      }
      const itemVar = match[1];
      const indexVar = match[2] || "_idx";
      const listExpr = match[3];
      const anchor = document.createComment(`hx-for: ${forExpr}`);
      template.parentNode?.insertBefore(anchor, template);
      template.remove();
      let currentNodes = [];
      runWithEffect(() => {
        const list = evaluateExpression(listExpr, state, { $el: template }) || [];
        const items = Array.isArray(list) ? list : Object.entries(list);
        currentNodes.forEach((node) => {
          if (node.parentNode)
            node.parentNode.removeChild(node);
        });
        currentNodes = [];
        items.forEach((item, index) => {
          const clone = template.content.cloneNode(true);
          const itemScope = {
            [itemVar]: item,
            [indexVar]: index
          };
          const scopedState = new Proxy(state, {
            has(target, prop) {
              if (prop === Symbol.unscopables)
                return false;
              if (typeof prop === "string" && prop in itemScope)
                return true;
              return Reflect.has(target, prop);
            },
            get(target, prop, receiver) {
              if (typeof prop === "string" && prop in itemScope)
                return itemScope[prop];
              return Reflect.get(target, prop, receiver);
            },
            set(target, prop, value, receiver) {
              if (typeof prop === "string" && prop in itemScope) {
                itemScope[prop] = value;
                return true;
              }
              return Reflect.set(target, prop, value, receiver);
            }
          });
          const insertedNodes = Array.from(clone.childNodes);
          anchor.parentNode?.insertBefore(clone, anchor);
          currentNodes.push(...insertedNodes);
          insertedNodes.forEach((node) => {
            if (node.nodeType === 1) {
              bindDirectives(node, scopedState);
              bindEvents(node, scopedState);
            }
          });
        });
      });
    });
  }
  function bindDirectives(rootEl, state) {
    const textEls = Array.from(rootEl.querySelectorAll ? rootEl.querySelectorAll("[hx-text]") : []);
    if (rootEl.hasAttribute && rootEl.hasAttribute("hx-text"))
      textEls.unshift(rootEl);
    textEls.forEach((el) => {
      if (el._hxTextBound)
        return;
      el._hxTextBound = true;
      checkAttributeTypos(el);
      const expr = el.getAttribute("hx-text");
      runWithEffect(() => {
        const val = evaluateExpression(expr, state, { $el: el });
        el.textContent = val !== undefined && val !== null ? String(val) : "";
      });
    });
    const htmlEls = Array.from(rootEl.querySelectorAll ? rootEl.querySelectorAll("[hx-html]") : []);
    if (rootEl.hasAttribute && rootEl.hasAttribute("hx-html"))
      htmlEls.unshift(rootEl);
    htmlEls.forEach((el) => {
      if (el._hxHtmlBound)
        return;
      el._hxHtmlBound = true;
      checkAttributeTypos(el);
      const expr = el.getAttribute("hx-html");
      runWithEffect(() => {
        const val = evaluateExpression(expr, state, { $el: el });
        el.innerHTML = val !== undefined && val !== null ? String(val) : "";
      });
    });
    const showEls = Array.from(rootEl.querySelectorAll ? rootEl.querySelectorAll("[hx-show]") : []);
    if (rootEl.hasAttribute && rootEl.hasAttribute("hx-show"))
      showEls.unshift(rootEl);
    showEls.forEach((el) => {
      if (el._hxShowBound)
        return;
      el._hxShowBound = true;
      checkAttributeTypos(el);
      const expr = el.getAttribute("hx-show");
      runWithEffect(() => {
        const isShown = Boolean(evaluateExpression(expr, state, { $el: el }));
        if (isShown) {
          el.style.display = "";
          applyTransition(el, "enter");
        } else {
          applyTransition(el, "leave").then(() => {
            el.style.display = "none";
          });
        }
      });
    });
    const classEls = Array.from(rootEl.querySelectorAll ? rootEl.querySelectorAll("[hx-class]") : []);
    if (rootEl.hasAttribute && rootEl.hasAttribute("hx-class"))
      classEls.unshift(rootEl);
    classEls.forEach((el) => {
      if (el._hxClassBound)
        return;
      el._hxClassBound = true;
      checkAttributeTypos(el);
      const expr = el.getAttribute("hx-class");
      runWithEffect(() => {
        const res = evaluateExpression(expr, state, { $el: el });
        if (typeof res === "object" && res !== null) {
          for (const [className, condition] of Object.entries(res)) {
            const classList = className.split(/\s+/).filter(Boolean);
            if (condition) {
              el.classList.add(...classList);
            } else {
              el.classList.remove(...classList);
            }
          }
        } else if (typeof res === "string") {
          if (el._prevDynamicClass) {
            el.classList.remove(...el._prevDynamicClass.split(/\s+/).filter(Boolean));
          }
          el._prevDynamicClass = res;
          el.classList.add(...res.split(/\s+/).filter(Boolean));
        }
      });
    });
    const styleEls = Array.from(rootEl.querySelectorAll ? rootEl.querySelectorAll("[hx-style]") : []);
    if (rootEl.hasAttribute && rootEl.hasAttribute("hx-style"))
      styleEls.unshift(rootEl);
    styleEls.forEach((el) => {
      if (el._hxStyleBound)
        return;
      el._hxStyleBound = true;
      checkAttributeTypos(el);
      const expr = el.getAttribute("hx-style");
      runWithEffect(() => {
        const res = evaluateExpression(expr, state, { $el: el });
        if (typeof res === "object" && res !== null) {
          for (const [prop, val] of Object.entries(res)) {
            el.style[prop] = val;
          }
        }
      });
    });
    const allEls = Array.from(rootEl.querySelectorAll ? rootEl.querySelectorAll("*") : []);
    if (rootEl.nodeType === 1)
      allEls.unshift(rootEl);
    allEls.forEach((el) => {
      if (!el.attributes)
        return;
      for (const attr of Array.from(el.attributes)) {
        let attrName = null;
        if (attr.name.startsWith(":")) {
          attrName = attr.name.slice(1);
        } else if (attr.name.startsWith("hx-bind:")) {
          attrName = attr.name.slice(8);
        }
        if (attrName) {
          const expr = attr.value;
          runWithEffect(() => {
            const val = evaluateExpression(expr, state, { $el: el });
            if (val === false || val === null || val === undefined) {
              el.removeAttribute(attrName);
            } else if (val === true) {
              el.setAttribute(attrName, "");
            } else {
              el.setAttribute(attrName, String(val));
            }
          });
        }
      }
    });
    const modelEls = [];
    const allCandidateEls = Array.from(rootEl.querySelectorAll ? rootEl.querySelectorAll("*") : []);
    if (rootEl.nodeType === 1)
      allCandidateEls.unshift(rootEl);
    allCandidateEls.forEach((el) => {
      if (!el.attributes)
        return;
      for (const attr of Array.from(el.attributes)) {
        if (attr.name === "hx-model" || attr.name.startsWith("hx-model.")) {
          modelEls.push(el);
          break;
        }
      }
    });
    modelEls.forEach((el) => {
      checkAttributeTypos(el);
      let modelAttr = "";
      let attrName = "";
      for (const attr of Array.from(el.attributes)) {
        if (attr.name === "hx-model" || attr.name.startsWith("hx-model.")) {
          modelAttr = attr.value;
          attrName = attr.name;
          break;
        }
      }
      const parts = attrName.split(".");
      const modifiers = parts.slice(1);
      const propPath = modelAttr;
      const isLazy = modifiers.includes("lazy");
      const isNumber = modifiers.includes("number") || el.type === "number";
      const isTrim = modifiers.includes("trim");
      runWithEffect(() => {
        const val = evaluateExpression(propPath, state, { $el: el });
        if (el.type === "checkbox") {
          if (Array.isArray(val)) {
            el.checked = val.includes(el.value);
          } else {
            el.checked = Boolean(val);
          }
        } else if (el.type === "radio") {
          el.checked = el.value === String(val);
        } else {
          if (el.value !== String(val !== undefined && val !== null ? val : "")) {
            el.value = val !== undefined && val !== null ? String(val) : "";
          }
        }
      });
      const isInputEl = el instanceof HTMLInputElement;
      const eventName = isInputEl && (el.type === "checkbox" || el.type === "radio") || isLazy || el.tagName === "SELECT" ? "change" : "input";
      el.addEventListener(eventName, () => {
        let val;
        if (isInputEl && el.type === "checkbox") {
          const current = evaluateExpression(propPath, state, { $el: el });
          if (Array.isArray(current)) {
            val = el.checked ? [...current, el.value] : current.filter((x) => x !== el.value);
          } else {
            val = el.checked;
          }
        } else if (isInputEl && el.type === "radio") {
          val = el.value;
        } else {
          val = el.value;
          if (isTrim)
            val = val.trim();
          if (isNumber) {
            const num = parseFloat(val);
            val = isNaN(num) ? val : num;
          }
        }
        executeAction(`${propPath} = $eventValue`, state, { $el: el, $eventValue: val });
      });
    });
    const cellEls = Array.from(rootEl.querySelectorAll ? rootEl.querySelectorAll("[hx-cell], [hx-matrix-cell]") : []);
    if (rootEl.hasAttribute && (rootEl.hasAttribute("hx-cell") || rootEl.hasAttribute("hx-matrix-cell")))
      cellEls.unshift(rootEl);
    cellEls.forEach((el) => {
      checkAttributeTypos(el);
      const cellAttr = el.getAttribute("hx-cell") || el.getAttribute("hx-matrix-cell");
      const [rStr, cStr] = cellAttr.split(/[,:]/).map((s) => s.trim());
      const row = parseInt(rStr, 10);
      const col = parseInt(cStr, 10);
      if (isNaN(row) || isNaN(col))
        return;
      const matrixName = el.getAttribute("hx-matrix") || el.closest("[hx-matrix]")?.getAttribute("hx-matrix") || "default";
      let targetMatrix = matrices[matrixName];
      if (!targetMatrix && state && state.$matrix) {
        targetMatrix = state.$matrix;
      }
      if (targetMatrix) {
        const isInput = el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement;
        targetMatrix.subscribe(row, col, (val, flashClass) => {
          const displayVal = val !== undefined && val !== null ? String(val) : "";
          if (isInput) {
            el.value = displayVal;
          } else {
            el.textContent = displayVal;
          }
          if (flashClass) {
            const classes = flashClass.split(/\s+/).filter(Boolean);
            el.classList.add(...classes);
            setTimeout(() => el.classList.remove(...classes), 600);
          }
        });
        const initialVal = targetMatrix.get(row, col);
        if (initialVal !== undefined) {
          if (isInput) {
            el.value = String(initialVal);
          } else {
            el.textContent = String(initialVal);
          }
        }
        if (isInput) {
          el.addEventListener("change", () => {
            const v = el.value;
            targetMatrix.set(row, col, isNaN(v) || v === "" ? v : Number(v));
          });
        }
      }
    });
    customDirectives.forEach((handler, dirName) => {
      let matchedEls = [];
      try {
        const selector = /^[0-9]/.test(dirName) ? `[\\3${dirName[0]} ${dirName.slice(1)}]` : `[${dirName}]`;
        matchedEls = Array.from(rootEl.querySelectorAll ? rootEl.querySelectorAll(selector) : []);
      } catch (e) {}
      if (rootEl.hasAttribute && rootEl.hasAttribute(dirName))
        matchedEls.unshift(rootEl);
      matchedEls.forEach((el) => {
        const val = el.getAttribute(dirName) || "";
        try {
          handler(el, val, {
            state,
            execute: (expr, extra) => executeAction(expr, state, { $el: el, ...extra }),
            onCleanup: (cb) => {
              el._cleanups = el._cleanups || [];
              el._cleanups.push(cb);
            }
          });
        } catch (err) {
          console.error(`[htmxui:directive ${dirName}]`, err);
        }
      });
    });
  }
  function bindEvents(rootEl, state) {
    const allEls = Array.from(rootEl.querySelectorAll ? rootEl.querySelectorAll("*") : []);
    if (rootEl.nodeType === 1)
      allEls.unshift(rootEl);
    allEls.forEach((el) => {
      if (!el.attributes)
        return;
      if (el.hasAttribute("hx-action") && !el._hxActionAttached) {
        el._hxActionAttached = true;
        const expr = el.getAttribute("hx-action");
        el.addEventListener("click", (e) => {
          executeAction(expr, state, { $el: el, $event: e });
        });
      }
      if (el.hasAttribute("hx-action-dblclick") && !el._hxActionDblAttached) {
        el._hxActionDblAttached = true;
        const expr = el.getAttribute("hx-action-dblclick");
        el.addEventListener("dblclick", (e) => {
          executeAction(expr, state, { $el: el, $event: e });
        });
      }
      for (const attr of Array.from(el.attributes)) {
        let eventDecl = null;
        if (attr.name.startsWith("hx-on:")) {
          eventDecl = attr.name.slice(6);
        } else if (attr.name.startsWith("@")) {
          eventDecl = attr.name.slice(1);
        }
        if (eventDecl) {
          const parts = eventDecl.split(".");
          const eventName = parts[0];
          const modifiers = parts.slice(1);
          const expr = attr.value;
          let targetElement = el;
          if (modifiers.includes("window"))
            targetElement = window;
          if (modifiers.includes("document"))
            targetElement = document;
          let handler = (e) => {
            if (modifiers.includes("prevent"))
              e.preventDefault();
            if (modifiers.includes("stop"))
              e.stopPropagation();
            if (modifiers.includes("self") && e.target !== el)
              return;
            if (e instanceof KeyboardEvent) {
              const keyModifiers = ["enter", "escape", "space", "tab", "arrow-up", "arrow-down", "arrow-left", "arrow-right", "delete", "backspace"];
              for (const mod of modifiers) {
                if (keyModifiers.includes(mod)) {
                  const normalizedKey = e.key.toLowerCase().replace(/_/g, "-");
                  if (normalizedKey !== mod)
                    return;
                }
              }
            }
            if (modifiers.includes("outside")) {
              if (el.contains(e.target))
                return;
            }
            executeAction(expr, state, { $el: el, $event: e });
          };
          const debounceMod = modifiers.find((m) => m.startsWith("debounce"));
          if (debounceMod) {
            const timeMatch = debounceMod.match(/\d+/);
            const delay = timeMatch ? parseInt(timeMatch[0], 10) : 250;
            let timeout;
            const originalHandler = handler;
            handler = (e) => {
              clearTimeout(timeout);
              timeout = setTimeout(() => originalHandler(e), delay);
            };
          }
          const throttleMod = modifiers.find((m) => m.startsWith("throttle"));
          if (throttleMod) {
            const timeMatch = throttleMod.match(/\d+/);
            const delay = timeMatch ? parseInt(timeMatch[0], 10) : 250;
            let lastRun = 0;
            const originalHandler = handler;
            handler = (e) => {
              const now = Date.now();
              if (now - lastRun >= delay) {
                lastRun = now;
                originalHandler(e);
              }
            };
          }
          const once = modifiers.includes("once");
          targetElement.addEventListener(eventName, handler, { once });
        }
      }
    });
  }
  var historyUndoStack = [];
  var historyRedoStack = [];
  var isApplyingHistory = false;
  function recordStateSnapshot(state) {
    if (isApplyingHistory)
      return;
    try {
      const raw = state.__raw || state;
      const snapshot = JSON.stringify(raw);
      historyUndoStack.push({ targetState: state, snapshot });
      if (historyUndoStack.length > 50)
        historyUndoStack.shift();
      historyRedoStack.length = 0;
    } catch (e) {}
  }
  function undoState() {
    if (historyUndoStack.length <= 1)
      return false;
    const current = historyUndoStack.pop();
    historyRedoStack.push(current);
    const prev = historyUndoStack[historyUndoStack.length - 1];
    if (prev) {
      isApplyingHistory = true;
      try {
        const data = JSON.parse(prev.snapshot);
        for (const [k, v] of Object.entries(data)) {
          if (k !== "__refs")
            prev.targetState[k] = v;
        }
      } finally {
        isApplyingHistory = false;
      }
      return true;
    }
    return false;
  }
  function redoState() {
    if (historyRedoStack.length === 0)
      return false;
    const next = historyRedoStack.pop();
    historyUndoStack.push(next);
    isApplyingHistory = true;
    try {
      const data = JSON.parse(next.snapshot);
      for (const [k, v] of Object.entries(data)) {
        if (k !== "__refs")
          next.targetState[k] = v;
      }
    } finally {
      isApplyingHistory = false;
    }
    return true;
  }
  var modalStack = [];
  function registerModal(modalEl) {
    if (!modalStack.includes(modalEl)) {
      modalStack.push(modalEl);
      modalEl.style.zIndex = String(1000 + modalStack.length * 10);
    }
  }
  function unregisterModal(modalEl) {
    const idx = modalStack.indexOf(modalEl);
    if (idx !== -1) {
      modalStack.splice(idx, 1);
    }
  }
  if (typeof document !== "undefined") {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalStack.length > 0) {
        const topModal = modalStack[modalStack.length - 1];
        topModal.style.display = "none";
        unregisterModal(topModal);
        e.stopPropagation();
      }
    });
  }
  var tickerCallbacks = new Set;
  var lastTickTime = 0;
  var tickerRunning = false;
  function startTickerLoop() {
    if (tickerRunning || typeof window === "undefined")
      return;
    tickerRunning = true;
    lastTickTime = performance.now();
    function loop(now) {
      const rawDt = (now - lastTickTime) / 1000;
      const dt = Math.min(rawDt, 0.1);
      lastTickTime = now;
      tickerCallbacks.forEach((cb) => {
        try {
          cb(dt, now);
        } catch (err) {
          console.error("[htmx-bolt:ticker]", err);
        }
      });
      if (typeof document !== "undefined") {
        document.querySelectorAll("[hx-tick]").forEach((el) => {
          const expr = el.getAttribute("hx-tick");
          const state = elementStates.get(el) || (el.closest("[hx-state]") ? elementStates.get(el.closest("[hx-state]")) : null);
          if (expr && state) {
            try {
              executeAction(expr, state, el, { dt, time: now });
            } catch (e) {}
          }
        });
      }
      if (tickerCallbacks.size > 0 || typeof document !== "undefined" && document.querySelector("[hx-tick]")) {
        requestAnimationFrame(loop);
      } else {
        tickerRunning = false;
      }
    }
    requestAnimationFrame(loop);
  }
  var customDirectives = new Map;
  var customEngines = new Map;
  var HxSpatial = {
    mount(el) {
      const fx = typeof window !== "undefined" ? window.htmFX || window.HtmFX : null;
      if (fx && typeof fx.mount === "function") {
        fx.mount(el);
        return;
      }
      console.warn("@diag FX-0404: htmFX spatial companion required for 3D rendering. (Include /htmfx.js)");
    },
    focus(target, options) {
      const fx = typeof window !== "undefined" ? window.htmFX || window.HtmFX : null;
      if (fx && typeof fx.focus === "function") {
        fx.focus(target, options);
      }
      if (typeof document !== "undefined") {
        document.dispatchEvent(new CustomEvent("spatial:focus", { detail: { target, options } }));
      }
    },
    explode(target, options) {
      const fx = typeof window !== "undefined" ? window.htmFX || window.HtmFX : null;
      if (fx && typeof fx.explode === "function") {
        fx.explode(target, options);
      }
      if (typeof document !== "undefined") {
        document.dispatchEvent(new CustomEvent("spatial:explode", { detail: { target, options } }));
      }
    }
  };
  customDirectives.set("hx-3d", (el) => HxSpatial.mount(el));
  customDirectives.set("3denv", (el) => HxSpatial.mount(el));
  customDirectives.set("3datmos", (el) => HxSpatial.mount(el));
  customDirectives.set("3dfx", (el) => HxSpatial.mount(el));
  customDirectives.set("hx-spatial", (el) => HxSpatial.mount(el));
  var HxBolt = {
    config,
    errors: ERROR_CATALOG,
    history: {
      undo: undoState,
      redo: redoState,
      canUndo: () => historyUndoStack.length > 1,
      canRedo: () => historyRedoStack.length > 0
    },
    undo: undoState,
    redo: redoState,
    fx: HyperFX,
    spatial: HxSpatial,
    ticker: {
      subscribe(cb) {
        tickerCallbacks.add(cb);
        if (!tickerRunning)
          startTickerLoop();
        return () => {
          tickerCallbacks.delete(cb);
        };
      },
      now: () => performance.now()
    },
    store(name, initialValue) {
      if (initialValue !== undefined) {
        stores[name] = createReactiveObject(initialValue);
      }
      return stores[name];
    },
    getStore(name) {
      return stores[name];
    },
    getState(el) {
      let current = el;
      while (current) {
        if (elementStates.has(current)) {
          return elementStates.get(current);
        }
        current = current.parentElement;
      }
      return;
    },
    matrix(rows = 1e6, cols = 16384, initialData) {
      const mat = new SparseMatrix(rows, cols, initialData);
      if (!matrices["default"])
        matrices["default"] = mat;
      return mat;
    },
    getMatrix(name = "default") {
      return matrices[name];
    },
    registerMatrix(name, matrix) {
      matrices[name] = matrix;
    },
    streamBatch,
    parseMicroDelta,
    safeEvaluate,
    safeExecuteAction,
    evaluateExpression,
    executeAction,
    getDiagnostics,
    clearDiagnostics,
    init(root) {
      const scopeRoots = root.querySelectorAll ? root.querySelectorAll('[hx-state], [hx-ext="reactive"]') : [];
      scopeRoots.forEach(initComponent);
      if (root.hasAttribute && (root.hasAttribute("hx-state") || root.getAttribute("hx-ext") === "reactive")) {
        initComponent(root);
      }
      if (typeof document !== "undefined") {
        const spatialEls = root.querySelectorAll ? root.querySelectorAll("[hx-3d], [hx-spatial], [hx-env], [hx-atmos], [hx-fx], hx-viewport, hx-mesh, hx-particle, hx-light") : [];
        spatialEls.forEach((el) => HxSpatial.mount(el));
        if (root.matches && root.matches("[hx-3d], [hx-spatial], [hx-env], [hx-atmos], [hx-fx], hx-viewport, hx-mesh, hx-particle, hx-light")) {
          HxSpatial.mount(root);
        }
      }
      if (typeof document !== "undefined" && document.querySelector("[hx-tick]") && !tickerRunning) {
        startTickerLoop();
      }
    }
  };
  if (typeof window !== "undefined") {
    let handleScaleUI = function(el) {
      if (el.getAttribute("scaleui") === "1") {
        el.style.resize = "both";
        el.style.overflow = "auto";
        scaleUiResizer.observe(el);
      } else {
        el.style.resize = "";
        el.style.overflow = "";
        el.style.fontSize = "";
        el.style.gap = "";
        el.style.removeProperty("--scaleui-ratio");
        scaleUiResizer.unobserve(el);
        delete el._baseWidth;
      }
    }, setupObserver = function() {
      if (observerInitialized || typeof MutationObserver === "undefined" || !document.body)
        return;
      observerInitialized = true;
      new MutationObserver((mutations) => {
        for (const m of mutations) {
          if (m.type === "attributes" && m.attributeName === "scaleui") {
            handleScaleUI(m.target);
          } else if (m.type === "childList") {
            m.addedNodes.forEach((node) => {
              if (node.nodeType === 1) {
                const el = node;
                if (el.hasAttribute("scaleui"))
                  handleScaleUI(el);
                el.querySelectorAll("[scaleui]").forEach((child) => handleScaleUI(child));
                if (el.hasAttribute("hx-state") || el.querySelector("script[hx-state]"))
                  initComponent(el);
                el.querySelectorAll("[hx-state]").forEach((child) => initComponent(child));
                if (el.matches && el.matches("[hx-3d], [hx-spatial], [hx-env], [hx-atmos], [hx-fx], hx-viewport, hx-mesh, hx-particle, hx-light"))
                  HxSpatial.mount(el);
                el.querySelectorAll("[hx-3d], [hx-spatial], [hx-env], [hx-atmos], [hx-fx], hx-viewport, hx-mesh, hx-particle, hx-light").forEach((child) => HxSpatial.mount(child));
              }
            });
          }
        }
      }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["scaleui", "hx-state"] });
    }, autoInit = function() {
      document.querySelectorAll("[hx-state], script[hx-state]").forEach((el) => {
        const root = el.tagName === "SCRIPT" ? el.parentElement : el;
        if (root)
          initComponent(root);
      });
      if (document.body && document.body.hasAttribute("hx-state")) {
        initComponent(document.body);
      }
      document.querySelectorAll("[scaleui]").forEach((el) => handleScaleUI(el));
      document.querySelectorAll("[hx-3d], [hx-spatial], [hx-env], [hx-atmos], [hx-fx], hx-viewport, hx-mesh, hx-particle, hx-light").forEach((el) => HxSpatial.mount(el));
      setupObserver();
    };
    window.HxBolt = HxBolt;
    window.HTMXUI = {
      config,
      errors: ERROR_CATALOG,
      bolt: HxBolt,
      fx: HyperFX,
      spatial: HxSpatial,
      safeEvaluate,
      safeExecuteAction,
      getDiagnostics,
      clearDiagnostics,
      directive(name, handler) {
        customDirectives.set(name.startsWith("hx-") ? name : `hx-${name}`, handler);
      },
      defineEngine(name, factory) {
        const engine = factory({ bolt: HxBolt, ticker: HxBolt.ticker, fx: HyperFX, spatial: HxSpatial });
        customEngines.set(name, engine);
        return engine;
      }
    };
    document.addEventListener("hxStateUpdate", function(evt) {
      const detail = evt.detail;
      if (detail && detail.target && detail.state) {
        const el = document.querySelector(detail.target);
        if (el && elementStates.has(el)) {
          const state = elementStates.get(el);
          for (const [key, value] of Object.entries(detail.state)) {
            state[key] = value;
          }
        }
      }
    });
    document.addEventListener("hxStoreUpdate", function(evt) {
      const detail = evt.detail;
      if (detail && detail.store && detail.state) {
        const store = stores[detail.store];
        if (store) {
          for (const [key, value] of Object.entries(detail.state)) {
            store[key] = value;
          }
        }
      }
    });
    document.addEventListener("hxMatrixUpdate", function(evt) {
      const detail = evt.detail;
      if (detail) {
        const matrixName = detail.matrix || "default";
        const targetMat = matrices[matrixName];
        if (targetMat) {
          if (typeof detail.delta === "string") {
            parseMicroDelta(detail.delta, targetMat);
          } else if (detail.row !== undefined && detail.col !== undefined) {
            targetMat.set(detail.row, detail.col, detail.val, detail.flashClass);
          } else if (Array.isArray(detail.batch)) {
            targetMat.batch(detail.batch);
          }
        }
      }
    });
    if (typeof window.htmx !== "undefined") {
      window.htmx.defineExtension("reactive", {
        onEvent: function(name, evt) {
          if (name === "htmx:beforeProcessNode" || name === "htmx:afterProcessNode") {
            const elt = evt.detail.elt;
            if (elt && elt.nodeType === 1) {
              if (elt.hasAttribute("hx-state") || elt.querySelector("script[hx-state]") || elt.getAttribute("hx-ext") === "reactive") {
                initComponent(elt);
              }
            }
          }
        }
      });
      window.htmx.defineExtension("grid-delta", {
        onEvent: function(name, evt) {
          if (name === "htmx:sseMessage" || name === "htmx:wsAfterMessage" || name === "htmx:afterOnLoad") {
            const text = evt.detail?.data || evt.detail?.xhr?.responseText;
            if (text && typeof text === "string" && (text.includes("Δ") || text.includes("delta:"))) {
              const matrixName = evt.detail?.elt?.getAttribute("hx-matrix") || "default";
              const targetMat = matrices[matrixName] || matrices["default"];
              if (targetMat) {
                const streamBatchAttr = evt.detail?.elt?.getAttribute("hx-stream-batch");
                if (streamBatchAttr) {
                  const fps = parseInt(streamBatchAttr.replace("fps", ""), 10) || 60;
                  streamBatch(() => parseMicroDelta(text, targetMat), fps);
                } else {
                  parseMicroDelta(text, targetMat);
                }
              }
            }
          }
        }
      });
    }
    const scaleUiResizer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const el = entry.target;
        if (el.getAttribute("scaleui") === "1") {
          if (!el._baseWidth) {
            el._baseWidth = el.offsetWidth;
            const style = window.getComputedStyle(el);
            el._baseFontSize = parseFloat(style.fontSize);
            el._baseGap = parseFloat(style.gap) || 0;
          }
          const ratio = el.offsetWidth / (el._baseWidth || 1);
          el.style.setProperty("--scaleui-ratio", String(ratio));
          if (el._baseFontSize)
            el.style.fontSize = el._baseFontSize * ratio + "px";
          if (el._baseGap)
            el.style.gap = el._baseGap * ratio + "px";
        }
      }
    });
    let observerInitialized = false;
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", autoInit);
    } else {
      autoInit();
    }
  }
})();
