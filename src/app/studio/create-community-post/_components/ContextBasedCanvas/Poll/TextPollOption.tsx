"use client";

import React, {
  ChangeEvent,
  FocusEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CloseIcon } from "@/lib/icons";
import {
  changePollOption,
  deletePollOption,
} from "@/redux/features/create-community-post/createCommunityPostSlice";
import { useAppDispatch } from "@/redux/hooks";
import OptionLimit from "@/app/studio/create-community-post/_components/ContextBasedCanvas/Poll/OptionLimit";

interface TextPollOptionProp {
  id: string;
  text: string;
}

const TextPollOption = memo(({ id, text }: TextPollOptionProp) => {
  const [optionText, setOptionText] = useState<string>(text);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (optionText === text) return;

    setOptionText(text);
  }, [text]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setOptionText(e.target.value),
    []
  );

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) =>
      changePollOption({
        id,
        text: e.target.value,
      }),
    []
  );

  const handleDelete = useCallback(
    () =>
      dispatch(
        deletePollOption({
          id,
        })
      ),
    []
  );

  return (
    <div className="w-full flex gap-1 items-center">
      <Button
        variant={"ghost"}
        size={"smIcon"}
        className="rounded-full flex-shrink-0"
        onClick={handleDelete}
      >
        <CloseIcon size={16} />
      </Button>
      <div className="w-full flex gap-1 items-center border-b">
        <Input
          value={optionText}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full border-none"
        />
        <OptionLimit value={optionText.length ?? 0} limit={65} />
      </div>
    </div>
  );
});

export default TextPollOption;
