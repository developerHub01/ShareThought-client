"use client";

import React, { memo } from "react";
import ComponentButton from "@/app/(editor)/studio/create-blog/[id]/_components/ComponentButton";
import { componentItemList } from "@/app/(editor)/studio/create-blog/[id]/_constant";
import ComponentItemList from "@/app/(editor)/studio/create-blog/[id]/_components/ComponentsTab/ComponentItemList";

const ComponentList = memo(() => {
  return (
    <ComponentItemList.Wrapper className="flex flex-col gap-3">
      <ComponentItemList.Title>Components</ComponentItemList.Title>
      <div className="w-full grid grid-cols-2 gap-3 sm:gap-5">
        {componentItemList.map(({ id, label, Icon }) => (
          <ComponentButton
            key={id}
            id={id}
            className="cursor-grabbing"
            label={label}
            Icon={Icon}
            onClick={() => {}}
          />
        ))}
      </div>
    </ComponentItemList.Wrapper>
  );
});

export default ComponentList;
