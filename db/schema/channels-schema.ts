import { pgTable, text, timestamp } from "drizzle-orm/pg-core"

export const channelsTable = pgTable("channels", {
  id: text("id").primaryKey(), // YouTube channel ID (e.g., UC-3HqA7vTCvoI6A-Om_a2jA)
  name: text("name"), // A friendly name for the channel
  createdAt: timestamp("created_at").defaultNow()
})

export type InsertChannel = typeof channelsTable.$inferInsert
export type SelectChannel = typeof channelsTable.$inferSelect 