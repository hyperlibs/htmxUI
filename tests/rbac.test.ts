import { describe, test, expect, beforeEach } from 'bun:test';
import { 
  matchRole, 
  matchPermission, 
  enforceElementAuth, 
  HxBolt, 
  authState, 
  clearDiagnostics, 
  diagnosticHistory, 
  evaluateExpression, 
  config 
} from '../src/index';

class MockElement {
  tagName: string;
  attributes: Record<string, string> = {};
  style: Record<string, string> = {};
  classList = {
    _classes: new Set<string>(),
    add(...cls: string[]) { cls.forEach(c => this._classes.add(c)); },
    remove(...cls: string[]) { cls.forEach(c => this._classes.delete(c)); },
    contains(c: string) { return this._classes.has(c); }
  };
  innerHTML = '';
  textContent = '';
  listeners: Record<string, Function[]> = {};

  constructor(tagName = 'div') {
    this.tagName = tagName.toUpperCase();
  }

  getAttribute(name: string) { return this.attributes[name] !== undefined ? this.attributes[name] : null; }
  setAttribute(name: string, val: string) { this.attributes[name] = val; }
  removeAttribute(name: string) { delete this.attributes[name]; }
  hasAttribute(name: string) { return name in this.attributes; }
  addEventListener(evt: string, fn: Function) {
    if (!this.listeners[evt]) this.listeners[evt] = [];
    this.listeners[evt].push(fn);
  }
  dispatchEvent(event: any) {
    const list = this.listeners[event.type] || [];
    list.forEach(fn => fn(event));
    return true;
  }
}

