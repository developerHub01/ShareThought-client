import clsx from "clsx";
import React from "react";

interface SpacerProps {
  className?: string;
}

const Spacer = ({ className, ...props }: SpacerProps) => {
  return <div className={clsx("", className)} {...props}></div>;
};

export default Spacer;
