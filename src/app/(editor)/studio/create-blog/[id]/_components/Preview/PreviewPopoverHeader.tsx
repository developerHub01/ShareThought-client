"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { CloseIcon } from "@/lib/icons";
import PreviewResponsiveButton from "@/app/(editor)/studio/create-blog/[id]/_components/Preview/PreviewResponsiveButton";

interface PreviewPopoverHeaderProps {
  handleClose: (value: boolean) => void;
}

const PreviewPopoverHeader = ({ handleClose }: PreviewPopoverHeaderProps) => {
  return (
    <DrawerHeader className="flex justify-between items-center gap-2 border-b py-2">
      <DrawerTitle className="font-medium">
        <p>Blog Preview</p>
      </DrawerTitle>
      <DrawerDescription hidden></DrawerDescription>
      <div className="flex gap-2 items-center">
        <PreviewResponsiveButton />
        <Button
          size={"icon"}
          className="rounded-full"
          variant={"ghost"}
          onClick={() => handleClose(false)}
        >
          <CloseIcon size={22} strokeWidth={1.5} />
        </Button>
      </div>
    </DrawerHeader>
  );
};

export default PreviewPopoverHeader;
