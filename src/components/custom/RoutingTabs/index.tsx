import { FC } from "react"
import { RouteTabProps } from "@/types/interfaces"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import { cn } from "@/helpers/utils"
import { Outlet } from "react-router-dom"
import { IOption } from "../DropdownMenu"
import { DIDNumber, PaginatedResponse } from "@/pages/Protected/DIDs/MyNumbers/constants"

interface CustomTabsProps {
  items?: RouteTabProps[]
  onValueChange?: (tab: string) => void
  defaultTab?: string
  currTab?: string
  activeClassName?: string
  className?: string
  searchFilter?: { country?: IOption | null; region?: IOption | null}
  globalSearch?:string
  setCount?: React.Dispatch<React.SetStateAction<PaginatedResponse<DIDNumber> | undefined>>
}

const RoutingTabs: FC<CustomTabsProps> = ({ items = [], onValueChange = () => null, defaultTab = "", currTab = "", setCount = {}, searchFilter = {}, globalSearch='',activeClassName = "", className = "" }) => {
  return (
    <Tabs defaultValue={defaultTab} className="w-full h-full" value={currTab} onValueChange={onValueChange}>
      <TabsList className="bg-transparent text-grey h-11 p-0 font-normal border-b border-contrast rounded-none w-full flex gap-3 justify-start">
        {items.map((item) => {
          return (
            <TabsTrigger key={item?.value} className={cn("pl-3 pr-3 h-full gap-1 font-normal flex items-center text-base border-b border-transparent shadow-none", currTab === item?.value && "data-[state=active]:text-blue data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=inactive]:text-blue data-[state=inactive]:bg-transparent data-[state=inactive]:shadow-none data-[state=inactive]:rounded-none border-b border-blue h-full font-normal bg-blue", currTab === item?.value && activeClassName, className)} value={item?.value}>
              {item?.startIcon} {item?.label} {item?.endIcon}
            </TabsTrigger>
          )
        })}
      </TabsList>
      <TabsContent value={currTab} className="mt-4">
        <Outlet context={{ searchFilter, setCount, globalSearch }} />
      </TabsContent>
    </Tabs>
  )
}

export default RoutingTabs
