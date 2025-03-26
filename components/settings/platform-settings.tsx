"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { AlertCircle, Check } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function PlatformSettings() {
  const [platforms, setPlatforms] = useState({
    google: { connected: true, autoSync: true },
    yelp: { connected: true, autoSync: true },
    tripadvisor: { connected: false, autoSync: false },
    facebook: { connected: true, autoSync: false },
  })

  const toggleConnection = (platform) => {
    setPlatforms({
      ...platforms,
      [platform]: {
        ...platforms[platform],
        connected: !platforms[platform].connected,
      },
    })
  }

  const toggleAutoSync = (platform) => {
    setPlatforms({
      ...platforms,
      [platform]: {
        ...platforms[platform],
        autoSync: !platforms[platform].autoSync,
      },
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Google Business</CardTitle>
          <CardDescription>Connect your Google Business account to monitor and respond to reviews</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Connection Status</Label>
              <div className="text-sm text-muted-foreground">
                {platforms.google.connected ? (
                  <span className="flex items-center text-green-600">
                    <Check className="mr-1 h-4 w-4" /> Connected
                  </span>
                ) : (
                  "Not connected"
                )}
              </div>
            </div>
            <Button
              variant={platforms.google.connected ? "destructive" : "default"}
              onClick={() => toggleConnection("google")}
            >
              {platforms.google.connected ? "Disconnect" : "Connect"}
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="google-sync"
              checked={platforms.google.autoSync}
              onCheckedChange={() => toggleAutoSync("google")}
              disabled={!platforms.google.connected}
            />
            <Label htmlFor="google-sync">Auto-sync new reviews (every 30 minutes)</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Yelp</CardTitle>
          <CardDescription>Connect your Yelp Business account to monitor and respond to reviews</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Connection Status</Label>
              <div className="text-sm text-muted-foreground">
                {platforms.yelp.connected ? (
                  <span className="flex items-center text-green-600">
                    <Check className="mr-1 h-4 w-4" /> Connected
                  </span>
                ) : (
                  "Not connected"
                )}
              </div>
            </div>
            <Button
              variant={platforms.yelp.connected ? "destructive" : "default"}
              onClick={() => toggleConnection("yelp")}
            >
              {platforms.yelp.connected ? "Disconnect" : "Connect"}
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="yelp-sync"
              checked={platforms.yelp.autoSync}
              onCheckedChange={() => toggleAutoSync("yelp")}
              disabled={!platforms.yelp.connected}
            />
            <Label htmlFor="yelp-sync">Auto-sync new reviews (every 30 minutes)</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>TripAdvisor</CardTitle>
          <CardDescription>Connect your TripAdvisor Business account to monitor and respond to reviews</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Connection Status</Label>
              <div className="text-sm text-muted-foreground">
                {platforms.tripadvisor.connected ? (
                  <span className="flex items-center text-green-600">
                    <Check className="mr-1 h-4 w-4" /> Connected
                  </span>
                ) : (
                  "Not connected"
                )}
              </div>
            </div>
            <Button
              variant={platforms.tripadvisor.connected ? "destructive" : "default"}
              onClick={() => toggleConnection("tripadvisor")}
            >
              {platforms.tripadvisor.connected ? "Disconnect" : "Connect"}
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="tripadvisor-sync"
              checked={platforms.tripadvisor.autoSync}
              onCheckedChange={() => toggleAutoSync("tripadvisor")}
              disabled={!platforms.tripadvisor.connected}
            />
            <Label htmlFor="tripadvisor-sync">Auto-sync new reviews (every 30 minutes)</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Facebook</CardTitle>
          <CardDescription>Connect your Facebook Business page to monitor and respond to reviews</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Connection Status</Label>
              <div className="text-sm text-muted-foreground">
                {platforms.facebook.connected ? (
                  <span className="flex items-center text-green-600">
                    <Check className="mr-1 h-4 w-4" /> Connected
                  </span>
                ) : (
                  "Not connected"
                )}
              </div>
            </div>
            <Button
              variant={platforms.facebook.connected ? "destructive" : "default"}
              onClick={() => toggleConnection("facebook")}
            >
              {platforms.facebook.connected ? "Disconnect" : "Connect"}
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="facebook-sync"
              checked={platforms.facebook.autoSync}
              onCheckedChange={() => toggleAutoSync("facebook")}
              disabled={!platforms.facebook.connected}
            />
            <Label htmlFor="facebook-sync">Auto-sync new reviews (every 30 minutes)</Label>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Need to connect another platform?</AlertTitle>
        <AlertDescription>
          We're constantly adding new platforms. Contact our support team to request a new integration.
        </AlertDescription>
      </Alert>
    </div>
  )
}

