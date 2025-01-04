"use client";

import React, { useMemo } from "react";
import { Search as SearchIcon, LucideIcon } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import clsx from "clsx";
import MobileMenuList from "@/app/(home)/channel/[id]/_components/ChannelMenu/MobileMenuList";
import DesktopMenu from "@/app/(home)/channel/[id]/_components/ChannelMenu/DesktopMenu";

interface ChannelMenuProps {
  direction?: "left" | "center" | "right";
}

export interface MenuBaseItem {
  id: string;
  label: string;
  href: string;
  Icon?: LucideIcon;
}

export const menuList: Array<MenuBaseItem> = [
  { id: "home", label: "Home", href: "" },
  { id: "posts", label: "Posts", href: "posts" },
  { id: "community", label: "Community", href: "community" },
  { id: "categories", label: "Categories", href: "categories" },
  { id: "search", Icon: SearchIcon, label: "Search", href: "search" },
];

const ChannelMenu = ({ direction = "left" }: ChannelMenuProps) => {
  const params = useParams<{ id: string }>();
  const pathname = usePathname();

  const channelId = useMemo(() => params.id, [params]);
  const currentTab = useMemo(
    () => pathname.split(`channel/${channelId}`).pop()?.replace("/", "") || "",
    [pathname, channelId]
  );

  return (
    <section
      className={clsx(
        "w-full shadow-lg rounded-md p-2 sm:px-5 flex justify-between items-center overflow-hidden",
        {
          "sm:justify-start": direction === "left",
          "sm:justify-center": direction === "center",
          "sm:justify-end": direction === "right",
        }
      )}
    >
      <DesktopMenu channelId={channelId} currentTab={currentTab} />
      <MobileMenuList channelId={channelId} currentTab={currentTab} />
    </section>
  );
};

export default ChannelMenu;
