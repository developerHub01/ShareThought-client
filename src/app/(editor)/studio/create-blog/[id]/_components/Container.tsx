"use client";

import { cn } from "@/lib/utils";
import { selectBlogScreenType } from "@/redux/features/builders/selectors";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { memo } from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

const Container = memo(({ children, className }: ContainerProps) => {
  const { id: blogId } = useParams<{ id: string }>();

  const screenType = useAppSelector((state) =>
    selectBlogScreenType(state, blogId)
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
});

export default Container;
