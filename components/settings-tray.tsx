"use client"

import { useState } from "react"
import { Settings, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function SettingsTray() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="hidden md:flex transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:border-primary/30 hover:scale-105 flex-shrink-0"
        >
          <Settings className="h-4 w-4 transition-transform duration-200 hover:rotate-90" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-0 animate-in fade-in-0 zoom-in-95 duration-200" 
        align="end"
        sideOffset={8}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <h3 className="font-semibold text-sm">Settings</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 hover:bg-accent transition-colors duration-150"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <Settings className="h-8 w-8 mb-2 opacity-50" />
          <p className="text-sm">Nothing here</p>
        </div>
      </PopoverContent>
    </Popover>
  )
} 