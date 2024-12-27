"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContentWitoutHandler,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { X as CloseIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import FollowerChannel from "@/app/(home)/channel/[id]/_components/Followers/FollowerChannel";

interface FollowerPopoverProps {
  children: React.ReactNode;
}

const FollowerPopover = ({ children }: FollowerPopoverProps) => {
  const params = useSearchParams();
  const router = useRouter();

  const isFollowersOpen =
    params.get("followers") !== null && params.get("followers") !== "false";

  const handleClose = (open: boolean) => {
    if (!open) return router.back();
  };

  return (
    <Drawer
      direction="right"
      handleOnly={true}
      open={isFollowersOpen}
      onOpenChange={handleClose}
    >
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContentWitoutHandler
        className="fixed mt-0 overflow-hidden w-[90%] max-w-sm inset-2 rounded-sm ml-auto border-0"
        style={
          { "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties
        }
      >
        <DrawerHeader className="flex justify-between items-center gap-2 border-b py-2">
          <DrawerTitle className="font-medium">Followers</DrawerTitle>
          <DrawerDescription hidden></DrawerDescription>
          <Button
            size={"icon"}
            className="rounded-full"
            variant={"ghost"}
            onClick={() => handleClose(false)}
          >
            <CloseIcon size={22} strokeWidth={1.5} />
          </Button>
        </DrawerHeader>
        <FollowerChannel />
      </DrawerContentWitoutHandler>
    </Drawer>
  );
};

export default FollowerPopover;
