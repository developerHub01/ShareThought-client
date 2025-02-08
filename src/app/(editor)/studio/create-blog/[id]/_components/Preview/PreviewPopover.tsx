"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContentWitoutHandler,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { X as CloseIcon } from "lucide-react";
import useModifyQueryParams from "@/hooks/use-modify-query-params";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import PreviewContent from "@/app/(editor)/studio/create-blog/[id]/_components/Preview/PreviewContent";

const PreviewPopover = () => {
  const params = useSearchParams();
  const router = useRouter();
  const { modifyParams, buildFullPath } = useModifyQueryParams();

  let isPreviewOpen = Boolean(params.get("preview"));

  const handleClose = (open: boolean) => {
    if (!open) router.push(buildFullPath(modifyParams("delete", "preview")));
  };

  return (
    <Drawer
      direction="right"
      handleOnly={true}
      open={isPreviewOpen}
      onOpenChange={handleClose}
    >
      <DrawerContentWitoutHandler
        className="fixed mt-0 overflow-hidden inset-2 rounded-sm ml-auto border-0 w-[90%] max-w-4xl grid-place-items-centered"
        style={
          { "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties
        }
      >
        <DrawerHeader className="flex justify-between items-center gap-2 border-b py-2">
          <DrawerTitle className="font-medium">
            <p>Blog Preview</p>
          </DrawerTitle>
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

        <ScrollArea className="px-3 py-2">
          <PreviewContent />
        </ScrollArea>

        <DrawerClose className="inline-block absolute sm:hidden top-2.5 left-2.5 z-10 cursor-pointer">
          <CloseIcon />
        </DrawerClose>
      </DrawerContentWitoutHandler>
    </Drawer>
  );
};

interface PopoverTitleOrContentProps {
  modalName: string;
}

export default PreviewPopover;
