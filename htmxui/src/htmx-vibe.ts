/**
 * HTMX-VIBE — FLIP Layout Animations, Stagger Sequences & Scroll-Triggered Transitions
 * Written in TypeScript for type safety and framework extensibility.
 */

import type { IFlipManager, HxVibeAPI } from './types';

export class FlipManager implements IFlipManager {
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
        const animClass = el.getAttribute('hx-vibe-view') || el.getAttribute('hx-motion-view') || 'opacity-100 translate-y-0';
        const initialClass = el.getAttribute('hx-vibe-initial') || el.getAttribute('hx-motion-initial') || 'opacity-0 translate-y-4';

        el.classList.remove(...initialClass.split(/\s+/).filter(Boolean));
        el.classList.add(...animClass.split(/\s+/).filter(Boolean));

        if ((el.hasAttribute('hx-vibe-once') || el.hasAttribute('hx-motion-once')) && viewObserver) {
          viewObserver.unobserve(el);
        }
      }
    });
  }, { threshold: 0.1 });
}

export function initVibe(root: HTMLElement | Document): void {
  if (!viewObserver) return;

  const viewEls = (root.querySelectorAll ? root.querySelectorAll('[hx-vibe-view], [hx-motion-view]') : []) as NodeListOf<HTMLElement>;
  viewEls.forEach(el => {
    const initialClass = el.getAttribute('hx-vibe-initial') || el.getAttribute('hx-motion-initial') || 'opacity-0 translate-y-4';
    el.classList.add('transition-all', 'duration-500', ...initialClass.split(/\s+/).filter(Boolean));
    viewObserver!.observe(el);
  });

  const staggerParents = (root.querySelectorAll ? root.querySelectorAll('[hx-vibe-stagger], [hx-motion-stagger]') : []) as NodeListOf<HTMLElement>;
  staggerParents.forEach(parent => {
    const delay = parseInt(parent.getAttribute('hx-vibe-stagger') || parent.getAttribute('hx-motion-stagger') || '50', 10);
    const children = Array.from(parent.children) as HTMLElement[];
    children.forEach((child, index) => {
      child.style.animationDelay = `${index * delay}ms`;
    });
  });
}

export const HxVibe: HxVibeAPI = {
  flip,
  init: initVibe
};

if (typeof window !== 'undefined') {
  window.HxVibe = HxVibe;

  if (typeof (window as any).htmx !== 'undefined') {
    document.body.addEventListener('htmx:beforeSwap', (evt: any) => {
      const target = evt.detail.target as HTMLElement;
      if (target && (target.hasAttribute('hx-vibe-flip') || target.hasAttribute('hx-motion-flip') || target.querySelector('[hx-vibe-flip], [hx-motion-flip]'))) {
        const container = (target.hasAttribute('hx-vibe-flip') || target.hasAttribute('hx-motion-flip'))
          ? target
          : (target.querySelector('[hx-vibe-flip], [hx-motion-flip]') as HTMLElement);
        flip.record(container);
      }
    });

    document.body.addEventListener('htmx:afterSwap', (evt: any) => {
      const target = evt.detail.target as HTMLElement;
      if (target && (target.hasAttribute('hx-vibe-flip') || target.hasAttribute('hx-motion-flip') || target.querySelector('[hx-vibe-flip], [hx-motion-flip]'))) {
        const container = (target.hasAttribute('hx-vibe-flip') || target.hasAttribute('hx-motion-flip'))
          ? target
          : (target.querySelector('[hx-vibe-flip], [hx-motion-flip]') as HTMLElement);
        flip.play(container);
      }
    });

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
