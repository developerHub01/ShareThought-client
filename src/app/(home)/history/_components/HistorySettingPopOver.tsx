"use client";

import {
  Drawer,
  DrawerContentWitoutHandler,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useIsActiveQuery from "@/hooks/use-is-active-query";
import { useRouter } from "next/navigation";
import React from "react";
import HistorySetting from "@/app/(home)/history/_components/HistorySetting";
import Link from "next/link";
import { Settings as SettingIcon, X as CloseIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface HistorySettingPopOverProps {}

const HistorySettingPopOver = ({}: HistorySettingPopOverProps) => {
  const router = useRouter();

  const isSettingOpen = useIsActiveQuery("setting");

  const handleClose = (open: boolean) => {
    if (!open) return router.back();
  };

  return (
    <Drawer
      direction="right"
      handleOnly={true}
      open={isSettingOpen}
      onOpenChange={handleClose}
    >
      <DrawerTrigger asChild>
        <Link href="?setting">
          <Button size={"sm"}>
            <SettingIcon size={18} /> Setting
          </Button>
        </Link>
      </DrawerTrigger>
      <DrawerContentWitoutHandler
        className="fixed mt-0 overflow-hidden w-[90%] max-w-lg inset-2 rounded-sm ml-auto border-0"
        style={
          { "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties
        }
      >
        <DrawerHeader className="flex justify-between items-center gap-2 border-b py-2">
          <DrawerTitle className="font-medium">History Setting</DrawerTitle>
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
        <ScrollArea className="w-full h-full">
          <HistorySetting />
        </ScrollArea>
      </DrawerContentWitoutHandler>
    </Drawer>
  );
};

export default HistorySettingPopOver;
