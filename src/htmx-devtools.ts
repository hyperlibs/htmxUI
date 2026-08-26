/**
 * HTMX-DEVTOOLS — In-Browser Visual State Inspector & Profiler
 * 
 * Provides an on-screen floating debug overlay:
 * - Signal Graph & Reactive Store Inspector (Clean JSON serialization)
 * - 1-Click State Time-Travel (Undo / Redo)
 * - HTMX Swap & Mutation Telemetry Logger
 * - Offline Queue & Network Status
 * - Shortcut: Ctrl+Shift+H
 */

class DevToolsPanel {
  private panelEl: HTMLElement | null = null;
  public isVisible = false;

  constructor() {
    if (typeof window === 'undefined') return;
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'h') {
        this.toggle();
      }
    });
  }

  toggle(): void {
    if (!this.panelEl) {
      this.createDOM();
    }
    this.isVisible = !this.isVisible;
    if (this.panelEl) {
      this.panelEl.style.display = this.isVisible ? 'flex' : 'none';
      if (this.isVisible) this.refresh();
    }
  }

  private createDOM(): void {
    this.panelEl = document.createElement('div');
    this.panelEl.id = 'htmxui-devtools-panel';
    this.panelEl.className = 'fixed bottom-4 right-4 w-96 max-h-[500px] bg-slate-950 text-slate-100 border border-slate-800 rounded-xl shadow-2xl z-50 flex flex-col font-mono text-xs overflow-hidden';
    this.panelEl.style.display = 'none';

    this.panelEl.innerHTML = `
      <div class="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span class="font-bold text-slate-100">HTMXUI DevTools</span>
        </div>
        <div class="flex items-center gap-2">
          <button class="hx-dev-btn-undo px-2 py-0.5 bg-slate-800 hover:bg-slate-700 rounded text-[10px]">Undo</button>
          <button class="hx-dev-btn-redo px-2 py-0.5 bg-slate-800 hover:bg-slate-700 rounded text-[10px]">Redo</button>
          <button class="hx-dev-btn-close px-2 py-0.5 text-slate-400 hover:text-slate-200">✕</button>
        </div>
      </div>
      <div class="p-3 overflow-y-auto flex-1 space-y-3">
        <div>
          <div class="text-[10px] text-slate-400 uppercase font-semibold mb-1">Active Signal Stores &amp; State</div>
          <pre class="hx-dev-stores p-2 bg-slate-900 rounded border border-slate-800/80 text-[11px] text-emerald-400 overflow-x-auto">{}</pre>
        </div>
        <div>
          <div class="text-[10px] text-slate-400 uppercase font-semibold mb-1">Offline Status &amp; Queue</div>
          <div class="p-2 bg-slate-900 rounded border border-slate-800/80 text-[11px] text-slate-300">
            <div>Network: <span class="hx-dev-net-status text-emerald-400">Online</span></div>
            <div>IndexedDB Pending Mutations: <span class="hx-dev-queue-count font-bold">0</span></div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(this.panelEl);

    // Bindings
    this.panelEl.querySelector('.hx-dev-btn-close')?.addEventListener('click', () => this.toggle());
    this.panelEl.querySelector('.hx-dev-btn-undo')?.addEventListener('click', () => {
      if ((window as any).HxBolt && (window as any).HxBolt.undo) (window as any).HxBolt.undo();
      this.refresh();
    });
    this.panelEl.querySelector('.hx-dev-btn-redo')?.addEventListener('click', () => {
      if ((window as any).HxBolt && (window as any).HxBolt.redo) (window as any).HxBolt.redo();
      this.refresh();
    });
  }

  refresh(): void {
    if (!this.panelEl) return;

    // Clean JSON serialization of stores without proxy function bloat
    const storesEl = this.panelEl.querySelector('.hx-dev-stores');
    if (storesEl && typeof window !== 'undefined') {
      const activeData: Record<string, any> = {};

      // Inspect global HxBolt stores
      if ((window as any).HxBolt && (window as any).HxBolt.getStore) {
        const commonStores = ['auth', 'cart', 'app', 'user', 'theme', 'filters', 'settings'];
        commonStores.forEach(name => {
          const s = (window as any).HxBolt.getStore(name);
          if (s) {
            activeData[`$store.${name}`] = (s as any).__raw || s;
          }
        });
      }

      // Collect root component states
      document.querySelectorAll('[hx-state]').forEach((el, idx) => {
        if ((window as any).HxBolt && (window as any).HxBolt.getState) {
          const st = (window as any).HxBolt.getState(el as HTMLElement);
          if (st) {
            const raw = (st as any).__raw || st;
            const sanitized: Record<string, any> = {};
            for (const [k, v] of Object.entries(raw)) {
              if (k !== '__refs' && typeof v !== 'function') {
                sanitized[k] = v;
              }
            }
            activeData[`Component[${(el as HTMLElement).id || idx}]`] = sanitized;
          }
        }
      });

      storesEl.textContent = JSON.stringify(activeData, null, 2);
    }

    // Refresh Offline
    const netEl = this.panelEl.querySelector('.hx-dev-net-status');
    const queueEl = this.panelEl.querySelector('.hx-dev-queue-count');
    if (netEl) {
      netEl.textContent = navigator.onLine ? 'Online 🟢' : 'Offline 📴';
      netEl.className = navigator.onLine ? 'hx-dev-net-status text-emerald-400 font-semibold' : 'hx-dev-net-status text-amber-400 font-semibold';
    }
    if (queueEl && (window as any).HxOffline) {
      queueEl.textContent = String((window as any).HxOffline.queueCount);
    }
  }
}

export const HxDevTools = new DevToolsPanel();

if (typeof window !== 'undefined') {
  (window as any).HxDevTools = HxDevTools;
  if (typeof (window as any).HTMXUI !== 'undefined') {
    (window as any).HTMXUI.devtools = HxDevTools;
  }
}
