"use client";

import {
  Monitor as DesktopIcon,
  LucideIcon,
  Smartphone as MobileIcon,
} from "lucide-react";
import React from "react";
import ToggleList from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/ToggleList";
import { toggleScreenType } from "@/redux/features/builders/blogBuilderSlice";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { cn } from "@/lib/utils";
import { selectBlogScreenType } from "@/redux/features/builders/selectors";
import { OrientationType } from "@/types";

const screenList: Array<{
  id: string;
  label: string;
  Icon: LucideIcon;
}> = [
  {
    id: "desktop",
    label: "Desktop",
    Icon: DesktopIcon,
  },
  {
    id: "mobile",
    label: "Mobile",
    Icon: MobileIcon,
  },
];

interface ResponsiveToggleBlockProps {
  className?: string;
  orientation?: OrientationType;
}
const ResponsiveToggleBlock = ({
  className,
  orientation,
}: ResponsiveToggleBlockProps) => {
  const { id: blogId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const screenType = useAppSelector((state) =>
    selectBlogScreenType(state, blogId)
  );

  const handleChange = () =>
    dispatch(
      toggleScreenType({
        id: blogId,
      })
    );

  return (
    <ToggleList
      orientation={orientation}
      size="sm"
      className={cn("", className)}
      toggleList={screenList}
      handleChange={handleChange}
      activeItem={screenType ?? screenList[0].id}
    />
  );
};

export default ResponsiveToggleBlock;
