import type { HxA11yAPI, MatrixNavOptions, CellRange } from './types';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(', ');

let previouslyFocused: HTMLElement | null = null;

export function trapFocus(container: HTMLElement): () => void {
  const focusable = (Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)) as HTMLElement[]).filter(
    el => el.offsetParent !== null && window.getComputedStyle(el).visibility !== 'hidden'
  );

  if (focusable.length === 0) return () => {};

  previouslyFocused = document.activeElement as HTMLElement | null;
  focusable[0].focus();

  function handleKeyDown(e: KeyboardEvent): void {
    if (e.key !== 'Tab') return;

    const currentFocusables = (Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)) as HTMLElement[]).filter(
      el => el.offsetParent !== null && window.getComputedStyle(el).visibility !== 'hidden'
    );
    if (currentFocusables.length === 0) return;

    const first = currentFocusables[0];
    const last = currentFocusables[currentFocusables.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  container.addEventListener('keydown', handleKeyDown);

  return () => {
    container.removeEventListener('keydown', handleKeyDown);
    if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
      previouslyFocused.focus();
    }
  };
}

export function initRovingTabindex(container: HTMLElement): void {
  const items = Array.from(container.querySelectorAll('[role="tab"], [role="menuitem"], [role="option"], [hx-roving-item]')) as HTMLElement[];
  if (items.length === 0) return;

  let currentIndex = items.findIndex(item => item.getAttribute('tabindex') === '0');
  if (currentIndex === -1) currentIndex = 0;

  items.forEach((item, idx) => {
    item.setAttribute('tabindex', idx === currentIndex ? '0' : '-1');
  });

  container.addEventListener('keydown', (e: KeyboardEvent) => {
    let nextIndex = currentIndex;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % items.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + items.length) % items.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = items.length - 1;
    }

    if (nextIndex !== currentIndex) {
      items[currentIndex].setAttribute('tabindex', '-1');
      items[nextIndex].setAttribute('tabindex', '0');
      items[nextIndex].focus();
      currentIndex = nextIndex;
    }
  });
}

// -----------------------------------------------------------------------------
// HxA11y 2D Matrix Navigation & Range Selection (Excel Shift+Arrows, Roving)
// -----------------------------------------------------------------------------

