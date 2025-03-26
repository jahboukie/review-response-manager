"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Star, MessageSquare, RefreshCw, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

const mockReviews = [
  {
    id: 1,
    customer: "Alex Johnson",
    platform: "Google Business",
    rating: 4,
    date: "2 days ago",
    content:
      "Great service overall! The staff was friendly and attentive. The only reason I'm not giving 5 stars is because the wait time was a bit longer than expected.",
    responded: false,
    sentiment: "positive",
    initials: "AJ",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    customer: "Sarah Miller",
    platform: "Yelp",
    rating: 2,
    date: "3 days ago",
    content:
      "Disappointing experience. The product quality was not what I expected based on the description. Customer service was slow to respond to my concerns.",
    responded: false,
    sentiment: "negative",
    initials: "SM",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    customer: "Michael Chen",
    platform: "TripAdvisor",
    rating: 5,
    date: "4 days ago",
    content:
      "Absolutely fantastic! Everything exceeded my expectations. The attention to detail was impressive and I'll definitely be coming back again soon.",
    responded: true,
    sentiment: "positive",
    initials: "MC",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function RecentReviews() {
  const [reviews, setReviews] = useState(mockReviews)
  const [selectedReview, setSelectedReview] = useState(null)
  const [responseText, setResponseText] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const handleGenerateResponse = async () => {
    if (!selectedReview) return

    setIsGenerating(true)

    try {
      const response = await fetch("/api/generate-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          review: selectedReview,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate response")
      }

      const data = await response.json()
      setResponseText(data.response)

      toast({
        title: "Response generated",
        description: "AI has created a personalized response for this review.",
      })
    } catch (error) {
      console.error("Error generating response:", error)
      toast({
        title: "Error",
        description: "Failed to generate response. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSendResponse = () => {
    setReviews(reviews.map((review) => (review.id === selectedReview.id ? { ...review, responded: true } : review)))

    toast({
      title: "Response sent",
      description: `Your response to ${selectedReview.customer} has been sent.`,
    })

    setSelectedReview(null)
    setResponseText("")
  }

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "negative":
        return "bg-red-50 text-red-700 border-red-200"
      case "neutral":
        return "bg-blue-50 text-blue-700 border-blue-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getPlatformColor = (platform) => {
    switch (platform) {
      case "Google Business":
        return "border-blue-200 bg-blue-50 text-blue-700"
      case "Yelp":
        return "border-red-200 bg-red-50 text-red-700"
      case "TripAdvisor":
        return "border-green-200 bg-green-50 text-green-700"
      case "Facebook":
        return "border-indigo-200 bg-indigo-50 text-indigo-700"
      default:
        return "border-gray-200 bg-gray-50 text-gray-700"
    }
  }

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className={`h-3.5 w-3.5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
      ))
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="flex items-start space-x-4 p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
        >
          <Avatar className="h-10 w-10 border">
            <AvatarImage src={review.avatar} alt={review.customer} />
            <AvatarFallback>{review.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">{review.customer}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="flex">{renderStars(review.rating)}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getPlatformColor(review.platform)}>
                  {review.platform}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Mark as priority</DropdownMenuItem>
                    <DropdownMenuItem>Archive</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{review.content}</p>
            <div className="flex items-center justify-between pt-1">
              <Badge variant="outline" className={getSentimentColor(review.sentiment)}>
                {review.sentiment.charAt(0).toUpperCase() + review.sentiment.slice(1)}
              </Badge>
              <div>
                {review.responded ? (
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    <MessageSquare className="mr-1 h-3 w-3" />
                    Responded
                  </Badge>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8" onClick={() => setSelectedReview(review)}>
                        Respond
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                      <DialogHeader>
                        <DialogTitle>Respond to Review</DialogTitle>
                        <DialogDescription>
                          Create a personalized response to {review.customer}'s {review.rating}-star review on{" "}
                          {review.platform}.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="rounded-md bg-muted p-4">
                          <p className="mb-2 font-medium">Original Review:</p>
                          <div className="flex mb-2">{renderStars(review.rating)}</div>
                          <p className="text-sm">{review.content}</p>
                        </div>
                        <div className="grid gap-2">
                          <div className="flex justify-between">
                            <label htmlFor="response" className="text-sm font-medium">
                              Your Response:
                            </label>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8"
                              onClick={handleGenerateResponse}
                              disabled={isGenerating}
                            >
                              {isGenerating ? (
                                <>
                                  <RefreshCw className="mr-2 h-3 w-3 animate-spin" />
                                  Generating...
                                </>
                              ) : (
                                "Generate AI Response"
                              )}
                            </Button>
                          </div>
                          <Textarea
                            id="response"
                            value={responseText}
                            onChange={(e) => setResponseText(e.target.value)}
                            placeholder="Type your response or generate an AI-powered response..."
                            rows={8}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedReview(null)
                            setResponseText("")
                          }}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleSendResponse} disabled={!responseText.trim()}>
                          Send Response
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

