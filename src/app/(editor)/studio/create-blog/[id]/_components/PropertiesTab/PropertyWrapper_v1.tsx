import { cn } from "@/lib/utils";
import React from "react";

interface PropertyWrapper_v1Props {
  children: React.ReactNode;
  className?: string;
}
const PropertyWrapper_v1 = ({
  children,
  className,
}: PropertyWrapper_v1Props) => {
  return (
    <div
      className={cn(
        "flex justify-between items-center p-3 border-b flex-wrap select-none gap-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export default PropertyWrapper_v1;
