"use client";

import { Input } from "@/components/Inputs/Input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { setField } from "@/redux/features/create-channel/createChannelSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";

const CreateChannelName = () => {
  const [channelName, setChannelName] = useState("");
  const dispatch = useAppDispatch();
  const channelState = useAppSelector(
    (state) => state.createChannel.channelState
  );
  const isSyncing = useRef(false);

  useEffect(() => {
    if (channelState.channelName) setChannelName(channelState.channelName);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChannelName(e.target.value);
    if(!isSyncing.current){
     isSyncing.current = true
     
     setTimeout(()=>{
        dispatch(
          setField({
            key: "channelName",
            value: e.target.value,
          })
        );
       isSyncing.current = false
     }, 300)
    }
  };
  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setField({
        key: "channelName",
        value: e.target.value,
      })
    );
  };

  return (
    <ScrollArea className="w-full h-full">
      <div className="w-full p-4">
        <Input
          type="text"
          placeholder="Channel Name"
          name="channelName"
          value={channelName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
    </ScrollArea>
  );
};

export default CreateChannelName;
