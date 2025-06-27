import React, { FC, forwardRef } from "react";
import { RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/helpers/utils";

interface RadioProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  label?: string;
  className?: string;
}

const Radio: FC<RadioProps> = forwardRef<HTMLButtonElement, RadioProps>(({ label, className = "", ...props }, ref) => {
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem
        ref={ref}
        id={props?.id}
        className={cn("checked:bg-red checked:text-white enabled:checked:bg-contrast enabled:checked:text-white", className)}
        {...props}
      />
      {label && (
        <Label htmlFor={props?.id} className="m-0 cursor-pointer">
          {label}
        </Label>
      )}
    </div>
  );
});

export default Radio;
