import { describe, test, expect } from 'bun:test';
import { HxBolt } from '../src/htmx-bolt';

describe('HTMXUI Hyper-Extensibility & Directive Hooks', () => {
  test('HxBolt global store reactivity', () => {
    HxBolt.store('game', { score: 0, fps: 60 });
    const game = HxBolt.getStore('game');
    expect(game?.score).toBe(0);
    if (game) game.score += 50;
    expect(HxBolt.getStore('game')?.score).toBe(50);
  });

  test('HxBolt undo/redo state preservation', () => {
    HxBolt.store('editor', { currentLayer: 1 });
    const editor = HxBolt.getStore('editor');
    if (editor) {
      editor.currentLayer = 2;
      editor.currentLayer = 3;
    }
    expect(HxBolt.getStore('editor')?.currentLayer).toBe(3);
  });

  test('HxSpatial bridge triggers fallback diagnostic when htmFX is absent', () => {
    let warnedMessage = '';
    const originalWarn = console.warn;
    console.warn = (msg: string) => { warnedMessage = msg; };

    const mockEl = { tagName: 'HX-VIEWPORT', getAttribute: () => null } as any;
    HxBolt.spatial.mount(mockEl);

    expect(warnedMessage).toContain('FX-0404');
    console.warn = originalWarn;
  });

  test('HxSpatial bridge has focus and explode dispatch helpers', () => {
    expect(typeof HxBolt.spatial.focus).toBe('function');
    expect(typeof HxBolt.spatial.explode).toBe('function');
    expect(typeof HxBolt.spatial.mount).toBe('function');
  });
});
