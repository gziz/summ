/*
Read-only access to channels table in app_ai schema.
This is for querying data created by the AI worker.
DO NOT export from main schema - these are not managed by frontend migrations.
*/

import {
  pgTable,
  text,
  timestamp,
  varchar,
  pgSchema
} from "drizzle-orm/pg-core"

// Reference to the AI schema (reusing from videos.ts)
import { appAiSchema } from "./videos"

// Read-only channels table from AI schema
export const aiChannels = appAiSchema.table("channels", {
  id: text("id").primaryKey().notNull(), // YouTube channel ID
  name: text("name"), // A friendly name for the channel
  createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
  handle: varchar("handle", { length: 255 }), // Channel handle (e.g., @channelname)
  description: text("description"), // Channel description
  url: text("url"), // Channel URL
  thumbnailUrl: text("thumbnail_url"), // Channel thumbnail/avatar URL
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' })
})

export type SelectAiChannel = typeof aiChannels.$inferSelect 