// src/htmx-offline.ts
var DB_NAME = "HTMXUI_OfflineDB";
var DB_VERSION = 1;
var STORE_NAME = "mutation_queue";

class OfflineManager {
  db = null;
  isOnline = typeof navigator !== "undefined" ? navigator.onLine : true;
  queueCount = 0;
  constructor() {
    if (typeof window === "undefined")
      return;
    this.initDB();
    this.bindNetworkListeners();
    this.bindHTMXInterceptors();
  }
  initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "id" });
        }
      };
      request.onsuccess = (e) => {
        this.db = e.target.result;
        this.updateQueueCount();
        resolve(this.db);
      };
      request.onerror = (e) => reject(e);
    });
  }
  bindNetworkListeners() {
    window.addEventListener("online", () => {
      this.isOnline = true;
      this.updateIndicators();
      console.log("[htmx-offline] \uD83C\uDF10 Connection restored. Replaying queued mutations...");
      this.replayQueue();
    });
    window.addEventListener("offline", () => {
      this.isOnline = false;
      this.updateIndicators();
      console.warn("[htmx-offline] \uD83D\uDCF4 Offline mode activated. Mutations will be stored locally.");
    });
  }
  bindHTMXInterceptors() {
    if (typeof window.htmx === "undefined")
      return;
    document.body.addEventListener("htmx:sendError", (evt) => {
      const detail = evt.detail;
      if (detail && detail.requestConfig) {
        const cfg = detail.requestConfig;
        if (cfg.verb && cfg.verb.toUpperCase() !== "GET") {
          this.queueRequest({
            id: `mut_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            url: cfg.path,
            method: cfg.verb.toUpperCase(),
            headers: cfg.headers || {},
            body: typeof cfg.parameters === "string" ? cfg.parameters : JSON.stringify(cfg.parameters || {}),
            timestamp: Date.now(),
            retries: 0
          });
        }
      }
    });
  }
  async queueRequest(mutation) {
    if (!this.db)
      await this.initDB();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      store.put(mutation);
      tx.oncomplete = () => {
        console.log("[htmx-offline] \uD83D\uDCBE Mutation queued in IndexedDB:", mutation);
        this.updateQueueCount();
        this.updateIndicators();
        resolve();
      };
      tx.onerror = (e) => reject(e);
    });
  }
  async updateQueueCount() {
    if (!this.db)
      return 0;
    return new Promise((resolve) => {
      const tx = this.db.transaction(STORE_NAME, "readonly");
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
  async replayQueue() {
    if (!this.db || !this.isOnline)
      return;
    const tx = this.db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const req = store.getAll();
    req.onsuccess = async () => {
      const mutations = req.result;
      if (mutations.length === 0)
        return;
      console.log(`[htmx-offline] Replaying ${mutations.length} mutations...`);
      for (const item of mutations) {
        try {
          const res = await fetch(item.url, {
            method: item.method,
            headers: {
              ...item.headers,
              "HX-Request": "true",
              "HX-Replayed": "true"
            },
            body: item.body
          });
          if (res.ok) {
            const deleteTx = this.db.transaction(STORE_NAME, "readwrite");
            deleteTx.objectStore(STORE_NAME).delete(item.id);
            console.log("[htmx-offline] ✅ Replayed & synced mutation:", item.id);
          }
        } catch (e) {
          console.warn("[htmx-offline] Retry failed for mutation:", item.id);
        }
      }
      this.updateQueueCount();
    };
  }
  updateIndicators() {
    document.querySelectorAll("[hx-offline-indicator]").forEach((el) => {
      if (!this.isOnline) {
        el.style.display = "";
      } else {
        el.style.display = "none";
      }
    });
    document.querySelectorAll(".hx-offline-queue-count").forEach((el) => {
      el.textContent = String(this.queueCount);
    });
  }
}
var HxOffline = new OfflineManager;
if (typeof window !== "undefined") {
  window.HxOffline = HxOffline;
  if (typeof window.HTMXUI !== "undefined") {
    window.HTMXUI.offline = HxOffline;
  }
}
export {
  HxOffline
};
