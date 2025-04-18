"use client";

import { Button } from "@/components/ui/button";
import { convertNumberToWords } from "@/utils";
import { useState } from "react";
import { CheckIcon } from "@/lib/icons";
import Image from "next/image";
import { cn } from "@/lib/utils";

// const postPollDetails = {
//   options: [
//     {
//       text: "JavaScript",
//       totalUsers: 5,
//       successRate: 50.0,
//     },
//     {
//       text: "Python",
//       totalUsers: 3,
//       successRate: 30.0,
//     },
//     {
//       text: "C++",
//       totalUsers: 2,
//       successRate: 20.0,
//     },
//   ],
// };

const postPollDetails = {
  options: [
    {
      text: "Logo A",
      image:
        "https://images.unsplash.com/photo-1731000892655-5a0d52e8a43c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      totalUsers: 7,
      successRate: 70.0,
    },
    {
      text: "Logo B",
      image:
        "https://images.unsplash.com/photo-1731000892655-5a0d52e8a43c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      totalUsers: 3,
      successRate: 30.0,
    },
  ],
};

const totalResponse = 10;

const CommunityPostPoll = () => {
  const [mySelection, setMySelection] = useState<number | null>(null);

  const totalVotes = convertNumberToWords(totalResponse);

  const { options } = postPollDetails;

  /* check that is there any option selected */
  const isSelected = mySelection !== null;

  const handleSelectOption = (index: number) => () => {
    /* if selected option is already selected then unselect it */
    if (mySelection === index) return setMySelection(null);

    return setMySelection(index);
  };

  return (
    <div className="flex flex-col gap-3.5">
      <p className="text-sm text-gray-500">{totalVotes} votes</p>
      <div className="flex flex-col gap-3 select-none">
        {options.map(({ text, successRate, image }, id) => {
          /* round the successRate to show */
          successRate = Math.round(successRate);

          /* check current option is selected or not */
          const isCurrentOptionSelected = mySelection === id;

          return (
            <div
              key={id}
              className="w-full flex gap-2.5 justify-between items-center cursor-pointer"
              onClick={handleSelectOption(id)}
            >
              {image !== undefined && image !== null && (
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="rounded-full size-6"
                >
                  {isCurrentOptionSelected ? (
                    <span className="border border-primary text-primary aspect-square rounded-full flex-shrink-0 size-6 grid place-items-center">
                      <CheckIcon size={16} strokeWidth={3} />
                    </span>
                  ) : (
                    <span className="size-3 rounded-full border border-green-primary"></span>
                  )}
                </Button>
              )}
              <div
                className={cn(
                  "relative w-full p-1.5 rounded-sm border flex items-center gap-1",
                  {
                    "border border-primary": isCurrentOptionSelected,
                  }
                )}
              >
                {image && (
                  <div className="aspect-square size-20 overflow-hidden flex-shrink-0">
                    <Image
                      src={image}
                      alt="Photo by Drew Beamer"
                      width={100}
                      height={100}
                      className="h-full w-full rounded-sm object-cover"
                    />
                  </div>
                )}
                <div className="w-full flex justify-between items-center gap-1 px-2">
                  {isSelected && (
                    <span
                      className="absolute left-0 top-0 h-full bg-primary/5"
                      style={{
                        width: `${successRate}%`,
                      }}
                    ></span>
                  )}
                  <p className="flex-1 text-sm">{text}</p>
                  {isSelected && (
                    <span className="text-sm text-gray-500">
                      {successRate}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommunityPostPoll;
