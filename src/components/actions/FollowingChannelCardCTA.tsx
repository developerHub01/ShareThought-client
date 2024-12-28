"use client";

import { Button } from "../ui/button";

const FollowingChannelCardCTA = ({ id }: { id: string }) => {
  const handleUnfollow = () => {
    console.log(`Unfollow channel id = ${id}`);
  };
  return (
    <Button onClick={handleUnfollow} className="rounded-sm w-min" size={"sm"}>
      Unfollow
    </Button>
  );
};

export default FollowingChannelCardCTA;
