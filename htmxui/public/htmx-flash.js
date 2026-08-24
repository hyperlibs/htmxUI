(function() {
  const databases = {};

  htmx.defineExtension('flash', {
    onEvent: function(name, evt) {
      if (name === "htmx:afterProcessNode") {
        const elt = evt.detail.elt;
        
        // 1. Initialize a database if hx-flash-src is present
        if (elt.hasAttribute('hx-flash-src')) {
          const src = elt.getAttribute('hx-flash-src');
          const dbName = elt.getAttribute('hx-flash-db') || 'default';
          
          if (!databases[dbName]) {
            databases[dbName] = { data: [], status: 'loading' };
            
            fetch(src)
              .then(res => res.json())
              .then(data => {
                // Pre-process for hyper-fast searching
                databases[dbName].data = data.map(item => ({
                  html: item.html,
                  _searchText: (item._search || "").toLowerCase()
                }));
                databases[dbName].status = 'ready';
                console.log(`[htmx-flash] ⚡ Indexed ${data.length} records in memory for DB: '${dbName}'`);
                
                // Hide loading indicators, show search inputs
                elt.dispatchEvent(new CustomEvent('flash:ready', { bubbles: true, detail: { dbName } }));
              });
          }
        }

        // 2. Bind search input
        if (elt.tagName === "INPUT" && elt.hasAttribute('hx-flash-search')) {
          const dbName = elt.getAttribute('hx-flash-db') || 'default';
          const targetId = elt.getAttribute('hx-target');
          const limit = parseInt(elt.getAttribute('hx-flash-limit') || "20", 10);
          const emptyHtml = elt.getAttribute('hx-flash-empty') || '<tr><td colspan="100%" class="p-4 text-center text-muted-foreground text-sm">No results found.</td></tr>';
          
          elt.addEventListener('input', (e) => {
            const target = document.querySelector(targetId);
            if (!target) return;
            
            const db = databases[dbName];
            if (!db || db.status !== 'ready') return;
            
            const query = e.target.value.toLowerCase().trim();
            
            // Handle empty query
            if (!query) {
              target.innerHTML = '';
              return;
            }

            // Hyper-fast scoring engine
            const queryTokens = query.split(/\s+/);
            const results = [];
            
            for (let i = 0; i < db.data.length; i++) {
              const item = db.data[i];
              let score = 0;
              let matchedAll = true;
              
              for (let j = 0; j < queryTokens.length; j++) {
                const token = queryTokens[j];
                const idx = item._searchText.indexOf(token);
                
                if (idx === -1) {
                  matchedAll = false;
                  break;
                }
                
                // Algolia-style weighting: Boost score if token matches the exact start of a word
                score += (idx === 0 || item._searchText[idx - 1] === ' ') ? 10 : 1;
              }
              
              if (matchedAll) {
                results.push({ html: item.html, score: score });
              }
            }
            
            // Sort by relevance, limit, and render
            if (results.length === 0) {
              target.innerHTML = emptyHtml;
            } else {
              // Sort descending by score
              results.sort((a, b) => b.score - a.score);
              
              let htmlStr = '';
              const max = Math.min(limit, results.length);
              for (let i = 0; i < max; i++) {
                htmlStr += results[i].html;
              }
              target.innerHTML = htmlStr;
            }
          });
        }
      }
    }
  });
})();
