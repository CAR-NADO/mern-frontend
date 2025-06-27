import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabProps } from "@/helpers/interfaces";
import { cn } from "@/helpers/utils";

import { FC } from "react";

interface CustomTabsProps {
  items?: TabProps[];
  setTab?: (tab: string) => void;
  defaultTab?: string;
  currTab?: string;
  activeClassName?: string;
  className?: string;
}

const CustomTabs: FC<CustomTabsProps> = ({
  items = [],
  setTab = () => null,
  defaultTab = "",
  currTab = "",
  activeClassName = "",
  className = "",
}) => {
  return (
    <Tabs defaultValue={defaultTab} className="w-full h-9" value={currTab} onValueChange={(value) => setTab(value)}>
      <TabsList
        className={cn(
          "bg-transparent text-grey h-11 p-0 font-normal border-b border-contrast rounded-none w-full flex gap-3 justify-start",
          className
        )}
      >
        {items.map((item) => {
          return (
            <TabsTrigger
              key={item?.value}
              className={cn(
                "pl-3 pr-3 h-full gap-1 font-normal text-base border-b border-transparent shadow-none",
                currTab === item?.value &&
                  "data-[state=active]:text-blue data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=inactive]:text-blue data-[state=inactive]:bg-transparent data-[state=inactive]:shadow-none data-[state=inactive]:rounded-none border-b border-blue h-full font-normal bg-blue",
                currTab === item?.value && activeClassName,
                className
              )}
              value={item?.value}
            >
              {item?.startIcon} {item?.label} {item?.endIcon}
            </TabsTrigger>
          );
        })}
      </TabsList>
      {items.map((item) => {
        return (
          <TabsContent value={item?.value} className="mt-4" key={item?.value}>
            {item.content}
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default CustomTabs;
