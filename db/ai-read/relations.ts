/*
Relations for read-only AI data.
These help with querying but don't affect migrations.
*/

import { relations } from "drizzle-orm"
import { aiChannels } from "./channels"
import { aiVideos } from "./videos"

export const aiChannelsRelations = relations(aiChannels, ({ many }) => ({
  videos: many(aiVideos)
}))

export const aiVideosRelations = relations(aiVideos, ({ one }) => ({
  channel: one(aiChannels, {
    fields: [aiVideos.channelId],
    references: [aiChannels.id]
  })
})) 