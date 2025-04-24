"use client";

import { selectBlogScreenType } from "@/redux/features/builders/selectors";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import React, { memo } from "react";

const HidePropertyInMobile = memo(
  ({ children }: { children: React.ReactNode }) => {
    const { id: blogId } = useParams<{ id: string }>();

    const screenType = useAppSelector((state) =>
      selectBlogScreenType(state, blogId)
    );
    
    if (screenType === "mobile") return null;

    return <>{children}</>;
  }
);

export default HidePropertyInMobile;
