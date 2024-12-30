"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerContentWitoutHandler,
} from "@/components/ui/drawer";
import useIsActiveQuery from "@/hooks/use-is-active-query";
import useModifyQueryParams from "@/hooks/use-modify-query-params";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { X as CloseIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import CreateChannelName from "@/app/(home)/channels/my/_components/CreateChannel/CreateChannelName";
import CreateChannelDescription from "@/app/(home)/channels/my/_components/CreateChannel/CreateChannelDescription";
import CreateChannelAvatar from "@/app/(home)/channels/my/_components/CreateChannel/CreateChannelAvatar";
import CreateChannelCover from "@/app/(home)/channels/my/_components/CreateChannel/CreateChannelCover";
import CreateChannelPreview from "@/app/(home)/channels/my/_components/CreateChannel/CreateChannelPreview";
import CreateChannelFooter from "@/app/(home)/channels/my/_components/CreateChannel/CreateChannelFooter";
import CreateChannelAvatarEditor from "@/app/(home)/channels/my/_components/CreateChannel/CreateChannelAvatarEditor";
import CreateChannelCoverEditor from "@/app/(home)/channels/my/_components/CreateChannel/CreateChannelCoverEditor";
import { clearState } from "@/redux/features/create-channel/createChannelSlice";
import { useAppDispatch } from "@/redux/hooks";
import clsx from "clsx";

const CreateChannelPopover = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const isAboutOpen = useIsActiveQuery("create");
  const { modifyParams, buildFullPath } = useModifyQueryParams();

  const handleClose = (open: boolean) => {
    if (!open) {
      dispatch(clearState());
      return router.push(buildFullPath(modifyParams("delete", "create")));
    }
  };

  const createStep = useMemo(
    () => searchParams.get("create")?.trim()!,
    [searchParams]
  );

  return (
    <Drawer
      direction="right"
      handleOnly={true}
      open={isAboutOpen}
      onOpenChange={handleClose}
      dismissible={false}
    >
      <DrawerContentWitoutHandler
        className={clsx(
          "fixed mt-0 overflow-hidden w-[90%] max-w-xl inset-2 rounded-sm ml-auto border-0",
          {
            "max-w-4xl": ["4", "7"].includes(createStep),
          }
        )}
        style={
          { "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties
        }
      >
        <DrawerHeader className="flex justify-between items-center gap-2 border-b py-2">
          <DrawerTitle className="font-medium">
            <PopoverTitle createStep={createStep} />
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
        <ScrollArea className="center-scroll-area w-full h-full">
          <PopoverContent createStep={createStep} />
        </ScrollArea>
        <CreateChannelFooter createStep={createStep} />
      </DrawerContentWitoutHandler>
    </Drawer>
  );
};

interface PopoverTitleOrContentProps {
  createStep: string;
}

const PopoverTitle = ({ createStep }: PopoverTitleOrContentProps) => {
  switch (createStep) {
    case "1":
      return <p>Channel Name</p>;
    case "2":
      return <p>Channel Description</p>;
    case "3":
      return <p>Channel Avatar</p>;
    case "4":
      return <p>Channel Cover</p>;
    case "5":
      return <p>Channel Preview</p>;
    case "6":
      return <p>Edit Channel Avatar</p>;
    case "7":
      return <p>Edit Channel Cover</p>;
  }
};

const PopoverContent = ({ createStep }: PopoverTitleOrContentProps) => {
  switch (createStep) {
    case "1":
      return <CreateChannelName />;
    case "2":
      return <CreateChannelDescription />;
    case "3":
      return <CreateChannelAvatar />;
    case "4":
      return <CreateChannelCover />;
    case "5":
      return <CreateChannelPreview />;
    case "6":
      return <CreateChannelAvatarEditor />;
    case "7":
      return <CreateChannelCoverEditor />;
  }
};

export default CreateChannelPopover;
