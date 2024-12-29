import clsx from "clsx";
import React from "react";

interface PostsWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const CategoryListWraper = ({
  children,
  className = "",
}: PostsWrapperProps) => {
  return (
    <section
      className={clsx(
        "grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4",
        className
      )}
    >
      {children}
    </section>
  );
};

export default CategoryListWraper;
