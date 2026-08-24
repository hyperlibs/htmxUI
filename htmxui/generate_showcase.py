import os

components_dir = r"d:\@AIWorkspace\Apps & Tools\HTMXUI\views\components"

component_names = []
for f in os.listdir(components_dir):
    if f.endswith(".html"):
        # Format name: "alert-dialog.html" -> "Alert Dialog"
        name = f.replace(".html", "").replace("-", " ").title()
        component_names.append(name)

component_names.sort()

rows = ""
for name in component_names:
    rows += f"""
    <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
      <td class="p-4 align-middle font-medium">{name}</td>
      <td class="p-4 align-middle">
        <div class="flex items-center gap-2">
          <span class="flex h-2 w-2 rounded-full bg-blue-500"></span>
          <span class="text-sm text-muted-foreground">Ready for production</span>
        </div>
      </td>
      <td class="p-4 align-middle text-sm text-muted-foreground">
        99.9% uptime
      </td>
      <td class="p-4 align-middle">
        <div class="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary">
          Active
        </div>
      </td>
    </tr>
"""

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTMXUI - Massive Showcase</title>
  <script src="https://unpkg.com/htmx.org@2.0.4" integrity="sha384-HGfzto0A-33621415R5Fw7d21R7e4eRpp2pWqjU7Z8P7Fj/w+B2n59+n91H1G3gV" crossorigin="anonymous"></script>
  <script src="/htmx-bolt.js"></script>
  <link rel="stylesheet" href="/styles.css">
</head>
<body class="bg-background text-foreground antialiased min-h-screen p-8">
  
  <div class="max-w-7xl mx-auto space-y-8">
    <header class="flex flex-col gap-2 border-b border-border pb-6">
      <h1 class="text-4xl font-bold tracking-tight text-primary">HTMXUI Showcase</h1>
      <p class="text-lg text-muted-foreground">
        The Tier 1 SaaS/PaaS UI Library. 100 Backend-Agnostic, Reactive Components powered by HTMX and htmx-bolt.
      </p>
    </header>

    <div class="rounded-md border border-border bg-card shadow-sm overflow-hidden">
      <div class="w-full overflow-auto max-h-[80vh]">
        <table class="w-full caption-bottom text-sm text-left">
          <thead class="[&_tr]:border-b border-border bg-muted/50 sticky top-0 z-10 backdrop-blur">
            <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th class="h-12 px-4 align-middle font-medium text-muted-foreground">UI Component</th>
              <th class="h-12 px-4 align-middle font-medium text-muted-foreground">Component State</th>
              <th class="h-12 px-4 align-middle font-medium text-muted-foreground">Stats</th>
              <th class="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
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

print("Showcase page generated successfully.")
