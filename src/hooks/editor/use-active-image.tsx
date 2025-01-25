"use client";

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
  const { id: blogId } = useParams() as { id: string };

  if (!blogId) return defaultImageDetails;

  const {
    activeBlock,
    components,
    metaData: { imgLinks },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId as string]);

  if (!activeBlock) return defaultImageDetails;

  const activeImageUrl = imgLinks[activeBlock];

  const { alt, caption } = components[activeBlock];

  return {
    url: activeImageUrl,
    alt,
    caption,
    activeBlock,
    blogId,
  };
};

export default useActiveImage;
