import ChannelPostCard from "@/components/cards/post/ChannelPostCard";
import { Button } from "@/components/ui/button";
import { convertNumberToWords } from "@/utils";
import React from "react";

const countData = [
  {
    label: "reactions",
    id: "reactions",
    count: 1001,
  },
  {
    label: "comments",
    id: "comments",
    count: 50,
  },
];

const LatestPost = () => {
  return (
    <div className="border rounded-sm p-5 flex flex-col gap-5 shadow-lg">
      <h4 className="text-lg font-semibold">Latest post</h4>
      <ChannelPostCard showThreeDot={false} />
      <div className="w-full flex items-center justify-between gap-3 p-1">
        {countData.map(({ id, label, count }) => {
          const contextCount = convertNumberToWords(count);

          return (
            <div key={id} className="flex flex-col justify-start gap-1">
              <p className="text-sm font-bold capitalize line-clamp-1 overflow-hidden text-ellipsis">
                {label}
              </p>
              <p className="text-lg font-medium line-clamp-1 overflow-hidden text-ellipsis">
                {contextCount}
              </p>
            </div>
          );
        })}
      </div>
      <div>
        <Button
          className="rounded-sm self-start px-5"
          size="sm"
          variant="outline"
        >
          Go to post tab
        </Button>
      </div>
    </div>
  );
};

export default LatestPost;
