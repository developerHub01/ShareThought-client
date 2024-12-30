"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContentWitoutHandler,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import clsx from "clsx";
import { X as CloseIcon } from "lucide-react";
import useModifyQueryParams from "@/hooks/use-modify-query-params";
import { Button } from "@/components/ui/button";
import AvatarUploaderModal from "@/app/(auth)/signup/_components/modal/AvatarUploaderModal";
import AvatarEditModal from "@/app/(auth)/signup/_components/modal/AvatarEditModal";

type TModalName = "camera" | "edit";

const SignupPopover = () => {
  const params = useSearchParams();
  const router = useRouter();
  const { modifyParams, buildFullPath } = useModifyQueryParams();

  let modalName = params.get("avatar") as TModalName;

  const isDrawerOpen = useMemo(
    () => modalName && ["camera", "edit"].includes(modalName),
    [modalName]
  );

  const handleClose = (open: boolean) => {
    if (!open) router.push(buildFullPath(modifyParams("delete", "avatar")));
  };

  return (
    <Drawer
      direction="right"
      handleOnly={true}
      open={isDrawerOpen}
      onOpenChange={handleClose}
    >
      <DrawerContentWitoutHandler
        className={clsx(
          "fixed mt-0 overflow-hidden inset-2 rounded-sm ml-auto border-0 w-[90%] max-w-max grid-place-items-centered",
          {
            "max-w-md": modalName === "camera",
            "max-w-2xl": modalName === "edit",
            "w-0": !["camera", "edit"].includes(modalName!),
          }
        )}
        style={
          { "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties
        }
      >
        <DrawerHeader className="flex justify-between items-center gap-2 border-b py-2">
          <DrawerTitle className="font-medium">
            <PopoverTitle modalName={modalName} />
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

        <DrawerClose className="inline-block absolute sm:hidden top-2.5 left-2.5 z-10 cursor-pointer">
          <CloseIcon />
        </DrawerClose>

        <PopoverContent modalName={modalName} />
      </DrawerContentWitoutHandler>
    </Drawer>
  );
};

interface PopoverTitleOrContentProps {
  modalName: string;
}

const PopoverTitle = ({ modalName }: PopoverTitleOrContentProps) => {
  switch (modalName) {
    case "camera":
      return <p>Upload Avatar</p>;
    case "edit":
      return <p>Edit Avatar</p>;
  }
};

const PopoverContent = ({ modalName }: PopoverTitleOrContentProps) => {
  switch (modalName) {
    case "camera":
      return <AvatarUploaderModal />;
    case "edit":
      return <AvatarEditModal />;
  }
};

export default SignupPopover;
