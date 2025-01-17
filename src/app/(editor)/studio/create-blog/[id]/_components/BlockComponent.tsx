"use client";

import Heading from "@/components/editor/components/Heading";
import Section from "@/components/editor/components/Section";
import {
  BlockInterface,
  changeActiveBlock,
  TableInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { BlogComponentBlock } from "@/types";
import clsx from "clsx";
import {
  GripHorizontal as GripIcon,
  Trash as RemoveIcon,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Table from "@/components/editor/components/Table";

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

  const actionsList = useMemo(
    () => [
      {
        id: "remove",
        Icon: RemoveIcon,
        onClick: () => {},
      },
      {
        id: "grip",
        Icon: GripIcon,
        onClick: () => {},
      },
    ],
    []
  );

  return (
    <div
      className={clsx(
        "flex w-full group-hover:bg-accent justify-center gap-3 p-2",
        {
          "bg-accent ring-2 ring-offset-2 ring-primary":
            props.id === activeBlock,
        }
      )}
      onClick={toggleActiveBlock}
    >
      <div className={"flex"}>
        <ActionButton key={actionsList[0].id} {...actionsList[0]} index={0} />
      </div>
      <div className="w-full max-w-3xl rounded-sm p-3">
        <Block {...props} styles={styles} />
      </div>
      <ActionButton key={actionsList[1].id} {...actionsList[1]} index={1} />
    </div>
  );
};

interface ActionButtonProps {
  id: string;
  Icon: LucideIcon;
  onClick: () => void;
  index: number;
}
const ActionButton = ({ id, Icon, onClick, index }: ActionButtonProps) => {
  return (
    <Button
      key={id}
      onClick={onClick}
      size="icon"
      type="button"
      variant="outline"
      className={clsx("", {
        "cursor-grab": id === "grip",
      })}
    >
      <Icon size={16} />
    </Button>
  );
};

export default BlockComponent;
