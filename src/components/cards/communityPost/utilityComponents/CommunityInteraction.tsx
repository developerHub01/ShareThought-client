"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { REACTION_LIST, REACTION_MAP } from "@/constant";
import { TReactions } from "@/types";
import {
  MessageSquareText as CommentIcon,
  ThumbsUp as LikeIcon,
  Link as LinkIcon,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import React, { MouseEvent, useState } from "react";

type TOnClick = () => void;

interface IActionButtonsList {
  id: string;
  Icon: LucideIcon;
  link?: string;
  onClick?: TOnClick;
}

interface ReactPostActionButtonProps {
  activeReactionId: TReactions | null;
  handleReactReaction: (reactionId?: TReactions) => () => void;
}

interface ActionButtonProps {
  Icon: LucideIcon;
  onClick?: () => void;
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
] as const;

const CommunityInteraction = () => {
  const [activeReactionId, setActiveReactionId] = useState<TReactions | null>(
    null
  );

  const handleReactReaction = (reactionId?: TReactions) => () => {
    if (!reactionId) return setActiveReactionId(null);
    if (!REACTION_MAP[reactionId]) return setActiveReactionId(null);

    return setActiveReactionId(reactionId);
  };

  return (
    <div className="flex flex-col gap-2 pt-2">
      <div className="flex gap-1 sm:gap-3 flex-col sm:flex-row items-center justify-center sm:justify-between flex-wrap">
        <Button variant="link" size={"sm"} className="text-xs px-0">
          <ReactionTypeAvatarList />
          50K
        </Button>
        <Button variant="link" size={"sm"} className="text-xs px-0">
          <CommentIcon /> 50K
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
                activeReactionId={activeReactionId}
                handleReactReaction={handleReactReaction}
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

const ActionButton = ({ Icon, onClick }: ActionButtonProps) => {
  return (
    <Button variant="outline" size="icon" onClick={onClick} fullWidth={true}>
      <Icon />
    </Button>
  );
};

const ReactPostActionButton = ({
  activeReactionId = null,
  handleReactReaction,
}: ReactPostActionButtonProps) => {
  const [isHoverCardOpen, setIsHoverCardOpen] = useState<boolean>(false);
  const [isLikeButtonClicked, setIsLikeButtonClicked] =
    useState<boolean>(false);

  /* if reaction button is clicked then no need to show popover else show */
  const handleOnOpenChange = (isOpen: boolean) => {
    if (isLikeButtonClicked) {
      setIsLikeButtonClicked(false);
      return setIsHoverCardOpen(false);
    }

    return setIsHoverCardOpen(isOpen);
  };

  const handleClickLikeButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsLikeButtonClicked(true);

    if (activeReactionId) return handleReactReaction()();

    return handleReactReaction("LIKE")();
  };

  const handleReactReactionChange = (reactionId?: TReactions) => () => {
    setTimeout(() => {
      setIsHoverCardOpen(false);
      setIsLikeButtonClicked(false); /* that is optional. only for sefty */
    }, 10);
    return handleReactReaction(reactionId)();
  };

  return (
    <HoverCard open={isHoverCardOpen} onOpenChange={handleOnOpenChange}>
      <HoverCardTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={handleClickLikeButton}
          fullWidth={true}
        >
          {activeReactionId ? (
            <Avatar className="cursor-pointer overflow-visible size-5">
              <AvatarImage src={REACTION_MAP[activeReactionId]} />
              <AvatarFallback>{activeReactionId}</AvatarFallback>
            </Avatar>
          ) : (
            <LikeIcon />
          )}
        </Button>
      </HoverCardTrigger>
      <form>
        <HoverCardContent
          align="start"
          side="top"
          className="flex flex-wrap gap-x-2 gap-y-3 justify-between items-center w-fit p-3 max-w-40 sm:max-w-80"
        >
          <TooltipProvider>
            {REACTION_LIST.map((id, index) => (
              <Tooltip key={id}>
                <TooltipTrigger asChild>
                  <label htmlFor={id}>
                    <input
                      type="radio"
                      name="reaction"
                      hidden
                      id={id}
                      onChange={handleReactReactionChange(id)}
                    />
                    <Avatar
                      className="transition-all ease-in-out duration-1000 scale-90 hover:scale-110 hover:rotate-12 cursor-pointer animate-pulse hover:animate-spin overflow-visible rounded-none size-7 sm:size-9"
                      style={{
                        animationDelay: `${index * 100}ms`, // Stagger delay for each avatar
                      }}
                    >
                      <AvatarImage src={REACTION_MAP[id]} />
                      <AvatarFallback>{id}</AvatarFallback>
                    </Avatar>
                  </label>
                </TooltipTrigger>
                <TooltipContent sideOffset={12}>
                  <p className="capitalize">{id}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </HoverCardContent>
      </form>
    </HoverCard>
  );
};

const ReactionTypeAvatarList = () => {
  return (
    <div className="flex items-center">
      {REACTION_LIST.map((id) => (
        <Avatar
          key={id}
          className="size-5 sm:size-6 -ml-1.5 sm:-ml-3 first:ml-0"
        >
          <AvatarImage
            src={REACTION_MAP[id]}
            alt=""
            className="select-none size-full object-contain"
          />
          <AvatarFallback>{id}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
};

export default CommunityInteraction;
