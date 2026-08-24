import re

def render_month(title, offset, days, is_reactive=False, selected=None, range_start=None, range_end=None, range_active=False):
    month_map = {"Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06", "Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12",
                 "January": "01", "February": "02", "March": "03", "April": "04", "May": "05", "June": "06", "July": "07", "August": "08", "September": "09", "October": "10", "November": "11", "December": "12"}
    month_name, year = title.split(" ")
    month_num = month_map[month_name]
    
    html = f"""<div class="inline-block p-3 border border-border rounded-md bg-background shadow-sm select-none">
  <div class="flex justify-between items-center mb-4"><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">◀</button><div class="font-medium text-sm">{title}</div><button class="p-1 hover:bg-accent rounded text-sm text-muted-foreground">▶</button></div>
  <div class="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs">
  <span class="p-1.5 text-muted-foreground font-medium">Su</span><span class="p-1.5 text-muted-foreground font-medium">Mo</span><span class="p-1.5 text-muted-foreground font-medium">Tu</span><span class="p-1.5 text-muted-foreground font-medium">We</span><span class="p-1.5 text-muted-foreground font-medium">Th</span><span class="p-1.5 text-muted-foreground font-medium">Fr</span><span class="p-1.5 text-muted-foreground font-medium">Sa</span>\n"""
    
    # offset
    prev_days = 31
    for i in range(offset):
        html += f'  <span class="p-1.5 text-muted-foreground/30">{prev_days - offset + i + 1}</span>\n'
        
    for d in range(1, days + 1):
        day_str = f"{d:02d}"
        date_str = f"{year}-{month_num}-{day_str}"
        display_date = f"{d:02d}-{month_name[:3]}-{year}"
        
        if is_reactive:
            action = f"active = '{display_date}'; activeVal = '{date_str}';"
            dbl_action = f"if (!start || (start && end)) {{ start = '{date_str}'; startDisp = '{display_date}'; end = null; endDisp = null; }} else {{ end = '{date_str}'; endDisp = '{display_date}'; if (end < start) {{ let temp = start; start = end; end = temp; let tempD = startDisp; startDisp = endDisp; endDisp = tempD; }} }}"
            
            hx_class = f"""{{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/90': activeVal === '{date_str}' && !start,
              'bg-primary text-primary-foreground font-bold rounded-r-none': start === '{date_str}' && start !== end,
              'bg-primary text-primary-foreground font-bold rounded-l-none': end === '{date_str}' && start !== end,
              'bg-primary text-primary-foreground font-bold': start === '{date_str}' && end === '{date_str}',
              'bg-primary/20 text-foreground rounded-none': start && end && '{date_str}' > start && '{date_str}' < end,
              'hover:bg-accent hover:text-accent-foreground text-foreground': activeVal !== '{date_str}' && start !== '{date_str}' && end !== '{date_str}' && !(start && end && '{date_str}' > start && '{date_str}' < end)
            }}"""
            
            html += f'  <span class="p-1.5 rounded cursor-pointer transition-colors" hx-action="{action}" hx-action-dblclick="{dbl_action}" hx-class="{hx_class}">{d}</span>\n'
        else:
            classes = "p-1.5 rounded cursor-pointer transition-colors "
            if selected == d:
                classes += "bg-primary text-primary-foreground font-bold hover:bg-primary/90"
            elif range_start == d:
                classes += "bg-primary text-primary-foreground font-bold rounded-r-none"
            elif range_end == d:
                classes += "bg-primary text-primary-foreground font-bold rounded-l-none"
            elif range_start and range_end and range_start < d < range_end:
                classes += "bg-primary/20 text-foreground rounded-none"
            elif range_active:
                classes += "bg-primary/20 text-foreground rounded-none"
            else:
                classes += "hover:bg-accent hover:text-accent-foreground text-foreground"
            html += f'  <span class="{classes}">{d}</span>\n'
            
    # remaining to fill 42 cells (6 rows)
    total_cells = offset + days
    remaining = 42 - total_cells
    for i in range(1, remaining + 1):
        html += f'  <span class="p-1.5 text-muted-foreground/30">{i}</span>\n'
        
    html += "  </div>\n</div>"
    return html

calendar_demo = f"""<section class="space-y-12">
  
  <div>
    <h4 class="text-sm font-medium mb-4 text-muted-foreground">Simple Calendar - Selected Date</h4>
    {render_month("August 2026", 6, 31, selected=24)}
  </div>

  <div>
    <h4 class="text-sm font-medium mb-4 text-muted-foreground">Long Calendar - 3 Month View</h4>
    <div class="flex flex-wrap gap-6">
        {render_month("July 2026", 3, 31, selected=15)}
        {render_month("August 2026", 6, 31)}
        {render_month("September 2026", 2, 30)}
    </div>
  </div>

  <div hx-ext="reactive" hx-state="{{ active: null, activeVal: null, start: null, startDisp: null, end: null, endDisp: null }}">
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
        {render_month("October 2026", 4, 31, is_reactive=True)}
        {render_month("November 2026", 0, 30, is_reactive=True)}
    </div>
  </div>

  <div>
    <h4 class="text-sm font-medium mb-4 text-muted-foreground">Year Calendar - 4x3 Month View</h4>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {render_month("Jan 2027", 5, 31)}
        {render_month("Feb 2027", 1, 28)}
        {render_month("Mar 2027", 1, 31)}
        {render_month("Apr 2027", 4, 30)}
        {render_month("May 2027", 6, 31)}
        {render_month("Jun 2027", 2, 30)}
        {render_month("Jul 2027", 4, 31)}
        {render_month("Aug 2027", 0, 31)}
        {render_month("Sep 2027", 3, 30)}
        {render_month("Oct 2027", 5, 31)}
        {render_month("Nov 2027", 1, 30)}
        {render_month("Dec 2027", 3, 31)}
    </div>
  </div>
  
  <div>
    <h4 class="text-sm font-medium mb-4 text-muted-foreground">Year Calendar - 3x4 Month View</h4>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {render_month("Jan 2028", 6, 31)}
        {render_month("Feb 2028", 2, 29)}
        {render_month("Mar 2028", 3, 31)}
        {render_month("Apr 2028", 6, 30)}
        {render_month("May 2028", 1, 31)}
        {render_month("Jun 2028", 4, 30)}
        {render_month("Jul 2028", 6, 31)}
        {render_month("Aug 2028", 2, 31)}
        {render_month("Sep 2028", 5, 30)}
        {render_month("Oct 2028", 0, 31)}
        {render_month("Nov 2028", 3, 30)}
        {render_month("Dec 2028", 5, 31)}
    </div>
  </div>

</section>"""

with open("demos.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Replace the calendar section
pattern = r'"calendar": `.*?`,'
replacement = f'"calendar": `{calendar_demo}`,'

new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open("demos.ts", "w", encoding="utf-8") as f:
    f.write(new_content)

print("Updated demos.ts with reactive calendar")
