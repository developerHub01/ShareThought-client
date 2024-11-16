"use client";

import AppSidebarTrigger from "@/components/sidebar/AppSidebarTrigger";
import Link from "next/link";
import { useSidebar } from "@/components/sidebar/SidebarMain";
import { useIsMobile } from "@/hooks/use-mobile";
import clsx from "clsx";

const SidebarTop = () => {
  const { state } = useSidebar();
  const isMobile = useIsMobile();

  return (
    <div
      className={clsx("group flex gap-0 items-center", {
        "justify-center": state === "collapsed",
        "justify-start": state === "expanded",
      })}
    >
      <AppSidebarTrigger className="rounded-full flex-shrink-0" />
      {isMobile ? <AppName /> : state === "expanded" && <AppName />}
    </div>
  );
};

const AppName = () => {
  return (
    <Link
      href={"/"}
      className="truncate font-semibold flex-1 text-left text-sm leading-tight px-2 select-none"
    >
      ShareThought
    </Link>
  );
};

export default SidebarTop;
