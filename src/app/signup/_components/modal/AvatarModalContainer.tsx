"use client";

import React from "react";
import {
  Drawer,
  DrawerContentWitoutHandler,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import AvatarUploaderModal from "@/app/signup/_components/modal/AvatarUploaderModal";
import AvatarEditModal from "@/app/signup/_components/modal/AvatarEditModal";
import clsx from "clsx";

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
          "fixed mt-0 overflow-hidden inset-2 rounded-sm ml-auto border-0 py-5 px-3 sm:py-8 sm:px-10 w-[90%] max-w-max",
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
        {modalType === "camera" ? <AvatarUploaderModal /> : <AvatarEditModal />}
      </DrawerContentWitoutHandler>
    </Drawer>
  );
};

export default AvatarModalContainer;
