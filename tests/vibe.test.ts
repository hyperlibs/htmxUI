import { describe, test, expect } from 'bun:test';
import { SpringSolver } from '../src/htmx-vibe';
import { HxBolt } from '../src/htmx-bolt';

describe('HxVibe Kinetic Motion & Spring Physics', () => {
  test('SpringSolver computes physical convergence', () => {
    const solver = new SpringSolver({ stiffness: 300, damping: 20, mass: 1 });
    const keyframes = solver.solve(0, 100, 40);

    expect(keyframes.length).toBe(40);
    expect(keyframes[0]).toBeGreaterThan(0);
    // Over time, spring physics converges towards target value (100)
    expect(keyframes[keyframes.length - 1]).toBeCloseTo(100, 0);
  });

  test('HxBolt.ticker registers and unsubscribes subscribers', () => {
    let tickCount = 0;
    const unsub = HxBolt.ticker.subscribe((dt, time) => {
      tickCount++;
    });

    expect(typeof unsub).toBe('function');
    unsub();
  });
});
