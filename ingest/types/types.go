package types

import "time"

// IncomingLog is what user sends us via JSON
type IncomingLog struct {
	ProjectID string                 `json:"project_id"`
	Severity  string                 `json:"severity"`
	Message   string                 `json:"message"`
	Context   map[string]interface{} `json:"context"`
	Timestamp time.Time              `json:"timestamp"`
}
