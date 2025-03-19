"use client";

import {
  selectBlogActiveBlock,
  selectBlogComponentById,
  selectBlogImgLinkById,
} from "@/redux/features/builders/selectors";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";

const defaultImageDetails = {
  url: "",
  alt: "",
  caption: "",
  activeBlock: null,
  blogId: null,
};

const useActiveImage = () => {
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return defaultImageDetails;

  const activeBlock = useAppSelector((state) =>
    selectBlogActiveBlock(state, blogId)
  );
  const activeComponent = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, activeBlock)
  );
  const activeImageUrl = useAppSelector((state) =>
    selectBlogImgLinkById(state, blogId, activeBlock)
  );

  if (!activeBlock || !activeComponent) return defaultImageDetails;

  const { alt, caption } = activeComponent;

  return {
    url: activeImageUrl,
    alt,
    caption,
    activeBlock,
    blogId,
  };
};

export default useActiveImage;
