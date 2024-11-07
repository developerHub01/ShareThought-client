"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  MessageSquareText as CommentIcon,
  ThumbsUp as LikeIcon,
  Link as LinkIcon,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const reactionList: Array<IReaction> = [
  {
    id: "like",
    icon: "/reaction-icons/like.png",
  },
  {
    id: "love",
    icon: "/reaction-icons/love.png",
  },
  {
    id: "wow",
    icon: "/reaction-icons/wow.png",
  },
  {
    id: "clap",
    icon: "/reaction-icons/clap.png",
  },
  {
    id: "helpful",
    icon: "/reaction-icons/helpful.png",
  },
  {
    id: "inspiring",
    icon: "/reaction-icons/inspiring.png",
  },
];

type TOnClick = () => void;

interface IActionButtonsList {
  id: string;
  Icon: LucideIcon;
  link?: string;
  onClick?: TOnClick;
}

const actionButtonsList: Array<IActionButtonsList> = [
  {
    id: "react",
    Icon: LikeIcon,
    onClick: () => console.log("Reacted"),
  },
  {
    id: "copy_list",
    Icon: LinkIcon,
    onClick: () => console.log("link copied"),
  },
  {
    id: "comment",
    Icon: CommentIcon,
    link: "/",
  },
];

const CommunityInteraction = () => {
  return (
    <div className="flex flex-col gap-2 pt-2">
      <div className="flex gap-1 sm:gap-3 flex-col sm:flex-row items-center justify-center sm:justify-between flex-wrap">
        <Button variant="link" size={"sm"} className="text-xs px-0">
          <ReactionTypeAvatarList />
          50K Reactions
        </Button>
        <Button variant="link" size={"sm"} className="text-xs px-0">
          <CommentIcon /> 50K comments
        </Button>
      </div>
      <div className="flex gap-2 items-center">
        {actionButtonsList.map(({ id, onClick, Icon, link }) => (
          <React.Fragment key={id}>
            {link ? (
              <Link href={link} className="w-full">
                <ActionButton Icon={Icon} />
              </Link>
            ) : id === "react" ? (
              <ReactPostActionButton
                Icon={Icon}
                onClick={onClick as TOnClick}
              />
            ) : (
              <ActionButton Icon={Icon} onClick={onClick} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const ActionButton = ({
  Icon,
  onClick,
}: {
  Icon: LucideIcon;
  onClick?: () => void;
}) => {
  return (
    <Button variant="outline" size="icon" onClick={onClick} fullWidth={true}>
      <Icon />
    </Button>
  );
};

const ReactPostActionButton = ({
  Icon,
  onClick,
}: {
  Icon: LucideIcon;
  onClick: () => void;
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={onClick}
          fullWidth={true}
        >
          <Icon />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent
        align="start"
        side="top"
        className="flex flex-wrap gap-1 sm:gap-2 justify-center items-center w-fit"
      >
        {reactionList.map(({ id, icon }) => (
          <Avatar
            key={id}
            className="transition-all duration-150 ease-out hover:scale-110 hover:rotate-12 cursor-pointer hover:animate-spin overflow-visible rounded-none size-7 sm:size-10"
          >
            <AvatarImage src={icon} />
            <AvatarFallback>{id}</AvatarFallback>
          </Avatar>
        ))}
      </HoverCardContent>
    </HoverCard>
  );
};

interface IReaction {
  id: string;
  icon: string;
}

const ReactionTypeAvatarList = () => {
  return (
    <div className="flex items-center">
      {reactionList.map(({ id, icon }) => (
        <Avatar key={id} className="size-5 sm:size-6 -ml-1.5 sm:-ml-3 first:ml-0">
          <AvatarImage src={icon} alt="" className="select-none" />
          <AvatarFallback>DH</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
};

export default CommunityInteraction;
