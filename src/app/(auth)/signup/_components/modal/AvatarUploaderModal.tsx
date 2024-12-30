"use client";

import React, {
  DragEvent,
  ChangeEvent,
  Fragment,
  useState,
  useCallback,
  useMemo,
} from "react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { removeAvatar, setAvatar } from "@/redux/features/signup/signupSlice";
import { useToast } from "@/hooks/use-toast";
import {
  LucideIcon,
  Aperture as CameraIcon,
  Crop as EditIcon,
  Trash as RemoveIcon,
  CheckCheck as ProceedIcon,
} from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import ActionButton from "@/app/(auth)/signup/_components/modal/ActionButton";
import { CenterScrollArea } from "@/components/scrollArea/CenterScrollArea";
import clsx from "clsx";
import useModifyQueryParams from "@/hooks/use-modify-query-params";
import { useRouter } from "next/navigation";
import UploadAvatarCanvas from "@/components/canvas/UploadAvatarCanvas";

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

  const handleNavigateEdit = () => {
    const queryParams = modifyParams("set", "avatar", "edit");
    router.push(buildFullPath(queryParams));
  };

  const actionButtonList = useMemo<Array<IActionButton>>(
    () => [
      {
        id: "camera",
        label: "upload avatar",
        Icon: CameraIcon,
        isInput: true,
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
        link: "/signup",
      },
    ],
    [handleClearAvatar]
  );

  return (
    <CenterScrollArea className="h-full p-5">
      <section className="w-full h-full flex flex-col justify-center items-center gap-3 max-w-lg">
        <div>
          <h2 className="text-center capitalize text-primary text-xl font-bold select-none">
            Upload avatar
          </h2>
        </div>
        <LoginSeparator />
        <label
          htmlFor="avatar"
          className="w-full max-w-[350px] max-h-[350px] p-2 group rounded-md"
        >
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
        <LoginSeparator />
        <TooltipProvider>
          <div className="flex justify-center items-center gap-2 flex-wrap">
            {actionButtonList.map(
              ({ id, label, Icon, link, onClick, isInput }) => {
                if (
                  !avatarPreview &&
                  ["edit", "remove", "proceed"].includes(id)
                )
                  return null;

                const actionButtonProps = { id, Icon, onClick, label };

                return (
                  <Fragment key={id}>
                    {isInput ? (
                      <label htmlFor="avatar" className="cursor-pointer">
                        <input
                          type="file"
                          name="avatar"
                          accept="image/*"
                          id="avatar"
                          onChange={handleAvatarChange}
                          hidden
                        />
                        <ActionButton
                          {...actionButtonProps}
                          className="pointer-events-none"
                        />
                      </label>
                    ) : (
                      <>
                        {link && (
                          <Link href={link}>
                            <ActionButton {...actionButtonProps} />
                          </Link>
                        )}
                        {onClick && <ActionButton {...actionButtonProps} />}
                      </>
                    )}
                  </Fragment>
                );
              }
            )}
          </div>
        </TooltipProvider>
      </section>
    </CenterScrollArea>
  );
};

const LoginSeparator = () => (
  <Separator className="opacity-20 shadow-xl bg-primary w-40 h-[2px]" />
);

export default AvatarUploaderModal;
