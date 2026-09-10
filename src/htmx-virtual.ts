import type { VirtualScroll2DOptions, IVirtualScroller2D } from './types';

export interface VirtualScrollOptions {
  itemHeight: number;
  buffer?: number;
  totalItems?: number;
  renderItem?: (index: number, item: any) => HTMLElement | string;
  items?: any[];
}

export class VirtualScroller {
  container: HTMLElement;
  contentWrapper: HTMLElement;
  topSpacer: HTMLElement;
  bottomSpacer: HTMLElement;
  itemHeight: number;
  buffer: number;
  items: any[] = [];
  renderedIndices = new Set<number>();
  template: HTMLTemplateElement | null = null;
  private isTicking = false;

  constructor(container: HTMLElement, options?: Partial<VirtualScrollOptions>) {
    this.container = container;
    this.itemHeight = options?.itemHeight || parseInt(container.getAttribute('hx-virtual-height') || '40', 10);
    this.buffer = options?.buffer || parseInt(container.getAttribute('hx-virtual-buffer') || '8', 10);

    // Setup scroll container styling
    this.container.style.overflowY = 'auto';
    this.container.style.position = 'relative';

    // Find template for row rendering
    this.template = container.querySelector('template[hx-virtual-item], template');

    // Create spacers and content wrapper
    this.contentWrapper = document.createElement('div');
    this.contentWrapper.className = 'hx-virtual-content';
    this.topSpacer = document.createElement('div');
    this.topSpacer.className = 'hx-virtual-top-spacer';
    this.bottomSpacer = document.createElement('div');
    this.bottomSpacer.className = 'hx-virtual-bottom-spacer';

    // Move initial children or template
    if (this.template) {
      this.container.appendChild(this.topSpacer);
      this.container.appendChild(this.contentWrapper);
      this.container.appendChild(this.bottomSpacer);
    }

    this.container.addEventListener('scroll', () => this.onScroll(), { passive: true });
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => this.onScroll(), { passive: true });
    }
  }

  setItems(items: any[]): void {
    this.items = items;
    this.update();
  }

  onScroll(): void {
    if (!this.isTicking) {
      this.isTicking = true;
      requestAnimationFrame(() => {
        this.update();
        this.isTicking = false;
      });
    }
  }

  update(): void {
    const totalCount = this.items.length;
    if (totalCount === 0) {
      this.topSpacer.style.height = '0px';
      this.bottomSpacer.style.height = '0px';
      this.contentWrapper.innerHTML = '';
      return;
    }

    const scrollTop = this.container.scrollTop;
    const viewportHeight = this.container.clientHeight || 400;

    // Calculate visible range
    const startIndex = Math.max(0, Math.floor(scrollTop / this.itemHeight) - this.buffer);
    const endIndex = Math.min(totalCount, Math.ceil((scrollTop + viewportHeight) / this.itemHeight) + this.buffer);

    // Update spacers height
    const topHeight = startIndex * this.itemHeight;
    const bottomHeight = Math.max(0, (totalCount - endIndex) * this.itemHeight);

    this.topSpacer.style.height = `${topHeight}px`;
    this.bottomSpacer.style.height = `${bottomHeight}px`;

    // Render visible slice
    this.renderSlice(startIndex, endIndex);
  }

  private renderSlice(startIndex: number, endIndex: number): void {
    if (!this.template) return;

    const fragment = document.createDocumentFragment();

    for (let i = startIndex; i < endIndex; i++) {
      const item = this.items[i];
      const clone = this.template.content.cloneNode(true) as DocumentFragment;
      const rootEl = clone.firstElementChild as HTMLElement;

      if (rootEl) {
        rootEl.setAttribute('data-virtual-index', String(i));
        rootEl.style.height = `${this.itemHeight}px`;

        // Bind item data if HxBolt is present
        if (typeof (window as any).HxBolt !== 'undefined') {
          rootEl.querySelectorAll('[hx-text]').forEach(textEl => {
            const expr = textEl.getAttribute('hx-text');
            if (expr && expr.startsWith('item.')) {
              const prop = expr.replace('item.', '');
              textEl.textContent = item[prop] !== undefined ? item[prop] : '';
            } else if (expr === 'index' || expr === 'idx') {
              textEl.textContent = String(i + 1);
            }
          });
        }
        fragment.appendChild(clone);
      }
    }

    this.contentWrapper.innerHTML = '';
    this.contentWrapper.appendChild(fragment);
  }
}

