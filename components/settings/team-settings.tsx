"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const initialTeamMembers = [
  {
    id: 1,
    name: "Sarah Connor",
    email: "sarah@example.com",
    role: "Admin",
    status: "active",
    initials: "SC",
  },
  {
    id: 2,
    name: "John Smith",
    email: "john@example.com",
    role: "Manager",
    status: "active",
    initials: "JS",
  },
  {
    id: 3,
    name: "Emily Chen",
    email: "emily@example.com",
    role: "Responder",
    status: "active",
    initials: "EC",
  },
  {
    id: 4,
    name: "Michael Johnson",
    email: "michael@example.com",
    role: "Responder",
    status: "invited",
    initials: "MJ",
  },
]

export function TeamSettings() {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers)
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "Responder",
  })

  const handleAddMember = () => {
    if (newMember.name && newMember.email) {
      const initials = newMember.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)

      setTeamMembers([
        ...teamMembers,
        {
          id: teamMembers.length + 1,
          name: newMember.name,
          email: newMember.email,
          role: newMember.role,
          status: "invited",
          initials,
        },
      ])

      setNewMember({
        name: "",
        email: "",
        role: "Responder",
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>Manage who has access to your Review Response Manager</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between space-x-4 rounded-lg border p-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{member.role}</Badge>
                  {member.status === "invited" ? <Badge variant="secondary">Invited</Badge> : null}
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Team Member</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Team Member</DialogTitle>
                <DialogDescription>Add a new team member to your Review Response Manager</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={newMember.role} onValueChange={(value) => setNewMember({ ...newMember, role: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Responder">Responder</SelectItem>
                      <SelectItem value="Viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddMember}>Send Invitation</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>Configure what each role can do in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border">
              <div className="grid grid-cols-5 gap-4 p-4 font-medium">
                <div>Role</div>
                <div>View Reviews</div>
                <div>Respond</div>
                <div>Analytics</div>
                <div>Settings</div>
              </div>
              <div className="grid grid-cols-5 gap-4 border-t p-4">
                <div>Admin</div>
                <div>✓</div>
                <div>✓</div>
                <div>✓</div>
                <div>✓</div>
              </div>
              <div className="grid grid-cols-5 gap-4 border-t p-4">
                <div>Manager</div>
                <div>✓</div>
                <div>✓</div>
                <div>✓</div>
                <div>Limited</div>
              </div>
              <div className="grid grid-cols-5 gap-4 border-t p-4">
                <div>Responder</div>
                <div>✓</div>
                <div>✓</div>
                <div>Limited</div>
                <div>-</div>
              </div>
              <div className="grid grid-cols-5 gap-4 border-t p-4">
                <div>Viewer</div>
                <div>✓</div>
                <div>-</div>
                <div>Limited</div>
                <div>-</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

