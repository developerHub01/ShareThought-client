"use client";

import React, { memo, useCallback, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format, startOfDay } from "date-fns";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearScheduledTime } from "@/redux/features/create-community-post/createCommunityPostSlice";

const timeList: Array<string> = [];

for (let timeType = 0; timeType <= 1; timeType++) {
  for (let hour = 12; hour > 0; hour--) {
    for (let minute = 0; minute < 60; minute += 15) {
      timeList.push(
        `${hour}:${minute < 10 ? "0" : ""}${minute} ${!timeType ? "AM" : "PM"}`
      );
    }
  }
}

const PostSchedule = memo(() => {
  const scheduledTime = useAppSelector(
    (state) => state.createCommunityPost.scheduledTime
  );
  const [date, setDate] = useState<Date>(() =>
    scheduledTime ? new Date(scheduledTime) : startOfDay(addDays(new Date(), 1))
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!scheduledTime) return;
    setDate(new Date(scheduledTime));
  }, [scheduledTime]);

  const handleCancel = useCallback(() => dispatch(clearScheduledTime()), []);

  if (!scheduledTime) return null;

  return (
    <>
      <Separator />
      <div className="flex flex-col gap-4 p-3 select-none">
        <p className="text-sm text-foreground/70">
          Choose a date and time to publish this post
        </p>
        <div className="flex flex-wrap gap-3 items-center">
          <SelectDate value={date} onSelect={setDate} />
          <SelectTime />
          <Button variant={"outline"} onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
});

interface SelectDateProps {
  value: Date;
  onSelect: (value: any) => void;
}

const SelectDate = memo(({ value, onSelect }: SelectDateProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"} className="w-[160px]">
          {value ? format(value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start" side="bottom">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onSelect}
          initialFocus
          fromDate={new Date()}
        />
      </PopoverContent>
    </Popover>
  );
});

interface SelectTimeProps {
  value?: string;
  onSelect?: (value: string) => void;
}

const SelectTime = memo(({}: SelectTimeProps) => {
  return (
    <Select>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Select Time" />
      </SelectTrigger>
      <SelectContent
        className="max-h-[200px] md:max-h-[250px]"
        side="top"
        align="center"
      >
        <SelectGroup>
          {timeList.map((time) => (
            <SelectItem key={time} value={time}>
              {time}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
});

export default PostSchedule;
