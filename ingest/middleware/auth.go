package middleware

import (
	"github.com/gofiber/fiber/v3"

	"github.com/scriptnsam/rune/ingest/cache"
)

func Protect(c fiber.Ctx) error {
	apiKey := c.Get("x-api-key")
	if apiKey == "" {
		return c.Status(401).JSON(fiber.Map{"error": "Missing x-api-key header"})
	}

	// Check Memory Cache
	projectID, exists := cache.Projects.GetProjectID(apiKey)
	if !exists {
		return c.Status(403).JSON(fiber.Map{"error": "Invalid api key"})
	}

	c.Locals("projectID", projectID)
	return c.Next()
}
