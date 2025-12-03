"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Bell, Search, Settings, User, Calendar, Filter, BarChart3, TrendingUp, PieChart, Activity } from "lucide-react"
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

export function AnalyticsPage() {
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

  const analyticsInsights = [
    {
      title: "Traffic Analysis",
      description: "Deep dive into user behavior and traffic patterns",
      icon: Activity,
      metrics: ["Page views", "Session duration", "Bounce rate", "Conversion funnel"]
    },
    {
      title: "Performance Metrics",
      description: "Monitor system performance and user experience",
      icon: TrendingUp,
      metrics: ["Load times", "Error rates", "Uptime", "API response times"]
    },
    {
      title: "Revenue Analytics",
      description: "Comprehensive revenue tracking and forecasting",
      icon: BarChart3,
      metrics: ["Revenue streams", "Customer LTV", "Churn analysis", "Growth projections"]
    },
    {
      title: "User Segmentation",
      description: "Advanced user behavior segmentation and insights",
      icon: PieChart,
      metrics: ["Demographics", "Behavior clusters", "Retention cohorts", "Engagement scores"]
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
                  placeholder="Search analytics..."
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
                    <DropdownMenuLabel>Analytics Filters</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="transition-colors duration-150 focus:bg-accent">Real-time</DropdownMenuItem>
                    <DropdownMenuItem className="transition-colors duration-150 focus:bg-accent">Last 24 hours</DropdownMenuItem>
                    <DropdownMenuItem className="transition-colors duration-150 focus:bg-accent">Last 7 days</DropdownMenuItem>
                    <DropdownMenuItem className="transition-colors duration-150 focus:bg-accent">Last 30 days</DropdownMenuItem>
                    <DropdownMenuItem className="transition-colors duration-150 focus:bg-accent">Custom range</DropdownMenuItem>
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
                  Advanced Analytics
                </h2>
                <p className="text-muted-foreground transition-colors duration-300">
                  Deep insights and comprehensive analytics for data-driven decision making.
                </p>
              </div>
            </div>

            {/* Analytics Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview" className="transition-all duration-200">Overview</TabsTrigger>
                <TabsTrigger value="traffic" className="transition-all duration-200">Traffic</TabsTrigger>
                <TabsTrigger value="performance" className="transition-all duration-200">Performance</TabsTrigger>
                <TabsTrigger value="insights" className="transition-all duration-200">Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                {/* KPI Cards */}
                <div className={cn(
                  "transition-all duration-800 delay-300",
                  mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}>
                  <KPICards />
                </div>

                {/* Charts Section */}
                <div className={cn(
                  "transition-all duration-800 delay-500",
                  mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}>
                  <ChartsSection />
                </div>
              </TabsContent>

              <TabsContent value="traffic" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {analyticsInsights[0].metrics.map((metric, index) => (
                    <Card key={metric} className={cn(
                      "transition-all duration-500 hover:shadow-lg hover:scale-105",
                      mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    )} style={{ animationDelay: `${index * 100}ms` }}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{metric}</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {Math.floor(Math.random() * 10000) + 1000}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          +{Math.floor(Math.random() * 20) + 5}% from last month
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <ChartsSection />
              </TabsContent>

              <TabsContent value="performance" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {analyticsInsights[1].metrics.map((metric, index) => (
                    <Card key={metric} className={cn(
                      "transition-all duration-500 hover:shadow-lg hover:scale-105",
                      mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    )} style={{ animationDelay: `${index * 100}ms` }}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{metric}</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {metric.includes('time') ? `${(Math.random() * 5 + 1).toFixed(2)}s` :
                           metric.includes('rate') ? `${(Math.random() * 10 + 90).toFixed(1)}%` :
                           Math.floor(Math.random() * 100) + '%'}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {Math.random() > 0.5 ? '+' : '-'}{Math.floor(Math.random() * 15) + 1}% from last week
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <ChartsSection />
              </TabsContent>

              <TabsContent value="insights" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {analyticsInsights.slice(2).map((insight, index) => (
                    <Card key={insight.title} className={cn(
                      "transition-all duration-500 hover:shadow-lg hover:scale-105",
                      mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    )} style={{ animationDelay: `${index * 100}ms` }}>
                      <CardHeader>
                        <div className="flex items-center space-x-2">
                          <insight.icon className="h-5 w-5 text-primary" />
                          <CardTitle>{insight.title}</CardTitle>
                        </div>
                        <CardDescription>{insight.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {insight.metrics.map((metric) => (
                            <div key={metric} className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">{metric}</span>
                              <span className="font-medium">
                                {Math.floor(Math.random() * 10000) + 1000}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <DataTableSection />
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
