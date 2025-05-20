"use client"

import { submitUrlForSummarizationAction } from "@/actions/summarization-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

interface UrlSubmitFormProps {
  userId: string
}

export default function UrlSubmitForm({ userId }: UrlSubmitFormProps) {
  const [url, setUrl] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!url.trim()) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL",
        variant: "destructive"
      })
      return
    }

    try {
      setIsSubmitting(true)

      // Validate URL format
      let formattedUrl = url
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        formattedUrl = `https://${url}`
      }

      // Try to construct a URL object (will throw if invalid)
      new URL(formattedUrl)

      const { isSuccess, message, data } =
        await submitUrlForSummarizationAction({
          url: formattedUrl,
          userId
        })

      if (isSuccess && data) {
        toast({
          title: "Success",
          description: "Your URL has been processed successfully!"
        })

        setUrl("")
        router.push(`/summary/${data.id}`)
      } else {
        toast({
          title: "Error",
          description: message,
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Error submitting URL:", error)
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL format",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="https://example.com/article"
            value={url}
            onChange={e => setUrl(e.target.value)}
            disabled={isSubmitting}
            className="pr-24"
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="absolute right-1 top-1 h-8"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Processing
              </>
            ) : (
              "Summarize"
            )}
          </Button>
        </div>
      </form>

      <div className="text-muted-foreground text-center text-xs">
        <p>Supports articles, YouTube videos, newsletters, and blog posts</p>
      </div>
    </motion.div>
  )
}
