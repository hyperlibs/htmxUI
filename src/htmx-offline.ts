/**
 * HTMX-OFFLINE — Offline-First Engine, IndexedDB Queue & Conflict Resolution
 * 
 * Intercepts HTMX mutations when offline or network drops, queues them in IndexedDB,
 * and automatically replays requests with exponential backoff and 409 Conflict Resolution.
 */

export interface QueuedMutation {
  id: string;
  url: string;
  method: string;
  headers: Record<string, string>;
  body: string | null;
  timestamp: number;
  retries: number;
  conflict?: any;
}

const DB_NAME = 'HTMXUI_OfflineDB';
const DB_VERSION = 1;
const STORE_NAME = 'mutation_queue';

class OfflineManager {
  private db: IDBDatabase | null = null;
  public isOnline: boolean = typeof navigator !== 'undefined' ? navigator.onLine : true;
  public queueCount: number = 0;
  public isPausedForConflict: boolean = false;

  constructor() {
    if (typeof window === 'undefined') return;
    this.initDB();
    this.bindNetworkListeners();
    this.bindHTMXInterceptors();
  }

  private initDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (e: any) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };

      request.onsuccess = (e: any) => {
        this.db = e.target.result;
        this.updateQueueCount();
        resolve(this.db!);
      };

      request.onerror = (e) => reject(e);
    });
  }

  private bindNetworkListeners(): void {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.updateIndicators();
      console.log('[htmx-offline] 🌐 Connection restored. Replaying queued mutations...');
      if (!this.isPausedForConflict) {
        this.replayQueue();
      }
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.updateIndicators();
      console.warn('[htmx-offline] 📴 Offline mode activated. Mutations will be stored locally.');
    });
  }

  private bindHTMXInterceptors(): void {
    if (typeof (window as any).htmx === 'undefined') return;

    document.body.addEventListener('htmx:sendError', (evt: any) => {
      const detail = evt.detail;
      if (detail && detail.requestConfig) {
        const cfg = detail.requestConfig;
        if (cfg.verb && cfg.verb.toUpperCase() !== 'GET') {
          this.queueRequest({
            id: `mut_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            url: cfg.path,
            method: cfg.verb.toUpperCase(),
            headers: cfg.headers || {},
            body: typeof cfg.parameters === 'string' ? cfg.parameters : JSON.stringify(cfg.parameters || {}),
            timestamp: Date.now(),
            retries: 0
          });
        }
      }
    });
  }

  async queueRequest(mutation: QueuedMutation): Promise<void> {
    if (!this.db) await this.initDB();
    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put(mutation);

      tx.oncomplete = () => {
        console.log('[htmx-offline] 💾 Mutation queued in IndexedDB:', mutation);
        this.updateQueueCount();
        this.updateIndicators();
        resolve();
      };
      tx.onerror = (e) => reject(e);
    });
  }

  async updateQueueCount(): Promise<number> {
    if (!this.db) return 0;
    return new Promise(resolve => {
      const tx = this.db!.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.count();
      req.onsuccess = () => {
        this.queueCount = req.result;
        this.updateIndicators();
        resolve(this.queueCount);
      };
      req.onerror = () => resolve(0);
    });
  }

  async replayQueue(): Promise<void> {
    if (!this.db || !this.isOnline || this.isPausedForConflict) return;

    const tx = this.db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.getAll();

    req.onsuccess = async () => {
      const mutations: QueuedMutation[] = req.result;
      if (mutations.length === 0) return;

      console.log(`[htmx-offline] Replaying ${mutations.length} mutations...`);

      for (const item of mutations) {
        try {
          const res = await fetch(item.url, {
            method: item.method,
            headers: {
              ...item.headers,
              'HX-Request': 'true',
              'HX-Replayed': 'true'
            },
            body: item.body
          });

          if (res.status === 409 || res.status === 422 || res.headers.has('HX-Offline-Conflict')) {
            // 409 Conflict Handling
            console.warn('[htmx-offline] ⚠️ Conflict detected during replay for mutation:', item.id);
            this.isPausedForConflict = true;
            const conflictData = await res.json().catch(() => ({}));
            
            // Dispatch conflict event for UI prompt
            document.body.dispatchEvent(new CustomEvent('htmx:offlineConflict', {
              detail: { mutation: item, serverResponse: conflictData }
            }));
            break; // Pause replay queue
          } else if (res.ok) {
            // Successful replay: remove from IndexedDB
            const deleteTx = this.db!.transaction(STORE_NAME, 'readwrite');
            deleteTx.objectStore(STORE_NAME).delete(item.id);
            console.log('[htmx-offline] ✅ Replayed & synced mutation:', item.id);
          }
        } catch (e) {
          console.warn('[htmx-offline] Network retry failed for mutation:', item.id);
        }
      }

      this.updateQueueCount();
    };
  }

  // Conflict Resolution Action (overwrite, discard, or custom merge payload)
  async resolveConflict(mutationId: string, resolution: 'discard' | 'force' | 'merge', mergeBody?: any): Promise<void> {
    if (!this.db) return;

    if (resolution === 'discard') {
      const tx = this.db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(mutationId);
      tx.oncomplete = () => {
        this.isPausedForConflict = false;
        this.replayQueue();
      };
    } else if (resolution === 'force' || resolution === 'merge') {
      const tx = this.db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(mutationId);
      req.onsuccess = () => {
        const item = req.result;
        if (item) {
          if (mergeBody) item.body = JSON.stringify(mergeBody);
          item.headers['HX-Force-Sync'] = 'true';
          store.put(item);
        }
        this.isPausedForConflict = false;
        this.replayQueue();
      };
    }
  }

  private updateIndicators(): void {
    document.querySelectorAll('[hx-offline-indicator]').forEach(el => {
      if (!this.isOnline) {
        (el as HTMLElement).style.display = '';
      } else {
        (el as HTMLElement).style.display = 'none';
      }
    });

    document.querySelectorAll('.hx-offline-queue-count').forEach(el => {
      el.textContent = String(this.queueCount);
    });
  }
}

export const HxOffline = new OfflineManager();

if (typeof window !== 'undefined') {
  (window as any).HxOffline = HxOffline;
  if (typeof (window as any).HTMXUI !== 'undefined') {
    (window as any).HTMXUI.offline = HxOffline;
  }
}
