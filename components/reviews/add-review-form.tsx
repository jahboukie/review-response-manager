"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { SentimentResult } from "@/lib/sentiment-analysis"

export function AddReviewForm({ onAddReview }) {
  const [reviewData, setReviewData] = useState({
    customer: "",
    platform: "Google Business",
    rating: 5,
    content: "",
    date: new Date().toISOString().split("T")[0],
  })
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setReviewData({
      ...reviewData,
      [name]: value,
    })
  }

  const handleSelectChange = (name, value) => {
    setReviewData({
      ...reviewData,
      [name]: value,
    })
  }

  const handleRatingChange = (rating) => {
    setReviewData({
      ...reviewData,
      rating,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!reviewData.customer || !reviewData.content) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)

    try {
      // Analyze sentiment
      const response = await fetch("/api/analyze-sentiment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviewText: reviewData.content,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze sentiment")
      }

      const sentimentResult: SentimentResult = await response.json()

      // Generate initials from customer name
      const initials = reviewData.customer
        .split(" ")
        .map((name) => name[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)

      // Add the review with sentiment analysis
      const newReview = {
        id: Date.now(),
        ...reviewData,
        sentiment: sentimentResult.sentiment,
        responded: false,
        initials,
        avatar: "/placeholder.svg?height=40&width=40",
        date: "Just now",
      }

      setIsSubmitting(true)

      // Simulate API call delay
      setTimeout(() => {
        onAddReview(newReview)

        // Reset form
        setReviewData({
          customer: "",
          platform: "Google Business",
          rating: 5,
          content: "",
          date: new Date().toISOString().split("T")[0],
        })

        toast({
          title: "Review added",
          description: "The review has been added successfully.",
        })

        setIsSubmitting(false)
        setIsAnalyzing(false)
      }, 1000)
    } catch (error) {
      console.error("Error adding review:", error)
      toast({
        title: "Error",
        description: "Failed to add review. Please try again.",
        variant: "destructive",
      })
      setIsAnalyzing(false)
    }
  }

  const renderStarRating = () => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} type="button" onClick={() => handleRatingChange(star)} className="focus:outline-none">
            <Star
              className={`h-6 w-6 ${star <= reviewData.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
            />
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customer">Customer Name</Label>
              <Input
                id="customer"
                name="customer"
                value={reviewData.customer}
                onChange={handleInputChange}
                placeholder="Enter customer name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Select value={reviewData.platform} onValueChange={(value) => handleSelectChange("platform", value)}>
                <SelectTrigger id="platform">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Google Business">Google Business</SelectItem>
                  <SelectItem value="Yelp">Yelp</SelectItem>
                  <SelectItem value="TripAdvisor">TripAdvisor</SelectItem>
                  <SelectItem value="Facebook">Facebook</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Rating</Label>
            {renderStarRating()}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Review Content</Label>
            <Textarea
              id="content"
              name="content"
              value={reviewData.content}
              onChange={handleInputChange}
              placeholder="Enter the review content"
              rows={5}
              required
            />
          </div>

          <Button type="submit" disabled={isAnalyzing || isSubmitting} className="w-full">
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Sentiment...
              </>
            ) : isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding Review...
              </>
            ) : (
              "Add Review"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

