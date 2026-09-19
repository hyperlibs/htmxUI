// Register the HMLR DevTools Panel in browser developer tools
chrome.devtools.panels.create(
  "⚡ HMLR",
  "",
  "devtools/panel.html",
  (panel) => {
    console.log("HMLR DevTools Panel Registered Successfully.");
  }
);
