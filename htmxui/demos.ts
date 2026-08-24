// All component demos - every single one, no fakes
export const DEMOS: Record<string, string> = {

"accordion": `<section class="w-full max-w-lg space-y-0 border border-border rounded-md overflow-hidden">
  <details class="group border-b border-border [&_summary::-webkit-details-marker]:hidden" open>
    <summary class="flex w-full items-center justify-between p-4 text-sm font-medium cursor-pointer hover:underline"><span>Is it accessible?</span><svg class="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></summary>
    <div class="px-4 pb-4 text-sm text-muted-foreground">Yes. It adheres to the WAI-ARIA design pattern.</div>
  </details>
  <details class="group border-b border-border [&_summary::-webkit-details-marker]:hidden">
    <summary class="flex w-full items-center justify-between p-4 text-sm font-medium cursor-pointer hover:underline"><span>Is it styled?</span><svg class="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></summary>
    <div class="px-4 pb-4 text-sm text-muted-foreground">Yes. It comes with default styles that match the other components' aesthetic.</div>
  </details>
  <details class="group [&_summary::-webkit-details-marker]:hidden">
    <summary class="flex w-full items-center justify-between p-4 text-sm font-medium cursor-pointer hover:underline"><span>Is it animated?</span><svg class="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></summary>
    <div class="px-4 pb-4 text-sm text-muted-foreground">Yes. It's animated by default with smooth CSS transitions.</div>
  </details>
</section>`,

"alert": `<section class="space-y-4 max-w-lg">
  <div class="relative w-full rounded-lg border border-border p-4 bg-background text-foreground" role="alert"><h5 class="mb-1 font-medium leading-none tracking-tight">Heads up!</h5><div class="text-sm text-muted-foreground">You can add components to your app using the cli.</div></div>
  <div class="relative w-full rounded-lg border border-destructive/50 p-4 bg-destructive/10 text-destructive" role="alert"><h5 class="mb-1 font-medium leading-none tracking-tight">Error</h5><div class="text-sm">Your session has expired. Please log in again.</div></div>
  <div class="relative w-full rounded-lg border border-green-500/30 p-4 bg-green-500/10 text-green-700" role="alert"><h5 class="mb-1 font-medium leading-none tracking-tight">Success</h5><div class="text-sm">Your changes have been saved successfully.</div></div>
</section>`,

"alert-dialog": `<section class="flex justify-center">
  <button onclick="document.getElementById('alert-dlg-demo').showModal()" class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">Delete Account</button>
  <dialog id="alert-dlg-demo" class="backdrop:bg-black/80 rounded-lg border border-border bg-background p-0 shadow-lg max-w-md w-full">
    <div class="p-6 space-y-4">
      <h2 class="text-lg font-semibold">Are you absolutely sure?</h2>
      <p class="text-sm text-muted-foreground">This action cannot be undone. This will permanently delete your account and remove your data from our servers.</p>
      <div class="flex justify-end gap-2">
        <button onclick="this.closest('dialog').close()" class="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background shadow-sm hover:bg-accent h-9 px-4 py-2">Cancel</button>
        <button onclick="this.closest('dialog').close()" class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-destructive text-white shadow hover:bg-destructive/90 h-9 px-4 py-2">Continue</button>
      </div>
    </div>
  </dialog>
</section>`,

"aspect-ratio": `<section class="max-w-md"><div class="relative w-full rounded-lg overflow-hidden border border-border" style="padding-bottom:56.25%"><div class="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground text-sm">16:9 Aspect Ratio Container</div></div></section>`,

"avatar": `<section class="space-y-6">
  <div class="flex items-center gap-4">
    <span class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">CN</span>
    <span class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm">JD</span>
    <span class="flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white font-bold text-lg">AB</span>
  </div>
</section>`,

"avatar-group": `<section><div class="flex -space-x-3">
  <span class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground text-xs font-bold">OM</span>
  <span class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-blue-600 text-white text-xs font-bold">JL</span>
  <span class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-green-600 text-white text-xs font-bold">IN</span>
  <span class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-orange-500 text-white text-xs font-bold">WK</span>
  <span class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-muted text-muted-foreground text-xs font-bold">+3</span>
</div></section>`,

"badge": `<section class="flex flex-wrap gap-3">
  <span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary text-primary-foreground">Badge</span>
  <span class="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold text-foreground">Secondary</span>
  <span class="inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold bg-destructive text-white">Destructive</span>
  <span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-500/10 text-green-600 border-green-500/20">Success</span>
  <span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Warning</span>
  <span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-blue-500/10 text-blue-600 border-blue-500/20">Info</span>
</section>`,

"banner": `<section class="space-y-4">
  <div class="w-full bg-primary px-4 py-3 text-primary-foreground flex justify-between items-center text-sm rounded-md shadow-sm"><p>🎉 New feature available! Check out the latest update.</p><button onclick="this.parentElement.style.display='none'" class="hover:bg-white/20 p-1 rounded text-xs font-medium">Dismiss</button></div>
  <div class="w-full bg-yellow-500 px-4 py-3 text-black flex justify-between items-center text-sm rounded-md shadow-sm"><p>⚠️ Scheduled maintenance on Sunday 2AM-4AM UTC.</p><button onclick="this.parentElement.style.display='none'" class="hover:bg-black/10 p-1 rounded text-xs font-medium">Dismiss</button></div>
</section>`,

"breadcrumb": `<section><nav class="flex text-sm" aria-label="Breadcrumb"><ol class="inline-flex items-center space-x-1">
  <li><a href="#" class="text-muted-foreground hover:text-foreground">Home</a></li>
  <li class="text-muted-foreground">/</li>
  <li><a href="#" class="text-muted-foreground hover:text-foreground">Components</a></li>
  <li class="text-muted-foreground">/</li>
  <li class="text-foreground font-medium">Breadcrumb</li>
</ol></nav></section>`,

"button": `<section class="space-y-8">
  <div><h4 class="text-sm font-medium mb-3 text-muted-foreground">Variants</h4><div class="flex flex-wrap gap-3">
    <button class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">Primary</button>
    <button class="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">Secondary</button>
    <button class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-destructive text-white shadow-sm hover:bg-destructive/90 h-9 px-4 py-2">Destructive</button>
    <button class="inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">Ghost</button>
    <button class="inline-flex items-center justify-center rounded-md text-sm font-medium text-primary underline-offset-4 hover:underline h-9 px-4 py-2">Link</button>
  </div></div>
  <div><h4 class="text-sm font-medium mb-3 text-muted-foreground">Sizes</h4><div class="flex flex-wrap items-center gap-3">
    <button class="inline-flex items-center justify-center rounded-md text-xs font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-7 px-3">Small</button>
    <button class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">Default</button>
    <button class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-8">Large</button>
  </div></div>
  <div><h4 class="text-sm font-medium mb-3 text-muted-foreground">With Icon</h4><div class="flex flex-wrap gap-3">
    <button class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"><svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>Continue</button>
  </div></div>
  <div><h4 class="text-sm font-medium mb-3 text-muted-foreground">Loading</h4>
    <button class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow h-9 px-4 py-2 opacity-70 cursor-wait"><svg class="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Please wait</button>
  </div>
  <div><h4 class="text-sm font-medium mb-3 text-muted-foreground">Disabled</h4>
    <button disabled class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow h-9 px-4 py-2 opacity-50 cursor-not-allowed">Disabled</button>
  </div>
</section>`,

"button-group": `<section><div class="inline-flex rounded-md shadow-sm" role="group">
  <button class="inline-flex items-center justify-center text-sm font-medium border border-input bg-background hover:bg-accent h-9 px-4 rounded-l-md rounded-r-none">Left</button>
  <button class="inline-flex items-center justify-center text-sm font-medium border-t border-b border-input bg-background hover:bg-accent h-9 px-4 rounded-none">Center</button>
  <button class="inline-flex items-center justify-center text-sm font-medium border border-input bg-background hover:bg-accent h-9 px-4 rounded-r-md rounded-l-none">Right</button>
</div></section>`,

"calendar": `<section class="space-y-12">
  
  <div>
    <h4 class="text-sm font-medium mb-4 text-muted-foreground">Simple Calendar - Selected Date</h4>
    <div class="inline-block p-3 border border-border rounded-md bg-background shadow-sm select-none">
  <div class="flex justify-between items-center mb-4"><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">◀</button><div class="font-medium text-sm">August 2026</div><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">▶</button></div>
  <div class="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs">
  <span class="p-1.5 text-muted-foreground font-medium">Su</span><span class="p-1.5 text-muted-foreground font-medium">Mo</span><span class="p-1.5 text-muted-foreground font-medium">Tu</span><span class="p-1.5 text-muted-foreground font-medium">We</span><span class="p-1.5 text-muted-foreground font-medium">Th</span><span class="p-1.5 text-muted-foreground font-medium">Fr</span><span class="p-1.5 text-muted-foreground font-medium">Sa</span>
  <span class="p-1.5 text-muted-foreground/30">26</span>
  <span class="p-1.5 text-muted-foreground/30">27</span>
  <span class="p-1.5 text-muted-foreground/30">28</span>
  <span class="p-1.5 text-muted-foreground/30">29</span>
  <span class="p-1.5 text-muted-foreground/30">30</span>
  <span class="p-1.5 text-muted-foreground/30">31</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">1</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">2</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">3</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">4</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">5</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">6</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">7</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">8</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">9</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">10</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">11</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">12</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">13</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">14</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">15</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">16</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">17</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">18</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">19</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">20</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">21</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">22</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">23</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors bg-primary text-primary-foreground font-bold hover:bg-primary/90">24</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">25</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">26</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">27</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">28</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">29</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">30</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">31</span>
  <span class="p-1.5 text-muted-foreground/30">1</span>
  <span class="p-1.5 text-muted-foreground/30">2</span>
  <span class="p-1.5 text-muted-foreground/30">3</span>
  <span class="p-1.5 text-muted-foreground/30">4</span>
  <span class="p-1.5 text-muted-foreground/30">5</span>
  </div>
</div>
  </div>

  <div>
    <h4 class="text-sm font-medium mb-4 text-muted-foreground">Long Calendar - 3 Month View</h4>
    <div class="flex flex-wrap gap-6">
        <div class="inline-block p-3 border border-border rounded-md bg-background shadow-sm select-none">
  <div class="flex justify-between items-center mb-4"><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">◀</button><div class="font-medium text-sm">July 2026</div><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">▶</button></div>
  <div class="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs">
  <span class="p-1.5 text-muted-foreground font-medium">Su</span><span class="p-1.5 text-muted-foreground font-medium">Mo</span><span class="p-1.5 text-muted-foreground font-medium">Tu</span><span class="p-1.5 text-muted-foreground font-medium">We</span><span class="p-1.5 text-muted-foreground font-medium">Th</span><span class="p-1.5 text-muted-foreground font-medium">Fr</span><span class="p-1.5 text-muted-foreground font-medium">Sa</span>
  <span class="p-1.5 text-muted-foreground/30">29</span>
  <span class="p-1.5 text-muted-foreground/30">30</span>
  <span class="p-1.5 text-muted-foreground/30">31</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">1</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">2</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">3</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">4</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">5</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">6</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">7</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">8</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">9</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">10</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">11</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">12</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">13</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">14</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors bg-primary text-primary-foreground font-bold hover:bg-primary/90">15</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">16</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">17</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">18</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">19</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">20</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">21</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">22</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">23</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">24</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">25</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">26</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">27</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">28</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">29</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">30</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">31</span>
  <span class="p-1.5 text-muted-foreground/30">1</span>
  <span class="p-1.5 text-muted-foreground/30">2</span>
  <span class="p-1.5 text-muted-foreground/30">3</span>
  <span class="p-1.5 text-muted-foreground/30">4</span>
  <span class="p-1.5 text-muted-foreground/30">5</span>
  <span class="p-1.5 text-muted-foreground/30">6</span>
  <span class="p-1.5 text-muted-foreground/30">7</span>
  <span class="p-1.5 text-muted-foreground/30">8</span>
  </div>
</div>
        <div class="inline-block p-3 border border-border rounded-md bg-background shadow-sm select-none">
  <div class="flex justify-between items-center mb-4"><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">◀</button><div class="font-medium text-sm">August 2026</div><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">▶</button></div>
  <div class="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs">
  <span class="p-1.5 text-muted-foreground font-medium">Su</span><span class="p-1.5 text-muted-foreground font-medium">Mo</span><span class="p-1.5 text-muted-foreground font-medium">Tu</span><span class="p-1.5 text-muted-foreground font-medium">We</span><span class="p-1.5 text-muted-foreground font-medium">Th</span><span class="p-1.5 text-muted-foreground font-medium">Fr</span><span class="p-1.5 text-muted-foreground font-medium">Sa</span>
  <span class="p-1.5 text-muted-foreground/30">26</span>
  <span class="p-1.5 text-muted-foreground/30">27</span>
  <span class="p-1.5 text-muted-foreground/30">28</span>
  <span class="p-1.5 text-muted-foreground/30">29</span>
  <span class="p-1.5 text-muted-foreground/30">30</span>
  <span class="p-1.5 text-muted-foreground/30">31</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">1</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">2</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">3</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">4</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">5</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">6</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">7</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">8</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">9</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">10</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">11</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">12</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">13</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">14</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">15</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">16</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">17</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">18</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">19</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">20</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">21</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">22</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">23</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">24</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">25</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">26</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">27</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">28</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">29</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">30</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">31</span>
  <span class="p-1.5 text-muted-foreground/30">1</span>
  <span class="p-1.5 text-muted-foreground/30">2</span>
  <span class="p-1.5 text-muted-foreground/30">3</span>
  <span class="p-1.5 text-muted-foreground/30">4</span>
  <span class="p-1.5 text-muted-foreground/30">5</span>
  </div>
</div>
        <div class="inline-block p-3 border border-border rounded-md bg-background shadow-sm select-none">
  <div class="flex justify-between items-center mb-4"><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">◀</button><div class="font-medium text-sm">September 2026</div><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">▶</button></div>
  <div class="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs">
  <span class="p-1.5 text-muted-foreground font-medium">Su</span><span class="p-1.5 text-muted-foreground font-medium">Mo</span><span class="p-1.5 text-muted-foreground font-medium">Tu</span><span class="p-1.5 text-muted-foreground font-medium">We</span><span class="p-1.5 text-muted-foreground font-medium">Th</span><span class="p-1.5 text-muted-foreground font-medium">Fr</span><span class="p-1.5 text-muted-foreground font-medium">Sa</span>
  <span class="p-1.5 text-muted-foreground/30">30</span>
  <span class="p-1.5 text-muted-foreground/30">31</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">1</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">2</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">3</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">4</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">5</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">6</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">7</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">8</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">9</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">10</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">11</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">12</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">13</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">14</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">15</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">16</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">17</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">18</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">19</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">20</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">21</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">22</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">23</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">24</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">25</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">26</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">27</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">28</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">29</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">30</span>
  <span class="p-1.5 text-muted-foreground/30">1</span>
  <span class="p-1.5 text-muted-foreground/30">2</span>
  <span class="p-1.5 text-muted-foreground/30">3</span>
  <span class="p-1.5 text-muted-foreground/30">4</span>
  <span class="p-1.5 text-muted-foreground/30">5</span>
  <span class="p-1.5 text-muted-foreground/30">6</span>
  <span class="p-1.5 text-muted-foreground/30">7</span>
  <span class="p-1.5 text-muted-foreground/30">8</span>
  <span class="p-1.5 text-muted-foreground/30">9</span>
  <span class="p-1.5 text-muted-foreground/30">10</span>
  </div>
</div>
    </div>
  </div>

  <div hx-ext="reactive" hx-state="{ active: null, activeVal: null, start: null, startDisp: null, end: null, endDisp: null }">
    <div class="flex items-center justify-between mb-4">
      <h4 class="text-sm font-medium text-muted-foreground">Advanced Feature - Interactive Date Range</h4>
      <div class="text-xs text-right space-y-1">
        <p class="font-medium bg-muted px-2 py-1 rounded" hx-show="active">Selected Date: <span hx-text="active"></span></p>
        <p class="font-medium bg-primary/10 text-primary px-2 py-1 rounded" hx-show="start">
          Range: <span hx-text="startDisp"></span> 
          <span hx-show="!end">(double click another date)</span>
          <span hx-show="end"> to <span hx-text="endDisp"></span></span>
        </p>
      </div>
    </div>
    <div class="flex flex-wrap gap-6">
        <div class="inline-block p-3 border border-border rounded-md bg-background shadow-sm select-none">
  <div class="flex justify-between items-center mb-4"><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">◀</button><div class="font-medium text-sm">October 2026</div><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">▶</button></div>
  <div class="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs">
  <span class="p-1.5 text-muted-foreground font-medium">Su</span><span class="p-1.5 text-muted-foreground font-medium">Mo</span><span class="p-1.5 text-muted-foreground font-medium">Tu</span><span class="p-1.5 text-muted-foreground font-medium">We</span><span class="p-1.5 text-muted-foreground font-medium">Th</span><span class="p-1.5 text-muted-foreground font-medium">Fr</span><span class="p-1.5 text-muted-foreground font-medium">Sa</span>
  <span class="p-1.5 text-muted-foreground/30">28</span>
  <span class="p-1.5 text-muted-foreground/30">29</span>
  <span class="p-1.5 text-muted-foreground/30">30</span>
  <span class="p-1.5 text-muted-foreground/30">31</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '01-Oct-2026'; activeVal = '2026-10-01';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-10-01'; startDisp = '01-Oct-2026'; end = null; endDisp = null; } else { end = '2026-10-01'; endDisp = '01-Oct-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-10-01' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-10-01' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-10-01' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-10-01' && end === '2026-10-01',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-10-01' > start && '2026-10-01' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-10-01' && start !== '2026-10-01' && end !== '2026-10-01' && !(start && end && '2026-10-01' > start && '2026-10-01' < end)
            }">1</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '02-Oct-2026'; activeVal = '2026-10-02';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-10-02'; startDisp = '02-Oct-2026'; end = null; endDisp = null; } else { end = '2026-10-02'; endDisp = '02-Oct-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-10-02' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-10-02' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-10-02' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-10-02' && end === '2026-10-02',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-10-02' > start && '2026-10-02' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-10-02' && start !== '2026-10-02' && end !== '2026-10-02' && !(start && end && '2026-10-02' > start && '2026-10-02' < end)
            }">2</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '03-Oct-2026'; activeVal = '2026-10-03';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-10-03'; startDisp = '03-Oct-2026'; end = null; endDisp = null; } else { end = '2026-10-03'; endDisp = '03-Oct-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-10-03' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-10-03' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-10-03' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-10-03' && end === '2026-10-03',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-10-03' > start && '2026-10-03' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-10-03' && start !== '2026-10-03' && end !== '2026-10-03' && !(start && end && '2026-10-03' > start && '2026-10-03' < end)
            }">3</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '04-Oct-2026'; activeVal = '2026-10-04';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-10-04'; startDisp = '04-Oct-2026'; end = null; endDisp = null; } else { end = '2026-10-04'; endDisp = '04-Oct-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-10-04' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-10-04' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-10-04' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-10-04' && end === '2026-10-04',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-10-04' > start && '2026-10-04' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-10-04' && start !== '2026-10-04' && end !== '2026-10-04' && !(start && end && '2026-10-04' > start && '2026-10-04' < end)
            }">4</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '05-Oct-2026'; activeVal = '2026-10-05';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-10-05'; startDisp = '05-Oct-2026'; end = null; endDisp = null; } else { end = '2026-10-05'; endDisp = '05-Oct-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-10-05' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-10-05' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-10-05' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-10-05' && end === '2026-10-05',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-10-05' > start && '2026-10-05' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-10-05' && start !== '2026-10-05' && end !== '2026-10-05' && !(start && end && '2026-10-05' > start && '2026-10-05' < end)
            }">5</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '06-Oct-2026'; activeVal = '2026-10-06';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-10-06'; startDisp = '06-Oct-2026'; end = null; endDisp = null; } else { end = '2026-10-06'; endDisp = '06-Oct-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-10-06' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-10-06' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-10-06' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-10-06' && end === '2026-10-06',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-10-06' > start && '2026-10-06' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-10-06' && start !== '2026-10-06' && end !== '2026-10-06' && !(start && end && '2026-10-06' > start && '2026-10-06' < end)
            }">6</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '07-Oct-2026'; activeVal = '2026-10-07';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-10-07'; startDisp = '07-Oct-2026'; end = null; endDisp = null; } else { end = '2026-10-07'; endDisp = '07-Oct-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-10-07' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-10-07' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-10-07' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-10-07' && end === '2026-10-07',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-10-07' > start && '2026-10-07' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-10-07' && start !== '2026-10-07' && end !== '2026-10-07' && !(start && end && '2026-10-07' > start && '2026-10-07' < end)
            }">7</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '08-Oct-2026'; activeVal = '2026-10-08';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-10-08'; startDisp = '08-Oct-2026'; end = null; endDisp = null; } else { end = '2026-10-08'; endDisp = '08-Oct-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-10-08' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-10-08' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-10-08' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-10-08' && end === '2026-10-08',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-10-08' > start && '2026-10-08' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-10-08' && start !== '2026-10-08' && end !== '2026-10-08' && !(start && end && '2026-10-08' > start && '2026-10-08' < end)
            }">8</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '09-Oct-2026'; activeVal = '2026-10-09';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-10-09'; startDisp = '09-Oct-2026'; end = null; endDisp = null; } else { end = '2026-10-09'; endDisp = '09-Oct-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-10-09' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-10-09' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-10-09' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-10-09' && end === '2026-10-09',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-10-09' > start && '2026-10-09' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-10-09' && start !== '2026-10-09' && end !== '2026-10-09' && !(start && end && '2026-10-09' > start && '2026-10-09' < end)
            }">9</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '10-Oct-2026'; activeVal = '2026-10-10';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-10-10'; startDisp = '10-Oct-2026'; end = null; endDisp = null; } else { end = '2026-10-10'; endDisp = '10-Oct-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-10-10' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-10-10' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-10-10' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-10-10' && end === '2026-10-10',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-10-10' > start && '2026-10-10' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-10-10' && start !== '2026-10-10' && end !== '2026-10-10' && !(start && end && '2026-10-10' > start && '2026-10-10' < end)
            }">10</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '11-Oct-2026'; activeVal = '2026-10-11';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-10-11'; startDisp = '11-Oct-2026'; end = null; endDisp = null; } else { end = '2026-10-11'; endDisp = '11-Oct-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-10-11' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-10-11' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-10-11' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-10-11' && end === '2026-10-11',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-10-11' > start && '2026-10-11' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-10-11' && start !== '2026-10-11' && end !== '2026-10-11' && !(start && end && '2026-10-11' > start && '2026-10-11' < end)
            }">11</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '12-Oct-2026'; activeVal = '2026-10-12';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-10-12'; startDisp = '12-Oct-2026'; end = null; endDisp = null; } else { end = '2026-10-12'; endDisp = '12-Oct-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-10-12' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-10-12' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-10-12' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-10-12' && end === '2026-10-12',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-10-12' > start && '2026-10-12' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-10-12' && start !== '2026-10-12' && end !== '2026-10-12' && !(start && end && '2026-10-12' > start && '2026-10-12' < end)
            }">12</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '13-Oct-2026'; activeVal = '2026-10-13';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-10-13'; startDisp = '13-Oct-2026'; end = null; endDisp = null; } else { end = '2026-10-13'; endDisp = '13-Oct-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-10-13' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-10-13' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-10-13' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-10-13' && end === '2026-10-13',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-10-13' > start && '2026-10-13' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-10-13' && start !== '2026-10-13' && end !== '2026-10-13' && !(start && end && '2026-10-13' > start && '2026-10-13' < end)
            }">13</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '14-Oct-2026'; activeVal = '2026-10-14';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-10-14'; startDisp = '14-Oct-2026'; end = null; endDisp = null; } else { end = '2026-10-14'; endDisp = '14-Oct-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-10-14' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-10-14' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-10-14' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-10-14' && end === '2026-10-14',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-10-14' > start && '2026-10-14' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-10-14' && start !== '2026-10-14' && end !== '2026-10-14' && !(start && end && '2026-10-14' > start && '2026-10-14' < end)
            }">14</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '15-Oct-2026'; activeVal = '2026-10-15';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-10-15'; startDisp = '15-Oct-2026'; end = null; endDisp = null; } else { end = '2026-10-15'; endDisp = '15-Oct-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-10-15' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-10-15' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-10-15' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-10-15' && end === '2026-10-15',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-10-15' > start && '2026-10-15' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-10-15' && start !== '2026-10-15' && end !== '2026-10-15' && !(start && end && '2026-10-15' > start && '2026-10-15' < end)
            }">15</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '16-Oct-2026'; activeVal = '2026-10-16';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-10-16'; startDisp = '16-Oct-2026'; end = null; endDisp = null; } else { end = '2026-10-16'; endDisp = '16-Oct-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-10-16' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-10-16' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-10-16' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-10-16' && end === '2026-10-16',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-10-16' > start && '2026-10-16' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-10-16' && start !== '2026-10-16' && end !== '2026-10-16' && !(start && end && '2026-10-16' > start && '2026-10-16' < end)
            }">16</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '17-Oct-2026'; activeVal = '2026-10-17';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-10-17'; startDisp = '17-Oct-2026'; end = null; endDisp = null; } else { end = '2026-10-17'; endDisp = '17-Oct-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-10-17' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-10-17' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-10-17' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-10-17' && end === '2026-10-17',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-10-17' > start && '2026-10-17' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-10-17' && start !== '2026-10-17' && end !== '2026-10-17' && !(start && end && '2026-10-17' > start && '2026-10-17' < end)
            }">17</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '18-Oct-2026'; activeVal = '2026-10-18';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-10-18'; startDisp = '18-Oct-2026'; end = null; endDisp = null; } else { end = '2026-10-18'; endDisp = '18-Oct-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-10-18' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-10-18' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-10-18' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-10-18' && end === '2026-10-18',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-10-18' > start && '2026-10-18' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-10-18' && start !== '2026-10-18' && end !== '2026-10-18' && !(start && end && '2026-10-18' > start && '2026-10-18' < end)
            }">18</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '19-Oct-2026'; activeVal = '2026-10-19';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-10-19'; startDisp = '19-Oct-2026'; end = null; endDisp = null; } else { end = '2026-10-19'; endDisp = '19-Oct-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-10-19' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-10-19' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-10-19' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-10-19' && end === '2026-10-19',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-10-19' > start && '2026-10-19' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-10-19' && start !== '2026-10-19' && end !== '2026-10-19' && !(start && end && '2026-10-19' > start && '2026-10-19' < end)
            }">19</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '20-Oct-2026'; activeVal = '2026-10-20';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-10-20'; startDisp = '20-Oct-2026'; end = null; endDisp = null; } else { end = '2026-10-20'; endDisp = '20-Oct-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-10-20' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-10-20' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-10-20' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-10-20' && end === '2026-10-20',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-10-20' > start && '2026-10-20' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-10-20' && start !== '2026-10-20' && end !== '2026-10-20' && !(start && end && '2026-10-20' > start && '2026-10-20' < end)
            }">20</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '21-Oct-2026'; activeVal = '2026-10-21';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-10-21'; startDisp = '21-Oct-2026'; end = null; endDisp = null; } else { end = '2026-10-21'; endDisp = '21-Oct-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-10-21' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-10-21' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-10-21' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-10-21' && end === '2026-10-21',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-10-21' > start && '2026-10-21' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-10-21' && start !== '2026-10-21' && end !== '2026-10-21' && !(start && end && '2026-10-21' > start && '2026-10-21' < end)
            }">21</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '22-Oct-2026'; activeVal = '2026-10-22';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-10-22'; startDisp = '22-Oct-2026'; end = null; endDisp = null; } else { end = '2026-10-22'; endDisp = '22-Oct-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-10-22' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-10-22' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-10-22' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-10-22' && end === '2026-10-22',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-10-22' > start && '2026-10-22' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-10-22' && start !== '2026-10-22' && end !== '2026-10-22' && !(start && end && '2026-10-22' > start && '2026-10-22' < end)
            }">22</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '23-Oct-2026'; activeVal = '2026-10-23';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-10-23'; startDisp = '23-Oct-2026'; end = null; endDisp = null; } else { end = '2026-10-23'; endDisp = '23-Oct-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-10-23' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-10-23' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-10-23' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-10-23' && end === '2026-10-23',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-10-23' > start && '2026-10-23' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-10-23' && start !== '2026-10-23' && end !== '2026-10-23' && !(start && end && '2026-10-23' > start && '2026-10-23' < end)
            }">23</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '24-Oct-2026'; activeVal = '2026-10-24';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-10-24'; startDisp = '24-Oct-2026'; end = null; endDisp = null; } else { end = '2026-10-24'; endDisp = '24-Oct-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-10-24' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-10-24' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-10-24' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-10-24' && end === '2026-10-24',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-10-24' > start && '2026-10-24' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-10-24' && start !== '2026-10-24' && end !== '2026-10-24' && !(start && end && '2026-10-24' > start && '2026-10-24' < end)
            }">24</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '25-Oct-2026'; activeVal = '2026-10-25';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-10-25'; startDisp = '25-Oct-2026'; end = null; endDisp = null; } else { end = '2026-10-25'; endDisp = '25-Oct-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-10-25' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-10-25' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-10-25' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-10-25' && end === '2026-10-25',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-10-25' > start && '2026-10-25' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-10-25' && start !== '2026-10-25' && end !== '2026-10-25' && !(start && end && '2026-10-25' > start && '2026-10-25' < end)
            }">25</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '26-Oct-2026'; activeVal = '2026-10-26';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-10-26'; startDisp = '26-Oct-2026'; end = null; endDisp = null; } else { end = '2026-10-26'; endDisp = '26-Oct-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-10-26' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-10-26' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-10-26' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-10-26' && end === '2026-10-26',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-10-26' > start && '2026-10-26' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-10-26' && start !== '2026-10-26' && end !== '2026-10-26' && !(start && end && '2026-10-26' > start && '2026-10-26' < end)
            }">26</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '27-Oct-2026'; activeVal = '2026-10-27';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-10-27'; startDisp = '27-Oct-2026'; end = null; endDisp = null; } else { end = '2026-10-27'; endDisp = '27-Oct-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-10-27' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-10-27' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-10-27' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-10-27' && end === '2026-10-27',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-10-27' > start && '2026-10-27' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-10-27' && start !== '2026-10-27' && end !== '2026-10-27' && !(start && end && '2026-10-27' > start && '2026-10-27' < end)
            }">27</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '28-Oct-2026'; activeVal = '2026-10-28';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-10-28'; startDisp = '28-Oct-2026'; end = null; endDisp = null; } else { end = '2026-10-28'; endDisp = '28-Oct-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-10-28' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-10-28' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-10-28' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-10-28' && end === '2026-10-28',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-10-28' > start && '2026-10-28' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-10-28' && start !== '2026-10-28' && end !== '2026-10-28' && !(start && end && '2026-10-28' > start && '2026-10-28' < end)
            }">28</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '29-Oct-2026'; activeVal = '2026-10-29';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-10-29'; startDisp = '29-Oct-2026'; end = null; endDisp = null; } else { end = '2026-10-29'; endDisp = '29-Oct-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-10-29' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-10-29' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-10-29' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-10-29' && end === '2026-10-29',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-10-29' > start && '2026-10-29' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-10-29' && start !== '2026-10-29' && end !== '2026-10-29' && !(start && end && '2026-10-29' > start && '2026-10-29' < end)
            }">29</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '30-Oct-2026'; activeVal = '2026-10-30';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-10-30'; startDisp = '30-Oct-2026'; end = null; endDisp = null; } else { end = '2026-10-30'; endDisp = '30-Oct-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-10-30' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-10-30' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-10-30' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-10-30' && end === '2026-10-30',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-10-30' > start && '2026-10-30' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-10-30' && start !== '2026-10-30' && end !== '2026-10-30' && !(start && end && '2026-10-30' > start && '2026-10-30' < end)
            }">30</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '31-Oct-2026'; activeVal = '2026-10-31';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-10-31'; startDisp = '31-Oct-2026'; end = null; endDisp = null; } else { end = '2026-10-31'; endDisp = '31-Oct-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-10-31' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-10-31' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-10-31' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-10-31' && end === '2026-10-31',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-10-31' > start && '2026-10-31' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-10-31' && start !== '2026-10-31' && end !== '2026-10-31' && !(start && end && '2026-10-31' > start && '2026-10-31' < end)
            }">31</span>
  <span class="p-1.5 text-muted-foreground/30">1</span>
  <span class="p-1.5 text-muted-foreground/30">2</span>
  <span class="p-1.5 text-muted-foreground/30">3</span>
  <span class="p-1.5 text-muted-foreground/30">4</span>
  <span class="p-1.5 text-muted-foreground/30">5</span>
  <span class="p-1.5 text-muted-foreground/30">6</span>
  <span class="p-1.5 text-muted-foreground/30">7</span>
  </div>
</div>
        <div class="inline-block p-3 border border-border rounded-md bg-background shadow-sm select-none">
  <div class="flex justify-between items-center mb-4"><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">◀</button><div class="font-medium text-sm">November 2026</div><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">▶</button></div>
  <div class="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs">
  <span class="p-1.5 text-muted-foreground font-medium">Su</span><span class="p-1.5 text-muted-foreground font-medium">Mo</span><span class="p-1.5 text-muted-foreground font-medium">Tu</span><span class="p-1.5 text-muted-foreground font-medium">We</span><span class="p-1.5 text-muted-foreground font-medium">Th</span><span class="p-1.5 text-muted-foreground font-medium">Fr</span><span class="p-1.5 text-muted-foreground font-medium">Sa</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '01-Nov-2026'; activeVal = '2026-11-01';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-11-01'; startDisp = '01-Nov-2026'; end = null; endDisp = null; } else { end = '2026-11-01'; endDisp = '01-Nov-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-11-01' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-11-01' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-11-01' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-11-01' && end === '2026-11-01',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-11-01' > start && '2026-11-01' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-11-01' && start !== '2026-11-01' && end !== '2026-11-01' && !(start && end && '2026-11-01' > start && '2026-11-01' < end)
            }">1</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '02-Nov-2026'; activeVal = '2026-11-02';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-11-02'; startDisp = '02-Nov-2026'; end = null; endDisp = null; } else { end = '2026-11-02'; endDisp = '02-Nov-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-11-02' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-11-02' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-11-02' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-11-02' && end === '2026-11-02',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-11-02' > start && '2026-11-02' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-11-02' && start !== '2026-11-02' && end !== '2026-11-02' && !(start && end && '2026-11-02' > start && '2026-11-02' < end)
            }">2</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '03-Nov-2026'; activeVal = '2026-11-03';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-11-03'; startDisp = '03-Nov-2026'; end = null; endDisp = null; } else { end = '2026-11-03'; endDisp = '03-Nov-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-11-03' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-11-03' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-11-03' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-11-03' && end === '2026-11-03',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-11-03' > start && '2026-11-03' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-11-03' && start !== '2026-11-03' && end !== '2026-11-03' && !(start && end && '2026-11-03' > start && '2026-11-03' < end)
            }">3</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '04-Nov-2026'; activeVal = '2026-11-04';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-11-04'; startDisp = '04-Nov-2026'; end = null; endDisp = null; } else { end = '2026-11-04'; endDisp = '04-Nov-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-11-04' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-11-04' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-11-04' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-11-04' && end === '2026-11-04',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-11-04' > start && '2026-11-04' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-11-04' && start !== '2026-11-04' && end !== '2026-11-04' && !(start && end && '2026-11-04' > start && '2026-11-04' < end)
            }">4</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '05-Nov-2026'; activeVal = '2026-11-05';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-11-05'; startDisp = '05-Nov-2026'; end = null; endDisp = null; } else { end = '2026-11-05'; endDisp = '05-Nov-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-11-05' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-11-05' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-11-05' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-11-05' && end === '2026-11-05',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-11-05' > start && '2026-11-05' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-11-05' && start !== '2026-11-05' && end !== '2026-11-05' && !(start && end && '2026-11-05' > start && '2026-11-05' < end)
            }">5</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '06-Nov-2026'; activeVal = '2026-11-06';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-11-06'; startDisp = '06-Nov-2026'; end = null; endDisp = null; } else { end = '2026-11-06'; endDisp = '06-Nov-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-11-06' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-11-06' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-11-06' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-11-06' && end === '2026-11-06',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-11-06' > start && '2026-11-06' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-11-06' && start !== '2026-11-06' && end !== '2026-11-06' && !(start && end && '2026-11-06' > start && '2026-11-06' < end)
            }">6</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '07-Nov-2026'; activeVal = '2026-11-07';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-11-07'; startDisp = '07-Nov-2026'; end = null; endDisp = null; } else { end = '2026-11-07'; endDisp = '07-Nov-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-11-07' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-11-07' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-11-07' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-11-07' && end === '2026-11-07',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-11-07' > start && '2026-11-07' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-11-07' && start !== '2026-11-07' && end !== '2026-11-07' && !(start && end && '2026-11-07' > start && '2026-11-07' < end)
            }">7</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '08-Nov-2026'; activeVal = '2026-11-08';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-11-08'; startDisp = '08-Nov-2026'; end = null; endDisp = null; } else { end = '2026-11-08'; endDisp = '08-Nov-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-11-08' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-11-08' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-11-08' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-11-08' && end === '2026-11-08',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-11-08' > start && '2026-11-08' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-11-08' && start !== '2026-11-08' && end !== '2026-11-08' && !(start && end && '2026-11-08' > start && '2026-11-08' < end)
            }">8</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '09-Nov-2026'; activeVal = '2026-11-09';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-11-09'; startDisp = '09-Nov-2026'; end = null; endDisp = null; } else { end = '2026-11-09'; endDisp = '09-Nov-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-11-09' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-11-09' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-11-09' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-11-09' && end === '2026-11-09',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-11-09' > start && '2026-11-09' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-11-09' && start !== '2026-11-09' && end !== '2026-11-09' && !(start && end && '2026-11-09' > start && '2026-11-09' < end)
            }">9</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '10-Nov-2026'; activeVal = '2026-11-10';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-11-10'; startDisp = '10-Nov-2026'; end = null; endDisp = null; } else { end = '2026-11-10'; endDisp = '10-Nov-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-11-10' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-11-10' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-11-10' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-11-10' && end === '2026-11-10',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-11-10' > start && '2026-11-10' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-11-10' && start !== '2026-11-10' && end !== '2026-11-10' && !(start && end && '2026-11-10' > start && '2026-11-10' < end)
            }">10</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '11-Nov-2026'; activeVal = '2026-11-11';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-11-11'; startDisp = '11-Nov-2026'; end = null; endDisp = null; } else { end = '2026-11-11'; endDisp = '11-Nov-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-11-11' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-11-11' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-11-11' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-11-11' && end === '2026-11-11',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-11-11' > start && '2026-11-11' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-11-11' && start !== '2026-11-11' && end !== '2026-11-11' && !(start && end && '2026-11-11' > start && '2026-11-11' < end)
            }">11</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '12-Nov-2026'; activeVal = '2026-11-12';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-11-12'; startDisp = '12-Nov-2026'; end = null; endDisp = null; } else { end = '2026-11-12'; endDisp = '12-Nov-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-11-12' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-11-12' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-11-12' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-11-12' && end === '2026-11-12',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-11-12' > start && '2026-11-12' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-11-12' && start !== '2026-11-12' && end !== '2026-11-12' && !(start && end && '2026-11-12' > start && '2026-11-12' < end)
            }">12</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '13-Nov-2026'; activeVal = '2026-11-13';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-11-13'; startDisp = '13-Nov-2026'; end = null; endDisp = null; } else { end = '2026-11-13'; endDisp = '13-Nov-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-11-13' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-11-13' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-11-13' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-11-13' && end === '2026-11-13',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-11-13' > start && '2026-11-13' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-11-13' && start !== '2026-11-13' && end !== '2026-11-13' && !(start && end && '2026-11-13' > start && '2026-11-13' < end)
            }">13</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '14-Nov-2026'; activeVal = '2026-11-14';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-11-14'; startDisp = '14-Nov-2026'; end = null; endDisp = null; } else { end = '2026-11-14'; endDisp = '14-Nov-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-11-14' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-11-14' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-11-14' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-11-14' && end === '2026-11-14',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-11-14' > start && '2026-11-14' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-11-14' && start !== '2026-11-14' && end !== '2026-11-14' && !(start && end && '2026-11-14' > start && '2026-11-14' < end)
            }">14</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '15-Nov-2026'; activeVal = '2026-11-15';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-11-15'; startDisp = '15-Nov-2026'; end = null; endDisp = null; } else { end = '2026-11-15'; endDisp = '15-Nov-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-11-15' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-11-15' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-11-15' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-11-15' && end === '2026-11-15',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-11-15' > start && '2026-11-15' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-11-15' && start !== '2026-11-15' && end !== '2026-11-15' && !(start && end && '2026-11-15' > start && '2026-11-15' < end)
            }">15</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '16-Nov-2026'; activeVal = '2026-11-16';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-11-16'; startDisp = '16-Nov-2026'; end = null; endDisp = null; } else { end = '2026-11-16'; endDisp = '16-Nov-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-11-16' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-11-16' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-11-16' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-11-16' && end === '2026-11-16',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-11-16' > start && '2026-11-16' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-11-16' && start !== '2026-11-16' && end !== '2026-11-16' && !(start && end && '2026-11-16' > start && '2026-11-16' < end)
            }">16</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '17-Nov-2026'; activeVal = '2026-11-17';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-11-17'; startDisp = '17-Nov-2026'; end = null; endDisp = null; } else { end = '2026-11-17'; endDisp = '17-Nov-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-11-17' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-11-17' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-11-17' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-11-17' && end === '2026-11-17',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-11-17' > start && '2026-11-17' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-11-17' && start !== '2026-11-17' && end !== '2026-11-17' && !(start && end && '2026-11-17' > start && '2026-11-17' < end)
            }">17</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '18-Nov-2026'; activeVal = '2026-11-18';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-11-18'; startDisp = '18-Nov-2026'; end = null; endDisp = null; } else { end = '2026-11-18'; endDisp = '18-Nov-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-11-18' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-11-18' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-11-18' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-11-18' && end === '2026-11-18',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-11-18' > start && '2026-11-18' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-11-18' && start !== '2026-11-18' && end !== '2026-11-18' && !(start && end && '2026-11-18' > start && '2026-11-18' < end)
            }">18</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '19-Nov-2026'; activeVal = '2026-11-19';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-11-19'; startDisp = '19-Nov-2026'; end = null; endDisp = null; } else { end = '2026-11-19'; endDisp = '19-Nov-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-11-19' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-11-19' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-11-19' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-11-19' && end === '2026-11-19',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-11-19' > start && '2026-11-19' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-11-19' && start !== '2026-11-19' && end !== '2026-11-19' && !(start && end && '2026-11-19' > start && '2026-11-19' < end)
            }">19</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '20-Nov-2026'; activeVal = '2026-11-20';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-11-20'; startDisp = '20-Nov-2026'; end = null; endDisp = null; } else { end = '2026-11-20'; endDisp = '20-Nov-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-11-20' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-11-20' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-11-20' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-11-20' && end === '2026-11-20',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-11-20' > start && '2026-11-20' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-11-20' && start !== '2026-11-20' && end !== '2026-11-20' && !(start && end && '2026-11-20' > start && '2026-11-20' < end)
            }">20</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '21-Nov-2026'; activeVal = '2026-11-21';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-11-21'; startDisp = '21-Nov-2026'; end = null; endDisp = null; } else { end = '2026-11-21'; endDisp = '21-Nov-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-11-21' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-11-21' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-11-21' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-11-21' && end === '2026-11-21',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-11-21' > start && '2026-11-21' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-11-21' && start !== '2026-11-21' && end !== '2026-11-21' && !(start && end && '2026-11-21' > start && '2026-11-21' < end)
            }">21</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '22-Nov-2026'; activeVal = '2026-11-22';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-11-22'; startDisp = '22-Nov-2026'; end = null; endDisp = null; } else { end = '2026-11-22'; endDisp = '22-Nov-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-11-22' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-11-22' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-11-22' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-11-22' && end === '2026-11-22',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-11-22' > start && '2026-11-22' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-11-22' && start !== '2026-11-22' && end !== '2026-11-22' && !(start && end && '2026-11-22' > start && '2026-11-22' < end)
            }">22</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '23-Nov-2026'; activeVal = '2026-11-23';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-11-23'; startDisp = '23-Nov-2026'; end = null; endDisp = null; } else { end = '2026-11-23'; endDisp = '23-Nov-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-11-23' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-11-23' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-11-23' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-11-23' && end === '2026-11-23',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-11-23' > start && '2026-11-23' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-11-23' && start !== '2026-11-23' && end !== '2026-11-23' && !(start && end && '2026-11-23' > start && '2026-11-23' < end)
            }">23</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '24-Nov-2026'; activeVal = '2026-11-24';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-11-24'; startDisp = '24-Nov-2026'; end = null; endDisp = null; } else { end = '2026-11-24'; endDisp = '24-Nov-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-11-24' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-11-24' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-11-24' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-11-24' && end === '2026-11-24',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-11-24' > start && '2026-11-24' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-11-24' && start !== '2026-11-24' && end !== '2026-11-24' && !(start && end && '2026-11-24' > start && '2026-11-24' < end)
            }">24</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '25-Nov-2026'; activeVal = '2026-11-25';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-11-25'; startDisp = '25-Nov-2026'; end = null; endDisp = null; } else { end = '2026-11-25'; endDisp = '25-Nov-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-11-25' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-11-25' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-11-25' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-11-25' && end === '2026-11-25',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-11-25' > start && '2026-11-25' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-11-25' && start !== '2026-11-25' && end !== '2026-11-25' && !(start && end && '2026-11-25' > start && '2026-11-25' < end)
            }">25</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '26-Nov-2026'; activeVal = '2026-11-26';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-11-26'; startDisp = '26-Nov-2026'; end = null; endDisp = null; } else { end = '2026-11-26'; endDisp = '26-Nov-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-11-26' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-11-26' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-11-26' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-11-26' && end === '2026-11-26',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-11-26' > start && '2026-11-26' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-11-26' && start !== '2026-11-26' && end !== '2026-11-26' && !(start && end && '2026-11-26' > start && '2026-11-26' < end)
            }">26</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '27-Nov-2026'; activeVal = '2026-11-27';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-11-27'; startDisp = '27-Nov-2026'; end = null; endDisp = null; } else { end = '2026-11-27'; endDisp = '27-Nov-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-11-27' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-11-27' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-11-27' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-11-27' && end === '2026-11-27',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-11-27' > start && '2026-11-27' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-11-27' && start !== '2026-11-27' && end !== '2026-11-27' && !(start && end && '2026-11-27' > start && '2026-11-27' < end)
            }">27</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '28-Nov-2026'; activeVal = '2026-11-28';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-11-28'; startDisp = '28-Nov-2026'; end = null; endDisp = null; } else { end = '2026-11-28'; endDisp = '28-Nov-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-11-28' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-11-28' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-11-28' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-11-28' && end === '2026-11-28',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-11-28' > start && '2026-11-28' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-11-28' && start !== '2026-11-28' && end !== '2026-11-28' && !(start && end && '2026-11-28' > start && '2026-11-28' < end)
            }">28</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '29-Nov-2026'; activeVal = '2026-11-29';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-11-29'; startDisp = '29-Nov-2026'; end = null; endDisp = null; } else { end = '2026-11-29'; endDisp = '29-Nov-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-11-29' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-11-29' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-11-29' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-11-29' && end === '2026-11-29',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-11-29' > start && '2026-11-29' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-11-29' && start !== '2026-11-29' && end !== '2026-11-29' && !(start && end && '2026-11-29' > start && '2026-11-29' < end)
            }">29</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="active = '30-Nov-2026'; activeVal = '2026-11-30';" hx-action-dblclick="if (!start || (start && end)) { start = '2026-11-30'; startDisp = '30-Nov-2026'; end = null; endDisp = null; } else { end = '2026-11-30'; endDisp = '30-Nov-2026'; if (end < start) { let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; } }" hx-class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '2026-11-30' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '2026-11-30' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '2026-11-30' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '2026-11-30' && end === '2026-11-30',
              'bg-primary/20 text-foreground rounded-none': start && end && '2026-11-30' > start && '2026-11-30' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '2026-11-30' && start !== '2026-11-30' && end !== '2026-11-30' && !(start && end && '2026-11-30' > start && '2026-11-30' < end)
            }">30</span>
  <span class="p-1.5 text-muted-foreground/30">1</span>
  <span class="p-1.5 text-muted-foreground/30">2</span>
  <span class="p-1.5 text-muted-foreground/30">3</span>
  <span class="p-1.5 text-muted-foreground/30">4</span>
  <span class="p-1.5 text-muted-foreground/30">5</span>
  <span class="p-1.5 text-muted-foreground/30">6</span>
  <span class="p-1.5 text-muted-foreground/30">7</span>
  <span class="p-1.5 text-muted-foreground/30">8</span>
  <span class="p-1.5 text-muted-foreground/30">9</span>
  <span class="p-1.5 text-muted-foreground/30">10</span>
  <span class="p-1.5 text-muted-foreground/30">11</span>
  <span class="p-1.5 text-muted-foreground/30">12</span>
  </div>
</div>
    </div>
  </div>

  <div>
    <h4 class="text-sm font-medium mb-4 text-muted-foreground">Year Calendar - 4x3 Month View</h4>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="inline-block p-3 border border-border rounded-md bg-background shadow-sm select-none">
  <div class="flex justify-between items-center mb-4"><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">◀</button><div class="font-medium text-sm">Jan 2027</div><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">▶</button></div>
  <div class="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs">
  <span class="p-1.5 text-muted-foreground font-medium">Su</span><span class="p-1.5 text-muted-foreground font-medium">Mo</span><span class="p-1.5 text-muted-foreground font-medium">Tu</span><span class="p-1.5 text-muted-foreground font-medium">We</span><span class="p-1.5 text-muted-foreground font-medium">Th</span><span class="p-1.5 text-muted-foreground font-medium">Fr</span><span class="p-1.5 text-muted-foreground font-medium">Sa</span>
  <span class="p-1.5 text-muted-foreground/30">27</span>
  <span class="p-1.5 text-muted-foreground/30">28</span>
  <span class="p-1.5 text-muted-foreground/30">29</span>
  <span class="p-1.5 text-muted-foreground/30">30</span>
  <span class="p-1.5 text-muted-foreground/30">31</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">1</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">2</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">3</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">4</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">5</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">6</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">7</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">8</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">9</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">10</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">11</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">12</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">13</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">14</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">15</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">16</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">17</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">18</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">19</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">20</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">21</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">22</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">23</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">24</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">25</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">26</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">27</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">28</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">29</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">30</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">31</span>
  <span class="p-1.5 text-muted-foreground/30">1</span>
  <span class="p-1.5 text-muted-foreground/30">2</span>
  <span class="p-1.5 text-muted-foreground/30">3</span>
  <span class="p-1.5 text-muted-foreground/30">4</span>
  <span class="p-1.5 text-muted-foreground/30">5</span>
  <span class="p-1.5 text-muted-foreground/30">6</span>
  </div>
</div>
        <div class="inline-block p-3 border border-border rounded-md bg-background shadow-sm select-none">
  <div class="flex justify-between items-center mb-4"><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">◀</button><div class="font-medium text-sm">Feb 2027</div><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">▶</button></div>
  <div class="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs">
  <span class="p-1.5 text-muted-foreground font-medium">Su</span><span class="p-1.5 text-muted-foreground font-medium">Mo</span><span class="p-1.5 text-muted-foreground font-medium">Tu</span><span class="p-1.5 text-muted-foreground font-medium">We</span><span class="p-1.5 text-muted-foreground font-medium">Th</span><span class="p-1.5 text-muted-foreground font-medium">Fr</span><span class="p-1.5 text-muted-foreground font-medium">Sa</span>
  <span class="p-1.5 text-muted-foreground/30">31</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">1</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">2</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">3</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">4</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">5</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">6</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">7</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">8</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">9</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">10</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">11</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">12</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">13</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">14</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">15</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">16</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">17</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">18</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">19</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">20</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">21</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">22</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">23</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">24</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">25</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">26</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">27</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">28</span>
  <span class="p-1.5 text-muted-foreground/30">1</span>
  <span class="p-1.5 text-muted-foreground/30">2</span>
  <span class="p-1.5 text-muted-foreground/30">3</span>
  <span class="p-1.5 text-muted-foreground/30">4</span>
  <span class="p-1.5 text-muted-foreground/30">5</span>
  <span class="p-1.5 text-muted-foreground/30">6</span>
  <span class="p-1.5 text-muted-foreground/30">7</span>
  <span class="p-1.5 text-muted-foreground/30">8</span>
  <span class="p-1.5 text-muted-foreground/30">9</span>
  <span class="p-1.5 text-muted-foreground/30">10</span>
  <span class="p-1.5 text-muted-foreground/30">11</span>
  <span class="p-1.5 text-muted-foreground/30">12</span>
  <span class="p-1.5 text-muted-foreground/30">13</span>
  </div>
</div>
        <div class="inline-block p-3 border border-border rounded-md bg-background shadow-sm select-none">
  <div class="flex justify-between items-center mb-4"><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">◀</button><div class="font-medium text-sm">Mar 2027</div><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">▶</button></div>
  <div class="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs">
  <span class="p-1.5 text-muted-foreground font-medium">Su</span><span class="p-1.5 text-muted-foreground font-medium">Mo</span><span class="p-1.5 text-muted-foreground font-medium">Tu</span><span class="p-1.5 text-muted-foreground font-medium">We</span><span class="p-1.5 text-muted-foreground font-medium">Th</span><span class="p-1.5 text-muted-foreground font-medium">Fr</span><span class="p-1.5 text-muted-foreground font-medium">Sa</span>
  <span class="p-1.5 text-muted-foreground/30">31</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">1</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">2</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">3</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">4</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">5</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">6</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">7</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">8</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">9</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">10</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">11</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">12</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">13</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">14</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">15</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">16</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">17</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">18</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">19</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">20</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">21</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">22</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">23</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">24</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">25</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">26</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">27</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">28</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">29</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">30</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">31</span>
  <span class="p-1.5 text-muted-foreground/30">1</span>
  <span class="p-1.5 text-muted-foreground/30">2</span>
  <span class="p-1.5 text-muted-foreground/30">3</span>
  <span class="p-1.5 text-muted-foreground/30">4</span>
  <span class="p-1.5 text-muted-foreground/30">5</span>
  <span class="p-1.5 text-muted-foreground/30">6</span>
  <span class="p-1.5 text-muted-foreground/30">7</span>
  <span class="p-1.5 text-muted-foreground/30">8</span>
  <span class="p-1.5 text-muted-foreground/30">9</span>
  <span class="p-1.5 text-muted-foreground/30">10</span>
  </div>
</div>
        <div class="inline-block p-3 border border-border rounded-md bg-background shadow-sm select-none">
  <div class="flex justify-between items-center mb-4"><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">◀</button><div class="font-medium text-sm">Apr 2027</div><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">▶</button></div>
  <div class="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs">
  <span class="p-1.5 text-muted-foreground font-medium">Su</span><span class="p-1.5 text-muted-foreground font-medium">Mo</span><span class="p-1.5 text-muted-foreground font-medium">Tu</span><span class="p-1.5 text-muted-foreground font-medium">We</span><span class="p-1.5 text-muted-foreground font-medium">Th</span><span class="p-1.5 text-muted-foreground font-medium">Fr</span><span class="p-1.5 text-muted-foreground font-medium">Sa</span>
  <span class="p-1.5 text-muted-foreground/30">28</span>
  <span class="p-1.5 text-muted-foreground/30">29</span>
  <span class="p-1.5 text-muted-foreground/30">30</span>
  <span class="p-1.5 text-muted-foreground/30">31</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">1</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">2</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">3</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">4</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">5</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">6</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">7</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">8</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">9</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">10</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">11</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">12</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">13</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">14</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">15</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">16</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">17</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">18</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">19</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">20</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">21</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">22</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">23</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">24</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">25</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">26</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">27</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">28</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">29</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">30</span>
  <span class="p-1.5 text-muted-foreground/30">1</span>
  <span class="p-1.5 text-muted-foreground/30">2</span>
  <span class="p-1.5 text-muted-foreground/30">3</span>
  <span class="p-1.5 text-muted-foreground/30">4</span>
  <span class="p-1.5 text-muted-foreground/30">5</span>
  <span class="p-1.5 text-muted-foreground/30">6</span>
  <span class="p-1.5 text-muted-foreground/30">7</span>
  <span class="p-1.5 text-muted-foreground/30">8</span>
  </div>
</div>
        <div class="inline-block p-3 border border-border rounded-md bg-background shadow-sm select-none">
  <div class="flex justify-between items-center mb-4"><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">◀</button><div class="font-medium text-sm">May 2027</div><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">▶</button></div>
  <div class="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs">
  <span class="p-1.5 text-muted-foreground font-medium">Su</span><span class="p-1.5 text-muted-foreground font-medium">Mo</span><span class="p-1.5 text-muted-foreground font-medium">Tu</span><span class="p-1.5 text-muted-foreground font-medium">We</span><span class="p-1.5 text-muted-foreground font-medium">Th</span><span class="p-1.5 text-muted-foreground font-medium">Fr</span><span class="p-1.5 text-muted-foreground font-medium">Sa</span>
  <span class="p-1.5 text-muted-foreground/30">26</span>
  <span class="p-1.5 text-muted-foreground/30">27</span>
  <span class="p-1.5 text-muted-foreground/30">28</span>
  <span class="p-1.5 text-muted-foreground/30">29</span>
  <span class="p-1.5 text-muted-foreground/30">30</span>
  <span class="p-1.5 text-muted-foreground/30">31</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">1</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">2</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">3</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">4</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">5</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">6</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">7</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">8</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">9</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">10</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">11</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">12</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">13</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">14</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">15</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">16</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">17</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">18</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">19</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">20</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">21</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">22</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">23</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">24</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">25</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">26</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">27</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">28</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">29</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">30</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">31</span>
  <span class="p-1.5 text-muted-foreground/30">1</span>
  <span class="p-1.5 text-muted-foreground/30">2</span>
  <span class="p-1.5 text-muted-foreground/30">3</span>
  <span class="p-1.5 text-muted-foreground/30">4</span>
  <span class="p-1.5 text-muted-foreground/30">5</span>
  </div>
</div>
        <div class="inline-block p-3 border border-border rounded-md bg-background shadow-sm select-none">
  <div class="flex justify-between items-center mb-4"><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">◀</button><div class="font-medium text-sm">Jun 2027</div><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">▶</button></div>
  <div class="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs">
  <span class="p-1.5 text-muted-foreground font-medium">Su</span><span class="p-1.5 text-muted-foreground font-medium">Mo</span><span class="p-1.5 text-muted-foreground font-medium">Tu</span><span class="p-1.5 text-muted-foreground font-medium">We</span><span class="p-1.5 text-muted-foreground font-medium">Th</span><span class="p-1.5 text-muted-foreground font-medium">Fr</span><span class="p-1.5 text-muted-foreground font-medium">Sa</span>
  <span class="p-1.5 text-muted-foreground/30">30</span>
  <span class="p-1.5 text-muted-foreground/30">31</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">1</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">2</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">3</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">4</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">5</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">6</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">7</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">8</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">9</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">10</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">11</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">12</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">13</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">14</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">15</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">16</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">17</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">18</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">19</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">20</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">21</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">22</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">23</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">24</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">25</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">26</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">27</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">28</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">29</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">30</span>
  <span class="p-1.5 text-muted-foreground/30">1</span>
  <span class="p-1.5 text-muted-foreground/30">2</span>
  <span class="p-1.5 text-muted-foreground/30">3</span>
  <span class="p-1.5 text-muted-foreground/30">4</span>
  <span class="p-1.5 text-muted-foreground/30">5</span>
  <span class="p-1.5 text-muted-foreground/30">6</span>
  <span class="p-1.5 text-muted-foreground/30">7</span>
  <span class="p-1.5 text-muted-foreground/30">8</span>
  <span class="p-1.5 text-muted-foreground/30">9</span>
  <span class="p-1.5 text-muted-foreground/30">10</span>
  </div>
</div>
        <div class="inline-block p-3 border border-border rounded-md bg-background shadow-sm select-none">
  <div class="flex justify-between items-center mb-4"><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">◀</button><div class="font-medium text-sm">Jul 2027</div><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">▶</button></div>
  <div class="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs">
  <span class="p-1.5 text-muted-foreground font-medium">Su</span><span class="p-1.5 text-muted-foreground font-medium">Mo</span><span class="p-1.5 text-muted-foreground font-medium">Tu</span><span class="p-1.5 text-muted-foreground font-medium">We</span><span class="p-1.5 text-muted-foreground font-medium">Th</span><span class="p-1.5 text-muted-foreground font-medium">Fr</span><span class="p-1.5 text-muted-foreground font-medium">Sa</span>
  <span class="p-1.5 text-muted-foreground/30">28</span>
  <span class="p-1.5 text-muted-foreground/30">29</span>
  <span class="p-1.5 text-muted-foreground/30">30</span>
  <span class="p-1.5 text-muted-foreground/30">31</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">1</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">2</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">3</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">4</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">5</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">6</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">7</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">8</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">9</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">10</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">11</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">12</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">13</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">14</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">15</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">16</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">17</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">18</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">19</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">20</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">21</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">22</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">23</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">24</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">25</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">26</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">27</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">28</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">29</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">30</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">31</span>
  <span class="p-1.5 text-muted-foreground/30">1</span>
  <span class="p-1.5 text-muted-foreground/30">2</span>
  <span class="p-1.5 text-muted-foreground/30">3</span>
  <span class="p-1.5 text-muted-foreground/30">4</span>
  <span class="p-1.5 text-muted-foreground/30">5</span>
  <span class="p-1.5 text-muted-foreground/30">6</span>
  <span class="p-1.5 text-muted-foreground/30">7</span>
  </div>
</div>
        <div class="inline-block p-3 border border-border rounded-md bg-background shadow-sm select-none">
  <div class="flex justify-between items-center mb-4"><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">◀</button><div class="font-medium text-sm">Aug 2027</div><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">▶</button></div>
  <div class="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs">
  <span class="p-1.5 text-muted-foreground font-medium">Su</span><span class="p-1.5 text-muted-foreground font-medium">Mo</span><span class="p-1.5 text-muted-foreground font-medium">Tu</span><span class="p-1.5 text-muted-foreground font-medium">We</span><span class="p-1.5 text-muted-foreground font-medium">Th</span><span class="p-1.5 text-muted-foreground font-medium">Fr</span><span class="p-1.5 text-muted-foreground font-medium">Sa</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">1</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">2</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">3</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">4</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">5</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">6</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">7</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">8</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">9</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">10</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">11</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">12</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">13</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">14</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">15</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">16</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">17</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">18</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">19</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">20</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">21</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">22</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">23</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">24</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">25</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">26</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">27</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">28</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">29</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">30</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">31</span>
  <span class="p-1.5 text-muted-foreground/30">1</span>
  <span class="p-1.5 text-muted-foreground/30">2</span>
  <span class="p-1.5 text-muted-foreground/30">3</span>
  <span class="p-1.5 text-muted-foreground/30">4</span>
  <span class="p-1.5 text-muted-foreground/30">5</span>
  <span class="p-1.5 text-muted-foreground/30">6</span>
  <span class="p-1.5 text-muted-foreground/30">7</span>
  <span class="p-1.5 text-muted-foreground/30">8</span>
  <span class="p-1.5 text-muted-foreground/30">9</span>
  <span class="p-1.5 text-muted-foreground/30">10</span>
  <span class="p-1.5 text-muted-foreground/30">11</span>
  </div>
</div>
        <div class="inline-block p-3 border border-border rounded-md bg-background shadow-sm select-none">
  <div class="flex justify-between items-center mb-4"><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">◀</button><div class="font-medium text-sm">Sep 2027</div><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">▶</button></div>
  <div class="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs">
  <span class="p-1.5 text-muted-foreground font-medium">Su</span><span class="p-1.5 text-muted-foreground font-medium">Mo</span><span class="p-1.5 text-muted-foreground font-medium">Tu</span><span class="p-1.5 text-muted-foreground font-medium">We</span><span class="p-1.5 text-muted-foreground font-medium">Th</span><span class="p-1.5 text-muted-foreground font-medium">Fr</span><span class="p-1.5 text-muted-foreground font-medium">Sa</span>
  <span class="p-1.5 text-muted-foreground/30">29</span>
  <span class="p-1.5 text-muted-foreground/30">30</span>
  <span class="p-1.5 text-muted-foreground/30">31</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">1</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">2</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">3</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">4</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">5</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">6</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">7</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">8</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">9</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">10</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">11</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">12</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">13</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">14</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">15</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">16</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">17</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">18</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">19</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">20</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">21</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">22</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">23</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">24</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">25</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">26</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">27</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">28</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">29</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">30</span>
  <span class="p-1.5 text-muted-foreground/30">1</span>
  <span class="p-1.5 text-muted-foreground/30">2</span>
  <span class="p-1.5 text-muted-foreground/30">3</span>
  <span class="p-1.5 text-muted-foreground/30">4</span>
  <span class="p-1.5 text-muted-foreground/30">5</span>
  <span class="p-1.5 text-muted-foreground/30">6</span>
  <span class="p-1.5 text-muted-foreground/30">7</span>
  <span class="p-1.5 text-muted-foreground/30">8</span>
  <span class="p-1.5 text-muted-foreground/30">9</span>
  </div>
</div>
        <div class="inline-block p-3 border border-border rounded-md bg-background shadow-sm select-none">
  <div class="flex justify-between items-center mb-4"><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">◀</button><div class="font-medium text-sm">Oct 2027</div><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">▶</button></div>
  <div class="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs">
  <span class="p-1.5 text-muted-foreground font-medium">Su</span><span class="p-1.5 text-muted-foreground font-medium">Mo</span><span class="p-1.5 text-muted-foreground font-medium">Tu</span><span class="p-1.5 text-muted-foreground font-medium">We</span><span class="p-1.5 text-muted-foreground font-medium">Th</span><span class="p-1.5 text-muted-foreground font-medium">Fr</span><span class="p-1.5 text-muted-foreground font-medium">Sa</span>
  <span class="p-1.5 text-muted-foreground/30">27</span>
  <span class="p-1.5 text-muted-foreground/30">28</span>
  <span class="p-1.5 text-muted-foreground/30">29</span>
  <span class="p-1.5 text-muted-foreground/30">30</span>
  <span class="p-1.5 text-muted-foreground/30">31</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">1</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">2</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">3</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">4</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">5</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">6</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">7</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">8</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">9</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">10</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">11</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">12</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">13</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">14</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">15</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">16</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">17</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">18</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">19</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">20</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">21</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">22</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">23</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">24</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">25</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">26</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">27</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">28</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">29</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">30</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">31</span>
  <span class="p-1.5 text-muted-foreground/30">1</span>
  <span class="p-1.5 text-muted-foreground/30">2</span>
  <span class="p-1.5 text-muted-foreground/30">3</span>
  <span class="p-1.5 text-muted-foreground/30">4</span>
  <span class="p-1.5 text-muted-foreground/30">5</span>
  <span class="p-1.5 text-muted-foreground/30">6</span>
  </div>
</div>
        <div class="inline-block p-3 border border-border rounded-md bg-background shadow-sm select-none">
  <div class="flex justify-between items-center mb-4"><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">◀</button><div class="font-medium text-sm">Nov 2027</div><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">▶</button></div>
  <div class="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs">
  <span class="p-1.5 text-muted-foreground font-medium">Su</span><span class="p-1.5 text-muted-foreground font-medium">Mo</span><span class="p-1.5 text-muted-foreground font-medium">Tu</span><span class="p-1.5 text-muted-foreground font-medium">We</span><span class="p-1.5 text-muted-foreground font-medium">Th</span><span class="p-1.5 text-muted-foreground font-medium">Fr</span><span class="p-1.5 text-muted-foreground font-medium">Sa</span>
  <span class="p-1.5 text-muted-foreground/30">31</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">1</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">2</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">3</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">4</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">5</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">6</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">7</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">8</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">9</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">10</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">11</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">12</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">13</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">14</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">15</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">16</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">17</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">18</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">19</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">20</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">21</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">22</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">23</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">24</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">25</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">26</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">27</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">28</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">29</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">30</span>
  <span class="p-1.5 text-muted-foreground/30">1</span>
  <span class="p-1.5 text-muted-foreground/30">2</span>
  <span class="p-1.5 text-muted-foreground/30">3</span>
  <span class="p-1.5 text-muted-foreground/30">4</span>
  <span class="p-1.5 text-muted-foreground/30">5</span>
  <span class="p-1.5 text-muted-foreground/30">6</span>
  <span class="p-1.5 text-muted-foreground/30">7</span>
  <span class="p-1.5 text-muted-foreground/30">8</span>
  <span class="p-1.5 text-muted-foreground/30">9</span>
  <span class="p-1.5 text-muted-foreground/30">10</span>
  <span class="p-1.5 text-muted-foreground/30">11</span>
  </div>
</div>
        <div class="inline-block p-3 border border-border rounded-md bg-background shadow-sm select-none">
  <div class="flex justify-between items-center mb-4"><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">◀</button><div class="font-medium text-sm">Dec 2027</div><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">▶</button></div>
  <div class="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs">
  <span class="p-1.5 text-muted-foreground font-medium">Su</span><span class="p-1.5 text-muted-foreground font-medium">Mo</span><span class="p-1.5 text-muted-foreground font-medium">Tu</span><span class="p-1.5 text-muted-foreground font-medium">We</span><span class="p-1.5 text-muted-foreground font-medium">Th</span><span class="p-1.5 text-muted-foreground font-medium">Fr</span><span class="p-1.5 text-muted-foreground font-medium">Sa</span>
  <span class="p-1.5 text-muted-foreground/30">29</span>
  <span class="p-1.5 text-muted-foreground/30">30</span>
  <span class="p-1.5 text-muted-foreground/30">31</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">1</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">2</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">3</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">4</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">5</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">6</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">7</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">8</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">9</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">10</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">11</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">12</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">13</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">14</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">15</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">16</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">17</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">18</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">19</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">20</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">21</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">22</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">23</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">24</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">25</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">26</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">27</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">28</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">29</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">30</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">31</span>
  <span class="p-1.5 text-muted-foreground/30">1</span>
  <span class="p-1.5 text-muted-foreground/30">2</span>
  <span class="p-1.5 text-muted-foreground/30">3</span>
  <span class="p-1.5 text-muted-foreground/30">4</span>
  <span class="p-1.5 text-muted-foreground/30">5</span>
  <span class="p-1.5 text-muted-foreground/30">6</span>
  <span class="p-1.5 text-muted-foreground/30">7</span>
  <span class="p-1.5 text-muted-foreground/30">8</span>
  </div>
</div>
    </div>
  </div>
  
  <div>
    <h4 class="text-sm font-medium mb-4 text-muted-foreground">Year Calendar - 3x4 Month View</h4>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="inline-block p-3 border border-border rounded-md bg-background shadow-sm select-none">
  <div class="flex justify-between items-center mb-4"><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">◀</button><div class="font-medium text-sm">Jan 2028</div><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">▶</button></div>
  <div class="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs">
  <span class="p-1.5 text-muted-foreground font-medium">Su</span><span class="p-1.5 text-muted-foreground font-medium">Mo</span><span class="p-1.5 text-muted-foreground font-medium">Tu</span><span class="p-1.5 text-muted-foreground font-medium">We</span><span class="p-1.5 text-muted-foreground font-medium">Th</span><span class="p-1.5 text-muted-foreground font-medium">Fr</span><span class="p-1.5 text-muted-foreground font-medium">Sa</span>
  <span class="p-1.5 text-muted-foreground/30">26</span>
  <span class="p-1.5 text-muted-foreground/30">27</span>
  <span class="p-1.5 text-muted-foreground/30">28</span>
  <span class="p-1.5 text-muted-foreground/30">29</span>
  <span class="p-1.5 text-muted-foreground/30">30</span>
  <span class="p-1.5 text-muted-foreground/30">31</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">1</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">2</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">3</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">4</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">5</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">6</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">7</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">8</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">9</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">10</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">11</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">12</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">13</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">14</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">15</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">16</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">17</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">18</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">19</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">20</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">21</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">22</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">23</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">24</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">25</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">26</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">27</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">28</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">29</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">30</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">31</span>
  <span class="p-1.5 text-muted-foreground/30">1</span>
  <span class="p-1.5 text-muted-foreground/30">2</span>
  <span class="p-1.5 text-muted-foreground/30">3</span>
  <span class="p-1.5 text-muted-foreground/30">4</span>
  <span class="p-1.5 text-muted-foreground/30">5</span>
  </div>
</div>
        <div class="inline-block p-3 border border-border rounded-md bg-background shadow-sm select-none">
  <div class="flex justify-between items-center mb-4"><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">◀</button><div class="font-medium text-sm">Feb 2028</div><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">▶</button></div>
  <div class="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs">
  <span class="p-1.5 text-muted-foreground font-medium">Su</span><span class="p-1.5 text-muted-foreground font-medium">Mo</span><span class="p-1.5 text-muted-foreground font-medium">Tu</span><span class="p-1.5 text-muted-foreground font-medium">We</span><span class="p-1.5 text-muted-foreground font-medium">Th</span><span class="p-1.5 text-muted-foreground font-medium">Fr</span><span class="p-1.5 text-muted-foreground font-medium">Sa</span>
  <span class="p-1.5 text-muted-foreground/30">30</span>
  <span class="p-1.5 text-muted-foreground/30">31</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">1</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">2</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">3</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">4</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">5</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">6</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">7</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">8</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">9</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">10</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">11</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">12</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">13</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">14</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">15</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">16</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">17</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">18</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">19</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">20</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">21</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">22</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">23</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">24</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">25</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">26</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">27</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">28</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">29</span>
  <span class="p-1.5 text-muted-foreground/30">1</span>
  <span class="p-1.5 text-muted-foreground/30">2</span>
  <span class="p-1.5 text-muted-foreground/30">3</span>
  <span class="p-1.5 text-muted-foreground/30">4</span>
  <span class="p-1.5 text-muted-foreground/30">5</span>
  <span class="p-1.5 text-muted-foreground/30">6</span>
  <span class="p-1.5 text-muted-foreground/30">7</span>
  <span class="p-1.5 text-muted-foreground/30">8</span>
  <span class="p-1.5 text-muted-foreground/30">9</span>
  <span class="p-1.5 text-muted-foreground/30">10</span>
  <span class="p-1.5 text-muted-foreground/30">11</span>
  </div>
</div>
        <div class="inline-block p-3 border border-border rounded-md bg-background shadow-sm select-none">
  <div class="flex justify-between items-center mb-4"><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">◀</button><div class="font-medium text-sm">Mar 2028</div><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">▶</button></div>
  <div class="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs">
  <span class="p-1.5 text-muted-foreground font-medium">Su</span><span class="p-1.5 text-muted-foreground font-medium">Mo</span><span class="p-1.5 text-muted-foreground font-medium">Tu</span><span class="p-1.5 text-muted-foreground font-medium">We</span><span class="p-1.5 text-muted-foreground font-medium">Th</span><span class="p-1.5 text-muted-foreground font-medium">Fr</span><span class="p-1.5 text-muted-foreground font-medium">Sa</span>
  <span class="p-1.5 text-muted-foreground/30">29</span>
  <span class="p-1.5 text-muted-foreground/30">30</span>
  <span class="p-1.5 text-muted-foreground/30">31</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">1</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">2</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">3</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">4</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">5</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">6</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">7</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">8</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">9</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">10</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">11</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">12</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">13</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">14</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">15</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">16</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">17</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">18</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">19</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">20</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">21</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">22</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">23</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">24</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">25</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">26</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">27</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">28</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">29</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">30</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">31</span>
  <span class="p-1.5 text-muted-foreground/30">1</span>
  <span class="p-1.5 text-muted-foreground/30">2</span>
  <span class="p-1.5 text-muted-foreground/30">3</span>
  <span class="p-1.5 text-muted-foreground/30">4</span>
  <span class="p-1.5 text-muted-foreground/30">5</span>
  <span class="p-1.5 text-muted-foreground/30">6</span>
  <span class="p-1.5 text-muted-foreground/30">7</span>
  <span class="p-1.5 text-muted-foreground/30">8</span>
  </div>
</div>
        <div class="inline-block p-3 border border-border rounded-md bg-background shadow-sm select-none">
  <div class="flex justify-between items-center mb-4"><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">◀</button><div class="font-medium text-sm">Apr 2028</div><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">▶</button></div>
  <div class="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs">
  <span class="p-1.5 text-muted-foreground font-medium">Su</span><span class="p-1.5 text-muted-foreground font-medium">Mo</span><span class="p-1.5 text-muted-foreground font-medium">Tu</span><span class="p-1.5 text-muted-foreground font-medium">We</span><span class="p-1.5 text-muted-foreground font-medium">Th</span><span class="p-1.5 text-muted-foreground font-medium">Fr</span><span class="p-1.5 text-muted-foreground font-medium">Sa</span>
  <span class="p-1.5 text-muted-foreground/30">26</span>
  <span class="p-1.5 text-muted-foreground/30">27</span>
  <span class="p-1.5 text-muted-foreground/30">28</span>
  <span class="p-1.5 text-muted-foreground/30">29</span>
  <span class="p-1.5 text-muted-foreground/30">30</span>
  <span class="p-1.5 text-muted-foreground/30">31</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">1</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">2</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">3</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">4</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">5</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">6</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">7</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">8</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">9</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">10</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">11</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">12</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">13</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">14</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">15</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">16</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">17</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">18</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">19</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">20</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">21</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">22</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">23</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">24</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">25</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">26</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">27</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">28</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">29</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">30</span>
  <span class="p-1.5 text-muted-foreground/30">1</span>
  <span class="p-1.5 text-muted-foreground/30">2</span>
  <span class="p-1.5 text-muted-foreground/30">3</span>
  <span class="p-1.5 text-muted-foreground/30">4</span>
  <span class="p-1.5 text-muted-foreground/30">5</span>
  <span class="p-1.5 text-muted-foreground/30">6</span>
  </div>
</div>
        <div class="inline-block p-3 border border-border rounded-md bg-background shadow-sm select-none">
  <div class="flex justify-between items-center mb-4"><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">◀</button><div class="font-medium text-sm">May 2028</div><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">▶</button></div>
  <div class="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs">
  <span class="p-1.5 text-muted-foreground font-medium">Su</span><span class="p-1.5 text-muted-foreground font-medium">Mo</span><span class="p-1.5 text-muted-foreground font-medium">Tu</span><span class="p-1.5 text-muted-foreground font-medium">We</span><span class="p-1.5 text-muted-foreground font-medium">Th</span><span class="p-1.5 text-muted-foreground font-medium">Fr</span><span class="p-1.5 text-muted-foreground font-medium">Sa</span>
  <span class="p-1.5 text-muted-foreground/30">31</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">1</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">2</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">3</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">4</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">5</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">6</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">7</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">8</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">9</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">10</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">11</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">12</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">13</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">14</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">15</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">16</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">17</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">18</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">19</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">20</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">21</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">22</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">23</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">24</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">25</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">26</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">27</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">28</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">29</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">30</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">31</span>
  <span class="p-1.5 text-muted-foreground/30">1</span>
  <span class="p-1.5 text-muted-foreground/30">2</span>
  <span class="p-1.5 text-muted-foreground/30">3</span>
  <span class="p-1.5 text-muted-foreground/30">4</span>
  <span class="p-1.5 text-muted-foreground/30">5</span>
  <span class="p-1.5 text-muted-foreground/30">6</span>
  <span class="p-1.5 text-muted-foreground/30">7</span>
  <span class="p-1.5 text-muted-foreground/30">8</span>
  <span class="p-1.5 text-muted-foreground/30">9</span>
  <span class="p-1.5 text-muted-foreground/30">10</span>
  </div>
</div>
        <div class="inline-block p-3 border border-border rounded-md bg-background shadow-sm select-none">
  <div class="flex justify-between items-center mb-4"><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">◀</button><div class="font-medium text-sm">Jun 2028</div><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">▶</button></div>
  <div class="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs">
  <span class="p-1.5 text-muted-foreground font-medium">Su</span><span class="p-1.5 text-muted-foreground font-medium">Mo</span><span class="p-1.5 text-muted-foreground font-medium">Tu</span><span class="p-1.5 text-muted-foreground font-medium">We</span><span class="p-1.5 text-muted-foreground font-medium">Th</span><span class="p-1.5 text-muted-foreground font-medium">Fr</span><span class="p-1.5 text-muted-foreground font-medium">Sa</span>
  <span class="p-1.5 text-muted-foreground/30">28</span>
  <span class="p-1.5 text-muted-foreground/30">29</span>
  <span class="p-1.5 text-muted-foreground/30">30</span>
  <span class="p-1.5 text-muted-foreground/30">31</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">1</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">2</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">3</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">4</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">5</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">6</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">7</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">8</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">9</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">10</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">11</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">12</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">13</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">14</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">15</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">16</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">17</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">18</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">19</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">20</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">21</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">22</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">23</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">24</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">25</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">26</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">27</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">28</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">29</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">30</span>
  <span class="p-1.5 text-muted-foreground/30">1</span>
  <span class="p-1.5 text-muted-foreground/30">2</span>
  <span class="p-1.5 text-muted-foreground/30">3</span>
  <span class="p-1.5 text-muted-foreground/30">4</span>
  <span class="p-1.5 text-muted-foreground/30">5</span>
  <span class="p-1.5 text-muted-foreground/30">6</span>
  <span class="p-1.5 text-muted-foreground/30">7</span>
  <span class="p-1.5 text-muted-foreground/30">8</span>
  </div>
</div>
        <div class="inline-block p-3 border border-border rounded-md bg-background shadow-sm select-none">
  <div class="flex justify-between items-center mb-4"><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">◀</button><div class="font-medium text-sm">Jul 2028</div><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">▶</button></div>
  <div class="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs">
  <span class="p-1.5 text-muted-foreground font-medium">Su</span><span class="p-1.5 text-muted-foreground font-medium">Mo</span><span class="p-1.5 text-muted-foreground font-medium">Tu</span><span class="p-1.5 text-muted-foreground font-medium">We</span><span class="p-1.5 text-muted-foreground font-medium">Th</span><span class="p-1.5 text-muted-foreground font-medium">Fr</span><span class="p-1.5 text-muted-foreground font-medium">Sa</span>
  <span class="p-1.5 text-muted-foreground/30">26</span>
  <span class="p-1.5 text-muted-foreground/30">27</span>
  <span class="p-1.5 text-muted-foreground/30">28</span>
  <span class="p-1.5 text-muted-foreground/30">29</span>
  <span class="p-1.5 text-muted-foreground/30">30</span>
  <span class="p-1.5 text-muted-foreground/30">31</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">1</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">2</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">3</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">4</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">5</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">6</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">7</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">8</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">9</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">10</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">11</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">12</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">13</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">14</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">15</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">16</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">17</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">18</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">19</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">20</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">21</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">22</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">23</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">24</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">25</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">26</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">27</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">28</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">29</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">30</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">31</span>
  <span class="p-1.5 text-muted-foreground/30">1</span>
  <span class="p-1.5 text-muted-foreground/30">2</span>
  <span class="p-1.5 text-muted-foreground/30">3</span>
  <span class="p-1.5 text-muted-foreground/30">4</span>
  <span class="p-1.5 text-muted-foreground/30">5</span>
  </div>
</div>
        <div class="inline-block p-3 border border-border rounded-md bg-background shadow-sm select-none">
  <div class="flex justify-between items-center mb-4"><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">◀</button><div class="font-medium text-sm">Aug 2028</div><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">▶</button></div>
  <div class="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs">
  <span class="p-1.5 text-muted-foreground font-medium">Su</span><span class="p-1.5 text-muted-foreground font-medium">Mo</span><span class="p-1.5 text-muted-foreground font-medium">Tu</span><span class="p-1.5 text-muted-foreground font-medium">We</span><span class="p-1.5 text-muted-foreground font-medium">Th</span><span class="p-1.5 text-muted-foreground font-medium">Fr</span><span class="p-1.5 text-muted-foreground font-medium">Sa</span>
  <span class="p-1.5 text-muted-foreground/30">30</span>
  <span class="p-1.5 text-muted-foreground/30">31</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">1</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">2</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">3</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">4</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">5</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">6</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">7</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">8</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">9</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">10</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">11</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">12</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">13</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">14</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">15</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">16</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">17</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">18</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">19</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">20</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">21</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">22</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">23</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">24</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">25</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">26</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">27</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">28</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">29</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">30</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">31</span>
  <span class="p-1.5 text-muted-foreground/30">1</span>
  <span class="p-1.5 text-muted-foreground/30">2</span>
  <span class="p-1.5 text-muted-foreground/30">3</span>
  <span class="p-1.5 text-muted-foreground/30">4</span>
  <span class="p-1.5 text-muted-foreground/30">5</span>
  <span class="p-1.5 text-muted-foreground/30">6</span>
  <span class="p-1.5 text-muted-foreground/30">7</span>
  <span class="p-1.5 text-muted-foreground/30">8</span>
  <span class="p-1.5 text-muted-foreground/30">9</span>
  </div>
</div>
        <div class="inline-block p-3 border border-border rounded-md bg-background shadow-sm select-none">
  <div class="flex justify-between items-center mb-4"><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">◀</button><div class="font-medium text-sm">Sep 2028</div><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">▶</button></div>
  <div class="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs">
  <span class="p-1.5 text-muted-foreground font-medium">Su</span><span class="p-1.5 text-muted-foreground font-medium">Mo</span><span class="p-1.5 text-muted-foreground font-medium">Tu</span><span class="p-1.5 text-muted-foreground font-medium">We</span><span class="p-1.5 text-muted-foreground font-medium">Th</span><span class="p-1.5 text-muted-foreground font-medium">Fr</span><span class="p-1.5 text-muted-foreground font-medium">Sa</span>
  <span class="p-1.5 text-muted-foreground/30">27</span>
  <span class="p-1.5 text-muted-foreground/30">28</span>
  <span class="p-1.5 text-muted-foreground/30">29</span>
  <span class="p-1.5 text-muted-foreground/30">30</span>
  <span class="p-1.5 text-muted-foreground/30">31</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">1</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">2</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">3</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">4</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">5</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">6</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">7</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">8</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">9</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">10</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">11</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">12</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">13</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">14</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">15</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">16</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">17</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">18</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">19</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">20</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">21</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">22</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">23</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">24</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">25</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">26</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">27</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">28</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">29</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">30</span>
  <span class="p-1.5 text-muted-foreground/30">1</span>
  <span class="p-1.5 text-muted-foreground/30">2</span>
  <span class="p-1.5 text-muted-foreground/30">3</span>
  <span class="p-1.5 text-muted-foreground/30">4</span>
  <span class="p-1.5 text-muted-foreground/30">5</span>
  <span class="p-1.5 text-muted-foreground/30">6</span>
  <span class="p-1.5 text-muted-foreground/30">7</span>
  </div>
</div>
        <div class="inline-block p-3 border border-border rounded-md bg-background shadow-sm select-none">
  <div class="flex justify-between items-center mb-4"><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">◀</button><div class="font-medium text-sm">Oct 2028</div><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">▶</button></div>
  <div class="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs">
  <span class="p-1.5 text-muted-foreground font-medium">Su</span><span class="p-1.5 text-muted-foreground font-medium">Mo</span><span class="p-1.5 text-muted-foreground font-medium">Tu</span><span class="p-1.5 text-muted-foreground font-medium">We</span><span class="p-1.5 text-muted-foreground font-medium">Th</span><span class="p-1.5 text-muted-foreground font-medium">Fr</span><span class="p-1.5 text-muted-foreground font-medium">Sa</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">1</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">2</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">3</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">4</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">5</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">6</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">7</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">8</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">9</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">10</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">11</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">12</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">13</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">14</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">15</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">16</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">17</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">18</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">19</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">20</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">21</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">22</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">23</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">24</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">25</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">26</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">27</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">28</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">29</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">30</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">31</span>
  <span class="p-1.5 text-muted-foreground/30">1</span>
  <span class="p-1.5 text-muted-foreground/30">2</span>
  <span class="p-1.5 text-muted-foreground/30">3</span>
  <span class="p-1.5 text-muted-foreground/30">4</span>
  <span class="p-1.5 text-muted-foreground/30">5</span>
  <span class="p-1.5 text-muted-foreground/30">6</span>
  <span class="p-1.5 text-muted-foreground/30">7</span>
  <span class="p-1.5 text-muted-foreground/30">8</span>
  <span class="p-1.5 text-muted-foreground/30">9</span>
  <span class="p-1.5 text-muted-foreground/30">10</span>
  <span class="p-1.5 text-muted-foreground/30">11</span>
  </div>
</div>
        <div class="inline-block p-3 border border-border rounded-md bg-background shadow-sm select-none">
  <div class="flex justify-between items-center mb-4"><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">◀</button><div class="font-medium text-sm">Nov 2028</div><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">▶</button></div>
  <div class="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs">
  <span class="p-1.5 text-muted-foreground font-medium">Su</span><span class="p-1.5 text-muted-foreground font-medium">Mo</span><span class="p-1.5 text-muted-foreground font-medium">Tu</span><span class="p-1.5 text-muted-foreground font-medium">We</span><span class="p-1.5 text-muted-foreground font-medium">Th</span><span class="p-1.5 text-muted-foreground font-medium">Fr</span><span class="p-1.5 text-muted-foreground font-medium">Sa</span>
  <span class="p-1.5 text-muted-foreground/30">29</span>
  <span class="p-1.5 text-muted-foreground/30">30</span>
  <span class="p-1.5 text-muted-foreground/30">31</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">1</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">2</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">3</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">4</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">5</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">6</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">7</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">8</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">9</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">10</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">11</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">12</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">13</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">14</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">15</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">16</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">17</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">18</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">19</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">20</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">21</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">22</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">23</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">24</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">25</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">26</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">27</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">28</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">29</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">30</span>
  <span class="p-1.5 text-muted-foreground/30">1</span>
  <span class="p-1.5 text-muted-foreground/30">2</span>
  <span class="p-1.5 text-muted-foreground/30">3</span>
  <span class="p-1.5 text-muted-foreground/30">4</span>
  <span class="p-1.5 text-muted-foreground/30">5</span>
  <span class="p-1.5 text-muted-foreground/30">6</span>
  <span class="p-1.5 text-muted-foreground/30">7</span>
  <span class="p-1.5 text-muted-foreground/30">8</span>
  <span class="p-1.5 text-muted-foreground/30">9</span>
  </div>
</div>
        <div class="inline-block p-3 border border-border rounded-md bg-background shadow-sm select-none">
  <div class="flex justify-between items-center mb-4"><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">◀</button><div class="font-medium text-sm">Dec 2028</div><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">▶</button></div>
  <div class="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs">
  <span class="p-1.5 text-muted-foreground font-medium">Su</span><span class="p-1.5 text-muted-foreground font-medium">Mo</span><span class="p-1.5 text-muted-foreground font-medium">Tu</span><span class="p-1.5 text-muted-foreground font-medium">We</span><span class="p-1.5 text-muted-foreground font-medium">Th</span><span class="p-1.5 text-muted-foreground font-medium">Fr</span><span class="p-1.5 text-muted-foreground font-medium">Sa</span>
  <span class="p-1.5 text-muted-foreground/30">27</span>
  <span class="p-1.5 text-muted-foreground/30">28</span>
  <span class="p-1.5 text-muted-foreground/30">29</span>
  <span class="p-1.5 text-muted-foreground/30">30</span>
  <span class="p-1.5 text-muted-foreground/30">31</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">1</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">2</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">3</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">4</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">5</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">6</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">7</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">8</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">9</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">10</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">11</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">12</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">13</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">14</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">15</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">16</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">17</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">18</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">19</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">20</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">21</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">22</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">23</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">24</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">25</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">26</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">27</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">28</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">29</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">30</span>
  <span class="p-1.5 rounded cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">31</span>
  <span class="p-1.5 text-muted-foreground/30">1</span>
  <span class="p-1.5 text-muted-foreground/30">2</span>
  <span class="p-1.5 text-muted-foreground/30">3</span>
  <span class="p-1.5 text-muted-foreground/30">4</span>
  <span class="p-1.5 text-muted-foreground/30">5</span>
  <span class="p-1.5 text-muted-foreground/30">6</span>
  </div>
</div>
    </div>
  </div>

</section>`,

"card": `<section class="grid gap-6 md:grid-cols-2">
  <div class="rounded-xl border border-border bg-card shadow"><div class="flex flex-col space-y-1.5 p-6"><h3 class="font-semibold leading-none tracking-tight">Create project</h3><p class="text-sm text-muted-foreground">Deploy your new project in one-click.</p></div><div class="p-6 pt-0 space-y-4"><div class="space-y-2"><label class="text-sm font-medium">Name</label><input type="text" placeholder="Name of your project" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"/></div><div class="space-y-2"><label class="text-sm font-medium">Framework</label><select class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"><option>Next.js</option><option>SvelteKit</option><option>Astro</option></select></div></div><div class="flex items-center p-6 pt-0 gap-2"><button class="rounded-md text-sm font-medium border border-input bg-background shadow-sm hover:bg-accent h-9 px-4 py-2 w-full">Cancel</button><button class="rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full">Deploy</button></div></div>
  <div class="rounded-xl border border-border bg-card shadow"><div class="flex flex-col space-y-1.5 p-6"><h3 class="font-semibold leading-none tracking-tight">Notifications</h3><p class="text-sm text-muted-foreground">You have 3 unread messages.</p></div><div class="p-6 pt-0 space-y-4"><div class="flex items-center space-x-4 rounded-md border border-border p-4"><span class="flex h-2 w-2 rounded-full bg-blue-600"></span><div class="flex-1 space-y-1"><p class="text-sm font-medium">Push Notifications</p><p class="text-sm text-muted-foreground">Send to device.</p></div><label class="relative inline-flex items-center cursor-pointer"><input type="checkbox" checked class="sr-only peer"><div class="w-11 h-6 bg-input rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div></label></div>
  <div class="flex items-start space-x-4 rounded-md p-2"><span class="mt-0.5 flex h-2 w-2 rounded-full bg-blue-600"></span><div class="space-y-1"><p class="text-sm font-medium">Your call has been confirmed.</p><p class="text-sm text-muted-foreground">1 hour ago</p></div></div>
  <div class="flex items-start space-x-4 rounded-md p-2"><span class="mt-0.5 flex h-2 w-2 rounded-full bg-blue-600"></span><div class="space-y-1"><p class="text-sm font-medium">You have a new message!</p><p class="text-sm text-muted-foreground">2 hours ago</p></div></div></div></div>
</section>`,

"carousel": `<section class="max-w-lg"><div class="relative w-full overflow-hidden rounded-lg border border-border bg-muted">
  <div class="flex"><div class="w-full shrink-0 p-12 flex items-center justify-center text-muted-foreground">Slide 1 — Revenue Overview</div></div>
  <button class="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 border border-border p-2 rounded-full hover:bg-accent text-sm">◀</button>
  <button class="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 border border-border p-2 rounded-full hover:bg-accent text-sm">▶</button>
  <div class="flex justify-center gap-1 py-2"><span class="h-2 w-2 rounded-full bg-primary"></span><span class="h-2 w-2 rounded-full bg-muted-foreground/30"></span><span class="h-2 w-2 rounded-full bg-muted-foreground/30"></span></div>
</div></section>`,

"checkbox": `<section class="space-y-4 max-w-sm">
  <label class="flex items-center space-x-2 cursor-pointer"><input type="checkbox" checked class="h-4 w-4 rounded border border-primary accent-primary"/><span class="text-sm font-medium">Accept terms and conditions</span></label>
  <label class="flex items-start space-x-2 cursor-pointer"><input type="checkbox" class="mt-1 h-4 w-4 rounded border border-primary accent-primary"/><div><span class="text-sm font-medium">Use different settings for mobile</span><p class="text-sm text-muted-foreground">Manage mobile notifications in settings.</p></div></label>
  <label class="flex items-center space-x-2 cursor-not-allowed opacity-50"><input type="checkbox" disabled class="h-4 w-4 rounded border"/><span class="text-sm font-medium">Disabled</span></label>
</section>`,

"checkbox-group": `<section class="max-w-sm"><fieldset class="space-y-3"><legend class="text-sm font-semibold mb-2">Select toppings</legend>
  <label class="flex items-center space-x-2 cursor-pointer"><input type="checkbox" checked class="h-4 w-4 accent-primary"/><span class="text-sm">Cheese</span></label>
  <label class="flex items-center space-x-2 cursor-pointer"><input type="checkbox" class="h-4 w-4 accent-primary"/><span class="text-sm">Pepperoni</span></label>
  <label class="flex items-center space-x-2 cursor-pointer"><input type="checkbox" class="h-4 w-4 accent-primary"/><span class="text-sm">Mushrooms</span></label>
  <label class="flex items-center space-x-2 cursor-pointer"><input type="checkbox" class="h-4 w-4 accent-primary"/><span class="text-sm">Olives</span></label>
</fieldset></section>`,

"chip": `<section class="flex flex-wrap gap-2">
  <div class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-foreground border border-border">React <button onclick="this.parentElement.remove()" class="ml-2 hover:text-destructive">✕</button></div>
  <div class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-foreground border border-border">TypeScript <button onclick="this.parentElement.remove()" class="ml-2 hover:text-destructive">✕</button></div>
  <div class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">HTMX <button onclick="this.parentElement.remove()" class="ml-2 hover:text-destructive">✕</button></div>
  <div class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-foreground border border-border">Tailwind <button onclick="this.parentElement.remove()" class="ml-2 hover:text-destructive">✕</button></div>
</section>`,

"collapsible": `<section class="max-w-md"><details class="group border border-border rounded-md bg-background [&_summary::-webkit-details-marker]:hidden" open>
  <summary class="flex justify-between items-center p-4 font-medium cursor-pointer hover:bg-accent text-sm"><span>@peduarte starred 3 repositories</span><span class="transition group-open:rotate-180">▼</span></summary>
  <div class="px-4 pb-4 space-y-2">
    <div class="rounded-md border border-border px-4 py-3 text-sm">@radix-ui/primitives</div>
    <div class="rounded-md border border-border px-4 py-3 text-sm">@radix-ui/colors</div>
    <div class="rounded-md border border-border px-4 py-3 text-sm">@stitches/react</div>
  </div>
</details></section>`,

"color-picker": `<section class="flex items-center gap-4"><input type="color" value="#1e293b" class="h-10 w-10 cursor-pointer rounded-md border border-border bg-background p-1"/><span class="text-sm text-muted-foreground">#1e293b</span></section>`,

"combobox": `<section class="max-w-sm"><div class="relative"><input type="text" placeholder="Search framework..." class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"/><div class="absolute z-10 w-full mt-1 bg-background border border-border rounded-md shadow-md"><div class="p-1"><div class="px-2 py-1.5 text-sm hover:bg-accent rounded cursor-pointer">Next.js</div><div class="px-2 py-1.5 text-sm hover:bg-accent rounded cursor-pointer">SvelteKit</div><div class="px-2 py-1.5 text-sm hover:bg-accent rounded cursor-pointer">Nuxt.js</div><div class="px-2 py-1.5 text-sm hover:bg-accent rounded cursor-pointer">Remix</div></div></div></div></section>`,

"command": `<section class="max-w-md border border-border rounded-md shadow-md overflow-hidden"><input class="flex h-11 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground px-4 border-b border-border" placeholder="Type a command or search..."/><div class="p-2 space-y-1"><p class="px-2 py-1 text-xs text-muted-foreground font-medium">Suggestions</p><div class="px-2 py-1.5 text-sm hover:bg-accent rounded cursor-pointer flex items-center gap-2"><span>📅</span> Calendar</div><div class="px-2 py-1.5 text-sm hover:bg-accent rounded cursor-pointer flex items-center gap-2"><span>😊</span> Search Emoji</div><div class="px-2 py-1.5 text-sm hover:bg-accent rounded cursor-pointer flex items-center gap-2"><span>🧮</span> Calculator</div><p class="px-2 py-1 text-xs text-muted-foreground font-medium mt-2">Settings</p><div class="px-2 py-1.5 text-sm hover:bg-accent rounded cursor-pointer flex items-center gap-2"><span>👤</span> Profile</div><div class="px-2 py-1.5 text-sm hover:bg-accent rounded cursor-pointer flex items-center gap-2"><span>⚙️</span> Settings</div></div></section>`,

"container": `<section class="border-2 border-dashed border-border rounded-lg p-6 bg-muted/20 text-center"><p class="text-sm text-muted-foreground">This is a centered container with <code class="bg-muted px-1 py-0.5 rounded text-xs">max-w-7xl mx-auto px-4</code></p></section>`,

"context-menu": `<section class="flex justify-center"><div class="flex h-32 w-64 items-center justify-center rounded-md border-2 border-dashed border-border text-sm text-muted-foreground select-none" oncontextmenu="event.preventDefault(); let m=document.getElementById('ctx-demo'); m.style.display='block'; m.style.left=event.offsetX+'px'; m.style.top=event.offsetY+'px'" onclick="document.getElementById('ctx-demo').style.display='none'" style="position:relative">Right click here
  <div id="ctx-demo" class="absolute z-50 bg-popover border border-border shadow-md rounded-md p-1 min-w-[8rem] text-sm" style="display:none"><div class="px-2 py-1.5 hover:bg-accent rounded cursor-pointer">Back</div><div class="px-2 py-1.5 hover:bg-accent rounded cursor-pointer">Forward</div><div class="px-2 py-1.5 hover:bg-accent rounded cursor-pointer">Reload</div><div class="h-px bg-border my-1"></div><div class="px-2 py-1.5 hover:bg-accent rounded cursor-pointer">View Source</div><div class="px-2 py-1.5 hover:bg-accent rounded cursor-pointer">Inspect</div></div>
</div></section>`,

"data-table": `<section class="rounded-md border border-border overflow-auto"><table class="w-full text-sm"><thead class="bg-muted/50"><tr><th class="h-10 px-4 text-left font-medium text-muted-foreground"><input type="checkbox" class="accent-primary"/></th><th class="h-10 px-4 text-left font-medium text-muted-foreground">Status</th><th class="h-10 px-4 text-left font-medium text-muted-foreground">Email</th><th class="h-10 px-4 text-right font-medium text-muted-foreground">Amount</th></tr></thead><tbody>
  <tr class="border-t hover:bg-muted/50"><td class="p-4"><input type="checkbox" class="accent-primary"/></td><td class="p-4"><span class="rounded-full border px-2 py-0.5 text-xs font-semibold bg-green-500/10 text-green-600 border-green-500/20">Success</span></td><td class="p-4 text-muted-foreground">ken99@yahoo.com</td><td class="p-4 text-right font-medium">$316.00</td></tr>
  <tr class="border-t hover:bg-muted/50"><td class="p-4"><input type="checkbox" class="accent-primary"/></td><td class="p-4"><span class="rounded-full border px-2 py-0.5 text-xs font-semibold bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Processing</span></td><td class="p-4 text-muted-foreground">abe45@gmail.com</td><td class="p-4 text-right font-medium">$242.00</td></tr>
  <tr class="border-t hover:bg-muted/50"><td class="p-4"><input type="checkbox" class="accent-primary"/></td><td class="p-4"><span class="rounded-full border px-2 py-0.5 text-xs font-semibold bg-red-500/10 text-red-600 border-red-500/20">Failed</span></td><td class="p-4 text-muted-foreground">carmella@hotmail.com</td><td class="p-4 text-right font-medium">$721.00</td></tr>
</tbody></table></section>`,

"date-picker": `<section class="max-w-xs"><label class="text-sm font-medium block mb-2">Pick a date</label><input type="date" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"/></section>`,

"dialog": `<section class="flex justify-center">
  <button onclick="document.getElementById('dlg-demo').showModal()" class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">Edit Profile</button>
  <dialog id="dlg-demo" class="backdrop:bg-black/80 rounded-lg border border-border bg-background p-0 shadow-lg max-w-md w-full">
    <div class="p-6 space-y-4">
      <div><h2 class="text-lg font-semibold">Edit profile</h2><p class="text-sm text-muted-foreground">Make changes to your profile here. Click save when you're done.</p></div>
      <div class="space-y-2"><label class="text-sm font-medium">Name</label><input value="Pedro Duarte" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"/></div>
      <div class="space-y-2"><label class="text-sm font-medium">Username</label><input value="@peduarte" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"/></div>
      <div class="flex justify-end"><button onclick="this.closest('dialog').close()" class="rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">Save changes</button></div>
    </div>
  </dialog>
</section>`,

"divider": `<section class="space-y-4 max-w-md"><p class="text-sm">Content above the divider</p><div class="w-full h-px bg-border"></div><p class="text-sm">Content below the divider</p></section>`,

"drawer": `<section class="flex justify-center">
  <button onclick="document.getElementById('drawer-demo').style.display='flex'" class="rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">Open Drawer</button>
  <div id="drawer-demo" class="fixed inset-0 z-50 bg-black/80 hidden justify-end" style="display:none" onclick="if(event.target===this)this.style.display='none'">
    <div class="h-full w-80 border-l border-border bg-background p-6 shadow-lg"><div class="flex justify-between items-center mb-4"><h2 class="text-lg font-semibold">Move Goal</h2><button onclick="this.closest('#drawer-demo').style.display='none'" class="text-muted-foreground hover:text-foreground">✕</button></div><p class="text-sm text-muted-foreground mb-4">Set your daily activity goal.</p><div class="flex items-center gap-4"><button class="border rounded-full h-8 w-8 text-sm hover:bg-accent">-</button><span class="text-3xl font-bold">350</span><button class="border rounded-full h-8 w-8 text-sm hover:bg-accent">+</button></div><p class="text-xs text-muted-foreground mt-2">Calories/day</p><button onclick="this.closest('#drawer-demo').style.display='none'" class="mt-6 w-full rounded-md text-sm font-medium bg-primary text-primary-foreground shadow h-9 px-4 py-2">Submit</button></div>
  </div>
</section>`,

"dropdown-menu": `<section class="flex justify-center"><details class="relative inline-block [&_summary::-webkit-details-marker]:hidden">
  <summary class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent cursor-pointer list-none">Open Menu ▼</summary>
  <div class="absolute left-0 z-50 mt-2 w-56 rounded-md border border-border bg-popover p-1 shadow-md">
    <div class="px-2 py-1.5 text-sm font-semibold">My Account</div><div class="h-px bg-border my-1"></div>
    <div class="px-2 py-1.5 text-sm hover:bg-accent rounded cursor-pointer flex justify-between">Profile <kbd class="text-xs text-muted-foreground">⇧⌘P</kbd></div>
    <div class="px-2 py-1.5 text-sm hover:bg-accent rounded cursor-pointer flex justify-between">Billing <kbd class="text-xs text-muted-foreground">⌘B</kbd></div>
    <div class="px-2 py-1.5 text-sm hover:bg-accent rounded cursor-pointer flex justify-between">Settings <kbd class="text-xs text-muted-foreground">⌘S</kbd></div>
    <div class="h-px bg-border my-1"></div>
    <div class="px-2 py-1.5 text-sm hover:bg-accent rounded cursor-pointer text-destructive">Log out</div>
  </div>
</details></section>`,

"empty-state": `<section class="max-w-md"><div class="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-border rounded-lg bg-muted/20"><span class="text-4xl mb-4">📭</span><h3 class="text-lg font-semibold">No results found</h3><p class="text-sm text-muted-foreground mb-4">Try adjusting your search or filter to find what you're looking for.</p><button class="rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">Clear filters</button></div></section>`,

"error-message": `<section class="max-w-sm space-y-4"><div class="space-y-2"><label class="text-sm font-medium">Email</label><input type="email" value="invalid-email" class="flex h-10 w-full rounded-md border border-destructive bg-background px-3 py-2 text-sm"/><p class="text-sm font-medium text-destructive mt-1">Please enter a valid email address.</p></div></section>`,

"file-upload": `<section class="max-w-md"><div class="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"><span class="text-3xl mb-2">☁️</span><p class="text-sm text-muted-foreground"><span class="font-semibold text-foreground">Click to upload</span> or drag and drop</p><p class="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (MAX. 800x400px)</p><input type="file" class="hidden"/></div></section>`,

"form": `<section class="max-w-sm space-y-4"><div class="space-y-2"><label class="text-sm font-medium">Username</label><input placeholder="shadcn" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"/><p class="text-sm text-muted-foreground">This is your public display name.</p></div><div class="space-y-2"><label class="text-sm font-medium">Email</label><input type="email" placeholder="m@example.com" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"/></div><button class="w-full rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">Submit</button></section>`,

"hover-card": `<section class="flex justify-center py-4"><div class="group relative inline-block"><span class="cursor-pointer underline decoration-dotted text-sm font-medium text-primary">@nextjs</span><div class="absolute bottom-full left-1/2 z-50 mb-2 hidden w-72 -translate-x-1/2 rounded-md border border-border bg-popover p-4 shadow-md group-hover:block"><div class="flex items-center gap-3 mb-2"><span class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">N</span><div><p class="text-sm font-semibold">@nextjs</p><p class="text-xs text-muted-foreground">The React Framework</p></div></div><p class="text-xs text-muted-foreground">Created by @vercel. 120k+ followers.</p></div></div></section>`,

"icon": `<section class="flex flex-wrap gap-4"><svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg><svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg><svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg><svg class="h-6 w-6 text-destructive" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg><svg class="h-6 w-6 text-yellow-500" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></section>`,

"image": `<section class="max-w-xs"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect fill='%23e2e8f0' width='300' height='200'/%3E%3Ctext x='50%25' y='50%25' fill='%2364748b' font-family='sans-serif' font-size='16' text-anchor='middle' dy='.3em'%3E300 × 200%3C/text%3E%3C/svg%3E" alt="Placeholder" class="rounded-md object-cover border border-border transition-all hover:scale-105"/></section>`,

"indicator": `<section class="flex items-center gap-6"><div class="relative"><span class="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm">🔔</span><span class="absolute -top-1 -right-1 flex h-4 w-4"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span><span class="relative inline-flex rounded-full h-4 w-4 bg-destructive text-[10px] text-white items-center justify-center">3</span></span></div><div class="relative"><span class="flex h-3 w-3 rounded-full bg-green-500"></span></div><div class="relative"><span class="flex h-3 w-3 rounded-full bg-yellow-500"></span></div><div class="relative"><span class="flex h-3 w-3 rounded-full bg-red-500"></span></div></section>`,

"input": `<section class="space-y-4 max-w-md">
  <div class="space-y-2"><label class="text-sm font-medium">Default</label><input type="text" placeholder="Email address" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"/></div>
  <div class="space-y-2"><label class="text-sm font-medium">Disabled</label><input disabled placeholder="Disabled" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm opacity-50 cursor-not-allowed"/></div>
  <div class="space-y-2"><label class="text-sm font-medium">With description</label><input type="email" placeholder="Email" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"/><p class="text-sm text-muted-foreground">Enter your email address.</p></div>
  <div class="space-y-2"><label class="text-sm font-medium">File Input</label><input type="file" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium"/></div>
</section>`,

"input-otp": `<section class="flex justify-center gap-2"><input type="text" maxlength="1" value="4" class="w-10 h-12 text-center text-lg font-semibold border border-input bg-background rounded-md shadow-sm focus:ring-2 focus:ring-ring"/><input type="text" maxlength="1" value="9" class="w-10 h-12 text-center text-lg font-semibold border border-input bg-background rounded-md shadow-sm focus:ring-2 focus:ring-ring"/><input type="text" maxlength="1" value="1" class="w-10 h-12 text-center text-lg font-semibold border border-input bg-background rounded-md shadow-sm focus:ring-2 focus:ring-ring"/><span class="flex items-center text-muted-foreground text-lg">-</span><input type="text" maxlength="1" value="7" class="w-10 h-12 text-center text-lg font-semibold border border-input bg-background rounded-md shadow-sm focus:ring-2 focus:ring-ring"/><input type="text" maxlength="1" value="2" class="w-10 h-12 text-center text-lg font-semibold border border-input bg-background rounded-md shadow-sm focus:ring-2 focus:ring-ring"/><input type="text" maxlength="1" class="w-10 h-12 text-center text-lg font-semibold border border-input bg-background rounded-md shadow-sm focus:ring-2 focus:ring-ring"/></section>`,

"kbd": `<section class="flex flex-wrap gap-3"><kbd class="pointer-events-none inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">⌘</kbd><kbd class="pointer-events-none inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">K</kbd><span class="text-sm text-muted-foreground mx-2">or</span><kbd class="pointer-events-none inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">Ctrl</kbd><kbd class="pointer-events-none inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">K</kbd></section>`,

"label": `<section class="max-w-sm space-y-4"><div class="flex items-center space-x-2"><input type="checkbox" id="terms-demo" class="h-4 w-4 accent-primary"/><label for="terms-demo" class="text-sm font-medium leading-none">Accept terms and conditions</label></div></section>`,

"link": `<section class="flex flex-wrap gap-4"><a href="#" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 text-sm">Default Link</a><a href="#" class="font-medium text-muted-foreground hover:text-foreground text-sm transition-colors">Subtle Link</a><a href="#" class="font-medium text-destructive underline underline-offset-4 hover:text-destructive/80 text-sm">Danger Link</a></section>`,

"list": `<section class="max-w-sm"><ul class="my-2 ml-6 list-disc [&>li]:mt-2 text-sm"><li>First item in the list</li><li>Second item with more detail</li><li>Third item<ul class="ml-6 list-disc [&>li]:mt-1 text-muted-foreground"><li>Nested item A</li><li>Nested item B</li></ul></li><li>Fourth item</li></ul></section>`,

"list-item": `<section class="max-w-sm space-y-2"><div class="flex items-center gap-3 p-3 rounded-md border border-border hover:bg-accent/50 transition-colors cursor-pointer"><span class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">📄</span><div><p class="text-sm font-medium">Document.pdf</p><p class="text-xs text-muted-foreground">2.4 MB</p></div></div><div class="flex items-center gap-3 p-3 rounded-md border border-border hover:bg-accent/50 transition-colors cursor-pointer"><span class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 text-sm">🖼️</span><div><p class="text-sm font-medium">Photo.jpg</p><p class="text-xs text-muted-foreground">1.2 MB</p></div></div></section>`,

"loading-spinner": `<section class="flex items-center gap-6"><svg class="animate-spin h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><svg class="animate-spin h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><div class="flex items-center gap-2 text-sm text-muted-foreground"><svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Loading...</div></section>`,

"masonry-grid": `<section><div class="columns-2 gap-4 space-y-4"><div class="break-inside-avoid rounded-lg border border-border bg-muted/30 p-4 h-32 flex items-center justify-center text-sm text-muted-foreground">Card 1</div><div class="break-inside-avoid rounded-lg border border-border bg-muted/30 p-4 h-48 flex items-center justify-center text-sm text-muted-foreground">Card 2 (Tall)</div><div class="break-inside-avoid rounded-lg border border-border bg-muted/30 p-4 h-24 flex items-center justify-center text-sm text-muted-foreground">Card 3</div><div class="break-inside-avoid rounded-lg border border-border bg-muted/30 p-4 h-40 flex items-center justify-center text-sm text-muted-foreground">Card 4</div><div class="break-inside-avoid rounded-lg border border-border bg-muted/30 p-4 h-28 flex items-center justify-center text-sm text-muted-foreground">Card 5</div></div></section>`,

"menubar": `<section><div class="flex h-10 items-center space-x-1 rounded-md border border-border bg-background p-1 w-max">
  <details class="relative [&_summary::-webkit-details-marker]:hidden"><summary class="px-3 py-1 text-sm font-medium hover:bg-accent rounded cursor-pointer list-none">File</summary><div class="absolute left-0 z-50 mt-1 w-48 rounded-md border border-border bg-popover p-1 shadow-md"><div class="px-2 py-1.5 text-sm hover:bg-accent rounded cursor-pointer">New Tab</div><div class="px-2 py-1.5 text-sm hover:bg-accent rounded cursor-pointer">New Window</div><div class="h-px bg-border my-1"></div><div class="px-2 py-1.5 text-sm hover:bg-accent rounded cursor-pointer">Print</div></div></details>
  <details class="relative [&_summary::-webkit-details-marker]:hidden"><summary class="px-3 py-1 text-sm font-medium hover:bg-accent rounded cursor-pointer list-none">Edit</summary><div class="absolute left-0 z-50 mt-1 w-48 rounded-md border border-border bg-popover p-1 shadow-md"><div class="px-2 py-1.5 text-sm hover:bg-accent rounded cursor-pointer">Undo</div><div class="px-2 py-1.5 text-sm hover:bg-accent rounded cursor-pointer">Redo</div><div class="h-px bg-border my-1"></div><div class="px-2 py-1.5 text-sm hover:bg-accent rounded cursor-pointer">Cut</div><div class="px-2 py-1.5 text-sm hover:bg-accent rounded cursor-pointer">Copy</div><div class="px-2 py-1.5 text-sm hover:bg-accent rounded cursor-pointer">Paste</div></div></details>
  <details class="relative [&_summary::-webkit-details-marker]:hidden"><summary class="px-3 py-1 text-sm font-medium hover:bg-accent rounded cursor-pointer list-none">View</summary><div class="absolute left-0 z-50 mt-1 w-48 rounded-md border border-border bg-popover p-1 shadow-md"><div class="px-2 py-1.5 text-sm hover:bg-accent rounded cursor-pointer">Zoom In</div><div class="px-2 py-1.5 text-sm hover:bg-accent rounded cursor-pointer">Zoom Out</div></div></details>
</div></section>`,

"message-bubble": `<section class="max-w-sm space-y-3"><div class="flex max-w-[75%] rounded-lg px-3 py-2 text-sm bg-muted">Hey, how are you?</div><div class="flex max-w-[75%] ml-auto rounded-lg px-3 py-2 text-sm bg-primary text-primary-foreground">I'm good! Working on HTMXUI 🚀</div><div class="flex max-w-[75%] rounded-lg px-3 py-2 text-sm bg-muted">That sounds amazing!</div><div class="flex max-w-[75%] ml-auto rounded-lg px-3 py-2 text-sm bg-primary text-primary-foreground">Thanks! It's 100 components, zero JS frameworks.</div></section>`,

"navigation-menu": `<section><nav class="flex items-center gap-6 text-sm"><a href="#" class="font-medium text-foreground transition-colors">Getting Started</a><a href="#" class="font-medium text-muted-foreground hover:text-foreground transition-colors">Components</a><a href="#" class="font-medium text-muted-foreground hover:text-foreground transition-colors">Documentation</a><a href="#" class="font-medium text-muted-foreground hover:text-foreground transition-colors">Blog</a></nav></section>`,

"notification": `<section class="max-w-sm"><div class="flex flex-col gap-2 rounded-lg border border-border bg-background p-4 shadow-lg"><div class="flex items-start gap-4"><div class="flex-1"><h3 class="text-sm font-semibold">New Message</h3><p class="text-sm text-muted-foreground">You have a new message from Sofia Davis.</p><p class="text-xs text-muted-foreground mt-1">2 minutes ago</p></div><button onclick="this.closest('.flex.flex-col').style.opacity='0'" class="text-muted-foreground hover:text-foreground text-xs">✕</button></div></div></section>`,

"number-input": `<section class="max-w-xs"><label class="text-sm font-medium block mb-2">Quantity</label><input type="number" value="3" min="0" max="99" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"/></section>`,

"page-header": `<section><header class="flex flex-col gap-1 border-b border-border pb-4"><h1 class="text-2xl font-bold tracking-tight">Dashboard</h1><p class="text-muted-foreground">Manage your application settings and preferences.</p></header></section>`,

"pagination": `<section><nav class="flex justify-center"><ul class="flex items-center gap-1"><li><button class="h-9 px-3 rounded-md border border-input bg-background text-sm hover:bg-accent">← Previous</button></li><li><button class="h-9 w-9 rounded-md border border-input bg-primary text-primary-foreground text-sm">1</button></li><li><button class="h-9 w-9 rounded-md border border-input bg-background text-sm hover:bg-accent">2</button></li><li><button class="h-9 w-9 rounded-md border border-input bg-background text-sm hover:bg-accent">3</button></li><li><span class="h-9 w-9 flex items-center justify-center text-sm">…</span></li><li><button class="h-9 w-9 rounded-md border border-input bg-background text-sm hover:bg-accent">10</button></li><li><button class="h-9 px-3 rounded-md border border-input bg-background text-sm hover:bg-accent">Next →</button></li></ul></nav></section>`,

"panel": `<section class="max-w-md"><div class="rounded-lg border border-border bg-card shadow-sm p-6"><h3 class="text-sm font-semibold mb-2">Panel Title</h3><p class="text-sm text-muted-foreground">This is a simple panel container for grouping related content together.</p></div></section>`,

"password-input": `<section class="max-w-sm"><label class="text-sm font-medium block mb-2">Password</label><div class="relative"><input type="password" value="mysecretpassword" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm pr-10"/><button class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg></button></div></section>`,

"pin-input": `<section class="flex items-center gap-2 justify-center"><input type="text" maxlength="1" value="1" class="w-10 h-12 text-center text-lg font-semibold border border-input bg-background rounded-md shadow-sm"/><input type="text" maxlength="1" value="2" class="w-10 h-12 text-center text-lg font-semibold border border-input bg-background rounded-md shadow-sm"/><input type="text" maxlength="1" value="3" class="w-10 h-12 text-center text-lg font-semibold border border-input bg-background rounded-md shadow-sm"/><span class="text-muted-foreground text-lg">-</span><input type="text" maxlength="1" value="4" class="w-10 h-12 text-center text-lg font-semibold border border-input bg-background rounded-md shadow-sm"/><input type="text" maxlength="1" value="5" class="w-10 h-12 text-center text-lg font-semibold border border-input bg-background rounded-md shadow-sm"/><input type="text" maxlength="1" class="w-10 h-12 text-center text-lg font-semibold border border-input bg-background rounded-md shadow-sm"/></section>`,

"popover": `<section class="flex justify-center py-4"><details class="relative inline-block [&_summary::-webkit-details-marker]:hidden"><summary class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent cursor-pointer list-none">Open Popover</summary><div class="absolute left-1/2 z-50 mt-2 w-72 -translate-x-1/2 rounded-md border border-border bg-popover p-4 shadow-md"><div class="space-y-2"><h4 class="font-medium leading-none text-sm">Dimensions</h4><p class="text-sm text-muted-foreground">Set the dimensions for the layer.</p></div><div class="grid gap-2 mt-3"><div class="grid grid-cols-3 items-center gap-4"><label class="text-sm">Width</label><input value="100%" class="col-span-2 h-8 rounded-md border border-input bg-background px-2 text-sm"/></div><div class="grid grid-cols-3 items-center gap-4"><label class="text-sm">Height</label><input value="25px" class="col-span-2 h-8 rounded-md border border-input bg-background px-2 text-sm"/></div></div></div></details></section>`,

"profile-badge": `<section class="flex gap-3"><div class="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 bg-background hover:bg-muted transition-colors cursor-pointer"><span class="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">DK</span><span class="text-sm font-medium">David K.</span></div><div class="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 bg-background hover:bg-muted transition-colors cursor-pointer"><span class="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold">JD</span><span class="text-sm font-medium">Jane D.</span></div></section>`,

"progress": `<section class="space-y-6 max-w-lg"><div class="space-y-2"><p class="text-sm font-medium">60%</p><div class="w-full bg-secondary rounded-full h-2"><div class="bg-primary h-2 rounded-full" style="width:60%"></div></div></div><div class="space-y-2"><p class="text-sm font-medium">100% Complete</p><div class="w-full bg-secondary rounded-full h-2"><div class="bg-green-500 h-2 rounded-full" style="width:100%"></div></div></div><div class="space-y-2"><p class="text-sm font-medium">15% Critical</p><div class="w-full bg-secondary rounded-full h-2"><div class="bg-destructive h-2 rounded-full" style="width:15%"></div></div></div></section>`,

"progress-bar": `<section class="space-y-4 max-w-lg"><div class="flex justify-between text-sm"><span>Upload Progress</span><span class="font-medium">73%</span></div><div class="w-full bg-secondary rounded-full h-3"><div class="bg-primary h-3 rounded-full" style="width:73%"></div></div></section>`,

"pulse": `<section class="flex items-center gap-6"><span class="relative flex h-4 w-4"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span><span class="relative inline-flex rounded-full h-4 w-4 bg-primary"></span></span><span class="relative flex h-4 w-4"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span><span class="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span></span><span class="relative flex h-4 w-4"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span><span class="relative inline-flex rounded-full h-4 w-4 bg-destructive"></span></span></section>`,

"radio-button": `<section class="max-w-sm space-y-3"><label class="flex items-center space-x-2 cursor-pointer"><input type="radio" name="radio-demo" checked class="h-4 w-4 accent-primary"/><span class="text-sm font-medium">Default</span></label><label class="flex items-center space-x-2 cursor-pointer"><input type="radio" name="radio-demo" class="h-4 w-4 accent-primary"/><span class="text-sm font-medium">Comfortable</span></label><label class="flex items-center space-x-2 cursor-pointer"><input type="radio" name="radio-demo" class="h-4 w-4 accent-primary"/><span class="text-sm font-medium">Compact</span></label></section>`,

"radio-group": `<section class="max-w-sm"><fieldset class="space-y-3"><legend class="text-sm font-semibold mb-2">Notify me about…</legend><label class="flex items-center space-x-2 cursor-pointer"><input type="radio" name="rg-demo" checked class="h-4 w-4 accent-primary"/><span class="text-sm">All new messages</span></label><label class="flex items-center space-x-2 cursor-pointer"><input type="radio" name="rg-demo" class="h-4 w-4 accent-primary"/><span class="text-sm">Direct messages and mentions</span></label><label class="flex items-center space-x-2 cursor-pointer"><input type="radio" name="rg-demo" class="h-4 w-4 accent-primary"/><span class="text-sm">Nothing</span></label></fieldset></section>`,

"rating": `<section class="flex items-center gap-1 text-yellow-500 cursor-pointer"><svg class="h-6 w-6 fill-current" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="h-6 w-6 fill-current" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="h-6 w-6 fill-current" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="h-6 w-6 fill-current" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="h-6 w-6 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><span class="ml-2 text-sm text-muted-foreground">4 out of 5</span></section>`,

"resizable": `<section class="max-w-md"><div class="rounded-md border border-border bg-background p-6 resize overflow-auto min-h-[100px] min-w-[200px]"><p class="text-sm text-muted-foreground">Drag the bottom-right corner to resize this container.</p></div></section>`,

"ribbon": `<section><div class="relative rounded-xl border border-border bg-card p-6 overflow-hidden max-w-xs"><div class="absolute top-0 right-0 overflow-hidden w-24 h-24 pointer-events-none"><div class="absolute top-3 right-[-35px] transform rotate-45 bg-primary text-primary-foreground text-xs font-bold px-8 py-1 shadow-md">NEW</div></div><h3 class="font-semibold">Premium Plan</h3><p class="text-sm text-muted-foreground mt-1">$29/month billed annually</p></div></section>`,

"scroll-area": `<section class="max-w-xs"><div class="h-48 w-full rounded-md border border-border overflow-y-auto p-4 bg-background"><h4 class="mb-4 text-sm font-medium">Tags</h4><div class="space-y-2"><div class="text-sm border-b border-border pb-2">v1.2.0-beta</div><div class="text-sm border-b border-border pb-2">v1.1.4</div><div class="text-sm border-b border-border pb-2">v1.1.3</div><div class="text-sm border-b border-border pb-2">v1.1.2</div><div class="text-sm border-b border-border pb-2">v1.1.1</div><div class="text-sm border-b border-border pb-2">v1.1.0</div><div class="text-sm border-b border-border pb-2">v1.0.9</div><div class="text-sm border-b border-border pb-2">v1.0.8</div><div class="text-sm">v1.0.7</div></div></div></section>`,

"search-input": `<section class="max-w-sm"><div class="relative"><svg class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg><input type="search" placeholder="Search components..." class="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"/></div></section>`,

"select": `<section class="space-y-4 max-w-sm"><div class="space-y-2"><label class="text-sm font-medium">Theme</label><select class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"><option>Light</option><option>Dark</option><option>System</option></select></div><div class="space-y-2"><label class="text-sm font-medium">Framework</label><select class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"><option>Next.js</option><option>SvelteKit</option><option>Remix</option><option>Astro</option></select></div></section>`,

"separator": `<section class="max-w-md space-y-4"><div><h4 class="text-sm font-medium">HTMXUI</h4><p class="text-sm text-muted-foreground">An open-source UI component library.</p></div><div class="h-px bg-border"></div><div class="flex h-5 items-center gap-4 text-sm"><span>Blog</span><div class="w-px h-full bg-border"></div><span>Docs</span><div class="w-px h-full bg-border"></div><span>Source</span></div></section>`,

"sheet": `<section class="flex justify-center">
  <button onclick="document.getElementById('sheet-demo').style.display='flex'" class="rounded-md text-sm font-medium border border-input bg-background shadow-sm hover:bg-accent h-9 px-4 py-2">Open Sheet</button>
  <div id="sheet-demo" class="fixed inset-0 z-50 bg-black/80 hidden" style="display:none" onclick="if(event.target===this)this.style.display='none'">
    <div class="fixed inset-y-0 left-0 z-50 h-full w-72 border-r border-border bg-background p-6 shadow-lg"><div class="flex justify-between items-center mb-4"><h2 class="text-lg font-semibold">Edit Profile</h2><button onclick="this.closest('#sheet-demo').style.display='none'" class="text-muted-foreground hover:text-foreground">✕</button></div><div class="space-y-4"><div class="space-y-2"><label class="text-sm font-medium">Name</label><input value="Pedro Duarte" class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"/></div><div class="space-y-2"><label class="text-sm font-medium">Username</label><input value="@peduarte" class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"/></div><button onclick="this.closest('#sheet-demo').style.display='none'" class="w-full rounded-md text-sm font-medium bg-primary text-primary-foreground shadow h-9 px-4 py-2">Save</button></div></div>
  </div>
</section>`,

"sidebar": `<section><div class="flex border border-border rounded-lg overflow-hidden max-w-lg h-64"><aside class="w-48 border-r border-border bg-card px-3 py-4 flex flex-col gap-1"><span class="px-2 font-bold text-sm mb-2">⚫ HTMXUI</span><a href="#" class="rounded-md bg-accent px-3 py-1.5 text-sm font-medium">Dashboard</a><a href="#" class="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent/50">Customers</a><a href="#" class="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent/50">Products</a><a href="#" class="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent/50">Settings</a></aside><div class="flex-1 p-4 text-sm text-muted-foreground flex items-center justify-center">Main Content</div></div></section>`,

"skeleton": `<section class="space-y-6 max-w-md"><div class="flex items-center space-x-4"><div class="h-12 w-12 rounded-full bg-muted animate-pulse"></div><div class="space-y-2"><div class="h-4 w-[200px] rounded bg-muted animate-pulse"></div><div class="h-4 w-[150px] rounded bg-muted animate-pulse"></div></div></div><div class="space-y-3"><div class="h-4 w-full rounded bg-muted animate-pulse"></div><div class="h-4 w-[80%] rounded bg-muted animate-pulse"></div><div class="h-4 w-[60%] rounded bg-muted animate-pulse"></div></div></section>`,

"slider": `<section class="space-y-6 max-w-md"><div class="space-y-2"><p class="text-sm font-medium">Temperature</p><input type="range" min="0" max="100" value="50" class="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"/></div><div class="space-y-2"><p class="text-sm font-medium">Volume</p><input type="range" min="0" max="100" value="80" class="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"/></div></section>`,

"slider-range": `<section class="max-w-md space-y-2"><p class="text-sm font-medium">Price Range: $20 — $80</p><div class="relative h-2 w-full bg-secondary rounded-full"><div class="absolute h-full bg-primary rounded-full" style="left:20%;right:20%"></div></div></section>`,

"snackbar": `<section class="flex justify-center"><div class="flex items-center justify-between gap-4 rounded-md bg-foreground px-4 py-3 text-background shadow-lg max-w-sm w-full"><p class="text-sm">Event has been created.</p><button onclick="this.parentElement.style.opacity='0'" class="text-sm font-medium hover:underline">Undo</button></div></section>`,

"splitter": `<section class="max-w-lg"><div class="flex h-[150px] border border-border rounded-md"><div class="flex-1 p-4 bg-background flex items-center justify-center text-sm text-muted-foreground">Panel A</div><div class="w-1 cursor-col-resize bg-border hover:bg-primary transition-colors"></div><div class="flex-1 p-4 bg-background flex items-center justify-center text-sm text-muted-foreground">Panel B</div></div></section>`,

"stat-card": `<section class="grid gap-4 grid-cols-2 max-w-lg"><div class="rounded-xl border border-border bg-card p-6 shadow-sm"><p class="text-sm font-medium text-muted-foreground">Total Revenue</p><h3 class="text-2xl font-bold">$45,231</h3><p class="text-xs text-green-600">+20.1% from last month</p></div><div class="rounded-xl border border-border bg-card p-6 shadow-sm"><p class="text-sm font-medium text-muted-foreground">Active Users</p><h3 class="text-2xl font-bold">+2,350</h3><p class="text-xs text-green-600">+180 since last hour</p></div></section>`,

"stepper": `<section class="max-w-md"><div class="flex items-center w-full"><div class="flex items-center text-primary"><div class="rounded-full h-8 w-8 border-2 border-primary flex items-center justify-center text-sm font-bold bg-primary text-primary-foreground">✓</div><span class="ml-2 text-xs font-medium">Account</span></div><div class="flex-auto border-t-2 border-primary mx-3"></div><div class="flex items-center text-primary"><div class="rounded-full h-8 w-8 border-2 border-primary flex items-center justify-center text-sm font-bold">2</div><span class="ml-2 text-xs font-medium">Details</span></div><div class="flex-auto border-t-2 border-border mx-3"></div><div class="flex items-center text-muted-foreground"><div class="rounded-full h-8 w-8 border-2 border-border flex items-center justify-center text-sm font-bold">3</div><span class="ml-2 text-xs font-medium">Confirm</span></div></div></section>`,

"submenu": `<section><details class="relative inline-block [&_summary::-webkit-details-marker]:hidden"><summary class="px-3 py-1.5 text-sm font-medium border border-border rounded-md hover:bg-accent cursor-pointer list-none">Menu with Submenu ▼</summary><div class="absolute left-0 z-50 mt-1 w-48 rounded-md border border-border bg-popover p-1 shadow-md"><div class="px-2 py-1.5 text-sm hover:bg-accent rounded cursor-pointer">Back</div><div class="px-2 py-1.5 text-sm hover:bg-accent rounded cursor-pointer">Forward</div><details class="relative [&_summary::-webkit-details-marker]:hidden"><summary class="px-2 py-1.5 text-sm hover:bg-accent rounded cursor-pointer list-none flex justify-between">More Tools <span>▶</span></summary><div class="absolute left-full top-0 ml-1 w-48 rounded-md border border-border bg-popover p-1 shadow-md"><div class="px-2 py-1.5 text-sm hover:bg-accent rounded cursor-pointer">Save Page As…</div><div class="px-2 py-1.5 text-sm hover:bg-accent rounded cursor-pointer">Developer Tools</div></div></details></div></details></section>`,

"switch": `<section class="space-y-6 max-w-sm"><div class="flex items-center justify-between rounded-lg border border-border p-4"><div class="space-y-0.5"><label class="text-sm font-medium">Airplane Mode</label><p class="text-sm text-muted-foreground">Toggle airplane mode on/off.</p></div><label class="relative inline-flex items-center cursor-pointer"><input type="checkbox" class="sr-only peer"><div class="w-11 h-6 bg-input rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div></label></div><div class="flex items-center justify-between rounded-lg border border-border p-4"><div class="space-y-0.5"><label class="text-sm font-medium">Notifications</label><p class="text-sm text-muted-foreground">Receive push notifications.</p></div><label class="relative inline-flex items-center cursor-pointer"><input type="checkbox" checked class="sr-only peer"><div class="w-11 h-6 bg-input rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div></label></div></section>`,

"table": `<section class="rounded-md border border-border overflow-auto"><table class="w-full text-sm"><thead><tr class="border-b bg-muted/50"><th class="h-10 px-4 text-left font-medium text-muted-foreground">Invoice</th><th class="h-10 px-4 text-left font-medium text-muted-foreground">Status</th><th class="h-10 px-4 text-left font-medium text-muted-foreground">Method</th><th class="h-10 px-4 text-right font-medium text-muted-foreground">Amount</th></tr></thead><tbody><tr class="border-b hover:bg-muted/50"><td class="p-4 font-medium">INV001</td><td class="p-4">Paid</td><td class="p-4">Credit Card</td><td class="p-4 text-right">$250.00</td></tr><tr class="border-b hover:bg-muted/50"><td class="p-4 font-medium">INV002</td><td class="p-4">Pending</td><td class="p-4">PayPal</td><td class="p-4 text-right">$150.00</td></tr><tr class="hover:bg-muted/50"><td class="p-4 font-medium">INV003</td><td class="p-4">Unpaid</td><td class="p-4">Bank Transfer</td><td class="p-4 text-right">$350.00</td></tr></tbody></table></section>`,

"tabs": `<section class="w-full max-w-lg"><div class="inline-flex h-10 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground w-full"><button onclick="document.getElementById('tab-acc').style.display='block';document.getElementById('tab-pwd').style.display='none';this.classList.add('bg-background','text-foreground','shadow-sm');this.nextElementSibling.classList.remove('bg-background','text-foreground','shadow-sm')" class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all flex-1 bg-background text-foreground shadow-sm">Account</button><button onclick="document.getElementById('tab-pwd').style.display='block';document.getElementById('tab-acc').style.display='none';this.classList.add('bg-background','text-foreground','shadow-sm');this.previousElementSibling.classList.remove('bg-background','text-foreground','shadow-sm')" class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all flex-1">Password</button></div><div id="tab-acc" class="mt-4 rounded-xl border border-border p-6 space-y-4"><div><h3 class="text-lg font-semibold">Account</h3><p class="text-sm text-muted-foreground">Make changes to your account here.</p></div><div class="space-y-2"><label class="text-sm font-medium">Name</label><input value="Pedro Duarte" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"/></div><button class="rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">Save changes</button></div><div id="tab-pwd" class="mt-4 rounded-xl border border-border p-6 space-y-4" style="display:none"><div><h3 class="text-lg font-semibold">Password</h3><p class="text-sm text-muted-foreground">Change your password here.</p></div><div class="space-y-2"><label class="text-sm font-medium">Current password</label><input type="password" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"/></div><div class="space-y-2"><label class="text-sm font-medium">New password</label><input type="password" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"/></div><button class="rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">Save password</button></div></section>`,

"tag": `<section class="flex flex-wrap gap-2"><span class="rounded-md border border-border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground">Design</span><span class="rounded-md border border-border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground">Engineering</span><span class="rounded-md border border-blue-500/20 px-2.5 py-0.5 text-xs font-semibold bg-blue-500/10 text-blue-600">Feature</span><span class="rounded-md border border-green-500/20 px-2.5 py-0.5 text-xs font-semibold bg-green-500/10 text-green-600">Shipped</span><span class="rounded-md border border-red-500/20 px-2.5 py-0.5 text-xs font-semibold bg-red-500/10 text-red-600">Bug</span></section>`,

"text": `<section class="max-w-lg space-y-4"><h1 class="text-3xl font-bold tracking-tight">The Joke Tax Chronicles</h1><p class="leading-7 text-muted-foreground">Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his throne.</p><h2 class="text-xl font-semibold tracking-tight mt-6 border-b border-border pb-2">The King's Plan</h2><p class="leading-7 text-muted-foreground">The king thought long and hard, and finally came up with a brilliant plan: he would tax the jokes in the kingdom.</p><blockquote class="mt-4 border-l-2 border-border pl-6 italic text-muted-foreground">"After all," he said, "everyone enjoys a good joke."</blockquote></section>`,

"textarea": `<section class="space-y-4 max-w-md"><div class="space-y-2"><label class="text-sm font-medium">Your Message</label><textarea placeholder="Type your message here." rows="4" class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"></textarea><p class="text-sm text-muted-foreground">Your message will be copied to the support team.</p></div></section>`,

"timeline": `<section class="max-w-md"><ol class="relative border-l border-border ml-3"><li class="mb-8 ml-6"><div class="absolute w-3 h-3 bg-primary rounded-full -left-1.5 border-2 border-background"></div><time class="text-sm text-muted-foreground">February 2024</time><h3 class="text-sm font-semibold mt-1">Application submitted</h3><p class="text-sm text-muted-foreground">Your application was successfully submitted.</p></li><li class="mb-8 ml-6"><div class="absolute w-3 h-3 bg-primary rounded-full -left-1.5 border-2 border-background"></div><time class="text-sm text-muted-foreground">March 2024</time><h3 class="text-sm font-semibold mt-1">Under review</h3><p class="text-sm text-muted-foreground">Your application is being reviewed.</p></li><li class="ml-6"><div class="absolute w-3 h-3 bg-muted rounded-full -left-1.5 border-2 border-background"></div><time class="text-sm text-muted-foreground">Pending</time><h3 class="text-sm font-semibold mt-1">Decision</h3><p class="text-sm text-muted-foreground">Awaiting final decision.</p></li></ol></section>`,

"toast": `<section class="flex justify-center"><button onclick="let t=document.getElementById('toast-demo');t.style.display='flex';setTimeout(()=>t.style.display='none',3000)" class="rounded-md text-sm font-medium border border-input bg-background shadow-sm hover:bg-accent h-9 px-4 py-2">Show Toast</button><div id="toast-demo" class="fixed bottom-4 right-4 z-50 hidden max-w-sm rounded-lg bg-background shadow-lg ring-1 ring-black/5 border border-border p-4"><p class="text-sm font-medium">Scheduled: Catch up</p><p class="text-sm text-muted-foreground">Friday, February 10, 2024 at 5:57 PM</p></div></section>`,

"toggle": `<section class="flex gap-2"><label class="inline-flex cursor-pointer"><input type="checkbox" class="peer hidden"/><div class="inline-flex h-10 items-center justify-center rounded-md bg-transparent px-3 text-sm font-medium transition-colors hover:bg-muted peer-checked:bg-accent peer-checked:text-accent-foreground border border-input"><b>B</b></div></label><label class="inline-flex cursor-pointer"><input type="checkbox" class="peer hidden"/><div class="inline-flex h-10 items-center justify-center rounded-md bg-transparent px-3 text-sm font-medium transition-colors hover:bg-muted peer-checked:bg-accent peer-checked:text-accent-foreground border border-input"><i>I</i></div></label><label class="inline-flex cursor-pointer"><input type="checkbox" class="peer hidden" checked/><div class="inline-flex h-10 items-center justify-center rounded-md bg-transparent px-3 text-sm font-medium transition-colors hover:bg-muted peer-checked:bg-accent peer-checked:text-accent-foreground border border-input"><u>U</u></div></label></section>`,

"toggle-group": `<section><div class="inline-flex items-center justify-center rounded-md bg-muted p-1 text-muted-foreground"><label class="cursor-pointer"><input type="radio" name="tg-demo" class="peer hidden" checked/><div class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all peer-checked:bg-background peer-checked:text-foreground peer-checked:shadow-sm">Left</div></label><label class="cursor-pointer"><input type="radio" name="tg-demo" class="peer hidden"/><div class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all peer-checked:bg-background peer-checked:text-foreground peer-checked:shadow-sm">Center</div></label><label class="cursor-pointer"><input type="radio" name="tg-demo" class="peer hidden"/><div class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all peer-checked:bg-background peer-checked:text-foreground peer-checked:shadow-sm">Right</div></label></div></section>`,

"toggle-switch": `<section class="max-w-xs"><label class="flex items-center space-x-3 cursor-pointer"><div class="relative inline-block w-9 h-5"><input type="checkbox" checked class="sr-only peer"/><div class="w-9 h-5 bg-input rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div></div><span class="text-sm font-medium">Enable notifications</span></label></section>`,

"toolbar": `<section><div class="flex items-center space-x-1 border border-border bg-background p-1 rounded-md w-max"><button class="p-2 hover:bg-muted rounded text-sm font-bold">B</button><button class="p-2 hover:bg-muted rounded text-sm italic">I</button><button class="p-2 hover:bg-muted rounded text-sm underline">U</button><div class="w-px h-6 bg-border mx-1"></div><button class="p-2 hover:bg-muted rounded text-sm">≡</button><button class="p-2 hover:bg-muted rounded text-sm">⫶</button><div class="w-px h-6 bg-border mx-1"></div><button class="p-2 hover:bg-muted rounded text-sm">🔗</button></div></section>`,

"tooltip": `<section class="flex justify-center py-8"><div class="group relative inline-block"><button class="rounded-md text-sm font-medium border border-input bg-background shadow-sm hover:bg-accent h-9 px-4 py-2">Hover me</button><div class="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full z-50 hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground shadow-md group-hover:block">Add to library<div class="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-primary"></div></div></div></section>`,

"tree-view": `<section class="max-w-xs"><ul class="space-y-1 list-none text-sm"><li><details class="group [&_summary::-webkit-details-marker]:hidden" open><summary class="flex items-center gap-2 cursor-pointer hover:bg-muted p-1 rounded"><span class="transition-transform group-open:rotate-90 text-xs">▶</span><span>📁 src</span></summary><ul class="pl-5 space-y-1 mt-1"><li><details class="group [&_summary::-webkit-details-marker]:hidden" open><summary class="flex items-center gap-2 cursor-pointer hover:bg-muted p-1 rounded"><span class="transition-transform group-open:rotate-90 text-xs">▶</span><span>📁 components</span></summary><ul class="pl-5 space-y-1 mt-1"><li class="p-1 hover:bg-muted rounded cursor-pointer">📄 button.html</li><li class="p-1 hover:bg-muted rounded cursor-pointer">📄 card.html</li><li class="p-1 hover:bg-muted rounded cursor-pointer">📄 dialog.html</li></ul></details></li><li class="p-1 hover:bg-muted rounded cursor-pointer">📄 index.html</li><li class="p-1 hover:bg-muted rounded cursor-pointer">📄 styles.css</li></ul></details></li></ul></section>`,

"user-card": `<section class="max-w-sm"><div class="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-sm"><span class="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">DK</span><div class="flex flex-col"><h4 class="text-sm font-semibold">David Kim</h4><p class="text-xs text-muted-foreground">Software Engineer</p></div><button class="ml-auto text-xs border border-border px-3 py-1 rounded hover:bg-muted transition-colors">View</button></div></section>`,

"video-player": `<section class="max-w-md"><div class="relative overflow-hidden rounded-lg border border-border bg-black aspect-video flex items-center justify-center"><div class="text-white/50 text-sm flex flex-col items-center gap-2"><svg class="h-12 w-12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>Video Player Component</div></div></section>`,

"watermark": `<section class="max-w-md"><div class="relative w-full rounded-lg border border-border p-8 overflow-hidden"><p class="text-sm">This content has a watermark overlay. Useful for draft documents, preview images, or confidential content.</p><div class="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10"><h1 class="text-5xl font-black uppercase text-foreground" style="transform:rotate(-30deg)">DRAFT</h1></div></div></section>`,

"wizard": `<section class="max-w-md"><div class="rounded-lg border border-border bg-card shadow-sm p-6"><div class="mb-6 flex justify-between items-center text-sm"><span class="text-primary font-medium">Step 2 of 3</span><span class="text-muted-foreground">Account Details</span></div><div class="space-y-4 mb-6"><div class="space-y-2"><label class="text-sm font-medium">Email</label><input value="user@example.com" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"/></div><div class="space-y-2"><label class="text-sm font-medium">Company</label><input placeholder="Acme Inc." class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"/></div></div><div class="flex justify-between border-t border-border pt-4"><button class="px-4 py-2 border border-border rounded text-sm hover:bg-muted">Back</button><button class="px-4 py-2 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90">Next</button></div></div></section>`,

"date-range-picker": `<section class="max-w-sm"><label class="text-sm font-medium block mb-2">Date Range</label><div class="flex items-center gap-2"><input type="date" value="2026-08-01" class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"/><span class="text-muted-foreground text-sm">to</span><input type="date" value="2026-08-21" class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"/></div></section>`,

"time-picker": `<section class="max-w-xs"><label class="text-sm font-medium block mb-2">Select Time</label><input type="time" value="14:30" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"/></section>`,

};
