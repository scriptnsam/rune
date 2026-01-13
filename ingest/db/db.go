package db

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

var Pool *pgxpool.Pool

func Connect() error {
	dbUrl := os.Getenv("DATABASE_URL")
	if dbUrl == "" {
		return fmt.Errorf("DATABASE_URL is not set in .env")
	}

	config, err := pgxpool.ParseConfig(dbUrl)
	if err != nil {
		return fmt.Errorf("unable to parse databse config: %v", err)
	}

	// Optimize
	config.MaxConns = 10
	config.MinConns = 2
	config.MaxConnLifetime = time.Hour

	// Create the connection pool
	Pool, err = pgxpool.NewWithConfig(context.Background(), config)
	if err != nil {
		return fmt.Errorf("unable to create connection pool: %v", err)
	}

	// Ping to verify connection
	err = Pool.Ping(context.Background())
	if err != nil {
		return fmt.Errorf("unable to ping database: %v", err)
	}

	fmt.Println("Connected to Local Postgres Successfully")
	return nil
}

func Close() {
	if Pool != nil {
		Pool.Close()
	}
}
