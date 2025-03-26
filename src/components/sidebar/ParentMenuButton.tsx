"use client";

import { SidebarMenuButton } from "@/components/sidebar/SidebarMain";
import LucideIcons, { LucideIcon, RightIcon } from "@/lib/icons";
import { AnimatePresence, motion } from "motion/react";
import { useSidebar } from "@/components/sidebar/SidebarMain";
import { MotionSpanProps } from "@/types";
import { sidebarLabelAnimProps } from "@/components/sidebar/sidebarLabelAnim";
import { CollapsibleTrigger } from "@/components/ui/collapsible";

interface ParentMenuButtonProps {
  label: string;
  icon?: string;
}

const ParentMenuButton = ({ label, icon }: ParentMenuButtonProps) => {
  const { state, setOpen } = useSidebar();
  const Icon = LucideIcons[icon as keyof typeof LucideIcons] as LucideIcon;

  const handleOpenSidebar = () => setOpen(true);

  return (
    <CollapsibleTrigger asChild onClick={handleOpenSidebar}>
      <SidebarMenuButton tooltip={label} asChild>
        <span className="cursor-pointer capitalize">
          {icon && <Icon />}
          <AnimatePresence>
            {state === "expanded" && (
              <motion.span
                key="sidebar_menu_item_collapsible"
                className="w-full flex justify-between items-center"
                {...(sidebarLabelAnimProps as MotionSpanProps)}
              >
                {label}
                <RightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </SidebarMenuButton>
    </CollapsibleTrigger>
  );
};

export default ParentMenuButton;
