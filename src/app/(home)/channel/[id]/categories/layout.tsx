import React from "react";

interface CategoriesLayoutProps {
  children: React.ReactNode;
}
const CategoriesLayout = ({ children }: CategoriesLayoutProps) => {
  return (
    <section className="w-full py-3 flex flex-col gap-3">{children}</section>
  );
};

export default CategoriesLayout;
