import clsx from "clsx";
import React from "react";

interface SearchResultWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const SearchResultWrapper = ({
  children,
  className = "",
}: SearchResultWrapperProps) => {
  return (
    <section className={clsx("w-full flex flex-col gap-5", className)}>
      {children}
    </section>
  );
};

export default SearchResultWrapper;
