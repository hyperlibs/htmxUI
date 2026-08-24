import os

components = {
    "alert-dialog.html": """<dialog class="backdrop:bg-black/80 rounded-lg p-6 shadow-lg border border-border bg-background max-w-md w-full" id="{id}">
  <h2 class="text-lg font-semibold">{title}</h2>
  <p class="text-sm text-muted-foreground mt-2">{description}</p>
  <div class="mt-4 flex justify-end gap-2">
    <button onclick="document.getElementById('{id}').close()" class="px-4 py-2 border rounded text-sm hover:bg-accent">Cancel</button>
    <button hx-post="{confirm_url}" class="px-4 py-2 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90">Continue</button>
  </div>
</dialog>""",
    
    "aspect-ratio.html": """<div class="relative w-full" style="padding-bottom: {ratio_percent}%;">
  <div class="absolute inset-0">
    {content}
  </div>
</div>""",
    
    "avatar-group.html": """<div class="flex -space-x-3 overflow-hidden">
  {avatars}
  <span class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium text-muted-foreground">+{count}</span>
</div>""",

    "banner.html": """<div class="w-full bg-primary px-4 py-3 text-primary-foreground flex justify-between items-center text-sm rounded-md shadow-sm">
  <p>{message}</p>
  <button hx-on:click="this.parentElement.remove()" class="hover:bg-primary-foreground/20 p-1 rounded">
    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
  </button>
</div>""",

    "breadcrumb.html": """<nav class="flex text-sm text-muted-foreground" aria-label="Breadcrumb">
  <ol class="inline-flex items-center space-x-1 md:space-x-3">
    {items} <!-- <li><a href="#" class="hover:text-foreground">Home</a></li> -->
  </ol>
</nav>""",

    "button-group.html": """<div class="inline-flex rounded-md shadow-sm" role="group">
  {buttons} <!-- Should have appropriate border radius classes for first and last child -->
</div>""",

    "calendar.html": """<div class="p-3 border border-border rounded-md bg-background inline-block">
  <div class="flex justify-between items-center mb-4">
    <button class="p-1 hover:bg-accent rounded">&lt;</button>
    <div class="font-medium text-sm">{month_year}</div>
    <button class="p-1 hover:bg-accent rounded">&gt;</button>
  </div>
  <div class="grid grid-cols-7 gap-1 text-center text-xs">
    {days}
  </div>
</div>""",

    "carousel.html": """<div class="relative w-full overflow-hidden rounded-lg border border-border">
  <div class="flex transition-transform duration-500" style="transform: translateX(-{current_index}00%);">
    {items}
  </div>
  <button hx-get="{prev_url}" hx-target="closest div" class="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 p-2 rounded-full">←</button>
  <button hx-get="{next_url}" hx-target="closest div" class="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 p-2 rounded-full">→</button>
</div>""",

    "checkbox.html": """<label class="flex items-center space-x-2 cursor-pointer">
  <input type="checkbox" name="{name}" value="{value}" class="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 checked:bg-primary checked:text-primary-foreground accent-primary" {checked} />
  <span class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{label}</span>
</label>""",

    "checkbox-group.html": """<fieldset class="space-y-3">
  <legend class="text-sm font-medium leading-none mb-2">{title}</legend>
  {checkboxes}
</fieldset>""",

    "chip.html": """<div class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-foreground border border-border">
  {text}
  <button hx-delete="{delete_url}" hx-target="closest div" hx-swap="outerHTML" class="ml-2 hover:text-destructive">✕</button>
</div>""",

    "collapsible.html": """<details class="group border border-border rounded-md bg-background [&_summary::-webkit-details-marker]:hidden">
  <summary class="flex justify-between items-center p-4 font-medium cursor-pointer hover:bg-accent">
    {title}
    <span class="transition group-open:rotate-180">↓</span>
  </summary>
  <div class="p-4 pt-0 text-sm text-muted-foreground border-t border-border mt-2">
    {content}
  </div>
</details>""",

    "color-picker.html": """<div class="flex items-center gap-2">
  <input type="color" name="{name}" value="{value}" class="h-8 w-8 cursor-pointer rounded-md border border-border bg-background p-1" hx-post="{update_url}" hx-trigger="change" />
  <span class="text-sm text-muted-foreground">{value}</span>
</div>""",

    "combobox.html": """<div class="relative">
  <input type="text" name="{name}" placeholder="{placeholder}" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" hx-post="{search_url}" hx-trigger="keyup changed delay:300ms" hx-target="#{dropdown_id}" />
  <div id="{dropdown_id}" class="absolute z-10 w-full mt-1 bg-background border border-border rounded-md shadow-md hidden empty:hidden target:block"></div>
</div>""",

    "command.html": """<div class="flex flex-col overflow-hidden rounded-md bg-popover text-popover-foreground border border-border shadow-md">
  <input class="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground px-4 border-b border-border" placeholder="{placeholder}" hx-post="{search_url}" hx-trigger="input changed delay:200ms" hx-target="#cmd-results" />
  <div id="cmd-results" class="max-h-[300px] overflow-y-auto p-2">
    {initial_results}
  </div>
</div>""",

    "container.html": """<div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
  {content}
</div>""",

    "context-menu.html": """<!-- Trigger requires JS to capture right click and position, but HTMX can handle actions -->
<div class="fixed hidden bg-popover border border-border shadow-md rounded-md p-1 min-w-[8rem] z-50 text-sm" id="{id}">
  {menu_items}
</div>""",

    "data-table.html": """<div class="rounded-md border border-border overflow-auto">
  <table class="w-full text-sm text-left">
    <thead class="bg-muted text-muted-foreground h-10">
      <tr>{headers}</tr>
    </thead>
    <tbody hx-confirm="Are you sure?" hx-target="closest tr" hx-swap="outerHTML swap:1s">
      {rows}
    </tbody>
  </table>
</div>""",

    "date-picker.html": """<input type="date" name="{name}" class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />""",

    "divider.html": """<div class="w-full h-px bg-border my-4" role="separator"></div>""",

    "empty-state.html": """<div class="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-border rounded-lg bg-muted/20">
  <div class="mb-4 text-muted-foreground">{icon}</div>
  <h3 class="text-lg font-semibold">{title}</h3>
  <p class="text-sm text-muted-foreground mb-4">{description}</p>
  {action}
</div>""",

    "error-message.html": """<p class="text-sm font-medium text-destructive mt-1">{message}</p>""",

    "form.html": """<form hx-post="{submit_url}" hx-target="{target}" class="space-y-6">
  {fields}
  <button type="submit" class="w-full inline-flex justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">Submit</button>
</form>""",

    "hover-card.html": """<div class="group relative inline-block">
  <span class="cursor-help underline decoration-dotted">{trigger}</span>
  <div class="absolute bottom-full left-1/2 z-50 mb-2 hidden w-64 -translate-x-1/2 rounded-md border border-border bg-popover p-4 shadow-md group-hover:block animate-in fade-in-0 zoom-in-95">
    {content}
  </div>
</div>""",

    "icon.html": """<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="{classes}"><path d="{path}"/></svg>""",

    "image.html": """<img src="{src}" alt="{alt}" loading="lazy" class="rounded-md object-cover transition-all hover:scale-105 {classes}" />""",

    "indicator.html": """<span class="relative flex h-3 w-3">
  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
  <span class="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
</span>""",

    "input.html": """<input type="{type}" name="{name}" placeholder="{placeholder}" value="{value}" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" />""",

    "input-otp.html": """<div class="flex gap-2 justify-center" id="{id}">
  <!-- Typical implementation uses a hidden actual input and visual boxes -->
  <input type="text" maxlength="1" class="w-10 h-12 text-center text-lg border border-input rounded-md focus:ring-2 focus:ring-ring" />
  <input type="text" maxlength="1" class="w-10 h-12 text-center text-lg border border-input rounded-md focus:ring-2 focus:ring-ring" />
  <input type="text" maxlength="1" class="w-10 h-12 text-center text-lg border border-input rounded-md focus:ring-2 focus:ring-ring" />
  <input type="text" maxlength="1" class="w-10 h-12 text-center text-lg border border-input rounded-md focus:ring-2 focus:ring-ring" />
</div>""",

    "kbd.html": """<kbd class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">{key}</kbd>""",

    "label.html": """<label for="{for_id}" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{text}</label>""",

    "link.html": """<a href="{url}" hx-boost="true" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80">{text}</a>""",

    "list.html": """<ul class="my-6 ml-6 list-disc [&>li]:mt-2">
  {items}
</ul>""",

    "list-item.html": """<li class="text-sm text-foreground">{content}</li>""",

    "loading-spinner.html": """<svg class="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
</svg>""",

    "masonry-grid.html": """<div class="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
  {items} <!-- Items must have break-inside-avoid class -->
</div>""",

    "menubar.html": """<div class="flex h-10 items-center space-x-1 rounded-md border border-border bg-background p-1">
  {menus}
</div>""",

    "message-bubble.html": """<div class="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm {is_sender ? 'ml-auto bg-primary text-primary-foreground' : 'bg-muted'}">
  {message}
</div>""",

    "navigation-menu.html": """<nav class="relative z-10 flex max-w-max flex-1 items-center justify-center">
  <ul class="group flex flex-1 list-none items-center justify-center space-x-1">
    {items}
  </ul>
</nav>""",

    "notification.html": """<div class="fixed bottom-4 right-4 z-50 flex max-w-sm flex-col gap-2 rounded-lg border border-border bg-background p-4 shadow-lg animate-in slide-in-from-bottom-5">
  <div class="flex items-start gap-4">
    <div class="flex-1">
      <h3 class="text-sm font-semibold">{title}</h3>
      <p class="text-sm text-muted-foreground">{description}</p>
    </div>
    <button hx-on:click="this.closest('div.fixed').remove()" class="text-muted-foreground hover:text-foreground">✕</button>
  </div>
</div>"""
}

base_path = r"d:\@AIWorkspace\Apps & Tools\HTMXUI\views\components"

for filename, content in components.items():
    with open(os.path.join(base_path, filename), "w", encoding="utf-8") as f:
        f.write(content)

print(f"Generated {len(components)} components.")
