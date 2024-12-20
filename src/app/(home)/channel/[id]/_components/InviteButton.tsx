import React from "react";
import { Button } from "@/components/buttons/Button";
import { Share2 as ShareIcon } from "lucide-react";

const InviteButton = () => {
  return (
    <Button>
      <ShareIcon />
      Share
    </Button>
  );
};

export default InviteButton;
