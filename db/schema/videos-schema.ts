import {
  integer,
  pgTable,
  text,
  timestamp,
  customType
} from "drizzle-orm/pg-core"
import { channelsTable } from "./channels-schema"

const textArray = customType<{ data: string[] }>({
  dataType() {
    return "text[]"
  }
})

export const videosTable = pgTable("videos", {
  id: text("id").primaryKey(), // YouTube video ID
  channelId: text("channel_id").references(() => channelsTable.id),
  title: text("title"),
  url: text("url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  publishedAt: timestamp("published_at"),
  durationSec: integer("duration_sec"),
  categoryId: integer("category_id"),
  tags: textArray("tags"),
  transcript: text("transcript"),
  summary: text("summary"), // The new column to store the summary text
  processedAt: timestamp("processed_at"), // Timestamp of when the summary was added
  createdAt: timestamp("created_at").defaultNow()
})

export type InsertVideo = typeof videosTable.$inferInsert
export type SelectVideo = typeof videosTable.$inferSelect 