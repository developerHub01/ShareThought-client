"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { memo } from "react";
import { Drawer, DrawerContentWitoutHandler } from "@/components/ui/drawer";
import useModifyQueryParams from "@/hooks/use-modify-query-params";
import { ScrollArea } from "@/components/ui/scroll-area";
import PreviewContent from "@/app/(editor)/studio/create-blog/[id]/_components/Preview/PreviewContent";
import { useEditorPreview } from "@/app/(editor)/studio/create-blog/[id]/_context/Preview/EditorPreviewProvider";
import PreviewPopoverHeader from "@/app/(editor)/studio/create-blog/[id]/_components/Preview/PreviewPopoverHeader";
import { cn } from "@/lib/utils";

const PreviewPopover = memo(() => {
  const params = useSearchParams();
  const router = useRouter();
  const { modifyParams, buildFullPath } = useModifyQueryParams();
  const { screenType } = useEditorPreview();

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
        className={cn(
          "fixed mt-0 overflow-hidden inset-2 rounded-sm ml-auto border-0 w-[90%] grid-place-items-centered",
          {
            "max-w-xl": screenType === "mobile",
            "max-w-3xl": screenType !== "mobile",
          }
        )}
        style={
          { "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties
        }
      >
        <PreviewPopoverHeader handleClose={handleClose} />

        <ScrollArea className="p-3 w-full">
          <PreviewContent />
        </ScrollArea>
      </DrawerContentWitoutHandler>
    </Drawer>
  );
});

export default PreviewPopover;
