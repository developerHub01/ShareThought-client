"use client";

import React, { useEffect, useState } from "react";
import InputWithAttachLebel from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/InputWithAttachLebel";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { linkRedirect } from "@/redux/features/builders/blogBuilderSlice";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";
import { isValidURL } from "@/utils";

const ComponentLinkProperty = () => {
  const [redirectLink, setRedirectLink] = useState("");
  const { id: blogId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  if (!blogId) return null;

  const { activeBlock, components } = useAppSelector(
    (state) => state.blogBuilder.blogs[blogId as string]
  );

  if (!activeBlock) return null;

  const componentRedirect = components[activeBlock]?.redirect || "";

  useEffect(() => {
    setRedirectLink(componentRedirect);
  }, [activeBlock, componentRedirect]);

  const handleChange = (value: string) => {
    setRedirectLink(value);
  };

  const handleBlur = (value: string) => {
    if (value && !isValidURL(value)) return setRedirectLink("");

    dispatch(
      linkRedirect({
        blogId,
        activeBlockId: activeBlock,
        link: value,
      })
    );
  };

  return (
    <PropertyWrapper_v1>
      <InputWithAttachLebel
        placeholder="Link with external url"
        label="Link to"
        value={redirectLink}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </PropertyWrapper_v1>
  );
};

export default ComponentLinkProperty;
