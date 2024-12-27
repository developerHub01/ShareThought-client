import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavMain } from "@/components/sidebar/NavMain";

const navItemsList = {
  navMainItems: [
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
      id: "my_activities", // Combined menu
      label: "my activities",
      icon: "Activity", // Choose an appropriate icon
      items: [
        {
          id: "reacted_posts",
          label: "reacted posts",
          url: "/reacted-posts",
          icon: "SmilePlus",
        },
        {
          id: "my_comments",
          label: "my comments",
          url: "/my-comments",
          icon: "MessageSquareText",
        },
      ],
    },
    {
      id: "channels",
      label: "channels",
      icon: "LayoutTemplate",
      items: [
        {
          id: "following_channels",
          label: "Following Channels",
          url: "/channels/following",
        },
        {
          id: "my_channels",
          label: "My Channels",
          url: "/channels/my",
        },
      ],
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
  ],
  navSecondaryItems: [
    {
      id: "setting",
      label: "setting",
      url: "/settings",
      icon: "Settings",
    },
    {
      id: "report_history",
      label: "report history",
      url: "/report-history",
      icon: "Flag",
    },
    {
      id: "about_us",
      label: "about us",
      url: "/about-us",
      icon: "BookUser",
    },
  ],
};

const SidebarMenuList = () => {
  const { navMainItems, navSecondaryItems } = navItemsList;
  return (
    <ScrollArea className="h-full w-full">
      <NavMain navItems={navMainItems} />
      <NavMain navItems={navSecondaryItems} className="mt-auto" />
    </ScrollArea>
  );
};

export default SidebarMenuList;
