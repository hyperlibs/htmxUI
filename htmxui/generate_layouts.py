import re

LAYOUTS = {
"layout-scaffold": """<div class="h-[600px] w-full border border-border rounded-lg overflow-hidden flex bg-background">
  <aside class="w-64 border-r border-border bg-muted/30 flex flex-col hidden md:flex">
    <div class="h-14 border-b border-border flex items-center px-4 font-semibold">Dashboard</div>
    <div class="flex-1 p-4 space-y-2 text-sm">
      <div class="bg-accent px-3 py-2 rounded-md font-medium">Overview</div>
      <div class="px-3 py-2 text-muted-foreground hover:bg-accent/50 rounded-md cursor-pointer">Customers</div>
      <div class="px-3 py-2 text-muted-foreground hover:bg-accent/50 rounded-md cursor-pointer">Products</div>
      <div class="px-3 py-2 text-muted-foreground hover:bg-accent/50 rounded-md cursor-pointer">Settings</div>
    </div>
  </aside>
  <div class="flex-1 flex flex-col">
    <header class="h-14 border-b border-border flex items-center justify-between px-6 bg-background">
      <div class="md:hidden font-semibold">Dashboard</div>
      <input type="text" placeholder="Search..." class="hidden md:block h-9 w-64 rounded-md border border-input bg-background px-3 text-sm"/>
      <div class="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">U</div>
    </header>
    <main class="flex-1 p-6 overflow-auto bg-muted/10">
      <h2 class="text-2xl font-bold tracking-tight mb-4">Overview</h2>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
        <div class="rounded-xl border border-border bg-card p-6 shadow-sm"><div class="text-sm font-medium text-muted-foreground mb-1">Total Revenue</div><div class="text-2xl font-bold">$45,231.89</div></div>
        <div class="rounded-xl border border-border bg-card p-6 shadow-sm"><div class="text-sm font-medium text-muted-foreground mb-1">Subscriptions</div><div class="text-2xl font-bold">+2350</div></div>
        <div class="rounded-xl border border-border bg-card p-6 shadow-sm"><div class="text-sm font-medium text-muted-foreground mb-1">Active Now</div><div class="text-2xl font-bold">+12,234</div></div>
      </div>
      <div class="h-64 rounded-xl border border-border bg-card flex items-center justify-center text-muted-foreground text-sm shadow-sm">Main Content Area</div>
    </main>
  </div>
</div>""",

"layout-page": """<div class="h-[600px] w-full border border-border rounded-lg overflow-y-auto bg-background flex flex-col">
  <header class="sticky top-0 z-10 w-full border-b border-border bg-background/95 backdrop-blur flex items-center h-16 px-8">
    <div class="font-bold text-lg">Acme Corp</div>
    <nav class="ml-auto hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
      <a href="#" class="hover:text-foreground">Features</a>
      <a href="#" class="hover:text-foreground">Pricing</a>
      <a href="#" class="hover:text-foreground">About</a>
      <button class="bg-primary text-primary-foreground h-9 px-4 rounded-md text-sm font-medium hover:bg-primary/90">Get Started</button>
    </nav>
  </header>
  <main class="flex-1 flex flex-col">
    <section class="py-24 px-8 text-center flex flex-col items-center justify-center">
      <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl mb-6">Build shipping faster than ever.</h1>
      <p class="text-lg text-muted-foreground max-w-xl mb-8">The most powerful platform for building amazing things. Scalable, secure, and ready for production.</p>
      <div class="flex gap-4"><button class="bg-primary text-primary-foreground h-11 px-8 rounded-md font-medium text-lg">Start Building</button><button class="border border-input bg-background h-11 px-8 rounded-md font-medium text-lg">Read Docs</button></div>
    </section>
    <section class="bg-muted py-24 px-8">
      <div class="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
        <div class="bg-background p-6 rounded-xl shadow-sm border border-border"><div class="h-12 w-12 bg-primary/10 rounded-lg mx-auto mb-4"></div><h3 class="font-bold mb-2">Fast</h3><p class="text-sm text-muted-foreground">Lightning fast performance out of the box.</p></div>
        <div class="bg-background p-6 rounded-xl shadow-sm border border-border"><div class="h-12 w-12 bg-primary/10 rounded-lg mx-auto mb-4"></div><h3 class="font-bold mb-2">Secure</h3><p class="text-sm text-muted-foreground">Enterprise-grade security by default.</p></div>
        <div class="bg-background p-6 rounded-xl shadow-sm border border-border"><div class="h-12 w-12 bg-primary/10 rounded-lg mx-auto mb-4"></div><h3 class="font-bold mb-2">Scalable</h3><p class="text-sm text-muted-foreground">Grows with your userbase infinitely.</p></div>
      </div>
    </section>
  </main>
  <footer class="border-t border-border py-12 text-center text-sm text-muted-foreground">© 2026 Acme Corp. All rights reserved.</footer>
</div>""",

"layout-grid": """<div class="w-full bg-background border border-border rounded-lg p-6">
  <div class="grid grid-cols-1 md:grid-cols-4 grid-rows-3 gap-4 h-[600px]">
    <div class="md:col-span-2 md:row-span-2 rounded-xl bg-card border border-border shadow-sm p-6 flex flex-col justify-end">
      <h3 class="text-2xl font-bold">Main Highlight</h3>
      <p class="text-muted-foreground mt-2">This is the largest cell in the bento grid.</p>
    </div>
    <div class="md:col-span-2 rounded-xl bg-primary text-primary-foreground p-6 shadow-sm flex flex-col justify-between">
      <div class="text-sm font-medium opacity-80">Statistic</div>
      <div class="text-4xl font-extrabold">98.2%</div>
    </div>
    <div class="rounded-xl bg-card border border-border shadow-sm p-4 flex items-center justify-center text-muted-foreground">Tile A</div>
    <div class="rounded-xl bg-card border border-border shadow-sm p-4 flex items-center justify-center text-muted-foreground">Tile B</div>
    <div class="md:col-span-4 rounded-xl bg-muted border border-border p-6 flex items-center justify-between">
      <div>
        <h4 class="font-semibold">Wide Banner Cell</h4>
        <p class="text-sm text-muted-foreground">Perfect for CTAs or wide charts.</p>
      </div>
      <button class="bg-background border border-input shadow-sm px-4 py-2 rounded-md text-sm font-medium">Action</button>
    </div>
  </div>
</div>""",

"layout-block": """<div class="w-full space-y-6">
  <div class="w-full p-8 md:p-12 rounded-xl bg-primary text-primary-foreground shadow-lg flex flex-col justify-center min-h-[300px]">
    <h2 class="text-3xl md:text-5xl font-bold max-w-2xl">Stacked Block Layout</h2>
    <p class="text-lg opacity-90 mt-4 max-w-xl">Ideal for marketing pages, articles, and sequential content where each section takes full width.</p>
  </div>
  <div class="w-full p-8 md:p-12 rounded-xl border border-border bg-card shadow-sm">
    <h3 class="text-2xl font-semibold mb-4">Content Block</h3>
    <div class="space-y-4 text-muted-foreground">
      <div class="h-4 bg-muted rounded w-full"></div>
      <div class="h-4 bg-muted rounded w-5/6"></div>
      <div class="h-4 bg-muted rounded w-4/6"></div>
    </div>
  </div>
  <div class="w-full p-8 md:p-12 rounded-xl border border-border bg-card shadow-sm flex items-center gap-6">
    <div class="h-24 w-24 rounded-full bg-muted shrink-0"></div>
    <div>
      <h3 class="text-xl font-semibold">Media Block</h3>
      <p class="text-muted-foreground mt-1 text-sm">Blocks can contain alternating media and text content easily.</p>
    </div>
  </div>
</div>""",

"layout-print": """<div class="w-full max-w-[210mm] mx-auto min-h-[297mm] bg-white text-black p-12 border shadow-sm font-serif">
  <style>
    @media print {
      body * { visibility: hidden; }
      .print-area, .print-area * { visibility: visible; }
      .print-area { position: absolute; left: 0; top: 0; width: 100%; border: none; padding: 0; }
    }
  </style>
  <div class="print-area">
    <div class="flex justify-between items-end border-b-2 border-black pb-4 mb-8">
      <div>
        <h1 class="text-4xl font-bold">INVOICE</h1>
        <p class="text-gray-600 mt-1 font-sans text-sm">#INV-2026-084</p>
      </div>
      <div class="text-right text-sm">
        <p class="font-bold">Acme Corporation</p>
        <p class="text-gray-600">123 Business Rd.</p>
        <p class="text-gray-600">Tech City, TC 10101</p>
      </div>
    </div>
    
    <div class="mb-8">
      <h3 class="font-bold mb-2">Billed To:</h3>
      <p>Client Name</p>
      <p class="text-gray-600">Client Address Line 1</p>
      <p class="text-gray-600">City, State ZIP</p>
    </div>
    
    <table class="w-full text-left font-sans text-sm mb-8">
      <thead class="border-b border-black">
        <tr><th class="py-2">Item</th><th class="py-2 text-right">Qty</th><th class="py-2 text-right">Price</th><th class="py-2 text-right">Total</th></tr>
      </thead>
      <tbody class="border-b border-gray-300">
        <tr><td class="py-3 font-medium">Consulting Services</td><td class="py-3 text-right text-gray-600">10</td><td class="py-3 text-right text-gray-600">$150.00</td><td class="py-3 text-right">$1,500.00</td></tr>
        <tr><td class="py-3 font-medium">Software License</td><td class="py-3 text-right text-gray-600">1</td><td class="py-3 text-right text-gray-600">$500.00</td><td class="py-3 text-right">$500.00</td></tr>
      </tbody>
    </table>
    
    <div class="flex justify-end font-sans">
      <div class="w-64">
        <div class="flex justify-between py-1 text-sm text-gray-600"><span>Subtotal</span><span>$2,000.00</span></div>
        <div class="flex justify-between py-1 text-sm text-gray-600"><span>Tax (10%)</span><span>$200.00</span></div>
        <div class="flex justify-between py-2 mt-2 border-t-2 border-black font-bold text-lg"><span>Total</span><span>$2,200.00</span></div>
      </div>
    </div>
    
    <div class="mt-24 text-center text-sm text-gray-500 border-t border-gray-300 pt-8">
      Thank you for your business. Please remit payment within 30 days.
    </div>
  </div>
</div>""",

"layout-canvas": """<div class="relative w-full h-[600px] border border-border rounded-lg overflow-hidden bg-muted/20" 
     style="background-image: radial-gradient(circle, #cbd5e1 1px, transparent 1px); background-size: 20px 20px;">
  <!-- Toolbar -->
  <div class="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-background/80 backdrop-blur border border-border rounded-full p-2 shadow-sm z-10">
    <button class="h-8 w-8 rounded-full hover:bg-accent flex items-center justify-center text-sm">✋</button>
    <button class="h-8 w-8 rounded-full hover:bg-accent flex items-center justify-center text-sm">↗️</button>
    <div class="w-px h-5 bg-border"></div>
    <button class="h-8 w-8 rounded-full hover:bg-accent flex items-center justify-center text-sm">🔳</button>
    <button class="h-8 w-8 rounded-full hover:bg-accent flex items-center justify-center text-sm">T</button>
  </div>
  
  <!-- Mini Map -->
  <div class="absolute bottom-4 right-4 w-32 h-24 bg-background border border-border rounded-md shadow-sm z-10 p-2 opacity-80 hover:opacity-100 transition-opacity">
    <div class="w-full h-full border border-primary/20 rounded relative">
      <!-- viewport indicator -->
      <div class="absolute top-2 left-2 w-10 h-6 border-2 border-primary bg-primary/10 rounded-sm"></div>
    </div>
  </div>
  
  <!-- Nodes (Draggable visually) -->
  <div class="absolute top-32 left-32 w-64 bg-background border border-border rounded-lg shadow-md">
    <div class="px-4 py-2 border-b border-border font-medium text-sm flex justify-between items-center cursor-move bg-muted/30">
      Node: Trigger <span class="h-2 w-2 rounded-full bg-green-500"></span>
    </div>
    <div class="p-4 space-y-2 text-sm text-muted-foreground">
      <p>When user clicks the button.</p>
    </div>
  </div>
  
  <!-- SVG Connection Line -->
  <svg class="absolute inset-0 pointer-events-none w-full h-full">
    <path d="M 384 180 C 450 180 450 280 512 280" fill="none" stroke="currentColor" class="text-primary" stroke-width="2" stroke-dasharray="4"/>
  </svg>
  
  <div class="absolute top-56 left-[512px] w-64 bg-background border border-border rounded-lg shadow-md border-primary/50">
    <div class="px-4 py-2 border-b border-border font-medium text-sm flex justify-between items-center cursor-move bg-muted/30">
      Node: Action <span class="h-2 w-2 rounded-full bg-blue-500"></span>
    </div>
    <div class="p-4 space-y-2 text-sm text-muted-foreground">
      <p>Send welcome email payload.</p>
    </div>
  </div>
</div>""",

"layout-web": """<div class="h-[600px] w-full border border-border rounded-lg overflow-hidden flex flex-col bg-background">
  <!-- Top App Bar -->
  <header class="h-12 bg-primary text-primary-foreground flex items-center px-4 justify-between shrink-0">
    <div class="flex items-center gap-4">
      <button class="h-8 w-8 hover:bg-primary-foreground/20 rounded-md flex items-center justify-center font-bold">≡</button>
      <span class="font-bold text-sm tracking-widest">WEB_APP</span>
    </div>
    <div class="flex items-center gap-3">
      <span class="text-xs font-medium opacity-80">v2.4.1</span>
      <div class="h-6 w-6 rounded-full bg-white/20"></div>
    </div>
  </header>
  
  <div class="flex-1 flex overflow-hidden">
    <!-- Collapsed Sidebar -->
    <aside class="w-16 border-r border-border bg-muted/10 flex flex-col items-center py-4 space-y-6 shrink-0">
      <button class="h-10 w-10 rounded-xl bg-accent flex items-center justify-center shadow-sm">🏠</button>
      <button class="h-10 w-10 rounded-xl hover:bg-accent flex items-center justify-center text-muted-foreground transition-colors">📊</button>
      <button class="h-10 w-10 rounded-xl hover:bg-accent flex items-center justify-center text-muted-foreground transition-colors">⚙️</button>
    </aside>
    
    <!-- Secondary Panel (Master/Detail) -->
    <div class="w-64 border-r border-border bg-background flex flex-col shrink-0">
      <div class="p-4 border-b border-border font-semibold text-sm">Inbox</div>
      <div class="flex-1 overflow-auto">
        <div class="p-4 border-b border-border hover:bg-muted/50 cursor-pointer">
          <div class="font-medium text-sm">System Update</div>
          <div class="text-xs text-muted-foreground truncate mt-1">Version 2.4.1 is now live...</div>
        </div>
        <div class="p-4 border-b border-border hover:bg-muted/50 cursor-pointer bg-accent/30 border-l-2 border-l-primary">
          <div class="font-medium text-sm">New user signup</div>
          <div class="text-xs text-muted-foreground truncate mt-1">alice@example.com joined...</div>
        </div>
      </div>
    </div>
    
    <!-- Detail View -->
    <main class="flex-1 bg-background flex flex-col">
      <div class="p-6 border-b border-border flex justify-between items-start">
        <div>
          <h2 class="text-xl font-bold">New user signup</h2>
          <p class="text-sm text-muted-foreground mt-1">Today at 10:24 AM</p>
        </div>
        <button class="px-3 py-1.5 border border-input rounded-md text-sm font-medium hover:bg-accent">Resolve</button>
      </div>
      <div class="p-6 flex-1 overflow-auto">
        <p class="text-sm leading-relaxed text-foreground">
          A new user has completed the onboarding flow successfully. All systems nominal.
        </p>
        <div class="mt-6 p-4 rounded-lg bg-muted/30 font-mono text-xs text-muted-foreground border border-border">
          { "user_id": 92381, "tier": "pro", "region": "us-east-1" }
        </div>
      </div>
    </main>
  </div>
</div>"""
}

with open("demos.ts", "r", encoding="utf-8") as f:
    content = f.read()

for layout_name, layout_html in LAYOUTS.items():
    if f'"{layout_name}":' not in content:
        # insert before the last brace
        if '"flash-search"' in content:
            pattern = re.compile(r'("flash-search": `.*?`,)', re.DOTALL)
            replacement = r'\1\n\n' + f'"{layout_name}": `{layout_html}`,'
            content = pattern.sub(replacement, content)

with open("demos.ts", "w", encoding="utf-8") as f:
    f.write(content)

for layout_name, layout_html in LAYOUTS.items():
    with open(f"views/components/{layout_name}.html", "w", encoding="utf-8") as f:
        f.write(layout_html)

print("Injected layouts into demos.ts and created html files")
