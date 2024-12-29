import Heading_v1 from "@/components/headings/Heading_v1";
import PageHeadingWrapper from "@/components/headings/PageHeadingWrapper";
import React from "react";
import SortMenu from "@/app/(home)/categories/_components/SortMenu";

interface CategoriesLayoutProps {
  children: React.ReactNode;
}

const CategoriesLayout = ({ children }: CategoriesLayoutProps) => {
  return (
    <section className="mx-auto w-full max-w-7xl pb-5">
      <PageHeadingWrapper>
        <Heading_v1>Saved Categories</Heading_v1>
        <SortMenu />
      </PageHeadingWrapper>
      <div>{children}</div>
    </section>
  );
};

export default CategoriesLayout;
