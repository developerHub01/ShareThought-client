"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import React, { Fragment, ReactNode } from "react";

interface ButtonGroupProps {
  children: ReactNode[];
  showSeparators?: boolean;
  size?: "sm" | "lg" | "default";
  variant?: "default" | "outline" | "ghost" | "link";
  orientation?: "vertical" | "horizontal";
  disabled?: boolean;
  className?: string;
}

export const ButtonGroup = ({
  children,
  showSeparators = true,
  className = "",
  size = "default",
  variant = "default",
  orientation = "horizontal",
  disabled = false,
}: ButtonGroupProps) => {
  return (
    <div
      className={cn("inline-flex ml-auto items-center", className, {
        "flex-row": orientation === "horizontal",
        "flex-col": orientation === "vertical",
      })}
    >
      {children.map((child, index) => {
        const isFirst = index === 0;
        const isLast = index === children.length - 1;
        return (
          <Fragment key={index}>
            {React.cloneElement(child as React.ReactElement<any>, {
              disabled:
                (child as React.ReactElement<any>).props.disabled ?? disabled,
              className: cn(
                (child as React.ReactElement<any>).props.className || "",
                {
                  "rounded-r-none": isFirst && orientation === "horizontal",
                  "rounded-l-none": isLast && orientation === "horizontal",
                  "rounded-b-none": isFirst && orientation === "vertical",
                  "rounded-t-none": isLast && orientation === "vertical",
                  "rounded-none": !isFirst && !isLast,
                }
              ).trim(),
              size: (child as React.ReactElement<any>).props.size || size,
              variant:
                (child as React.ReactElement<any>).props.variant || variant,
            })}
            {showSeparators && !isLast && (
              <Separator
                orientation={
                  orientation === "horizontal" ? "vertical" : "horizontal"
                }
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
};
