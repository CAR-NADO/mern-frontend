import { Home, LucideIcon, NotepadText, ShoppingBasket } from "lucide-react";

interface IlistItems {
  id: number;
  title: string;
  url?: string;
}
interface itemInterface {
  id: number;
  title: string;
  url: string;
  icon: LucideIcon | React.ComponentType<{ className?: string; size?: number; width?: number; height?: number }>;
  type: string;
  listItems?: IlistItems[];
}
export const sidebarItem: itemInterface[] = [
  {
    id: 1,
    title: "Home",
    url: "home",
    icon: Home,
    type: "link",
  },

  {
    id: 2,
    title: "Our Products",
    url: "our-products",
    icon: ShoppingBasket,
    type: "link",
  },
  {
    id: 3,
    title: "About Us",
    url: "about-us",
    icon: NotepadText,
    type: "link",
  },
  // {
  //   id: 2,
  //   title: "Live Operational Monitoring",
  //   url: "admin-live-operational-monitoring",
  //   icon: Binoculars,
  //   type: "list",
  //   listItems: [
  //     { id: 1, title: "Active Registration View", url: "active-registrations-view" },
  //     { id: 2, title: "Active Calls View", url: "active-calls-view" },
  //     { id: 3, title: "ASR Chart", url: "asr-chart" },
  //     { id: 4, title: "Real-time Analytics", url: "realtime-analytics" },
  //   ],
  // },
];
