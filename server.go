package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"
)

var gettingStarted = []string{
	"introduction", "installation", "rosetta-stone", "common-ai-hallucinations", "directives-guide",
}

var componentsList = []string{
	"accordion", "alert", "alert-dialog", "aspect-ratio", "avatar", "avatar-group", "badge", "banner",
	"breadcrumb", "button", "button-group", "calendar", "card", "carousel", "checkbox", "checkbox-group",
	"chip", "collapsible", "color-picker", "combobox", "command", "container", "context-menu", "data-table",
	"date-picker", "dialog", "divider", "drawer", "dropdown-menu", "empty-state", "error-message",
	"file-upload", "flash-search", "form", "hover-card", "icon", "image", "indicator", "input", "input-otp", "kbd", "label",
	"layout-block", "layout-canvas", "layout-grid", "layout-page", "layout-print", "layout-scaffold", "layout-web", "layout-mweb", "layout-mapp",
	"link", "list", "list-item", "loading-spinner", "masonry-grid", "menubar", "message-bubble",
	"navigation-menu", "notification", "number-input", "page-header", "pagination", "panel",
	"password-input", "pin-input", "popover", "profile-badge", "progress", "progress-bar", "pulse",
	"radio-button", "radio-group", "rating", "resizable", "ribbon", "scroll-area", "search-input",
	"select", "separator", "sheet", "sidebar", "skeleton", "slider", "slider-range", "snackbar", "splitter",
	"stat-card", "stepper", "submenu", "switch", "table", "tabs", "tag", "text", "textarea", "timeline",
	"time-picker", "toast", "toggle", "toggle-group", "toggle-switch", "toolbar", "tooltip", "tree-view", "user-card",
	"video-player", "watermark", "wizard", "hx-wizard", "date-range-picker", "hx-grid", "hx-virtual", "hx-offline", "hollywood-webfx",
}

func formatName(slug string) string {
	parts := strings.Split(slug, "-")
	for i, p := range parts {
		if len(p) > 0 {
			parts[i] = strings.ToUpper(p[:1]) + p[1:]
		}
	}
	return strings.Join(parts, " ")
}

func buildSidebar(active string) string {
	var sb strings.Builder
	sb.WriteString(`<div class="mb-6"><h4 class="mb-2 px-3 text-sm font-semibold tracking-tight">Getting Started</h4><div class="space-y-1">`)
	for _, c := range gettingStarted {
		isActive := c == active
		activeClass := "text-muted-foreground hover:text-foreground hover:bg-accent/50"
		if isActive {
			activeClass = "bg-accent font-medium text-accent-foreground"
		}
		sb.WriteString(fmt.Sprintf(`<a href="/docs/components/%s" class="block rounded-md px-3 py-1.5 text-sm %s transition-colors">%s</a>`+"\n", c, activeClass, formatName(c)))
	}
	sb.WriteString(`</div></div><div><h4 class="mb-2 px-3 text-sm font-semibold tracking-tight">Components</h4><div class="space-y-1">`)
	for _, c := range componentsList {
		isActive := c == active
		activeClass := "text-muted-foreground hover:text-foreground hover:bg-accent/50"
		if isActive {
			activeClass = "bg-accent font-medium text-accent-foreground"
		}
		sb.WriteString(fmt.Sprintf(`<a href="/docs/components/%s" class="block rounded-md px-3 py-1.5 text-sm %s transition-colors">%s</a>`+"\n", c, activeClass, formatName(c)))
	}
	sb.WriteString(`</div></div>`)
	return sb.String()
}

func escapeHTML(s string) string {
	s = strings.ReplaceAll(s, "&", "&amp;")
	s = strings.ReplaceAll(s, "<", "&lt;")
	s = strings.ReplaceAll(s, ">", "&gt;")
	s = strings.ReplaceAll(s, "\"", "&quot;")
	return s
}

