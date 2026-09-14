import { describe, test, expect } from 'bun:test';
import { safeEvaluate, safeExecuteAction, formatDiag, ERROR_CATALOG, config } from '../src/index';

describe('Zero-Eval Safe Expression Evaluator & Action Executor', () => {
  const sampleState = {
    count: 10,
    open: true,
    tab: 'dashboard',
    user: { name: 'Ada Lovelace', active: true, scores: [100, 95, 88] },
    meta: { 'deep-key': 42 }
  };

  const fxScope = {
    $toast: (msg: string) => `Toast: ${msg}`,
    $toggle: (k: string) => { (sampleState as any)[k] = !(sampleState as any)[k]; }
  };

  test('evaluates arithmetic and comparisons safely', () => {
    expect(safeEvaluate('count * 5', sampleState, fxScope)).toBe(50);
    expect(safeEvaluate('count > 5 && open', sampleState, fxScope)).toBe(true);
    expect(safeEvaluate('count === 10', sampleState, fxScope)).toBe(true);
    expect(safeEvaluate('count != 20', sampleState, fxScope)).toBe(true);
  });

  test('evaluates nested property access and bracket notation', () => {
    expect(safeEvaluate('user.name', sampleState, fxScope)).toBe('Ada Lovelace');
    expect(safeEvaluate('user["scores"][0]', sampleState, fxScope)).toBe(100);
    expect(safeEvaluate('user.scores[1]', sampleState, fxScope)).toBe(95);
    expect(safeEvaluate('meta["deep-key"]', sampleState, fxScope)).toBe(42);
  });

  test('evaluates ternaries and logical coalescing', () => {
    expect(safeEvaluate('open ? "Visible" : "Hidden"', sampleState, fxScope)).toBe('Visible');
    expect(safeEvaluate('!open ? "A" : "B"', sampleState, fxScope)).toBe('B');
    expect(safeEvaluate('null ?? "Fallback"', sampleState, fxScope)).toBe('Fallback');
    expect(safeEvaluate('false || "Fallback"', sampleState, fxScope)).toBe('Fallback');
  });

  test('evaluates object literal class maps', () => {
    const classMap = safeEvaluate("{'bg-primary': open, 'hidden': !open}", sampleState, fxScope);
    expect(classMap).toEqual({ 'bg-primary': true, 'hidden': false });
  });

  test('evaluates function invocations in fx scope', () => {
    expect(safeEvaluate('$toast("Alert")', sampleState, fxScope)).toBe('Toast: Alert');
  });

  test('executes actions with mutations and increments', () => {
    safeExecuteAction('count++', sampleState, fxScope);
    expect(sampleState.count).toBe(11);

    safeExecuteAction('tab = "analytics"; count += 5', sampleState, fxScope);
    expect(sampleState.tab).toBe('analytics');
    expect(sampleState.count).toBe(16);

    safeExecuteAction('$toggle("open")', sampleState, fxScope);
    expect(sampleState.open).toBe(false);
  });

  test('evaluates arrow-function closures in array reduce, map and filter', () => {
    const state = {
      items: [
        { id: 1, name: "Mechanical Keyboard", price: 120, qty: 1 },
        { id: 2, name: "Wireless Mouse", price: 60, qty: 2 }
      ]
    };

    // README Quickstart expression
    const total = safeEvaluate('items.reduce((sum, i) => sum + (i.price * i.qty), 0)', state);
    expect(total).toBe(240);

    // Object containing computed reduce
    const computedObj = safeEvaluate('{ totalPrice: items.reduce((sum, i) => sum + (i.price * i.qty), 0) }', state);
    expect(computedObj).toEqual({ totalPrice: 240 });

    // Chained filter and map
    const premiumItems = safeEvaluate('items.filter(i => i.price > 100).map(i => i.name)', state);
    expect(premiumItems).toEqual(['Mechanical Keyboard']);
  });

  test('interpolates expressions inside template literals', () => {
    const state = { user: { name: 'Alice' }, count: 5, color: 'emerald' };
    const str = safeEvaluate('`Hello ${user.name}, you have ${count} alerts (theme: bg-${color}-500)`', state);
    expect(str).toBe('Hello Alice, you have 5 alerts (theme: bg-emerald-500)');
  });

  test('generates standardized [@diag CODE] outputs', () => {
    const msg = formatDiag('HTMXUI-BOLT-006', 'Blocked by CSP policy');
    expect(msg).toContain('[@diag HTMXUI-BOLT-006]');
    expect(msg).toContain('CSP EvalError');
    expect(msg).toContain('Fix:');
  });
});
