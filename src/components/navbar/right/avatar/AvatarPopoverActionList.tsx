import { ScrollArea } from "@/components/ui/scroll-area";
import ThemeMode from "@/components/navbar/right/avatar/ThemeMode";
import ChannelActionList from "@/components/navbar/right/avatar/ChannelActionList";
import LightSeparator from "@/components/separator/LightSeparator";
import clsx from "clsx";
import AvatarPopoverActionButtonList from "@/components/navbar/right/avatar/AvatarPopoverActionButtonList";
import useIsStudio from "@/hooks/use-is-studio";
import AvatarActionButton from "@/components/navbar/right/avatar/AvatarActionButton";
import { AboutUsIcon, HomeIcon } from "@/lib/icons";
import { Fragment } from "react";

interface AvatarPopoverActionListProps {
  variant?: "v1" | "v2";
}

const studioRestOfActionList = [
  {
    id: "about-us",
    label: "About Us",
    Icon: AboutUsIcon,
    link: "/",
  },
  {
    id: "home",
    label: "Move to Home Page",
    Icon: HomeIcon,
    link: "/",
  },
];

const AvatarPopoverActionList = ({
  variant = "v1",
}: AvatarPopoverActionListProps) => {
  const isStudio = useIsStudio();

  return (
    <ScrollArea
      className={clsx("w-full", {
        "h-96": variant === "v1",
        "h-full": variant === "v2",
      })}
    >
      <ThemeMode />
      <LightSeparator />
      {!isStudio && (
        <>
          <ChannelActionList />
          <LightSeparator />
          <AvatarPopoverActionButtonList />
        </>
      )}
      {isStudio &&
        studioRestOfActionList.map((actionButtonData) => (
          <Fragment key={actionButtonData.id}>
            <AvatarActionButton {...actionButtonData} />
          </Fragment>
        ))}
    </ScrollArea>
  );
};

export default AvatarPopoverActionList;
