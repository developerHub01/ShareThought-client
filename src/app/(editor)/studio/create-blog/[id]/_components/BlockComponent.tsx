"use client";

import Heading from "@/components/editor/components/Heading";
import Section from "@/components/editor/components/Section";
import {
  BlockInterface,
  changeActiveBlock,
  TableInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { BlogComponentBlock } from "@/types";
import {
  GripHorizontal as GripIcon,
  Trash as RemoveIcon,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Table from "@/components/editor/components/Table";
import Image from "@/components/editor/components/Image";
import { cn } from "@/lib/utils";

export interface TableProps extends BlockInterface {
  children: TableInterface;
}

const Block = ({ ...props }: BlogComponentBlock) => {
  if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(props.type)) {
    return <Heading {...props} />;
  } else if (props.type === "section") {
    return <Section {...props} />;
  } else if (props.type === "table") {
    return <Table {...(props as TableProps)} />;
  } else if (props.type === "image") {
    return <Image {...props} />;
  }
  return <></>;
};

const BlockComponent = ({ ...props }: BlockInterface) => {
  const dispatch = useAppDispatch();
  const { postId } = props;

  if (!postId) return null;

  const { metaData, activeBlock } =
    useAppSelector((state) => state?.blogBuilder?.blogs[postId]) || {};

  const styles = metaData?.globalStyles[props.type] || {};

  const toggleActiveBlock = () => {
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
        "flex w-full group-hover:bg-accent justify-center gap-3 p-2 ring-2 ring-transparent relative group-hover:ring-primary",
        {
          "bg-accent ring-primary": props.id === activeBlock,
        }
      )}
      onClick={toggleActiveBlock}
    >
      <span className="group-hover:opacity-100 group-hover:pointer-events-auto opacity-0 pointer-events-none">
        <ActionButton
          key={"grip"}
          id="grip"
          Icon={GripIcon}
          onClick={() => {}}
          className=""
        />
      </span>
      <div className="w-full max-w-3xl rounded-sm">
        <Block {...props} styles={styles} />
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
      size="icon"
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
