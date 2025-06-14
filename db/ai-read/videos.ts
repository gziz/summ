/*
Read-only access to videos table in app_ai schema.
This is for querying data created by the AI worker.
DO NOT export from main schema - these are not managed by frontend migrations.
*/

import {
  integer,
  pgTable,
  text,
  timestamp,
  boolean,
  index,
  pgSchema
} from "drizzle-orm/pg-core"

// Reference to the AI schema
export const appAiSchema = pgSchema("app_ai")

// Read-only videos table from AI schema
export const aiVideos = appAiSchema.table("videos", {
  id: text("id").primaryKey().notNull(), // YouTube video ID
  channelId: text("channel_id"),
  title: text("title"),
  url: text("url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  publishedAt: timestamp("published_at", { withTimezone: true, mode: 'string' }),
  durationSec: integer("duration_sec"),
  categoryId: integer("category_id"),
  tags: text("tags").array(),
  transcript: text("transcript"),
  summary: text("summary"),
  processedAt: timestamp("processed_at", { withTimezone: true, mode: 'string' }),
  createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
  isShort: boolean("is_short").default(false)
}, (table) => [
  index("videos_channel_idx").using("btree", table.channelId.asc().nullsLast().op("text_ops")),
  index("videos_published_idx").using("btree", table.publishedAt.asc().nullsLast().op("timestamptz_ops"))
])

export type SelectAiVideo = typeof aiVideos.$inferSelect 