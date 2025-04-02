"use client";

import ComponentActions from "@/app/(editor)/studio/create-blog/[id]/_components/LeftSidebar/Navigator/ComponentActions";
import { RightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import {
  BlockInterface,
  changeHoveringComponentId,
} from "@/redux/features/builders/blogBuilderSlice";
import { selectBlogHoveringComponentId } from "@/redux/features/builders/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { memo, MouseEvent, useCallback, useState } from "react";
import ComponentIcon from "@/app/(editor)/studio/create-blog/[id]/_components/LeftSidebar/Navigator/ComponentIcon";
import Component from "@/app/(editor)/studio/create-blog/[id]/_components/LeftSidebar/Navigator/Component";

const ComponentDetail = memo(
  ({
    id,
    type,
    children,
    activeBlock = "",
  }: BlockInterface & { activeBlock: string }) => {
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

    return (
      <div className="w-full rounded-sm">
        <div
          className={cn(
            "group flex items-center px-2 py-1.5 gap-1 rounded-none capitalize border-b border-l min-h-10",
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

          <ComponentActions activeBlock={activeBlock} blogId={blogId} id={id} />
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

export default ComponentDetail;
