import { FC, forwardRef, Ref } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "../ui/label";
import { cn } from "@/helpers/utils";
import Tooltip from "./Tooltip";

interface OptionProps {
  label: string;
  value: string;
}

interface SelectInputProps {
  value?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  error?: string;
  placeholder?: string;
  className?: string;
  initialOptions?: OptionProps[];
  options?: OptionProps[];
  disabled?: boolean;
  disableOptions?: object;
  tooltip?: string;
}

const SelectInput: FC<SelectInputProps> = forwardRef(
  (
    {
      label,
      className = "bg-white",
      placeholder = "Select",
      options = [],
      initialOptions = [],
      value: selectedVal,
      onValueChange,
      error,
      disabled = false,
      disableOptions = [],
      tooltip = "",
      ...rest
    },
    ref: Ref<HTMLButtonElement>
  ) => {
    const text = error || label || "";
    return (
      <div className="">
        {text && (
          <div className="flex gap-2 items-center">
            <Label className={`${error ? "text-red" : ""}`}>{text}</Label>
            {tooltip && (
              <div className="flex mb-2">
                <Tooltip tooltipContent={tooltip} />
              </div>
            )}
          </div>
        )}
        <Select {...rest} value={selectedVal} onValueChange={onValueChange} disabled={disabled}>
          <SelectTrigger className={cn(`${error ? "border-red" : "border-contrast"}`, className)} ref={ref}>
            <SelectValue placeholder={placeholder}>
              {(initialOptions?.length > 0 ? initialOptions : options)?.find((option) => option.value === selectedVal)?.label ||
                placeholder}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup>
              {options &&
                options?.map((option) => {
                  const { label, value } = option;
                  return (
                    <SelectItem
                      key={value}
                      value={value}
                      className={cn("", value === selectedVal && "bg-slate-100")}
                      disabled={
                        Array.isArray(disableOptions) && disableOptions?.length > 0 ? !disableOptions?.includes(value) : false
                      }
                    >
                      {label}
                    </SelectItem>
                  );
                })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    );
  }
);

SelectInput.displayName = "SelectInput";

export default SelectInput;
