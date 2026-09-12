# 🔌 Backend Wire Protocol & Server Integration Specification

`htmxUI` is 100% backend-agnostic. It requires **zero Node.js, zero NPM, and zero backend libraries**. Any backend that can write HTTP responses or Server-Sent Events (SSE) works instantly.

---

## 📋 The 4 Core Wire Protocols

### 1. Out-of-Band (OOB) Fragment Swaps
To update multiple independent regions of the page in a single HTTP response:
```html
<!-- Main Target Response -->
<div id="status-card" class="p-4 bg-emerald-100 text-emerald-800 rounded">
  Order #4928 Processed
</div>

<!-- Out-of-Band Swaps (appended anywhere in response) -->
<span id="cart-counter" hx-swap-oob="true" class="badge">5</span>
<div id="toast-container" hx-swap-oob="beforeend">
  <div class="toast">Saved successfully!</div>
</div>
```

---

### 2. High-Velocity Sparse Matrix Deltas (`hxMatrixUpdate`)
Stream real-time updates directly into `HxBolt.matrix` and `HxVirtual` grids over SSE with micro-deltas:

**Wire Format**:
```
event: hxMatrixUpdate
data: Δ<row>:<col>:<value>:<flashClass>
```

**Example**:
```
event: hxMatrixUpdate
data: Δ10:3:482.50:bg-emerald-500/20

event: hxMatrixUpdate
data: Δ10:4:+2.4%:text-emerald-600
```

---

### 3. Reactive Signal State Hydration (`hxStateUpdate`)
Push reactive state updates directly to local `hx-state` scopes:

```
event: hxStateUpdate
data: {"target": "#portfolio-summary", "state": {"totalValue": 142500.0, "dailyPnl": 3420.5}}
```

---

### 4. Server-Triggered Client Actions (`HX-Trigger` Header)
Emit custom events to trigger client-side actions without DOM swaps:

```http
HTTP/1.1 200 OK
Content-Type: text/html
HX-Trigger: {"htmx:toast": {"message": "Position Closed", "type": "success"}}
```

---

## 💻 Native Server Implementations (Zero Dependencies)

### 🐹 1. Go (`net/http` + `//go:embed`)

```go
package main

import (
	"embed"
	"fmt"
	"io/fs"
	"net/http"
	"time"
)

//go:embed public/*
var publicFS embed.FS

func main() {
	staticFiles, _ := fs.Sub(publicFS, "public")
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.FS(staticFiles))))

	// Real-Time Matrix SSE Stream
	http.HandleFunc("/api/stream", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/event-stream")
		w.Header().Set("Cache-Control", "no-cache")
		w.Header().Set("Connection", "keep-alive")

		flusher, ok := w.(http.Flusher)
		if !ok {
			http.Error(w, "Streaming unsupported", http.StatusInternalServerError)
			return
		}

		for i := 0; i < 100; i++ {
			// Stream micro-delta to row i, col 2
			fmt.Fprintf(w, "event: hxMatrixUpdate\ndata: Δ%d:2:%.2f:bg-emerald-500/20\n\n", i, 100.0+float64(i)*1.5)
			flusher.Flush()
			time.Sleep(100 * time.Millisecond)
		}
	})

	http.ListenAndServe(":8080", nil)
}
```

---

### 🦀 2. Rust (`axum` Zero-Allocation Stream)

```rust
use axum::{
    response::sse::{Event, KeepAlive, Sse},
    routing::get,
    Router,
};
use futures::stream::{self, Stream};
use std::{convert::Infallible, time::Duration};
use tokio_stream::StreamExt;

async fn stream_matrix() -> Sse<impl Stream<Item = Result<Event, Infallible>>> {
    let stream = stream::repeat_with(|| {
        Event::default()
            .event("hxMatrixUpdate")
            .data("Δ5:2:94.20:text-emerald-500")
    })
    .map(Ok)
    .throttle(Duration::from_millis(50));

    Sse::new(stream).keep_alive(KeepAlive::default())
}

#[tokio::main]
async fn main() {
    let app = Router::new().route("/api/stream", get(stream_matrix));
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
```

---

### 🐍 3. Python (`FastAPI` / `Starlette`)

```python
import asyncio
from fastapi import FastAPI
from fastapi.responses import StreamingResponse

app = FastAPI()

async def matrix_generator():
    for row in range(50):
        # Stream micro-delta
        yield f"event: hxMatrixUpdate\ndata: Δ{row}:1:{row * 10.5}:bg-indigo-500/20\n\n"
        await asyncio.sleep(0.05)

@app.get("/api/stream")
async def stream_endpoint():
    return StreamingResponse(matrix_generator(), media_type="text/event-stream")
```

---

### 🔷 4. .NET / C# (ASP.NET Core Minimal APIs)

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseStaticFiles();

app.MapGet("/api/stream", async (HttpContext ctx) =>
{
    ctx.Response.Headers.Append("Content-Type", "text/event-stream");
    ctx.Response.Headers.Append("Cache-Control", "no-cache");

    for (int i = 0; i < 50; i++)
    {
        await ctx.Response.WriteAsync($"event: hxMatrixUpdate\ndata: Δ{i}:3:{i * 25.0}:text-emerald-500\n\n");
        await ctx.Response.Body.FlushAsync();
        await Task.Delay(50);
    }
});

app.Run();
```
