"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, TrendingUp, Percent } from "lucide-react"
import { cn } from "@/lib/utils"

type ChangeType = "positive" | "negative"

interface KPIData {
  title: string
  value: number
  change: number
  changeType: ChangeType
  icon: any
  prefix: string
  suffix: string
  baseValue: number // Store original value for realistic fluctuations
  trend: number // Overall trend direction
}

const initialKpiData: KPIData[] = [
  {
    title: "Total Revenue",
    value: 45231.89,
    change: 20.1,
    changeType: "positive" as ChangeType,
    icon: DollarSign,
    prefix: "$",
    suffix: "",
    baseValue: 45231.89,
    trend: 1.2,
  },
  {
    title: "Active Users",
    value: 2350,
    change: 180.1,
    changeType: "positive" as ChangeType,
    icon: Users,
    prefix: "",
    suffix: "",
    baseValue: 2350,
    trend: 0.8,
  },
  {
    title: "Conversions",
    value: 12234,
    change: 19,
    changeType: "positive" as ChangeType,
    icon: TrendingUp,
    prefix: "",
    suffix: "",
    baseValue: 12234,
    trend: 1.1,
  },
  {
    title: "Growth Rate",
    value: 23.5,
    change: 2.1,
    changeType: "positive" as ChangeType,
    icon: Percent,
    prefix: "",
    suffix: "%",
    baseValue: 23.5,
    trend: 0.15,
  },
]

// Function to generate realistic fluctuations
const generateFluctuation = (baseValue: number, trend: number, isPercentage: boolean = false) => {
  const maxChange = isPercentage ? 0.1 : baseValue * 0.002 // 0.2% fluctuation for regular values, 0.1 for percentages
  const randomChange = (Math.random() - 0.5) * 2 * maxChange
  const trendInfluence = trend * (Math.random() * 0.5 + 0.5) // 50-100% of trend applied
  
  return baseValue + randomChange + trendInfluence
}

export function KPICards() {
  const [kpiData, setKpiData] = useState(initialKpiData)
  const [mounted, setMounted] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true)
      
      setKpiData(prevData => 
        prevData.map(kpi => {
          const isPercentage = kpi.suffix === "%"
          const newValue = generateFluctuation(kpi.baseValue, kpi.trend, isPercentage)
          const changeFromBase = ((newValue - kpi.baseValue) / kpi.baseValue) * 100
          
          // Update base value slowly to simulate overall growth
          const newBaseValue = kpi.baseValue + (kpi.trend * 0.1)
          
          return {
            ...kpi,
            value: Math.max(0, newValue), // Ensure no negative values
            change: Math.abs(changeFromBase),
            changeType: changeFromBase >= 0 ? "positive" : "negative" as ChangeType,
            baseValue: newBaseValue,
          }
        })
      )
      
      // Brief visual indicator of update
      setTimeout(() => setIsUpdating(false), 300)
    }, 3000) // Update every 3 seconds

    return () => clearInterval(interval)
  }, [])

  const formatValue = (value: number, prefix: string, suffix: string) => {
    if (prefix === "$") {
      return `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    }
    return `${prefix}${value.toLocaleString(undefined, { maximumFractionDigits: suffix === "%" ? 1 : 0 })}${suffix}`
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi, index) => (
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
            <kpi.icon className={cn(
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
      ))}
    </div>
  )
}
