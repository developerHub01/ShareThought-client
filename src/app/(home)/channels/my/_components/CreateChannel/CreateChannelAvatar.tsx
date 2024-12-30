"use client";

import UploadAvatarCanvas from "@/components/canvas/UploadAvatarCanvas";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useModifyQueryParams from "@/hooks/use-modify-query-params";
import { useToast } from "@/hooks/use-toast";
import {
  removeField,
  setField,
} from "@/redux/features/create-channel/createChannelSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import clsx from "clsx";
import {
  Aperture as CameraIcon,
  Crop as EditIcon,
  Trash as RemoveIcon,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, {
  ChangeEvent,
  DragEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

interface IActionButton {
  id: "camera" | "edit" | "remove";
  label: string;
  Icon: LucideIcon;
  link?: string;
  onClick?: () => void;
}

const CreateChannelAvatar = () => {
  const [isDragging, setIsDragging] = useState(false);
  const { channelAvatar: avatarPreview } = useAppSelector(
    (state) => state.createChannel.channelState
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { toast } = useToast();
  const { modifyParams, buildFullPath } = useModifyQueryParams();

  const avatarInputRef = useRef<HTMLInputElement | null>(null);

  const processAvatarFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        return toast({
          title: "Oops! That's not an image!",
          description:
            "Please upload a valid image file to set your avatar. 😊",
        });
      }

      const avatarURL = URL.createObjectURL(file);
      dispatch(setField({ key: "channelAvatar", value: avatarURL }));
    },
    [dispatch, toast]
  );

  const handleClearAvatar = useCallback(() => {
    dispatch(removeField("channelAvatar"));
    setIsDragging(false);
  }, [dispatch]);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const avatarFile = e.dataTransfer.files[0];
      if (avatarFile) processAvatarFile(avatarFile);
    },
    [processAvatarFile]
  );

  const handleDragOver = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!isDragging) setIsDragging(true);
    },
    [isDragging]
  );

  const handleDragLeave = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (isDragging) setIsDragging(false);
    },
    [isDragging]
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const avatarFile = e.target.files?.[0];
      if (avatarFile) processAvatarFile(avatarFile);
    },
    [processAvatarFile]
  );

  const handleOpenCamera = () => {
    if (avatarInputRef.current) avatarInputRef.current.click();
  };

  const handleNavigateEditQuery = () =>
    router.push(buildFullPath(modifyParams("set", "create", "6")));

  const actionButtonList = useMemo<Array<IActionButton>>(
    () => [
      {
        id: "camera",
        label: "camera",
        Icon: CameraIcon,
        onClick: handleOpenCamera,
      },
      {
        id: "edit",
        label: "edit",
        Icon: EditIcon,
        onClick: handleNavigateEditQuery,
      },
      {
        id: "remove",
        label: "remove",
        Icon: RemoveIcon,
        onClick: handleClearAvatar,
      },
    ],
    []
  );

  const filteredButtons = useMemo(
    () =>
      actionButtonList.filter(({ id }) => {
        if (!avatarPreview && ["edit", "remove"].includes(id)) return false;
        return true;
      }),
    [actionButtonList, avatarPreview]
  );

  return (
    <div className="flex flex-col justify-center items-center p-5">
      <div className="w-full p-2 group rounded-md flex flex-col justify-center items-center gap-5">
        <label
          htmlFor="avatar"
          className="block w-full h-full max-w-[360px] max-h-[360px]"
        >
          <input
            type="file"
            name="avatar"
            accept="image/*"
            id="avatar"
            ref={avatarInputRef}
            onChange={handleAvatarChange}
            hidden
          />
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={clsx(
              "size-full aspect-square flex flex-col gap-5 justify-center items-center rounded-md cursor-pointer border-dashed duration-100 ring-offset-4 group-hover:ring-offset-4 ring-2 ring-transparent group-hover:ring-primary/50 shadow-lg p-2 text-center",
              {
                "ring-primary/50 bg-accent": isDragging,
                "ring-transparent bg-accent/10": !isDragging,
              }
            )}
          >
            {avatarPreview ? (
              <Image
                src={avatarPreview}
                width={400}
                height={400}
                alt=""
                className="size-full object-cover rounded-sm"
              />
            ) : (
              <UploadAvatarCanvas />
            )}
          </div>
        </label>
        <ActionList filteredButtons={filteredButtons} />
      </div>
    </div>
  );
};

interface ActionListProps {
  filteredButtons: Array<IActionButton>;
}

const ActionList = ({ filteredButtons }: ActionListProps) => {
  return (
    <TooltipProvider>
      <div className="flex justify-center items-center w-fit rounded-sm bg-primary text-white shadow-md overflow-hidden mx-auto">
        {filteredButtons.map(({ id, Icon, label, onClick }) => (
          <Tooltip key={id}>
            <TooltipTrigger asChild>
              <Button
                onClick={onClick}
                variant={"ghost"}
                className="rounded-none hover:bg-accent/20 hover:text-white"
              >
                <Icon />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={8}>
              {label}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default CreateChannelAvatar;
