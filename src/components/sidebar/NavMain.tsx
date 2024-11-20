import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/sidebar/SidebarMain";
import SidebarMenuButtonLink from "@/components/sidebar/SidebarMenuButtonLink";

const menuItems = [
  {
    id: "home",
    label: "home",
    url: "/",
    icon: "House",
  },
  {
    id: "history",
    label: "history",
    url: "/history",
    icon: "History",
  },
  {
    id: "categories",
    label: "categories",
    url: "/categories",
    icon: "Boxes",
  },
  {
    id: "read_later",
    label: "read later",
    url: "/read-later",
    icon: "Bookmark",
  },
  {
    id: "reacted_posts",
    label: "reacted posts",
    url: "/reacted-posts",
    icon: "SmilePlus",
  },
  {
    id: "my_commentes",
    label: "my comments",
    url: "/my-comments",
    icon: "MessageSquareText",
  },
  {
    id: "channels",
    label: "channels",
    url: "/channels",
    icon: "LayoutTemplate",
  },
  {
    id: "following",
    label: "following",
    url: "/following",
    icon: "Rss",
  },
  {
    id: "chats",
    label: "chats",
    url: "/chats",
    icon: "MessagesSquare",
  },
  {
    id: "forum",
    label: "forum",
    url: "/forum",
    icon: "LetterText",
  },
  {
    id: "community",
    label: "community",
    url: "/community",
    icon: "Dock",
  },
];

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {menuItems.map(({ id, label, icon, url }) => (
          <SidebarMenuItem key={id}>
            <SidebarMenuButtonLink icon={icon} url={url} label={label} />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
