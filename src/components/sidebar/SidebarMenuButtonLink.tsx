"use client";

import {
  SidebarMenuButton,
  useSidebar,
} from "@/components/sidebar/SidebarMain";
import { useParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { sidebarLabelAnimProps } from "./sidebarLabelAnim";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";

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
  const params = useParams();
  const router = useRouter();
  const { state } = useSidebar();

  const handleClick = () => {
    if (!url.startsWith("/studio/create-blog")) return;
    const id = uuidv4();
    url = `${url}/${params?.id || id}`;

    if (params.id) return;

    console.log({ url });

    return router.push(url);
  };

  const Icon = LucideIcons[icon as keyof typeof LucideIcons] as LucideIcon;

  const isActive = pathname === url;

  const customUrlRedirectList = ["/studio/create-blog"];
  const isPreventLink = customUrlRedirectList.includes(url);

  return (
    <SidebarMenuButton
      asChild
      tooltip={label}
      data-active={isActive}
      onClick={handleClick}
    >
      {isPreventLink ? (
        <span className="cursor-pointer">
          {Icon && <Icon />}
          <ItemText state={state} label={label} />
        </span>
      ) : (
        <Link href={url}>
          {Icon && <Icon />}
          <ItemText state={state} label={label} />
        </Link>
      )}
    </SidebarMenuButton>
  );
};

interface ItemTextProps {
  state: string;
  label: string;
}

const ItemText = ({ state, label }: ItemTextProps) => {
  return (
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
  );
};

export default SidebarMenuButtonLink;
