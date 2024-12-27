import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { Ellipsis as ThreeDotHIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import FollowerPopover from "@/app/(home)/channel/[id]/_components/Followers/FollowerPopover";

const avatars = [
  {
    avatar: "https://avatars.githubusercontent.com/u/16860528",
    url: "/",
    name: "full name1",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/20110627",
    url: "/",
    name: "full name1",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/106103625",
    url: "/",
    name: "full name1",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/59228569",
    url: "/",
    name: "full name1",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/59442788",
    url: "/mali",
    name: "full name1",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/89768406",
    url: "/",
    name: "full name1",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/16860528",
    url: "/",
    name: "full name1",
  },
];

const FollowersList = () => {
  return (
    <div className="flex">
      <TooltipProvider>
        {avatars.map(({ avatar, url, name }, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Link href={url}>
                <Avatar
                  className={clsx(
                    "border-2 border-white relative before:content-[''] before:absolute before:size-full before:left-0 before:top-0 hover:before:bg-white/30 before:bg-transparent before:transition-all before:duration-100",
                    {
                      "-ml-3": index !== 0,
                    }
                  )}
                >
                  <AvatarImage src={avatar} alt={String(index)} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={5}>
              {name}
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
      
      <FollowerPopover>
        <Link href={"?followers"} className="">
          <Avatar className="border-2 border-white -ml-2 cursor-pointer relative">
            <AvatarImage src={avatars[0].avatar} alt={""} />
            <AvatarFallback>CN</AvatarFallback>
            <div className="absolute bg-primary/60 text-white w-full h-full top-0 left-0 grid place-items-center transition-all duration-100 hover:bg-primary/30">
              <ThreeDotHIcon />
            </div>
          </Avatar>
        </Link>
      </FollowerPopover>
    </div>
  );
};

export default FollowersList;
