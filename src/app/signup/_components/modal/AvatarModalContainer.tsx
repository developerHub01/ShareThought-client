"use client";

import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContentWitoutHandler,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import AvatarUploaderModal from "@/app/signup/_components/modal/AvatarUploaderModal";
import AvatarEditModal from "@/app/signup/_components/modal/AvatarEditModal";
import clsx from "clsx";
import { X as CloseIcon } from "lucide-react";
import { CenterScrollArea } from "@/components/scrollArea/CenterScrollArea";

type TModalType = "camera" | "edit";

interface AvatarModalContainerProps {
  isOpen: boolean;
  modalType: TModalType;
  onClose: () => void;
}

const AvatarModalContainer = ({
  isOpen,
  modalType,
  onClose,
}: AvatarModalContainerProps) => {
  return (
    <Drawer
      direction="right"
      handleOnly={true}
      open={isOpen}
      onOpenChange={onClose}
    >
      <DrawerContentWitoutHandler
        className={clsx(
          "fixed mt-0 overflow-hidden inset-2 rounded-sm ml-auto border-0 w-[90%] max-w-max grid-place-items-centered",
          {
            "max-w-md": modalType === "camera",
            "max-w-2xl": modalType === "edit",
            "w-0": !["camera", "edit"].includes(modalType as TModalType),
          }
        )}
        style={
          { "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties
        }
      >
        <DrawerHeader className="hidden">
          <DrawerTitle hidden></DrawerTitle>
          <DrawerDescription hidden></DrawerDescription>
        </DrawerHeader>

        <DrawerClose className="inline-block absolute sm:hidden top-2.5 left-2.5 z-10 cursor-pointer">
          <CloseIcon />
        </DrawerClose>

        {modalType === "camera" ? <AvatarUploaderModal /> : <AvatarEditModal />}
      </DrawerContentWitoutHandler>
    </Drawer>
  );
};

export default AvatarModalContainer;
