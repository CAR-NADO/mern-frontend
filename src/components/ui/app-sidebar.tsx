import { ChevronDown, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Link, useLocation } from "react-router-dom";
import { sidebarItem } from "../constants";
import { useLogout } from "@/hooks/useLogout";

const activeLinkClasses = `after:content-[''] after:border-gold after:h-10 after:w-1 after:bg-gold after:absolute after:right-0 after:top-2 after:flex after:items-center after:rounded-full`;

export function AppSidebar() {
  const { pathname = "" } = useLocation();
  const { handleLogout = () => {} } = useLogout();
  // const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="bg-white min-w-44">
      <SidebarHeader className="bg-white !pl-0">
        <SidebarMenu>
          <SidebarMenuItem className={`border-t border-grey-200 py-3 border-none`}>
            <SidebarMenuButton asChild className="hover:bg-transparent h-12 flex justify-center items-center p-0">
              - -
            </SidebarMenuButton>
            <SidebarTrigger className="absolute -right-5 top-0 bg-gold hover:bg-gold hover:text-white text-white h-5 w-5 rounded-sm" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-white py-2 overflow-x-hidden">
        <SidebarMenu className="overflow-x-hidden">
          {sidebarItem.map((item) => {
            const isActive = item?.url.split("/")?.[0] === `${pathname?.split("/")[1]}`;

            if (item?.type === "list") {
              return (
                <Collapsible className="group/collapsible flex flex-col" key={item?.id} asChild>
                  <SidebarMenuItem className={`border-t border-grey-200 gap-0 flex ${isActive ? activeLinkClasses : ""}`}>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title} className="focus-within:bg-transparent p-3 h-14 min-h-14">
                        <item.icon width={20 as number} height={20} className={isActive ? `text-gold` : "text-grey"} />

                        <span className={`${isActive ? "text-black font-semibold" : "text-grey"}`}>{item.title}</span>
                        <ChevronDown
                          width={15}
                          height={15}
                          className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
                        />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub className="border-none ps-0 pr-0 ml-2 me-0">
                        {item?.listItems?.map((listItem) => {
                          const activeList = `${listItem?.url}` === pathname.split("/")[2];
                          return (
                            <SidebarMenuSubItem key={listItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                className={`pl-6 text-sm font-normal ${activeList ? `text-gold` : "text-grey"}`}
                              >
                                <Link
                                  className="ps-4 justify-start text-start"
                                  to={`${item?.url}${listItem.url ? `/${listItem.url}` : ""}`}
                                >
                                  {listItem.title}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            }

            return (
              <SidebarMenuItem
                key={item.title}
                className={`relative border-t border-grey-200 first:border-t-0 last:border-b ${
                  isActive ? activeLinkClasses : ""
                }`}
              >
                <SidebarMenuButton tooltip={item.title} asChild className="p-3 h-14 min-h-14">
                  <Link to={`${item.url}`} className="text-grey">
                    <item.icon width={20} height={20} className={isActive ? `text-gold` : "text-grey"} />
                    <span className={isActive ? `text-black font-semibold` : "text-grey"}>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        {/* <SidebarFooterPopup /> */}
        <div className="flex justify-center items-center gap-1 cursor-pointer" onClick={() => handleLogout()}>
          <span className="text-red-500">
            <LogOut />
          </span>{" "}
          Logout
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
