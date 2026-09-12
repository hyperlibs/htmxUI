import os

components = {
    "number-input.html": """<div class="flex flex-col space-y-1.5">
  <label for="{id}" class="text-sm font-medium leading-none">{label}</label>
  <input type="number" id="{id}" name="{name}" min="{min}" max="{max}" step="{step}" value="{value}" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" hx-post="{update_url}" hx-trigger="change" />
</div>""",

    "password-input.html": """<div class="relative">
  <input type="password" id="{id}" name="{name}" placeholder="••••••••" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" />
  <!-- A true zero-JS toggle would require a sibling checkbox hack, but for HTMXUI we supply the input structural shell -->
  <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label="Toggle password visibility">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
  </button>
</div>""",

    "pin-input.html": """<div class="flex items-center gap-2" id="{id}">
  <input type="text" maxlength="1" class="w-10 h-12 text-center text-lg font-semibold border border-input bg-background rounded-md shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
  <input type="text" maxlength="1" class="w-10 h-12 text-center text-lg font-semibold border border-input bg-background rounded-md shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
  <input type="text" maxlength="1" class="w-10 h-12 text-center text-lg font-semibold border border-input bg-background rounded-md shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
  <span class="text-muted-foreground">-</span>
  <input type="text" maxlength="1" class="w-10 h-12 text-center text-lg font-semibold border border-input bg-background rounded-md shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
  <input type="text" maxlength="1" class="w-10 h-12 text-center text-lg font-semibold border border-input bg-background rounded-md shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
  <input type="text" maxlength="1" class="w-10 h-12 text-center text-lg font-semibold border border-input bg-background rounded-md shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
</div>""",

    "radio-button.html": """<label class="flex items-center space-x-2 cursor-pointer">
  <input type="radio" name="{name}" value="{value}" class="peer h-4 w-4 shrink-0 rounded-full border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 accent-primary" {checked} hx-post="{select_url}" hx-trigger="change" />
  <span class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{label}</span>
</label>""",

    "radio-group.html": """<fieldset class="grid gap-2" hx-post="{update_url}" hx-trigger="change" hx-target="{target}">
  <legend class="text-sm font-semibold mb-2">{title}</legend>
  {radio_buttons}
</fieldset>""",

    "rating.html": """<div class="flex items-center gap-1 text-muted-foreground hover:[&>svg]:text-primary cursor-pointer" hx-post="{rate_url}" hx-trigger="click target:svg">
  <!-- Rating stars (5 stars pattern) -->
  <svg class="h-5 w-5 hover:fill-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-value="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  <svg class="h-5 w-5 hover:fill-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-value="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  <svg class="h-5 w-5 hover:fill-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-value="3"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  <svg class="h-5 w-5 hover:fill-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-value="4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  <svg class="h-5 w-5 hover:fill-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-value="5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
</div>""",

    "search-input.html": """<div class="relative flex items-center">
  <svg class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  <input type="search" placeholder="Search..." class="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" hx-post="{search_url}" hx-trigger="keyup changed delay:500ms, search" hx-target="{target}" />
</div>""",

    "select.html": """<div class="flex flex-col space-y-1.5">
  <label for="{id}" class="text-sm font-medium">{label}</label>
  <select id="{id}" name="{name}" class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50" hx-post="{update_url}" hx-trigger="change">
    <option value="" disabled selected>{placeholder}</option>
    {options}
  </select>
</div>""",

    "slider.html": """<div class="flex w-full items-center space-x-4">
  <input type="range" name="{name}" min="{min}" max="{max}" step="{step}" value="{value}" class="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary" hx-post="{update_url}" hx-trigger="change" />
  <span class="text-sm font-medium text-foreground w-8 text-right">{value}</span>
</div>""",

    "slider-range.html": """<div class="flex flex-col space-y-2 w-full">
  <div class="flex justify-between text-sm font-medium">
    <span>{min_val}</span>
    <span>{max_val}</span>
  </div>
  <!-- Note: HTML5 native dual-thumb sliders don't exist without JS. This simulates it structurally for backend fallback -->
  <div class="relative h-2 w-full bg-secondary rounded-full">
    <div class="absolute h-full bg-primary rounded-full" style="left: 20%; right: 40%;"></div>
    <input type="range" min="0" max="100" value="20" class="absolute w-full h-2 opacity-0 cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto" />
    <input type="range" min="0" max="100" value="60" class="absolute w-full h-2 opacity-0 cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto" />
  </div>
</div>""",

    "switch.html": """<label class="flex items-center space-x-2 cursor-pointer">
  <!-- Checkbox Hack for Switch -->
  <div class="relative inline-block w-11 h-6 align-middle select-none transition duration-200 ease-in">
    <input type="checkbox" name="{name}" id="{id}" class="peer absolute block w-6 h-6 rounded-full bg-background border-4 border-input appearance-none cursor-pointer transition-transform duration-200 ease-in-out checked:translate-x-full checked:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" {checked} hx-post="{toggle_url}" hx-trigger="change" />
    <label for="{id}" class="block overflow-hidden h-6 rounded-full bg-input cursor-pointer peer-checked:bg-primary"></label>
  </div>
  <span class="text-sm font-medium text-foreground">{label}</span>
</label>""",

    "textarea.html": """<div class="flex flex-col space-y-1.5">
  <label for="{id}" class="text-sm font-medium">{label}</label>
  <textarea id="{id}" name="{name}" placeholder="{placeholder}" rows="{rows}" class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" hx-post="{update_url}" hx-trigger="keyup changed delay:500ms">{value}</textarea>
</div>""",

    "toggle.html": """<label class="inline-flex cursor-pointer">
  <input type="checkbox" class="peer hidden" name="{name}" {checked} hx-post="{update_url}" hx-trigger="change" />
  <div class="inline-flex h-10 items-center justify-center rounded-md bg-transparent px-3 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground peer-checked:bg-accent peer-checked:text-accent-foreground peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring">
    {icon_or_text}
  </div>
</label>""",

    "toggle-group.html": """<div class="inline-flex items-center justify-center rounded-md bg-muted p-1 text-muted-foreground" hx-post="{update_url}" hx-trigger="change" hx-target="{target}">
  <!-- Uses radio buttons disguised as toggles for single-choice group -->
  <label class="cursor-pointer">
    <input type="radio" name="{name}" value="{val1}" class="peer hidden" checked />
    <div class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all peer-checked:bg-background peer-checked:text-foreground peer-checked:shadow-sm">
      {label1}
    </div>
  </label>
  <label class="cursor-pointer">
    <input type="radio" name="{name}" value="{val2}" class="peer hidden" />
    <div class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all peer-checked:bg-background peer-checked:text-foreground peer-checked:shadow-sm">
      {label2}
    </div>
  </label>
</div>""",

    "date-range-picker.html": """<div class="flex items-center space-x-2">
  <input type="date" name="{start_name}" class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
  <span class="text-muted-foreground">to</span>
  <input type="date" name="{end_name}" class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
</div>""",

    "time-picker.html": """<div class="flex items-center">
  <input type="time" name="{name}" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
</div>"""
}

base_path = r"d:\@AIWorkspace\Apps & Tools\HTMXUI\views\components"

for filename, content in components.items():
    with open(os.path.join(base_path, filename), "w", encoding="utf-8") as f:
        f.write(content)

print(f"Generated {len(components)} Inputs & Controls components.")
