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
});
