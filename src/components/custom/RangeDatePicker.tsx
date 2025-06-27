"use client"
import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/helpers/utils"
import moment from "moment"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

type RangeDatePickerProps = {
  value?: DateRange
  onChange: (range: DateRange | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  error?: string
  label?: string
  showPresets?: boolean
  align?: "horizontal" | "vertical"
}

const getPresetRange = (key: string): DateRange => {
  const now = new Date()
  switch (key) {
    case "today":
      return { from: now, to: now }
    case "24h":
      return { from: new Date(now.getTime() - 24 * 60 * 60 * 1000), to: now }
    case "7d":
      return { from: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), to: now }
    case "30d":
      return { from: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000), to: now }
    case "60d":
      return { from: new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000), to: now }
    case "90d":
      return { from: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000), to: now }
    default:
      return { from: now, to: now }
  }
}
export const RangeDatePicker: React.FC<RangeDatePickerProps> = ({ value, align, onChange, placeholder = "Pick a date range", className, showPresets = false, disabled, error, label }) => {
  const now = new Date()
  const handlePresetChange = (key: string) => {
    if (key === "custom") onChange({ from: now, to: now })
    onChange(getPresetRange(key))
  }
  const text = error || label || ""

  return (
    <div className={cn("space-y-1", className)}>
      {text && align === "vertical" && (
        <div className="flex gap-2 items-center">
          <Label className={`${error ? "text-red" : ""}`}>{text}</Label>
        </div>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className={cn("w-full justify-start text-left font-normal border-contrast h-11", !value?.from && "text-muted-foreground")} disabled={disabled}>
            {align === "horizontal" ? <span className="font-semibold text-black">{label}:</span> : <CalendarIcon className="mr-2 h-4 w-4" />}
            {value?.from ? (
              value.to ? (
                <>
                  {moment(value.from).format("MMM Do, YYYY")} - {moment(value.to).format("MMM Do, YYYY")}
                </>
              ) : (
                moment(value.from).format("MMM Do, YYYY")
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {showPresets && (
            <div className="w-full p-2 pb-0">
              <Select onValueChange={handlePresetChange}>
                <SelectTrigger className="mb-4 min-w-[220px] w-full">
                  <SelectValue placeholder="Select Preset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="24h">last 24 hours</SelectItem>
                  <SelectItem value="7d">last 7 days</SelectItem>
                  <SelectItem value="30d">last 30 days</SelectItem>
                  <SelectItem value="60d">last 60 days</SelectItem>
                  <SelectItem value="90d">last 90 days</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <Calendar initialFocus mode="range" defaultMonth={value?.from} selected={value} onSelect={onChange} numberOfMonths={2} />
        </PopoverContent>
      </Popover>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}

// USE LIKE THIS

{
  /* <Controller
  name="booking_dates"
  control={control}
  render={({ field }) => (
    <RangeDatePicker
      {...field}
      label="Booking Dates"
      error={errors?.booking_dates?.message}
    />
  )}
/> */
}