// -----------------------------------------------------------------------------
// HxVirtual 2D — Bi-Directional (X + Y) Matrix Viewport Virtualization
// -----------------------------------------------------------------------------

export class VirtualScroller2D implements IVirtualScroller2D {
  container: HTMLElement;
  totalRows: number;
  totalCols: number;
  rowHeight: number | ((rowIdx: number) => number);
  colWidth: number | ((colIdx: number) => number);
  bufferRows: number;
  bufferCols: number;
  pinnedLeft: number;
  pinnedRight: number;
  pinnedTop: number;
  pinnedBottom: number;
  renderCell?: (row: number, col: number) => HTMLElement | string;

  private topSpacer: HTMLElement;
  private bottomSpacer: HTMLElement;
  private leftSpacer: HTMLElement;
  private rightSpacer: HTMLElement;
  private gridBody: HTMLElement;
  private isTicking = false;
  private resizeHandler: () => void;

  constructor(container: HTMLElement, options?: Partial<VirtualScroll2DOptions>) {
    this.container = container;
    this.totalRows = options?.totalRows ?? parseInt(container.getAttribute('hx-virtual-rows') || '0', 10);
    this.totalCols = options?.totalCols ?? parseInt(container.getAttribute('hx-virtual-cols') || '0', 10);
    this.rowHeight = options?.rowHeight ?? parseInt(container.getAttribute('hx-virtual-row-height') || '32', 10);
    this.colWidth = options?.colWidth ?? parseInt(container.getAttribute('hx-virtual-col-width') || '100', 10);
    this.bufferRows = options?.bufferRows ?? parseInt(container.getAttribute('hx-virtual-buffer-rows') || '4', 10);
    this.bufferCols = options?.bufferCols ?? parseInt(container.getAttribute('hx-virtual-buffer-cols') || '2', 10);
    this.pinnedLeft = options?.pinnedLeft ?? parseInt(container.getAttribute('hx-pinned-left') || '0', 10);
    this.pinnedRight = options?.pinnedRight ?? parseInt(container.getAttribute('hx-pinned-right') || '0', 10);
    this.pinnedTop = options?.pinnedTop ?? parseInt(container.getAttribute('hx-pinned-top') || '0', 10);
    this.pinnedBottom = options?.pinnedBottom ?? parseInt(container.getAttribute('hx-pinned-bottom') || '0', 10);
    this.renderCell = options?.renderCell;

    this.container.style.overflow = 'auto';
    this.container.style.position = 'relative';

    this.topSpacer = document.createElement('div');
    this.topSpacer.className = 'hx-virtual-2d-top-spacer';
    this.bottomSpacer = document.createElement('div');
    this.bottomSpacer.className = 'hx-virtual-2d-bottom-spacer';
    this.leftSpacer = document.createElement('div');
    this.leftSpacer.className = 'hx-virtual-2d-left-spacer';
    this.rightSpacer = document.createElement('div');
    this.rightSpacer.className = 'hx-virtual-2d-right-spacer';

    this.gridBody = document.createElement('div');
    this.gridBody.className = 'hx-virtual-2d-body';

    this.container.appendChild(this.topSpacer);
    this.container.appendChild(this.gridBody);
    this.container.appendChild(this.bottomSpacer);

    this.container.addEventListener('scroll', () => this.onScroll(), { passive: true });
    this.resizeHandler = () => this.onScroll();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.resizeHandler, { passive: true });
    }
    this.update();
  }

  private getRowH(rowIdx: number): number {
    return typeof this.rowHeight === 'function' ? this.rowHeight(rowIdx) : this.rowHeight;
  }

  private getColW(colIdx: number): number {
    return typeof this.colWidth === 'function' ? this.colWidth(colIdx) : this.colWidth;
  }

  setDimensions(rows: number, cols: number): void {
    this.totalRows = rows;
    this.totalCols = cols;
    this.update();
  }

  setCellRenderer(renderer: (row: number, col: number) => HTMLElement | string): void {
    this.renderCell = renderer;
    this.update();
  }

  scrollTo(row: number, col: number): void {
    const rowH = this.getRowH(0);
    const colW = this.getColW(0);
    this.container.scrollTop = row * rowH;
    this.container.scrollLeft = col * colW;
  }

  onScroll(): void {
    if (!this.isTicking) {
      this.isTicking = true;
      requestAnimationFrame(() => {
        this.update();
        this.isTicking = false;
      });
    }
  }

  update(): void {
    if (this.totalRows === 0 || this.totalCols === 0) {
      this.topSpacer.style.height = '0px';
      this.bottomSpacer.style.height = '0px';
      this.gridBody.innerHTML = '';
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

    for (let r = startRow; r < endRow; r++) {
      const rowEl = document.createElement('div');
      rowEl.className = 'hx-virtual-2d-row flex';
      rowEl.style.height = `${this.getRowH(r)}px`;
      rowEl.setAttribute('data-row', String(r));

      // Pinned Left Columns
      for (let c = 0; c < this.pinnedLeft; c++) {
        rowEl.appendChild(this.createCellElement(r, c, true, 'left'));
      }

      // Left column spacer for scrolled horizontal slice
      if (startCol > this.pinnedLeft) {
        const spacer = document.createElement('div');
        spacer.style.width = `${(startCol - this.pinnedLeft) * colW}px`;
        spacer.style.flexShrink = '0';
        rowEl.appendChild(spacer);
      }

      // Middle Visible Slice Columns
      for (let c = startCol; c < endCol; c++) {
        rowEl.appendChild(this.createCellElement(r, c, false));
      }

      // Right column spacer
      if (this.totalCols - this.pinnedRight > endCol) {
        const spacer = document.createElement('div');
        spacer.style.width = `${(this.totalCols - this.pinnedRight - endCol) * colW}px`;
        spacer.style.flexShrink = '0';
        rowEl.appendChild(spacer);
      }

      // Pinned Right Columns
      for (let c = this.totalCols - this.pinnedRight; c < this.totalCols; c++) {
        rowEl.appendChild(this.createCellElement(r, c, true, 'right'));
      }

      fragment.appendChild(rowEl);
    }

    this.gridBody.innerHTML = '';
    this.gridBody.appendChild(fragment);
  }

  private createCellElement(row: number, col: number, isPinned = false, pinSide = 'left'): HTMLElement {
    const cellEl = document.createElement('div');
    const w = this.getColW(col);
    cellEl.style.width = `${w}px`;
    cellEl.style.minWidth = `${w}px`;
    cellEl.style.flexShrink = '0';
    cellEl.setAttribute('data-row', String(row));
    cellEl.setAttribute('data-col', String(col));
    cellEl.className = `hx-virtual-2d-cell border-b border-r border-border p-1 text-xs select-none truncate ${
      isPinned ? `sticky ${pinSide === 'left' ? 'left-0' : 'right-0'} z-10 bg-background/95 backdrop-blur font-medium` : ''
    }`;

    if (this.renderCell) {
      const rendered = this.renderCell(row, col);
      if (typeof rendered === 'string') {
        cellEl.innerHTML = rendered;
      } else if (rendered instanceof HTMLElement) {
        cellEl.appendChild(rendered);
      }
    } else {
      cellEl.textContent = `${row}:${col}`;
    }

    return cellEl;
  }

  destroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.resizeHandler);
    }
  }
}

