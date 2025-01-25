import React from "react";
import ImageUploadCanvas from "@/components/editor/components/ImageUploadCanvas";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
interface ImageProps {
  id: string;
  [key: string]: unknown;
}

const Image = ({ id, ...props }: ImageProps) => {
  const { id: blogId } = useParams() as { id: string };

  const {
    metaData: { imgLinks },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId as string]);

  if (!blogId) return null;

  const imageSrc = imgLinks && imgLinks[id];
  if (!imageSrc) return <ImageUploadCanvas id={id} blogId={blogId} />;

  return (
    <div>
      <img src={imageSrc} alt="" />
    </div>
  );
};

export default Image;
