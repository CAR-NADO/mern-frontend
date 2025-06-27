/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"
import { cn } from "@/helpers/utils"
import { Label } from "../ui/label"
import Tooltip from "./Tooltip"

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  rows?: number
  label?: string
  placeholder?: string
  className?: string
  disabled?: boolean
  error?: string
  maxLength?: number
  ref?: any
  tooltip?: string
}

const TextareaInput = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ rows = 4, error, label, tooltip = "", placeholder = "Type here", className = "", disabled = false, maxLength = 200, ...props }, ref) => {
  const text = error || label || ""
  return (
    <>
      {text && (
        <div className="flex gap-2 items-center">
          <Label className={`${error ? "text-red" : ""}`} htmlFor={props?.id}>
            {text}
          </Label>
          {tooltip && (
            <div className="flex mb-2">
              <Tooltip tooltipContent={tooltip} />
            </div>
          )}
        </div>
      )}
      <textarea {...props} ref={ref} className={cn(`flex min-h-[60px] w-full shadow-none rounded-sm border ${error ? "border-red" : "border-contrast"} bg-white px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-contrast focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`, className)} rows={rows} placeholder={placeholder} maxLength={maxLength} disabled={disabled} />
    </>
  )
})

TextareaInput.displayName = "TextareaInput"

export default TextareaInput
