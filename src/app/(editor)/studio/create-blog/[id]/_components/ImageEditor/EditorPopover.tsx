"use client";

import React, { memo } from "react";
import {
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerContentWitoutHandler,
} from "@/components/ui/drawer";
import { useRouter, useSearchParams } from "next/navigation";
import useModifyQueryParams from "@/hooks/use-modify-query-params";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { CloseIcon } from "@/lib/icons";
import ImageEditor from "@/app/(editor)/studio/create-blog/[id]/_components/ImageEditor/ImageEditor";
import EditorFooter from "@/app/(editor)/studio/create-blog/[id]/_components/ImageEditor/EditorFooter";

const EditorPopover = memo(() => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isCreateOpen = searchParams.has("edit");

  const { modifyParams, buildFullPath } = useModifyQueryParams();

  const handleClose = (open: boolean) => {
    if (!open) {
      router.push(buildFullPath(modifyParams("delete", "edit")));
    }
  };

  return (
    <Drawer
      direction="right"
      handleOnly={true}
      open={isCreateOpen}
      onOpenChange={handleClose}
    >
      <DrawerContentWitoutHandler
        className={clsx(
          "fixed mt-0 overflow-hidden w-[90%] max-w-xl inset-2 rounded-sm ml-auto border-0"
        )}
        style={
          { "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties
        }
      >
        <DrawerHeader className="flex justify-between items-center gap-2 border-b py-2">
          <DrawerTitle className="font-medium">Edit Image</DrawerTitle>
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
        <ImageEditor />
        <EditorFooter />
      </DrawerContentWitoutHandler>
    </Drawer>
  );
});

export default EditorPopover;
