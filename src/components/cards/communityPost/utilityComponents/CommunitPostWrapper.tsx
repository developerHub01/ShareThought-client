import PostCardCTA from "@/components/actions/PostCardCTA";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import React from "react";

const imgUrl =
  "https://images.unsplash.com/photo-1730217804424-825f12eef36f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

 const CommunitPostWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full max-w-3xl p-3 rounded-sm border border-primary/10 flex flex-col gap-4 shadow-md">
      <div className="flex justify-between items-center gap-3">
        <ChannelDetails />
        <PostCardCTA
          postType="My_COMMUNITY_POST_CARD"
          position={{
            side: "bottom",
            align: "end",
          }}
        />
      </div>
      <div className="w-full flex flex-col gap-2">{children}</div>
    </div>
  );
};

const ChannelDetails = () => {
  return (
    <div className="w-full flex gap-4">
      <Link href={"/"} className="flex-shrink-0">
        <Avatar className="size-10">
          <AvatarImage src={imgUrl} alt="" className="select-none" />
          <AvatarFallback>DH</AvatarFallback>
        </Avatar>
      </Link>
      <div className="flex flex-col gap-0.5">
        <Link href={"/"} className="font-medium">
          Developer Hub
        </Link>
        <Link href={"/"} className="text-xs text-gray-500">
          6 days ago
        </Link>
      </div>
    </div>
  );
};

export default CommunitPostWrapper;
