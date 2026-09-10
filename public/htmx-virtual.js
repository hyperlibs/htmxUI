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
    if (typeof window !== "undefined") {
      window.addEventListener("resize", () => this.onScroll(), { passive: true });
    }
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

class VirtualScroller2D {
  container;
  totalRows;
  totalCols;
  rowHeight;
  colWidth;
  bufferRows;
  bufferCols;
  pinnedLeft;
  pinnedRight;
  pinnedTop;
  pinnedBottom;
  renderCell;
  topSpacer;
  bottomSpacer;
  leftSpacer;
  rightSpacer;
  gridBody;
  isTicking = false;
  resizeHandler;
  constructor(container, options) {
    this.container = container;
    this.totalRows = options?.totalRows ?? parseInt(container.getAttribute("hx-virtual-rows") || "0", 10);
    this.totalCols = options?.totalCols ?? parseInt(container.getAttribute("hx-virtual-cols") || "0", 10);
    this.rowHeight = options?.rowHeight ?? parseInt(container.getAttribute("hx-virtual-row-height") || "32", 10);
    this.colWidth = options?.colWidth ?? parseInt(container.getAttribute("hx-virtual-col-width") || "100", 10);
    this.bufferRows = options?.bufferRows ?? parseInt(container.getAttribute("hx-virtual-buffer-rows") || "4", 10);
    this.bufferCols = options?.bufferCols ?? parseInt(container.getAttribute("hx-virtual-buffer-cols") || "2", 10);
    this.pinnedLeft = options?.pinnedLeft ?? parseInt(container.getAttribute("hx-pinned-left") || "0", 10);
    this.pinnedRight = options?.pinnedRight ?? parseInt(container.getAttribute("hx-pinned-right") || "0", 10);
    this.pinnedTop = options?.pinnedTop ?? parseInt(container.getAttribute("hx-pinned-top") || "0", 10);
    this.pinnedBottom = options?.pinnedBottom ?? parseInt(container.getAttribute("hx-pinned-bottom") || "0", 10);
    this.renderCell = options?.renderCell;
    this.container.style.overflow = "auto";
    this.container.style.position = "relative";
    this.topSpacer = document.createElement("div");
    this.topSpacer.className = "hx-virtual-2d-top-spacer";
    this.bottomSpacer = document.createElement("div");
    this.bottomSpacer.className = "hx-virtual-2d-bottom-spacer";
    this.leftSpacer = document.createElement("div");
    this.leftSpacer.className = "hx-virtual-2d-left-spacer";
    this.rightSpacer = document.createElement("div");
    this.rightSpacer.className = "hx-virtual-2d-right-spacer";
    this.gridBody = document.createElement("div");
    this.gridBody.className = "hx-virtual-2d-body";
    this.container.appendChild(this.topSpacer);
    this.container.appendChild(this.gridBody);
    this.container.appendChild(this.bottomSpacer);
    this.container.addEventListener("scroll", () => this.onScroll(), { passive: true });
    this.resizeHandler = () => this.onScroll();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", this.resizeHandler, { passive: true });
    }
    this.update();
  }
  getRowH(rowIdx) {
    return typeof this.rowHeight === "function" ? this.rowHeight(rowIdx) : this.rowHeight;
  }
  getColW(colIdx) {
    return typeof this.colWidth === "function" ? this.colWidth(colIdx) : this.colWidth;
  }
  setDimensions(rows, cols) {
    this.totalRows = rows;
    this.totalCols = cols;
    this.update();
  }
  setCellRenderer(renderer) {
    this.renderCell = renderer;
    this.update();
  }
  scrollTo(row, col) {
    const rowH = this.getRowH(0);
    const colW = this.getColW(0);
    this.container.scrollTop = row * rowH;
    this.container.scrollLeft = col * colW;
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
    if (this.totalRows === 0 || this.totalCols === 0) {
      this.topSpacer.style.height = "0px";
      this.bottomSpacer.style.height = "0px";
      this.gridBody.innerHTML = "";
      return;
    }
    const scrollTop = this.container.scrollTop;
    const scrollLeft = this.container.scrollLeft;
    const vpHeight = this.container.clientHeight || 400;
    const vpWidth = this.container.clientWidth || 800;
    const rowH = this.getRowH(0);
    const colW = this.getColW(0);
    const startRow = Math.max(this.pinnedTop, Math.floor(scrollTop / rowH) - this.bufferRows);
    const endRow = Math.min(this.totalRows - this.pinnedBottom, Math.ceil((scrollTop + vpHeight) / rowH) + this.bufferRows);
    const startCol = Math.max(this.pinnedLeft, Math.floor(scrollLeft / colW) - this.bufferCols);
    const endCol = Math.min(this.totalCols - this.pinnedRight, Math.ceil((scrollLeft + vpWidth) / colW) + this.bufferCols);
    const topHeight = startRow * rowH;
    const bottomHeight = Math.max(0, (this.totalRows - endRow) * rowH);
    this.topSpacer.style.height = `${topHeight}px`;
    this.bottomSpacer.style.height = `${bottomHeight}px`;
    const fragment = document.createDocumentFragment();
    for (let r = startRow;r < endRow; r++) {
      const rowEl = document.createElement("div");
      rowEl.className = "hx-virtual-2d-row flex";
      rowEl.style.height = `${this.getRowH(r)}px`;
      rowEl.setAttribute("data-row", String(r));
      for (let c = 0;c < this.pinnedLeft; c++) {
        rowEl.appendChild(this.createCellElement(r, c, true, "left"));
      }
      if (startCol > this.pinnedLeft) {
        const spacer = document.createElement("div");
        spacer.style.width = `${(startCol - this.pinnedLeft) * colW}px`;
        spacer.style.flexShrink = "0";
        rowEl.appendChild(spacer);
      }
      for (let c = startCol;c < endCol; c++) {
        rowEl.appendChild(this.createCellElement(r, c, false));
      }
      if (this.totalCols - this.pinnedRight > endCol) {
        const spacer = document.createElement("div");
        spacer.style.width = `${(this.totalCols - this.pinnedRight - endCol) * colW}px`;
        spacer.style.flexShrink = "0";
        rowEl.appendChild(spacer);
      }
      for (let c = this.totalCols - this.pinnedRight;c < this.totalCols; c++) {
        rowEl.appendChild(this.createCellElement(r, c, true, "right"));
      }
      fragment.appendChild(rowEl);
    }
    this.gridBody.innerHTML = "";
    this.gridBody.appendChild(fragment);
  }
  createCellElement(row, col, isPinned = false, pinSide = "left") {
    const cellEl = document.createElement("div");
    const w = this.getColW(col);
    cellEl.style.width = `${w}px`;
    cellEl.style.minWidth = `${w}px`;
    cellEl.style.flexShrink = "0";
    cellEl.setAttribute("data-row", String(row));
    cellEl.setAttribute("data-col", String(col));
    cellEl.className = `hx-virtual-2d-cell border-b border-r border-border p-1 text-xs select-none truncate ${isPinned ? `sticky ${pinSide === "left" ? "left-0" : "right-0"} z-10 bg-background/95 backdrop-blur font-medium` : ""}`;
    if (this.renderCell) {
      const rendered = this.renderCell(row, col);
      if (typeof rendered === "string") {
        cellEl.innerHTML = rendered;
      } else if (rendered instanceof HTMLElement) {
        cellEl.appendChild(rendered);
      }
    } else {
      cellEl.textContent = `${row}:${col}`;
    }
    return cellEl;
  }
  destroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.resizeHandler);
    }
  }
}
function initVirtual(root) {
  const virtualContainers = root.querySelectorAll ? root.querySelectorAll("[hx-virtual]:not([hx-virtual-2d])") : [];
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
  const virtual2DContainers = root.querySelectorAll ? root.querySelectorAll("[hx-virtual-2d]") : [];
  virtual2DContainers.forEach((container) => {
    if (container._hxVirtual2D)
      return;
    const scroller2D = new VirtualScroller2D(container);
    container._hxVirtual2D = scroller2D;
  });
}
var HxVirtual = {
  VirtualScroller,
  VirtualScroller2D,
  init: initVirtual
};
if (typeof window !== "undefined") {
  window.HxVirtual = HxVirtual;
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
  VirtualScroller2D,
  VirtualScroller,
  HxVirtual
};
