"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Bell, Search, Settings, User, Calendar, Filter, DollarSign, TrendingUp, PieChart, Activity, Target, BarChart3, ArrowUpDown, Receipt } from "lucide-react"
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

export function RevenuePage() {
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

  const revenueMetrics = [
    {
      title: "Total Revenue",
      value: "$124,592",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: DollarSign,
      description: "vs last month"
    },
    {
      title: "Monthly Recurring Revenue",
      value: "$89,432",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "MRR growth"
    },
    {
      title: "Average Revenue Per User",
      value: "$127.50",
      change: "+3.1%",
      changeType: "positive" as const,
      icon: Target,
      description: "ARPU increase"
    },
    {
      title: "Revenue Growth Rate",
      value: "15.3%",
      change: "+2.4%",
      changeType: "positive" as const,
      icon: BarChart3,
      description: "YoY growth"
    }
  ]

  const revenueStreams = [
    {
      name: "Subscription Revenue",
      amount: "$67,890",
      percentage: 54.4,
      trend: "up",
      color: "hsl(220 70% 50%)"
    },
    {
      name: "One-time Purchases",
      amount: "$32,450",
      percentage: 26.0,
      trend: "up",
      color: "hsl(160 60% 45%)"
    },
    {
      name: "Service Fees",
      amount: "$18,760",
      percentage: 15.0,
      trend: "down",
      color: "hsl(25 95% 53%)"
    },
    {
      name: "Affiliate Revenue",
      amount: "$5,492",
      percentage: 4.6,
      trend: "up",
      color: "hsl(280 70% 50%)"
    }
  ]

  const customerSegments = [
    {
      segment: "Enterprise",
      revenue: "$45,230",
      customers: 12,
      avgValue: "$3,769",
      growth: "+18.5%"
    },
    {
      segment: "Professional",
      revenue: "$38,450",
      customers: 45,
      avgValue: "$854",
      growth: "+12.3%"
    },
    {
      segment: "Small Business",
      revenue: "$32,180",
      customers: 123,
      avgValue: "$262",
      growth: "+7.8%"
    },
    {
      segment: "Individual",
      revenue: "$8,732",
      customers: 234,
      avgValue: "$37",
      growth: "+5.2%"
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
                  placeholder="Search revenue data..."
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
                    <DropdownMenuLabel>Revenue Filters</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="transition-colors duration-150 focus:bg-accent">All Revenue</DropdownMenuItem>
                    <DropdownMenuItem className="transition-colors duration-150 focus:bg-accent">Subscriptions</DropdownMenuItem>
                    <DropdownMenuItem className="transition-colors duration-150 focus:bg-accent">One-time Sales</DropdownMenuItem>
                    <DropdownMenuItem className="transition-colors duration-150 focus:bg-accent">Services</DropdownMenuItem>
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
                  Revenue Analytics
                </h2>
                <p className="text-muted-foreground transition-colors duration-300">
                  Comprehensive revenue tracking, forecasting, and business intelligence insights.
                </p>
              </div>
            </div>

            {/* Revenue Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview" className="transition-all duration-200">Overview</TabsTrigger>
                <TabsTrigger value="streams" className="transition-all duration-200">Revenue Streams</TabsTrigger>
                <TabsTrigger value="customers" className="transition-all duration-200">Customers</TabsTrigger>
                <TabsTrigger value="forecasting" className="transition-all duration-200">Forecasting</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                {/* Revenue KPIs */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {revenueMetrics.map((metric, index) => (
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

              <TabsContent value="streams" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {revenueStreams.map((stream, index) => (
                    <Card key={stream.name} className={cn(
                      "transition-all duration-500 hover:shadow-lg hover:scale-105",
                      mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    )} style={{ animationDelay: `${index * 100}ms` }}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{stream.name}</CardTitle>
                          <ArrowUpDown
                            className={cn(
                              "h-5 w-5",
                              stream.trend === "up" ? "text-green-500" : "text-red-500"
                            )}
                          />
                        </div>
                        <CardDescription>
                          {stream.percentage}% of total revenue
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold">{stream.amount}</span>
                            <Badge variant="outline" className="text-xs">
                              {stream.trend === "up" ? "+" : "-"}{Math.floor(Math.random() * 10) + 5}%
                            </Badge>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-500"
                              style={{ width: `${stream.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <ChartsSection />
              </TabsContent>

              <TabsContent value="customers" className="space-y-4">
                <Card className={cn(
                  "transition-all duration-500",
                  mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}>
                  <CardHeader>
                    <CardTitle>Customer Segments by Revenue</CardTitle>
                    <CardDescription>
                      Revenue breakdown by customer segments and their contribution
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {customerSegments.map((segment, index) => (
                        <div
                          key={segment.segment}
                          className="flex items-center justify-between p-3 rounded-lg border bg-card/50 hover:bg-accent/50 transition-colors duration-200"
                        >
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium">{segment.segment}</span>
                              <span className="text-sm font-bold text-primary">{segment.revenue}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <span>{segment.customers} customers • Avg: {segment.avgValue}</span>
                              <Badge
                                variant="outline"
                                className="text-xs text-green-600 border-green-200"
                              >
                                {segment.growth}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <KPICards />
              </TabsContent>

              <TabsContent value="forecasting" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className={cn(
                    "transition-all duration-500 hover:shadow-lg hover:scale-105",
                    mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  )}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary" />
                        Revenue Forecast
                      </CardTitle>
                      <CardDescription>Projected revenue for next quarter</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-primary">$142,500</div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Based on current growth trends
                      </p>
                    </CardContent>
                  </Card>

                  <Card className={cn(
                    "transition-all duration-500 hover:shadow-lg hover:scale-105",
                    mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  )}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Receipt className="h-5 w-5 text-primary" />
                        Churn Impact
                      </CardTitle>
                      <CardDescription>Revenue at risk from churn</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-red-500">-$8,750</div>
                      <p className="text-sm text-muted-foreground mt-1">
                        7% churn rate projection
                      </p>
                    </CardContent>
                  </Card>

                  <Card className={cn(
                    "transition-all duration-500 hover:shadow-lg hover:scale-105",
                    mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  )}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Growth Potential
                      </CardTitle>
                      <CardDescription>Additional revenue opportunity</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-500">$24,300</div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Through upsells and expansions
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card className={cn(
                  "transition-all duration-500",
                  mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}>
                  <CardHeader>
                    <CardTitle>Revenue Projections</CardTitle>
                    <CardDescription>12-month revenue forecast with confidence intervals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { month: "Mar 2024", projected: "$128,500", confidence: "High" },
                        { month: "Apr 2024", projected: "$132,200", confidence: "High" },
                        { month: "May 2024", projected: "$138,900", confidence: "Medium" },
                        { month: "Jun 2024", projected: "$142,500", confidence: "Medium" }
                      ].map((projection, index) => (
                        <div key={projection.month} className="flex items-center justify-between p-3 rounded-lg border">
                          <span className="font-medium">{projection.month}</span>
                          <div className="flex items-center gap-3">
                            <span className="font-bold">{projection.projected}</span>
                            <Badge
                              variant={projection.confidence === "High" ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {projection.confidence}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
