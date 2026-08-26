/**
 * HTMX-BOLT — Hyperreactive Signal & State Engine for HTMX
 * Written in TypeScript for type safety and framework extensibility.
 */

import type { HxBoltAPI, ReactiveProxy, TransitionPreset } from './types';

// Global Stores Registry
const stores: Record<string, ReactiveProxy> = {};
let activeEffect: (() => void) | null = null;
const effectStack: Array<() => void> = [];

// Microtask Batching Scheduler
const pendingEffects = new Set<() => void>();
let isFlushing = false;

function queueEffect(effect: () => void): void {
  pendingEffects.add(effect);
  if (!isFlushing) {
    isFlushing = true;
    queueMicrotask(flushEffects);
  }
}

function flushEffects(): void {
  const effectsToRun = Array.from(pendingEffects);
  pendingEffects.clear();
  isFlushing = false;
  for (const effect of effectsToRun) {
    effect();
  }
}

// Signal Dependency Tracker
export class SignalTracker {
  private subscribers = new Set<() => void>();

  depend(): void {
    if (activeEffect) {
      this.subscribers.add(activeEffect);
    }
  }

  notify(): void {
    for (const effect of Array.from(this.subscribers)) {
      queueEffect(effect);
    }
  }
}

export function createReactiveObject<T extends object>(
  target: T,
  rootNotify: (() => void) | null = null,
  path = ''
): ReactiveProxy<T> {
  if (target === null || typeof target !== 'object' || (target as any).__isProxy) {
    return target as ReactiveProxy<T>;
  }

  const signalMap = new Map<string, SignalTracker>();

  function getSignal(prop: string): SignalTracker {
    if (!signalMap.has(prop)) {
      signalMap.set(prop, new SignalTracker());
    }
    return signalMap.get(prop)!;
  }

  // Deep recursive wrapping
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      const val = (target as any)[key];
      if (typeof val === 'object' && val !== null) {
        (target as any)[key] = createReactiveObject(val, rootNotify, path ? `${path}.${key}` : key);
      }
    }
  }

  const proxy = new Proxy(target, {
    get(obj, prop, receiver) {
      if (prop === '__isProxy') return true;
      if (prop === '__raw') return obj;
      if (typeof prop === 'string') {
        getSignal(prop).depend();
      }
      return Reflect.get(obj, prop, receiver);
    },
    set(obj, prop, value, receiver) {
      const oldVal = (obj as any)[prop];
      if (oldVal === value && typeof value !== 'object') {
        return true;
      }

      const wrappedVal = (typeof value === 'object' && value !== null)
        ? createReactiveObject(value, rootNotify, path ? `${path}.${String(prop)}` : String(prop))
        : value;

      const result = Reflect.set(obj, prop, wrappedVal, receiver);
      if (typeof prop === 'string') {
        getSignal(prop).notify();
        if (rootNotify) rootNotify();
      }
      return result;
    },
    deleteProperty(obj, prop) {
      const has = prop in obj;
      const result = Reflect.deleteProperty(obj, prop);
      if (has && typeof prop === 'string') {
        getSignal(prop).notify();
        if (rootNotify) rootNotify();
      }
      return result;
    }
  });

  return proxy as ReactiveProxy<T>;
}

// Safe Scope Evaluator
export function evaluateExpression(expr: string, context: any, extraScope: Record<string, any> = {}): any {
  try {
    const scopeKeys = ['$store', '$refs', '$el', '$event', ...Object.keys(context), ...Object.keys(extraScope)];
    const scopeValues = [
      stores,
      context.__refs || {},
      extraScope.$el || null,
      extraScope.$event || null,
      ...Object.values(context),
      ...Object.values(extraScope)
    ];

    const trimmed = expr.trim();
    const fn = new Function(...scopeKeys, `return (${trimmed})`);
    return fn(...scopeValues);
  } catch (e: any) {
    try {
      const scopeKeys = ['$store', '$refs', '$el', '$event', ...Object.keys(context), ...Object.keys(extraScope)];
      const scopeValues = [
        stores,
        context.__refs || {},
        extraScope.$el || null,
        extraScope.$event || null,
        ...Object.values(context),
        ...Object.values(extraScope)
      ];
      const fn = new Function(...scopeKeys, `with(this) { ${expr} }`);
      return fn.apply(context, scopeValues);
    } catch (err: any) {
      console.warn(`[htmx-bolt] Evaluation error in "${expr}":`, err.message);
      return undefined;
    }
  }
}

