"use client";

import AppSidebarTrigger from "@/components/sidebar/AppSidebarTrigger";
import Link from "next/link";
import { useSidebar } from "@/components/sidebar/SidebarMain";
import { useIsMobile } from "@/hooks/use-mobile";
import clsx from "clsx";
import { motion, AnimatePresence } from "motion/react";
import { sidebarLabelAnimProps } from "./sidebarLabelAnim";

const SidebarTop = () => {
  const { state } = useSidebar();
  const isMobile = useIsMobile();

  return (
    <div
      className={clsx("w-full group flex gap-0 items-center", {
        "justify-center": state === "collapsed",
        "justify-start": state === "expanded",
      })}
    >
      <AppSidebarTrigger className="rounded-full flex-shrink-0" />
      <AnimatePresence>
        {(isMobile || state === "expanded") && <AppName />}
      </AnimatePresence>
    </div>
  );
};

const AppName = () => {
  return (
    <motion.span key="app_name">
      <Link
        href={"/"}
        className="truncate font-semibold flex-1 text-left text-sm leading-tight px-2 select-none"
        {...sidebarLabelAnimProps}
      >
        ShareThought
      </Link>
    </motion.span>
  );
};

export default SidebarTop;
