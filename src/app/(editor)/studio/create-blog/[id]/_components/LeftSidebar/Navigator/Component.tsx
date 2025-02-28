"use client";

import { cn } from "@/lib/utils";
import {
  BlockInterface,
  BlockTypes,
  changeActiveBlock,
  changeHoveringComponentId,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Rows2 as RowIcon,
  Columns2 as ColumnIcon,
  Heading1 as H1Icon,
  Heading2 as H2Icon,
  Heading3 as H3Icon,
  Heading4 as H4Icon,
  Heading5 as H5Icon,
  Heading6 as H6Icon,
  Image as ImageIcon,
  Pilcrow as ParagraphIcon,
  ChevronRight as RightIcon,
  MousePointerClick as SelectIcon,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { MouseEvent, useState } from "react";

interface ComponentProps {
  id: string;
}

const Component = ({ id }: ComponentProps) => {
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return;

  const { activeBlock, components } = useAppSelector(
    (state) => state.blogBuilder.blogs[blogId] || {}
  );

  const componentData = components[id];

  if (!componentData) return;

  return <ComponentDetail {...componentData} activeBlock={activeBlock} />;
};

const ComponentIcon = ({ id, type }: { id: string; type: BlockTypes }) => {
  const { id: blogId } = useParams<{ id: string }>();

  const { metaData } = useAppSelector(
    (state) => state.blogBuilder.blogs[blogId] || {}
  );
  const { imgLinks } = metaData || {};

  const size = 16;

  switch (type) {
    case "row":
      return <RowIcon size={size} />;
    case "column":
      return <ColumnIcon size={size} />;
    case "h1":
      return <H1Icon size={size} />;
    case "h2":
      return <H2Icon size={size} />;
    case "h3":
      return <H3Icon size={size} />;
    case "h4":
      return <H4Icon size={size} />;
    case "h5":
      return <H5Icon size={size} />;
    case "h6":
      return <H6Icon size={size} />;
    case "p":
      return <ParagraphIcon size={size} />;
    case "image":
      return imgLinks[id] ? (
        <Image
          src={imgLinks[id]}
          alt=""
          width={20}
          height={20}
          className="object-contain"
        />
      ) : (
        <ImageIcon size={size} />
      );
  }
};

const ComponentDetail = ({
  id,
  type,
  children,
  activeBlock,
}: BlockInterface & { activeBlock: string | null }) => {
  const { id: blogId } = useParams<{ id: string }>();
  const [isOpen, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const isHovering =
    useAppSelector((state) => state.blogBuilder.hoveringComponentId) === id;

  const handleToggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  const handleMouseHover = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (isHovering) return null;

    dispatch(changeHoveringComponentId(id));
  };

  const handleMouseLeave = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    dispatch(changeHoveringComponentId(null));
  };

  const toggleActiveBlock = (e: MouseEvent<HTMLButtonElement>) => {
    /* so that only that element will active not parent element */
    e.stopPropagation();

    dispatch(
      changeActiveBlock({
        blogId,
        activeBlockId: id,
      })
    );
  };

  return (
    <div className="w-full rounded-sm">
      <div
        className={cn(
          "group w-full flex items-center px-2 py-1.5 rounded-none capitalize hover:bg-accent border-b border-l min-h-10",
          {
            "bg-primary text-primary-foreground hover:bg-primary/80 rounded-sm":
              activeBlock === id,
          }
        )}
      >
        <button
          type="button"
          className="w-full flex items-center gap-2"
          onClick={handleToggle}
          onMouseMove={handleMouseHover}
          onMouseLeave={handleMouseLeave}
        >
          {Array.isArray(children) && <RightIcon size={16} />}
          <div className="flex items-center gap-2">
            <ComponentIcon id={id} type={type} /> {type}
          </div>
        </button>
        {activeBlock !== id && (
          <button
            onClick={toggleActiveBlock}
            type="button"
            className="hidden group-hover:block bg-primary-foreground text-primary rounded-full p-1"
          >
            <SelectIcon size={16} />
          </button>
        )}
      </div>
      {isOpen && Array.isArray(children) && (
        <div className="pl-3 flex flex-col gap-1">
          {children.map((id) => (
            <Component key={id} id={id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Component;
