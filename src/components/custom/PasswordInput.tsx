/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, forwardRef, InputHTMLAttributes, useState } from "react";
import { cn } from "@/helpers/utils";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react"; // Importing eye icons for visibility toggle
import Tooltip from "./Tooltip";

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string | undefined;
  label?: string;
  type?: string;
  error?: string;
  className?: string;
  showOffEyeIcon?: boolean; // Determines whether to show the eye icon
  height?: string;
  radiusStyle?: string;
  tooltip?: string;
  ref?: any;
}

const PasswordInput: FC<inputProps> = forwardRef<HTMLInputElement, inputProps>(
  ({ className, label = "", error, tooltip, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false); // To toggle password visibility

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
        <div className="relative w-full">
          <input
            ref={ref}
            {...rest}
            type={showPassword ? "text" : "password"}
            className={cn(
              "flex h-11 w-full rounded border border-contrast bg-transparent px-3 py-1 pe-10 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-contrast disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              className
            )}
          />
          <span className={`absolute  text-grey cursor-pointer top-3 end-3`} onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </span>
        </div>
      </>
    );
  }
);

export default PasswordInput;
