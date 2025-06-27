import { AppSidebar } from "@/components/ui/app-sidebar";
import Header from "@/components/ui/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

const PrivateLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex gap-4 bg-blue-50 w-full flex-col p-4">
        <Header />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default PrivateLayout;
