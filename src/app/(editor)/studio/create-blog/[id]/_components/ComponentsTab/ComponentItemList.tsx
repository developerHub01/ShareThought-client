import { cn } from "@/lib/utils";
import React from "react";

interface WrapperProps {
  className?: string;
  children: React.ReactNode;
}

const Wrapper = ({ className, children }: WrapperProps) => {
  return <div className={cn("flex flex-col gap-3", className)}>{children}</div>;
};

interface TitleProps {
  className?: string;
  children: React.ReactNode;
}

const Title = ({ className, children }: TitleProps) => {
  return (
    <h3 className={cn("text-xl font-semibold select-none", className)}>
      {children}
    </h3>
  );
};

export default { Wrapper, Title };
