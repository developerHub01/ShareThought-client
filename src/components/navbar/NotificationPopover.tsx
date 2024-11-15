import React from "react";
import {
  Drawer,
  DrawerContentWitoutHandler,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import Link from "next/link";
import NotificationList from "@/components/notifications/NotificationList";

interface NotificationPopoverProps {
  children: React.ReactNode;
}

const NotificationPopover = ({ children }: NotificationPopoverProps) => {
  return (
    <Drawer direction="right" handleOnly={true}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContentWitoutHandler
        className="fixed mt-0 overflow-hidden w-[90%] max-w-md inset-2 rounded-sm ml-auto border-0"
        style={
          { "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties
        }
      >
        <DrawerHeader className="flex justify-between items-center gap-2 border-b py-2">
          <DrawerTitle className="font-medium">Notifications</DrawerTitle>
          <DrawerDescription hidden></DrawerDescription>
          <Link href={"/"}>
            <Button size={"icon"} className="rounded-full" variant={"ghost"}>
              <Settings size={22} strokeWidth={1.5} />
            </Button>
          </Link>
        </DrawerHeader>
        <NotificationList />
      </DrawerContentWitoutHandler>
    </Drawer>
  );
};

export default NotificationPopover;
