"use client";

import React, { memo } from "react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { ClockIcon } from "@/lib/icons";

const PostSubmitAction = memo(() => {
  return (
    <div className="ml-auto flex items-center">
      <ButtonGroup size="sm">
        <Button>Post</Button>
        <Button>
          <ClockIcon size={18} /> Schedule
        </Button>
      </ButtonGroup>
    </div>
  );
});

export default PostSubmitAction;