export function initMatrixNav(container: HTMLElement, options?: Partial<MatrixNavOptions>): void {
  if ((container as any)._hxMatrixNavInit) return;
  (container as any)._hxMatrixNavInit = true;

  let activeRow = options?.activeRow ?? 0;
  let activeCol = options?.activeCol ?? 0;
  let anchorRow = activeRow;
  let anchorCol = activeCol;

  const selectable = options?.selectable !== false;

  function getCell(r: number, c: number): HTMLElement | null {
    return container.querySelector(`[data-row="${r}"][data-col="${c}"], [hx-cell="${r},${c}"], [hx-matrix-cell="${r},${c}"]`);
  }

  function highlightSelection(r1: number, c1: number, r2: number, c2: number): void {
    const minR = Math.min(r1, r2);
    const maxR = Math.max(r1, r2);
    const minC = Math.min(c1, c2);
    const maxC = Math.max(c1, c2);

    const allCells = container.querySelectorAll('[data-row][data-col], [hx-cell], [hx-matrix-cell]');
    allCells.forEach(cell => {
      const rAttr = cell.getAttribute('data-row') || cell.getAttribute('hx-cell')?.split(/[,:]/)[0] || cell.getAttribute('hx-matrix-cell')?.split(/[,:]/)[0];
      const cAttr = cell.getAttribute('data-col') || cell.getAttribute('hx-cell')?.split(/[,:]/)[1] || cell.getAttribute('hx-matrix-cell')?.split(/[,:]/)[1];
      if (rAttr !== undefined && cAttr !== undefined) {
        const r = parseInt(rAttr, 10);
        const c = parseInt(cAttr, 10);
        const inRange = r >= minR && r <= maxR && c >= minC && c <= maxC;
        const isActive = r === activeRow && c === activeCol;

        if (inRange) {
          cell.setAttribute('aria-selected', 'true');
          cell.classList.add('hs-selected-range', 'bg-primary/15');
        } else {
          cell.setAttribute('aria-selected', 'false');
          cell.classList.remove('hs-selected-range', 'bg-primary/15');
        }

        if (isActive) {
          cell.setAttribute('tabindex', '0');
          cell.classList.add('hs-active-cell', 'ring-2', 'ring-primary', 'ring-inset');
        } else {
          cell.setAttribute('tabindex', '-1');
          cell.classList.remove('hs-active-cell', 'ring-2', 'ring-primary', 'ring-inset');
        }
      }
    });

    const range: CellRange = { startRow: minR, startCol: minC, endRow: maxR, endCol: maxC };
    container.dispatchEvent(new CustomEvent('hx-matrix:select', { bubbles: true, detail: range }));
    if (options?.onRangeSelect) options.onRangeSelect(range);
  }

  function focusCell(r: number, c: number, extendSelection = false): void {
    const totalRows = options?.rows ?? 100000;
    const totalCols = options?.cols ?? 1000;

    activeRow = Math.max(0, Math.min(totalRows - 1, r));
    activeCol = Math.max(0, Math.min(totalCols - 1, c));

    if (!extendSelection) {
      anchorRow = activeRow;
      anchorCol = activeCol;
    }

    const cell = getCell(activeRow, activeCol);
    if (cell) {
      cell.focus();
    }

    highlightSelection(anchorRow, anchorCol, activeRow, activeCol);
    container.dispatchEvent(new CustomEvent('hx-matrix:focus', { bubbles: true, detail: { row: activeRow, col: activeCol, cell } }));
    if (options?.onCellFocus) options.onCellFocus(activeRow, activeCol, cell);
  }

  container.addEventListener('keydown', (e: KeyboardEvent) => {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End', 'PageUp', 'PageDown'].includes(e.key)) {
      return;
    }

    const extend = e.shiftKey && selectable;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      focusCell(activeRow, activeCol + 1, extend);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      focusCell(activeRow, activeCol - 1, extend);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusCell(activeRow + 1, activeCol, extend);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusCell(activeRow - 1, activeCol, extend);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (e.shiftKey) {
        focusCell(activeCol > 0 ? activeRow : Math.max(0, activeRow - 1), activeCol > 0 ? activeCol - 1 : (options?.cols ?? 10) - 1, false);
      } else {
        focusCell(activeCol + 1 < (options?.cols ?? 10) ? activeRow : activeRow + 1, activeCol + 1 < (options?.cols ?? 10) ? activeCol + 1 : 0, false);
      }
    } else if (e.key === 'Home') {
      e.preventDefault();
      focusCell(activeRow, 0, extend);
    } else if (e.key === 'End') {
      e.preventDefault();
      focusCell(activeRow, (options?.cols ?? 100) - 1, extend);
    } else if (e.key === 'PageDown') {
      e.preventDefault();
      focusCell(activeRow + 20, activeCol, extend);
    } else if (e.key === 'PageUp') {
      e.preventDefault();
      focusCell(activeRow - 20, activeCol, extend);
    }
  });

  // Cell click handling
  container.addEventListener('click', (e: MouseEvent) => {
    const target = (e.target as HTMLElement).closest('[data-row][data-col], [hx-cell], [hx-matrix-cell]') as HTMLElement;
    if (target) {
      const rAttr = target.getAttribute('data-row') || target.getAttribute('hx-cell')?.split(/[,:]/)[0] || target.getAttribute('hx-matrix-cell')?.split(/[,:]/)[0];
      const cAttr = target.getAttribute('data-col') || target.getAttribute('hx-cell')?.split(/[,:]/)[1] || target.getAttribute('hx-matrix-cell')?.split(/[,:]/)[1];
      if (rAttr !== undefined && cAttr !== undefined) {
        const r = parseInt(rAttr, 10);
        const c = parseInt(cAttr, 10);
        focusCell(r, c, e.shiftKey && selectable);
      }
    }
  });

  // Initial highlight
  highlightSelection(anchorRow, anchorCol, activeRow, activeCol);
}

let liveRegion: HTMLElement | null = null;
export function announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  if (!liveRegion && typeof document !== 'undefined') {
    liveRegion = document.createElement('div');
    liveRegion.id = 'htmx-a11y-live-region';
    liveRegion.style.position = 'absolute';
    liveRegion.style.width = '1px';
    liveRegion.style.height = '1px';
    liveRegion.style.padding = '0';
    liveRegion.style.margin = '-1px';
    liveRegion.style.overflow = 'hidden';
    liveRegion.style.clip = 'rect(0, 0, 0, 0)';
    liveRegion.style.whiteSpace = 'nowrap';
    liveRegion.style.border = '0';
    document.body.appendChild(liveRegion);
  }

  if (liveRegion) {
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.innerText = '';
    setTimeout(() => {
      if (liveRegion) liveRegion.innerText = message;
    }, 50);
  }
}

export function initA11y(root: HTMLElement | Document): void {
  const traps = (root.querySelectorAll ? root.querySelectorAll('[hx-trap-focus]') : []) as NodeListOf<HTMLElement>;
  traps.forEach(trapEl => {
    if ((trapEl as any)._hxTrapRelease) return;
    (trapEl as any)._hxTrapRelease = trapFocus(trapEl);
  });

  const rovingContainers = (root.querySelectorAll ? root.querySelectorAll('[hx-roving], [role="tablist"], [role="menubar"]') : []) as NodeListOf<HTMLElement>;
  rovingContainers.forEach(initRovingTabindex);

  const matrixContainers = (root.querySelectorAll ? root.querySelectorAll('[hx-matrix-nav]') : []) as NodeListOf<HTMLElement>;
  matrixContainers.forEach(container => initMatrixNav(container));
}

export const HxA11y: HxA11yAPI = {
  trapFocus,
  initRovingTabindex,
  initMatrixNav,
  announce,
  init: initA11y
};

if (typeof window !== 'undefined') {
  window.HxA11y = HxA11y;

  document.addEventListener('DOMContentLoaded', () => {
    initA11y(document.body);
  });
}

