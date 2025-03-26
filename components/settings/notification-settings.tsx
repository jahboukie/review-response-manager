"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function NotificationSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>Configure when you receive email notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" defaultValue="sarah@example.com" className="w-[250px]" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch id="new-review" defaultChecked />
                <Label htmlFor="new-review">New review notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="negative-review" defaultChecked />
                <Label htmlFor="negative-review">Negative review alerts (3 stars or less)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="weekly-digest" defaultChecked />
                <Label htmlFor="weekly-digest">Weekly review digest</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="monthly-report" defaultChecked />
                <Label htmlFor="monthly-report">Monthly analytics report</Label>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Email Settings</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>In-App Notifications</CardTitle>
          <CardDescription>Configure your in-app notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch id="app-new-review" defaultChecked />
              <Label htmlFor="app-new-review">New review notifications</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="app-response-needed" defaultChecked />
              <Label htmlFor="app-response-needed">Reviews requiring response</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="app-team-activity" defaultChecked />
              <Label htmlFor="app-team-activity">Team member activity</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="app-system" defaultChecked />
              <Label htmlFor="app-system">System notifications</Label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Notification Settings</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mobile Push Notifications</CardTitle>
          <CardDescription>Configure push notifications for the mobile app</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="mobile-number">Mobile Number</Label>
            <Input id="mobile-number" placeholder="+1 (555) 000-0000" className="w-[250px]" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch id="push-new-review" defaultChecked />
              <Label htmlFor="push-new-review">New review alerts</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="push-negative-review" defaultChecked />
              <Label htmlFor="push-negative-review">Negative review alerts</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="push-response-needed" />
              <Label htmlFor="push-response-needed">Response reminders</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quiet-hours">Quiet Hours</Label>
            <div className="flex items-center space-x-2">
              <Select defaultValue="22">
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="From" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }, (_, i) => (
                    <SelectItem key={i} value={i.toString()}>
                      {i.toString().padStart(2, "0")}:00
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span>to</span>
              <Select defaultValue="7">
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="To" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }, (_, i) => (
                    <SelectItem key={i} value={i.toString()}>
                      {i.toString().padStart(2, "0")}:00
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Push Notification Settings</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

