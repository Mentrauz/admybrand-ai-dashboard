"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Bell, Search, Settings, User, Calendar, Filter, FileText, Download, FileSpreadsheet, File, FileBarChart, Printer, Share2, TrendingUp, BarChart3, PieChart, Activity } from "lucide-react"
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

export function ReportsPage() {
  const [date, setDate] = useState<Date>()
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 1),
    to: addDays(new Date(2024, 0, 1), 30),
  })
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("generated")
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

  const reportCategories = [
    {
      category: "Financial Reports",
      count: 12,
      lastGenerated: "2 hours ago",
      icon: TrendingUp,
      reports: ["Revenue Report", "Expense Analysis", "Profit & Loss", "Cash Flow Statement"]
    },
    {
      category: "User Analytics",
      count: 8,
      lastGenerated: "1 day ago",
      icon: Activity,
      reports: ["User Growth", "Engagement Metrics", "Retention Analysis", "Cohort Analysis"]
    },
    {
      category: "Performance Reports",
      count: 6,
      lastGenerated: "3 hours ago",
      icon: BarChart3,
      reports: ["System Performance", "API Usage", "Error Logs", "Load Times"]
    },
    {
      category: "Business Intelligence",
      count: 10,
      lastGenerated: "6 hours ago",
      icon: PieChart,
      reports: ["Market Analysis", "Competitor Insights", "Customer Segmentation", "Trend Analysis"]
    }
  ]

  const generatedReports = [
    {
      id: 1,
      name: "Monthly Revenue Report",
      type: "Financial",
      generatedAt: "2024-01-15 14:30",
      size: "2.4 MB",
      format: "PDF",
      status: "completed",
      downloadUrl: "#"
    },
    {
      id: 2,
      name: "User Engagement Analysis",
      type: "Analytics",
      generatedAt: "2024-01-15 12:15",
      size: "1.8 MB",
      format: "Excel",
      status: "completed",
      downloadUrl: "#"
    },
    {
      id: 3,
      name: "Q4 Performance Summary",
      type: "Performance",
      generatedAt: "2024-01-15 10:45",
      size: "3.2 MB",
      format: "PDF",
      status: "processing",
      downloadUrl: "#"
    },
    {
      id: 4,
      name: "Customer Segmentation Report",
      type: "Business",
      generatedAt: "2024-01-14 16:20",
      size: "956 KB",
      format: "CSV",
      status: "completed",
      downloadUrl: "#"
    }
  ]

  const scheduledReports = [
    {
      id: 1,
      name: "Weekly Revenue Summary",
      frequency: "Weekly",
      nextRun: "2024-01-22 09:00",
      recipients: 3,
      format: "PDF",
      status: "active"
    },
    {
      id: 2,
      name: "Monthly User Metrics",
      frequency: "Monthly",
      nextRun: "2024-02-01 08:00",
      recipients: 5,
      format: "Excel",
      status: "active"
    },
    {
      id: 3,
      name: "Quarterly Business Review",
      frequency: "Quarterly",
      nextRun: "2024-04-01 10:00",
      recipients: 8,
      format: "PDF",
      status: "paused"
    }
  ]

  const reportTemplates = [
    {
      name: "Executive Summary",
      description: "High-level overview of key metrics and KPIs",
      category: "Executive",
      lastUsed: "2 days ago",
      popularity: 95
    },
    {
      name: "Detailed Analytics",
      description: "Comprehensive data analysis with charts and insights",
      category: "Analytics",
      lastUsed: "1 day ago",
      popularity: 87
    },
    {
      name: "Financial Statement",
      description: "Complete financial overview with projections",
      category: "Financial",
      lastUsed: "5 hours ago",
      popularity: 92
    },
    {
      name: "Performance Dashboard",
      description: "System and user performance metrics",
      category: "Technical",
      lastUsed: "1 week ago",
      popularity: 78
    }
  ]

  const handleExport = (format: string) => {
    // Handle export functionality
    console.log(`Exporting report as ${format}`)
  }

  const handleShare = (reportId: number) => {
    // Handle share functionality
    console.log(`Sharing report ${reportId}`)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>
      case "processing":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Processing</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Failed</Badge>
      case "active":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
      case "paused":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Paused</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

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
                  placeholder="Search reports..."
                  className="pl-8 transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary/50 hover:border-primary/30"
                />
              </div>
              <div className={cn(
                "ml-auto flex items-center gap-1 sm:gap-2 transition-all duration-700 delay-300 min-w-0",
                mounted ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
              )}>
                {/* Export Button */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:border-primary/30 hover:scale-105"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="animate-in fade-in-0 zoom-in-95 duration-200">
                    <DropdownMenuLabel>Export Format</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleExport("PDF")} className="transition-colors duration-150 focus:bg-accent">
                      <File className="h-4 w-4 mr-2" />
                      Export as PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExport("Excel")} className="transition-colors duration-150 focus:bg-accent">
                      <FileSpreadsheet className="h-4 w-4 mr-2" />
                      Export as Excel
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExport("CSV")} className="transition-colors duration-150 focus:bg-accent">
                      <FileBarChart className="h-4 w-4 mr-2" />
                      Export as CSV
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

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
                    <DropdownMenuLabel>Report Filters</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="transition-colors duration-150 focus:bg-accent">All Reports</DropdownMenuItem>
                    <DropdownMenuItem className="transition-colors duration-150 focus:bg-accent">Financial</DropdownMenuItem>
                    <DropdownMenuItem className="transition-colors duration-150 focus:bg-accent">Analytics</DropdownMenuItem>
                    <DropdownMenuItem className="transition-colors duration-150 focus:bg-accent">Performance</DropdownMenuItem>
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
                  Reports & Analytics
                </h2>
                <p className="text-muted-foreground transition-colors duration-300">
                  Generate, schedule, and manage comprehensive business reports and data exports.
                </p>
              </div>
            </div>

            {/* Reports Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="generated" className="transition-all duration-200">Generated Reports</TabsTrigger>
                <TabsTrigger value="scheduled" className="transition-all duration-200">Scheduled</TabsTrigger>
                <TabsTrigger value="templates" className="transition-all duration-200">Templates</TabsTrigger>
                <TabsTrigger value="categories" className="transition-all duration-200">Categories</TabsTrigger>
              </TabsList>

              <TabsContent value="generated" className="space-y-4">
                <Card className={cn(
                  "transition-all duration-500",
                  mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}>
                  <CardHeader>
                    <CardTitle>Recent Reports</CardTitle>
                    <CardDescription>
                      Your recently generated reports and their status
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {generatedReports.map((report, index) => (
                        <div
                          key={report.id}
                          className="flex items-center justify-between p-4 rounded-lg border bg-card/50 hover:bg-accent/50 transition-colors duration-200"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="p-2 rounded-lg bg-primary/10">
                              {report.format === "PDF" ? (
                                <File className="h-5 w-5 text-primary" />
                              ) : report.format === "Excel" ? (
                                <FileSpreadsheet className="h-5 w-5 text-primary" />
                              ) : (
                                <FileBarChart className="h-5 w-5 text-primary" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{report.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {report.type} • {report.size} • Generated {report.generatedAt}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            {getStatusBadge(report.status)}
                            <div className="flex space-x-2">
                              {report.status === "completed" && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleShare(report.id)}
                                    className="transition-all duration-200 hover:scale-105"
                                  >
                                    <Share2 className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="transition-all duration-200 hover:scale-105"
                                  >
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                className="transition-all duration-200 hover:scale-105"
                              >
                                <Printer className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="scheduled" className="space-y-4">
                <Card className={cn(
                  "transition-all duration-500",
                  mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}>
                  <CardHeader>
                    <CardTitle>Scheduled Reports</CardTitle>
                    <CardDescription>
                      Automated reports that run on a schedule and are delivered to recipients
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {scheduledReports.map((report, index) => (
                        <div
                          key={report.id}
                          className="flex items-center justify-between p-4 rounded-lg border bg-card/50 hover:bg-accent/50 transition-colors duration-200"
                        >
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{report.name}</span>
                              <div className="flex items-center space-x-2">
                                {getStatusBadge(report.status)}
                                <Badge variant="outline" className="text-xs">
                                  {report.frequency}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <span>Next run: {report.nextRun}</span>
                              <span>{report.recipients} recipients • {report.format}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className={cn(
                  "transition-all duration-500",
                  mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}>
                  <CardHeader>
                    <CardTitle>Create New Schedule</CardTitle>
                    <CardDescription>
                      Set up automated report generation and delivery
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Button className="h-24 flex-col space-y-2 transition-all duration-200 hover:scale-105">
                        <FileText className="h-6 w-6" />
                        <span>Schedule Report</span>
                      </Button>
                      <Button variant="outline" className="h-24 flex-col space-y-2 transition-all duration-200 hover:scale-105">
                        <Settings className="h-6 w-6" />
                        <span>Manage Schedules</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="templates" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {reportTemplates.map((template, index) => (
                    <Card key={template.name} className={cn(
                      "transition-all duration-500 hover:shadow-lg hover:scale-105 cursor-pointer",
                      mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    )} style={{ animationDelay: `${index * 100}ms` }}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {template.category}
                          </Badge>
                        </div>
                        <CardDescription>{template.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Last used:</span>
                            <span>{template.lastUsed}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Popularity:</span>
                            <div className="flex items-center space-x-2">
                              <Progress value={template.popularity} className="w-16" />
                              <span>{template.popularity}%</span>
                            </div>
                          </div>
                          <Button className="w-full transition-all duration-200 hover:scale-105">
                            Use Template
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="categories" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {reportCategories.map((category, index) => (
                    <Card key={category.category} className={cn(
                      "transition-all duration-500 hover:shadow-lg hover:scale-105",
                      mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    )} style={{ animationDelay: `${index * 100}ms` }}>
                      <CardHeader>
                        <div className="flex items-center space-x-2">
                          <category.icon className="h-5 w-5 text-primary" />
                          <div>
                            <CardTitle>{category.category}</CardTitle>
                            <CardDescription>{category.count} reports available</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="text-sm text-muted-foreground">
                            Last generated: {category.lastGenerated}
                          </div>
                          <div className="space-y-2">
                            {category.reports.map((report) => (
                              <div key={report} className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">• {report}</span>
                                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                  Generate
                                </Button>
                              </div>
                            ))}
                          </div>
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
