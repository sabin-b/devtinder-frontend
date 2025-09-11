import { SideBarNavLink } from "@/types/types";
import { UserPlus2, UserSearch, UsersIcon } from "lucide-react";

export const homeNavLinks: SideBarNavLink[] = [
  {
    name: "Find New Friends",
    href: "/",
    Icon: UserSearch,
  },
];

//? manageLinks
export const manageLinks: SideBarNavLink[] = [
  {
    name: "My Connections",
    href: "/connections",
    Icon: UsersIcon,
  },
  {
    name: "New Requests",
    href: "/requests",
    Icon: UserPlus2,
  },
];
