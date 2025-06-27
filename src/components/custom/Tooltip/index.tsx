import { Tooltip as ShadcnTooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircleIcon } from "lucide-react"

type Placement = "top" | "right" | "bottom" | "left"

interface TooltipProps {
  tooltipContent: string
  side?: Placement
  defaultIcon?: boolean
  children?: React.ReactNode
}

const Tooltip = ({ tooltipContent, defaultIcon = true, side = "top", children }: TooltipProps) => {
  return (
    <TooltipProvider delayDuration={100}>
      <ShadcnTooltip>
        <TooltipTrigger asChild>{defaultIcon ? <HelpCircleIcon className="text-blue cursor-pointer flex" width={16} height={16} /> : children}</TooltipTrigger>
        <TooltipContent side={side}>{tooltipContent}</TooltipContent>
      </ShadcnTooltip>
    </TooltipProvider>
  )
}

export default Tooltip