describe('Bank-Grade Role-Based Access Control (RBAC) & Authorization Suite', () => {
  beforeEach(() => {
    authState.roles = [];
    authState.permissions = [];
    authState.user = {};
    clearDiagnostics();
  });

  test('1. matchRole: evaluates role hierarchy, OR/AND combinations, negations and wildcards', () => {
    // Basic match
    expect(matchRole('admin', ['admin'])).toBe(true);
    expect(matchRole('admin', ['user', 'editor'])).toBe(false);

    // Multi-role OR (comma or pipe)
    expect(matchRole('admin, manager', ['manager'])).toBe(true);
    expect(matchRole('admin | manager | compliance', ['compliance'])).toBe(true);
    expect(matchRole('admin, manager', ['guest'])).toBe(false);

    // Negation (!role)
    expect(matchRole('!guest', ['user'])).toBe(true);
    expect(matchRole('!guest', ['guest'])).toBe(false);

    // Wildcards (e.g., finance:*)
    expect(matchRole('finance:*', ['finance:auditor'])).toBe(true);
    expect(matchRole('finance:*', ['tech:admin'])).toBe(false);

    // Superuser bypass
    expect(matchRole('executive:board', ['*'])).toBe(true);
    expect(matchRole('executive:board', ['superadmin'])).toBe(true);
  });

  test('2. matchPermission: evaluates verb/resource granular permissions and logical operators', () => {
    // Direct permission
    expect(matchPermission('trade:execute', ['trade:execute'])).toBe(true);
    expect(matchPermission('trade:execute', ['trade:view'])).toBe(false);

    // Wildcard permissions
    expect(matchPermission('trade:cancel', ['trade:*'])).toBe(true);
    expect(matchPermission('account:delete', ['*'])).toBe(true);

    // Multi-permission AND (&)
    expect(matchPermission('account:read & trade:execute', ['account:read', 'trade:execute'])).toBe(true);
    expect(matchPermission('account:read & trade:execute', ['account:read'])).toBe(false);

    // Multi-permission OR (|)
    expect(matchPermission('compliance:review | admin:override', ['compliance:review'])).toBe(true);
    expect(matchPermission('compliance:review | admin:override', ['guest:view'])).toBe(false);

    // Negation
    expect(matchPermission('!wire:freeze', ['wire:send'])).toBe(true);
    expect(matchPermission('!wire:freeze', ['wire:freeze'])).toBe(false);
  });

  test('3. enforceElementAuth (hide mode): hides element and dispatches @diag on unauthorized role', () => {
    const el = new MockElement('div') as any;
    el.setAttribute('hx-role', 'compliance, admin');
    el.innerHTML = '<p>Confidential Audit Log</p>';

    HxBolt.setRoles(['user']);
    const allowedBefore = enforceElementAuth(el);

    // Should be blocked and hidden
    expect(allowedBefore).toBe(false);
    expect(el.style.display).toBe('none');
    expect(el.hasAttribute('aria-hidden')).toBe(true);
    expect(el.hasAttribute('hidden')).toBe(true);

    // Check security diagnostics
    expect(diagnosticHistory.length).toBeGreaterThan(0);
    expect(diagnosticHistory[0].code).toBe('HTMXUI-AUTH-001');

    // Escalate role -> Should unhide
    HxBolt.setRoles(['compliance']);
    const allowedAfter = enforceElementAuth(el);
    expect(allowedAfter).toBe(true);
    expect(el.style.display).toBe('');
    expect(el.hasAttribute('hidden')).toBe(false);
  });

  test('4. enforceElementAuth (disable mode): disables interactive controls when unauthorized', () => {
    const button = new MockElement('button') as any;
    button.setAttribute('hx-can.disable', 'trade:execute');
    button.textContent = 'Execute Trade ($1,000,000)';

    HxBolt.setPermissions(['trade:view']);
    const allowedBefore = enforceElementAuth(button);

    expect(allowedBefore).toBe(false);
    expect(button.hasAttribute('disabled')).toBe(true);
    expect(button.getAttribute('aria-disabled')).toBe('true');
    expect(button.classList.contains('pointer-events-none')).toBe(true);
    expect(button.classList.contains('opacity-50')).toBe(true);

    // Grant permission
    HxBolt.setPermissions(['trade:execute']);
    const allowedAfter = enforceElementAuth(button);
    expect(allowedAfter).toBe(true);
    expect(button.hasAttribute('disabled')).toBe(false);
    expect(button.classList.contains('pointer-events-none')).toBe(false);
  });

  test('5. enforceElementAuth (redact mode): masks sensitive PII / financial text with security stamp', () => {
    const pii = new MockElement('div') as any;
    pii.setAttribute('hx-role.redact', 'bank:officer');
    pii.innerHTML = '<span>SSN: 000-12-3456 | Balance: $4,500,210.00</span>';

    HxBolt.setRoles(['teller']);
    const allowedBefore = enforceElementAuth(pii);

    expect(allowedBefore).toBe(false);
    expect(pii.innerHTML).toContain('[REDACTED — RESTRICTED ACCESS]');
    expect(pii.classList.contains('hx-auth-redacted')).toBe(true);

    // Authenticate as bank officer
    HxBolt.setRoles(['bank:officer']);
    const allowedAfter = enforceElementAuth(pii);
    expect(allowedAfter).toBe(true);
    expect(pii.innerHTML).toContain('SSN: 000-12-3456 | Balance: $4,500,210.00');
    expect(pii.classList.contains('hx-auth-redacted')).toBe(false);
  });

  test('6. Security Telemetry: dispatches htmx:auth-denied custom DOM event', () => {
    const el = new MockElement('button') as any;
    el.setAttribute('hx-can', 'wire:transfer');

    let eventFired = false;
    let eventDetail: any = null;

    el.addEventListener('htmx:auth-denied', (e: any) => {
      eventFired = true;
      eventDetail = e.detail;
    });

    HxBolt.setPermissions(['account:view']);
    enforceElementAuth(el);

    expect(eventFired).toBe(true);
    expect(eventDetail.required).toBe('wire:transfer');
    expect(eventDetail.type).toBe('permission');
    expect(eventDetail.userPermissions).toEqual(['account:view']);
  });

  test('7. HyperFX $can, $hasRole & $auth in reactive expression scope', () => {
    HxBolt.auth({
      roles: ['compliance', 'auditor'],
      permissions: ['audit:export', 'report:generate']
    });

    const canExport = evaluateExpression('$can("audit:export")', {});
    expect(canExport).toBe(true);

    const canDelete = evaluateExpression('$can("account:delete")', {});
    expect(canDelete).toBe(false);

    const isAuditor = evaluateExpression('$hasRole("auditor")', {});
    expect(isAuditor).toBe(true);

    const isRoot = evaluateExpression('$hasRole("root")', {});
    expect(isRoot).toBe(false);

    const authRoles = evaluateExpression('$auth.roles', {});
    expect(authRoles).toEqual(['compliance', 'auditor']);
  });

  test('8. Strict CSP Level 3 Zero-Eval Default Verification', () => {
    expect(config.strictCSP).toBe(true);

    // Ensure arithmetic, closures, logical operators, and pipeline run safely without eval
    const calc = evaluateExpression('price * (1 + tax) |> Math.round', { price: 100, tax: 0.08 });
    expect(calc).toBe(108);

    const state = { items: [{ p: 10, q: 2 }, { p: 20, q: 3 }] };
    const total = evaluateExpression('items.reduce((acc, i) => acc + (i.p * i.q), 0)', state);
    expect(total).toBe(80);
  });
});
