import os

components_dir = r"d:\@AIWorkspace\Apps & Tools\HTMXUI\views\components"

components = []
for f in os.listdir(components_dir):
    if f.endswith(".html"):
        name = f.replace(".html", "").replace("-", " ").title()
        
        filepath = os.path.join(components_dir, f)
        with open(filepath, "r", encoding="utf-8") as file:
            content = file.read()
            
        components.append((name, content))

components.sort(key=lambda x: x[0])

rows = ""
for name, content in components:
    rows += f"""
    <tr class="border-b transition-colors hover:bg-muted/50">
      <td class="p-4 align-middle font-semibold min-w-[150px]">{name}</td>
      <td class="p-4 align-middle">
        <div class="p-4 border border-border rounded-lg bg-background flex items-center justify-center min-h-[100px] overflow-hidden">
          {content}
        </div>
      </td>
      <td class="p-4 align-middle text-sm text-muted-foreground">
        Interactive Demo
      </td>
    </tr>
"""

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTMXUI - Working Demo Showcase</title>
  <script src="https://unpkg.com/htmx.org@2.0.4" crossorigin="anonymous"></script>
  <script src="/htmx-bolt.js"></script>
  <link rel="stylesheet" href="/styles.css">
</head>
<body class="bg-background text-foreground antialiased min-h-screen p-8">
  
  <div class="max-w-7xl mx-auto space-y-8">
    <header class="flex flex-col gap-2 border-b border-border pb-6">
      <h1 class="text-4xl font-bold tracking-tight text-primary">HTMXUI Working Demos</h1>
      <p class="text-lg text-muted-foreground">
        100 fully interactive, backend-agnostic UI components powered by HTMX + htmx-bolt.
      </p>
    </header>

    <div class="rounded-md border border-border bg-card shadow-sm overflow-hidden">
      <div class="w-full overflow-auto max-h-[80vh]">
        <table class="w-full caption-bottom text-sm text-left">
          <thead class="[&_tr]:border-b border-border bg-muted/50 sticky top-0 z-10 backdrop-blur">
            <tr class="border-b transition-colors hover:bg-muted/50">
              <th class="h-12 px-4 align-middle font-medium text-muted-foreground w-1/4">Component Name</th>
              <th class="h-12 px-4 align-middle font-medium text-muted-foreground w-1/2">Live Preview</th>
              <th class="h-12 px-4 align-middle font-medium text-muted-foreground w-1/4">Status</th>
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

print("Working demo showcase generated.")
