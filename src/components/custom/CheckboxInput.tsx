import { forwardRef } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/helpers/utils";

interface CheckboxInputProps extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, "value"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const CheckboxInput = forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxInputProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => (
    <CheckboxPrimitive.Root
      {...props}
      ref={ref}
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-blue focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue data-[state=checked]:text-white",
        className
      )}
      id={props?.id}
    >
      <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
);

export default CheckboxInput;
