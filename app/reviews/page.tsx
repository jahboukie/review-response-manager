"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReviewsList } from "@/components/reviews/reviews-list";
import { ReviewFilters } from "@/components/reviews/review-filters";
import { AddReviewForm } from "@/components/reviews/add-review-form";
import { Button } from "@/components/ui/button";
import { PlusCircle, Filter } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function ReviewsPage() {
  const [showAddReview, setShowAddReview] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch reviews on mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/reviews');
        console.log('Fetch response status:', res.status);
        if (!res.ok) throw new Error(`Failed to fetch reviews: ${res.statusText}`);
        const data = await res.json();
        console.log('Fetched reviews:', data);
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        toast.error('Failed to load reviews: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Handle adding a new review via the API
  const handleAddReview = async (newReview: { platform: string; content: string; sentiment: string; rating: number }) => {
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview),
      });
      if (!res.ok) throw new Error('Failed to add review');
      const addedReview = await res.json();
      setReviews([addedReview, ...reviews]);
      setShowAddReview(false);
      toast.success('Review added successfully');
    } catch (error) {
      console.error('Error adding review:', error);
      toast.error('Failed to add review: ' + error.message);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 lg:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Narrow down reviews by specific criteria</SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <ReviewFilters />
                </div>
              </SheetContent>
            </Sheet>
            <Dialog open={showAddReview} onOpenChange={setShowAddReview}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-9">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Review
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Review</DialogTitle>
                  <DialogDescription>Manually add a review from any platform</DialogDescription>
                </DialogHeader>
                <AddReviewForm onAddReview={handleAddReview} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all">All Reviews</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="responded">Responded</TabsTrigger>
            </TabsList>
          </div>

          <div className="grid gap-6 md:grid-cols-7">
            <Card className="md:col-span-5">
              <CardHeader>
                <CardTitle>Review Management</CardTitle>
                <CardDescription>View and respond to customer reviews across all platforms</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div>Loading reviews...</div>
                ) : (
                  <>
                    <TabsContent value="all" className="mt-0">
                      <ReviewsList reviews={reviews} filter="all" />
                    </TabsContent>
                    <TabsContent value="pending" className="mt-0">
                      <ReviewsList reviews={reviews} filter="pending" />
                    </TabsContent>
                    <TabsContent value="responded" className="mt-0">
                      <ReviewsList reviews={reviews} filter="responded" />
                    </TabsContent>
                  </>
                )}
              </CardContent>
            </Card>

            <div className="hidden md:block md:col-span-2">
              <ReviewFilters />
            </div>
          </div>
        </Tabs>
      </main>
    </div>
  );
}