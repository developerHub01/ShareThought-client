import React from "react";
import { Button } from "@/components/buttons/Button";
import { Plus as AddIcon } from "lucide-react";

const ShareButton = () => {
  return (
    <Button>
      <AddIcon /> Invite
    </Button>
  );
};

export default ShareButton;
