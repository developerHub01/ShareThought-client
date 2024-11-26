"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { removeAvatar } from "@/redux/features/signup/signupSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Aperture as CameraIcon,
  Crop as EditIcon,
  Trash as RemoveIcon,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface IActionButton {
  id: "camera" | "edit" | "remove";
  label: string;
  Icon: LucideIcon;
  link?: string;
  onClick?: () => void;
}

const actionButtonList: Array<IActionButton> = [
  {
    id: "camera",
    label: "camera",
    Icon: CameraIcon,
    link: "?avatar=camera",
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
];

const AvatarUpload = () => {
  const imgUrl = "/avatar.png";

  const dispatch = useAppDispatch();

  const { avatar: uploadedAvatar } = useAppSelector((state) => state.signUp);

  const handleRemoveAvatar = () => dispatch(removeAvatar());

  actionButtonList[2].onClick = handleRemoveAvatar;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="size-full max-w-64 max-h-64 aspect-square rounded-full overflow-hidden ring-8">
        <Image
          src={uploadedAvatar || imgUrl}
          width={400}
          height={400}
          alt="avatar"
          className="w-full h-full object-fit bg-white select-none"
        />
      </div>
      <TooltipProvider>
        <div className="flex justify-center items-center w-auto rounded-sm bg-primary text-white shadow-md overflow-hidden -mt-10 ring-4">
          {actionButtonList.map(({ id, Icon, label, onClick, link }) => {
            /* if there is no avatar uploaded then we don't want to show edit or clear option */
            if (!uploadedAvatar && ["edit", "remove"].includes(id)) return null;

            return (
              <Tooltip key={id}>
                <TooltipTrigger asChild>
                  {link ? (
                    <Link href={link}>
                      <Button
                        size={"icon"}
                        variant={"ghost"}
                        className="rounded-none hover:bg-accent/20 hover:text-white"
                      >
                        <Icon />
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      size={"icon"}
                      variant={"ghost"}
                      className="rounded-none hover:bg-accent/20 hover:text-white"
                      onClick={onClick}
                    >
                      <Icon />
                    </Button>
                  )}
                </TooltipTrigger>
                <TooltipContent sideOffset={8}>{label}</TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </TooltipProvider>
    </div>
  );
};

export default AvatarUpload;
