"use client";

import {
  RowIcon,
  ColumnIcon,
  H1Icon,
  H2Icon,
  H3Icon,
  H4Icon,
  H5Icon,
  H6Icon,
  ImageIcon,
  ParagraphIcon,
  CodeIcon,
  DividerIcon,
  ListIcon,
  TableIcon,
  BlockquoteIcon,
  AccordionIcon,
  CollapseIcon,
  SpacerIcon,
  ButtonIcon,
} from "@/lib/icons";
import { BlockTypes } from "@/redux/features/builders/blogBuilderSlice";
import { selectBlogImgLinkById } from "@/redux/features/builders/selectors";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { useParams } from "next/navigation";
import { JSX, memo } from "react";

const iconSize = 18;

const ComponentIcon = memo(({ id, type }: { id: string; type: BlockTypes }) => {
  const { id: blogId } = useParams<{ id: string }>();

  const imgLink = useAppSelector((state) =>
    selectBlogImgLinkById(state, blogId, id)
  );

  const icons: Record<BlockTypes, JSX.Element> = {
    row: <RowIcon size={iconSize} />,
    column: <ColumnIcon size={iconSize} />,
    h1: <H1Icon size={iconSize} />,
    h2: <H2Icon size={iconSize} />,
    h3: <H3Icon size={iconSize} />,
    h4: <H4Icon size={iconSize} />,
    h5: <H5Icon size={iconSize} />,
    h6: <H6Icon size={iconSize} />,
    p: <ParagraphIcon size={iconSize} />,
    accordion: <AccordionIcon size={iconSize} />,
    blockquote: <BlockquoteIcon size={iconSize} />,
    code: <CodeIcon size={iconSize} />,
    button: <ButtonIcon size={iconSize} />,
    divider: <DividerIcon size={iconSize} />,
    list: <ListIcon size={iconSize} />,
    spacer: <SpacerIcon size={iconSize} />,
    table: <TableIcon size={iconSize} />,
    collapse: <CollapseIcon size={iconSize} />,
    image: imgLink ? (
      <Image
        src={imgLink}
        alt="Image"
        width={20}
        height={20}
        className="object-contain"
      />
    ) : (
      <ImageIcon size={iconSize} />
    ),
  };

  return icons[type] || null;
});

export default ComponentIcon;
