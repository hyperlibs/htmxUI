/**
 * APPZ.TS — A to Z Mobile & Spatial Game UI Engine for HTMXUI
 * 
 * Architectural DNA:
 * - 50% HTMXUI: Reactive signals, zero-eval actions, OOB swaps, @diag telemetry
 * - 20% Golang: Typed structs, concurrency channels (Chan<T>), single-binary streaming
 * - 15% Flutter: ShellUI, AppBar, BottomSheet, ListTile, Navigator.push/pop
 * - 15% Kotlin: 0-9 Layer stacking per segment, hardware haptics, sensors, modifiers
 */

import type { ReactiveProxy } from './types';

// -----------------------------------------------------------------------------
// 20% GOLANG: Typed Concurrency Channels & Data Structs
// -----------------------------------------------------------------------------

export interface AppzEvent<T = any> {
  channel: string;
  payload: T;
  timestamp: number;
}

export class AppzChan<T = any> {
  private listeners = new Set<(val: T) => void>();

  send(val: T): void {
    this.listeners.forEach(cb => {
      try { cb(val); } catch (e) { console.error(`[AppzChan]`, e); }
    });
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('appz:channel', { detail: val }));
    }
  }

  recv(cb: (val: T) => void): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  close(): void {
    this.listeners.clear();
  }
}

const activeChannels = new Map<string, AppzChan>();

export function getAppzChannel<T = any>(name: string): AppzChan<T> {
  if (!activeChannels.has(name)) {
    activeChannels.set(name, new AppzChan<T>());
  }
  return activeChannels.get(name)!;
}

// -----------------------------------------------------------------------------
// 15% KOTLIN: Hardware Sensors, Haptics & Modifier Engine
// -----------------------------------------------------------------------------

export type HapticType = 'light' | 'medium' | 'heavy' | 'selection' | 'success' | 'warning' | 'error';

export const HardwareBridge = {
  haptic(type: HapticType = 'light'): void {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      switch (type) {
        case 'light': navigator.vibrate(10); break;
        case 'medium': navigator.vibrate(25); break;
        case 'heavy': navigator.vibrate(50); break;
        case 'selection': navigator.vibrate(5); break;
        case 'success': navigator.vibrate([15, 30, 15]); break;
        case 'warning': navigator.vibrate([30, 50, 30]); break;
        case 'error': navigator.vibrate([50, 100, 50]); break;
      }
    }
  },

  async requestWakeLock(): Promise<boolean> {
    if (typeof navigator !== 'undefined' && 'wakeLock' in navigator) {
      try {
        await (navigator as any).wakeLock.request('screen');
        return true;
      } catch (e) { return false; }
    }
    return false;
  }
};

// -----------------------------------------------------------------------------
// 15% FLUTTER: Navigator Stack, BottomSheet & Gesture Recognizers
// -----------------------------------------------------------------------------

export interface NavRoute {
  url: string;
  title?: string;
  transition: 'slide-left' | 'slide-right' | 'fade' | 'sheet';
}

export const AppzNavigator = {
  history: [] as string[],

  push(url: string, transition = 'slide-left'): Promise<void> {
    HardwareBridge.haptic('selection');
    this.history.push(url);
    if (typeof window !== 'undefined' && (window as any).htmx) {
      return (window as any).htmx.ajax('GET', url, {
        target: 'app-shellui',
        swap: 'innerHTML transition:true'
      });
    }
    return Promise.resolve();
  },

  pop(): boolean {
    if (this.history.length <= 1) return false;
    HardwareBridge.haptic('light');
    this.history.pop();
    const prevUrl = this.history[this.history.length - 1];
    if (typeof window !== 'undefined' && (window as any).htmx) {
      (window as any).htmx.ajax('GET', prevUrl, {
        target: 'app-shellui',
        swap: 'innerHTML transition:true'
      });
    }
    return true;
  },

  showSheet(sheetId: string, snapPoints = [0.35, 0.85]): void {
    HardwareBridge.haptic('medium');
    const sheet = document.querySelector(sheetId) as HTMLElement;
    if (!sheet) return;
    sheet.classList.remove('hidden');
    sheet.style.transform = `translateY(0%)`;
  },

  hideSheet(sheetId: string): void {
    HardwareBridge.haptic('light');
    const sheet = document.querySelector(sheetId) as HTMLElement;
    if (!sheet) return;
    sheet.style.transform = `translateY(100%)`;
    setTimeout(() => sheet.classList.add('hidden'), 250);
  }
};

// -----------------------------------------------------------------------------
// 0-9 LAYER & SEGMENT STACKING SYSTEM (Photoshop-like Z-Index Coordinates)
// -----------------------------------------------------------------------------

export function applySegmentLayerStyles(el: HTMLElement): void {
  const levelAttr = el.getAttribute('level') || el.getAttribute('layer') || '0';
  const level = parseInt(levelAttr, 10);
  const clampedLevel = Math.max(0, Math.min(9, isNaN(level) ? 0 : level));

  // Photoshop Stacking Context: Layer 0-9 maps to CSS z-index 0..90
  el.style.position = 'relative';
  el.style.zIndex = String(clampedLevel * 10);
  el.setAttribute('data-resolved-layer', String(clampedLevel));
}

