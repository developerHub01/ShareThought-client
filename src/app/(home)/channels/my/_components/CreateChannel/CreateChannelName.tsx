"use client";

import { Input } from "@/components/Inputs/Input";
import { setField } from "@/redux/features/create-channel/createChannelSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { ChangeEvent, useEffect, useState } from "react";

const CreateChannelName = () => {
  const [channelName, setChannelName] = useState("");
  const dispatch = useAppDispatch();
  const channelState = useAppSelector((state) => state.createChannel.channelState);

  useEffect(() => {
    if (channelState.channelName) setChannelName(channelState.channelName);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChannelName(e.target.value);
     dispatch(
       setField({
         key: "channelName",
         value: e.target.value,
       })
     );
  };

  return (
    <div className="p-4">
      <Input
        type="text"
        placeholder="Channel Name"
        name="channelName"
        value={channelName}
        onChange={handleChange}
      />
    </div>
  );
};

export default CreateChannelName;
