package cache

import (
	"context"
	"fmt"
	"log"
	"sync"
	"time"

	"github.com/scriptnsam/rune/ingest/db"
)

// ProjectCache stores the mapping of "api_key" -> "project_id"
type ProjectCache struct {
	sync.RWMutex
	keys map[string]string // map[api_key]project_id
}

var Projects = &ProjectCache{keys: make(map[string]string)}

// GetProjectID looks up the API Key in memory
func (c *ProjectCache) GetProjectID(apiKey string) (string, bool) {
	c.RLock() // Read lock (fast, allows multiple readers)
	defer c.RUnlock()

	id, exists := c.keys[apiKey]
	return id, exists
}

// Refresh loads all keys from postgres into Memory
func (c *ProjectCache) Refresh() error {
	rows, err := db.Pool.Query(context.Background(), "SELECT api_key, id FROM projects")
	if err != nil {
		return err
	}
	defer rows.Close()

	// Build new map temporarily
	newKeys := make(map[string]string)

	for rows.Next() {
		var apiKey, id string
		if err := rows.Scan(&apiKey, &id); err != nil {
			log.Printf("Cache scan error: %v", err)
			continue
		}
		newKeys[apiKey] = id
	}

	// Swap the keys safely
	c.Lock()
	c.keys = newKeys
	c.Unlock()

	fmt.Printf("Cache refreshed: %d active projects loaded\n", len(newKeys))
	return nil
}

// Auto Refresh runs in the background every X minutes
func StartCacheRefresher(interval time.Duration) {
	if err := Projects.Refresh(); err != nil {
		log.Printf("Initial Cache load failed: %v", err)
	}

	ticker := time.NewTicker(interval)
	go func() {
		for range ticker.C {
			if err := Projects.Refresh(); err != nil {
				log.Printf("Cache refresh failed: %v", err)
			}
		}
	}()

}