export function executeAction(expr: string, context: any, extraScope: Record<string, any> = {}): any {
  try {
    const scopeKeys = ['$store', '$refs', '$el', '$event', ...Object.keys(context), ...Object.keys(extraScope)];
    const scopeValues = [
      stores,
      context.__refs || {},
      extraScope.$el || null,
      extraScope.$event || null,
      ...Object.values(context),
      ...Object.values(extraScope)
    ];
    const fn = new Function(...scopeKeys, `with(this) { ${expr} }`);
    return fn.apply(context, scopeValues);
  } catch (err: any) {
    console.error(`[htmx-bolt] Action error in "${expr}":`, err);
  }
}

export function runWithEffect(effectFn: () => void): () => void {
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

// Transitions Subsystem
export function applyTransition(el: HTMLElement, stage: string, type: 'enter' | 'leave' = 'enter'): Promise<void> {
  const transitionPreset = el.getAttribute('hx-transition');
  const enterClass = el.getAttribute('hx-transition:enter') || '';
  const enterStart = el.getAttribute('hx-transition:enter-start') || '';
  const enterEnd = el.getAttribute('hx-transition:enter-end') || '';
  const leaveClass = el.getAttribute('hx-transition:leave') || '';
  const leaveStart = el.getAttribute('hx-transition:leave-start') || '';
  const leaveEnd = el.getAttribute('hx-transition:leave-end') || '';

  if (transitionPreset) {
    const presets: Record<string, TransitionPreset> = {
      fade: {
        enter: 'transition-opacity duration-200',
        enterStart: 'opacity-0',
        enterEnd: 'opacity-100',
        leave: 'transition-opacity duration-150',
        leaveStart: 'opacity-100',
        leaveEnd: 'opacity-0'
      },
      slide: {
        enter: 'transition-all duration-200 ease-out',
        enterStart: 'opacity-0 -translate-y-2',
        enterEnd: 'opacity-100 translate-y-0',
        leave: 'transition-all duration-150 ease-in',
        leaveStart: 'opacity-100 translate-y-0',
        leaveEnd: 'opacity-0 -translate-y-2'
      },
      scale: {
        enter: 'transition-all duration-200 ease-out',
        enterStart: 'opacity-0 scale-95',
        enterEnd: 'opacity-100 scale-100',
        leave: 'transition-all duration-150 ease-in',
        leaveStart: 'opacity-100 scale-100',
        leaveEnd: 'opacity-0 scale-95'
      }
    };

    const p = presets[transitionPreset] || presets.fade;
    if (type === 'enter') {
      runCssTransition(el, p.enter, p.enterStart, p.enterEnd);
    } else {
      return runCssTransition(el, p.leave, p.leaveStart, p.leaveEnd);
    }
    return Promise.resolve();
  }

  if (enterClass || leaveClass) {
    if (type === 'enter') {
      runCssTransition(el, enterClass, enterStart, enterEnd);
    } else {
      return runCssTransition(el, leaveClass, leaveStart, leaveEnd);
    }
  }
  return Promise.resolve();
}

function runCssTransition(el: HTMLElement, baseClasses: string, startClasses: string, endClasses: string): Promise<void> {
  return new Promise(resolve => {
    const addList = (str: string) => str.split(/\s+/).filter(Boolean);
    const base = addList(baseClasses);
    const start = addList(startClasses);
    const end = addList(endClasses);

    el.classList.add(...base, ...start);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.classList.remove(...start);
        el.classList.add(...end);
        const onEnd = () => {
          el.removeEventListener('transitionend', onEnd);
          el.classList.remove(...base);
          resolve();
        };
        el.addEventListener('transitionend', onEnd, { once: true });
        setTimeout(onEnd, 400);
      });
    });
  });
}

// Component Scope Manager
const elementStates = new WeakMap<HTMLElement, ReactiveProxy>();

