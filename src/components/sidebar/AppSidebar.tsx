import { MessageCircleCode } from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import NavHome from "./Nav_Home";
import { NavUserProfile } from "./Nav_UserProfile";
import NavUser from "./nav_user";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="bg-slate-900 pt-2" collapsible="icon" {...props}>
      <SidebarHeader className="bg-slate-900">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to={"/"}>
              <div className="flex flex-row items-center justify-start  gap-x-2">
                <MessageCircleCode className="min-w-8 min-h-8 md:size-8 xl:size-10 text-green-500" />
                <h4 className="font-medium  select-none truncate  text-white/90  text-2xl ">
                  DevTinder
                </h4>
              </div>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-slate-900">
        <NavHome />
        <NavUser />
      </SidebarContent>
      <SidebarFooter className="bg-slate-900">
        <NavUserProfile />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
