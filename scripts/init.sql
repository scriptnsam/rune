-- Create the UUID extension 
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Organizations Table
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organizations(id),
    name TEXT NOT NULL,
    api_key TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Logs Table (The one causing your error)
CREATE TABLE IF NOT EXISTS logs (
    id UUID DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id),
    severity VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    context JSONB, 
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    PRIMARY KEY (id, timestamp)
);

-- Indexes (For speed)
CREATE INDEX IF NOT EXISTS idx_logs_project_time ON logs (project_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_logs_context ON logs USING gin (context);
