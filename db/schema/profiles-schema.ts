/*
Defines the database schema for profiles.
Frontend-owned tables in app_frontend schema.
*/

import { pgEnum, pgTable, text, timestamp, pgSchema } from "drizzle-orm/pg-core"

// Create the app_frontend schema
export const appFrontendSchema = pgSchema("app_frontend")

// Define enum in the app_frontend schema
export const membershipEnum = appFrontendSchema.enum("membership", ["free", "pro"])

// Define the profiles table in the app_frontend schema
export const profilesTable = appFrontendSchema.table("profiles", {
  userId: text("user_id").primaryKey().notNull(),
  membership: membershipEnum("membership").notNull().default("free"),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export type InsertProfile = typeof profilesTable.$inferInsert
export type SelectProfile = typeof profilesTable.$inferSelect 