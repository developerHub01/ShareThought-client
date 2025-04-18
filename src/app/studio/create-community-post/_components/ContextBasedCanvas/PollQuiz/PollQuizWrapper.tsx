"use client";

import React, { Fragment, memo } from "react";
import {
  selectCommunityPostPollQuiz,
  selectCommunityPostType,
} from "@/redux/features/create-community-post/selectors";
import { useAppSelector } from "@/redux/hooks";
import TextPollOption from "@/app/studio/create-community-post/_components/ContextBasedCanvas/PollQuiz/TextPollOption";
import ImagePollOption from "@/app/studio/create-community-post/_components/ContextBasedCanvas/PollQuiz/ImagePollOption";
import QuizOption from "@/app/studio/create-community-post/_components/ContextBasedCanvas/PollQuiz/QuizOption";
import AddOptionButton from "@/app/studio/create-community-post/_components/ContextBasedCanvas/PollQuiz/AddOptionButton";

const PollQuizWrapper = memo(() => {
  const options = useAppSelector((state) => selectCommunityPostPollQuiz(state));
  const postType = useAppSelector((state) => selectCommunityPostType(state));
  console.log({ options });

  if (!["POLL", "POLL_WITH_IMAGE", "QUIZ"].includes(postType) || !options)
    return null;

  return (
    <div className="w-full flex flex-col gap-4 p-3">
      <div className="w-full flex flex-col gap-2.5">
        {options.map((option) => (
          <Fragment key={option.id}>
            {postType === "POLL" && <TextPollOption {...option} />}
            {postType === "POLL_WITH_IMAGE" && <ImagePollOption {...option} />}
            {postType === "QUIZ" && <QuizOption {...option} />}
          </Fragment>
        ))}
      </div>
      <AddOptionButton />
    </div>
  );
});

export default PollQuizWrapper;
