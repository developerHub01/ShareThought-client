"use client";

import React from "react";
import { useSidebar } from "@/components/sidebar/SidebarMain";
import { AnimatePresence, motion } from "motion/react";
import { sidebarLabelAnimProps } from "@/components/sidebar/sidebarLabelAnim";
import { MotionSpanProps } from "@/types";
import { LucideIcon } from "@/lib/icons";

interface ItemButtonContentProps {
  label: string;
  Icon?: LucideIcon;
}

const ItemButtonContent = ({ label, Icon }: ItemButtonContentProps) => {
  const { state } = useSidebar();

  return (
    <>
      {Icon && <Icon />}
      <AnimatePresence>
        {state === "expanded" && (
          <motion.span
            key="sidebar_menu_item_label"
            className="capitalize"
            {...(sidebarLabelAnimProps as MotionSpanProps)}
          >
            <span>{label}</span>
          </motion.span>
        )}
      </AnimatePresence>
    </>
  );
};

export default ItemButtonContent;
