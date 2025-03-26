"use client";

import {
  Drawer,
  DrawerContentWitoutHandler,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useRouter } from "next/navigation";
import React from "react";
import useIsActiveQuery from "@/hooks/use-is-active-query";
import { CloseIcon } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import useModifyQueryParams from "@/hooks/use-modify-query-params";

interface CategoryDescriptionPopoverProps {
  description: string;
}

const CategoryDescriptionPopover = ({
  description = "",
}: CategoryDescriptionPopoverProps) => {
  const router = useRouter();

  const isDescriptionOpen = useIsActiveQuery("description");
  const { modifyParams, buildFullPath } = useModifyQueryParams();

  const handleClose = (open: boolean) => {
    if (!open)
      return router.push(buildFullPath(modifyParams("delete", "description")));
  };

  const handleNavigateDescriptionQuery = () =>
    router.push(buildFullPath(modifyParams("set", "description")));

  return (
    <Drawer
      direction="right"
      handleOnly={true}
      open={isDescriptionOpen}
      onOpenChange={handleClose}
    >
      <DrawerTrigger asChild hidden></DrawerTrigger>
      <DrawerContentWitoutHandler
        className="fixed mt-0 overflow-hidden w-[90%] max-w-lg inset-2 rounded-sm ml-auto border-0"
        style={
          { "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties
        }
      >
        <DrawerHeader className="flex justify-between items-center gap-2 border-b py-2">
          <DrawerTitle className="font-medium">Description</DrawerTitle>
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
        <ScrollArea className="w-full h-full px-4 py-2 text-sm leading-relaxed text-popover-foreground">
          <p>{description}</p>
        </ScrollArea>
      </DrawerContentWitoutHandler>
    </Drawer>
  );
};

export default CategoryDescriptionPopover;
