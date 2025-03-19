"use client";

import React, { MouseEvent, useState, useCallback, JSX, memo } from "react";
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
  Code as CodeIcon,
  Minus as DividerIcon,
  List as ListIcon,
  Table as TableIcon,
  TextQuote as BlockquoteIcon,
  ListCollapse as AccordionIcon,
  ChevronsDownUp as CollapseIcon,
  AlignVerticalSpaceAround as SpacerIcon,
  SquarePlus as ButtonIcon,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  selectBlogActiveBlock,
  selectBlogComponentById,
  selectBlogImgLinkById,
  selectBlogHoveringComponentId,
} from "@/redux/features/builders/selectors";

interface ComponentProps {
  id: string;
}

const iconSize = 18;

const Component = memo(({ id }: ComponentProps) => {
  const { id: blogId } = useParams<{ id: string }>();
  if (!blogId) return null;

  const activeBlock = useAppSelector((state) =>
    selectBlogActiveBlock(state, blogId)
  );
  const activeComponent = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, id)
  );

  if (!activeComponent) return null;

  return <ComponentDetail {...activeComponent} activeBlock={activeBlock} />;
});

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

const ComponentDetail = memo(
  ({
    id,
    type,
    children,
    activeBlock,
  }: BlockInterface & { activeBlock: string | null }) => {
    const { id: blogId } = useParams<{ id: string }>();
    const [isOpen, setOpen] = useState(false);
    const dispatch = useAppDispatch();

    const isHovering =
      useAppSelector((state) => selectBlogHoveringComponentId(state)) === id;

    const toggleOpen = useCallback((e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setOpen((prev) => !prev);
    }, []);

    const handleMouseHover = useCallback(
      (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (!isHovering) dispatch(changeHoveringComponentId(id));
      },
      [isHovering, dispatch, id]
    );

    const handleMouseLeave = useCallback(
      (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        dispatch(changeHoveringComponentId(null));
      },
      [dispatch]
    );

    const activateBlock = useCallback(
      (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        dispatch(changeActiveBlock({ blogId, activeBlockId: id }));
      },
      [dispatch, blogId, id]
    );

    return (
      <div className="w-full rounded-sm">
        <div
          className={cn(
            "group flex items-center px-2 py-1.5 rounded-none capitalize border-b border-l min-h-10",
            {
              "bg-primary text-primary-foreground hover:bg-primary/80 rounded-sm":
                activeBlock === id,
              "hover:bg-accent": activeBlock !== id,
            }
          )}
        >
          <button
            type="button"
            className="w-full flex items-center gap-2"
            onClick={toggleOpen}
            onMouseMove={handleMouseHover}
            onMouseLeave={handleMouseLeave}
          >
            {Array.isArray(children) && (
              <RightIcon
                size={16}
                className={cn("transition-transform duration-100 ease-in-out", {
                  "rotate-90": isOpen,
                  "rotate-0": !isOpen,
                })}
              />
            )}
            <div className="flex items-center gap-2 capitalize">
              <ComponentIcon id={id} type={type} /> {type}
            </div>
          </button>

          {activeBlock !== id && (
            <button
              onClick={activateBlock}
              type="button"
              className="hidden group-hover:block bg-primary-foreground text-primary rounded-full p-1"
              title="select component"
            >
              <SelectIcon size={16} />
            </button>
          )}
        </div>

        {isOpen && Array.isArray(children) && (
          <div className="pl-3 flex flex-col gap-1">
            {children.map((childId) => (
              <Component key={childId} id={childId} />
            ))}
          </div>
        )}
      </div>
    );
  }
);

export default Component;
