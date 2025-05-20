"use client"

import {
  checkSummaryIsSavedAction,
  saveSummaryAction,
  unsaveSummaryAction
} from "@/actions/db/saved-summaries-actions"
import { SummaryCardProps } from "@/types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { BookmarkIcon, ExternalLinkIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { motion } from "framer-motion"

export default function SummaryCard({
  id,
  title,
  snippet,
  sourceName,
  sourceLogo,
  contentType,
  userId,
  isSaved: initialIsSaved,
  onClick
}: SummaryCardProps) {
  const router = useRouter()
  const [isSaved, setIsSaved] = useState(initialIsSaved || false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const checkIfSaved = async () => {
      if (initialIsSaved !== undefined) return

      const { isSuccess, data } = await checkSummaryIsSavedAction(userId, id)
      if (isSuccess) {
        setIsSaved(data)
      }
    }

    checkIfSaved()
  }, [id, userId, initialIsSaved])

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLoading(true)

    try {
      if (isSaved) {
        await unsaveSummaryAction(userId, id)
        setIsSaved(false)
      } else {
        await saveSummaryAction({
          userId,
          summaryId: id
        })
        setIsSaved(true)
      }
    } catch (error) {
      console.error("Error saving/unsaving summary:", error)
    } finally {
      setIsLoading(false)
      router.refresh()
    }
  }

  const handleCardClick = () => {
    if (onClick) {
      onClick()
    } else {
      router.push(`/summary/${id}`)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="border-border bg-card group relative cursor-pointer rounded-lg border p-4 shadow-sm transition-all hover:shadow-md"
      onClick={handleCardClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            {sourceLogo ? (
              <div className="relative size-6 overflow-hidden rounded-full">
                <Image
                  src={sourceLogo}
                  alt={sourceName}
                  className="object-contain"
                  fill
                  sizes="24px"
                />
              </div>
            ) : (
              <div className="bg-muted size-6 rounded-full" />
            )}

            <span className="text-muted-foreground text-xs">{sourceName}</span>

            <span className="bg-muted rounded-full px-2 py-0.5 text-xs font-medium">
              {contentType}
            </span>
          </div>

          <h3 className="text-lg font-semibold leading-tight">{title}</h3>

          <p className="text-muted-foreground line-clamp-3 text-sm">
            {snippet}
          </p>
        </div>
      </div>

      <div className="absolute right-3 top-3 flex items-center gap-2">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className={cn(
            "rounded-full p-1.5 transition-colors",
            isSaved
              ? "text-primary hover:bg-primary/10"
              : "text-muted-foreground hover:bg-muted"
          )}
          aria-label={isSaved ? "Unsave summary" : "Save summary"}
        >
          <BookmarkIcon className={cn("size-4", isSaved && "fill-primary")} />
        </button>
      </div>
    </motion.div>
  )
}
