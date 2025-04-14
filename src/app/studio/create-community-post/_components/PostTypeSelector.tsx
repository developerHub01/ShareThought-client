"use client";

import React, { memo } from "react";
import {
  ImageIcon,
  CheckCircleIcon,
  PollIcon,
  TextFileIcon as PostShareIcon,
  LucideIcon,
} from "@/lib/icons";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppDispatch } from "@/redux/hooks";
import { changePostType } from "@/redux/features/create-community-post/createCommunityPostSlice";
import { TCommunityPostType } from "@/types";

const typeList: Array<{
  id: TCommunityPostType;
  label: string;
  Icon: LucideIcon;
}> = [
  {
    id: "IMAGE",
    label: "Image",
    Icon: ImageIcon,
  },
  {
    id: "POLL",
    label: "Text poll",
    Icon: PollIcon,
  },
  {
    id: "POLL_WITH_IMAGE",
    label: "Image poll",
    Icon: PollIcon,
  },
  {
    id: "QUIZ",
    label: "Quiz",
    Icon: CheckCircleIcon,
  },
  {
    id: "POST_SHARE",
    label: "Share Post",
    Icon: PostShareIcon,
  },
];

const PostTypeSelector = memo(() => {
  const dispatch = useAppDispatch();

  const handleTypeChange = (type: TCommunityPostType) => {
    dispatch(
      changePostType({
        type,
      })
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      <TooltipProvider>
        {typeList.map(({ id, label, Icon }) => (
          <Tooltip key={id}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size={"sm"}
                onClick={() => handleTypeChange(id)}
              >
                <Icon size={18} /> {label}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="normal-case">Add an {label.toLowerCase()}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
});

export default PostTypeSelector;
