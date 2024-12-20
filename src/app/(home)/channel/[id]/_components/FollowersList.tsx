import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { Ellipsis as ThreeDotHIcon } from "lucide-react";

const avatars = [
  {
    avatar: "https://avatars.githubusercontent.com/u/16860528",
    url: "/",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/20110627",
    url: "/",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/106103625",
    url: "/",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/59228569",
    url: "/",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/59442788",
    url: "/mali",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/89768406",
    url: "/",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/16860528",
    url: "/",
  },
];

const FollowersList = () => {
  return (
    <div className="flex">
      {avatars.map(({ avatar, url }, index) => (
        <Link href={url} key={index}>
          <Avatar
            className={clsx(
              "border-2 border-white relative before:content-[''] before:absolute before:size-full before:left-0 before:top-0 hover:before:bg-white/30 before:bg-transparent before:transition-all before:duration-100",
              {
                "-ml-2": index !== 0,
              }
            )}
          >
            <AvatarImage src={avatar} alt={String(index)} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
      ))}
      <button className="">
        <Avatar className="border-2 border-white -ml-2 cursor-pointer relative">
          <AvatarImage src={avatars[0].avatar} alt={""} />
          <AvatarFallback>CN</AvatarFallback>
          <div className="absolute bg-primary/60 text-white w-full h-full top-0 left-0 grid place-items-center transition-all duration-100 hover:bg-primary/30">
            <ThreeDotHIcon />
          </div>
        </Avatar>
      </button>
    </div>
  );
};

export default FollowersList;
