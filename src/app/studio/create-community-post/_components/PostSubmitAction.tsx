"use client";

import React, { memo, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ClockIcon } from "@/lib/icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  cancelPost,
  resetScheduledTime,
} from "@/redux/features/create-community-post/createCommunityPostSlice";
import {
  selectCommunityPostHaveContent,
  selectCommunityPostScheduleTime,
} from "@/redux/features/create-community-post/selectors";
import { isScheduledTimePast } from "@/utils";

const PostSubmitAction = memo(() => {
  const dispatch = useAppDispatch();
  const haveChanged = useAppSelector((state) =>
    selectCommunityPostHaveContent(state)
  );
  const scheduledTime = useAppSelector((state) =>
    selectCommunityPostScheduleTime(state)
  );

  /* 
  checking is there any scheduling error or not
  like any past date selected
  */
  const isScheduleError = useMemo(() => {
    if (!scheduledTime) return false;

    return isScheduledTimePast(scheduledTime);
  }, [scheduledTime]);

  const handleCancel = useCallback(() => dispatch(cancelPost()), []);

  /* setting a default scheduling date to enable scheduling mode */
  const handleSchedulePost = useCallback(() => {
    dispatch(resetScheduledTime());
  }, []);

  return (
    <div className="ml-auto flex items-center gap-2 px-3 pb-2">
      {haveChanged && (
        <Button size={"sm"} variant={"ghost"} onClick={handleCancel}>
          Cancel
        </Button>
      )}

      {/* if there is no error related to scheduling */}
      <Button size="sm" disabled={!haveChanged || isScheduleError}>
        {scheduledTime ? "Schedule" : "Post"}
      </Button>

      {/* This is the scheduling mode activator. Mainly trigger the a default scheduling date time */}
      {!scheduledTime && (
        <Button onClick={handleSchedulePost} size="sm" disabled={!haveChanged}>
          <ClockIcon size={16} /> Schedule Post
        </Button>
      )}
    </div>
  );
});

export default PostSubmitAction;
