import { Textarea } from "@/components/Inputs/Textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { setField } from "@/redux/features/create-channel/createChannelSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";

const CreateChannelDescription = () => {
  const [channelName, setChannelDescription] = useState("");
  const dispatch = useAppDispatch();
  const channelState = useAppSelector(
    (state) => state.createChannel.channelState
  );
  const isSyncing = useRef(false);

  useEffect(() => {
    if (channelState.channelDescription)
      setChannelDescription(channelState.channelDescription);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setChannelDescription(e.target.value);

    if (!isSyncing.current) {
      isSyncing.current = true;

      setTimeout(() => {
        dispatch(
          setField({
            key: "channelDescription",
            value: e.target.value,
          })
        );
        isSyncing.current = false;
      }, 300);
    }
  };
  const handleBlur = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(
      setField({
        key: "channelDescription",
        value: e.target.value,
      })
    );
  };
  return (
    <ScrollArea className="w-full h-full">
      <div className="w-full p-4">
        <Textarea
          placeholder="Channel description"
          name="channelDescription"
          className="min-h-full h-[65vh] leading-relaxed"
          value={channelName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
    </ScrollArea>
  );
};

export default CreateChannelDescription;
