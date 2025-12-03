"use client"

import { useState, useEffect, memo, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, TrendingUp, Percent } from "lucide-react"
import { cn } from "@/lib/utils"

type ChangeType = "positive" | "negative"

interface KPIData {
  title: string
  value: number
  change: number
  changeType: ChangeType
  icon: string
  prefix: string
  suffix: string
  baseValue: number
  trend: number
}

const iconMap: { [key: string]: any } = {
  DollarSign,
  Users,
  TrendingUp,
  Percent,
}

// Function to generate realistic fluctuations
const generateFluctuation = (baseValue: number, trend: number, isPercentage: boolean = false) => {
  const maxChange = isPercentage ? 0.1 : baseValue * 0.002 // 0.2% fluctuation for regular values, 0.1 for percentages
  const randomChange = (Math.random() - 0.5) * 2 * maxChange
  const trendInfluence = trend * (Math.random() * 0.5 + 0.5) // 50-100% of trend applied

  return baseValue + randomChange + trendInfluence
}

export function KPICards() {
  const [kpiData, setKpiData] = useState<KPIData[]>([])
  const [mounted, setMounted] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetchData()
  }, [])

  const fetchData = async () => {
    if (isFetching) return // Prevent multiple simultaneous requests

    setIsFetching(true)
    try {
      const response = await fetch('/api/dashboard')
      const result = await response.json()
      if (result.success) {
        setKpiData(result.data.kpis)
      }
    } catch (error) {
      console.error('Failed to fetch KPI data:', error)
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
          setKpiData(result.data.kpis)
        }
      } catch (error) {
        console.error('Failed to update KPI data:', error)
      }

      // Brief visual indicator of update
      setTimeout(() => setIsUpdating(false), 300)
    }, 8000) // Reduced from 3s to 8s for better performance

    return () => clearInterval(interval)
  }, [loading, isFetching])

  const formatValue = useMemo(() => (value: number, prefix: string, suffix: string) => {
    if (prefix === "$") {
      return `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    }
    return `${prefix}${value.toLocaleString(undefined, { maximumFractionDigits: suffix === "%" ? 1 : 0 })}${suffix}`
  }, [])

  if (loading) {
    return <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="h-[120px] animate-pulse bg-muted/50" />
      ))}
    </div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi, index) => {
        const Icon = iconMap[kpi.icon] || TrendingUp

        return (
          <Card
            key={kpi.title}
            className={cn(
              "transition-all duration-500 hover:shadow-lg hover:-translate-y-1 border-border/50 hover:border-border group cursor-pointer transform-gpu relative overflow-hidden",
              mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
              isUpdating && "ring-2 ring-primary/20 shadow-lg"
            )}
            style={{
              transitionDelay: mounted ? `${index * 100}ms` : '0ms'
            }}
          >
            {/* Real-time indicator */}
            <div className={cn(
              "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-300",
              isUpdating ? "opacity-100 animate-pulse" : "opacity-0"
            )} />

            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 transition-all duration-300 group-hover:bg-accent/30">
              <CardTitle className="text-sm font-medium transition-all duration-300 group-hover:text-primary group-hover:scale-105 origin-left">
                {kpi.title}
                {/* Live indicator dot */}
                <span className={cn(
                  "ml-2 inline-block w-2 h-2 rounded-full transition-all duration-300",
                  isUpdating ? "bg-green-500 animate-ping" : "bg-green-500/60"
                )} />
              </CardTitle>
              <Icon className={cn(
                "h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:scale-110 group-hover:rotate-6",
                isUpdating && "text-primary animate-pulse"
              )} />
            </CardHeader>
            <CardContent className="space-y-1">
              <div className={cn(
                "text-2xl font-bold transition-all duration-300 group-hover:text-foreground group-hover:scale-105 origin-left",
                isUpdating && "text-primary animate-pulse"
              )}>
                {formatValue(kpi.value, kpi.prefix, kpi.suffix)}
              </div>
              <p className="text-xs text-muted-foreground transition-all duration-300 group-hover:text-muted-foreground/80">
                <span className={cn(
                  "font-medium transition-all duration-300 inline-flex items-center gap-1",
                  kpi.changeType === "positive" ? "text-green-600 group-hover:text-green-700" : "text-red-600 group-hover:text-red-700"
                )}>
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    {kpi.changeType === "positive" ? "+" : "-"}{kpi.change.toFixed(1)}%
                  </span>
                  {/* Real-time pulse indicator */}
                  <span className={cn(
                    "w-1 h-1 rounded-full transition-all duration-300",
                    isUpdating ? "bg-current animate-ping" : "bg-current/60"
                  )} />
                </span>{" "}
                <span className="transition-colors duration-300 group-hover:text-foreground/70">
                  from last month
                </span>
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default memo(KPICards)
