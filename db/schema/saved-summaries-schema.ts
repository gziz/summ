import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { summariesTable } from "./summaries-schema"

export const savedSummariesTable = pgTable("saved_summaries", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  summaryId: uuid("summary_id")
    .references(() => summariesTable.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export type InsertSavedSummary = typeof savedSummariesTable.$inferInsert
export type SelectSavedSummary = typeof savedSummariesTable.$inferSelect
