import { Button } from "@/components/buttons/Button";
import DotIcon from "@/components/icons/DotIcon";
import Image from "next/image";
import React from "react";
import AboutPopOver from "@/app/(home)/channel/[id]/_components/AboutPopOver";
import ChannelOverviewActions from "@/app/(home)/channel/[id]/_components/ChannelOverview/ChannelOverviewActions";
import ChannelBanner from "@/app/(home)/channel/[id]/_components/ChannelOverview/ChannelBanner";
import clsx from "clsx";

interface ChannelOverview_v3Props {
  direction?: "left" | "center" | "right";
}

const ChannelOverview_v3 = ({
  direction = "left",
}: ChannelOverview_v3Props) => {
  const banner =
    "https://images.unsplash.com/photo-1734197294272-71acf8e2ae79?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <section className="w-full shadow-lg rounded-md overflow-hidden">
      <ChannelBanner />
      <section
        className={clsx("w-full p-4 flex flex-col gap-5 px-5", {
          "items-start text-left": direction === "left",
          "items-center text-center": direction === "center",
          "items-end text-right": direction === "right",
        })}
      >
        <div className="size-full aspect-square rounded-full overflow-hidden max-w-32 sm:max-w-48 -mt-[64px] sm:-mt-[96px] ring ring-white">
          <Image
            src={banner}
            width={400}
            height={400}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className={clsx("w-full flex flex-col gap-2 max-w-2xl", {
            "justify-start text-left": direction === "left",
            "justify-center text-center": direction === "center",
            "justify-end text-right": direction === "right",
          })}
        >
          <h1 className="text-3xl font-bold pb-1">Dave Gray</h1>
          <div
            className={clsx(
              "flex flex-wrap gap-2 text-sm text-gray-500 items-center",
              {
                "justify-start text-left": direction === "left",
                "justify-center text-center": direction === "center",
                "justify-end text-right": direction === "right",
              }
            )}
          >
            <span>361K Followers</span>
            <DotIcon />
            <span>30 Posts</span>
          </div>
          <p className="text-ellipsis line-clamp-2 text-sm text-accent-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat,
            deserunt, aperiam praesentium, totam distinctio minima cupiditate
            quaerat quos laudantium ea eius suscipit animi dicta debitis
            eligendi dolor velit aut cumque?
          </p>
          <div>
            <Button>Follow</Button>
            <AboutPopOver />
          </div>
        </div>
      </section>
      <ChannelOverviewActions />
    </section>
  );
};

export default ChannelOverview_v3;
