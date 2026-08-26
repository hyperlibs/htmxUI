// src/htmx-bolt.ts
var config = {
  strictMode: false,
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
  }
};
function reportError(code, detail, el = null) {
  const meta = ERROR_CATALOG[code] || { title: "Unknown runtime error", fix: "Consult /schema/htmxui.json" };
  const message = `[${code}] ${meta.title}
Detail: ${detail}
Fix: ${meta.fix}`;
  if (config.strictMode) {
    throw new Error(message);
  } else {
    console.warn(`%c${message}`, "color: #ef4444; font-weight: bold;", el);
  }
}
var KNOWN_ATTRIBUTES = new Set([
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
  "hx-undoable",
  "hx-undo",
  "hx-redo",
  "hx-can",
  "hx-role",
  "hx-modal",
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
  "hx-indicator",
  "hx-push-url",
  "hx-params",
  "hx-headers",
  "hx-vals"
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
    if (name.startsWith("hx-") && !name.startsWith("hx-on:") && !name.startsWith("hx-bind:") && !name.startsWith("hx-msg-")) {
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
    get(obj, prop, receiver) {
      if (prop === "__isProxy")
        return true;
      if (prop === "__raw")
        return obj;
      if (typeof prop === "string") {
        getSignal(prop).depend();
      }
      return Reflect.get(obj, prop, receiver);
    },
    set(obj, prop, value, receiver) {
      const oldVal = obj[prop];
      if (oldVal === value && typeof value !== "object") {
        return true;
      }
      const wrappedVal = typeof value === "object" && value !== null ? createReactiveObject(value, rootNotify, path ? `${path}.${String(prop)}` : String(prop)) : value;
      const result = Reflect.set(obj, prop, wrappedVal, receiver);
      if (typeof prop === "string") {
        getSignal(prop).notify();
        recordStateSnapshot(obj);
        if (config.debug) {
          console.log(`[htmx-bolt:debug] ⚡ Signal mutated: "${path ? path + "." : ""}${String(prop)}"`, { oldVal, newVal: value });
        }
        if (rootNotify)
          rootNotify();
      }
      return result;
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
function evaluateExpression(expr, context, extraScope = {}) {
  try {
    const scopeKeys = ["$store", "$refs", "$el", "$event", "$form", ...Object.keys(context), ...Object.keys(extraScope)];
    const scopeValues = [
      stores,
      context.__refs || {},
      extraScope.$el || null,
      extraScope.$event || null,
      context.$form || {},
      ...Object.values(context),
      ...Object.values(extraScope)
    ];
    const trimmed = expr.trim();
    const fn = new Function(...scopeKeys, `return (${trimmed})`);
    return fn(...scopeValues);
  } catch (e) {
    try {
      const scopeKeys = ["$store", "$refs", "$el", "$event", "$form", ...Object.keys(context), ...Object.keys(extraScope)];
      const scopeValues = [
        stores,
        context.__refs || {},
        extraScope.$el || null,
        extraScope.$event || null,
        context.$form || {},
        ...Object.values(context),
        ...Object.values(extraScope)
      ];
      const fn = new Function(...scopeKeys, `with(this) { ${expr} }`);
      return fn.apply(context, scopeValues);
    } catch (err) {
      if (config.debug) {
        console.warn(`[htmx-bolt] Evaluation error in "${expr}":`, err.message);
      }
      return;
    }
  }
}
function executeAction(expr, context, extraScope = {}) {
  try {
    const scopeKeys = ["$store", "$refs", "$el", "$event", "$form", ...Object.keys(context), ...Object.keys(extraScope)];
    const scopeValues = [
      stores,
      context.__refs || {},
      extraScope.$el || null,
      extraScope.$event || null,
      context.$form || {},
      ...Object.values(context),
      ...Object.values(extraScope)
    ];
    const fn = new Function(...scopeKeys, `with(this) { ${expr} }`);
    return fn.apply(context, scopeValues);
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
  processStructuralDirectives(rootEl, reactiveState);
  bindDirectives(rootEl, reactiveState);
  bindEvents(rootEl, reactiveState);
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
        bindDirectives(clone, scopedState);
        bindEvents(clone, scopedState);
        const insertedNodes = Array.from(clone.childNodes);
        anchor.parentNode?.insertBefore(clone, anchor);
        currentNodes.push(...insertedNodes);
      });
    });
  });
}
function bindDirectives(rootEl, state) {
  const textEls = Array.from(rootEl.querySelectorAll ? rootEl.querySelectorAll("[hx-text]") : []);
  if (rootEl.hasAttribute && rootEl.hasAttribute("hx-text"))
    textEls.unshift(rootEl);
  textEls.forEach((el) => {
    checkAttributeTypos(el);
    const expr = el.getAttribute("hx-text");
    runWithEffect(() => {
      const val = evaluateExpression(expr, state, { $el: el });
      el.innerText = val !== undefined && val !== null ? String(val) : "";
    });
  });
  const htmlEls = Array.from(rootEl.querySelectorAll ? rootEl.querySelectorAll("[hx-html]") : []);
  if (rootEl.hasAttribute && rootEl.hasAttribute("hx-html"))
    htmlEls.unshift(rootEl);
  htmlEls.forEach((el) => {
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
  const modelEls = Array.from(rootEl.querySelectorAll ? rootEl.querySelectorAll("[hx-model]") : []);
  if (rootEl.hasAttribute && rootEl.hasAttribute("hx-model"))
    modelEls.unshift(rootEl);
  modelEls.forEach((el) => {
    checkAttributeTypos(el);
    const modelAttr = el.getAttribute("hx-model");
    const parts = modelAttr.split(".");
    const propPath = parts[0];
    const modifiers = parts.slice(1);
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
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalStack.length > 0) {
    const topModal = modalStack[modalStack.length - 1];
    topModal.style.display = "none";
    unregisterModal(topModal);
    e.stopPropagation();
  }
});
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
    return elementStates.get(el);
  },
  init(root) {
    const scopeRoots = root.querySelectorAll ? root.querySelectorAll('[hx-state], [hx-ext="reactive"]') : [];
    scopeRoots.forEach(initComponent);
    if (root.hasAttribute && (root.hasAttribute("hx-state") || root.getAttribute("hx-ext") === "reactive")) {
      initComponent(root);
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
  };
  window.HxBolt = HxBolt;
  window.HTMXUI = { config, errors: ERROR_CATALOG, bolt: HxBolt };
  document.body.addEventListener("hxStateUpdate", function(evt) {
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
  document.body.addEventListener("hxStoreUpdate", function(evt) {
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
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[hx-state], script[hx-state]").forEach((el) => {
      const root = el.tagName === "SCRIPT" ? el.parentElement : el;
      if (root)
        initComponent(root);
    });
    document.querySelectorAll("[scaleui]").forEach((el) => handleScaleUI(el));
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
            }
          });
        }
      }
    }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["scaleui", "hx-state"] });
  });
}
export {
  unregisterModal,
  undoState,
  runWithEffect,
  reportError,
  registerModal,
  redoState,
  recordStateSnapshot,
  initComponent,
  executeAction,
  evaluateExpression,
  createReactiveObject,
  config,
  applyTransition,
  SignalTracker,
  HxBolt,
  ERROR_CATALOG
};
