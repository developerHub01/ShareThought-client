"use client";

import { Button } from "@/components/ui/button";
import { addPollOption } from "@/redux/features/create-community-post/createCommunityPostSlice";
import { useAppDispatch } from "@/redux/hooks";
import React, { memo, useCallback } from "react";

const AddOptionButton = memo(() => {
  const dispatch = useAppDispatch();

  const handleClick = useCallback(() => dispatch(addPollOption()), []);

  return (
    <Button variant={"outline"} onClick={handleClick} className="ml-auto">
      Add another option
    </Button>
  );
});

export default AddOptionButton;
