import React from "react";
import CategoriesTop from "@/components/category/CategoryTop";

interface ReadLaterLayoutProps {
  children: React.ReactNode;
}

const CategoryLayout = ({ children }: ReadLaterLayoutProps) => {
  return (
    <section className="mx-auto w-full flex flex-col gap-8 pb-5">
      <CategoriesTop />
      <section className="w-full max-w-7xl mx-auto">{children}</section>
    </section>
  );
};

export default CategoryLayout;
