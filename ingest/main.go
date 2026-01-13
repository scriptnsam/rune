package main

import (
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/logger"
	"github.com/joho/godotenv"

	"github.com/scriptnsam/rune/ingest/db"
	"github.com/scriptnsam/rune/ingest/handlers"
	"github.com/scriptnsam/rune/ingest/worker"
)

func main() {
	// Load environment Variables
	if err := godotenv.Load(); err != nil {
		log.Println("No env file found, relying on systems env vars")
	}

	// Connect database
	if err := db.Connect(); err != nil {
		log.Fatalf("Database connection failed: %v", err)
	}
	defer db.Close()

	// Start Worker
	go worker.StartWorker()

	app := fiber.New(fiber.Config{AppName: "Rune Ingestion Engine v0.1"})

	// Middleware
	app.Use(logger.New()) // Log every Request to console

	app.Get("/health", func(c fiber.Ctx) error {
		// Quick check to see if db is still alive
		if err := db.Pool.Ping(c.Context()); err != nil {
			return c.Status(503).JSON(fiber.Map{"status": "error", "db": "disconnected"})
		}

		return c.JSON(fiber.Map{"status": "ok", "db": "connected"})
	})

	app.Post("/api/v1/ingest", handlers.InjestLog)

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "4000"
	}

	// Run in a goroutine
	go func() {
		if err := app.Listen(":" + port); err != nil {
			log.Panicf("server failed to start: %v", err)
		}
	}()

	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)
	<-c

	log.Println("Shutdown signal received...")

	if err := app.Shutdown(); err != nil {
		log.Printf("Server shutdown error: %v", err)
	}

	log.Println("bla... Draining log buffer...")
	close(worker.LogChannel)

	worker.Wg.Wait()

	log.Println("✅All logs flushed. Goodbye")

}
