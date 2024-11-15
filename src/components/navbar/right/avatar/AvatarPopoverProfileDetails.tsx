import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const AvatarPopoverProfileDetails = () => {
  return (
    <div className="w-full flex gap-2 sm:gap-3 p-4">
      <Avatar className="size-8 sm:size-10 cursor-pointer">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-0.5 overflow-hidden w-full">
        <h4 className="text-sm sm:text-base line-clamp-1">
          Shakil Abdus Shohid
        </h4>
        <p className="text-xs sm:text-sm line-clamp-1">
          shakil102043@gmail.com
        </p>
        <Link href={"/"} className="select-none mt-2">
          <Button variant={"outline"} className="capitalize h-auto py-2">
            View profile
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AvatarPopoverProfileDetails;
