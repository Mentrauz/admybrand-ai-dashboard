"use client"

import { BarChart3, Home, LineChart, PieChart, Settings, TrendingUp, Users, DollarSign, FileText, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

const navigationItems = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
  },
  {
    title: "Analytics",
    url: "#",
    icon: BarChart3,
  },
  {
    title: "Revenue",
    url: "#",
    icon: DollarSign,
  },
  {
    title: "Users",
    url: "#",
    icon: Users,
  },
  {
    title: "Reports",
    url: "#",
    icon: FileText,
  },
]

const chartItems = [
  {
    title: "Line Charts",
    url: "#",
    icon: LineChart,
  },
  {
    title: "Bar Charts",
    url: "#",
    icon: BarChart3,
  },
  {
    title: "Pie Charts",
    url: "#",
    icon: PieChart,
  },
  {
    title: "Trends",
    url: "#",
    icon: TrendingUp,
  },
]

export function AppSidebar() {
  const { setTheme, theme } = useTheme()

  return (
    <Sidebar className="animate-in slide-in-from-left-4 duration-500 ease-out">
      <SidebarHeader className="border-b border-border/50 p-4 animate-in fade-in-0 slide-in-from-top-2 duration-700 delay-100">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-6">
            <BarChart3 className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold transition-colors duration-300 hover:text-primary">ADmyBRAND</h2>
            <p className="text-xs text-muted-foreground transition-colors duration-300">Analytics Dashboard</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-2 mb-2 transition-colors duration-300 hover:text-foreground animate-in fade-in-0 slide-in-from-left-2 duration-700 delay-200">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item, index) => (
                <SidebarMenuItem 
                  key={item.title}
                  className="animate-in fade-in-0 slide-in-from-left-3 duration-500"
                  style={{
                    animationDelay: `${300 + index * 100}ms`
                  }}
                >
                  <SidebarMenuButton 
                    asChild 
                    className="transition-all duration-300 hover:bg-accent hover:text-accent-foreground rounded-lg px-3 py-2 group hover:scale-105 hover:shadow-sm"
                  >
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 transition-all duration-300 group-hover:scale-110 group-hover:text-primary" />
                      <span className="transition-all duration-300 group-hover:translate-x-1">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-2 mb-2 mt-6 transition-colors duration-300 hover:text-foreground animate-in fade-in-0 slide-in-from-left-2 duration-700 delay-600">
            Charts & Visualizations
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {chartItems.map((item, index) => (
                <SidebarMenuItem 
                  key={item.title}
                  className="animate-in fade-in-0 slide-in-from-left-3 duration-500"
                  style={{
                    animationDelay: `${700 + index * 100}ms`
                  }}
                >
                  <SidebarMenuButton 
                    asChild 
                    className="transition-all duration-300 hover:bg-accent hover:text-accent-foreground rounded-lg px-3 py-2 group hover:scale-105 hover:shadow-sm"
                  >
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 transition-all duration-300 group-hover:scale-110 group-hover:text-primary" />
                      <span className="transition-all duration-300 group-hover:translate-x-1">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/50 p-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-700 delay-1000">
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground transition-colors duration-300 hover:text-foreground">
            Theme
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-8 w-8 p-0 transition-all duration-300 hover:bg-accent hover:scale-110 hover:rotate-12 group"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 group-hover:text-primary" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 group-hover:text-primary" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
