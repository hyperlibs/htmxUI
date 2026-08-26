/**
 * HTMX-FORM — Enterprise Validation, Form Wizard Engine, Cascading Fields & Optimistic UI
 * 
 * Features:
 * - Declarative validation rules (required, email, url, min, max, pattern, match)
 * - Multi-Step Form Wizard (<form hx-wizard>) with step validation gates and progress tracking
 * - Cascading Field Dependencies (hx-depends="country->state,city")
 * - Form state machine ($form.valid, $form.dirty, $form.errors)
 * - Optimistic UI updates with automatic rollback on error
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

// 1. Cascading Field Dependencies (hx-depends="country->state,city")
function initCascadingFields(form: HTMLFormElement): void {
  const dependentFields = form.querySelectorAll('[hx-depends]') as NodeListOf<HTMLElement>;
  dependentFields.forEach(el => {
    const spec = el.getAttribute('hx-depends');
    if (!spec) return;

    // Syntax: "parentField->childField1,childField2"
    const [parentName, childrenStr] = spec.split('->');
    if (!parentName || !childrenStr) return;

    const parentInput = form.querySelector(`[name="${parentName.trim()}"], #${parentName.trim()}`) as HTMLInputElement | HTMLSelectElement;
    if (!parentInput) return;

    const childNames = childrenStr.split(',').map(s => s.trim());

    parentInput.addEventListener('change', () => {
      childNames.forEach(childName => {
        const childInput = form.querySelector(`[name="${childName}"], #${childName}`) as HTMLInputElement | HTMLSelectElement;
        if (childInput) {
          childInput.value = '';
          childInput.dispatchEvent(new Event('change', { bubbles: true }));

          // If child has hx-get, trigger HTMX fetch with parent value
          if (childInput.hasAttribute('hx-get') && typeof (window as any).htmx !== 'undefined') {
            (window as any).htmx.trigger(childInput, 'change');
          }
        }
      });
    });
  });
}

// 2. Multi-Step Form Wizard (<form hx-wizard>)
function initFormWizard(form: HTMLFormElement): void {
  if (!form.hasAttribute('hx-wizard') && !form.classList.contains('hx-wizard')) return;

  const steps = Array.from(form.querySelectorAll('fieldset[hx-step], [hx-step]')) as HTMLElement[];
  if (steps.length === 0) return;

  let currentStep = 1;
  const totalSteps = steps.length;

  function updateWizardUI(): void {
    steps.forEach((stepEl, idx) => {
      const stepNum = parseInt(stepEl.getAttribute('hx-step') || String(idx + 1), 10);
      if (stepNum === currentStep) {
        stepEl.style.display = '';
        stepEl.removeAttribute('disabled');
      } else {
        stepEl.style.display = 'none';
        stepEl.setAttribute('disabled', 'true');
      }
    });

    // Update progress badges and step titles
    form.querySelectorAll('.hx-wizard-current-step').forEach(el => el.textContent = String(currentStep));
    form.querySelectorAll('.hx-wizard-total-steps').forEach(el => el.textContent = String(totalSteps));
    form.querySelectorAll('.hx-wizard-progress-bar').forEach(el => {
      (el as HTMLElement).style.width = `${(currentStep / totalSteps) * 100}%`;
    });

    // Update Prev/Next buttons
    const prevBtn = form.querySelector('[hx-wizard-prev]') as HTMLButtonElement;
    if (prevBtn) prevBtn.disabled = currentStep === 1;

    const nextBtn = form.querySelector('[hx-wizard-next]') as HTMLButtonElement;
    if (nextBtn) {
      if (currentStep === totalSteps) {
        nextBtn.textContent = nextBtn.getAttribute('hx-wizard-submit-text') || 'Submit';
      } else {
        nextBtn.textContent = nextBtn.getAttribute('hx-wizard-next-text') || 'Next →';
      }
    }

    // Sync with Bolt state if present
    if (typeof (window as any).HxBolt !== 'undefined') {
      const state = (window as any).HxBolt.getState(form);
      if (state) {
        state.$wizard = {
          currentStep,
          totalSteps,
          isFirst: currentStep === 1,
          isLast: currentStep === totalSteps
        };
      }
    }
  }

  // Next button click
  const nextBtn = form.querySelector('[hx-wizard-next]') as HTMLButtonElement;
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();

      // Validate current step fields before advancing
      const currentFieldset = steps.find(s => parseInt(s.getAttribute('hx-step') || '1', 10) === currentStep);
      if (currentFieldset) {
        const stepInputs = currentFieldset.querySelectorAll('input[hx-validate], select[hx-validate], textarea[hx-validate]') as NodeListOf<HTMLInputElement>;
        let stepValid = true;
        stepInputs.forEach(input => {
          const res = validateInput(input, form);
          if (!res.valid) {
            stepValid = false;
            const name = input.name || input.id;
            const errorEl = form.querySelector(`[hx-error-for="${name}"]`) as HTMLElement;
            if (errorEl) {
              errorEl.innerText = res.error || '';
              errorEl.style.display = '';
            }
            input.setAttribute('aria-invalid', 'true');
            input.classList.add('border-destructive');
          }
        });

        if (!stepValid) {
          const firstErr = currentFieldset.querySelector('[aria-invalid="true"]') as HTMLElement;
          if (firstErr) firstErr.focus();
          return;
        }
      }

      if (currentStep < totalSteps) {
        currentStep++;
        updateWizardUI();
      } else {
        // Final submit
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    });
  }

  // Prev button click
  const prevBtn = form.querySelector('[hx-wizard-prev]') as HTMLButtonElement;
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentStep > 1) {
        currentStep--;
        updateWizardUI();
      }
    });
  }

  updateWizardUI();
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

  // Optimistic UI Rollback Handler
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

  // Initialize Wizard and Cascading features
  initCascadingFields(form);
  initFormWizard(form);

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
