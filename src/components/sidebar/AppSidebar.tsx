import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/sidebar/SidebarMain";
import { NavMain } from "@/components/sidebar/NavMain";
import { NavSecondary } from "@/components/sidebar/NavSecondary";
import SidebarTop from "@/components/sidebar/SidebarTop";

const data = {
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
      id: "my_commentes",
      title: "my comments",
      url: "/",
      icon: "MessageSquareText",
      isActive: true,
    },
    {
      id: "channels",
      title: "channels",
      url: "/",
      icon: "LayoutTemplate",
      isActive: true,
    },
    {
      id: "following",
      title: "following",
      url: "/",
      icon: "Rss",
      isActive: true,
    },
    {
      id: "chats",
      title: "chats",
      url: "/",
      icon: "MessagesSquare",
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
    <Sidebar collapsible="icon" {...props}>
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
    </Sidebar>
  );
}
