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
import { MotionSpanProps } from "@/types";

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
  const params = useParams<{
    id: string;
  }>();
  const router = useRouter();
  const { state } = useSidebar();

  const handleClick = () => {
    /* 
    if current route is create-blog page
    or 
    targeted route is create-blog page then no need to redirect
    */
    if (
      pathname.startsWith("/studio/create-blog") ||
      !url.startsWith("/studio/create-blog")
    )
      return;

    const id = uuidv4();

    if (params.id) return;

    url = `${url}/${id}`;

    return router.push(url);
  };

  const Icon = LucideIcons[icon as keyof typeof LucideIcons] as LucideIcon;

  /* 
  if pathname is same as url 
  or 
  pathname is create-blog page and url is create-blog 

  then it is active
  */
  const isActive =
    pathname === url ||
    (pathname.startsWith("/studio/create-blog") &&
      url === "/studio/create-blog");

  const customUrlRedirectList = ["/studio/create-blog"];
  const isPreventLink = customUrlRedirectList.find((link) =>
    url.startsWith(link)
  );

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
          {...(sidebarLabelAnimProps as MotionSpanProps)}
        >
          {label}
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export default SidebarMenuButtonLink;
