import React from "react";
import { menuList } from "./ChannelMenu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
interface DesktopMenuProps {
  channelId: string;
  currentTab: string;
}

const DesktopMenu = ({ channelId, currentTab }: DesktopMenuProps) => {
  return (
    <div className="hidden w-full sm:w-fit sm:flex gap-2 items-center">
      {menuList.map(({ id, label, href, Icon }) => {
        const isActive = currentTab === href;
        const isShowOnlyIcon = ["search"].includes(id);

        href = `/channel/${channelId}/${href}`;
        return (
          <Link href={href} key={id}>
            <Button
              size={isShowOnlyIcon ? "smIcon" : "sm"}
              variant={isActive ? "default" : "ghost"}
            >
              {Icon && <Icon size={16} />} {isShowOnlyIcon || label}
            </Button>
          </Link>
        );
      })}
    </div>
  );
};

export default DesktopMenu;
