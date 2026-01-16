package worker

import (
	"context"
	"log"
	"sync"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/scriptnsam/rune/ingest/db"
	"github.com/scriptnsam/rune/ingest/types"
)

var (
	LogChannel = make(chan types.IncomingLog, 1000)
	Wg         sync.WaitGroup
)

const (
	BatchSize    = 100
	BatchTiemout = 2 * time.Second
)

func StartWorker() {
	Wg.Add(1)
	defer Wg.Done()

	var batch []types.IncomingLog
	ticker := time.NewTicker(BatchTiemout)

	// Helper function to flush data to DB
	flush := func() {
		if len(batch) == 0 {
			return
		}

		err := bulkInsert(batch)
		if err != nil {
			log.Printf("Failed to flush batch of %d logs: %v\n", len(batch), err)
		}

		batch = batch[:0] // or batch = nil (reuses memory)
	}

	for {
		select {
		case logEntry, ok := <-LogChannel:
			if !ok {
				flush()
				return
			}
			batch = append(batch, logEntry)
			if len(batch) >= BatchSize {
				flush()
				ticker.Reset(BatchTiemout) // Reset Timer since we just flushed
			}

		case <-ticker.C:
			// Time is up, flush whatever we have
			flush()
		}
	}
}

// bulkInsert uses Postgres COPY protocol for maximum speed
func bulkInsert(logs []types.IncomingLog) error {
	ctx := context.Background()

	rows := [][]interface{}{}
	for _, l := range logs {
		var projectID pgtype.UUID
		if err := projectID.Scan(l.ProjectID); err != nil {
			log.Printf("Skipping log with invalid UUID: %s\n", l.ProjectID)
			continue
		}

		rows = append(rows, []interface{}{
			projectID,
			l.Severity,
			l.Message,
			l.Context,
			l.Timestamp,
		})
	}

	_, err := db.Pool.CopyFrom(
		ctx,
		pgx.Identifier{"logs"},
		[]string{"project_id", "severity", "message", "context", "timestamp"}, pgx.CopyFromRows(rows))
	return err
}
