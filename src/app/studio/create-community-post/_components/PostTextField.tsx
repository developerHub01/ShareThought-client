"use client";

import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { changeText } from "@/redux/features/create-community-post/createCommunityPostSlice";
import { selectCommunityPostText } from "@/redux/features/create-community-post/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, {
  ChangeEvent,
  FocusEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const placeholderText = "Share an image to start a caption contest";

const PostTextField = memo(() => {
  const [text, setText] = useState<string>("");
  const dispatch = useAppDispatch();
  const postText = useAppSelector((state) => selectCommunityPostText(state));
  const isSyncing = useRef<boolean>(false);
  let syncingTimeoutId: ReturnType<typeof setTimeout>;

  useEffect(() => {
    if (postText === text) return;
    setText(postText);
  }, [postText]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
      if (!isSyncing.current) {
        isSyncing.current = true;

        clearTimeout(syncingTimeoutId);
        syncingTimeoutId = setTimeout(() => {
          dispatch(
            changeText({
              text,
            })
          );

          isSyncing.current = false;
        }, 300);
      }
    },
    [text]
  );

  const handleBlur = useCallback((e: FocusEvent<HTMLTextAreaElement>) => {
    dispatch(
      changeText({
        text: e.target.value.trim(),
      })
    );
  }, []);

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
