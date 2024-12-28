import clsx from "clsx";
import React from "react";

interface PageHeadingWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const PageHeadingWrapper = ({
  children,
  className,
  ...props
}: PageHeadingWrapperProps) => {
  return (
    <div
      className={clsx(
        "flex justify-between items-center gap-2 flex-wrap pb-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default PageHeadingWrapper;