func buildComponentPage(slug string) string {
	name := formatName(slug)
	sidebar := buildSidebar(slug)
	filePath := filepath.Join("views", "components", slug+".html")
	sourceBytes, err := os.ReadFile(filePath)
	sourceHTML := "<!-- Component source not found -->"
	if err == nil {
		sourceHTML = string(sourceBytes)
	}

	return fmt.Sprintf(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>%s — HTMXUI (Go Engine)</title>
  <script src="https://unpkg.com/htmx.org@2.0.4" crossorigin="anonymous"></script>
  <script src="/htmx-bolt.js"></script>
  <script src="/htmx-flash.js"></script>
  <script src="/htmx-form.js"></script>
  <script src="/htmx-vibe.js"></script>
  <script src="/htmx-a11y.js"></script>
  <script src="/htmx-virtual.js"></script>
  <script src="/htmx-grid.js"></script>
  <script src="/htmx-offline.js"></script>
  <script src="/htmx-devtools.js"></script>
  <script src="/htmx-canvas.js"></script>
  <link rel="stylesheet" href="/styles.css">
  <style>
    .code-block { background: #1e293b; color: #e2e8f0; border-radius: 0.5rem; padding: 1rem; overflow-x: auto; font-size: 0.8rem; line-height: 1.6; }
    .code-block code { font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace; }
  </style>
</head>
<body class="bg-background text-foreground antialiased min-h-screen">
  <div class="flex min-h-screen">
    <aside id="doc-sidebar" class="hidden lg:flex w-60 flex-col border-r border-border bg-card overflow-y-auto sticky top-0 h-screen">
      <div class="flex h-14 items-center border-b border-border px-4">
        <a href="/" class="flex items-center gap-2">
          <svg class="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
          <span class="font-bold text-lg tracking-tight">HTMXUI</span>
        </a>
      </div>
      <div class="flex-1 p-3 overflow-y-auto">%s</div>
    </aside>
    <main class="flex-1 flex flex-col min-w-0">
      <header class="h-14 border-b border-border flex items-center justify-between px-6 bg-card sticky top-0 z-30">
        <div class="flex items-center gap-4">
          <h1 class="font-semibold text-base">%s</h1>
          <a href="/demo" class="text-xs bg-primary/10 text-primary font-medium px-2.5 py-1 rounded-full hover:bg-primary/20 transition-colors">Live Demos Hub</a>
        </div>
        <a href="https://github.com/hyperlibs/htmxUI" target="_blank" class="text-xs text-muted-foreground hover:text-foreground">GitHub ↗</a>
      </header>
      <div class="flex-1 p-8 max-w-5xl mx-auto w-full space-y-8">
        <div class="space-y-2">
          <h1 class="text-3xl font-extrabold tracking-tight">%s</h1>
          <p class="text-muted-foreground text-sm">Interactive Shadcn-quality hypermedia component for HTMXUI.</p>
        </div>
        <div class="rounded-xl border border-border bg-card p-6 shadow-sm overflow-hidden">
          %s
        </div>
        <div class="space-y-3">
          <h2 class="text-lg font-bold tracking-tight">Source Code</h2>
          <div class="code-block"><code><pre class="whitespace-pre-wrap">%s</pre></code></div>
        </div>
      </div>
    </main>
  </div>
</body>
</html>`, name, sidebar, name, name, sourceHTML, escapeHTML(sourceHTML))
}

type Invoice struct {
	ID       string `json:"id"`
	Customer string `json:"customer"`
	Amount   string `json:"amount"`
	Status   string `json:"status"`
	Date     string `json:"date"`
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	customers := []string{"Acme Corp", "Globex LLC", "Initech", "Umbrella Co", "Stark Industries", "Wayne Enterprises", "Cyberdyne", "Soylent Corp"}
	statuses := []string{"Paid", "Pending", "Overdue", "Draft", "Processing"}

	mux := http.NewServeMux()

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		p := r.URL.Path
		if len(p) > 1 && strings.HasSuffix(p, "/") {
			p = strings.TrimSuffix(p, "/")
		}

		if p == "" || p == "/" || p == "/index.html" {
			http.ServeFile(w, r, filepath.Join("views", "landing.html"))
			return
		}

		if p == "/demo" || p == "/demos" {
			http.ServeFile(w, r, filepath.Join("views", "demos-hub.html"))
			return
		}

		if p == "/app/tailadmin" || p == "/demo/tailadmin" {
			http.ServeFile(w, r, filepath.Join("views", "app-tailadmin.html"))
			return
		}

		if p == "/app/erp" || p == "/demo/erp" {
			http.ServeFile(w, r, filepath.Join("views", "app-erp.html"))
			return
		}

		if p == "/app/hypersheet" || p == "/demo/hypersheet" {
			http.ServeFile(w, r, filepath.Join("views", "app-hypersheet.html"))
			return
		}

		if p == "/app/universe" || p == "/demo/universe" || p == "/cosmos" {
			http.ServeFile(w, r, filepath.Join("views", "app-universe.html"))
			return
		}

		if p == "/app/mobile" || p == "/demo/mobile" || p == "/mobile" || p == "/appz" {
			http.ServeFile(w, r, filepath.Join("views", "app-mobile.html"))
			return
		}

		if p == "/styles.css" {
			w.Header().Set("Content-Type", "text/css")
			http.ServeFile(w, r, filepath.Join("public", "styles", "output.css"))
			return
		}

		if p == "/api/erp-invoices.json" {
			countStr := r.URL.Query().Get("count")
			count := 10000
			if c, err := strconv.Atoi(countStr); err == nil && c > 0 {
				count = c
			}

			invoices := make([]Invoice, count)
			now := time.Now()
			for i := 0; i < count; i++ {
				invoices[i] = Invoice{
					ID:       fmt.Sprintf("INV-%d", 100000+i),
					Customer: customers[i%len(customers)],
					Amount:   fmt.Sprintf("%.2f", 100.0+rand.Float64()*4900.0),
					Status:   statuses[i%len(statuses)],
					Date:     now.Add(-time.Duration(i) * 24 * time.Hour).Format("2006-01-02"),
				}
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(invoices)
			return
		}

		// Component docs
		if strings.HasPrefix(p, "/docs/components/") {
			slug := strings.TrimPrefix(p, "/docs/components/")
			for _, item := range append(componentsList, gettingStarted...) {
				if item == slug {
					w.Header().Set("Content-Type", "text/html; charset=utf-8")
					fmt.Fprint(w, buildComponentPage(slug))
					return
				}
			}
		}

		if p == "/docs" {
			http.Redirect(w, r, "/docs/components/introduction", http.StatusFound)
			return
		}

		// Public files
		publicFile := filepath.Join("public", filepath.Clean(p))
		if info, err := os.Stat(publicFile); err == nil && !info.IsDir() {
			http.ServeFile(w, r, publicFile)
			return
		}

		http.NotFound(w, r)
	})

	log.Printf("🚀 HTMXUI Pure Go Server running at http://localhost:%s", port)
	if err := http.ListenAndServe(":"+port, mux); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}
