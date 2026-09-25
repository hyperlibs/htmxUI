import { describe, test, expect } from 'bun:test';
import { AppzChan, getAppzChannel, applySegmentLayerStyles, AppzNavigator, HardwareBridge } from '../src/appz';

describe('Appz Engine: Mobile & Spatial Game Architecture', () => {
  test('20% Go: AppzChan message transmission and pub/sub', () => {
    const ch = getAppzChannel<{ x: number; y: number }>('game:joystick');
    let latestCoords = { x: 0, y: 0 };
    
    const unsub = ch.recv((val) => {
      latestCoords = val;
    });

    ch.send({ x: 0.5, y: -0.8 });
    expect(latestCoords.x).toBe(0.5);
    expect(latestCoords.y).toBe(-0.8);

    unsub();
    ch.send({ x: 1.0, y: 1.0 });
    expect(latestCoords.x).toBe(0.5); // Remains unchanged after unsub
  });

  test('15% Kotlin: 0-9 Photoshop-style Layer Z-Index clamping', () => {
    const mockEl = {
      attributes: { level: '5' },
      style: {} as Record<string, string>,
      getAttribute(name: string) { return this.attributes[name]; },
      setAttribute(name: string, val: string) { this.attributes[name] = val; }
    } as any;

    applySegmentLayerStyles(mockEl);
    expect(mockEl.style.zIndex).toBe('50');
    expect(mockEl.attributes['data-resolved-layer']).toBe('5');

    // Test overflow clamping (>9 clamped to 9)
    mockEl.attributes.level = '15';
    applySegmentLayerStyles(mockEl);
    expect(mockEl.style.zIndex).toBe('90');
    expect(mockEl.attributes['data-resolved-layer']).toBe('9');

    // Test underflow clamping (<0 clamped to 0)
    mockEl.attributes.level = '-3';
    applySegmentLayerStyles(mockEl);
    expect(mockEl.style.zIndex).toBe('0');
    expect(mockEl.attributes['data-resolved-layer']).toBe('0');
  });

  test('15% Flutter: Navigator stack history and transitions', () => {
    AppzNavigator.history = [];
    AppzNavigator.push('/m/home');
    AppzNavigator.push('/m/vitals');
    
    expect(AppzNavigator.history.length).toBe(2);
    expect(AppzNavigator.history[1]).toBe('/m/vitals');

    const popped = AppzNavigator.pop();
    expect(popped).toBe(true);
    expect(AppzNavigator.history.length).toBe(1);
    expect(AppzNavigator.history[0]).toBe('/m/home');
  });

  test('HardwareBridge haptics execution without throwing', () => {
    expect(() => {
      HardwareBridge.haptic('light');
      HardwareBridge.haptic('success');
      HardwareBridge.haptic('error');
    }).not.toThrow();
  });
});
