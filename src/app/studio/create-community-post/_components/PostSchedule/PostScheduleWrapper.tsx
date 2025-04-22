"use client";

import React, { memo } from "react";
import { selectCommunityPostScheduleTime } from "@/redux/features/create-community-post/selectors";
import { useAppSelector } from "@/redux/hooks";
import PostSchedule from "@/app/studio/create-community-post/_components/PostSchedule/PostSchedule";

const PostScheduleWrapper = memo(() => {
  const scheduledTime = useAppSelector((state) =>
    selectCommunityPostScheduleTime(state)
  );

  console.log({ scheduledTime });

  if (!scheduledTime) return null;

  return <PostSchedule scheduledTime={scheduledTime} />;
});

export default PostScheduleWrapper;
