"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { ThreeDotIcon as ThreeDotHIcon } from "@/lib/icons";
import { useRouter } from "next/navigation";
import useModifyQueryParams from "@/hooks/use-modify-query-params";

interface FollowerPopoverActionProps {
  avatar: string;
}

const FollowerPopoverAction = ({ avatar }: FollowerPopoverActionProps) => {
  const router = useRouter();
  const { modifyParams, buildFullPath } = useModifyQueryParams();
  const handleNavigateFollowerQuery = () =>
    router.push(buildFullPath(modifyParams("set", "followers")));

  return (
    <Avatar
      onClick={handleNavigateFollowerQuery}
      className="border-2 border-white -ml-2 cursor-pointer relative"
    >
      <AvatarImage src={avatar} alt={""} />
      <AvatarFallback>CN</AvatarFallback>
      <div className="absolute bg-primary/60 text-white w-full h-full top-0 left-0 grid place-items-center transition-all duration-100 hover:bg-primary/30">
        <ThreeDotHIcon />
      </div>
    </Avatar>
  );
};

export default FollowerPopoverAction;
