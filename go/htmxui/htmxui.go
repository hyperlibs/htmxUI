package htmxui

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"sync"
	"time"
)

// Context wraps http.ResponseWriter and *http.Request with HTMXUI-specific hypermedia utilities.
type Context struct {
	Response http.ResponseWriter
	Request  *http.Request
}

// HandlerFunc defines the signature for HTMXUI route handlers.
type HandlerFunc func(c *Context) error

// App represents the lightweight HTMXUI Go web application.
type App struct {
	mux      *http.ServeMux
	routes   map[string]map[string]HandlerFunc
	channels map[string]*Channel
	mu       sync.RWMutex
}

// New creates a new HTMXUI App instance.
func New() *App {
	return &App{
		mux:      http.NewServeMux(),
		routes:   make(map[string]map[string]HandlerFunc),
		channels: make(map[string]*Channel),
	}
}

// GET registers a GET route handler.
func (a *App) GET(pattern string, handler HandlerFunc) {
	a.register("GET", pattern, handler)
}

// POST registers a POST route handler.
func (a *App) POST(pattern string, handler HandlerFunc) {
	a.register("POST", pattern, handler)
}

// PUT registers a PUT route handler.
func (a *App) PUT(pattern string, handler HandlerFunc) {
	a.register("PUT", pattern, handler)
}

// DELETE registers a DELETE route handler.
func (a *App) DELETE(pattern string, handler HandlerFunc) {
	a.register("DELETE", pattern, handler)
}

func (a *App) register(method, pattern string, handler HandlerFunc) {
	a.mu.Lock()
	defer a.mu.Unlock()
	if a.routes[pattern] == nil {
		a.routes[pattern] = make(map[string]HandlerFunc)
		a.mux.HandleFunc(pattern, func(w http.ResponseWriter, r *http.Request) {
			a.mu.RLock()
			mHandlers := a.routes[pattern]
			a.mu.RUnlock()
			if h, ok := mHandlers[r.Method]; ok {
				c := &Context{Response: w, Request: r}
				if err := h(c); err != nil {
					http.Error(w, err.Error(), http.StatusInternalServerError)
				}
				return
			}
			http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		})
	}
	a.routes[pattern][method] = handler
}

// ServeHTTP satisfies the standard http.Handler interface.
func (a *App) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	a.mux.ServeHTTP(w, r)
}

// Listen starts the HTTP server on the specified address.
func (a *App) Listen(addr string) error {
	fmt.Printf("🚀 HTMXUI Go Server listening on http://localhost%s\n", addr)
	return http.ListenAndServe(addr, a.mux)
}

// --- Request Inspection Helpers ---

// IsHtmx returns true if the incoming request was sent by HTMXUI.
func (c *Context) IsHtmx() bool {
	return c.Request.Header.Get("HX-Request") == "true"
}

// IsBoosted returns true if the request was triggered via hx-boost.
func (c *Context) IsBoosted() bool {
	return c.Request.Header.Get("HX-Boosted") == "true"
}

// Target returns the ID of the target element (HX-Target header).
func (c *Context) Target() string {
	return c.Request.Header.Get("HX-Target")
}

// Trigger returns the ID/name of the triggering element (HX-Trigger header).
func (c *Context) Trigger() string {
	return c.Request.Header.Get("HX-Trigger")
}

// Prompt returns user response string if triggered by hx-prompt.
func (c *Context) Prompt() string {
	return c.Request.Header.Get("HX-Prompt")
}

// --- Response Helpers ---

// SetTrigger sets the HX-Trigger header to fire a client-side event.
func (c *Context) SetTrigger(event string, payload any) *Context {
	if payload != nil {
		if b, err := json.Marshal(map[string]any{event: payload}); err == nil {
			c.Response.Header().Set("HX-Trigger", string(b))
			return c
		}
	}
	c.Response.Header().Set("HX-Trigger", event)
	return c
}

// SetRetarget overrides the target element ID on the client (HX-Retarget).
func (c *Context) SetRetarget(target string) *Context {
	c.Response.Header().Set("HX-Retarget", target)
	return c
}

// SetReswap overrides the swap strategy on the client (HX-Reswap).
func (c *Context) SetReswap(swap string) *Context {
	c.Response.Header().Set("HX-Reswap", swap)
	return c
}

// SetPushURL pushes a new URL into the browser history (HX-Push-Url).
func (c *Context) SetPushURL(url string) *Context {
	c.Response.Header().Set("HX-Push-Url", url)
	return c
}

// HTML writes a raw HTML string response.
func (c *Context) HTML(html string) error {
	c.Response.Header().Set("Content-Type", "text/html; charset=utf-8")
	_, err := c.Response.Write([]byte(html))
	return err
}

// JSON writes a JSON response payload.
func (c *Context) JSON(data any) error {
	c.Response.Header().Set("Content-Type", "application/json; charset=utf-8")
	return json.NewEncoder(c.Response).Encode(data)
}

// Render renders a Renderable component.
type Renderable interface {
	Render() string
}

func (c *Context) Render(component Renderable) error {
	return c.HTML(component.Render())
}

// --- Concurrent Go Channel to SSE Streaming Bridge ---

// Channel represents an asynchronous Go message channel.
type Channel struct {
	Name      string
	listeners map[chan string]struct{}
	mu        sync.RWMutex
}

// GetChannel gets or creates a named broadcasting channel.
func (a *App) GetChannel(name string) *Channel {
	a.mu.Lock()
	defer a.mu.Unlock()
	if ch, ok := a.channels[name]; ok {
		return ch
	}
	ch := &Channel{
		Name:      name,
		listeners: make(map[chan string]struct{}),
	}
	a.channels[name] = ch
	return ch
}

// Broadcast sends HTML fragment or JSON payload to all active SSE subscribers.
func (ch *Channel) Broadcast(event, data string) {
	ch.mu.RLock()
	defer ch.mu.RUnlock()
	msg := fmt.Sprintf("event: %s\ndata: %s\n\n", event, strings.ReplaceAll(data, "\n", " "))
	for l := range ch.listeners {
		select {
		case l <- msg:
		default:
		}
	}
}

// StreamSSE streams channel events via Server-Sent Events (SSE).
func (ch *Channel) StreamSSE(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")

	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "Streaming unsupported", http.StatusInternalServerError)
		return
	}

	msgChan := make(chan string, 16)
	ch.mu.Lock()
	ch.listeners[msgChan] = struct{}{}
	ch.mu.Unlock()

	defer func() {
		ch.mu.Lock()
		delete(ch.listeners, msgChan)
		ch.mu.Unlock()
		close(msgChan)
	}()

	flusher.Flush()
	notify := r.Context().Done()

	for {
		select {
		case <-notify:
			return
		case msg := <-msgChan:
			fmt.Fprint(w, msg)
			flusher.Flush()
		case <-time.After(15 * time.Second):
			// Keep-alive heartbeat
			fmt.Fprint(w, ": ping\n\n")
			flusher.Flush()
		}
	}
}
