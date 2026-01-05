import { Calendar, Home, Settings, Store, Users } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import logoLight from "@/data/img/logo-light.png";
import logoDark from "@/data/img/logo-dark.png";
import { useTheme } from "@/components/context/ThemeProvider";
import { Link, useLocation } from "react-router";

const items = [
  {
    title: "Home",
    url: "dashboard",
    icon: Home,
  },
  {
    title: "Bookings",
    url: "bookings",
    icon: Calendar,
  },
  {
    title: "Cabins",
    url: "cabins",
    icon: Store,
  },
  {
    title: "Users",
    url: "users",
    icon: Users,
  },
  {
    title: "Settings",
    url: "settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { resolvedTheme } = useTheme();
  const { open } = useSidebar();
  const { pathname } = useLocation();

  return (
    <Sidebar collapsible="icon" className={"bg-gold-glow"}>
      <SidebarHeader
        className={`${
          !open ? "h-18 flex items-center justify-center" : ""
        } bg-gold-glow`}
      >
        <div className="flex justify-center">
          {resolvedTheme === "light" && <img src={logoLight} width={140} />}
          {resolvedTheme === "dark" && <img src={logoDark} width={140} />}
        </div>
      </SidebarHeader>

      {open && <hr />}

      <SidebarContent className="w-full bg-gold-glow">
        <SidebarGroup className="mt-4">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="py-5 hover:bg-gold-accent data-[active=true]:bg-gold-dark flex"
                    isActive={pathname.includes(item.url)}
                  >
                    <Link to={item.url} className="cursor-default flex gap-4">
                      <item.icon className="size-5.5!" />
                      <span className="text-xl font-semibold">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
