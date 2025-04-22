"use client";

import { Textarea } from "@/components/ui/textarea";
import { InsetDiv } from "@/components/InsetDiv";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CREATE_CHANNEL_SIZE } from "@/constant";
import {
  setField,
  TCreateChannelField,
} from "@/redux/features/create-channel/createChannelSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import SizeLimit from "@/app/(home)/channels/my/_components/CreateChannel/SizeLimit";

const CreateChannelDescription = () => {
  const [channelDescription, setChannelDescription] = useState("");
  const dispatch = useAppDispatch();
  const channelState = useAppSelector(
    (state) => state.createChannel.channelState
  );
  const isSyncing = useRef<boolean>(false);
  let syncingTimeoutId: ReturnType<typeof setTimeout>;

  useEffect(() => {
    if (channelState.channelDescription)
      setChannelDescription(channelState.channelDescription);
  }, []);

  const updateChannelName = (key: TCreateChannelField, value: string) =>
    dispatch(
      setField({
        key,
        value,
      })
    );

  const resizedValue = (value: string) =>
    value
      ?.trimStart()
      .substring(0, CREATE_CHANNEL_SIZE.CHANNEL_DESCRIPTION_MAX_LENGTH);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setChannelDescription(resizedValue(e.target.value));

    if (!isSyncing.current) {
      isSyncing.current = true;
      clearTimeout(syncingTimeoutId);

      syncingTimeoutId = setTimeout(() => {
        updateChannelName("channelDescription", channelDescription);
        isSyncing.current = false;
      }, 300);
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateChannelName("channelDescription", resizedValue(e.target.value));
  };

  return (
    <ScrollArea className="w-full h-full">
      <div className="w-full p-5">
        <InsetDiv className="flex flex-col gap-2 min-h-full h-[65vh]">
          <Textarea
            placeholder="Channel description"
            name="channelDescription"
            className="leading-relaxed w-full h-full border-none outline-none focus-visible:ring-0 p-0 resize-none rounded-none bg-transparent text-sm sm:text-base"
            value={channelDescription}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <SizeLimit
            size={channelDescription.length}
            limit={CREATE_CHANNEL_SIZE.CHANNEL_DESCRIPTION_MAX_LENGTH}
          />
        </InsetDiv>
      </div>
    </ScrollArea>
  );
};

export default CreateChannelDescription;
