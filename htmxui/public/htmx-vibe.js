// src/htmx-vibe.ts
class FlipManager {
  positions = new Map;
  record(parentEl) {
    this.positions.clear();
    const children = parentEl.querySelectorAll("[hx-vibe-id], [hx-motion-id], [data-flip-id], li, tr, [hx-drag]");
    children.forEach((el) => {
      const id = el.getAttribute("hx-vibe-id") || el.getAttribute("hx-motion-id") || el.getAttribute("data-flip-id") || el;
      const rect = el.getBoundingClientRect();
      this.positions.set(id, rect);
    });
  }
  play(parentEl, duration = 300, easing = "cubic-bezier(0.25, 0.8, 0.25, 1)") {
    const children = parentEl.querySelectorAll("[hx-vibe-id], [hx-motion-id], [data-flip-id], li, tr, [hx-drag]");
    children.forEach((el) => {
      const id = el.getAttribute("hx-vibe-id") || el.getAttribute("hx-motion-id") || el.getAttribute("data-flip-id") || el;
      const first = this.positions.get(id);
      if (!first)
        return;
      const last = el.getBoundingClientRect();
      const deltaX = first.left - last.left;
      const deltaY = first.top - last.top;
      if (deltaX !== 0 || deltaY !== 0) {
        el.style.transformOrigin = "top left";
        el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        el.style.transition = "transform 0s";
        requestAnimationFrame(() => {
          el.style.transition = `transform ${duration}ms ${easing}`;
          el.style.transform = "";
          const onEnd = () => {
            el.style.transition = "";
            el.style.transformOrigin = "";
            el.removeEventListener("transitionend", onEnd);
          };
          el.addEventListener("transitionend", onEnd, { once: true });
        });
      }
    });
  }
}
var flip = new FlipManager;
var viewObserver = null;
if (typeof window !== "undefined") {
  viewObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.isIntersecting) {
        const animClass = el.getAttribute("hx-vibe-view") || el.getAttribute("hx-motion-view") || "opacity-100 translate-y-0";
        const initialClass = el.getAttribute("hx-vibe-initial") || el.getAttribute("hx-motion-initial") || "opacity-0 translate-y-4";
        el.classList.remove(...initialClass.split(/\s+/).filter(Boolean));
        el.classList.add(...animClass.split(/\s+/).filter(Boolean));
        if ((el.hasAttribute("hx-vibe-once") || el.hasAttribute("hx-motion-once")) && viewObserver) {
          viewObserver.unobserve(el);
        }
      }
    });
  }, { threshold: 0.1 });
}
function initVibe(root) {
  if (!viewObserver)
    return;
  const viewEls = root.querySelectorAll ? root.querySelectorAll("[hx-vibe-view], [hx-motion-view]") : [];
  viewEls.forEach((el) => {
    const initialClass = el.getAttribute("hx-vibe-initial") || el.getAttribute("hx-motion-initial") || "opacity-0 translate-y-4";
    el.classList.add("transition-all", "duration-500", ...initialClass.split(/\s+/).filter(Boolean));
    viewObserver.observe(el);
  });
  const staggerParents = root.querySelectorAll ? root.querySelectorAll("[hx-vibe-stagger], [hx-motion-stagger]") : [];
  staggerParents.forEach((parent) => {
    const delay = parseInt(parent.getAttribute("hx-vibe-stagger") || parent.getAttribute("hx-motion-stagger") || "50", 10);
    const children = Array.from(parent.children);
    children.forEach((child, index) => {
      child.style.animationDelay = `${index * delay}ms`;
    });
  });
}
var HxVibe = {
  flip,
  init: initVibe
};
if (typeof window !== "undefined") {
  window.HxVibe = HxVibe;
  if (typeof window.htmx !== "undefined") {
    document.body.addEventListener("htmx:beforeSwap", (evt) => {
      const target = evt.detail.target;
      if (target && (target.hasAttribute("hx-vibe-flip") || target.hasAttribute("hx-motion-flip") || target.querySelector("[hx-vibe-flip], [hx-motion-flip]"))) {
        const container = target.hasAttribute("hx-vibe-flip") || target.hasAttribute("hx-motion-flip") ? target : target.querySelector("[hx-vibe-flip], [hx-motion-flip]");
        flip.record(container);
      }
    });
    document.body.addEventListener("htmx:afterSwap", (evt) => {
      const target = evt.detail.target;
      if (target && (target.hasAttribute("hx-vibe-flip") || target.hasAttribute("hx-motion-flip") || target.querySelector("[hx-vibe-flip], [hx-motion-flip]"))) {
        const container = target.hasAttribute("hx-vibe-flip") || target.hasAttribute("hx-motion-flip") ? target : target.querySelector("[hx-vibe-flip], [hx-motion-flip]");
        flip.play(container);
      }
    });
    window.htmx.defineExtension("vibe", {
      onEvent: function(name, evt) {
        if (name === "htmx:afterProcessNode") {
          initVibe(evt.detail.elt);
        }
      }
    });
  }
  document.addEventListener("DOMContentLoaded", () => {
    initVibe(document.body);
  });
}
export {
  initVibe,
  HxVibe,
  FlipManager
};
