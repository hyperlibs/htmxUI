/**
 * HTMXUI Canvas Engine: Zero-bloat plugin for draggable spatial nodes, snapping, and elastic SVG connections
 * 
 * Supports:
 * - Draggable spatial nodes ([hx-drag], [hx-drag-handle])
 * - Grid snapping ([hx-snap="10"])
 * - 2-layer hierarchical nesting
 * - Elastic dynamic cubic Bézier connectors (path[hx-connect])
 */

export interface CanvasNodeState {
  id: string;
  left: number;
  top: number;
  layer: number;
}

export function getCanvasLayer(el: HTMLElement | null): number {
  if (!el || !el.closest('[hx-canvas]')) return -1;
  let layer = 0;
  let curr = el.parentElement;
  while (curr && curr.hasAttribute) {
    if (curr.hasAttribute('hx-canvas')) return layer;
    if (curr.hasAttribute('hx-drag')) layer++;
    curr = curr.parentElement;
  }
  return layer;
}

export function updateCanvasConnections(canvas: HTMLElement | null): void {
  if (!canvas) return;
  const connections = canvas.querySelectorAll('path[hx-connect]');

  connections.forEach(path => {
    const fromId = path.getAttribute('hx-connect-from');
    const toId = path.getAttribute('hx-connect-to');

    if (!fromId || !toId) return;

    const fromNode = document.getElementById(fromId);
    const toNode = document.getElementById(toId);

    if (fromNode && toNode) {
      const fromRect = fromNode.getBoundingClientRect();
      const toRect = toNode.getBoundingClientRect();
      const canvasRect = canvas.getBoundingClientRect();

      const x1 = fromRect.right - canvasRect.left;
      const y1 = fromRect.top + fromRect.height / 2 - canvasRect.top;

      const x2 = toRect.left - canvasRect.left;
      const y2 = toRect.top + toRect.height / 2 - canvasRect.top;

      const offset = Math.max(Math.abs(x2 - x1) / 2, 50);
      const d = `M ${x1} ${y1} C ${x1 + offset} ${y1}, ${x2 - offset} ${y2}, ${x2} ${y2}`;
      path.setAttribute('d', d);
    }
  });
}

export function initCanvasEngine(): void {
  if (typeof document === 'undefined') return;

  // 1. Draggable Nodes & Auto Snap
  document.addEventListener('mousedown', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target) return;

    // Ignore interactive elements unless explicitly dragging a handle
    if (target.closest('input, textarea, button, select, [contenteditable="true"]')) {
      if (!target.closest('[hx-drag-handle]')) return;
    }

    const dragHandle = target.closest('[hx-drag-handle]') || target.closest('[hx-drag]');
    if (!dragHandle) return;

    const node = (dragHandle.closest('[hx-drag]') || dragHandle) as HTMLElement;
    if (!node) return;

    const canvas = node.closest('[hx-canvas]') as HTMLElement | null;
    const snap = canvas ? parseInt(canvas.getAttribute('hx-snap') || '1', 10) || 1 : 1;

    const startX = e.clientX;
    const startY = e.clientY;

    let initialLeft = parseFloat(node.style.left);
    let initialTop = parseFloat(node.style.top);

    if (isNaN(initialLeft)) initialLeft = node.offsetLeft;
    if (isNaN(initialTop)) initialTop = node.offsetTop;

    node.style.zIndex = '100';

    function onMouseMove(moveEvent: MouseEvent): void {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      let newLeft = initialLeft + dx;
      let newTop = initialTop + dy;

      if (snap > 1) {
        newLeft = Math.round(newLeft / snap) * snap;
        newTop = Math.round(newTop / snap) * snap;
      }

      node.style.left = `${newLeft}px`;
      node.style.top = `${newTop}px`;

      // Update visual coordinates if present
      node.querySelectorAll<HTMLElement>('.coord-x').forEach(el => { el.innerText = String(newLeft); });
      node.querySelectorAll<HTMLElement>('.coord-y').forEach(el => { el.innerText = String(newTop); });

      updateCanvasConnections(canvas);
    }

    function onMouseUp(upEvent: MouseEvent): void {
      node.style.zIndex = '';
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      // Layering & Overlap Drop Logic
      node.style.visibility = 'hidden';
      const targetUnderMouse = document.elementFromPoint(upEvent.clientX, upEvent.clientY) as HTMLElement | null;
      node.style.visibility = 'visible';

      const dropZone = targetUnderMouse ? targetUnderMouse.closest<HTMLElement>('[hx-drag], [hx-canvas]') : null;

      if (dropZone && dropZone !== node && !node.contains(dropZone)) {
        const targetLayer = getCanvasLayer(dropZone);

        if (dropZone.hasAttribute('hx-canvas')) {
          // Drop on Layer 0 (Canvas)
          reparentNode(node, dropZone, snap);
        } else if (dropZone.hasAttribute('hx-drag') && targetLayer === 0) {
          // Drop on Layer 1 (Node sitting directly on Canvas) -> Node becomes Layer 2
          reparentNode(node, dropZone, snap);
        }
      }

      updateCanvasConnections(canvas);

      if ((window as any).htmx) {
        (window as any).htmx.trigger(node, 'canvas-drop', { left: node.style.left, top: node.style.top, id: node.id });
      }
    }

    function reparentNode(child: HTMLElement, newParent: HTMLElement, snapValue: number): void {
      const rect = child.getBoundingClientRect();
      newParent.appendChild(child);
      const parentRect = newParent.getBoundingClientRect();

      let newLeft = rect.left - parentRect.left;
      let newTop = rect.top - parentRect.top;

      if (snapValue > 1) {
        newLeft = Math.round(newLeft / snapValue) * snapValue;
        newTop = Math.round(newTop / snapValue) * snapValue;
      }

      child.style.left = `${newLeft}px`;
      child.style.top = `${newTop}px`;

      child.querySelectorAll<HTMLElement>('.coord-x').forEach(el => { el.innerText = String(newLeft); });
      child.querySelectorAll<HTMLElement>('.coord-y').forEach(el => { el.innerText = String(newTop); });
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function setupCanvasDOM(): void {
    document.querySelectorAll<HTMLElement>('[hx-canvas]').forEach(c => updateCanvasConnections(c));

    document.querySelectorAll<HTMLElement>('[hx-drag]').forEach(node => {
      if (!node.style.left) node.style.left = `${node.offsetLeft}px`;
      if (!node.style.top) node.style.top = `${node.offsetTop}px`;
      node.style.position = 'absolute';
    });

    const observer = new MutationObserver(() => {
      document.querySelectorAll<HTMLElement>('[hx-canvas]').forEach(c => updateCanvasConnections(c));
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupCanvasDOM);
  } else {
    setupCanvasDOM();
  }
}

// Auto initialize in browser
if (typeof window !== 'undefined') {
  initCanvasEngine();
  (window as any).HxCanvas = {
    updateConnections: updateCanvasConnections,
    getLayer: getCanvasLayer,
    init: initCanvasEngine
  };
}
