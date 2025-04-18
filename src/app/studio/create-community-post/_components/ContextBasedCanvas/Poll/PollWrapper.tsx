"use client";

import React, { Fragment, memo } from "react";
import {
  selectCommunityPostPoll,
  selectCommunityPostType,
} from "@/redux/features/create-community-post/selectors";
import { useAppSelector } from "@/redux/hooks";
import TextPollOption from "@/app/studio/create-community-post/_components/ContextBasedCanvas/Poll/TextPollOption";
import ImagePollOption from "@/app/studio/create-community-post/_components/ContextBasedCanvas/Poll/ImagePollOption";
import AddOptionButton from "@/app/studio/create-community-post/_components/ContextBasedCanvas/Poll/AddOptionButton";

const PollWrapper = memo(() => {
  const options = useAppSelector((state) => selectCommunityPostPoll(state));
  const postType = useAppSelector((state) => selectCommunityPostType(state));

  if (!["POLL", "POLL_WITH_IMAGE"].includes(postType) || !options) return null;

  return (
    <div className="w-full flex flex-col gap-3 p-3">
      <div className="w-full flex flex-col gap-2.5">
        {options.map((option) => (
          <Fragment key={option.id}>
            {postType === "POLL" ? (
              <TextPollOption {...option} />
            ) : (
              <ImagePollOption {...option} />
            )}
          </Fragment>
        ))}
      </div>
      <AddOptionButton />
    </div>
  );
});

export default PollWrapper;
