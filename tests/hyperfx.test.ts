import { describe, test, expect } from 'bun:test';
import { HyperFX, evaluateExpression, executeAction } from '../src/htmx-bolt';

describe('HyperFX High-Velocity Action Functions', () => {
  test('$toggle inverts boolean property in reactive state', () => {
    const state = { modalOpen: false, activeTab: 'general' };
    executeAction('$toggle("modalOpen")', state);
    expect(state.modalOpen).toBe(true);
    executeAction('$toggle("modalOpen")', state);
    expect(state.modalOpen).toBe(false);
  });

  test('HyperFX.toast dispatches htmx:toast custom event', () => {
    let capturedDetail: any = null;
    if (typeof document !== 'undefined') {
      document.body.addEventListener('htmx:toast', (e: any) => {
        capturedDetail = e.detail;
      }, { once: true });
    }

    HyperFX.toast('Invoice created!', 'success');
    if (typeof document !== 'undefined') {
      expect(capturedDetail?.message).toBe('Invoice created!');
      expect(capturedDetail?.type).toBe('success');
    }
  });

  test('HyperFX sound synthesizer executes without throwing', () => {
    expect(() => {
      HyperFX.sound('ping');
      HyperFX.sound('success');
      HyperFX.sound('error');
    }).not.toThrow();
  });
});
