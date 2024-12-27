"use client";

import { SidebarMenuButton } from "@/components/sidebar/SidebarMain";
import { useParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import ItemButtonContent from "@/components/sidebar/ItemButtonContent";

interface SidebarMenuButtonLinkProps {
  url: string;
  icon?: string;
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
      !pathname.startsWith("/studio/create-blog") &&
      !params.id
    ) {
      router.push(`/studio/create-blog/${uuidv4()}`);
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
          <ItemButtonContent label={label} Icon={Icon} />
        </span>
      ) : (
        <Link href={url}>
          <ItemButtonContent label={label} Icon={Icon} />
        </Link>
      )}
    </SidebarMenuButton>
  );
};

export default SidebarMenuButtonLink;
