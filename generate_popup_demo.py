import os

components_dir = r"d:\@AIWorkspace\Apps & Tools\HTMXUI\views\components"

components = []
for f in os.listdir(components_dir):
    if f.endswith(".html"):
        name = f.replace(".html", "").replace("-", " ").title()
        
        filepath = os.path.join(components_dir, f)
        with open(filepath, "r", encoding="utf-8") as file:
            content = file.read()
            
        components.append((name, f, content))

components.sort(key=lambda x: x[0])

rows = ""
for name, filename, content in components:
    # Escape single quotes and backticks in content just in case, though it's raw HTML inside dialog
    dialog_id = f"demo-{filename.replace('.html', '')}"
    rows += f"""
    <tr class="group border-b transition-colors hover:bg-muted/50 cursor-pointer">
      <td class="p-4 align-middle font-semibold min-w-[150px]">{name}</td>
      <td class="p-4 align-middle text-sm text-muted-foreground">
        Ready for Production
      </td>
      <td class="p-4 align-middle text-sm text-muted-foreground">
        HTMX Native
      </td>
      <td class="p-4 align-middle text-right">
        <!-- Demo button visible on row hover -->
        <button 
          onclick="document.getElementById('{dialog_id}').showModal()" 
          class="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-4"
        >
          View Demo
        </button>
        
        <!-- Native Dialog Popup -->
        <dialog id="{dialog_id}" class="w-full max-w-3xl rounded-xl border border-border bg-background p-0 shadow-lg backdrop:bg-black/80 backdrop:backdrop-blur-sm open:animate-in open:fade-in-0 open:zoom-in-95">
          <div class="flex flex-col h-full max-h-[80vh]">
            <!-- Header -->
            <div class="flex items-center justify-between border-b border-border p-6">
              <div>
                <h2 class="text-xl font-bold text-foreground">{name} Component</h2>
                <p class="text-sm text-muted-foreground mt-1">Interactive HTMXUI Preview</p>
              </div>
              <button onclick="this.closest('dialog').close()" class="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 hover:bg-muted p-2">
                <svg class="h-5 w-5 text-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <!-- Component Content Area -->
            <div class="flex-1 overflow-y-auto p-8 flex items-center justify-center bg-muted/20">
              <div class="w-full">
                {content}
              </div>
            </div>
            
            <!-- Footer -->
            <div class="border-t border-border p-4 bg-muted/50 flex justify-end">
              <button onclick="this.closest('dialog').close()" class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4">
                Close Preview
              </button>
            </div>
          </div>
        </dialog>
      </td>
    </tr>
"""

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTMXUI - Interactive Demos</title>
  <script src="https://unpkg.com/htmx.org@2.0.4" crossorigin="anonymous"></script>
  <script src="/htmx-bolt.js"></script>
  <link rel="stylesheet" href="/styles.css">
  <style>
    /* Prevent body scroll when dialog is open */
    body:has(dialog[open]) {{ overflow: hidden; }}
  </style>
</head>
<body class="bg-background text-foreground antialiased min-h-screen p-8">
  
  <div class="max-w-5xl mx-auto space-y-8">
    <header class="flex flex-col gap-2 border-b border-border pb-6">
      <h1 class="text-4xl font-bold tracking-tight text-primary">HTMXUI Component Library</h1>
      <p class="text-lg text-muted-foreground">
        Hover over any row and click "View Demo" to launch the comprehensive interactive popup.
      </p>
    </header>

    <div class="rounded-md border border-border bg-card shadow-sm overflow-hidden">
      <div class="w-full">
        <table class="w-full caption-bottom text-sm text-left">
          <thead class="[&_tr]:border-b border-border bg-muted/50">
            <tr class="border-b transition-colors hover:bg-muted/50">
              <th class="h-12 px-4 align-middle font-medium text-muted-foreground w-1/3">Component</th>
              <th class="h-12 px-4 align-middle font-medium text-muted-foreground w-1/4">Status</th>
              <th class="h-12 px-4 align-middle font-medium text-muted-foreground w-1/4">Core</th>
              <th class="h-12 px-4 align-middle font-medium text-muted-foreground w-1/6 text-right">Action</th>
            </tr>
          </thead>
          <tbody class="[&_tr:last-child]:border-0 bg-background">
            {rows}
          </tbody>
        </table>
      </div>
    </div>
  </div>

</body>
</html>
"""

with open(r"d:\@AIWorkspace\Apps & Tools\HTMXUI\views\layout.html", "w", encoding="utf-8") as f:
    f.write(html_content)

print("Popup demo showcase generated.")
