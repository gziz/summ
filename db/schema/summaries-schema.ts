import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const contentTypeEnum = pgEnum("content_type", [
  "article",
  "youtube",
  "newsletter",
  "blog"
])

export const summariesTable = pgTable("summaries", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  snippet: text("snippet").notNull(),
  sourceUrl: text("source_url").notNull(),
  sourceName: text("source_name").notNull(),
  sourceLogo: text("source_logo"),
  contentType: contentTypeEnum("content_type").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export type InsertSummary = typeof summariesTable.$inferInsert
export type SelectSummary = typeof summariesTable.$inferSelect
