import { cn } from "@/helpers/utils";
import { Control, FieldValues } from "react-hook-form";
import PhoneInputWithControl from "react-phone-number-input/react-hook-form";
import { Label } from "../ui/label";
// If `CountryCode` is available in the package, import it

type CountryCode = "IN" | "US" | "GB" | "CA";

interface PhoneInputProps<T extends FieldValues> {
  name: string;
  control: Control<T>; // Generic type for form data
  label?: string;
  className?: string;
  defaultCountry?: CountryCode;
  disabled?: boolean;
  countryCallingCodeEditable?: boolean;
  addInternationalOption?: boolean;
  limitMaxLength?: boolean;
  international?: boolean;
  error?: string;
  onCountryChange?: (countryCode: string | undefined) => void;
  onChange?: (value: string | undefined) => void;
}

const PhoneInput = <T extends FieldValues>({
  name,
  control,
  label,
  className = "",
  defaultCountry = "US",
  disabled = false,
  countryCallingCodeEditable = true,
  addInternationalOption = false,
  international = true,
  error,
  onCountryChange = () => {},
  onChange = () => {},
}: PhoneInputProps<T>) => {
  const text = error || label || "";

  return (
    <div className="w--full d--flex flex--column customPhoneInput">
      {text && <Label className={`${error ? "text-red" : ""}`}>{text}</Label>}
      <div
        className={cn(
          `flex h-11 w-full rounded border ${
            error ? "border-red" : "border-contrast"
          } bg-white px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-contrast disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
          className
        )}
      >
        <PhoneInputWithControl
          className={`${className}`}
          autoComplete="off"
          disabled={disabled}
          readOnly={disabled}
          internationalIcon={() => null}
          onChange={onChange}
          defaultCountry={defaultCountry}
          countryCallingCodeEditable={countryCallingCodeEditable}
          addInternationalOption={addInternationalOption}
          international={international}
          onCountryChange={onCountryChange}
          {...{
            name,
            control,
          }}
        />
      </div>
    </div>
  );
};

export default PhoneInput;
