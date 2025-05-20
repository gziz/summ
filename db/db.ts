/*
Initializes the database connection and schema for the app.
*/

import { profilesTable, summariesTable, savedSummariesTable } from "@/db/schema"
import { config } from "dotenv"
import { drizzle } from "drizzle-orm/postgres-js"
// import { drizzle } from 'drizzle-orm/neon-http';

import postgres from "postgres"

config({ path: ".env.local" })

const schema = {
  profiles: profilesTable,
  summaries: summariesTable,
  savedSummaries: savedSummariesTable
}

const client = postgres(process.env.DATABASE_URL!)

export const db = drizzle(client, { schema })