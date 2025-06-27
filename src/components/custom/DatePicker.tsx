"use client";
import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/helpers/utils";
import moment from "moment";
import { Label } from "../ui/label";

type DatePickerProps = {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  disableBefore?: Date;
};

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  disableBefore,
  placeholder = "Pick a date",
  className,
  disabled,
  error,
  label,
}) => {
  const text = error || label || "";

  return (
    <div className={cn("space-y-1", className)}>
      {text && (
        <div className="flex gap-2 items-center">
          <Label className={`${error ? "text-red" : ""}`}>{text}</Label>
        </div>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full rounded-sm justify-start text-left font-normal border-contrast h-11",
              !value && "text-muted-foreground"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? moment(value).format("MMMM Do, YYYY") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            disabled={(date) => (disableBefore ? date.setHours(0, 0, 0, 0) < disableBefore.setHours(0, 0, 0, 0) : false)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

// USE LIKE THIS

{
  /* <Controller
  name="dob"
  control={control}
  render={({ field }) => (
    <DatePicker
      {...field}
      label="Date of Birth"
      placeholder="Select your birth date"
      error={errors?.dob?.message}
    />
  )}
/> */
}
