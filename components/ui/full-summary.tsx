"use client"

import {
  checkSummaryIsSavedAction,
  saveSummaryAction,
  unsaveSummaryAction
} from "@/actions/db/saved-summaries-actions"
import { FullSummaryProps } from "@/types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeft, BookmarkIcon, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function FullSummary({
  id,
  title,
  content,
  sourceName,
  sourceLogo,
  sourceUrl,
  contentType,
  userId,
  isSaved: initialIsSaved
}: FullSummaryProps) {
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

  const handleSave = async () => {
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

  const handleGoBack = () => {
    router.back()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 pb-10"
    >
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleGoBack}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="size-4" />
          <span>Back</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleSave}
          disabled={isLoading}
          className={cn("flex items-center gap-1.5", isSaved && "text-primary")}
        >
          <BookmarkIcon className={cn("size-4", isSaved && "fill-primary")} />
          <span>{isSaved ? "Saved" : "Save"}</span>
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          {sourceLogo ? (
            <div className="relative size-8 overflow-hidden rounded-full">
              <Image
                src={sourceLogo}
                alt={sourceName}
                className="object-contain"
                fill
                sizes="32px"
              />
            </div>
          ) : (
            <div className="bg-muted size-8 rounded-full" />
          )}

          <div className="flex flex-col">
            <span className="text-sm font-medium">{sourceName}</span>
            <div className="flex items-center gap-2">
              <span className="bg-muted rounded-full px-2 py-0.5 text-xs font-medium">
                {contentType}
              </span>
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs"
                onClick={e => e.stopPropagation()}
              >
                Original Source <ExternalLink className="size-3" />
              </a>
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold leading-tight md:text-3xl">
          {title}
        </h1>

        <div className="prose prose-sm dark:prose-invert max-w-none">
          {content.split("\n").map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