// -----------------------------------------------------------------------------
// 50% HTMXUI: Declarative Custom Elements & Runtime Mount
// -----------------------------------------------------------------------------

export class AppzEngine {
  init(root: Document | HTMLElement = document): void {
    // 1. Process Segment Layers (0-9)
    root.querySelectorAll('app-layer, [app-layer], [layer]').forEach(el => {
      applySegmentLayerStyles(el as HTMLElement);
    });

    // 2. Process Pull-to-Refresh
    root.querySelectorAll('[hx-pull-refresh], [app-pull-refresh]').forEach(el => {
      this.bindPullToRefresh(el as HTMLElement);
    });

    // 3. Process Bottom Sheets
    root.querySelectorAll('app-bottom-sheet, [app-bottom-sheet]').forEach(el => {
      this.bindBottomSheet(el as HTMLElement);
    });

    // 4. Process Virtual Game Joysticks
    root.querySelectorAll('app-joystick, [app-joystick]').forEach(el => {
      this.bindJoystick(el as HTMLElement);
    });
  }

  bindPullToRefresh(el: HTMLElement): void {
    let startY = 0;
    let currentY = 0;
    const threshold = 70;
    const refreshUrl = el.getAttribute('hx-pull-refresh') || el.getAttribute('app-pull-refresh') || '';

    el.addEventListener('touchstart', (e: TouchEvent) => {
      if (el.scrollTop === 0) {
        startY = e.touches[0].clientY;
      }
    }, { passive: true });

    el.addEventListener('touchmove', (e: TouchEvent) => {
      if (startY === 0) return;
      currentY = e.touches[0].clientY;
      const pullDist = Math.max(0, currentY - startY);
      if (pullDist > 0 && pullDist < 120) {
        el.style.transform = `translateY(${pullDist * 0.4}px)`;
        if (pullDist > threshold) HardwareBridge.haptic('selection');
      }
    }, { passive: true });

    el.addEventListener('touchend', () => {
      const pullDist = Math.max(0, currentY - startY);
      startY = 0;
      currentY = 0;
      el.style.transform = '';
      if (pullDist >= threshold && refreshUrl && typeof window !== 'undefined' && (window as any).htmx) {
        HardwareBridge.haptic('success');
        (window as any).htmx.ajax('GET', refreshUrl, { target: el, swap: 'innerHTML' });
      }
    });
  }

  bindBottomSheet(el: HTMLElement): void {
    let startY = 0;
    el.style.transition = 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)';
    const handle = el.querySelector('.drag-handle') || el;

    handle.addEventListener('touchstart', (e: any) => {
      startY = e.touches[0].clientY;
    }, { passive: true });

    handle.addEventListener('touchmove', (e: any) => {
      const deltaY = e.touches[0].clientY - startY;
      if (deltaY > 0) {
        el.style.transform = `translateY(${deltaY}px)`;
      }
    }, { passive: true });

    handle.addEventListener('touchend', (e: any) => {
      const deltaY = (e.changedTouches ? e.changedTouches[0].clientY : 0) - startY;
      if (deltaY > 100) {
        AppzNavigator.hideSheet(`#${el.id}`);
      } else {
        el.style.transform = 'translateY(0%)';
      }
    });
  }

  bindJoystick(el: HTMLElement): void {
    const channelName = el.getAttribute('hx-chan-send') || 'game:joystick';
    const ch = getAppzChannel(channelName);
    let active = false;

    const handleMove = (x: number, y: number) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const normX = Math.max(-1, Math.min(1, (x - centerX) / (rect.width / 2)));
      const normY = Math.max(-1, Math.min(1, (y - centerY) / (rect.height / 2)));
      ch.send({ x: normX, y: normY });
    };

    el.addEventListener('pointerdown', (e) => {
      active = true;
      handleMove(e.clientX, e.clientY);
    });

    window.addEventListener('pointermove', (e) => {
      if (active) handleMove(e.clientX, e.clientY);
    });

    window.addEventListener('pointerup', () => {
      if (active) {
        active = false;
        ch.send({ x: 0, y: 0 }); // Snap back to center
      }
    });
  }
}

export const Appz = new AppzEngine();

// Public Global API
if (typeof window !== 'undefined') {
  (window as any).Appz = Appz;
  (window as any).$appz = {
    navigator: AppzNavigator,
    push: AppzNavigator.push.bind(AppzNavigator),
    pop: AppzNavigator.pop.bind(AppzNavigator),
    sheet: AppzNavigator.showSheet.bind(AppzNavigator),
    sheetClose: AppzNavigator.hideSheet.bind(AppzNavigator),
    haptic: HardwareBridge.haptic.bind(HardwareBridge),
    chan: getAppzChannel,
    send(name: string, val: any) { getAppzChannel(name).send(val); },
    recv(name: string, cb: (val: any) => void) { return getAppzChannel(name).recv(cb); }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Appz.init());
  } else {
    Appz.init();
  }
}
