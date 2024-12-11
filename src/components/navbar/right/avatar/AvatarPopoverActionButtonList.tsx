import { Fragment } from "react";
import AvatarActionButton from "@/components/navbar/right/avatar/AvatarActionButton";
import LightSeparator from "@/components/separator/LightSeparator";
import {
  LogOut as LogOutIcon,
  Settings as SettingsIcon,
  AppWindowMac as AboutUsIcon,
  LucideIcon,
} from "lucide-react";

interface IActionButton {
  id: string;
  label: string;
  Icon: LucideIcon;
  onClick?: () => void;
  link?: string;
}

const actionList: Array<IActionButton> = [
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

const AvatarPopoverActionButtonList = () => {
  return actionList.map((item, index) => (
    <Fragment key={item.id}>
      <AvatarActionButton {...item} />
      {index !== actionList.length - 1 && <LightSeparator />}
    </Fragment>
  ));
};

export default AvatarPopoverActionButtonList;
