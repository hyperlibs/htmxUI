(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __moduleCache = /* @__PURE__ */ new WeakMap;
  var __toCommonJS = (from) => {
    var entry = __moduleCache.get(from), desc;
    if (entry)
      return entry;
    entry = __defProp({}, "__esModule", { value: true });
    if (from && typeof from === "object" || typeof from === "function")
      __getOwnPropNames(from).map((key) => !__hasOwnProp.call(entry, key) && __defProp(entry, key, {
        get: () => from[key],
        enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
      }));
    __moduleCache.set(from, entry);
    return entry;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, {
        get: all[name],
        enumerable: true,
        configurable: true,
        set: (newValue) => all[name] = () => newValue
      });
  };

  // src/htmx-canvas.ts
  var exports_htmx_canvas = {};
  __export(exports_htmx_canvas, {
    updateCanvasConnections: () => updateCanvasConnections,
    initCanvasEngine: () => initCanvasEngine,
    getCanvasLayer: () => getCanvasLayer
  });
  function getCanvasLayer(el) {
    if (!el || !el.closest("[hx-canvas]"))
      return -1;
    let layer = 0;
    let curr = el.parentElement;
    while (curr && curr.hasAttribute) {
      if (curr.hasAttribute("hx-canvas"))
        return layer;
      if (curr.hasAttribute("hx-drag"))
        layer++;
      curr = curr.parentElement;
    }
    return layer;
  }
  function updateCanvasConnections(canvas) {
    if (!canvas)
      return;
    const connections = canvas.querySelectorAll("path[hx-connect]");
    connections.forEach((path) => {
      const fromId = path.getAttribute("hx-connect-from");
      const toId = path.getAttribute("hx-connect-to");
      if (!fromId || !toId)
        return;
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
        path.setAttribute("d", d);
      }
    });
  }
  function initCanvasEngine() {
    if (typeof document === "undefined")
      return;
    document.addEventListener("mousedown", (e) => {
      const target = e.target;
      if (!target)
        return;
      if (target.closest('input, textarea, button, select, [contenteditable="true"]')) {
        if (!target.closest("[hx-drag-handle]"))
          return;
      }
      const dragHandle = target.closest("[hx-drag-handle]") || target.closest("[hx-drag]");
      if (!dragHandle)
        return;
      const node = dragHandle.closest("[hx-drag]") || dragHandle;
      if (!node)
        return;
      const canvas = node.closest("[hx-canvas]");
      const snap = canvas ? parseInt(canvas.getAttribute("hx-snap") || "1", 10) || 1 : 1;
      const startX = e.clientX;
      const startY = e.clientY;
      let initialLeft = parseFloat(node.style.left);
      let initialTop = parseFloat(node.style.top);
      if (isNaN(initialLeft))
        initialLeft = node.offsetLeft;
      if (isNaN(initialTop))
        initialTop = node.offsetTop;
      node.style.zIndex = "100";
      function onMouseMove(moveEvent) {
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
        node.querySelectorAll(".coord-x").forEach((el) => {
          el.innerText = String(newLeft);
        });
        node.querySelectorAll(".coord-y").forEach((el) => {
          el.innerText = String(newTop);
        });
        updateCanvasConnections(canvas);
      }
      function onMouseUp(upEvent) {
        node.style.zIndex = "";
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        node.style.visibility = "hidden";
        const targetUnderMouse = document.elementFromPoint(upEvent.clientX, upEvent.clientY);
        node.style.visibility = "visible";
        const dropZone = targetUnderMouse ? targetUnderMouse.closest("[hx-drag], [hx-canvas]") : null;
        if (dropZone && dropZone !== node && !node.contains(dropZone)) {
          const targetLayer = getCanvasLayer(dropZone);
          if (dropZone.hasAttribute("hx-canvas")) {
            reparentNode(node, dropZone, snap);
          } else if (dropZone.hasAttribute("hx-drag") && targetLayer === 0) {
            reparentNode(node, dropZone, snap);
          }
        }
        updateCanvasConnections(canvas);
        if (window.htmx) {
          window.htmx.trigger(node, "canvas-drop", { left: node.style.left, top: node.style.top, id: node.id });
        }
      }
      function reparentNode(child, newParent, snapValue) {
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
        child.querySelectorAll(".coord-x").forEach((el) => {
          el.innerText = String(newLeft);
        });
        child.querySelectorAll(".coord-y").forEach((el) => {
          el.innerText = String(newTop);
        });
      }
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
    function setupCanvasDOM() {
      document.querySelectorAll("[hx-canvas]").forEach((c) => updateCanvasConnections(c));
      document.querySelectorAll("[hx-drag]").forEach((node) => {
        if (!node.style.left)
          node.style.left = `${node.offsetLeft}px`;
        if (!node.style.top)
          node.style.top = `${node.offsetTop}px`;
        node.style.position = "absolute";
      });
      const observer = new MutationObserver(() => {
        document.querySelectorAll("[hx-canvas]").forEach((c) => updateCanvasConnections(c));
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", setupCanvasDOM);
    } else {
      setupCanvasDOM();
    }
  }
  if (typeof window !== "undefined") {
    initCanvasEngine();
    window.HxCanvas = {
      updateConnections: updateCanvasConnections,
      getLayer: getCanvasLayer,
      init: initCanvasEngine
    };
  }
})();
