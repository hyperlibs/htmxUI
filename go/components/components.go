package components

import (
	"fmt"
	"strings"
)

// Component represents any renderable HTML block.
type Component struct {
	html string
}

func (c Component) Render() string {
	return c.html
}

func Raw(html string) Component {
	return Component{html: html}
}

// --- Layout Primitives ---

type PageProps struct {
	Title   string
	Sidebar Component
	Body    Component
}

func Page(p PageProps) Component {
	html := fmt.Sprintf(`<!DOCTYPE html>
<html lang="en" class="h-full bg-slate-950 text-slate-100">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>%s — HTMXUI</title>
  <script src="https://unpkg.com/htmx.org@2.0.4"></script>
  <script src="/htmx-bolt.js"></script>
  <script src="/htmx-flash.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="h-full flex flex-col antialiased">
  <div class="flex-1 flex overflow-hidden">
    %s
    <main class="flex-1 overflow-y-auto p-8 space-y-6">
      %s
    </main>
  </div>
</body>
</html>`, p.Title, p.Sidebar.Render(), p.Body.Render())
	return Component{html: html}
}

func VStack(children ...Component) Component {
	var sb strings.Builder
	sb.WriteString(`<div class="space-y-6">`)
	for _, c := range children {
		sb.WriteString(c.Render())
	}
	sb.WriteString(`</div>`)
	return Component{html: sb.String()}
}

func HStack(children ...Component) Component {
	var sb strings.Builder
	sb.WriteString(`<div class="flex items-center gap-4">`)
	for _, c := range children {
		sb.WriteString(c.Render())
	}
	sb.WriteString(`</div>`)
	return Component{html: sb.String()}
}

// --- Header & Stat Card ---

func Header(title, subtitle string) Component {
	return Component{html: fmt.Sprintf(`
<div>
  <h1 class="text-2xl font-bold tracking-tight text-white">%s</h1>
  <p class="text-sm text-slate-400 mt-1">%s</p>
</div>`, title, subtitle)}
}

type StatCardProps struct {
	Title    string
	Value    string
	Trend    string
	Subtitle string
}

func StatCard(p StatCardProps) Component {
	return Component{html: fmt.Sprintf(`
<div class="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
  <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">%s</p>
  <div class="flex items-baseline justify-between mt-2">
    <p class="text-2xl font-extrabold text-white">%s</p>
    <span class="text-xs font-medium text-emerald-400">%s</span>
  </div>
  <p class="text-xs text-slate-500 mt-1">%s</p>
</div>`, p.Title, p.Value, p.Trend, p.Subtitle)}
}

// --- Data Table with Flash Search & Bolt ---

type Action struct {
	Label   string
	Route   string
	Confirm bool
}

type DataTableProps struct {
	ID         string
	Searchable bool
	Columns    []string
	Rows       [][]string
	Actions    []Action
}

func DataTable(p DataTableProps) Component {
	if p.ID == "" {
		p.ID = "htmxui-datatable"
	}
	var sb strings.Builder
	sb.WriteString(fmt.Sprintf(`<div id="%s" class="space-y-3">`, p.ID))

	if p.Searchable {
		sb.WriteString(fmt.Sprintf(`
  <div class="flex items-center justify-between">
    <input hx-chan-send="%s:filter" placeholder="Search records (0ms)..." 
      class="bg-slate-900 border border-slate-800 text-sm text-white px-3 py-1.5 rounded-lg w-72 focus:outline-none focus:ring-1 focus:ring-indigo-500">
  </div>`, p.ID))
	}

	sb.WriteString(`<div class="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
  <table class="w-full text-left text-sm">
    <thead class="bg-slate-950/60 border-b border-slate-800 text-xs text-slate-400 uppercase">
      <tr>`)
	for _, col := range p.Columns {
		sb.WriteString(fmt.Sprintf(`<th class="px-4 py-3 font-semibold">%s</th>`, col))
	}
	if len(p.Actions) > 0 {
		sb.WriteString(`<th class="px-4 py-3 text-right">Actions</th>`)
	}
	sb.WriteString(`</tr></thead><tbody class="divide-y divide-slate-800/60">`)

	for _, row := range p.Rows {
		sb.WriteString(`<tr class="hover:bg-slate-800/30 transition-colors">`)
		for _, cell := range row {
			sb.WriteString(fmt.Sprintf(`<td class="px-4 py-3 text-slate-300">%s</td>`, cell))
		}
		if len(p.Actions) > 0 {
			sb.WriteString(`<td class="px-4 py-3 text-right space-x-2">`)
			for _, act := range p.Actions {
				confirmAttr := ""
				if act.Confirm {
					confirmAttr = `hx-confirm="Are you sure?"`
				}
				sb.WriteString(fmt.Sprintf(`<button hx-post="%s" %s class="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200">%s</button>`, act.Route, confirmAttr, act.Label))
			}
			sb.WriteString(`</td>`)
		}
		sb.WriteString(`</tr>`)
	}

	sb.WriteString(`</tbody></table></div></div>`)
	return Component{html: sb.String()}
}

// --- Navigation Sidebar ---

type NavItem struct {
	Label  string
	Route  string
	Active bool
	Icon   string
}

func NavMenu(items []NavItem) Component {
	var sb strings.Builder
	sb.WriteString(`<aside class="w-64 bg-slate-900 border-r border-slate-800 p-4 flex flex-col justify-between shrink-0">
  <div class="space-y-6">
    <div class="flex items-center gap-2 px-2">
      <div class="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-sm">H</div>
      <span class="font-bold text-base text-white tracking-tight">HTMXUI <span class="text-xs font-normal text-indigo-400">Go</span></span>
    </div>
    <nav class="space-y-1">`)

	for _, it := range items {
		activeClass := "text-slate-400 hover:bg-slate-800 hover:text-white"
		if it.Active {
			activeClass = "bg-indigo-600/10 text-indigo-400 font-semibold"
		}
		sb.WriteString(fmt.Sprintf(`<a href="%s" class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors %s">%s</a>`, it.Route, activeClass, it.Label))
	}

	sb.WriteString(`</nav></div>
  <div class="px-2 py-3 border-t border-slate-800 text-xs text-slate-500">
    HTMXUI Go Runtime v1.0
  </div>
</aside>`)
	return Component{html: sb.String()}
}
