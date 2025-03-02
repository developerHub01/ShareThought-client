import {
  Monitor as DesktopIcon,
  LucideIcon,
  Smartphone as MobileIcon,
} from "lucide-react";
import React from "react";
import ToggleList from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/ToggleList";
import { ScreenTypes } from "@/redux/features/builders/blogBuilderSlice";

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

interface ResponsiveToggleBlockProps {
  value: ScreenTypes;
  handleChange: () => void;
}

const ResponsiveToggleBlock = ({
  value,
  handleChange,
}: ResponsiveToggleBlockProps) => {
  return (
    <ToggleList
      toggleList={screenList}
      handleChange={handleChange}
      activeItem={value ?? screenList[0].id}
    />
  );
};

export default ResponsiveToggleBlock;
