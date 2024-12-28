import clsx from "clsx";
import React from "react";

interface Heading_v1Props {
  children: React.ReactNode;
  className?: string;
}

const Heading_v1 = ({ children, className, ...props }: Heading_v1Props) => {
  return (
    <h1 className={clsx("text-2xl font-bold", className)} {...props}>
      {children}
    </h1>
  );
};

export default Heading_v1;
