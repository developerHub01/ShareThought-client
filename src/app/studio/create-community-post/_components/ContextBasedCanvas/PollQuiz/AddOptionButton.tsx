"use client";

import React, { memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { addPollQuizOption } from "@/redux/features/create-community-post/createCommunityPostSlice";
import { useAppDispatch } from "@/redux/hooks";

const AddOptionButton = memo(() => {
  const dispatch = useAppDispatch();

  const handleClick = useCallback(() => dispatch(addPollQuizOption()), []);

  return (
    <Button variant={"outline"} onClick={handleClick} className="ml-auto">
      Add another option
    </Button>
  );
});

export default AddOptionButton;
