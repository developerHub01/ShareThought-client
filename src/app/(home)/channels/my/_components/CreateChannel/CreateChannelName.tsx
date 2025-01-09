"use client";

import { InsetDiv } from "@/components/InsetDiv";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CREATE_CHANNEL_SIZE } from "@/constant";
import useModifyQueryParams from "@/hooks/use-modify-query-params";
import {
  setField,
  TCreateChannelField,
} from "@/redux/features/create-channel/createChannelSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import SizeLimit from "@/app/(home)/channels/my/_components/CreateChannel/SizeLimit";

const CreateChannelName = () => {
  const [channelName, setChannelName] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { buildFullPath, modifyParams } = useModifyQueryParams();
  const channelState = useAppSelector(
    (state) => state.createChannel.channelState
  );
  const isSyncing = useRef(false);

  useEffect(() => {
    if (channelState.channelName) setChannelName(channelState.channelName);
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
      .trimStart()
      ?.substring(0, CREATE_CHANNEL_SIZE.CHANNEL_NAME_MAX_LENGTH);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChannelName(resizedValue(e.target?.value));

    if (!isSyncing.current) {
      isSyncing.current = true;

      setTimeout(() => {
        updateChannelName("channelName", channelName);
        isSyncing.current = false;
      }, 300);
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    updateChannelName("channelName", resizedValue(e.target?.value));
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (channelName && e.key === "Enter") {
      updateChannelName("channelName", channelName);

      return router.push(buildFullPath(modifyParams("set", "create", "2")));
    }
  };

  return (
    <ScrollArea className="w-full h-full">
      <div className="w-full p-4 h-full">
        <InsetDiv className="w-full flex flex-col sm:flex-row gap-x-1 gap-y-2">
          <input
            type="text"
            placeholder="Channel Name"
            name="channelName"
            className="w-full border-none outline-none focus-visible:ring-0 p-0 resize-none rounded-none bg-transparent text-sm sm:text-base"
            value={channelName}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyUp={handleKey}
          />
          <SizeLimit
            size={channelName.length}
            limit={CREATE_CHANNEL_SIZE.CHANNEL_NAME_MAX_LENGTH}
          />
        </InsetDiv>
      </div>
    </ScrollArea>
  );
};

export default CreateChannelName;
