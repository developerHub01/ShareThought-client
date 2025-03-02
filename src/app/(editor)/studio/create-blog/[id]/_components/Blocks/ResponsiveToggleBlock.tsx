import {
  Monitor as DesktopIcon,
  LucideIcon,
  Smartphone as MobileIcon,
} from "lucide-react";
import React from "react";
import ToggleList from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/ToggleList";

const screenList: Array<{
  id: string;
  label: string;
  Icon: LucideIcon;
}> = [
  {
    id: "desktop",
    label: "Desktop",
    Icon: DesktopIcon,
  },
  {
    id: "mobile",
    label: "Mobile",
    Icon: MobileIcon,
  },
];

const ResponsiveToggleBlock = () => {
  const handleChange = (value: string) => {};

  return (
    <ToggleList
      toggleList={screenList}
      handleChange={handleChange}
      activeItem={screenList[0].id}
    />
  );
};

export default ResponsiveToggleBlock;
