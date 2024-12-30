"use client";

import { Input } from "@/components/Inputs/Input";
import React from "react";

const CreateChannelName = () => {
  return (
    <div className="p-4">
      <Input type="text" placeholder="Channel Name" name="channelName" />
    </div>
  );
};

export default CreateChannelName;
