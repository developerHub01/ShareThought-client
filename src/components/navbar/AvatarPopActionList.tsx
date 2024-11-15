"use client";

import {
  LogOut as LogOutIcon,
  Settings as SettingsIcon,
  AppWindowMac as AboutUsIcon,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ThemeMode from "@/components/navbar/ThemeMode";
import AvatarActionButton from "@/components/navbar/AvatarActionButton";
import ChannelActionList from "@/components/navbar/ChannelActionList";

const actionList = [
  {
    id: "logout",
    label: "logout",
    Icon: LogOutIcon,
    onClick: () => {},
  },
  {
    id: "setting",
    label: "setting",
    Icon: SettingsIcon,
    link: "/",
  },
  {
    id: "about_us",
    label: "about us",
    Icon: AboutUsIcon,
    link: "/",
  },
];

const AvatarPopActionList = () => {
  return (
    <div className="w-full flex-1">
      <ScrollArea className="w-full h-[300px]">
        {/* <div className="w-full h-full"> */}
          <ThemeMode />
          <ChannelActionList />
          {actionList.map((item) => (
            <AvatarActionButton key={item.id} {...item} />
          ))}
        {/* </div> */}
      </ScrollArea>
    </div>
  );
};

export default AvatarPopActionList;
