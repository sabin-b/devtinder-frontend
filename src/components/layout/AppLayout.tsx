import AuthenticationCheck from "@/middleware/AuthenticationCheck";
import { Separator } from "@radix-ui/react-separator";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "../sidebar/AppSidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";

export default function AppLayout() {
  return (
    <AuthenticationCheck>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-slate-900 p-4 pt-2">
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 ">
              <SidebarTrigger className="-ml-1 hover:!bg-slate-800" />
              <Separator
                orientation="vertical"
                className="mr-2 h-4 w-0.5 bg-slate-600"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Building Your Application
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <main className="flex flex-1 flex-col  gap-4 pt-0">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AuthenticationCheck>
  );
}
