/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/helpers/utils";
import { Label } from "../ui/label";
import Tooltip from "./Tooltip";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string | undefined;
  label?: string;
  type?: string;
  error?: string;
  className?: string;
  showOffEyeIcon?: boolean;
  height?: string;
  radiusStyle?: string;
  tooltip?: string;
  ref?: any;
}

const TextInput: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label = "", error, tooltip, ...rest }, ref) => {
    const text = error || label || "";
    return (
      <>
        {text && (
          <div className="flex gap-2 items-center">
            <Label className={`${error ? "text-red" : ""}`} htmlFor={rest?.id}>
              {text}
            </Label>
            {tooltip && (
              <div className="flex mb-2">
                <Tooltip tooltipContent={tooltip} />
              </div>
            )}
          </div>
        )}
        <input
          ref={ref}
          {...rest}
          type={type}
          className={cn(
            `flex h-11 w-full rounded border ${
              error ? "border-red" : "border-contrast"
            } bg-white px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-contrast disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
            className
          )}
        />
      </>
    );
  }
);
TextInput.displayName = "TextInput";

export default TextInput;