export function initComponent(rootEl: HTMLElement): ReactiveProxy {
  if (elementStates.has(rootEl)) return elementStates.get(rootEl)!;

  let initialData: Record<string, any> = {};
  const stateAttr = rootEl.getAttribute('hx-state');
  if (stateAttr) {
    try {
      initialData = new Function(`return (${stateAttr})`)();
    } catch (e) {
      console.error('[htmx-bolt] Invalid hx-state JSON/expression:', stateAttr, e);
    }
  }

  const refs: Record<string, HTMLElement> = {};
  initialData.__refs = refs;

  rootEl.querySelectorAll('[hx-ref]').forEach(el => {
    const refName = el.getAttribute('hx-ref');
    if (refName) refs[refName] = el as HTMLElement;
  });

  const reactiveState = createReactiveObject(initialData);
  elementStates.set(rootEl, reactiveState);

  // 1. Computed Properties (hx-computed)
  const computedAttr = rootEl.getAttribute('hx-computed');
  if (computedAttr) {
    try {
      const computedDef = new Function(`return (${computedAttr})`)();
      for (const [key, expr] of Object.entries(computedDef)) {
        runWithEffect(() => {
          const val = evaluateExpression(expr as string, reactiveState, { $el: rootEl });
          (reactiveState as any)[key] = val;
        });
      }
    } catch (e) {
      console.error('[htmx-bolt] Invalid hx-computed:', computedAttr, e);
    }
  }

  // 2. Effects (hx-effect)
  rootEl.querySelectorAll('[hx-effect]').forEach(el => {
    const expr = el.getAttribute('hx-effect')!;
    runWithEffect(() => {
      evaluateExpression(expr, reactiveState, { $el: el });
    });
  });

  // 3. Structural Directives
  processStructuralDirectives(rootEl, reactiveState);

  // 4. Bindings
  bindDirectives(rootEl, reactiveState);

  // 5. Events
  bindEvents(rootEl, reactiveState);

  return reactiveState;
}

function processStructuralDirectives(rootEl: HTMLElement, state: any): void {
  // hx-if
  const ifTemplates = Array.from(rootEl.querySelectorAll('template[hx-if], [hx-if]')) as HTMLElement[];
  ifTemplates.forEach(el => {
    if ((el as any)._hxIfProcessed) return;
    (el as any)._hxIfProcessed = true;

    const expr = el.getAttribute('hx-if')!;
    const isTemplate = el.tagName === 'TEMPLATE';
    const anchor = document.createComment(`hx-if: ${expr}`);
    el.parentNode?.insertBefore(anchor, el);

    let renderedEl: HTMLElement | null = isTemplate ? null : el;
    if (isTemplate) el.remove();

    runWithEffect(() => {
      const condition = Boolean(evaluateExpression(expr, state, { $el: el }));
      if (condition) {
        if (!renderedEl) {
          renderedEl = isTemplate ? (el as HTMLTemplateElement).content.firstElementChild?.cloneNode(true) as HTMLElement : el;
          if (renderedEl && anchor.parentNode) {
            anchor.parentNode.insertBefore(renderedEl, anchor.nextSibling);
            bindDirectives(renderedEl, state);
            bindEvents(renderedEl, state);
            applyTransition(renderedEl, 'enter');
          }
        } else {
          renderedEl.style.display = '';
        }
      } else {
        if (renderedEl) {
          applyTransition(renderedEl, 'leave').then(() => {
            if (isTemplate && renderedEl && renderedEl.parentNode) {
              renderedEl.parentNode.removeChild(renderedEl);
              renderedEl = null;
            } else if (renderedEl) {
              renderedEl.style.display = 'none';
            }
          });
        }
      }
    });
  });

  // hx-for
  const forTemplates = Array.from(rootEl.querySelectorAll('template[hx-for]')) as HTMLTemplateElement[];
  forTemplates.forEach(template => {
    if ((template as any)._hxForProcessed) return;
    (template as any)._hxForProcessed = true;

    const forExpr = template.getAttribute('hx-for')!;
    const match = forExpr.match(/^\s*(?:\(?\s*(\w+)\s*(?:,\s*(\w+))?\s*\)?)\s+in\s+(.+)\s*$/);
    if (!match) {
      console.error('[htmx-bolt] Invalid hx-for syntax:', forExpr);
      return;
    }

    const itemVar = match[1];
    const indexVar = match[2] || '_idx';
    const listExpr = match[3];

    const anchor = document.createComment(`hx-for: ${forExpr}`);
    template.parentNode?.insertBefore(anchor, template);
    template.remove();

    let currentNodes: Node[] = [];

    runWithEffect(() => {
      const list = evaluateExpression(listExpr, state, { $el: template }) || [];
      const items = Array.isArray(list) ? list : Object.entries(list);

      currentNodes.forEach(node => {
        if (node.parentNode) node.parentNode.removeChild(node);
      });
      currentNodes = [];

      items.forEach((item, index) => {
        const clone = template.content.cloneNode(true) as DocumentFragment;

        const itemScope = {
          [itemVar]: item,
          [indexVar]: index
        };

        const scopedState = new Proxy(state, {
          get(target, prop, receiver) {
            if (typeof prop === 'string' && prop in itemScope) return itemScope[prop];
            return Reflect.get(target, prop, receiver);
          },
          set(target, prop, value, receiver) {
            if (typeof prop === 'string' && prop in itemScope) {
              itemScope[prop] = value;
              return true;
            }
            return Reflect.set(target, prop, value, receiver);
          }
        });

        bindDirectives(clone as any, scopedState);
        bindEvents(clone as any, scopedState);

        const insertedNodes = Array.from(clone.childNodes);
        anchor.parentNode?.insertBefore(clone, anchor);
        currentNodes.push(...insertedNodes);
      });
    });
  });
}

