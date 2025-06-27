import { SearchIcon } from "lucide-react"
import TextInput from "../TextInput"
import { ChangeEvent, useCallback } from "react"

type GlobalSearchProps = {
  setGlobalSearch?: (value: string) => void
  placeholder?:string
}

let id: NodeJS.Timeout | null = null

const debouncedOnChange = (cb: (param: ChangeEvent<HTMLInputElement>) => void, t = 1200) => {
  return function (param: ChangeEvent<HTMLInputElement>) {
    if (id) {
      clearTimeout(id)
    }
    id = setTimeout(() => {
      cb(param)
    }, t)
  }
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ placeholder = "Search", setGlobalSearch = () => {} }) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      debouncedOnChange((event) => setGlobalSearch(event.target.value.trim()))(e)
    },
    [setGlobalSearch]
  )

  return (
    <div className="w-full relative">
      <TextInput placeholder={placeholder} onChange={handleChange} className="flex pl-7"/>
      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-grey cursor-pointer">
        <SearchIcon width={18} />
      </div>
    </div>
  )
}
