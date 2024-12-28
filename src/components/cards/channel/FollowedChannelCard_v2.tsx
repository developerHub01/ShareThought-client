import FollowedChannelCardCTA from "@/components/actions/FollowedChannelCardCTA";
import { Button } from "@/components/ui/button";
import { CornerDownRight as EnterIcon, Eye as ViewIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FollowedChannelCard_v2 = () => {
  const imgUrl =
    "https://images.unsplash.com/photo-1730660666237-1e6a008067a9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const bannerUrl =
    "https://images.unsplash.com/photo-1731432245362-26f9c0f1ba2f?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="shadow-xl w-full border border-accent rounded-sm overflow-hidden">
      <Link href={"/"} className="block w-full aspect-banner overflow-hidden">
        <Image
          src={bannerUrl}
          alt="channel banner"
          width={500}
          height={300}
          className="w-full h-full object-cover"
        />
      </Link>
      <div className="p-3 pt-0 flex flex-col gap-1 justify-center items-center text-center">
        <Link
          href={"/"}
          className="size-20 rounded-full overflow-hidden ring-4 ring-white -mt-10 mb-2"
        >
          <Image
            src={imgUrl}
            alt="channel banner"
            width={250}
            height={250}
            className="size-full object-cover"
          />
        </Link>
        <Link href={"/"}>
          <h3 className="font-medium text-lg line-clamp-2 overflow-hidden text-ellipsis mb-1.5">
            Developer Hub BD
          </h3>
        </Link>
        <div className="flex justify-start items-center gap-1 text-gray-500 text-xs flex-wrap select-none">
          <span>10K followers</span>
        </div>
        <p className="text-primary/80 text-xs text-gray-500 line-clamp-2 overflow-hidden text-ellipsis leading-relaxed mb-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex totam
          illum accusamus? Expedita facere voluptates alias vitae fuga mollitia,
          nemo veritatis officia qui, laudantium amet voluptatem illum tempora
          iusto iure?
        </p>
        <div className="flex justify-center items-center gap-1 flex-wrap">
          <Link href="/">
            <Button size={"sm"}>
              <ViewIcon size={18} />
              View Channel
            </Button>
          </Link>
          <Button size={"sm"}>
            <EnterIcon size={18} /> Switch Channel
          </Button>
        </div>
      </div>
    </div>
  );
};

/* const a = () => {
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
          <h3 className="font-medium text-lg line-clamp-2 overflow-hidden text-ellipsis pb-1">
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
        <FollowedChannelCardCTA id={"1"} />
      </div>
    </div>
  );
};
 */

export default FollowedChannelCard_v2;
