import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LightSeparator from "@/components/separator/LightSeparator";

interface IChannelListItem {
  id: string;
  channelAvatar: string;
  channelName: string;
  followerCount: number;
  role: "author" | "moderator" | "super moderator";
}

const channelList: Array<IChannelListItem> = [
  {
    id: "channel1",
    channelAvatar: "https://github.com/shadcn.png",
    channelName: "channel name 1",
    followerCount: 500,
    role: "author",
  },
  {
    id: "channel2",
    channelAvatar: "https://github.com/shadcn.png",
    channelName: "channel name 2",
    followerCount: 500,
    role: "author",
  },
  {
    id: "channel3",
    channelAvatar: "https://github.com/shadcn.png",
    channelName: "channel name 3",
    followerCount: 500,
    role: "moderator",
  },
  {
    id: "channel4",
    channelAvatar: "https://github.com/shadcn.png",
    channelName: "channel name 4",
    followerCount: 500,
    role: "super moderator",
  },
];

const AvatarPopoverChannelList = () => {
  return (
    <div className="w-full flex flex-col">
      {channelList.map(
        ({ id, channelAvatar, channelName, followerCount, role }) => (
          <Button
            asChild
            key={id}
            className="rounded-none flex justify-start items-start gap-1 w-full cursor-pointer h-auto"
            variant={"ghost"}
          >
            <div className="flex">
              <span className="w-6" />
              <div className="flex gap-2">
                <Avatar className="size-10 sm:size-14">
                  <AvatarImage src={channelAvatar} />
                  <AvatarFallback>{channelName}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0.5 items-start overflow-hidden">
                  <p className="text-sm font-normal line-clamp-1 capitalize">
                    {channelName}
                  </p>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {followerCount} followers
                  </p>
                  <Badge
                    size={"sm"}
                    className="capitalize tracking-wider font-extralight px-1.5 py-[0.5px]"
                  >
                    {role}
                  </Badge>
                </div>
              </div>
            </div>
          </Button>
        )
      )}
      <ChannelListAndActionSeparator />
    </div>
  );
};

const ChannelListAndActionSeparator = () => (
  <span className="flex">
    <span className="w-6" />
    <span className="w-full">
      <LightSeparator className="mr-auto" />
    </span>
  </span>
);

export default AvatarPopoverChannelList;
