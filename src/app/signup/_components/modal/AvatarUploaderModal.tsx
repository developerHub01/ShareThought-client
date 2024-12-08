"use client";

import React, { DragEvent, ChangeEvent, Fragment, useState } from "react";
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
import ActionButton from "@/app/signup/_components/modal/ActionButton";
import { CenterScrollArea } from "@/components/scrollArea/CenterScrollArea";
import clsx from "clsx";

interface IActionButton {
  id: "camera" | "edit" | "remove" | "proceed";
  label: string;
  Icon: LucideIcon;
  link?: string;
  onClick?: () => void;
  isInput?: boolean;
}

const actionButtonList: Array<IActionButton> = [
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
    link: "?avatar=edit",
  },
  {
    id: "remove",
    label: "remove",
    Icon: RemoveIcon,
    onClick: () => {},
  },
  {
    id: "proceed",
    label: "proceed",
    Icon: ProceedIcon,
    link: "/signup",
  },
];

const AvatarUploaderModal = () => {
  const [isDragging, setIsDragging] = useState(false);
  const { avatar: avatarPreview } = useAppSelector((state) => state.signUp);
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const handleClearAvatar = () => {
    dispatch(removeAvatar());
    setIsDragging(false);
  };

  actionButtonList[2].onClick = handleClearAvatar;

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const avatarFile = e.dataTransfer.files[0];

    if (avatarFile) processAvatarFile(avatarFile);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const avatarFile = e.target.files?.[0];

    if (avatarFile) processAvatarFile(avatarFile);
  };

  const processAvatarFile = (file: File) => {
    if (!file.type.startsWith("image/"))
      return toast({
        title: "Oops! That's not an image!",
        description: "Please upload a valid image file to set your avatar. 😊",
      });

    const avatarURL = URL.createObjectURL(file);

    dispatch(setAvatar(avatarURL));
  };

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
              "size-full aspect-square flex flex-col gap-5 justify-center items-center rounded-md cursor-pointer border-dashed duration-100 ring-offset-0 group-hover:ring-offset-4 ring-transparent group-hover:ring-primary/50 shadow-lg p-2 text-center",
              {
                "ring-2 ring-offset-4 ring-primary/50 bg-accent": isDragging,
                "ring-0 bg-transparent": !isDragging,
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
                          <Link href={"/signup?avatar=edit"}>
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

const UploadAvatarCanvas = () => (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-image-up w-14 sm:w-28 text-primary"
    >
      <path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21" />
      <path d="m14 19.5 3-3 3 3" />
      <path d="M17 22v-5.5" />
      <circle cx="9" cy="9" r="2" />
    </svg>
    <p className="text-gray-500 text-xs sm:text-sm">
      Click or Drag and drop your image here
    </p>
  </>
);

export default AvatarUploaderModal;
