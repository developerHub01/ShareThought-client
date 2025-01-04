import React from "react";
import { MenuBaseItem } from "./ChannelMenu";
import Link from "next/link";
import clsx from "clsx";
import { Button } from "@/components/ui/button";

interface MenuItemProps extends MenuBaseItem {
  currentTab: string;
  channelId: string;
  isHiddenItems?: boolean;
}

const MenuItem = ({
  id,
  label,
  href,
  Icon,
  currentTab,
  channelId,
  isHiddenItems = false,
}: MenuItemProps) => {
  const isActive = currentTab === href;

  href = `/channel/${channelId}/${href}`;
  return (
    <Link
      href={href}
      key={id}
      className={clsx("", {
        "w-full": isHiddenItems,
        "w-fit": !isHiddenItems,
      })}
    >
      <Button
        size="sm"
        variant={isActive ? "default" : "ghost"}
        className="w-full justify-start rounded-none"
      >
        {Icon && <Icon size={16} />} {label}
      </Button>
    </Link>
  );
};
export default MenuItem;
