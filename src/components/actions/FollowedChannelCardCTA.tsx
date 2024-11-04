"use client";

import { Button } from "../ui/button";

const FollowedChannelCardCTA = ({ id }: { id: string }) => {
  const handleUnfollow = ()=>{
    console.log(`Unfollow channel id = ${id}`);
  }
  return <Button onClick={handleUnfollow} className="rounded-sm" size={"sm"}>Unfollow</Button>;
};

export default FollowedChannelCardCTA;
