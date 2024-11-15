import React from "react";
import {
  Drawer,
  DrawerContentWitoutHandler,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import AvatarPopActionList from "@/components/navbar/right/avatar/AvatarPopoverActionList";
import AvatarPopoverProfileDetails from "@/components/navbar/right/avatar/AvatarPopoverProfileDetails";

interface AvatarPopoverV2Props {
  children: React.ReactNode;
}

const AvatarPopoverV2 = ({ children }: AvatarPopoverV2Props) => {
  return (
    <Drawer direction="right" handleOnly={true}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContentWitoutHandler
        className="fixed mt-0 overflow-hidden w-[90%] max-w-xs inset-2 rounded-sm ml-auto border-0"
        style={
          { "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties
        }
      >
        <DrawerHeader className="p-0 py-1 max-h-[85vh] rounded-sm flex flex-col">
          <DrawerTitle hidden></DrawerTitle>
          <DrawerDescription hidden></DrawerDescription>
          <AvatarPopoverProfileDetails />
          <Separator />
        </DrawerHeader>
        <AvatarPopActionList variant={"v2"} />
      </DrawerContentWitoutHandler>
    </Drawer>
  );
};

export default AvatarPopoverV2;
