/*
Exports the database schema for the frontend app.
Only includes tables owned by the frontend (app_frontend schema).
AI tables (videos, channels) are managed by the Python worker.
*/

// Frontend-owned schemas only
export * from "./profiles-schema"

// Note: videos and channels are intentionally NOT exported here
// They are managed by the AI worker in the app_ai schema
// For read access, use imports from @/db/ai-read
