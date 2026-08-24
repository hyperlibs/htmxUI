import os
import re

components = {
    "page-header.html": """<header class="flex flex-col gap-1 border-b border-border pb-4 mb-4">
  <h1 class="text-2xl font-bold tracking-tight">{title}</h1>
  <p class="text-muted-foreground">{description}</p>
</header>""",

    "pagination.html": """<nav aria-label="pagination" class="mx-auto flex w-full justify-center">
  <ul class="flex flex-row items-center gap-1">
    <li><button hx-get="{prev_url}" class="inline-flex h-9 items-center justify-center rounded-md px-3 hover:bg-accent hover:text-accent-foreground">Previous</button></li>
    <li><button hx-get="{page_1_url}" class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground">1</button></li>
    <li><button hx-get="{page_2_url}" class="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground">2</button></li>
    <li><span class="flex h-9 w-9 items-center justify-center">...</span></li>
    <li><button hx-get="{next_url}" class="inline-flex h-9 items-center justify-center rounded-md px-3 hover:bg-accent hover:text-accent-foreground">Next</button></li>
  </ul>
</nav>""",

    "panel.html": """<div class="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
  <div class="p-6">
    {content}
  </div>
</div>""",

    "profile-badge.html": """<div class="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 bg-background hover:bg-muted transition-colors cursor-pointer">
  <img src="{avatar_url}" alt="Profile" class="h-6 w-6 rounded-full object-cover" />
  <span class="text-sm font-medium">{username}</span>
</div>""",

    "progress.html": """<div class="w-full bg-secondary rounded-full h-2.5">
  <!-- The width determines the progress, managed via backend -->
  <div class="bg-primary h-2.5 rounded-full transition-all" style="width: {percentage}%"></div>
</div>""",

    "progress-bar.html": """<div class="flex flex-col gap-2 w-full">
  <div class="flex justify-between text-sm">
    <span>{label}</span>
    <span class="font-medium">{percentage}%</span>
  </div>
  <div class="w-full bg-secondary rounded-full h-2">
    <div class="bg-primary h-2 rounded-full transition-all" style="width: {percentage}%"></div>
  </div>
</div>""",

    "pulse.html": """<span class="relative flex h-4 w-4">
  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
  <span class="relative inline-flex rounded-full h-4 w-4 bg-primary"></span>
</span>""",

    "resizable.html": """<div class="flex h-[200px] w-full items-center justify-center rounded-md border border-border bg-background p-6 resize-y overflow-auto">
  <span class="font-semibold">Resize me vertically</span>
</div>""",

    "ribbon.html": """<div class="absolute top-0 right-0 overflow-hidden w-24 h-24 pointer-events-none">
  <div class="absolute top-0 right-0 transform translate-x-[25%] -translate-y-[25%] rotate-45 bg-primary text-primary-foreground text-xs font-bold px-8 py-1 shadow-md">
    {text}
  </div>
</div>""",

    "scroll-area.html": """<div class="relative h-[200px] w-full rounded-md border border-border overflow-y-auto p-4 bg-background">
  <div class="space-y-4">
    {content}
  </div>
</div>""",

    "separator.html": """<div class="shrink-0 bg-border h-px w-full my-4" role="separator"></div>""",

    "sheet.html": """<div id="sheet-backdrop" class="fixed inset-0 z-50 bg-black/80 flex">
  <div class="fixed inset-y-0 left-0 z-50 h-full w-3/4 border-r border-border bg-background p-6 shadow-lg transition-transform duration-300 ease-in-out sm:max-w-sm animate-in slide-in-from-left">
    <div class="flex flex-col space-y-2 text-left">
      <h2 class="text-lg font-semibold">{title}</h2>
      <p class="text-sm text-muted-foreground">{description}</p>
    </div>
    <div class="mt-4 h-full overflow-y-auto">
      {content}
    </div>
    <button hx-on:click="document.getElementById('sheet-backdrop').remove()" class="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none">
      ✕
    </button>
  </div>
</div>""",

    "sidebar.html": """<aside class="w-64 h-screen border-r border-border bg-background px-4 py-6 flex flex-col gap-4">
  <div class="font-bold text-lg px-2">{logo}</div>
  <nav class="flex flex-col gap-1">
    {nav_items} <!-- <a href="#" class="rounded-md px-3 py-2 hover:bg-accent text-sm font-medium">Link</a> -->
  </nav>
</aside>""",

    "skeleton.html": """<div class="animate-pulse rounded-md bg-muted {classes}"></div>""",

    "snackbar.html": """<div class="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between gap-4 rounded-md bg-foreground px-4 py-3 text-background shadow-lg animate-in fade-in slide-in-from-bottom-5">
  <p class="text-sm">{message}</p>
  <button hx-on:click="this.parentElement.remove()" class="text-sm font-medium hover:underline text-primary-foreground">Close</button>
</div>""",

    "splitter.html": """<div class="flex w-full h-[200px] border border-border rounded-md">
  <div class="flex-1 p-4 bg-background">Pane 1</div>
  <div class="w-1 cursor-col-resize bg-border hover:bg-primary transition-colors"></div>
  <div class="flex-1 p-4 bg-background">Pane 2</div>
</div>""",

    "stat-card.html": """<div class="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col gap-1">
  <p class="text-sm font-medium text-muted-foreground">{title}</p>
  <h3 class="text-2xl font-bold">{value}</h3>
  <p class="text-xs text-muted-foreground">{trend}</p>
</div>""",

    "stepper.html": """<div class="flex items-center w-full">
  <div class="flex items-center text-primary relative">
    <div class="rounded-full transition duration-500 ease-in-out h-8 w-8 py-3 border-2 border-primary flex items-center justify-center font-bold">1</div>
    <div class="absolute top-0 -ml-10 text-center mt-10 w-28 text-xs font-medium text-primary uppercase">Step 1</div>
  </div>
  <div class="flex-auto border-t-2 transition duration-500 ease-in-out border-primary mx-2"></div>
  <div class="flex items-center text-muted-foreground relative">
    <div class="rounded-full transition duration-500 ease-in-out h-8 w-8 py-3 border-2 border-border flex items-center justify-center font-bold bg-background">2</div>
    <div class="absolute top-0 -ml-10 text-center mt-10 w-28 text-xs font-medium uppercase">Step 2</div>
  </div>
</div>""",

    "submenu.html": """<details class="group [&_summary::-webkit-details-marker]:hidden relative">
  <summary class="flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent focus:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
    {title}
    <span class="ml-auto text-xs opacity-60">▶</span>
  </summary>
  <div class="absolute left-full top-0 ml-1 w-48 rounded-md border border-border bg-popover p-1 shadow-md text-popover-foreground">
    {items}
  </div>
</details>""",

    "table.html": """<div class="w-full overflow-auto">
  <table class="w-full caption-bottom text-sm">
    <thead class="[&_tr]:border-b border-border">
      <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
        {headers} <!-- <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Header</th> -->
      </tr>
    </thead>
    <tbody class="[&_tr:last-child]:border-0">
      {rows} <!-- <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"><td class="p-4 align-middle">Cell</td></tr> -->
    </tbody>
  </table>
</div>""",

    "tabs.html": """<div class="w-full border border-border rounded-md bg-background">
  <div class="flex h-10 items-center justify-start rounded-t-md bg-muted p-1 text-muted-foreground">
    <!-- Triggers -->
    <button hx-get="{tab1_url}" hx-target="#{target_id}" class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-background text-foreground shadow-sm">Tab 1</button>
    <button hx-get="{tab2_url}" hx-target="#{target_id}" class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-background/50 hover:text-foreground">Tab 2</button>
  </div>
  <div id="{target_id}" class="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 p-4">
    {content}
  </div>
</div>""",

    "tag.html": """<span class="inline-flex items-center rounded-md border border-border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-secondary text-secondary-foreground hover:bg-secondary/80">
  {text}
</span>""",

    "text.html": """<p class="leading-7 [&:not(:first-child)]:mt-6 text-foreground">{content}</p>""",

    "timeline.html": """<ol class="relative border-l border-border ml-3 mt-3">
  {items}
  <!-- Example item:
  <li class="mb-10 ml-4">
    <div class="absolute w-3 h-3 bg-muted rounded-full mt-1.5 -left-1.5 border border-background"></div>
    <time class="mb-1 text-sm font-normal leading-none text-muted-foreground">Date</time>
    <h3 class="text-lg font-semibold text-foreground">Title</h3>
    <p class="mb-4 text-base font-normal text-muted-foreground">Description</p>
  </li>
  -->
</ol>""",

    "toast.html": """<div class="pointer-events-auto flex w-full max-w-md rounded-lg bg-background shadow-lg ring-1 ring-black/5 animate-in slide-in-from-top-full border border-border">
  <div class="flex w-0 flex-1 items-center p-4">
    <div class="w-full">
      <p class="text-sm font-medium text-foreground">{title}</p>
      <p class="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
  <div class="flex border-l border-border">
    <button hx-on:click="this.closest('div.pointer-events-auto').remove()" class="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-primary hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary">
      Close
    </button>
  </div>
</div>""",

    "toggle-switch.html": """<label class="flex items-center space-x-2 cursor-pointer">
  <div class="relative inline-block w-9 h-5 align-middle select-none transition duration-200 ease-in">
    <input type="checkbox" name="{name}" class="peer absolute block w-5 h-5 rounded-full bg-background border-2 border-input appearance-none cursor-pointer transition-transform duration-200 ease-in-out checked:translate-x-full checked:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" {checked} hx-post="{toggle_url}" hx-trigger="change" />
    <label class="block overflow-hidden h-5 rounded-full bg-input cursor-pointer peer-checked:bg-primary"></label>
  </div>
  <span class="text-sm font-medium">{label}</span>
</label>""",

    "toolbar.html": """<div class="flex items-center space-x-1 border border-border bg-background p-1 rounded-md w-max">
  {items}
  <!-- <button class="p-2 hover:bg-muted rounded text-foreground">Icon</button> -->
</div>""",

    "tooltip.html": """<div class="group relative inline-block">
  {trigger}
  <div class="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full z-50 hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground group-hover:block animate-in fade-in-0 zoom-in-95">
    {content}
    <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-primary"></div>
  </div>
</div>""",

    "tree-view.html": """<ul class="space-y-1 list-none pl-4 border-l border-border ml-2">
  <li>
    <details class="group [&_summary::-webkit-details-marker]:hidden" open>
      <summary class="flex items-center gap-2 cursor-pointer hover:bg-muted p-1 rounded text-sm text-foreground">
        <span class="transition-transform group-open:rotate-90">▶</span> {folder_name}
      </summary>
      <div class="pl-4">
        {children}
      </div>
    </details>
  </li>
</ul>""",

    "user-card.html": """<div class="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-sm">
  <img src="{avatar_url}" alt="{name}" class="h-12 w-12 rounded-full object-cover" />
  <div class="flex flex-col">
    <h4 class="text-sm font-semibold">{name}</h4>
    <p class="text-xs text-muted-foreground">{role}</p>
  </div>
  <button class="ml-auto text-xs border border-border px-3 py-1 rounded hover:bg-muted transition-colors">View</button>
</div>""",

    "video-player.html": """<div class="relative overflow-hidden rounded-lg border border-border bg-black aspect-video flex items-center justify-center group">
  <video src="{video_url}" class="w-full h-full object-cover" controls preload="metadata"></video>
</div>""",

    "watermark.html": """<div class="relative w-full h-full">
  {content}
  <div class="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10">
    <h1 class="text-6xl font-black uppercase text-foreground rotate-[-45deg]">{text}</h1>
  </div>
</div>""",

    "wizard.html": """<div class="rounded-lg border border-border bg-card shadow-sm p-6 w-full max-w-2xl mx-auto">
  <div class="mb-8 flex justify-between items-center text-sm font-medium text-muted-foreground">
    <span class="text-primary">Step {current} of {total}</span>
    <span>{step_title}</span>
  </div>
  <div id="wizard-content" class="min-h-[200px]">
    {content}
  </div>
  <div class="mt-8 flex justify-between border-t border-border pt-4">
    <button hx-get="{prev_url}" hx-target="#wizard-content" class="px-4 py-2 border border-border rounded text-sm hover:bg-muted {prev_disabled}">Back</button>
    <button hx-get="{next_url}" hx-target="#wizard-content" class="px-4 py-2 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90">Next</button>
  </div>
</div>"""
}

base_path = r"d:\@AIWorkspace\Apps & Tools\HTMXUI\views\components"

for filename, content in components.items():
    with open(os.path.join(base_path, filename), "w", encoding="utf-8") as f:
        f.write(content)

print(f"Generated {len(components)} final components.")

# Now update the task.md checklist directly
task_file = r"C:\Users\david\.gemini\antigravity\brain\4213ddaf-603b-42a8-9702-506f5aa61224\task.md"
with open(task_file, "r", encoding="utf-8") as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    match = re.search(r'- \[ \] (\d+)\.', line)
    if match:
        num = int(match.group(1))
        # Since these are all the remaining ones, just mark everything from 52 to 98 (and 91)
        if 52 <= num <= 98 and num not in [55, 56, 57, 62, 63, 64, 68, 69, 74, 75, 81, 86, 89, 90]:
            line = line.replace('- [ ]', '- [x]', 1)
        elif num == 91:
            line = line.replace('- [ ]', '- [x]', 1)
    new_lines.append(line)

with open(task_file, "w", encoding="utf-8") as f:
    f.writelines(new_lines)
