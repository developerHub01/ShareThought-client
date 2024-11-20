"use client";

import {
  SidebarMenuButton,
  useSidebar,
} from "@/components/sidebar/SidebarMain";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { sidebarLabelAnimProps } from "./sidebarLabelAnim";

interface SidebarMenuButtonLinkProps {
  url: string;
  icon: string;
  label: string;
}

const SidebarMenuButtonLink = ({
  url,
  icon,
  label,
}: SidebarMenuButtonLinkProps) => {
  const pathname = usePathname();
  const { state } = useSidebar();

  const Icon = LucideIcons[icon as keyof typeof LucideIcons] as LucideIcon;

  const isActive = pathname === url;
  return (
    <SidebarMenuButton asChild tooltip={label} data-active={isActive}>
      <Link href={url}>
        {Icon && <Icon />}
        <AnimatePresence>
          {state === "expanded" && (
            <motion.span
              key="sidebar_menu_item_label"
              className="capitalize"
              {...sidebarLabelAnimProps}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </Link>
    </SidebarMenuButton>
  );
};

export default SidebarMenuButtonLink;
