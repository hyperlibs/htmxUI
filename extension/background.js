// HMLR DevTools Background Service Worker
chrome.runtime.onConnect.addListener((port) => {
  if (port.name !== 'hmlr-devtools') return;

  const tabId = port.sender?.tab?.id;
  port.onMessage.addListener((msg) => {
    // Relay messages between inspected window and DevTools panel
    if (msg.target === 'content' && tabId) {
      chrome.tabs.sendMessage(tabId, msg);
    }
  });
});
