package main

import (
	"github.com/hyperlibs/htmxui/go/components"
	"github.com/hyperlibs/htmxui/go/htmxui"
)

func main() {
	app := htmxui.New()

	app.GET("/", func(c *htmxui.Context) error {
		return c.Render(components.Page(components.PageProps{
			Title: "Operations Cockpit",
			Sidebar: components.NavMenu([]components.NavItem{
				{Label: "📊 Telemetry Dashboard", Route: "/", Active: true},
				{Label: "👥 System Users", Route: "/users"},
				{Label: "⚙️ Settings", Route: "/settings"},
			}),
			Body: components.VStack(
				components.Header("Operations Cockpit", "High-concurrency systems monitoring & hypermedia control center"),
				components.HStack(
					components.StatCard(components.StatCardProps{
						Title:    "Active Goroutines",
						Value:    "1,420",
						Trend:    "+12.4%",
						Subtitle: "Multi-threaded worker pool",
					}),
					components.StatCard(components.StatCardProps{
						Title:    "Throughput",
						Value:    "48.2k req/s",
						Trend:    "+5.8%",
						Subtitle: "P99 latency: 0.8ms",
					}),
					components.StatCard(components.StatCardProps{
						Title:    "Memory Footprint",
						Value:    "14.2 MB",
						Trend:    "Stable",
						Subtitle: "Single static binary",
					}),
				),
				components.DataTable(components.DataTableProps{
					ID:         "cluster-nodes",
					Searchable: true,
					Columns:    []string{"Node ID", "Cluster Region", "Status", "Load Avg"},
					Rows: [][]string{
						{"node-us-east-1", "Virginia (AWS)", "Healthy", "0.14"},
						{"node-eu-west-1", "Frankfurt (Hetzner)", "Healthy", "0.22"},
						{"node-ap-south-1", "Mumbai (DigitalOcean)", "Healthy", "0.08"},
						{"node-jp-east-1", "Tokyo (GCP)", "Healthy", "0.31"},
					},
					Actions: []components.Action{
						{Label: "Restart", Route: "/nodes/restart", Confirm: true},
						{Label: "Logs", Route: "/nodes/logs"},
					},
				}),
			),
		}))
	})

	app.Listen(":8080")
}
