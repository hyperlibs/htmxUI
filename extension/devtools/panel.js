// HMLR DevTools Panel Controller
document.querySelectorAll('.nav-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.nav-tab').forEach(t => {
      t.classList.remove('bg-slate-800', 'text-white');
      t.classList.add('text-slate-400');
    });
    tab.classList.add('bg-slate-800', 'text-white');
    tab.classList.remove('text-slate-400');

    const targetTab = tab.getAttribute('data-tab');
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    document.getElementById(`tab-${targetTab}`)?.classList.remove('hidden');
  });
});

document.getElementById('btn-chan-send')?.addEventListener('click', () => {
  const name = document.getElementById('input-chan-name')?.value || 'general';
  const data = document.getElementById('input-chan-data')?.value || 'test';
  
  const feed = document.getElementById('channel-feed');
  if (feed) {
    const item = document.createElement('div');
    item.className = 'p-1.5 rounded bg-slate-950/60 border border-slate-800 flex justify-between';
    item.innerHTML = `<span class="text-indigo-400 font-semibold">[${name}]</span><span class="text-slate-300">${data}</span><span class="text-slate-500">Just now</span>`;
    feed.appendChild(item);
    feed.scrollTop = feed.scrollHeight;
  }
});
