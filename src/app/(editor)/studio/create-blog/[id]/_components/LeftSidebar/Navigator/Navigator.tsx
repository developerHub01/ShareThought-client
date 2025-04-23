"use client";

import React, { memo } from "react";
import ContentWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/LeftSidebar/ContentWrapper";
import FocusTrap from "@/components/wrappers/FocusTrap";
import NavigatorListSk from "@/app/(editor)/studio/create-blog/[id]/_skeleton/LeftSidebar/NavigatorListSk";
import dynamic from "next/dynamic";
const NavigatorList = dynamic(
  () =>
    import(
      "@/app/(editor)/studio/create-blog/[id]/_components/LeftSidebar/Navigator/NavigatorList"
    ),
  {
    loading: () => <NavigatorListSk />,
    ssr: false,
  }
);

interface NavigatorProps {
  onClose?: () => void;
}

const selectorExclude = ["button", "[href]", "input", "select", "textarea"];

const Navigator = memo(({ onClose }: NavigatorProps) => {
  return (
    <ContentWrapper id="navigator" label="Navigator">
      <FocusTrap
        onClose={onClose}
        selectorExclude={selectorExclude}
        reCalculateable={true}
      >
        <NavigatorList />
      </FocusTrap>
    </ContentWrapper>
  );
});

export default Navigator;
