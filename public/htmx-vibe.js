// src/htmx-vibe.ts
class SpringSolver {
  stiffness;
  damping;
  mass;
  velocity;
  constructor(cfg = {}) {
    this.stiffness = cfg.stiffness || 200;
    this.damping = cfg.damping || 15;
    this.mass = cfg.mass || 1;
    this.velocity = cfg.velocity || 0;
  }
  solve(from = 0, to = 1, samples = 30) {
    const values = [];
    let x = from;
    let v = this.velocity;
    const dt = 1 / 60;
    for (let i = 0;i < samples; i++) {
      const springForce = -this.stiffness * (x - to);
      const dampingForce = -this.damping * v;
      const a = (springForce + dampingForce) / this.mass;
      v += a * dt;
      x += v * dt;
      values.push(x);
    }
    return values;
  }
}
function init3DTilt(el) {
  if (el._hasTilt)
    return;
  el._hasTilt = true;
  const max = parseFloat(el.getAttribute("hx-vibe-tilt") || "15");
  const hasGlare = el.hasAttribute("hx-vlt-glare") || el.hasAttribute("hx-vibe-glare");
  let glareEl = null;
  if (hasGlare) {
    el.style.position = el.style.position || "relative";
    el.style.overflow = "hidden";
    glareEl = document.createElement("div");
    glareEl.className = "hx-vibe-glare pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300";
    glareEl.style.background = "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 70%)";
    el.appendChild(glareEl);
  }
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / centerY * -max;
    const rotateY = (x - centerX) / centerX * max;
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    if (glareEl) {
      glareEl.style.opacity = "1";
      glareEl.style.background = `radial-gradient(circle at ${x / rect.width * 100}% ${y / rect.height * 100}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)`;
    }
  });
  el.addEventListener("mouseleave", () => {
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    el.style.transition = "transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)";
    if (glareEl)
      glareEl.style.opacity = "0";
    setTimeout(() => {
      el.style.transition = "";
    }, 500);
  });
}
function initMagnetic(el) {
  if (el._hasMagnetic)
    return;
  el._hasMagnetic = true;
  const strength = parseFloat(el.getAttribute("hx-vibe-magnetic") || "0.35");
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
  });
  el.addEventListener("mouseleave", () => {
    el.style.transform = "translate3d(0px, 0px, 0)";
    el.style.transition = "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    setTimeout(() => {
      el.style.transition = "";
    }, 400);
  });
}
function initSplitText(el) {
  if (el._hasSplit)
    return;
  el._hasSplit = true;
  const mode = el.getAttribute("hx-vibe-split") || "chars";
  const text = el.innerText.trim();
  el.setAttribute("aria-label", text);
  el.innerHTML = "";
  if (mode === "chars") {
    const fragment = document.createDocumentFragment();
    text.split("").forEach((char, idx) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? " " : char;
      span.className = "inline-block opacity-0 translate-y-4";
      span.style.transition = `transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${idx * 25}ms, opacity 0.4s ease ${idx * 25}ms`;
      fragment.appendChild(span);
    });
    el.appendChild(fragment);
  } else {
    const fragment = document.createDocumentFragment();
    text.split(/\s+/).forEach((word, idx) => {
      const span = document.createElement("span");
      span.textContent = word + " ";
      span.className = "inline-block opacity-0 translate-y-4";
      span.style.transition = `transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${idx * 60}ms, opacity 0.4s ease ${idx * 60}ms`;
      fragment.appendChild(span);
    });
    el.appendChild(fragment);
  }
  requestAnimationFrame(() => {
    el.querySelectorAll("span").forEach((span) => {
      span.classList.remove("opacity-0", "translate-y-4");
      span.classList.add("opacity-100", "translate-y-0");
    });
  });
}
function triggerBlast(originEl, radius = 250, force = 40) {
  const originRect = originEl.getBoundingClientRect();
  const originX = originRect.left + originRect.width / 2;
  const originY = originRect.top + originRect.height / 2;
  const targets = document.querySelectorAll("[hx-vpx-target], [hx-vibe-target], .hx-vibe-item");
  targets.forEach((target) => {
    const el = target;
    const rect = el.getBoundingClientRect();
    const targetX = rect.left + rect.width / 2;
    const targetY = rect.top + rect.height / 2;
    const deltaX = targetX - originX;
    const deltaY = targetY - originY;
    const dist = Math.hypot(deltaX, deltaY);
    if (dist < radius && dist > 0) {
      const power = (1 - dist / radius) * force;
      const pushX = deltaX / dist * power;
      const pushY = deltaY / dist * power;
      el.style.transform = `translate3d(${pushX}px, ${pushY}px, 0)`;
      el.style.transition = "transform 0.1s ease-out";
      setTimeout(() => {
        el.style.transform = "translate3d(0, 0, 0)";
        el.style.transition = "transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
      }, 100);
    }
  });
}

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
        const animClass = el.getAttribute("hx-vibe-view") || "opacity-100 translate-y-0";
        const initialClass = el.getAttribute("hx-vibe-initial") || "opacity-0 translate-y-4";
        el.classList.remove(...initialClass.split(/\s+/).filter(Boolean));
        el.classList.add(...animClass.split(/\s+/).filter(Boolean));
        if (el.hasAttribute("hx-vibe-once") && viewObserver) {
          viewObserver.unobserve(el);
        }
      }
    });
  }, { threshold: 0.1 });
}
function initVibe(root) {
  if (typeof document === "undefined")
    return;
  if (viewObserver) {
    const viewEls = root.querySelectorAll ? root.querySelectorAll("[hx-vibe-view]") : [];
    viewEls.forEach((el) => {
      const initialClass = el.getAttribute("hx-vibe-initial") || "opacity-0 translate-y-4";
      el.classList.add("transition-all", "duration-500", ...initialClass.split(/\s+/).filter(Boolean));
      viewObserver.observe(el);
    });
  }
  const tiltEls = root.querySelectorAll ? root.querySelectorAll("[hx-vibe-tilt]") : [];
  tiltEls.forEach(init3DTilt);
  const magneticEls = root.querySelectorAll ? root.querySelectorAll("[hx-vibe-magnetic]") : [];
  magneticEls.forEach(initMagnetic);
  const splitEls = root.querySelectorAll ? root.querySelectorAll("[hx-vibe-split]") : [];
  splitEls.forEach(initSplitText);
  const blastEls = root.querySelectorAll ? root.querySelectorAll("[hx-vpx-blast]") : [];
  blastEls.forEach((el) => {
    el.addEventListener("click", () => {
      const radius = parseFloat(el.getAttribute("hx-vpx-radius") || "300");
      const force = parseFloat(el.getAttribute("hx-vpx-force") || "50");
      triggerBlast(el, radius, force);
    });
  });
}
var HxVibe = {
  flip,
  SpringSolver,
  init3DTilt,
  initMagnetic,
  initSplitText,
  triggerBlast,
  init: initVibe
};
if (typeof window !== "undefined") {
  window.HxVibe = HxVibe;
  if (typeof window.HTMXUI !== "undefined") {
    window.HTMXUI.vibe = HxVibe;
  }
  if (typeof window.htmx !== "undefined") {
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
  triggerBlast,
  initVibe,
  initSplitText,
  initMagnetic,
  init3DTilt,
  SpringSolver,
  HxVibe,
  FlipManager
};
