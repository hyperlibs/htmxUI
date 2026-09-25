package components

import (
	"fmt"
	"strings"
)

// --- 15% FLUTTER: ShellUI Layout & Navigation Hierarchy ---

type ShellUIProps struct {
	Title    string
	Mode     string // "mobile" | "game"
	AppBar   Component
	Segments []Component
	NavBar   Component
}

func ShellUI(p ShellUIProps) Component {
	var sb strings.Builder
	modeAttr := ""
	if p.Mode != "" {
		modeAttr = fmt.Sprintf(`mode="%s"`, p.Mode)
	}

	sb.WriteString(fmt.Sprintf(`<!DOCTYPE html>
<html lang="en" class="h-full bg-slate-950 text-slate-100 select-none">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <title>%s — Appz</title>
  <script src="https://unpkg.com/htmx.org@2.0.4"></script>
  <script src="/htmx-bolt.js"></script>
  <script src="/appz.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { padding-top: env(safe-area-inset-top); padding-bottom: env(safe-area-inset-bottom); }
  </style>
</head>
<body class="h-full flex flex-col antialiased overflow-hidden">
  <app-shellui %s class="flex-1 flex flex-col relative overflow-hidden">
    %s
    <main class="flex-1 overflow-y-auto flex flex-col relative">`, p.Title, modeAttr, p.AppBar.Render()))

	for _, seg := range p.Segments {
		sb.WriteString(seg.Render())
	}

	sb.WriteString(fmt.Sprintf(`
    </main>
    %s
  </app-shellui>
</body>
</html>`, p.NavBar.Render()))

	return Component{html: sb.String()}
}

// --- Top AppBar ---

type AppBarProps struct {
	Title      string
	BackAction string
	Actions    []Component
}

func AppBar(p AppBarProps) Component {
	backBtn := ""
	if p.BackAction != "" {
		backBtn = fmt.Sprintf(`<button hx-action="%s" class="p-2 -ml-2 rounded-full hover:bg-slate-800 text-slate-300">←</button>`, p.BackAction)
	}
	var actionsSb strings.Builder
	for _, a := range p.Actions {
		actionsSb.WriteString(a.Render())
	}

	html := fmt.Sprintf(`
<app-bar class="h-14 bg-slate-900/90 backdrop-blur border-b border-slate-800/80 px-4 flex items-center justify-between shrink-0 z-50">
  <div class="flex items-center gap-2">
    %s
    <h1 class="font-bold text-base text-white tracking-tight">%s</h1>
  </div>
  <div class="flex items-center gap-2">
    %s
  </div>
</app-bar>`, backBtn, p.Title, actionsSb.String())

	return Component{html: html}
}

// --- 15% KOTLIN: 0-9 Photoshop-style Segment & Layer Stacking ---

type SegmentProps struct {
	ID     string
	Class  string
	Layers []Component
}

func Segment(p SegmentProps) Component {
	var sb strings.Builder
	idAttr := ""
	if p.ID != "" {
		idAttr = fmt.Sprintf(`id="%s"`, p.ID)
	}
	sb.WriteString(fmt.Sprintf(`<app-seg %s class="relative %s">`, idAttr, p.Class))
	for _, l := range p.Layers {
		sb.WriteString(l.Render())
	}
	sb.WriteString(`</app-seg>`)
	return Component{html: sb.String()}
}

func Layer(level int, child Component) Component {
	clamped := level
	if clamped < 0 {
		clamped = 0
	}
	if clamped > 9 {
		clamped = 9
	}
	html := fmt.Sprintf(`<app-layer level="%d" style="z-index: %d;" class="relative">%s</app-layer>`, clamped, clamped*10, child.Render())
	return Component{html: html}
}

// --- Bottom Navigation Bar ---

type NavBarProps struct {
	Mode     string // "sticky" | "float"
	Behavior string // "hide-on-scroll" | "always-visible"
	Active   string
	Items    []NavItem
}

func NavBar(p NavBarProps) Component {
	var sb strings.Builder
	modeClass := "bg-slate-900 border-t border-slate-800"
	if p.Mode == "float" {
		modeClass = "mx-4 mb-4 rounded-2xl bg-slate-900/90 backdrop-blur-lg border border-slate-700/60 shadow-2xl"
	}

	sb.WriteString(fmt.Sprintf(`<app-navbar mode="%s" behavior="%s" class="h-16 px-4 flex items-center justify-around shrink-0 %s">`, p.Mode, p.Behavior, modeClass))
	for _, it := range p.Items {
		activeClass := "text-slate-400"
		if it.Active || it.Label == p.Active {
			activeClass = "text-indigo-400 font-bold"
		}
		sb.WriteString(fmt.Sprintf(`<a href="%s" class="flex flex-col items-center gap-1 text-[10px] %s"><span>%s</span><span>%s</span></a>`, it.Route, activeClass, it.Icon, it.Label))
	}
	sb.WriteString(`</app-navbar>`)
	return Component{html: sb.String()}
}

// --- Game HUD & Joysticks ---

type GameCanvasProps struct {
	Engine string // "webgpu" | "webgl2"
	Src    string
}

func GameCanvas(p GameCanvasProps) Component {
	return Component{html: fmt.Sprintf(`<app-gamecanvas engine="%s" src="%s" class="w-full h-full block"></app-gamecanvas>`, p.Engine, p.Src)}
}

type JoystickProps struct {
	ID      string
	Channel string
	Size    int
}

func Joystick(p JoystickProps) Component {
	if p.Size == 0 {
		p.Size = 100
	}
	if p.Channel == "" {
		p.Channel = "game:joystick"
	}
	return Component{html: fmt.Sprintf(`
<app-joystick id="%s" hx-chan-send="%s" style="width: %dpx; height: %dpx;" 
  class="rounded-full bg-slate-800/60 border-2 border-indigo-500/40 backdrop-blur flex items-center justify-center touch-none">
  <div class="w-10 h-10 rounded-full bg-indigo-500 shadow-lg pointer-events-none"></div>
</app-joystick>`, p.ID, p.Channel, p.Size, p.Size)}
}
