"use client";

import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import React from "react";
import { EnterIcon, ViewIcon } from "@/lib/icons";
import { CenterScrollArea } from "@/components/scrollArea/CenterScrollArea";

const channelDefaultCover = "/images/channel-cover.jpg";
const channelDefaultAvatar = "/images/channel-avatar.jpg";

const CreateChannelPreview = () => {
  const { channelName, channelDescription, channelAvatar, channelCover } =
    useAppSelector((state) => state.createChannel.channelState);
  return (
    <CenterScrollArea className="w-full h-full">
      <div className="p-5">
        <div className="shadow-xl w-full border border-accent rounded-sm overflow-hidden">
          <div className="w-full aspect-banner overflow-hidden">
            <Image
              src={channelCover || channelDefaultCover}
              alt="channel banner"
              width={500}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-3 pt-0 flex flex-col gap-1 justify-center items-center text-center">
            <div className="size-20 rounded-full overflow-hidden ring-4 ring-white -mt-10 mb-2">
              <Image
                src={channelAvatar || channelDefaultAvatar}
                alt="channel banner"
                width={250}
                height={250}
                className="size-full object-cover"
              />
            </div>
            <h3 className="font-medium text-lg line-clamp-2 overflow-hidden text-ellipsis mb-1.5">
              {channelName}
            </h3>
            <div className="flex justify-start items-center gap-1 text-gray-500 text-xs flex-wrap select-none">
              <span>
                <span className="w-12 h-5 bg-primary/20 backdrop-blur-xl rounded-sm mr-2"></span>
                followers
              </span>
            </div>
            <p className="text-primary/80 text-xs text-gray-500 line-clamp-2 overflow-hidden text-ellipsis leading-relaxed mb-2">
              {channelDescription}
            </p>
            <div className="flex justify-center items-center gap-1 flex-wrap">
              <Button size={"sm"} variant={"outline"}>
                <ViewIcon size={18} />
                View Channel
              </Button>
              <Button size={"sm"}>
                <EnterIcon size={18} /> Switch Channel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CenterScrollArea>
  );
};

export default CreateChannelPreview;
