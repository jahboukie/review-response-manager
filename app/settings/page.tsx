"use client";

import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlatformSettings } from "@/components/settings/platform-settings";
import { NotificationSettings } from "@/components/settings/notification-settings";
import { AISettings } from "@/components/settings/ai-settings";
import { TeamSettings } from "@/components/settings/team-settings";

export default function SettingsPage() {
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
          <h1 className="text-2xl font-bold">Settings</h1>
          <a href="/api/auth/logout">
            <button className="px-4 py-2 bg-gray-200 rounded">Logout</button>
          </a>
        </div>
        <Tabs defaultValue="platforms" className="space-y-4">
          <TabsList>
            <TabsTrigger value="platforms">Platforms</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="ai">AI Settings</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>
          <TabsContent value="platforms" className="space-y-4">
            <PlatformSettings />
          </TabsContent>
          <TabsContent value="notifications" className="space-y-4">
            <NotificationSettings />
          </TabsContent>
          <TabsContent value="ai" className="space-y-4">
            <AISettings />
          </TabsContent>
          <TabsContent value="team" className="space-y-4">
            <TeamSettings />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}