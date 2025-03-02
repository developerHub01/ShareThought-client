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

const ResponsiveToggleBlock = () => {
  const { id: blogId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { screenType } = useAppSelector(
    (state) => state.blogBuilder.blogs?.[blogId] ?? {}
  );

  const handleChange = () =>
    dispatch(
      toggleScreenType({
        id: blogId,
      })
    );

  return (
    <ToggleList
      toggleList={screenList}
      handleChange={handleChange}
      activeItem={screenType ?? screenList[0].id}
    />
  );
};

export default ResponsiveToggleBlock;
