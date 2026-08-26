import { describe, test, expect } from 'bun:test';
import { createReactiveObject, SignalTracker, HxBolt } from '../src/htmx-bolt';

describe('HxBolt Signal Reactivity', () => {
  test('mutating property triggers signal subscribers', () => {
    let triggered = 0;
    const state = createReactiveObject({ count: 0 }, () => {
      triggered++;
    });

    state.count = 1;
    state.count = 2;
    expect(state.count).toBe(2);
    expect(triggered).toBe(2);
  });

  test('global store registration and retrieval', () => {
    HxBolt.store('auth', { user: 'Alice', role: 'admin' });
    const auth = HxBolt.getStore('auth');
    expect(auth).toBeDefined();
    expect(auth?.user).toBe('Alice');
    expect(auth?.role).toBe('admin');
  });

  test('undo and redo history stack works', () => {
    const state = createReactiveObject({ step: 1 });
    state.step = 2;
    state.step = 3;

    expect(state.step).toBe(3);
    const undone = HxBolt.undo();
    expect(undone).toBe(true);
    expect(state.step).toBe(2);

    const redone = HxBolt.redo();
    expect(redone).toBe(true);
    expect(state.step).toBe(3);
  });
});
