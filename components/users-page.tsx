"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Bell, Search, Settings, User, Calendar, Filter, Users, UserPlus, UserCheck, UserX, Activity, TrendingUp, BarChart3, Target, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { KPICards } from "@/components/kpi-cards"
import { ChartsSection } from "@/components/charts-section"
import { DataTableSection } from "@/components/data-table-section"
import { NotificationTray } from "@/components/notification-tray"
import { SettingsTray } from "@/components/settings-tray"
import { cn } from "@/lib/utils"
import { addDays, format } from "date-fns"
import type { DateRange } from "react-day-picker"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function UsersPage() {
  const [date, setDate] = useState<Date>()
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 1),
    to: addDays(new Date(2024, 0, 1), 30),
  })
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const isMobile = useIsMobile()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDateRangeSelect = (range: DateRange | undefined) => {
    setDateRange(range)
  }

  const handleLogout = () => {
    // Redirect to landing page
    router.push("/")
  }

  const userMetrics = [
    {
      title: "Total Users",
      value: "12,847",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: Users,
      description: "vs last month"
    },
    {
      title: "Active Users",
      value: "9,432",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: UserCheck,
      description: "Monthly active users"
    },
    {
      title: "New Registrations",
      value: "1,245",
      change: "+15.3%",
      changeType: "positive" as const,
      icon: UserPlus,
      description: "This month"
    },
    {
      title: "Churn Rate",
      value: "3.2%",
      change: "-0.8%",
      changeType: "positive" as const,
      icon: UserX,
      description: "Monthly churn"
    }
  ]

  const userSegments = [
    {
      segment: "Premium Users",
      count: 2847,
      percentage: 22.1,
      growth: "+18.5%",
      avgRevenue: "$127.50",
      color: "hsl(220 70% 50%)"
    },
    {
      segment: "Regular Users",
      count: 6234,
      percentage: 48.5,
      growth: "+12.3%",
      avgRevenue: "$45.20",
      color: "hsl(160 60% 45%)"
    },
    {
      segment: "Free Tier",
      count: 3456,
      percentage: 26.9,
      growth: "+7.8%",
      avgRevenue: "$0.00",
      color: "hsl(25 95% 53%)"
    },
    {
      segment: "Enterprise",
      count: 310,
      percentage: 2.5,
      growth: "+25.2%",
      avgRevenue: "$892.30",
      color: "hsl(280 70% 50%)"
    }
  ]

  const recentUsers = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      avatar: "/avatars/01.png",
      status: "active",
      plan: "Premium",
      joinedAt: "2024-01-15",
      lastActive: "2 hours ago",
      location: "New York, USA"
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob.smith@example.com",
      avatar: "/avatars/02.png",
      status: "active",
      plan: "Regular",
      joinedAt: "2024-01-12",
      lastActive: "1 day ago",
      location: "London, UK"
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol.davis@example.com",
      avatar: "/avatars/03.png",
      status: "inactive",
      plan: "Free",
      joinedAt: "2024-01-08",
      lastActive: "1 week ago",
      location: "Toronto, Canada"
    },
    {
      id: 4,
      name: "David Wilson",
      email: "david.wilson@example.com",
      avatar: "/avatars/04.png",
      status: "active",
      plan: "Enterprise",
      joinedAt: "2024-01-10",
      lastActive: "30 minutes ago",
      location: "Sydney, Australia"
    }
  ]

  const engagementMetrics = [
    {
      metric: "Daily Active Users",
      value: "7,432",
      target: "8,000",
      percentage: 92.9,
      trend: "up"
    },
    {
      metric: "Session Duration",
      value: "24.5 min",
      target: "30 min",
      percentage: 81.7,
      trend: "up"
    },
    {
      metric: "Feature Adoption",
      value: "68%",
      target: "75%",
      percentage: 90.7,
      trend: "up"
    },
    {
      metric: "User Satisfaction",
      value: "4.6/5",
      target: "4.8/5",
      percentage: 95.8,
      trend: "stable"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {/* Topbar */}
          <header className={cn(
            "flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 transition-all duration-500",
            mounted ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          )}>
            <SidebarTrigger className="-ml-1" />
            <div className="flex flex-1 items-center gap-2 px-3 min-w-0">
              <div className={cn(
                "relative flex-1 max-w-md transition-all duration-700 delay-200",
                mounted ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
              )}>
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground transition-colors duration-300" />
                <Input
                  type="search"
                  placeholder="Search users..."
                  className="pl-8 transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary/50 hover:border-primary/30"
                />
              </div>
              <div className={cn(
                "ml-auto flex items-center gap-1 sm:gap-2 transition-all duration-700 delay-300 min-w-0",
                mounted ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
              )}>
                {/* Date Range Filter */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "hidden sm:flex min-w-[240px] max-w-[320px] xl:w-[300px] justify-start text-left font-normal transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:border-primary/30 text-sm",
                        !dateRange && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4 transition-colors duration-200 flex-shrink-0" />
                      <span className="truncate">
                        {dateRange?.from ? (
                          dateRange?.to ? (
                            `${format(dateRange.from, "MMM dd, y")} - ${format(dateRange.to, "MMM dd, y")}`
                          ) : (
                            format(dateRange.from, "MMM dd, y")
                          )
                        ) : (
                          "Pick a date range"
                        )}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 animate-in fade-in-0 zoom-in-95 duration-200" align="start">
                    <CalendarComponent
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={handleDateRangeSelect}
                      numberOfMonths={isMobile ? 1 : 2}
                      className="rounded-md border-0"
                    />
                  </PopoverContent>
                </Popover>

                {/* Mobile Date Range Filter */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="sm:hidden transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:border-primary/30 hover:scale-105"
                      title={dateRange?.from && dateRange?.to
                        ? `${format(dateRange.from, "MMM dd, y")} - ${format(dateRange.to, "MMM dd, y")}`
                        : dateRange?.from
                        ? format(dateRange.from, "MMM dd, y")
                        : "Pick a date range"
                      }
                    >
                      <Calendar className="h-4 w-4 transition-transform duration-200" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 animate-in fade-in-0 zoom-in-95 duration-200" align="end">
                    <CalendarComponent
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={handleDateRangeSelect}
                      numberOfMonths={1}
                      className="rounded-md border-0"
                    />
                  </PopoverContent>
                </Popover>

                {/* Filter Button */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:border-primary/30 hover:scale-105 flex-shrink-0"
                    >
                      <Filter className="h-4 w-4 transition-transform duration-200" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="animate-in fade-in-0 zoom-in-95 duration-200">
                    <DropdownMenuLabel>User Filters</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="transition-colors duration-150 focus:bg-accent">All Users</DropdownMenuItem>
                    <DropdownMenuItem className="transition-colors duration-150 focus:bg-accent">Active Users</DropdownMenuItem>
                    <DropdownMenuItem className="transition-colors duration-150 focus:bg-accent">Inactive Users</DropdownMenuItem>
                    <DropdownMenuItem className="transition-colors duration-150 focus:bg-accent">New Users</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Notifications */}
                <NotificationTray />

                {/* Settings */}
                <SettingsTray />

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full transition-all duration-200 hover:bg-accent hover:scale-110 flex-shrink-0"
                    >
                      <Avatar className="h-8 w-8 transition-transform duration-200">
                        <AvatarImage src="/avatars/01.png" alt="@user" />
                        <AvatarFallback className="bg-primary text-primary-foreground transition-colors duration-200">U</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 animate-in fade-in-0 zoom-in-95 duration-200" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">shadcn</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          m@example.com
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="transition-colors duration-150 focus:bg-accent cursor-pointer"
                      onClick={() => router.push('/dashboard/profile')}
                    >
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="transition-colors duration-150 focus:bg-accent">Settings</DropdownMenuItem>
                    <DropdownMenuItem
                      className="transition-colors duration-150 focus:bg-accent cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 scroll-smooth overflow-y-auto">
            {/* Welcome Section */}
            <div className={cn(
              "flex items-center justify-between space-y-2 transition-all duration-800 delay-100",
              mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            )}>
              <div className="space-y-1">
                <h2 className="text-3xl font-bold tracking-tight text-foreground transition-all duration-300 hover:text-primary/90">
                  User Management
                </h2>
                <p className="text-muted-foreground transition-colors duration-300">
                  Comprehensive user analytics, segmentation, and engagement insights.
                </p>
              </div>
            </div>

            {/* Users Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview" className="transition-all duration-200">Overview</TabsTrigger>
                <TabsTrigger value="segments" className="transition-all duration-200">Segments</TabsTrigger>
                <TabsTrigger value="engagement" className="transition-all duration-200">Engagement</TabsTrigger>
                <TabsTrigger value="directory" className="transition-all duration-200">Directory</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                {/* User KPIs */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {userMetrics.map((metric, index) => (
                    <Card key={metric.title} className={cn(
                      "transition-all duration-500 hover:shadow-lg hover:scale-105",
                      mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    )} style={{ animationDelay: `${index * 100}ms` }}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                        <metric.icon className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{metric.value}</div>
                        <div className="flex items-center space-x-2 text-xs">
                          <Badge
                            variant={metric.changeType === "positive" ? "default" : "destructive"}
                            className="text-xs"
                          >
                            {metric.change}
                          </Badge>
                          <span className="text-muted-foreground">{metric.description}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Charts Section */}
                <div className={cn(
                  "transition-all duration-800 delay-500",
                  mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}>
                  <ChartsSection />
                </div>
              </TabsContent>

              <TabsContent value="segments" className="space-y-4">
                <Card className={cn(
                  "transition-all duration-500",
                  mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}>
                  <CardHeader>
                    <CardTitle>User Segments</CardTitle>
                    <CardDescription>
                      Breakdown of users by subscription tier and engagement level
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userSegments.map((segment, index) => (
                        <div
                          key={segment.segment}
                          className="flex items-center justify-between p-4 rounded-lg border bg-card/50 hover:bg-accent/50 transition-colors duration-200"
                        >
                          <div className="flex items-center space-x-4 flex-1">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: segment.color }}
                            ></div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium">{segment.segment}</span>
                                <span className="text-sm font-bold">{segment.count.toLocaleString()} users</span>
                              </div>
                              <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span>{segment.percentage}% of total users</span>
                                <div className="flex items-center space-x-2">
                                  <Badge
                                    variant="outline"
                                    className="text-xs text-green-600 border-green-200"
                                  >
                                    {segment.growth}
                                  </Badge>
                                  <span>Avg: {segment.avgRevenue}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <KPICards />
              </TabsContent>

              <TabsContent value="engagement" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {engagementMetrics.map((metric, index) => (
                    <Card key={metric.metric} className={cn(
                      "transition-all duration-500 hover:shadow-lg hover:scale-105",
                      mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    )} style={{ animationDelay: `${index * 100}ms` }}>
                      <CardHeader>
                        <CardTitle className="text-lg">{metric.metric}</CardTitle>
                        <CardDescription>
                          Target: {metric.target} • Current: {metric.value}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold">{metric.percentage}%</span>
                            <Badge
                              variant={metric.trend === "up" ? "default" : metric.trend === "down" ? "destructive" : "secondary"}
                              className="text-xs"
                            >
                              {metric.trend === "up" ? "↗" : metric.trend === "down" ? "↘" : "→"}
                            </Badge>
                          </div>
                          <Progress value={metric.percentage} className="w-full" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Current: {metric.value}</span>
                            <span>Target: {metric.target}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <ChartsSection />
              </TabsContent>

              <TabsContent value="directory" className="space-y-4">
                <Card className={cn(
                  "transition-all duration-500",
                  mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}>
                  <CardHeader>
                    <CardTitle>Recent Users</CardTitle>
                    <CardDescription>
                      Latest user registrations and activity overview
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentUsers.map((user, index) => (
                        <div
                          key={user.id}
                          className="flex items-center justify-between p-4 rounded-lg border bg-card/50 hover:bg-accent/50 transition-colors duration-200"
                        >
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {user.email}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="text-right">
                              <Badge
                                variant={user.status === "active" ? "default" : "secondary"}
                                className="mb-1"
                              >
                                {user.status}
                              </Badge>
                              <div className="text-muted-foreground">{user.plan}</div>
                            </div>
                            <div className="text-right text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {user.location}
                              </div>
                              <div>Last active: {user.lastActive}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <DataTableSection />
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
