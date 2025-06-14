/*
Initializes the database connection and schema for the app.
Frontend-owned tables for migrations + AI read-only tables for querying.
*/

import { profilesTable } from "@/db/schema"
import { aiChannels, aiVideos, aiChannelsRelations, aiVideosRelations } from "@/db/ai-read"
import { config } from "dotenv"
import { drizzle } from "drizzle-orm/postgres-js"
// import { drizzle } from 'drizzle-orm/neon-http';

import postgres from "postgres"

config({ path: ".env.local" })

// Schema includes:
// - Frontend-owned tables (for migrations)
// - AI read-only tables (for queries only)
const schema = {
  // Frontend tables (migrations managed here)
  profiles: profilesTable,
  
  // AI tables (read-only access, migrations managed by AI worker)
  aiChannels: aiChannels,
  aiVideos: aiVideos,
  aiChannelsRelations,
  aiVideosRelations
}

const client = postgres(process.env.DATABASE_URL!)

export const db = drizzle(client, { schema })