function bindDirectives(rootEl: HTMLElement, state: any): void {
  // hx-text
  const textEls = Array.from(rootEl.querySelectorAll ? rootEl.querySelectorAll('[hx-text]') : []) as HTMLElement[];
  if (rootEl.hasAttribute && rootEl.hasAttribute('hx-text')) textEls.unshift(rootEl);

  textEls.forEach(el => {
    const expr = el.getAttribute('hx-text')!;
    runWithEffect(() => {
      const val = evaluateExpression(expr, state, { $el: el });
      el.innerText = val !== undefined && val !== null ? String(val) : '';
    });
  });

  // hx-html
  const htmlEls = Array.from(rootEl.querySelectorAll ? rootEl.querySelectorAll('[hx-html]') : []) as HTMLElement[];
  if (rootEl.hasAttribute && rootEl.hasAttribute('hx-html')) htmlEls.unshift(rootEl);

  htmlEls.forEach(el => {
    const expr = el.getAttribute('hx-html')!;
    runWithEffect(() => {
      const val = evaluateExpression(expr, state, { $el: el });
      el.innerHTML = val !== undefined && val !== null ? String(val) : '';
    });
  });

  // hx-show
  const showEls = Array.from(rootEl.querySelectorAll ? rootEl.querySelectorAll('[hx-show]') : []) as HTMLElement[];
  if (rootEl.hasAttribute && rootEl.hasAttribute('hx-show')) showEls.unshift(rootEl);

  showEls.forEach(el => {
    const expr = el.getAttribute('hx-show')!;
    runWithEffect(() => {
      const isShown = Boolean(evaluateExpression(expr, state, { $el: el }));
      if (isShown) {
        el.style.display = '';
        applyTransition(el, 'enter');
      } else {
        applyTransition(el, 'leave').then(() => {
          el.style.display = 'none';
        });
      }
    });
  });

  // hx-class
  const classEls = Array.from(rootEl.querySelectorAll ? rootEl.querySelectorAll('[hx-class]') : []) as HTMLElement[];
  if (rootEl.hasAttribute && rootEl.hasAttribute('hx-class')) classEls.unshift(rootEl);

  classEls.forEach(el => {
    const expr = el.getAttribute('hx-class')!;
    runWithEffect(() => {
      const res = evaluateExpression(expr, state, { $el: el });
      if (typeof res === 'object' && res !== null) {
        for (const [className, condition] of Object.entries(res)) {
          const classList = className.split(/\s+/).filter(Boolean);
          if (condition) {
            el.classList.add(...classList);
          } else {
            el.classList.remove(...classList);
          }
        }
      } else if (typeof res === 'string') {
        if ((el as any)._prevDynamicClass) {
          el.classList.remove(...(el as any)._prevDynamicClass.split(/\s+/).filter(Boolean));
        }
        (el as any)._prevDynamicClass = res;
        el.classList.add(...res.split(/\s+/).filter(Boolean));
      }
    });
  });

  // hx-style
  const styleEls = Array.from(rootEl.querySelectorAll ? rootEl.querySelectorAll('[hx-style]') : []) as HTMLElement[];
  if (rootEl.hasAttribute && rootEl.hasAttribute('hx-style')) styleEls.unshift(rootEl);

  styleEls.forEach(el => {
    const expr = el.getAttribute('hx-style')!;
    runWithEffect(() => {
      const res = evaluateExpression(expr, state, { $el: el });
      if (typeof res === 'object' && res !== null) {
        for (const [prop, val] of Object.entries(res)) {
          (el.style as any)[prop] = val;
        }
      }
    });
  });

  // :attr or hx-bind:attr
  const allEls = Array.from(rootEl.querySelectorAll ? rootEl.querySelectorAll('*') : []) as HTMLElement[];
  if (rootEl.nodeType === 1) allEls.unshift(rootEl);

  allEls.forEach(el => {
    if (!el.attributes) return;
    for (const attr of Array.from(el.attributes)) {
      let attrName: string | null = null;
      if (attr.name.startsWith(':')) {
        attrName = attr.name.slice(1);
      } else if (attr.name.startsWith('hx-bind:')) {
        attrName = attr.name.slice(8);
      }

      if (attrName) {
        const expr = attr.value;
        runWithEffect(() => {
          const val = evaluateExpression(expr, state, { $el: el });
          if (val === false || val === null || val === undefined) {
            el.removeAttribute(attrName!);
          } else if (val === true) {
            el.setAttribute(attrName!, '');
          } else {
            el.setAttribute(attrName!, String(val));
          }
        });
      }
    }
  });

  // hx-model
  const modelEls = Array.from(rootEl.querySelectorAll ? rootEl.querySelectorAll('[hx-model]') : []) as (HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)[];
  if (rootEl.hasAttribute && rootEl.hasAttribute('hx-model')) modelEls.unshift(rootEl as any);

  modelEls.forEach(el => {
    const modelAttr = el.getAttribute('hx-model')!;
    const parts = modelAttr.split('.');
    const propPath = parts[0];
    const modifiers = parts.slice(1);

    const isLazy = modifiers.includes('lazy');
    const isNumber = modifiers.includes('number') || (el as HTMLInputElement).type === 'number';
    const isTrim = modifiers.includes('trim');

    runWithEffect(() => {
      const val = evaluateExpression(propPath, state, { $el: el });
      if ((el as HTMLInputElement).type === 'checkbox') {
        if (Array.isArray(val)) {
          (el as HTMLInputElement).checked = val.includes(el.value);
        } else {
          (el as HTMLInputElement).checked = Boolean(val);
        }
      } else if ((el as HTMLInputElement).type === 'radio') {
        (el as HTMLInputElement).checked = el.value === String(val);
      } else {
        if (el.value !== String(val !== undefined && val !== null ? val : '')) {
          el.value = val !== undefined && val !== null ? String(val) : '';
        }
      }
    });

    const isInputEl = el instanceof HTMLInputElement;
    const eventName = (isInputEl && (el.type === 'checkbox' || el.type === 'radio')) || isLazy || el.tagName === 'SELECT' ? 'change' : 'input';

    el.addEventListener(eventName, () => {
      let val: any;
      if (isInputEl && el.type === 'checkbox') {
        const current = evaluateExpression(propPath, state, { $el: el });
        if (Array.isArray(current)) {
          val = el.checked ? [...current, el.value] : current.filter(x => x !== el.value);
        } else {
          val = el.checked;
        }
      } else if (isInputEl && el.type === 'radio') {
        val = el.value;
      } else {
        val = el.value;
        if (isTrim) val = val.trim();
        if (isNumber) {
          const num = parseFloat(val);
          val = isNaN(num) ? val : num;
        }
      }

      executeAction(`${propPath} = $eventValue`, state, { $el: el, $eventValue: val });
    });
  });
}

