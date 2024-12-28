import FollowingChannelCardCTA from "@/components/actions/FollowingChannelCardCTA";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FollowingChannelCard = () => {
  const imgUrl =
    "https://images.unsplash.com/photo-1730660666237-1e6a008067a9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="shadow-xl w-full border border-accent rounded-sm overflow-hidden flex flex-col sm:flex-row items-start sm:items-center p-3 gap-3">
      <Link
        href={"/"}
        className="aspect-square rounded-full size-full max-w-24 max-h-24 sm:max-w-32 sm:max-h-32 overflow-hidden flex-shrink-0"
      >
        <Image
          src={imgUrl}
          width={300}
          height={300}
          alt=""
          className="size-full object-cover select-none"
        />
      </Link>
      <div className="flex flex-col justify-between gap-2 w-full max-w-xl mr-auto">
        <Link href={"/"}>
          <h3 className="font-medium text-lg line-clamp-2 overflow-hidden text-ellipsis">
            Developer Hub BD
          </h3>
        </Link>
        <div className="flex justify-start items-center gap-1 text-gray-500 text-xs flex-wrap select-none">
          <span>10K followers</span>
        </div>
        <p className="text-primary/80 text-xs text-gray-500 line-clamp-2 overflow-hidden text-ellipsis leading-relaxed">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis
          repellendus iure necessitatibus temporibus rem unde quae corporis
          assumenda eligendi accusamus asperiores ratione velit, eius explicabo
          est numquam vitae sed reiciendis suscipit itaque culpa magnam eaque
          veniam. Nulla in neque laborum doloribus nam! Nam dolores et tenetur,
          aliquam laborum ipsum dolorem.
        </p>
        <FollowingChannelCardCTA id={"1"} />
      </div>
    </div>
  );
};

export default FollowingChannelCard;
