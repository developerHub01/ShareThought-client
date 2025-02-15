import { cn } from "@/lib/utils";
import React from "react";

interface PropertyTypeWrapperProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}
const PropertyTypeWrapper = ({
  className,
  children,
  ...props
}: PropertyTypeWrapperProps) => {
  return (
    <div className={cn("flex flex-col h-full", className)} {...props}>
      {children}
    </div>
  );
};

export default PropertyTypeWrapper;
