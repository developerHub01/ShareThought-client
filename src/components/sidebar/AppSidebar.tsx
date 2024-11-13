import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/sidebar/NavMain";
import { NavSecondary } from "@/components/sidebar/NavSecondary";
import { NavUser } from "@/components/sidebar/NavUser";
import SidebarTop from "@/components/sidebar/SidebarTop";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar:
      "https://images.unsplash.com/photo-1730660666237-1e6a008067a9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  navMain: [
    {
      id: "home",
      title: "home",
      url: "/",
      icon: "House",
      isActive: true,
    },
    {
      id: "history",
      title: "history",
      url: "/",
      icon: "History",
      isActive: true,
    },
    {
      id: "categories",
      title: "categories",
      url: "/",
      icon: "Boxes",
      isActive: true,
    },
    {
      id: "read_later",
      title: "read later",
      url: "/",
      icon: "Bookmark",
      isActive: true,
    },
    {
      id: "reacted_posts",
      title: "reacted posts",
      url: "/",
      icon: "SmilePlus",
      isActive: true,
    },
    {
      id: "channels",
      title: "channels",
      url: "/",
      icon: "LayoutTemplate",
      isActive: true,
    },
  ],
  navSecondary: [
    {
      id: "setting",
      title: "setting",
      url: "/",
      icon: "Settings",
      isActive: true,
    },
    {
      id: "report_history",
      title: "report history",
      url: "/",
      icon: "Flag",
      isActive: true,
    },
    {
      id: "about_us",
      title: "about us",
      url: "/",
      icon: "BookUser",
      isActive: true,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="p-0 max-w-60">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarTop />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
