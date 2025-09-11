import useCurrentPath from "@/hooks/helpers/useCurrentPath";
import { cn } from "@/lib/utils";
import { SideBarNavLink } from "@/types/types";
import { Link } from "react-router-dom";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

type SidebarNavLinkProps = SideBarNavLink;

export default function SidebarNavLink({
  name,
  Icon,
  href,
}: SidebarNavLinkProps) {
  const currentPath = useCurrentPath();
  return (
    <SidebarMenuItem key={name}>
      <SidebarMenuButton
        className={cn("hover:!bg-slate-600", {
          "text-slate-300": currentPath === href,
        })}
        asChild
      >
        <Link to={href} className="overflow-clip truncate">
          <Icon className="w-10 h-10" />
          {name}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
