import React from "react";
import { menuList } from "./ChannelMenu";
import MenuItem from "@/app/(home)/channel/[id]/_components/ChannelMenu/MenuItem";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Ellipsis as ThreeDotIcon } from "lucide-react";

interface MobileMenuListProps {
  channelId: string;
  currentTab: string;
}

const MobileMenuList = ({ channelId, currentTab }: MobileMenuListProps) => {
  return (
    <div className="flex w-full sm:w-fit sm:hidden justify-start items-center gap-2 sm:gap-3 overflow-hidden">
      {menuList?.slice(0, 2)?.map((props) => (
        <MenuItem
          key={props.id}
          {...props}
          currentTab={currentTab}
          channelId={channelId}
        />
      ))}
      <OtherList channelId={channelId} currentTab={currentTab} />
    </div>
  );
};

const OtherList = ({ channelId, currentTab }: MobileMenuListProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="ml-auto">
          <ThreeDotIcon /> More
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        className="flex flex-col gap-2 px-0 py-1 max-w-44"
      >
        {menuList?.slice(2)?.map((props) => (
          <MenuItem
            key={props.id}
            {...props}
            currentTab={currentTab}
            channelId={channelId}
            isHiddenItems={true}
          />
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default MobileMenuList;
