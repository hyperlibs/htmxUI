// HMLR DevTools Content Script Bridge
window.addEventListener('message', (event) => {
  if (event.source !== window || !event.data || event.data.source !== 'HTMXUI_DEVTOOLS') return;
  chrome.runtime.sendMessage(event.data);
});

// Inject bridge helper into target page
const script = document.createElement('script');
script.textContent = `
  window.__HMLR_ACTIVE__ = true;
  window.addEventListener('htmxui:channel', (e) => {
    window.postMessage({ source: 'HTMXUI_DEVTOOLS', type: 'CHANNEL_EVENT', detail: e.detail }, '*');
  });
`;
(document.head || document.documentElement).appendChild(script);
