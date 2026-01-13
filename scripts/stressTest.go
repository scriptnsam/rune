package main

import (
	"bytes"
	"fmt"
	"net/http"
	"sync"
	"sync/atomic"
	"time"
)

// CONFIG
const (
	TotalRequests = 10000 // How many logs to send?
	Concurrency   = 50    // How many parallel users?
	TargetURL     = "http://localhost:4000/api/v1/ingest"
	// Use your REAL Project ID here
	ProjectID     = "22222222-2222-2222-2222-222222222222" 
)

func main() {
	fmt.Printf("🔥 Starting Stress Test: %d requests with %d concurrency...\n", TotalRequests, Concurrency)
	
	var successCount int64
	var failCount int64
	
	// Payload: A static JSON to save CPU time on generation
	jsonPayload := []byte(fmt.Sprintf(`{
		"project_id": "%s",
		"severity": "info",
		"message": "Load test log entry",
		"context": {"source": "stress-test", "cpu_load": 85}
	}`, ProjectID))

	startTime := time.Now()
	var wg sync.WaitGroup
	requestsChan := make(chan struct{}, TotalRequests)

	// 1. Fill the channel with work
	for i := 0; i < TotalRequests; i++ {
		requestsChan <- struct{}{}
	}
	close(requestsChan)

	// 2. Spawn Workers (Goroutines)
	for i := 0; i < Concurrency; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			client := &http.Client{Timeout: 10 * time.Second}

			for range requestsChan {
				resp, err := client.Post(TargetURL, "application/json", bytes.NewBuffer(jsonPayload))
				if err != nil || resp.StatusCode >= 400 {
					atomic.AddInt64(&failCount, 1)
					if err != nil {
						// fmt.Println("Error:", err) // Uncomment to debug
					}
				} else {
					atomic.AddInt64(&successCount, 1)
					resp.Body.Close()
				}
			}
		}()
	}

	// 3. Wait for finish
	wg.Wait()
	duration := time.Since(startTime)

	// 4. Report
	rps := float64(TotalRequests) / duration.Seconds()
	fmt.Println("\n--- 🏁 RESULTS ---")
	fmt.Printf("Time Taken: %v\n", duration)
	fmt.Printf("Total Requests: %d\n", TotalRequests)
	fmt.Printf("Success: %d\n", successCount)
	fmt.Printf("Failed: %d\n", failCount)
	fmt.Printf("RPS (Requests Per Sec): %.2f\n", rps)
}
