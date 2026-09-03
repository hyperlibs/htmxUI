import { describe, test, expect } from 'bun:test';
import { HxBolt } from '../src/htmx-bolt';

describe('Kosmos 3D Universe Simulation Suite', () => {
  test('HxBolt state reactivity tracks celestial body selection', () => {
    HxBolt.store('cosmos', { selectedId: 'earth', timeWarp: 1.0, isPaused: false });
    const cosmos = HxBolt.getStore('cosmos');
    expect(cosmos?.selectedId).toBe('earth');

    if (cosmos) {
      cosmos.selectedId = 'mars';
      cosmos.timeWarp = 100.0;
    }
    expect(HxBolt.getStore('cosmos')?.selectedId).toBe('mars');
    expect(HxBolt.getStore('cosmos')?.timeWarp).toBe(100.0);
  });

  test('Keplerian orbital velocity formula calculates correct velocity', () => {
    const G = 6.67430e-11;
    const M_sun = 1.989e30;
    const r_earth = 149.6e9; // 1 AU in meters
    const v_earth = Math.sqrt((G * M_sun) / r_earth) / 1000; // km/s

    expect(v_earth).toBeCloseTo(29.78, 0);
  });
});
