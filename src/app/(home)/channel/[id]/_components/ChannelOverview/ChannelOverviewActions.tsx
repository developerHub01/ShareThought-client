import React from "react";
import FollowersList from "@/app/(home)/channel/[id]/_components/Followers/FollowersList";
import InviteButton from "@/app/(home)/channel/[id]/_components/InviteButton";
import ShareButton from "@/app/(home)/channel/[id]/_components/ShareButton";
import clsx from "clsx";

interface ChannelOverviewActionsProps {
  direction?: "left" | "center" | "right" | "between";
  smDirection?: "left" | "center" | "right";
}

const ChannelOverviewActions = ({
  direction = "between",
  smDirection,
}: ChannelOverviewActionsProps) => {
  return (
    <div
      className={clsx(
        "flex flex-wrap flex-col sm:flex-row gap-x-2 gap-y-3 p-4",
        {
          "justify-start": direction === "left",
          "justify-center": direction === "center",
          "justify-end": direction === "right",
          "justify-center sm:justify-between": direction === "between",

          "items-start":
            (direction === "left" && !smDirection) || smDirection === "left",
          "items-center":
            (direction === "center" && !smDirection) ||
            (direction === "between" && !smDirection) ||
            smDirection === "center",
          "items-end":
            (direction === "right" && !smDirection) || smDirection === "right",
        }
      )}
    >
      <FollowersList />
      <div className="flex gap-1">
        <InviteButton />
        <ShareButton />
      </div>
    </div>
  );
};

export default ChannelOverviewActions;
