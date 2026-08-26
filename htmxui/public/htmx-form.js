// src/htmx-form.ts
var defaultValidators = {
  required: (val) => {
    if (val === undefined || val === null)
      return false;
    if (typeof val === "string")
      return val.trim().length > 0;
    if (Array.isArray(val))
      return val.length > 0;
    return true;
  },
  email: (val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
  url: (val) => !val || /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/.*)?$/i.test(val),
  min: (val, len) => !val || (typeof val === "number" ? val >= parseFloat(len) : val.length >= parseInt(len, 10)),
  max: (val, len) => !val || (typeof val === "number" ? val <= parseFloat(len) : val.length <= parseInt(len, 10)),
  numeric: (val) => !val || /^-?\d+(\.\d+)?$/.test(val),
  alphanumeric: (val) => !val || /^[a-zA-Z0-9]+$/.test(val),
  pattern: (val, regexStr) => !val || new RegExp(regexStr).test(val),
  match: (val, targetName, form) => {
    const targetInput = form.querySelector(`[name="${targetName}"]`);
    return targetInput ? val === targetInput.value : true;
  }
};
var defaultMessages = {
  required: "This field is required.",
  email: "Please enter a valid email address.",
  url: "Please enter a valid URL.",
  min: "Value is too short or below minimum.",
  max: "Value exceeds the maximum length.",
  numeric: "Please enter numbers only.",
  alphanumeric: "Only letters and numbers are allowed.",
  pattern: "Please match the requested format.",
  match: "Fields do not match."
};
function validateInput(input, form) {
  const rulesStr = input.getAttribute("hx-validate");
  if (!rulesStr)
    return { valid: true, error: null };
  const rules = rulesStr.split("|");
  const val = input.type === "checkbox" ? input.checked ? input.value : "" : input.value;
  for (const rule of rules) {
    const parts = rule.split(":");
    const ruleName = parts[0].trim();
    const param = parts[1] || "";
    const validator = defaultValidators[ruleName];
    if (validator) {
      const isValid = validator(val, param, form);
      if (!isValid) {
        const customMsg = input.getAttribute(`hx-msg-${ruleName}`) || input.getAttribute("hx-msg") || defaultMessages[ruleName];
        return { valid: false, error: customMsg };
      }
    }
  }
  return { valid: true, error: null };
}
function initCascadingFields(form) {
  const dependentFields = form.querySelectorAll("[hx-depends]");
  dependentFields.forEach((el) => {
    const spec = el.getAttribute("hx-depends");
    if (!spec)
      return;
    const [parentName, childrenStr] = spec.split("->");
    if (!parentName || !childrenStr)
      return;
    const parentInput = form.querySelector(`[name="${parentName.trim()}"], #${parentName.trim()}`);
    if (!parentInput)
      return;
    const childNames = childrenStr.split(",").map((s) => s.trim());
    parentInput.addEventListener("change", () => {
      childNames.forEach((childName) => {
        const childInput = form.querySelector(`[name="${childName}"], #${childName}`);
        if (childInput) {
          childInput.value = "";
          childInput.dispatchEvent(new Event("change", { bubbles: true }));
          if (childInput.hasAttribute("hx-get") && typeof window.htmx !== "undefined") {
            window.htmx.trigger(childInput, "change");
          }
        }
      });
    });
  });
}
function initFormWizard(form) {
  if (!form.hasAttribute("hx-wizard") && !form.classList.contains("hx-wizard"))
    return;
  const steps = Array.from(form.querySelectorAll("fieldset[hx-step], [hx-step]"));
  if (steps.length === 0)
    return;
  let currentStep = 1;
  const totalSteps = steps.length;
  function updateWizardUI() {
    steps.forEach((stepEl, idx) => {
      const stepNum = parseInt(stepEl.getAttribute("hx-step") || String(idx + 1), 10);
      if (stepNum === currentStep) {
        stepEl.style.display = "";
        stepEl.removeAttribute("disabled");
      } else {
        stepEl.style.display = "none";
        stepEl.setAttribute("disabled", "true");
      }
    });
    form.querySelectorAll(".hx-wizard-current-step").forEach((el) => el.textContent = String(currentStep));
    form.querySelectorAll(".hx-wizard-total-steps").forEach((el) => el.textContent = String(totalSteps));
    form.querySelectorAll(".hx-wizard-progress-bar").forEach((el) => {
      el.style.width = `${currentStep / totalSteps * 100}%`;
    });
    const prevBtn2 = form.querySelector("[hx-wizard-prev]");
    if (prevBtn2)
      prevBtn2.disabled = currentStep === 1;
    const nextBtn2 = form.querySelector("[hx-wizard-next]");
    if (nextBtn2) {
      if (currentStep === totalSteps) {
        nextBtn2.textContent = nextBtn2.getAttribute("hx-wizard-submit-text") || "Submit";
      } else {
        nextBtn2.textContent = nextBtn2.getAttribute("hx-wizard-next-text") || "Next →";
      }
    }
    if (typeof window.HxBolt !== "undefined") {
      const state = window.HxBolt.getState(form);
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
  const nextBtn = form.querySelector("[hx-wizard-next]");
  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const currentFieldset = steps.find((s) => parseInt(s.getAttribute("hx-step") || "1", 10) === currentStep);
      if (currentFieldset) {
        const stepInputs = currentFieldset.querySelectorAll("input[hx-validate], select[hx-validate], textarea[hx-validate]");
        let stepValid = true;
        stepInputs.forEach((input) => {
          const res = validateInput(input, form);
          if (!res.valid) {
            stepValid = false;
            const name = input.name || input.id;
            const errorEl = form.querySelector(`[hx-error-for="${name}"]`);
            if (errorEl) {
              errorEl.innerText = res.error || "";
              errorEl.style.display = "";
            }
            input.setAttribute("aria-invalid", "true");
            input.classList.add("border-destructive");
          }
        });
        if (!stepValid) {
          const firstErr = currentFieldset.querySelector('[aria-invalid="true"]');
          if (firstErr)
            firstErr.focus();
          return;
        }
      }
      if (currentStep < totalSteps) {
        currentStep++;
        updateWizardUI();
      } else {
        form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
      }
    });
  }
  const prevBtn = form.querySelector("[hx-wizard-prev]");
  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (currentStep > 1) {
        currentStep--;
        updateWizardUI();
      }
    });
  }
  updateWizardUI();
}
function initForm(form) {
  if (form._hxFormInit)
    return form._hxFormState;
  form._hxFormInit = true;
  const state = {
    valid: true,
    dirty: false,
    touched: {},
    errors: {},
    submitting: false
  };
  form._hxFormState = state;
  const inputs = form.querySelectorAll("input[hx-validate], textarea[hx-validate], select[hx-validate]");
  function updateFormState() {
    let isFormValid = true;
    const errors = {};
    inputs.forEach((input) => {
      const name = input.name || input.id;
      const res = validateInput(input, form);
      if (!res.valid) {
        isFormValid = false;
        if (name)
          errors[name] = res.error;
      }
      const errorEl = form.querySelector(`[hx-error-for="${name}"]`) || document.querySelector(`[hx-error-for="${name}"]`);
      if (errorEl) {
        if (!res.valid && (state.touched[name] || state.submitting)) {
          errorEl.innerText = res.error || "";
          errorEl.style.display = "";
          input.setAttribute("aria-invalid", "true");
          input.classList.add("border-destructive");
        } else {
          errorEl.innerText = "";
          errorEl.style.display = "none";
          input.removeAttribute("aria-invalid");
          input.classList.remove("border-destructive");
        }
      }
    });
    state.valid = isFormValid;
    state.errors = errors;
    if (typeof window !== "undefined" && window.HxBolt && window.HxBolt.getState) {
      const boltState = window.HxBolt.getState(form);
      if (boltState) {
        boltState.$form = { ...state };
      }
    }
  }
  inputs.forEach((input) => {
    const name = input.name || input.id;
    input.addEventListener("focus", () => {
      state.dirty = true;
    });
    input.addEventListener("blur", () => {
      if (name)
        state.touched[name] = true;
      updateFormState();
    });
    input.addEventListener("input", () => {
      state.dirty = true;
      updateFormState();
    });
  });
  form.addEventListener("submit", (e) => {
    state.submitting = true;
    inputs.forEach((input) => {
      const name = input.name || input.id;
      if (name)
        state.touched[name] = true;
    });
    updateFormState();
    if (!state.valid) {
      e.preventDefault();
      e.stopPropagation();
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid)
        firstInvalid.focus();
    }
  });
  if (form.hasAttribute("hx-optimistic")) {
    let snapshot = null;
    form.addEventListener("htmx:beforeRequest", () => {
      const targetSel = form.getAttribute("hx-target") || form;
      const target = typeof targetSel === "string" ? document.querySelector(targetSel) : targetSel;
      if (target) {
        snapshot = target.innerHTML;
      }
    });
    form.addEventListener("htmx:responseError", () => {
      const targetSel = form.getAttribute("hx-target") || form;
      const target = typeof targetSel === "string" ? document.querySelector(targetSel) : targetSel;
      if (target && snapshot !== null) {
        target.innerHTML = snapshot;
        console.warn("[htmx-form] Optimistic update failed. Rolled back to previous state.");
      }
    });
  }
  initCascadingFields(form);
  initFormWizard(form);
  updateFormState();
  return state;
}
var HxForm = {
  validators: defaultValidators,
  messages: defaultMessages,
  init: initForm
};
if (typeof window !== "undefined") {
  window.HxForm = HxForm;
  if (typeof window.htmx !== "undefined") {
    window.htmx.defineExtension("form", {
      onEvent: function(name, evt) {
        if (name === "htmx:afterProcessNode") {
          const elt = evt.detail.elt;
          if (elt.tagName === "FORM") {
            initForm(elt);
          }
        }
      }
    });
  }
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("form").forEach((form) => initForm(form));
  });
}
export {
  validateInput,
  initForm,
  defaultValidators,
  defaultMessages,
  HxForm
};
