import clsx from "clsx";
import React from "react";

interface MainWrapperProps {
  children: React.ReactNode;
  className?: string;
}
const MainWrapper = ({ children, className = "" }: MainWrapperProps) => {
  return (
    <main
      className={clsx("mx-auto w-full h-full p-2 md:p-0 md:pr-2", className)}
    >
      {children}
    </main>
  );
};

export default MainWrapper;
