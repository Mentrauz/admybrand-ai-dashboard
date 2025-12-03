"use client"

import { useState, useEffect, memo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts'
import { cn } from "@/lib/utils"
import { TrendingUp, Users, MousePointer, DollarSign, Target } from "lucide-react"

const iconMap: { [key: string]: any } = {
  TrendingUp,
  Users,
  MousePointer,
  DollarSign,
  Target,
}

// These functions are now handled by the backend

const chartConfig = {
  achieved: {
    label: "Achieved",
    color: "hsl(220 70% 50%)",
  },
  target: {
    label: "Target",
    color: "hsl(var(--muted-foreground))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(220 70% 50%)",
  },
  users: {
    label: "Users",
    color: "hsl(160 60% 45%)",
  },
}

export function ChartsSection() {
  const [revenueData, setRevenueData] = useState<any[]>([])
  const [trafficData, setTrafficData] = useState<any[]>([])
  const [performanceData, setPerformanceData] = useState<any[]>([])
  const [isUpdating, setIsUpdating] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    if (isFetching) return // Prevent multiple simultaneous requests

    setIsFetching(true)
    try {
      const response = await fetch('/api/dashboard')
      const result = await response.json()
      if (result.success) {
        setRevenueData(result.data.revenue)
        setTrafficData(result.data.traffic)
        setPerformanceData(result.data.performance)
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
      setIsFetching(false)
    }
  }

  // Real-time updates from backend (reduced frequency for better performance)
  useEffect(() => {
    if (loading || isFetching) return

    const interval = setInterval(async () => {
      if (isFetching) return // Skip if already fetching

      setIsUpdating(true)

      try {
        // Call PUT endpoint to update data on backend
        const response = await fetch('/api/dashboard', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const result = await response.json()
        if (result.success) {
          setRevenueData(result.data.revenue)
          setTrafficData(result.data.traffic)
          setPerformanceData(result.data.performance)
        }
      } catch (error) {
        console.error('Failed to update chart data:', error)
      }

      // Brief visual indicator of update
      setTimeout(() => setIsUpdating(false), 500)
    }, 10000) // Reduced from 4s to 10s for better performance

    return () => clearInterval(interval)
  }, [loading, isFetching])

  if (loading) {
    return <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Card key={i} className={cn(
          "h-[400px] animate-pulse bg-muted/50",
          i === 3 && "col-span-full"
        )} />
      ))}
    </div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Revenue & Users Chart */}
      <Card className={cn(
        "col-span-full lg:col-span-2 transition-all duration-300",
        isUpdating && "ring-2 ring-blue-500/20 shadow-lg"
      )}>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              Revenue & Users Overview
              {/* Live indicator */}
              <span className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                isUpdating ? "bg-blue-500 animate-ping" : "bg-blue-500/60"
              )} />
            </CardTitle>
            <CardDescription>
              Monthly revenue and user acquisition trends {isUpdating && "(Updating...)"}
            </CardDescription>
          </div>
          {/* Real-time indicator bar */}
          <div className={cn(
            "w-16 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-300",
            isUpdating ? "opacity-100 animate-pulse" : "opacity-30"
          )} />
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="month"
                  className="fill-muted-foreground text-xs"
                />
                <YAxis className="fill-muted-foreground text-xs" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-revenue)"
                  strokeWidth={3}
                  dot={{ fill: "var(--color-revenue)", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "var(--color-revenue)", strokeWidth: 2 }}
                  className={cn(isUpdating && "animate-pulse")}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="var(--color-users)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-users)", strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5, stroke: "var(--color-users)", strokeWidth: 2 }}
                  className={cn(isUpdating && "animate-pulse")}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Traffic Sources Pie Chart */}
      <Card className={cn(
        "transition-all duration-300",
        isUpdating && "ring-2 ring-green-500/20 shadow-lg"
      )}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Traffic Sources
            <span className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              isUpdating ? "bg-green-500 animate-ping" : "bg-green-500/60"
            )} />
          </CardTitle>
          <CardDescription>
            Distribution of website traffic {isUpdating && "(Live)"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  className={cn(isUpdating && "animate-pulse")}
                >
                  {trafficData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Legend */}
          <div className="grid grid-cols-1 gap-2 mt-4">
            {trafficData.map((entry, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-muted-foreground">{entry.name}</span>
                </div>
                <span className={cn(
                  "font-medium transition-all duration-300",
                  isUpdating && "text-primary animate-pulse"
                )}>
                  {entry.value}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Performance Metrics */}
      <Card className={cn(
        "col-span-full transition-all duration-500 group relative overflow-hidden",
        isUpdating && "ring-2 ring-purple-500/20 shadow-2xl"
      )}>
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/5 pointer-events-none" />

        <CardHeader className="relative z-10 border-b border-border/40 bg-gradient-to-r from-background to-muted/10">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                <div className="relative">
                  <div className="h-3 w-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-lg shadow-purple-500/30" />
                  <div className={cn(
                    "absolute -inset-1 h-5 w-5 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full transition-all duration-300",
                    isUpdating && "animate-ping"
                  )} />
                </div>
                Performance vs Targets
                <span className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  isUpdating ? "bg-purple-500 animate-ping" : "bg-purple-500/60"
                )} />
              </CardTitle>
              <CardDescription className="text-base">
                Key metrics achievement compared to monthly targets {isUpdating && "(Real-time updates)"}
              </CardDescription>
            </div>

            {/* Summary Stats */}
            <div className="hidden lg:flex items-center gap-6">
              <div className="text-center p-3 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20">
                <div className="text-2xl font-bold text-emerald-600">
                  {performanceData.filter(d => d.achieved >= 100).length}/5
                </div>
                <div className="text-xs text-emerald-700 font-medium">Targets Met</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(performanceData.reduce((acc, d) => acc + d.achieved, 0) / Math.max(1, performanceData.length))}%
                </div>
                <div className="text-xs text-blue-700 font-medium">Avg Score</div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative z-10 p-8">
          <ChartContainer config={chartConfig} className="h-[450px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={performanceData}
                margin={{ top: 30, right: 30, left: 20, bottom: 20 }}
                barCategoryGap="20%"
              >
                <defs>
                  {performanceData.map((item) => (
                    <linearGradient key={item.gradientId} id={item.gradientId} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={item.color} stopOpacity={0.9} />
                      <stop offset="100%" stopColor={item.color} stopOpacity={0.3} />
                    </linearGradient>
                  ))}
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />

                {/* Enhanced target line */}
                <ReferenceLine
                  y={100}
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={2}
                  strokeDasharray="8 4"
                  opacity={0.6}
                />

                <XAxis
                  dataKey="metric"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={13}
                  fontWeight={500}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `${value}%`}
                  domain={[0, 140]}
                />

                <ChartTooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="rounded-xl border border-border/60 bg-background/95 backdrop-blur-sm shadow-xl p-4 min-w-[200px]">
                          <div className="flex items-center gap-3 mb-3">
                            <div
                              className="h-3 w-3 rounded-full shadow-lg"
                              style={{ backgroundColor: data.color }}
                            />
                            <p className="font-bold text-foreground text-lg">{label}</p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground font-medium">Achievement</span>
                              <span className={`font-bold text-lg ${data.achieved >= 100 ? 'text-green-600' : 'text-orange-600'}`}>
                                {data.achieved}%
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground font-medium">Target</span>
                              <span className="font-medium text-muted-foreground">{data.target}%</span>
                            </div>
                            <div className="pt-2 border-t border-border/50">
                              <div className={`text-center px-3 py-1 rounded-full text-xs font-bold ${data.achieved >= 100 ? 'bg-green-500/20 text-green-700' : 'bg-orange-500/20 text-orange-700'}`}>
                                {data.achieved >= 100 ? 'TARGET EXCEEDED' : 'BELOW TARGET'}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                  cursor={{ fill: 'rgba(139, 92, 246, 0.1)', radius: 8 }}
                />

                <Bar
                  dataKey="achieved"
                  radius={[8, 8, 4, 4]}
                  className={cn(isUpdating && "animate-pulse")}
                >
                  {performanceData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`url(#${entry.gradientId})`}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Enhanced Performance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-8">
            {performanceData.map((item, index) => {
              const Icon = iconMap[item.icon] || Target;
              return (
                <div
                  key={item.metric}
                  className={cn(
                    "group/card relative p-6 rounded-2xl border transition-all duration-500 hover:shadow-xl hover:-translate-y-2 cursor-pointer overflow-hidden",
                    item.achieved >= 100
                      ? "bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200/60 hover:border-emerald-300 dark:from-emerald-950/20 dark:to-emerald-900/10 dark:border-emerald-800/40"
                      : "bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200/60 hover:border-orange-300 dark:from-orange-950/20 dark:to-orange-900/10 dark:border-orange-800/40"
                  )}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white to-transparent" />
                  </div>

                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={cn(
                        "p-3 rounded-xl shadow-lg transition-all duration-300 group-hover/card:scale-110 group-hover/card:rotate-3",
                        item.achieved >= 100
                          ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white"
                          : "bg-gradient-to-br from-orange-500 to-orange-600 text-white"
                      )}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold transition-all duration-300",
                        item.achieved >= 100
                          ? "bg-emerald-500/20 text-emerald-700 dark:bg-emerald-500/30 dark:text-emerald-400"
                          : "bg-orange-500/20 text-orange-700 dark:bg-orange-500/30 dark:text-orange-400"
                      )}>
                        {item.achieved >= 100 ? 'ACHIEVED' : 'PENDING'}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-bold text-sm text-foreground group-hover/card:text-primary transition-colors">
                        {item.metric}
                      </h4>
                      <div className={cn(
                        "text-3xl font-black transition-all duration-300 group-hover/card:scale-110 origin-left",
                        item.achieved >= 100 ? "text-emerald-600" : "text-orange-600",
                        isUpdating && "animate-pulse"
                      )}>
                        {item.achieved}%
                      </div>

                      {/* Enhanced progress bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Target: {item.target}%</span>
                          <span className={cn(
                            "font-bold",
                            item.achieved >= item.target ? "text-emerald-600" : "text-orange-600"
                          )}>
                            {item.achieved >= item.target ? `+${item.achieved - item.target}%` : `${item.achieved - item.target}%`}
                          </span>
                        </div>
                        <div className="w-full bg-muted/40 rounded-full h-3 overflow-hidden shadow-inner">
                          <div
                            className={cn(
                              "h-3 rounded-full transition-all duration-1000 relative overflow-hidden",
                              item.achieved >= 100
                                ? "bg-gradient-to-r from-emerald-500 to-emerald-400 shadow-lg shadow-emerald-500/30"
                                : "bg-gradient-to-r from-orange-500 to-orange-400 shadow-lg shadow-orange-500/30"
                            )}
                            style={{
                              width: `${Math.min(item.achieved, 100)}%`,
                              animationDelay: `${index * 200}ms`
                            }}
                          >
                            {/* Shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default memo(ChartsSection)
