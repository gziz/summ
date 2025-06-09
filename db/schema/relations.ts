import { relations } from "drizzle-orm"
import { channelsTable } from "./channels-schema"
import { videosTable } from "./videos-schema"

export const channelsRelations = relations(channelsTable, ({ many }) => ({
  videos: many(videosTable)
}))

export const videosRelations = relations(videosTable, ({ one }) => ({
  channel: one(channelsTable, {
    fields: [videosTable.channelId],
    references: [channelsTable.id]
  })
})) 