export function initVirtual(root: HTMLElement | Document): void {
  // 1D Virtual Scrollers
  const virtualContainers = (root.querySelectorAll ? root.querySelectorAll('[hx-virtual]:not([hx-virtual-2d])') : []) as NodeListOf<HTMLElement>;
  virtualContainers.forEach(container => {
    if ((container as any)._hxVirtual) return;
    const scroller = new VirtualScroller(container);
    (container as any)._hxVirtual = scroller;

    const src = container.getAttribute('hx-virtual-src');
    if (src) {
      fetch(src)
        .then(res => res.json())
        .then(data => scroller.setItems(data))
        .catch(err => console.error('[htmx-virtual] Failed to fetch data from:', src, err));
    }
  });

  // 2D Bi-Directional Virtual Scrollers
  const virtual2DContainers = (root.querySelectorAll ? root.querySelectorAll('[hx-virtual-2d]') : []) as NodeListOf<HTMLElement>;
  virtual2DContainers.forEach(container => {
    if ((container as any)._hxVirtual2D) return;
    const scroller2D = new VirtualScroller2D(container);
    (container as any)._hxVirtual2D = scroller2D;
  });
}

export const HxVirtual = {
  VirtualScroller,
  VirtualScroller2D,
  init: initVirtual
};

if (typeof window !== 'undefined') {
  (window as any).HxVirtual = HxVirtual;

  if (typeof (window as any).htmx !== 'undefined') {
    (window as any).htmx.defineExtension('virtual', {
      onEvent: function (name: string, evt: any) {
        if (name === "htmx:afterProcessNode") {
          initVirtual(evt.detail.elt as HTMLElement);
        }
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initVirtual(document.body);
  });
}

