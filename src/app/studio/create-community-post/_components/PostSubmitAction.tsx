"use client";

import React, { memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { ClockIcon } from "@/lib/icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  cancelPost,
  setScheduledTime,
} from "@/redux/features/create-community-post/createCommunityPostSlice";
import { selectCommunityPostHaveContent } from "@/redux/features/create-community-post/selectors";

const PostSubmitAction = memo(() => {
  const dispatch = useAppDispatch();
  const haveChanged = useAppSelector((state) =>
    selectCommunityPostHaveContent(state)
  );
  const handleCancel = useCallback(() => dispatch(cancelPost()), []);

  const handleSchedule = useCallback(() => dispatch(setScheduledTime()), []);

  return (
    <div className="ml-auto flex items-center gap-3">
      {haveChanged && (
        <Button variant={"ghost"} onClick={handleCancel}>
          Cancel
        </Button>
      )}
      <ButtonGroup size="sm" disabled={!haveChanged}>
        <Button>Post</Button>
        <Button onClick={handleSchedule}>
          <ClockIcon size={16} /> Schedule
        </Button>
      </ButtonGroup>
    </div>
  );
});

export default PostSubmitAction;
