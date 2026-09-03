/**
 * HTMX-VIBE — Kinetic Motion, Spring Physics, 3D Tilt, Magnetic Pull & Split Typography
 * 
 * Hardware-accelerated WAAPI animation engine designed for Hollywood-grade WebFX.
 */

export interface SpringConfig {
  stiffness?: number;
  damping?: number;
  mass?: number;
  velocity?: number;
}

export class SpringSolver {
  stiffness: number;
  damping: number;
  mass: number;
  velocity: number;

  constructor(cfg: SpringConfig = {}) {
    this.stiffness = cfg.stiffness || 200;
    this.damping = cfg.damping || 15;
    this.mass = cfg.mass || 1;
    this.velocity = cfg.velocity || 0;
  }

  // Generates WAAPI-compatible CSS cubic-bezier / keyframe steps
  solve(from = 0, to = 1, samples = 30): number[] {
    const values: number[] = [];
    let x = from;
    let v = this.velocity;
    const dt = 1 / 60;

    for (let i = 0; i < samples; i++) {
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

// -----------------------------------------------------------------------------
// 3D Tilt & Specular Glare (`hx-vibe-tilt`, `hx-vlt-glare`)
// -----------------------------------------------------------------------------
export function init3DTilt(el: HTMLElement): void {
  if ((el as any)._hasTilt) return;
  (el as any)._hasTilt = true;

  const max = parseFloat(el.getAttribute('hx-vibe-tilt') || '15');
  const hasGlare = el.hasAttribute('hx-vlt-glare') || el.hasAttribute('hx-vibe-glare');

  let glareEl: HTMLElement | null = null;
  if (hasGlare) {
    el.style.position = el.style.position || 'relative';
    el.style.overflow = 'hidden';
    glareEl = document.createElement('div');
    glareEl.className = 'hx-vibe-glare pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300';
    glareEl.style.background = 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 70%)';
    el.appendChild(glareEl);
  }

  el.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -max;
    const rotateY = ((x - centerX) / centerX) * max;

    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    if (glareEl) {
      glareEl.style.opacity = '1';
      glareEl.style.background = `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)`;
    }
  });

  el.addEventListener('mouseleave', () => {
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    el.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
    if (glareEl) glareEl.style.opacity = '0';
    setTimeout(() => { el.style.transition = ''; }, 500);
  });
}

// -----------------------------------------------------------------------------
// Magnetic Pointer Pull (`hx-vibe-magnetic`)
// -----------------------------------------------------------------------------
export function initMagnetic(el: HTMLElement): void {
  if ((el as any)._hasMagnetic) return;
  (el as any)._hasMagnetic = true;

  const strength = parseFloat(el.getAttribute('hx-vibe-magnetic') || '0.35');

  el.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
  });

  el.addEventListener('mouseleave', () => {
    el.style.transform = 'translate3d(0px, 0px, 0)';
    el.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    setTimeout(() => { el.style.transition = ''; }, 400);
  });
}

// -----------------------------------------------------------------------------
// Kinetic Split Typography (`hx-vibe-split="chars|words|lines"`)
// -----------------------------------------------------------------------------
export function initSplitText(el: HTMLElement): void {
  if ((el as any)._hasSplit) return;
  (el as any)._hasSplit = true;

  const mode = el.getAttribute('hx-vibe-split') || 'chars';
  const text = el.innerText.trim();
  el.setAttribute('aria-label', text);
  el.innerHTML = '';

  if (mode === 'chars') {
    const fragment = document.createDocumentFragment();
    text.split('').forEach((char, idx) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.className = 'inline-block opacity-0 translate-y-4';
      span.style.transition = `transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${idx * 25}ms, opacity 0.4s ease ${idx * 25}ms`;
      fragment.appendChild(span);
    });
    el.appendChild(fragment);
  } else {
    const fragment = document.createDocumentFragment();
    text.split(/\s+/).forEach((word, idx) => {
      const span = document.createElement('span');
      span.textContent = word + '\u00A0';
      span.className = 'inline-block opacity-0 translate-y-4';
      span.style.transition = `transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${idx * 60}ms, opacity 0.4s ease ${idx * 60}ms`;
      fragment.appendChild(span);
    });
    el.appendChild(fragment);
  }

  // Trigger reveal on next animation frame
  requestAnimationFrame(() => {
    el.querySelectorAll('span').forEach(span => {
      span.classList.remove('opacity-0', 'translate-y-4');
      span.classList.add('opacity-100', 'translate-y-0');
    });
  });
}

