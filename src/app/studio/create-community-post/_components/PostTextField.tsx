"use client";

import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { changeText } from "@/redux/features/create-community-post/createCommunityPostSlice";
import { selectCommunityPostText } from "@/redux/features/create-community-post/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, {
  ChangeEvent,
  FocusEvent,
  memo,
  useEffect,
  useState,
} from "react";

const placeholderText = "Share an image to start a caption contest";

const PostTextField = memo(() => {
  const [text, setText] = useState<string>("");
  const dispatch = useAppDispatch();
  const postText = useAppSelector((state) => selectCommunityPostText(state));

  useEffect(() => {
    if (postText === text) return;
    setText(postText);
  }, [postText]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);

  const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    dispatch(changeText(e.target.value.trim()));
  };

  return (
    <AutosizeTextarea
      minHeight={40}
      value={text}
      onChange={handleChange}
      onBlur={handleBlur}
      className="w-full border-none focus-visible:ring-0 rounded-none resize-none text-sm"
      placeholder={placeholderText}
    />
  );
});

export default PostTextField;
