/**
 * HTMX-FORM — Declarative Validation, Form State Machine & Optimistic UI
 * Written in TypeScript for type safety and framework extensibility.
 */

import type { FormState, ValidatorFn, HxFormAPI } from './types';

export const defaultValidators: Record<string, ValidatorFn> = {
  required: (val: any) => {
    if (val === undefined || val === null) return false;
    if (typeof val === 'string') return val.trim().length > 0;
    if (Array.isArray(val)) return val.length > 0;
    return true;
  },
  email: (val: any) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
  url: (val: any) => !val || /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/.*)?$/i.test(val),
  min: (val: any, len: string) => !val || (typeof val === 'number' ? val >= parseFloat(len) : val.length >= parseInt(len, 10)),
  max: (val: any, len: string) => !val || (typeof val === 'number' ? val <= parseFloat(len) : val.length <= parseInt(len, 10)),
  numeric: (val: any) => !val || /^-?\d+(\.\d+)?$/.test(val),
  alphanumeric: (val: any) => !val || /^[a-zA-Z0-9]+$/.test(val),
  pattern: (val: any, regexStr: string) => !val || new RegExp(regexStr).test(val),
  match: (val: any, targetName: string, form: HTMLFormElement) => {
    const targetInput = form.querySelector(`[name="${targetName}"]`) as HTMLInputElement;
    return targetInput ? val === targetInput.value : true;
  }
};

export const defaultMessages: Record<string, string> = {
  required: 'This field is required.',
  email: 'Please enter a valid email address.',
  url: 'Please enter a valid URL.',
  min: 'Value is too short or below minimum.',
  max: 'Value exceeds the maximum length.',
  numeric: 'Please enter numbers only.',
  alphanumeric: 'Only letters and numbers are allowed.',
  pattern: 'Please match the requested format.',
  match: 'Fields do not match.'
};

export function validateInput(input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, form: HTMLFormElement): { valid: boolean; error: string | null } {
  const rulesStr = input.getAttribute('hx-validate');
  if (!rulesStr) return { valid: true, error: null };

  const rules = rulesStr.split('|');
  const val = (input as HTMLInputElement).type === 'checkbox' ? ((input as HTMLInputElement).checked ? input.value : '') : input.value;

  for (const rule of rules) {
    const parts = rule.split(':');
    const ruleName = parts[0].trim();
    const param = parts[1] || '';

    const validator = defaultValidators[ruleName];
    if (validator) {
      const isValid = validator(val, param, form);
      if (!isValid) {
        const customMsg = input.getAttribute(`hx-msg-${ruleName}`) || input.getAttribute('hx-msg') || defaultMessages[ruleName];
        return { valid: false, error: customMsg };
      }
    }
  }

  return { valid: true, error: null };
}

export function initForm(form: HTMLFormElement): FormState {
  if ((form as any)._hxFormInit) return (form as any)._hxFormState;
  (form as any)._hxFormInit = true;

  const state: FormState = {
    valid: true,
    dirty: false,
    touched: {},
    errors: {},
    submitting: false
  };
  (form as any)._hxFormState = state;

  const inputs = form.querySelectorAll('input[hx-validate], textarea[hx-validate], select[hx-validate]') as NodeListOf<HTMLInputElement>;

  function updateFormState(): void {
    let isFormValid = true;
    const errors: Record<string, string | null> = {};

    inputs.forEach(input => {
      const name = input.name || input.id;
      const res = validateInput(input, form);

      if (!res.valid) {
        isFormValid = false;
        if (name) errors[name] = res.error;
      }

      const errorEl = (form.querySelector(`[hx-error-for="${name}"]`) || document.querySelector(`[hx-error-for="${name}"]`)) as HTMLElement;
      if (errorEl) {
        if (!res.valid && (state.touched[name] || state.submitting)) {
          errorEl.innerText = res.error || '';
          errorEl.style.display = '';
          input.setAttribute('aria-invalid', 'true');
          input.classList.add('border-destructive');
        } else {
          errorEl.innerText = '';
          errorEl.style.display = 'none';
          input.removeAttribute('aria-invalid');
          input.classList.remove('border-destructive');
        }
      }
    });

    state.valid = isFormValid;
    state.errors = errors;

    if (typeof window !== 'undefined' && (window as any).HxBolt && (window as any).HxBolt.getState) {
      const boltState = (window as any).HxBolt.getState(form);
      if (boltState) {
        boltState.$form = { ...state };
      }
    }
  }

  inputs.forEach(input => {
    const name = input.name || input.id;

    input.addEventListener('focus', () => {
      state.dirty = true;
    });

    input.addEventListener('blur', () => {
      if (name) state.touched[name] = true;
      updateFormState();
    });

    input.addEventListener('input', () => {
      state.dirty = true;
      updateFormState();
    });
  });

  form.addEventListener('submit', (e: Event) => {
    state.submitting = true;
    inputs.forEach(input => {
      const name = input.name || input.id;
      if (name) state.touched[name] = true;
    });
    updateFormState();

    if (!state.valid) {
      e.preventDefault();
      e.stopPropagation();
      const firstInvalid = form.querySelector('[aria-invalid="true"]') as HTMLElement;
      if (firstInvalid) firstInvalid.focus();
    }
  });

  if (form.hasAttribute('hx-optimistic')) {
    let snapshot: string | null = null;

    form.addEventListener('htmx:beforeRequest', () => {
      const targetSel = form.getAttribute('hx-target') || form;
      const target = typeof targetSel === 'string' ? document.querySelector(targetSel) : targetSel;
      if (target) {
        snapshot = (target as HTMLElement).innerHTML;
      }
    });

    form.addEventListener('htmx:responseError', () => {
      const targetSel = form.getAttribute('hx-target') || form;
      const target = typeof targetSel === 'string' ? document.querySelector(targetSel) : targetSel;
      if (target && snapshot !== null) {
        (target as HTMLElement).innerHTML = snapshot;
        console.warn('[htmx-form] Optimistic update failed. Rolled back to previous state.');
      }
    });
  }

  updateFormState();
  return state;
}

export const HxForm: HxFormAPI = {
  validators: defaultValidators,
  messages: defaultMessages,
  init: initForm
};

if (typeof window !== 'undefined') {
  window.HxForm = HxForm;

  if (typeof (window as any).htmx !== 'undefined') {
    (window as any).htmx.defineExtension('form', {
      onEvent: function (name: string, evt: any) {
        if (name === "htmx:afterProcessNode") {
          const elt = evt.detail.elt;
          if (elt.tagName === 'FORM') {
            initForm(elt as HTMLFormElement);
          }
        }
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('form').forEach(form => initForm(form as HTMLFormElement));
  });
}
