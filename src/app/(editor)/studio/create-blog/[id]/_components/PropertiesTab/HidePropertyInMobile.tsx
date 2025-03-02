"use client";

import { useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import React from "react";

const HidePropertyInMobile = ({ children }: { children: React.ReactNode }) => {
  const { id: blogId } = useParams<{ id: string }>();
  const { screenType } = useAppSelector(
    (state) => state.blogBuilder.blogs[blogId]
  );

  if (screenType === "mobile") return null;

  return <>{children}</>;
};

export default HidePropertyInMobile;
