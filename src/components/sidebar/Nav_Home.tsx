import { homeNavLinks } from "@/data/data";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "../ui/sidebar";
import SidebarNavLink from "./SideBarNavLink";

export default function NavHome() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs">Explore</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {homeNavLinks.map((link) => (
            <SidebarNavLink key={link.name} {...link} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
