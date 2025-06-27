"use client"
import * as React from "react"
import { Calendar as CalendarIcon, Clock4 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/helpers/utils"
import moment from "moment"
import { Label } from "../ui/label"

type Props = {
  value?: Date
  onChange: (date: Date | undefined) => void
  label?: string
  error?: string
  placeholder?: string
  className?: string
  description?: string
  mode?: "datetime" | "time"
}

export const DateTimePicker = React.forwardRef<HTMLButtonElement, Props>(({ value, mode = "datetime", onChange, label, error, placeholder = "MM/DD/YYYY HH:mm", className, description }, ref) => {
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const updated = new Date(date)
      if (value) {
        updated.setHours(value.getHours())
        updated.setMinutes(value.getMinutes())
      }
      onChange(updated)
    }
  }

  const handleTimeChange = (type: "hour" | "minute", val: string) => {
    const currentDate = value || new Date()
    const updated = new Date(currentDate)
    if (type === "hour") {
      updated.setHours(parseInt(val, 10))
    } else {
      updated.setMinutes(parseInt(val, 10))
    }
    onChange(updated)
  }

  const text = error || label || ""
  return (
    <div className={cn("space-y-1", className)}>
      {text && (
        <div className="flex gap-2 items-center">
          <Label className={`${error ? "text-red" : ""}`}>{text}</Label>
        </div>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button ref={ref} variant="outline" className={cn("w-full pl-3 text-left font-normal border-contrast h-11", !value && "text-muted-foreground")}>
            {value ? moment(value).format(mode === "time" ? "HH:mm" : "MM/DD/YYYY HH:mm") : <span>{placeholder}</span>}
            {mode == "datetime" ? <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> : <Clock4 className="ml-auto h-4 w-4 opacity-50" />}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <div className="sm:flex">
            {mode !== "time" && <Calendar mode="single" selected={value} onSelect={handleDateSelect} initialFocus />}
            <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
              <ScrollArea className="w-64 sm:w-auto">
                <div className="flex sm:flex-col p-2">
                  {Array.from({ length: 24 }, (_, i) => i)
                    .reverse()
                    .map((hour) => (
                      <Button key={hour} size="icon" variant={value?.getHours() === hour ? "default" : "ghost"} className="sm:w-full shrink-0 aspect-square" onClick={() => handleTimeChange("hour", hour.toString())}>
                        {hour}
                      </Button>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" className="sm:hidden" />
              </ScrollArea>
              <ScrollArea className="w-64 sm:w-auto">
                <div className="flex sm:flex-col p-2">
                  {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                    <Button key={minute} size="icon" variant={value?.getMinutes() === minute ? "default" : "ghost"} className="sm:w-full shrink-0 aspect-square" onClick={() => handleTimeChange("minute", minute.toString())}>
                      {minute.toString().padStart(2, "0")}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="sm:hidden" />
              </ScrollArea>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
})

DateTimePicker.displayName = "DateTimePicker"