import { Textarea } from "@/components/Inputs/Textarea";
import { setField } from "@/redux/features/create-channel/createChannelSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { ChangeEvent, useEffect, useState } from "react";

const CreateChannelDescription = () => {
  const [channelName, setChannelDescription] = useState("");
  const dispatch = useAppDispatch();
  const channelState = useAppSelector(
    (state) => state.createChannel.channelState
  );

  useEffect(() => {
    if (channelState.channelDescription)
      setChannelDescription(channelState.channelDescription);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setChannelDescription(e.target.value);
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
    <div className="p-4">
      <Textarea
        placeholder="Channel description"
        name="channelDescription"
        className="min-h-full h-[65vh] leading-relaxed"
        value={channelName}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default CreateChannelDescription;
