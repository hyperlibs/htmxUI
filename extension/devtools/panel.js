// Tab Switching
document.querySelectorAll('.nav-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const targetTab = tab.getAttribute('data-tab');
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    document.getElementById(`tab-${targetTab}`)?.classList.remove('hidden');
  });
});

// Scope selector
window.selectScope = function(name) {
  document.querySelectorAll('.scope-item').forEach(el => el.classList.remove('selected'));
  event?.target?.classList.add('selected');
  const jsonEl = document.getElementById('state-json');
  if (name === 'telemetry') {
    jsonEl.textContent = JSON.stringify({ nodes: 4, cluster: "us-east-1", status: "Healthy", loadAvg: 0.14 }, null, 2);
  } else if (name === 'datatable') {
    jsonEl.textContent = JSON.stringify({ totalRows: 10000, visibleWindow: [0, 25], filter: "" }, null, 2);
  } else {
    jsonEl.textContent = JSON.stringify({ user: "Ada Lovelace", active: true, nodes: 4, latencyMs: 0.8, mode: "Concurrent-Hypermedia" }, null, 2);
  }
};

// Channel sender
document.getElementById('btn-chan-send')?.addEventListener('click', () => {
  const name = document.getElementById('input-chan-name')?.value || 'telemetry';
  const data = document.getElementById('input-chan-data')?.value || '{}';
  
  const feed = document.getElementById('channel-feed');
  if (feed) {
    const item = document.createElement('div');
    item.className = 'feed-item';
    item.innerHTML = `<span class="feed-tag">[${name}]</span><span style="color:#cbd5e1;">${data}</span><span class="feed-time">Just now</span>`;
    feed.appendChild(item);
    feed.scrollTop = feed.scrollHeight;
  }
});

// Copy .mx
document.getElementById('btn-copy-mx')?.addEventListener('click', () => {
  const code = `@model CockpitState\n  user: "Ada Lovelace"\n  active: true\n  nodes: 4\n  latencyMs: 0.8`;
  navigator.clipboard.writeText(code);
  alert("Copied State as .mx model!");
});
