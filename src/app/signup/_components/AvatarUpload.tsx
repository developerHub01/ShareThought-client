"use client";

import { Button } from "@/components/ui/button";
import { Aperture as CameraIcon, Crop as EditIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const actionButtonList = [
  {
    id: "camera",
    Icon: CameraIcon,
    onClick: () => {},
  },
  {
    id: "edit",
    Icon: EditIcon,
    onClick: () => {},
  },
];

const AvatarUpload = () => {
  const imgUrl = "/avatar.png";

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="size-full max-w-64 max-h-64 aspect-square rounded-full overflow-hidden ring-8">
        <Image
          src={imgUrl}
          width={400}
          height={400}
          alt="avatar"
          className="w-full h-full object-fit bg-white select-none"
        />
      </div>
      <div className="flex justify-center items-center w-auto rounded-sm bg-primary text-white shadow-md overflow-hidden -mt-10 ring-4">
        {actionButtonList.map(({ id, Icon, onClick }) => (
          <Link key={id} href={`?avatar=${id}`}>
            <Button
              size={"icon"}
              variant={"ghost"}
              className="rounded-none hover:bg-accent/20 hover:text-white"
              onClick={onClick}
            >
              <Icon />
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AvatarUpload;
