"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function AISettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Response Generation</CardTitle>
          <CardDescription>Configure how AI generates responses to customer reviews</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch id="ai-enabled" defaultChecked />
              <Label htmlFor="ai-enabled">Enable AI response generation</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="ai-auto-respond" />
              <Label htmlFor="ai-auto-respond">Auto-respond to 5-star reviews</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="ai-human-review" defaultChecked />
              <Label htmlFor="ai-human-review">Require human review before sending</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Response Tone</Label>
            <RadioGroup defaultValue="professional">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="professional" id="professional" />
                <Label htmlFor="professional">Professional</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="friendly" id="friendly" />
                <Label htmlFor="friendly">Friendly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="casual" id="casual" />
                <Label htmlFor="casual">Casual</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="formal" id="formal" />
                <Label htmlFor="formal">Formal</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Response Length</Label>
              <span className="text-sm text-muted-foreground">Medium</span>
            </div>
            <Slider defaultValue={[50]} max={100} step={1} />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Concise</span>
              <span>Detailed</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="custom-signature">Custom Signature</Label>
            <Textarea
              id="custom-signature"
              placeholder="Enter a custom signature to append to all responses"
              defaultValue="Best regards,\nThe [Company Name] Team"
            />
            <p className="text-xs text-muted-foreground">Use [Company Name] as a placeholder for your business name</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save AI Settings</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sentiment Analysis</CardTitle>
          <CardDescription>Configure how the AI analyzes review sentiment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch id="sentiment-enabled" defaultChecked />
              <Label htmlFor="sentiment-enabled">Enable sentiment analysis</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="topic-extraction" defaultChecked />
              <Label htmlFor="topic-extraction">Extract key topics from reviews</Label>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Sentiment Threshold</Label>
              <span className="text-sm text-muted-foreground">Medium</span>
            </div>
            <Slider defaultValue={[50]} max={100} step={1} />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Lenient</span>
              <span>Strict</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Adjusts how the system classifies positive, neutral, and negative sentiment
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Sentiment Settings</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

