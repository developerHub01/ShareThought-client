import React from "react";
import { Button } from "@/components/buttons/Button";
import { ShareIcon } from "@/lib/icons";

const InviteButton = () => {
  return (
    <Button>
      <ShareIcon />
      Share
    </Button>
  );
};

export default InviteButton;
