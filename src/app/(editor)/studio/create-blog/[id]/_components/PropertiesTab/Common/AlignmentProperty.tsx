import React from "react";
import TextAlignBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/TextAlignBlock";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  AlignStartVertical as LeftAlignIcon,
  AlignEndVertical as RightAlignIcon,
  AlignCenterVertical as CenterAlignIcon,
} from "lucide-react";
import {
  flexAlignType,
  setAlignment,
} from "@/redux/features/builders/blogBuilderSlice";

const alignList = [
  {
    id: "flex-start",
    label: "Left",
    Icon: LeftAlignIcon,
  },
  {
    id: "center",
    label: "Center",
    Icon: CenterAlignIcon,
  },
  {
    id: "flex-end",
    label: "Right",
    Icon: RightAlignIcon,
  },
];

const AlignmentProperty = () => {
  const { id: blogId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  if (!blogId) return null;

  const {
    activeBlock,
    metaData: { styles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  if (!activeBlock) return null;

  const activeStyles = styles[activeBlock];

  const handleChangeAlign = (value: string) => {
    dispatch(
      setAlignment({
        blogId,
        activeBlockId: activeBlock,
        alignment: value as flexAlignType,
      })
    );
  };

  return (
    <TextAlignBlock
      title="Align"
      activeAlign={
        (activeStyles?.justifyContent as flexAlignType) ?? alignList[0].id
      }
      handleChange={handleChangeAlign}
      alignList={alignList}
    />
  );
};

export default AlignmentProperty;
