// src/htmx-virtual.ts
class VirtualScroller {
  container;
  contentWrapper;
  topSpacer;
  bottomSpacer;
  itemHeight;
  buffer;
  items = [];
  renderedIndices = new Set;
  template = null;
  isTicking = false;
  constructor(container, options) {
    this.container = container;
    this.itemHeight = options?.itemHeight || parseInt(container.getAttribute("hx-virtual-height") || "40", 10);
    this.buffer = options?.buffer || parseInt(container.getAttribute("hx-virtual-buffer") || "8", 10);
    this.container.style.overflowY = "auto";
    this.container.style.position = "relative";
    this.template = container.querySelector("template[hx-virtual-item], template");
    this.contentWrapper = document.createElement("div");
    this.contentWrapper.className = "hx-virtual-content";
    this.topSpacer = document.createElement("div");
    this.topSpacer.className = "hx-virtual-top-spacer";
    this.bottomSpacer = document.createElement("div");
    this.bottomSpacer.className = "hx-virtual-bottom-spacer";
    if (this.template) {
      this.container.appendChild(this.topSpacer);
      this.container.appendChild(this.contentWrapper);
      this.container.appendChild(this.bottomSpacer);
    }
    this.container.addEventListener("scroll", () => this.onScroll(), { passive: true });
    window.addEventListener("resize", () => this.onScroll(), { passive: true });
  }
  setItems(items) {
    this.items = items;
    this.update();
  }
  onScroll() {
    if (!this.isTicking) {
      this.isTicking = true;
      requestAnimationFrame(() => {
        this.update();
        this.isTicking = false;
      });
    }
  }
  update() {
    const totalCount = this.items.length;
    if (totalCount === 0) {
      this.topSpacer.style.height = "0px";
      this.bottomSpacer.style.height = "0px";
      this.contentWrapper.innerHTML = "";
      return;
    }
    const scrollTop = this.container.scrollTop;
    const viewportHeight = this.container.clientHeight || 400;
    const startIndex = Math.max(0, Math.floor(scrollTop / this.itemHeight) - this.buffer);
    const endIndex = Math.min(totalCount, Math.ceil((scrollTop + viewportHeight) / this.itemHeight) + this.buffer);
    const topHeight = startIndex * this.itemHeight;
    const bottomHeight = Math.max(0, (totalCount - endIndex) * this.itemHeight);
    this.topSpacer.style.height = `${topHeight}px`;
    this.bottomSpacer.style.height = `${bottomHeight}px`;
    this.renderSlice(startIndex, endIndex);
  }
  renderSlice(startIndex, endIndex) {
    if (!this.template)
      return;
    const fragment = document.createDocumentFragment();
    for (let i = startIndex;i < endIndex; i++) {
      const item = this.items[i];
      const clone = this.template.content.cloneNode(true);
      const rootEl = clone.firstElementChild;
      if (rootEl) {
        rootEl.setAttribute("data-virtual-index", String(i));
        rootEl.style.height = `${this.itemHeight}px`;
        if (typeof window.HxBolt !== "undefined") {
          const itemScope = { item, index: i, idx: i };
          rootEl.querySelectorAll("[hx-text]").forEach((textEl) => {
            const expr = textEl.getAttribute("hx-text");
            if (expr && expr.startsWith("item.")) {
              const prop = expr.replace("item.", "");
              textEl.textContent = item[prop] !== undefined ? item[prop] : "";
            } else if (expr === "index" || expr === "idx") {
              textEl.textContent = String(i + 1);
            }
          });
        }
        fragment.appendChild(clone);
      }
    }
    this.contentWrapper.innerHTML = "";
    this.contentWrapper.appendChild(fragment);
  }
}
function initVirtual(root) {
  const virtualContainers = root.querySelectorAll ? root.querySelectorAll("[hx-virtual]") : [];
  virtualContainers.forEach((container) => {
    if (container._hxVirtual)
      return;
    const scroller = new VirtualScroller(container);
    container._hxVirtual = scroller;
    const src = container.getAttribute("hx-virtual-src");
    if (src) {
      fetch(src).then((res) => res.json()).then((data) => scroller.setItems(data)).catch((err) => console.error("[htmx-virtual] Failed to fetch data from:", src, err));
    }
  });
}
if (typeof window !== "undefined") {
  window.HxVirtual = {
    VirtualScroller,
    init: initVirtual
  };
  if (typeof window.htmx !== "undefined") {
    window.htmx.defineExtension("virtual", {
      onEvent: function(name, evt) {
        if (name === "htmx:afterProcessNode") {
          initVirtual(evt.detail.elt);
        }
      }
    });
  }
  document.addEventListener("DOMContentLoaded", () => {
    initVirtual(document.body);
  });
}
export {
  initVirtual,
  VirtualScroller
};
