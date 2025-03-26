import { Fragment } from "react";
import AvatarActionButton from "@/components/navbar/right/avatar/AvatarActionButton";
import LightSeparator from "@/components/separator/LightSeparator";
import {
  LogOutIcon,
  SettingIcon,
  AboutUsIcon,
  LucideIcon,
} from "@/lib/icons";

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
    Icon: SettingIcon,
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
