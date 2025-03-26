"use client";

import React, {
  DragEvent,
  ChangeEvent,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { removeAvatar, setAvatar } from "@/redux/features/signup/signupSlice";
import { useToast } from "@/hooks/use-toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import ActionButton from "@/app/(auth)/signup/_components/modal/ActionButton";
import { CenterScrollArea } from "@/components/scrollArea/CenterScrollArea";
import clsx from "clsx";
import UploadAvatarCanvas from "@/components/canvas/UploadAvatarCanvas";
import useModifyQueryParams from "@/hooks/use-modify-query-params";
import { useRouter } from "next/navigation";
import { LucideIcon, CameraIcon, EditIcon, ProceedIcon, RemoveIcon } from "@/lib/icons";

interface IActionButton {
  id: "camera" | "edit" | "remove" | "proceed";
  label: string;
  Icon: LucideIcon;
  link?: string;
  onClick?: () => void;
  isInput?: boolean;
}

const AvatarUploaderModal = () => {
  const [isDragging, setIsDragging] = useState(false);
  const { avatar: avatarPreview } = useAppSelector((state) => state.signUp);
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
      dispatch(setAvatar(avatarURL));
    },
    [dispatch, toast]
  );

  const handleClearAvatar = useCallback(() => {
    dispatch(removeAvatar());
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
    if (avatarInputRef.current) {
      avatarInputRef.current.value = "";
      avatarInputRef.current.click();
    }
  };

  const handleNavigateEdit = () => {
    const queryParams = modifyParams("set", "avatar", "edit");
    router.push(buildFullPath(queryParams));
  };

  const handleNavigateProceed = () =>
    router.push(buildFullPath(modifyParams("delete", "avatar")));

  const actionButtonList = useMemo<Array<IActionButton>>(
    () => [
      {
        id: "camera",
        label: "upload avatar",
        Icon: CameraIcon,
        onClick: handleOpenCamera,
      },
      {
        id: "edit",
        label: "edit",
        Icon: EditIcon,
        onClick: handleNavigateEdit,
      },
      {
        id: "remove",
        label: "remove",
        Icon: RemoveIcon,
        onClick: handleClearAvatar,
      },
      {
        id: "proceed",
        label: "proceed",
        Icon: ProceedIcon,
        onClick: handleNavigateProceed,
      },
    ],
    [handleClearAvatar]
  );

  return (
    <CenterScrollArea className="h-full p-5">
      <section className="w-full h-full flex flex-col justify-center items-center gap-3 max-w-lg">
        <label
          htmlFor="avatar"
          className="w-full max-w-[350px] max-h-[350px] p-2 group rounded-md"
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
        <TooltipProvider>
          <div className="flex justify-center items-center gap-2 flex-wrap">
            {actionButtonList.map(({ id, label, Icon, onClick }) => {
              if (!avatarPreview && ["edit", "remove", "proceed"].includes(id))
                return null;

              const actionButtonProps = { id, Icon, onClick, label };

              return <ActionButton {...actionButtonProps} key={id} />;
            })}
          </div>
        </TooltipProvider>
      </section>
    </CenterScrollArea>
  );
};

export default AvatarUploaderModal;
