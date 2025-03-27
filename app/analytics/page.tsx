"use client";

import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendAnalysis } from "@/components/analytics/trend-analysis";
import { TopicAnalysis } from "@/components/analytics/topic-analysis";
import { CompetitorComparison } from "@/components/analytics/competitor-comparison";
import { ResponseMetrics } from "@/components/analytics/response-metrics";

export default function AnalyticsPage() {
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    console.log('useUser state:', { user, error, isLoading });
  }, [user, error, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    window.location.href = '/api/auth/login';
    return <div>Redirecting to login...</div>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Analytics</h1>
          <a href="/api/auth/logout">
            <button className="px-4 py-2 bg-gray-200 rounded">Logout</button>
          </a>
        </div>
        <Tabs defaultValue="trends" className="space-y-4">
          <TabsList>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="topics">Topics</TabsTrigger>
            <TabsTrigger value="competitors">Competitor Analysis</TabsTrigger>
            <TabsTrigger value="responses">Response Metrics</TabsTrigger>
          </TabsList>
          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Review Trends</CardTitle>
                <CardDescription>Track how your ratings and review volume change over time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <TrendAnalysis />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="topics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Topic Analysis</CardTitle>
                <CardDescription>Discover the most common topics mentioned in your reviews</CardDescription>
              </CardHeader>
              <CardContent>
                <TopicAnalysis />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="competitors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Competitor Comparison</CardTitle>
                <CardDescription>See how your ratings compare to competitors in your industry</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <CompetitorComparison />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="responses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Response Metrics</CardTitle>
                <CardDescription>Track your response rate and response time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponseMetrics />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}