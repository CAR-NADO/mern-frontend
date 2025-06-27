import {
  DropdownMenu as DropdownMenuComponent,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { Button } from "../ui/button"

export interface IOption {
  label: string | JSX.Element
  value: string
  prefix?: string | null
  iso?: string | null
}

interface DropdownMenuProps {
  type?: "checkbox" | "radio"
  label?: string
  value?: string | string[]
  options: IOption[]
  onOptionChange: (value: string | string[], data?: IOption | IOption[]) => void
  disabled?: boolean
}

const DropdownMenu = ({
  type = "radio",
  label = "",
  options = [],
  value = type === "checkbox" ? [] : "",
  onOptionChange = () => {},
  disabled,
}: DropdownMenuProps) => {
  return (
    <DropdownMenuComponent>
      <DropdownMenuTrigger
        disabled={disabled}
        asChild
        className="border border-contrast h-full flex items-center rounded-sm"
      >
        <Button className="border bg-white text-grey text-sm font-normal border-contrast min-h-10 hover:bg-transparent flex justify-between items-center w-full">
          <div className="font-semibold flex items-center text-black">{label} :</div>
          {type === "radio"
            ? options.find((option) => option.value === value)?.label || "Any"
            : (value as string[]).length > 0
            ? `${(value as string[]).length} selected`
            : "None"}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="max-h-80 overflow-auto">
        {type === "radio" ? (
          <DropdownMenuRadioGroup
            value={value as string}
            onValueChange={(val) =>
              onOptionChange(
                val,
                options.find((o) => o.value === val)
              )
            }
          >
            {options.map((option) => (
              <DropdownMenuRadioItem key={option.value} value={option.value}>
                {option.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        ) : (
          options.map((option) => (
            <DropdownMenuCheckboxItem
              key={option.value}
              checked={(value as string[]).includes(option.value)}
              onCheckedChange={(checked) => {
                const newValue = checked
                  ? [...(value as string[]), option.value]
                  : (value as string[]).filter((v) => v !== option.value)
                onOptionChange(newValue, options.filter((o) => newValue.includes(o.value)))
              }}
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenuComponent>
  )
}

export { DropdownMenu }