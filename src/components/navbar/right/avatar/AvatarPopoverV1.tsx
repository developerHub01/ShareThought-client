import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import AvatarPopActionList from "@/components/navbar/right/avatar/AvatarPopoverActionList";
import AvatarPopoverProfileDetails from "@/components/navbar/right/avatar/AvatarPopoverProfileDetails";

interface AvatarPopoverV1Props {
  children: React.ReactNode;
}

const AvatarPopoverV1 = ({ children }: AvatarPopoverV1Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        sideOffset={5}
        side="bottom"
        align="end"
        className="p-0 py-1 w-64 sm:w-80 max-h-[85vh] rounded-sm flex flex-col"
      >
        <AvatarPopoverProfileDetails />
        <Separator />
        <AvatarPopActionList />
      </PopoverContent>
    </Popover>
  );
};

export default AvatarPopoverV1;
