"use client";

import React, { MouseEvent } from "react";
import { useDroppable } from "@dnd-kit/core";
import Heading from "@/components/editor/components/Heading";
import Row from "@/components/editor/components/Row";
import {
  AccordionInterface,
  BlockInterface,
  changeActiveBlock,
  TableInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { BlogComponentBlock } from "@/types";
import { GripHorizontal as GripIcon, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Table from "@/components/editor/components/Table";
import Image from "@/components/editor/components/Image";
import ButtonComponent from "@/components/editor/components/Button";
import { cn } from "@/lib/utils";
import Spacer, { SpacerProps } from "@/components/editor/components/Spacer";
import Divider, { DividerProps } from "@/components/editor/components/Divider";
import Code, { CodeProps } from "@/components/editor/components/Code";
import Accordion from "@/components/editor/components/Accordion";

export interface TableProps extends BlockInterface {
  children: TableInterface;
}
export interface AccordionProps extends BlockInterface {
  children: AccordionInterface;
}
const Block = ({ ...props }: BlogComponentBlock) => {
  if (["h1", "h2", "h3", "h4", "h5", "h6", "p"].includes(props.type)) {
    return <Heading {...props} />;
  } else if (props.type === "button") {
    return <ButtonComponent {...props} />;
  } else if (props.type === "row") {
    return <Row {...props} />;
  } else if (props.type === "table") {
    return <Table {...(props as TableProps)} />;
  } else if (props.type === "image") {
    return <Image {...props} />;
  } else if (props.type === "spacer") {
    return <Spacer {...(props as SpacerProps)} />;
  } else if (props.type === "divider") {
    return <Divider {...(props as DividerProps)} />;
  } else if (props.type === "code") {
    return <Code {...(props as CodeProps)} />;
  } else if (props.type === "accordion") {
    return <Accordion {...(props as AccordionProps)} />;
  }
  return <></>;
};

const BlockComponent = ({
  lavel,
  ...props
}: BlockInterface & { lavel?: number }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  const dispatch = useAppDispatch();
  const { postId } = props;

  if (!postId) return null;

  const { metaData, activeBlock } =
    useAppSelector((state) => state?.blogBuilder?.blogs[postId]) || {};

  const styles = metaData?.globalStyles[props.type] || {};

  const toggleActiveBlock = (e: MouseEvent<HTMLDivElement>) => {
    /* so that only that element will active not parent element */
    e.stopPropagation();

    dispatch(
      changeActiveBlock({
        blogId: postId,
        activeBlockId: props.id,
      })
    );
  };

  return (
    <div
      className={cn(
        "flex w-full group-hover:bg-accent/80 justify-center gap-3 p-2 px-2 ring-2 ring-transparent relative hover:ring-primary",
        {
          "bg-accent/80 ring-primary": props.id === activeBlock,
          "px-16": lavel === 1,
        }
      )}
      onClick={toggleActiveBlock}
      ref={setNodeRef}
      style={style}
    >
      <span className="group-hover:opacity-100 group-hover:pointer-events-auto opacity-0 pointer-events-none">
        <ActionButton
          key={"grip"}
          id="grip"
          Icon={GripIcon}
          onClick={() => {}}
        />
      </span>
      <div className="w-full max-w-3xl rounded-sm">
        <Block {...props} postId={postId} styles={styles} />
      </div>
    </div>
  );
};

interface ActionButtonProps {
  id: string;
  Icon: LucideIcon;
  className?: string;
  onClick: () => void;
}

const ActionButton = ({ id, Icon, onClick, className }: ActionButtonProps) => {
  return (
    <Button
      key={id}
      onClick={onClick}
      size="smIcon"
      type="button"
      variant="default"
      className={cn(
        "absolute top-1/2 left-0 -translate-y-1/2 rounded-l-none",
        {
          "cursor-grab": id === "grip",
        },
        className
      )}
    >
      <Icon size={16} />
    </Button>
  );
};

export default BlockComponent;
