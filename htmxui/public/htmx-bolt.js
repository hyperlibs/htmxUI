// htmx-reactive.js
// A native HTMX extension that adds Svelte/Alpine-like client-side reactivity,
// controllable by both the UI and the Backend Server.

(function () {
  // Store the reactive proxy for each element
  const reactiveStates = new WeakMap();

  function makeReactive(target, element) {
    return new Proxy(target, {
      set(obj, prop, value) {
        obj[prop] = value;
        // When state changes, re-evaluate bindings for this element and its children
        updateBindings(element, obj);
        return true;
      }
    });
  }

  function updateBindings(rootElement, state) {
    // hx-text: updates innerText
    const textNodes = rootElement.querySelectorAll('[hx-text]');
    textNodes.forEach(node => {
      const expr = node.getAttribute('hx-text');
      try {
        const val = new Function(...Object.keys(state), `return ${expr}`)(...Object.values(state));
        node.innerText = val;
      } catch (e) {
        console.error("hx-text evaluation error:", e);
      }
    });

    // hx-show: toggles display
    const showNodes = rootElement.querySelectorAll('[hx-show]');
    showNodes.forEach(node => {
      const expr = node.getAttribute('hx-show');
      try {
        const val = new Function(...Object.keys(state), `return ${expr}`)(...Object.values(state));
        node.style.display = val ? '' : 'none';
      } catch (e) {
        console.error("hx-show evaluation error:", e);
      }
    });
    
    // hx-class: conditionally applies classes
    const classNodes = rootElement.querySelectorAll('[hx-class]');
    classNodes.forEach(node => {
      const expr = node.getAttribute('hx-class');
      try {
        const classObj = new Function(...Object.keys(state), `return ${expr}`)(...Object.values(state));
        for (const [className, condition] of Object.entries(classObj)) {
          if (condition) {
            node.classList.add(...className.split(' '));
          } else {
            node.classList.remove(...className.split(' '));
          }
        }
      } catch (e) {
        console.error("hx-class evaluation error:", e);
      }
    });

    // hx-style: dynamically applies inline styles (format: "{ color: 'red', width: size + 'px' }")
    const styleNodes = rootElement.querySelectorAll('[hx-style]');
    styleNodes.forEach(node => {
      const expr = node.getAttribute('hx-style');
      try {
        const styleObj = new Function(...Object.keys(state), `return ${expr}`)(...Object.values(state));
        for (const [prop, value] of Object.entries(styleObj)) {
          node.style[prop] = value;
        }
      } catch (e) {
        console.error("hx-style evaluation error:", e);
      }
    });
  }

  // Allow server to trigger state updates via HX-Trigger header
  // Example server header: HX-Trigger: {"hxStateUpdate": {"target": "#my-counter", "state": {"count": 10}}}
  document.body.addEventListener('hxStateUpdate', function(evt) {
    const detail = evt.detail;
    if (detail && detail.target && detail.state) {
      const el = document.querySelector(detail.target);
      if (el && reactiveStates.has(el)) {
        const proxy = reactiveStates.get(el);
        // Update the proxy state with the new values from the server
        for (const [key, value] of Object.entries(detail.state)) {
          proxy[key] = value;
        }
      }
    }
  });

  htmx.defineExtension('reactive', {
    onEvent: function (name, evt) {
      if (name === 'htmx:beforeProcessNode') {
        const elt = evt.detail.elt;
        
        // Find elements with hx-state to initialize reactive context
        if (elt.hasAttribute && elt.hasAttribute('hx-state')) {
          let stateObj = {};
          try {
            stateObj = new Function(`return ${elt.getAttribute('hx-state')}`)();
          } catch (e) {
            console.error("Error parsing hx-state:", e);
          }
          
          const reactiveState = makeReactive(stateObj, elt);
          reactiveStates.set(elt, reactiveState);
          updateBindings(elt, reactiveState);
          
          // Action binders for UI-driven updates
          const bindAction = (attrName, eventName) => {
            const actionNodes = elt.querySelectorAll(`[${attrName}]`);
            actionNodes.forEach(node => {
              if (node[`__${attrName}Attached`]) return;
              node[`__${attrName}Attached`] = true;
              node.addEventListener(eventName, (e) => {
                 const expr = node.getAttribute(attrName);
                 try {
                   // Expose event object and state
                   const func = new Function('state', 'event', `with(state) { ${expr} }`);
                   func(reactiveState, e);
                 } catch(err) {
                   console.error(`Error in ${attrName}:`, err);
                 }
              });
            });
          };
          
          bindAction('hx-action', 'click');
          bindAction('hx-action-dblclick', 'dblclick');
        }
      }
    }
  });

  // ScaleUI: Universal inline parameter for component resizing
  const scaleUiResizer = new ResizeObserver(entries => {
    for (let entry of entries) {
      const el = entry.target;
      if (el.getAttribute('scaleui') === '1') {
        if (!el._baseWidth) {
          el._baseWidth = el.offsetWidth;
          // Capture base styles if needed for manual fluid typography
          const style = window.getComputedStyle(el);
          el._baseFontSize = parseFloat(style.fontSize);
          el._baseGap = parseFloat(style.gap) || 0;
        }
        
        // Calculate resize ratio
        const ratio = el.offsetWidth / el._baseWidth;
        
        // Expose ratio as a CSS variable for advanced scaling
        el.style.setProperty('--scaleui-ratio', ratio);
        
        // Optional: Naive inline scaling of font-size to fulfill "resize font size, font gap"
        // This gives immediate visual feedback of the "ScaleUI" fluid concept
        if (el._baseFontSize) el.style.fontSize = (el._baseFontSize * ratio) + 'px';
        if (el._baseGap) el.style.gap = (el._baseGap * ratio) + 'px';
      }
    }
  });

  function handleScaleUI(el) {
    if (el.getAttribute('scaleui') === '1') {
      el.style.resize = 'both';
      el.style.overflow = 'auto';
      scaleUiResizer.observe(el);
    } else {
      el.style.resize = '';
      el.style.overflow = '';
      el.style.fontSize = '';
      el.style.gap = '';
      el.style.removeProperty('--scaleui-ratio');
      scaleUiResizer.unobserve(el);
      delete el._baseWidth;
    }
  }

  // Initialize existing elements
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[scaleui]').forEach(handleScaleUI);
    
    // Watch for dynamic additions of scaleui
    new MutationObserver(mutations => {
      for (let m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'scaleui') {
          handleScaleUI(m.target);
        } else if (m.type === 'childList') {
          m.addedNodes.forEach(node => {
            if (node.nodeType === 1) {
              if (node.hasAttribute('scaleui')) handleScaleUI(node);
              node.querySelectorAll('[scaleui]').forEach(handleScaleUI);
            }
          });
        }
      }
    }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['scaleui'] });
  });

})();
