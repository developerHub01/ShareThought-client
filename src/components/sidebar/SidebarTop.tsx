"use client";

import AppSidebarTrigger from "@/components/sidebar/AppSidebarTrigger";
import Link from "next/link";
import { useSidebar } from "@/components/sidebar/SidebarMain";

const SidebarTop = () => {
  const { state } = useSidebar();

  return (
    <div
      className={`group flex gap-0 items-center ${
        state === "collapsed" ? "flex justify-center items-center" : ""
      }`}
    >
      <AppSidebarTrigger className="rounded-full flex-shrink-0" />
      {state === "expanded" && (
        <Link
          href={"/"}
          className="truncate font-semibold flex-1 text-left text-sm leading-tight px-2 select-none"
        >
          Site Name
        </Link>
      )}
    </div>
  );
};

export default SidebarTop;
