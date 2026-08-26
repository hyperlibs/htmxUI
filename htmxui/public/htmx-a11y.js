// src/htmx-a11y.ts
var FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])'
].join(", ");
var previouslyFocused = null;
function trapFocus(container) {
  const focusable = Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter((el) => el.offsetParent !== null && window.getComputedStyle(el).visibility !== "hidden");
  if (focusable.length === 0)
    return () => {};
  previouslyFocused = document.activeElement;
  focusable[0].focus();
  function handleKeyDown(e) {
    if (e.key !== "Tab")
      return;
    const currentFocusables = Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter((el) => el.offsetParent !== null && window.getComputedStyle(el).visibility !== "hidden");
    if (currentFocusables.length === 0)
      return;
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
  container.addEventListener("keydown", handleKeyDown);
  return () => {
    container.removeEventListener("keydown", handleKeyDown);
    if (previouslyFocused && typeof previouslyFocused.focus === "function") {
      previouslyFocused.focus();
    }
  };
}
function initRovingTabindex(container) {
  const items = Array.from(container.querySelectorAll('[role="tab"], [role="menuitem"], [role="option"], [hx-roving-item]'));
  if (items.length === 0)
    return;
  let currentIndex = items.findIndex((item) => item.getAttribute("tabindex") === "0");
  if (currentIndex === -1)
    currentIndex = 0;
  items.forEach((item, idx) => {
    item.setAttribute("tabindex", idx === currentIndex ? "0" : "-1");
  });
  container.addEventListener("keydown", (e) => {
    let nextIndex = currentIndex;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % items.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + items.length) % items.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = items.length - 1;
    }
    if (nextIndex !== currentIndex) {
      items[currentIndex].setAttribute("tabindex", "-1");
      items[nextIndex].setAttribute("tabindex", "0");
      items[nextIndex].focus();
      currentIndex = nextIndex;
    }
  });
}
var liveRegion = null;
function announce(message, priority = "polite") {
  if (!liveRegion && typeof document !== "undefined") {
    liveRegion = document.createElement("div");
    liveRegion.id = "htmx-a11y-live-region";
    liveRegion.style.position = "absolute";
    liveRegion.style.width = "1px";
    liveRegion.style.height = "1px";
    liveRegion.style.padding = "0";
    liveRegion.style.margin = "-1px";
    liveRegion.style.overflow = "hidden";
    liveRegion.style.clip = "rect(0, 0, 0, 0)";
    liveRegion.style.whiteSpace = "nowrap";
    liveRegion.style.border = "0";
    document.body.appendChild(liveRegion);
  }
  if (liveRegion) {
    liveRegion.setAttribute("aria-live", priority);
    liveRegion.innerText = "";
    setTimeout(() => {
      if (liveRegion)
        liveRegion.innerText = message;
    }, 50);
  }
}
function initA11y(root) {
  const traps = root.querySelectorAll ? root.querySelectorAll("[hx-trap-focus]") : [];
  traps.forEach((trapEl) => {
    if (trapEl._hxTrapRelease)
      return;
    trapEl._hxTrapRelease = trapFocus(trapEl);
  });
  const rovingContainers = root.querySelectorAll ? root.querySelectorAll('[hx-roving], [role="tablist"], [role="menubar"]') : [];
  rovingContainers.forEach(initRovingTabindex);
}
var HxA11y = {
  trapFocus,
  initRovingTabindex,
  announce,
  init: initA11y
};
if (typeof window !== "undefined") {
  window.HxA11y = HxA11y;
  document.addEventListener("DOMContentLoaded", () => {
    initA11y(document.body);
  });
}
export {
  trapFocus,
  initRovingTabindex,
  initA11y,
  announce,
  HxA11y
};