// -----------------------------------------------------------------------------
// Explosive Radial Shockwave (`hx-vpx-blast`)
// -----------------------------------------------------------------------------
export function triggerBlast(originEl: HTMLElement, radius = 250, force = 40): void {
  const originRect = originEl.getBoundingClientRect();
  const originX = originRect.left + originRect.width / 2;
  const originY = originRect.top + originRect.height / 2;

  const targets = document.querySelectorAll('[hx-vpx-target], [hx-vibe-target], .hx-vibe-item');
  targets.forEach(target => {
    const el = target as HTMLElement;
    const rect = el.getBoundingClientRect();
    const targetX = rect.left + rect.width / 2;
    const targetY = rect.top + rect.height / 2;

    const deltaX = targetX - originX;
    const deltaY = targetY - originY;
    const dist = Math.hypot(deltaX, deltaY);

    if (dist < radius && dist > 0) {
      const power = (1 - dist / radius) * force;
      const pushX = (deltaX / dist) * power;
      const pushY = (deltaY / dist) * power;

      el.style.transform = `translate3d(${pushX}px, ${pushY}px, 0)`;
      el.style.transition = 'transform 0.1s ease-out';

      setTimeout(() => {
        el.style.transform = 'translate3d(0, 0, 0)';
        el.style.transition = 'transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      }, 100);
    }
  });
}

// -----------------------------------------------------------------------------
// FLIP Layout Animation Manager
// -----------------------------------------------------------------------------
export class FlipManager {
  positions = new Map<string | HTMLElement, DOMRect>();

  record(parentEl: HTMLElement): void {
    this.positions.clear();
    const children = parentEl.querySelectorAll('[hx-vibe-id], [hx-motion-id], [data-flip-id], li, tr, [hx-drag]') as NodeListOf<HTMLElement>;
    children.forEach(el => {
      const id = el.getAttribute('hx-vibe-id') || el.getAttribute('hx-motion-id') || el.getAttribute('data-flip-id') || el;
      const rect = el.getBoundingClientRect();
      this.positions.set(id, rect);
    });
  }

  play(parentEl: HTMLElement, duration = 300, easing = 'cubic-bezier(0.25, 0.8, 0.25, 1)'): void {
    const children = parentEl.querySelectorAll('[hx-vibe-id], [hx-motion-id], [data-flip-id], li, tr, [hx-drag]') as NodeListOf<HTMLElement>;
    children.forEach(el => {
      const id = el.getAttribute('hx-vibe-id') || el.getAttribute('hx-motion-id') || el.getAttribute('data-flip-id') || el;
      const first = this.positions.get(id);
      if (!first) return;

      const last = el.getBoundingClientRect();
      const deltaX = first.left - last.left;
      const deltaY = first.top - last.top;

      if (deltaX !== 0 || deltaY !== 0) {
        el.style.transformOrigin = 'top left';
        el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        el.style.transition = 'transform 0s';

        requestAnimationFrame(() => {
          el.style.transition = `transform ${duration}ms ${easing}`;
          el.style.transform = '';

          const onEnd = () => {
            el.style.transition = '';
            el.style.transformOrigin = '';
            el.removeEventListener('transitionend', onEnd);
          };
          el.addEventListener('transitionend', onEnd, { once: true });
        });
      }
    });
  }
}

const flip = new FlipManager();

let viewObserver: IntersectionObserver | null = null;
if (typeof window !== 'undefined') {
  viewObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target as HTMLElement;
      if (entry.isIntersecting) {
        const animClass = el.getAttribute('hx-vibe-view') || 'opacity-100 translate-y-0';
        const initialClass = el.getAttribute('hx-vibe-initial') || 'opacity-0 translate-y-4';

        el.classList.remove(...initialClass.split(/\s+/).filter(Boolean));
        el.classList.add(...animClass.split(/\s+/).filter(Boolean));

        if (el.hasAttribute('hx-vibe-once') && viewObserver) {
          viewObserver.unobserve(el);
        }
      }
    });
  }, { threshold: 0.1 });
}

export function initVibe(root: HTMLElement | Document): void {
  if (typeof document === 'undefined') return;

  // Viewport in-view animations
  if (viewObserver) {
    const viewEls = (root.querySelectorAll ? root.querySelectorAll('[hx-vibe-view]') : []) as NodeListOf<HTMLElement>;
    viewEls.forEach(el => {
      const initialClass = el.getAttribute('hx-vibe-initial') || 'opacity-0 translate-y-4';
      el.classList.add('transition-all', 'duration-500', ...initialClass.split(/\s+/).filter(Boolean));
      viewObserver!.observe(el);
    });
  }

  // 3D Tilt
  const tiltEls = (root.querySelectorAll ? root.querySelectorAll('[hx-vibe-tilt]') : []) as NodeListOf<HTMLElement>;
  tiltEls.forEach(init3DTilt);

  // Magnetic elements
  const magneticEls = (root.querySelectorAll ? root.querySelectorAll('[hx-vibe-magnetic]') : []) as NodeListOf<HTMLElement>;
  magneticEls.forEach(initMagnetic);

  // Split Typography
  const splitEls = (root.querySelectorAll ? root.querySelectorAll('[hx-vibe-split]') : []) as NodeListOf<HTMLElement>;
  splitEls.forEach(initSplitText);

  // Blast buttons
  const blastEls = (root.querySelectorAll ? root.querySelectorAll('[hx-vpx-blast]') : []) as NodeListOf<HTMLElement>;
  blastEls.forEach(el => {
    el.addEventListener('click', () => {
      const radius = parseFloat(el.getAttribute('hx-vpx-radius') || '300');
      const force = parseFloat(el.getAttribute('hx-vpx-force') || '50');
      triggerBlast(el, radius, force);
    });
  });
}

export const HxVibe = {
  flip,
  SpringSolver,
  init3DTilt,
  initMagnetic,
  initSplitText,
  triggerBlast,
  init: initVibe
};

if (typeof window !== 'undefined') {
  (window as any).HxVibe = HxVibe;
  if (typeof (window as any).HTMXUI !== 'undefined') {
    (window as any).HTMXUI.vibe = HxVibe;
  }

  if (typeof (window as any).htmx !== 'undefined') {
    (window as any).htmx.defineExtension('vibe', {
      onEvent: function (name: string, evt: any) {
        if (name === "htmx:afterProcessNode") {
          initVibe(evt.detail.elt as HTMLElement);
        }
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initVibe(document.body);
  });
}
