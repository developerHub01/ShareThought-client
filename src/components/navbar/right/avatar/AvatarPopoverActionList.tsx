import { ScrollArea } from "@/components/ui/scroll-area";
import ThemeMode from "@/components/navbar/right/avatar/ThemeMode";
import ChannelActionList from "@/components/navbar/right/avatar/ChannelActionList";
import LightSeparator from "@/components/separator/LightSeparator";
import clsx from "clsx";
import AvatarPopoverActionButtonList from "@/components/navbar/right/avatar/AvatarPopoverActionButtonList";

interface AvatarPopoverActionListProps {
  variant?: "v1" | "v2";
}

const AvatarPopoverActionList = ({
  variant = "v1",
}: AvatarPopoverActionListProps) => {
  return (
    <ScrollArea
      className={clsx("w-full", {
        "h-96": variant === "v1",
        "h-full": variant === "v2",
      })}
    >
      <ThemeMode />
      <LightSeparator />
      <ChannelActionList />
      <LightSeparator />
      <AvatarPopoverActionButtonList />
    </ScrollArea>
  );
};

export default AvatarPopoverActionList;
