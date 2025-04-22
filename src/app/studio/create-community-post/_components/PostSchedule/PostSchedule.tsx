"use client";

import React, { memo, useCallback, useMemo } from "react";
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
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks";
import {
  clearScheduledTime,
  getDefaultScheduleDateTime,
  resetScheduledTime,
  setScheduledDate,
  setScheduledTime,
} from "@/redux/features/create-community-post/createCommunityPostSlice";
import { getTimeList, isScheduledTimePast } from "@/utils";
import { cn } from "@/lib/utils";

const timeList: Array<string> = getTimeList();

interface PostScheduleProps {
  scheduledTime: string;
}
const PostSchedule = memo(({ scheduledTime }: PostScheduleProps) => {
  const dispatch = useAppDispatch();

  const haveDateTimeChange = useMemo(
    () => scheduledTime !== getDefaultScheduleDateTime(),
    [scheduledTime]
  );

  const date = useMemo(
    () => format(scheduledTime, "yyyy-MM-dd"),
    [scheduledTime]
  );
  const time = useMemo(() => format(scheduledTime, "hh:mm a"), [scheduledTime]);
  const isError = useMemo(() => isScheduledTimePast(date, time), [date, time]);

  const handleCancel = useCallback(() => dispatch(clearScheduledTime()), []);

  const handleReset = useCallback(() => dispatch(resetScheduledTime()), []);

  const handleChangeDate = useCallback((date: string) => {
    dispatch(setScheduledDate(format(date, "yyyy-MM-dd")));
  }, []);

  const handleChangeTime = useCallback((time: string) => {
    dispatch(setScheduledTime(time));
  }, []);

  return (
    <>
      <div className="px-3">
        <Separator />
      </div>
      <div className="flex flex-col gap-6 p-3 select-none">
        <p className="text-sm text-foreground/70">
          Choose a date and time to publish this post
        </p>
        <div className="flex flex-wrap gap-5 items-center pb-2">
          <SelectDate
            value={date}
            onSelect={handleChangeDate}
            isError={isError}
          />
          <SelectTime
            value={time}
            defaultValue={time}
            onValueChange={handleChangeTime}
            isError={isError}
          />
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <Button
            size={"sm"}
            variant={haveDateTimeChange ? "ghost" : "outline"}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          {haveDateTimeChange && (
            <Button size={"sm"} variant={"outline"} onClick={handleReset}>
              Reset Schedule Time
            </Button>
          )}
        </div>
      </div>
    </>
  );
});

interface SelectDateProps {
  value: string;
  onSelect: (value: any) => void;
  isError?: boolean;
}

const SelectDate = memo(
  ({ value, onSelect, isError = false }: SelectDateProps) => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn("w-[160px] ring-2 opacity-80 ring-offset-2", {
              "ring-red-500": isError,
              "ring-transparent": !isError,
            })}
          >
            {value ? format(value, "MMM dd, yyyy") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start" side="bottom">
          <Calendar
            mode="single"
            selected={new Date(value)}
            onSelect={onSelect}
            initialFocus
            fromDate={new Date()}
          />
        </PopoverContent>
      </Popover>
    );
  }
);

interface SelectTimeProps {
  value: string;
  defaultValue?: string;
  onValueChange: (time: string) => void;
  isError?: boolean;
}

const SelectTime = memo(
  ({
    value,
    defaultValue,
    onValueChange,
    isError = false,
  }: SelectTimeProps) => {
    console.log({ defaultValue });
    return (
      <Select
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
      >
        <SelectTrigger
          className={cn("w-[150px] ring-2 opacity-80 ring-offset-2", {
            "ring-red-500": isError,
            "ring-transparent": !isError,
          })}
        >
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
  }
);

export default PostSchedule;
