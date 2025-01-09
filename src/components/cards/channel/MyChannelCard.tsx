import FollowedChannelCardCTA from "@/components/actions/FollowingChannelCardCTA";
import { Button } from "@/components/ui/button";
import { CornerDownRight as EnterIcon, Eye as ViewIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MyChannelCard = () => {
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
        <div className="flex justify-center items-center gap-x-1 gap-y-2 flex-wrap">
          <Link href="/">
            <Button size={"sm"} variant={"outline"}>
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

export default MyChannelCard;
