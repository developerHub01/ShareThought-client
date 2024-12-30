import { Textarea } from "@/components/Inputs/TextArea";
import React from "react";

const CreateChannelDescription = () => {
  return (
    <div className="p-4">
      <Textarea
        placeholder="Channel description"
        name="channelDescription"
        className="min-h-36 sm:min-h-52 max-h-[65vh]"
      />
    </div>
  );
};

export default CreateChannelDescription;
