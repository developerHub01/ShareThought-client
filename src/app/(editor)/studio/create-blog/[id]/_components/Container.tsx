"use client";

import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

const Container = ({ children, className }: ContainerProps) => {
  const { id: blogId } = useParams<{ id: string }>();

  const { screenType } = useAppSelector(
    (state) => state.blogBuilder.blogs[blogId]
  );

  return (
    <section
      aria-label="container"
      className={cn("w-full max-w-3xl mx-auto", className, {
        "max-w-3xl": screenType === "desktop",
        "max-w-md": screenType === "mobile",
      })}
    >
      {children}
    </section>
  );
};

export default Container;