function bindEvents(rootEl: HTMLElement, state: any): void {
  const allEls = Array.from(rootEl.querySelectorAll ? rootEl.querySelectorAll('*') : []) as HTMLElement[];
  if (rootEl.nodeType === 1) allEls.unshift(rootEl);

  allEls.forEach(el => {
    if (!el.attributes) return;

    if (el.hasAttribute('hx-action') && !(el as any)._hxActionAttached) {
      (el as any)._hxActionAttached = true;
      const expr = el.getAttribute('hx-action')!;
      el.addEventListener('click', (e) => {
        executeAction(expr, state, { $el: el, $event: e });
      });
    }

    if (el.hasAttribute('hx-action-dblclick') && !(el as any)._hxActionDblAttached) {
      (el as any)._hxActionDblAttached = true;
      const expr = el.getAttribute('hx-action-dblclick')!;
      el.addEventListener('dblclick', (e) => {
        executeAction(expr, state, { $el: el, $event: e });
      });
    }

    for (const attr of Array.from(el.attributes)) {
      let eventDecl: string | null = null;
      if (attr.name.startsWith('hx-on:')) {
        eventDecl = attr.name.slice(6);
      } else if (attr.name.startsWith('@')) {
        eventDecl = attr.name.slice(1);
      }

      if (eventDecl) {
        const parts = eventDecl.split('.');
        const eventName = parts[0];
        const modifiers = parts.slice(1);
        const expr = attr.value;

        let targetElement: EventTarget = el;
        if (modifiers.includes('window')) targetElement = window;
        if (modifiers.includes('document')) targetElement = document;

        let handler: EventListener = (e: Event) => {
          if (modifiers.includes('prevent')) e.preventDefault();
          if (modifiers.includes('stop')) e.stopPropagation();
          if (modifiers.includes('self') && e.target !== el) return;

          if (e instanceof KeyboardEvent) {
            const keyModifiers = ['enter', 'escape', 'space', 'tab', 'arrow-up', 'arrow-down', 'arrow-left', 'arrow-right', 'delete', 'backspace'];
            for (const mod of modifiers) {
              if (keyModifiers.includes(mod)) {
                const normalizedKey = e.key.toLowerCase().replace(/_/g, '-');
                if (normalizedKey !== mod) return;
              }
            }
          }

          if (modifiers.includes('outside')) {
            if (el.contains(e.target as Node)) return;
          }

          executeAction(expr, state, { $el: el, $event: e });
        };

        const debounceMod = modifiers.find(m => m.startsWith('debounce'));
        if (debounceMod) {
          const timeMatch = debounceMod.match(/\d+/);
          const delay = timeMatch ? parseInt(timeMatch[0], 10) : 250;
          let timeout: any;
          const originalHandler = handler;
          handler = (e: Event) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => originalHandler(e), delay);
          };
        }

        const throttleMod = modifiers.find(m => m.startsWith('throttle'));
        if (throttleMod) {
          const timeMatch = throttleMod.match(/\d+/);
          const delay = timeMatch ? parseInt(timeMatch[0], 10) : 250;
          let lastRun = 0;
          const originalHandler = handler;
          handler = (e: Event) => {
            const now = Date.now();
            if (now - lastRun >= delay) {
              lastRun = now;
              originalHandler(e);
            }
          };
        }

        const once = modifiers.includes('once');
        targetElement.addEventListener(eventName, handler, { once });
      }
    }
  });
}

