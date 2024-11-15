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
import { Separator } from "@/components/ui/separator";
import React from "react";

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
    <ScrollArea className="w-full h-96">
      <ThemeMode />
      <LightSeparator />
      <ChannelActionList />
      <LightSeparator />
      {actionList.map((item, index) => (
        <React.Fragment key={item.id}>
          <AvatarActionButton {...item} />
          {index !== actionList.length - 1 && <LightSeparator />}
        </React.Fragment>
      ))}
    </ScrollArea>
  );
};

const LightSeparator = () => (
  <Separator className="opacity-30 mx-auto w-11/12" />
);

export default AvatarPopActionList;
