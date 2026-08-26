(function() {
  // HTMX-Canvas: Zero-bloat plugin for draggable nodes, snapping, and elastic SVG connections
  
  function getLayer(el) {
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

  // 1. Draggable Nodes & Auto Snap
  document.addEventListener('mousedown', (e) => {
    // Ignore if clicking on interactive elements unless explicitly dragging a handle
    if (e.target.closest('input, textarea, button, select, [contenteditable="true"]')) {
        if (!e.target.closest('[hx-drag-handle]')) return;
    }
    
    const dragHandle = e.target.closest('[hx-drag-handle]') || e.target.closest('[hx-drag]');
    if (!dragHandle) return;
    
    const node = dragHandle.closest('[hx-drag]') || dragHandle;
    if (!node) return;
    
    const canvas = node.closest('[hx-canvas]');
    const snap = canvas ? parseInt(canvas.getAttribute('hx-snap')) || 1 : 1;
    
    let startX = e.clientX;
    let startY = e.clientY;
    
    let initialLeft = parseFloat(node.style.left);
    let initialTop = parseFloat(node.style.top);
    
    if (isNaN(initialLeft)) initialLeft = node.offsetLeft;
    if (isNaN(initialTop)) initialTop = node.offsetTop;
    
    node.style.zIndex = 100;
    
    function onMouseMove(moveEvent) {
      let dx = moveEvent.clientX - startX;
      let dy = moveEvent.clientY - startY;
      
      let newLeft = initialLeft + dx;
      let newTop = initialTop + dy;
      
      if (snap > 1) {
        newLeft = Math.round(newLeft / snap) * snap;
        newTop = Math.round(newTop / snap) * snap;
      }
      
      node.style.left = newLeft + 'px';
      node.style.top = newTop + 'px';
      
      // Update visual coordinates if present
      node.querySelectorAll('.coord-x').forEach(el => el.innerText = newLeft);
      node.querySelectorAll('.coord-y').forEach(el => el.innerText = newTop);
      
      updateConnections(canvas);
    }
    
    function onMouseUp(e) {
      node.style.zIndex = '';
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      
      // Layering & Overlap Drop Logic
      node.style.visibility = 'hidden';
      const targetUnderMouse = document.elementFromPoint(e.clientX, e.clientY);
      node.style.visibility = 'visible';
      
      const dropZone = targetUnderMouse ? targetUnderMouse.closest('[hx-drag], [hx-canvas]') : null;
      
      if (dropZone && dropZone !== node && !node.contains(dropZone)) {
          const targetLayer = getLayer(dropZone);
          
          if (dropZone.hasAttribute('hx-canvas')) {
              // Drop on Layer 0 (Canvas)
              reparentNode(node, dropZone);
          } else if (dropZone.hasAttribute('hx-drag') && targetLayer === 0) {
              // Drop on Layer 1 (Node sitting directly on Canvas)
              // Node becomes Layer 2
              reparentNode(node, dropZone);
          }
          // If targetLayer >= 1, it's already Layer 2 or deeper, we reject the drop to enforce max 2 layers
      }
      
      updateConnections(canvas);
      
      if (window.htmx) {
        htmx.trigger(node, 'canvas-drop', { left: node.style.left, top: node.style.top, id: node.id });
      }
    }
    
    function reparentNode(child, newParent) {
        const rect = child.getBoundingClientRect();
        newParent.appendChild(child);
        const parentRect = newParent.getBoundingClientRect();
        
        // Convert to local coordinates
        let newLeft = rect.left - parentRect.left;
        let newTop = rect.top - parentRect.top;
        
        if (snap > 1) {
          newLeft = Math.round(newLeft / snap) * snap;
          newTop = Math.round(newTop / snap) * snap;
        }
        
        child.style.left = newLeft + 'px';
        child.style.top = newTop + 'px';
        
        child.querySelectorAll('.coord-x').forEach(el => el.innerText = newLeft);
        child.querySelectorAll('.coord-y').forEach(el => el.innerText = newTop);
    }
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // 2. Connector Elasticity (Dynamic Bezier Curves)
  function updateConnections(canvas) {
    if (!canvas) return;
    const connections = canvas.querySelectorAll('path[hx-connect]');
    
    connections.forEach(path => {
      const fromId = path.getAttribute('hx-connect-from');
      const toId = path.getAttribute('hx-connect-to');
      
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
  
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[hx-canvas]').forEach(updateConnections);
    
    document.querySelectorAll('[hx-drag]').forEach(node => {
        if (!node.style.left) node.style.left = node.offsetLeft + 'px';
        if (!node.style.top) node.style.top = node.offsetTop + 'px';
        node.style.position = 'absolute';
    });
    
    const observer = new MutationObserver(() => {
        document.querySelectorAll('[hx-canvas]').forEach(updateConnections);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });

})();
