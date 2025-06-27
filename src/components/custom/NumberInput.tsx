import { FC, forwardRef, InputHTMLAttributes } from "react";
import { Label } from "../ui/label";
import { cn } from "@/helpers/utils";
import Tooltip from "./Tooltip";

interface NumberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string | undefined;
  label?: string;
  type?: string;
  error?: string;
  className?: string;
  preventKeys?: string[];
  tooltip?: string;
  maxChar?: number;
}
const NumberInput: FC<NumberInputProps> = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    { placeholder, label, error, className, maxChar = 15, disabled = false, preventKeys = ["e", "+", "-"], tooltip, ...rest },
    ref
  ) => {
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
          inputMode="numeric"
          type={"number"}
          {...rest}
          ref={ref}
          min={rest?.min ?? 0}
          max={rest?.max ?? "9999999999999999"}
          placeholder={placeholder}
          className={cn(
            `flex h-11 w-full rounded border ${
              error ? "border-red" : "border-contrast"
            } bg-white px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-contrast disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
            className
          )}
          onChange={(e) => {
            if (maxChar && e.target.value.toString().length > maxChar) {
              e.preventDefault();
              return;
            } else {
              rest?.onChange?.(e);
            }
          }}
          onKeyDown={(e) => {
            if (preventKeys.includes(e.key)) e.preventDefault();
          }}
          disabled={disabled}
        />
      </>
    );
  }
);
export default NumberInput;
