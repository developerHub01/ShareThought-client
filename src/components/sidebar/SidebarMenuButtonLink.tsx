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
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { state } = useSidebar();

  const customUrlRedirectList = ["/studio/create-blog"];
  const isCustomRedirect = customUrlRedirectList.some((link) =>
    url.startsWith(link)
  );

  const isActive =
    pathname === url ||
    (pathname.startsWith(url) && url === "/studio/create-blog");

  const handleClick = () => {
    if (
      url.startsWith("/studio/create-blog") &&
      !pathname.startsWith("/studio/create-blog")
    ) {
      if (!params.id) {
        router.push(`/studio/create-blog/${uuidv4()}`);
      }
    }
  };

  const Icon = LucideIcons[icon as keyof typeof LucideIcons] as LucideIcon;
  return (
    <SidebarMenuButton
      asChild
      tooltip={label}
      data-active={isActive}
      onClick={handleClick}
    >
      {isCustomRedirect ? (
        <span className="cursor-pointer">
          <ButtonContent state={state} label={label} Icon={Icon} />
        </span>
      ) : (
        <Link href={url}>
          <ButtonContent state={state} label={label} Icon={Icon} />
        </Link>
      )}
    </SidebarMenuButton>
  );
};

interface ButtonContentProps {
  state: string;
  label: string;
  Icon?: LucideIcon;
}

const ButtonContent = ({ state, label, Icon }: ButtonContentProps) => {
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
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </>
  );
};

export default SidebarMenuButtonLink;
