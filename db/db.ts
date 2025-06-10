/*
Initializes the database connection and schema for the app.
*/

import {
  channelsTable,
  videosTable,
  channelsRelations,
  videosRelations,
  profilesTable
} from "@/db/schema"
import { config } from "dotenv"
import { drizzle } from "drizzle-orm/postgres-js"
// import { drizzle } from 'drizzle-orm/neon-http';

import postgres from "postgres"

config({ path: ".env.local" })

const schema = {
  channels: channelsTable,
  videos: videosTable,
  channelsRelations,
  videosRelations,
  profiles: profilesTable
}

const client = postgres(process.env.DATABASE_URL!)

export const db = drizzle(client, { schema })