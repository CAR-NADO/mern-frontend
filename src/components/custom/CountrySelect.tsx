import { FC, forwardRef, Ref } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // ShadCN components
import { Label } from "../ui/label";
import { cn } from "@/helpers/utils";
import { getAllCountries, GetCountryNameWithFlag } from "@/helpers/country";

interface OptionProps {
  isoCode: string;
  name: string;
}

// type Direction = "ltr" | "rtl"
const countries = getAllCountries() || [];

interface CountrySelectProps {
  label?: string;
  className?: string;
  onChange?: (value: string) => void;
  value?: string;
  error?: string;
  defaultValue?: string | undefined;
  // dir?: Direction
}
const CountrySelect: FC<CountrySelectProps> = forwardRef(
  ({ label, className = "bg-white", onChange, value, error, ...props }, ref: Ref<HTMLButtonElement>) => {
    const text = error || label || "";
    return (
      <div className="">
        {text && <Label className={`${error ? "text-red" : ""}`}>{text}</Label>}
        <Select {...props} value={value} onValueChange={onChange}>
          <SelectTrigger className={cn(`${error ? "border-red" : "border-contrast"}`, className)} ref={ref}>
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {countries &&
                countries.map((country: OptionProps) => {
                  const { isoCode } = country;
                  return (
                    <SelectItem key={isoCode} value={isoCode} className={cn("", "bg-slate-100")}>
                      {GetCountryNameWithFlag(isoCode)}
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
CountrySelect.displayName = "CountrySelect";

export default CountrySelect;
