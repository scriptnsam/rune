package handlers

import (
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/scriptnsam/rune/ingest/types"
	"github.com/scriptnsam/rune/ingest/worker"
)

func InjestLog(c fiber.Ctx) error {
	var logEntry types.IncomingLog
	if err := c.Bind().Body(&logEntry); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid JSON", "details": err.Error()})
	}

	if logEntry.ProjectID == "" || logEntry.Message == "" {
		return c.Status(400).JSON(fiber.Map{"error": "Missing project_id or message"})
	}

	// Default to "info" if missing
	if logEntry.Severity == "" {
		logEntry.Severity = "info"
	}

	if logEntry.Timestamp.IsZero() {
		logEntry.Timestamp = time.Now()
	}

	select {
	case worker.LogChannel <- logEntry:
		// Success
		return c.Status(202).JSON(fiber.Map{"status": "accepted"})
	default:
		// If channel is full (10,000 logs pending), drop it to save the server.
		// Load Shedding! crucial for system stability.
		return c.Status(500).JSON(fiber.Map{"error": "System overloaded, try again later"})
	}
}
