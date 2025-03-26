import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/dashboard/overview"
import { RecentReviews } from "@/components/dashboard/recent-reviews"
import { PlatformStats } from "@/components/dashboard/platform-stats"
import { SentimentAnalysis } from "@/components/dashboard/sentiment-analysis"
import { Badge } from "@/components/ui/badge"
import { ArrowUp, ArrowDown, Star } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs font-normal">
              Last updated: Today, 2:30 PM
            </Badge>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,248</div>
              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                <ArrowUp className="w-3 h-3 mr-1 text-emerald-500" />
                <span className="text-emerald-500 font-medium">12%</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-2xl font-bold">4.2</div>
                <div className="flex ml-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400/40" />
                </div>
              </div>
              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                <ArrowUp className="w-3 h-3 mr-1 text-emerald-500" />
                <span className="text-emerald-500 font-medium">0.3</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                <ArrowUp className="w-3 h-3 mr-1 text-emerald-500" />
                <span className="text-emerald-500 font-medium">5%</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Pending Responses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                <ArrowDown className="w-3 h-3 mr-1 text-red-500" />
                <span className="text-red-500 font-medium">3</span>
                <span className="ml-1">since yesterday</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Review Trends</CardTitle>
              <CardDescription>Review volume and average rating over time</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Sentiment Analysis</CardTitle>
              <CardDescription>Distribution of positive, neutral, and negative reviews</CardDescription>
            </CardHeader>
            <CardContent>
              <SentimentAnalysis />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Reviews</CardTitle>
                <CardDescription>You have 24 reviews that need responses</CardDescription>
              </div>
              <Tabs defaultValue="all" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="responded">Responded</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <RecentReviews />
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Platform Statistics</CardTitle>
              <CardDescription>Review distribution across platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <PlatformStats />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

