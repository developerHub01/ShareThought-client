"use client";

import ComponentActions from "@/app/(editor)/studio/create-blog/[id]/_components/LeftSidebar/Navigator/ComponentActions";
import { RightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import {
  BlockInterface,
  changeHoveringComponentId,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { memo, MouseEvent, useCallback, useEffect, useState } from "react";
import ComponentIcon from "@/app/(editor)/studio/create-blog/[id]/_components/LeftSidebar/Navigator/ComponentIcon";
import Component from "@/app/(editor)/studio/create-blog/[id]/_components/LeftSidebar/Navigator/Component";

// Memoizing ComponentDetail to prevent unnecessary re-renders
const ComponentDetail = memo(
  ({
    id,
    type,
    children,
    activeBlock = "",
    activeFullPath,
  }: BlockInterface & {
    activeBlock: string;
    activeFullPath?: Array<string>;
  }) => {
    // Extracting the blogId from the URL parameters (using Next.js useParams hook)
    const { id: blogId } = useParams<{ id: string }>();

    // State to track whether the component is open (for toggling)
    const [isOpen, setOpen] = useState(
      id === activeFullPath?.[0] && activeFullPath?.length > 1
    );

    // Redux dispatch hook to dispatch actions
    const dispatch = useAppDispatch();

    /* Synchronizing the active component with the current one.
       When activeFullPath or id changes, it updates the state (isOpen) to reflect the current component's state. */
    useEffect(() => {
      const newValue = id === activeFullPath?.[0] && activeFullPath?.length > 1;
      if (isOpen !== newValue) setOpen(newValue);
    }, [activeFullPath, id]);

    // Calculate the remaining path (all but the first item in the activeFullPath)
    const restActivePath = activeFullPath?.slice(1) ?? [];

    // Toggle the component's open/close state
    const toggleOpen = useCallback((e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setOpen((prev) => !prev);
    }, []);

    // Handle mouse hover over the component and dispatch hover action
    const handleMouseHover = useCallback(
      (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        dispatch(changeHoveringComponentId(id));
      },
      [id] // Ensuring it uses the current 'id' when hovering
    );

    // Handle mouse leave event and reset hover state
    const handleMouseLeave = useCallback((e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      dispatch(changeHoveringComponentId(null)); // Reset hover state
    }, []);

    return (
      <div className="w-full rounded-sm">
        <div
          className={cn(
            "group flex items-center pr-2 gap-1 rounded-none capitalize border-b border-l min-h-10",
            {
              // Highlight this component if it's the active block
              "bg-primary text-primary-foreground hover:bg-primary/80 rounded-sm":
                activeBlock === id,
              // Apply hover styles when the component is not the active block
              "hover:bg-accent": activeBlock !== id,
            }
          )}
        >
          <button
            type="button"
            className="w-full flex items-center gap-2 pl-2 py-1.5"
            onClick={toggleOpen} // Handle the opening/closing of the component
            onMouseMove={handleMouseHover} // Track mouse hover on the component
            onMouseLeave={handleMouseLeave} // Reset hover on mouse leave
          >
            {Array.isArray(children) && (
              <RightIcon
                size={16}
                className={cn("transition-transform duration-100 ease-in-out", {
                  // Rotate icon when the component is open/closed
                  "rotate-90": isOpen,
                  "rotate-0": !isOpen,
                })}
              />
            )}
            <div className="flex items-center gap-2 capitalize">
              <ComponentIcon id={id} type={type} /> {type}
            </div>
          </button>

          {/* Render the component actions (e.g., edit, delete buttons) */}
          <ComponentActions activeBlock={activeBlock} blogId={blogId} id={id} />
        </div>

        {/* Render child components if this component is open and has children */}
        {isOpen && Array.isArray(children) && (
          <div className="pl-5 flex flex-col gap-1">
            {children.map((childId) => (
              <Component
                key={childId}
                id={childId}
                {...(restActivePath[0] === childId
                  ? {
                      activeFullPath: restActivePath, // Pass active path if the child matches the path
                    }
                  : {})}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

export default ComponentDetail;
