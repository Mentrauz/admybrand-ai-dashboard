"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Camera, Edit3, Mail, MapPin, Phone, Calendar, Shield, Bell, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { cn } from "@/lib/utils"

export default function ProfilePage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [mounted, setMounted] = useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const userProfile = {
    name: "shadcn",
    email: "m@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Digital marketing specialist passionate about data-driven insights and analytics. Love building tools that help businesses make better decisions.",
    joinDate: "January 2024",
    role: "Marketing Analyst",
    department: "Digital Marketing",
    avatar: "/avatars/01.png",
    stats: {
      campaignsManaged: 24,
      reportsGenerated: 156,
      teamMembers: 8,
      projectsCompleted: 42
    },
    skills: ["Data Analysis", "Google Analytics", "SEO", "Content Marketing", "A/B Testing", "SQL"],
    recentActivity: [
      { action: "Generated quarterly report", time: "2 hours ago", type: "report" },
      { action: "Updated campaign analytics", time: "5 hours ago", type: "update" },
      { action: "Created new dashboard", time: "1 day ago", type: "create" },
      { action: "Shared insights with team", time: "2 days ago", type: "share" },
    ]
  }

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {/* Header */}
          <header className={cn(
            "flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 transition-all duration-500",
            mounted ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          )}>
            <SidebarTrigger className="-ml-1" />
            <div className="flex flex-1 items-center gap-2 px-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="transition-all duration-200 hover:scale-105"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="space-y-1">
                <h1 className="text-lg font-semibold">Profile</h1>
                <p className="text-xs text-muted-foreground">Manage your account settings and preferences</p>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 space-y-6 p-6">
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Profile Header Card */}
              <Card className={cn(
                "transition-all duration-500 hover:shadow-lg",
                mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              )}>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Avatar Section */}
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative">
                        <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                          <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                          <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                            {userProfile.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 transition-all duration-200 hover:scale-110"
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                      </div>
                      <Badge variant="secondary" className="px-3 py-1">
                        {userProfile.role}
                      </Badge>
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h2 className="text-3xl font-bold">{userProfile.name}</h2>
                          <p className="text-muted-foreground">{userProfile.department}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsEditing(!isEditing)}
                          className="transition-all duration-200 hover:scale-105"
                        >
                          <Edit3 className="h-4 w-4 mr-2" />
                          {isEditing ? "Save" : "Edit Profile"}
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{userProfile.email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{userProfile.phone}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{userProfile.location}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Joined {userProfile.joinDate}</span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {userProfile.bio}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Cards */}
              <div className={cn(
                "grid grid-cols-2 md:grid-cols-4 gap-4",
                mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              )} style={{ transitionDelay: mounted ? '100ms' : '0ms' }}>
                {Object.entries(userProfile.stats).map(([key, value], index) => (
                  <Card key={key} className="text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                    <CardContent className="pt-4">
                      <div className="text-2xl font-bold text-primary mb-1">{value.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Detailed Tabs */}
              <Tabs defaultValue="overview" className={cn(
                "w-full",
                mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              )} style={{ transitionDelay: mounted ? '200ms' : '0ms' }}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Skills */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Settings className="h-4 w-4" />
                          Skills & Expertise
                        </CardTitle>
                        <CardDescription>
                          Areas of specialization and expertise
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {userProfile.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Quick Stats */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          Account Status
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Account Type</span>
                          <Badge>Premium</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Two-Factor Auth</span>
                          <Badge variant="outline">Enabled</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Email Verified</span>
                          <Badge variant="outline">Verified</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="activity" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        Recent Activity
                      </CardTitle>
                      <CardDescription>
                        Your latest actions and updates
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {userProfile.recentActivity.map((activity, index) => (
                          <div key={index} className="flex items-center gap-4 pb-4 border-b border-border/50 last:border-0 last:pb-0">
                            <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{activity.action}</p>
                              <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {activity.type}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Preferences</CardTitle>
                      <CardDescription>
                        Customize your account settings and preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" defaultValue={userProfile.name} disabled={!isEditing} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" defaultValue={userProfile.email} disabled={!isEditing} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" defaultValue={userProfile.phone} disabled={!isEditing} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input id="location" defaultValue={userProfile.location} disabled={!isEditing} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          defaultValue={userProfile.bio}
                          disabled={!isEditing}
                          className="min-h-[100px]"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Security Settings
                      </CardTitle>
                      <CardDescription>
                        Manage your account security and privacy
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Two-Factor Authentication</p>
                            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                          </div>
                          <Badge variant="outline">Enabled</Badge>
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Password</p>
                            <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                          </div>
                          <Button variant="outline" size="sm">Change Password</Button>
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Login Sessions</p>
                            <p className="text-sm text-muted-foreground">Manage your active sessions</p>
                          </div>
                          <Button variant="outline" size="sm">View Sessions</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