// Global Public HxBolt API
export const HxBolt: HxBoltAPI = {
  store<T extends object = Record<string, any>>(name: string, initialValue?: T): ReactiveProxy<T> {
    if (initialValue !== undefined) {
      stores[name] = createReactiveObject(initialValue);
    }
    return stores[name] as ReactiveProxy<T>;
  },
  getStore<T extends object = Record<string, any>>(name: string): ReactiveProxy<T> | undefined {
    return stores[name] as ReactiveProxy<T> | undefined;
  },
  getState<T extends object = Record<string, any>>(el: HTMLElement): ReactiveProxy<T> | undefined {
    return elementStates.get(el) as ReactiveProxy<T> | undefined;
  },
  init(root: HTMLElement | Document) {
    const scopeRoots = (root.querySelectorAll ? root.querySelectorAll('[hx-state], [hx-ext="reactive"]') : []) as NodeListOf<HTMLElement>;
    scopeRoots.forEach(initComponent);
    if ((root as HTMLElement).hasAttribute && ((root as HTMLElement).hasAttribute('hx-state') || (root as HTMLElement).getAttribute('hx-ext') === 'reactive')) {
      initComponent(root as HTMLElement);
    }
  }
};

if (typeof window !== 'undefined') {
  window.HxBolt = HxBolt;

  // Server-driven sync
  document.body.addEventListener('hxStateUpdate', function (evt: any) {
    const detail = evt.detail;
    if (detail && detail.target && detail.state) {
      const el = document.querySelector(detail.target) as HTMLElement;
      if (el && elementStates.has(el)) {
        const state = elementStates.get(el)!;
        for (const [key, value] of Object.entries(detail.state)) {
          (state as any)[key] = value;
        }
      }
    }
  });

  document.body.addEventListener('hxStoreUpdate', function (evt: any) {
    const detail = evt.detail;
    if (detail && detail.store && detail.state) {
      const store = stores[detail.store];
      if (store) {
        for (const [key, value] of Object.entries(detail.state)) {
          (store as any)[key] = value;
        }
      }
    }
  });

  // HTMX Extension Registration
  if (typeof (window as any).htmx !== 'undefined') {
    (window as any).htmx.defineExtension('reactive', {
      onEvent: function (name: string, evt: any) {
        if (name === 'htmx:beforeProcessNode' || name === 'htmx:afterProcessNode') {
          const elt = evt.detail.elt;
          if (elt && elt.nodeType === 1) {
            if (elt.hasAttribute('hx-state') || elt.getAttribute('hx-ext') === 'reactive') {
              initComponent(elt);
            }
          }
        }
      }
    });
  }

  // ScaleUI: Fluid Resizing
  const scaleUiResizer = new ResizeObserver(entries => {
    for (const entry of entries) {
      const el = entry.target as HTMLElement;
      if (el.getAttribute('scaleui') === '1') {
        if (!(el as any)._baseWidth) {
          (el as any)._baseWidth = el.offsetWidth;
          const style = window.getComputedStyle(el);
          (el as any)._baseFontSize = parseFloat(style.fontSize);
          (el as any)._baseGap = parseFloat(style.gap) || 0;
        }

        const ratio = el.offsetWidth / ((el as any)._baseWidth || 1);
        el.style.setProperty('--scaleui-ratio', String(ratio));

        if ((el as any)._baseFontSize) el.style.fontSize = ((el as any)._baseFontSize * ratio) + 'px';
        if ((el as any)._baseGap) el.style.gap = ((el as any)._baseGap * ratio) + 'px';
      }
    }
  });

  function handleScaleUI(el: HTMLElement): void {
    if (el.getAttribute('scaleui') === '1') {
      el.style.resize = 'both';
      el.style.overflow = 'auto';
      scaleUiResizer.observe(el);
    } else {
      el.style.resize = '';
      el.style.overflow = '';
      el.style.fontSize = '';
      el.style.gap = '';
      el.style.removeProperty('--scaleui-ratio');
      scaleUiResizer.unobserve(el);
      delete (el as any)._baseWidth;
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[hx-state]').forEach(el => initComponent(el as HTMLElement));
    document.querySelectorAll('[scaleui]').forEach(el => handleScaleUI(el as HTMLElement));

    new MutationObserver(mutations => {
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'scaleui') {
          handleScaleUI(m.target as HTMLElement);
        } else if (m.type === 'childList') {
          m.addedNodes.forEach(node => {
            if (node.nodeType === 1) {
              const el = node as HTMLElement;
              if (el.hasAttribute('scaleui')) handleScaleUI(el);
              el.querySelectorAll('[scaleui]').forEach(child => handleScaleUI(child as HTMLElement));
              if (el.hasAttribute('hx-state')) initComponent(el);
              el.querySelectorAll('[hx-state]').forEach(child => initComponent(child as HTMLElement));
            }
          });
        }
      }
    }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['scaleui', 'hx-state'] });
  });
}
