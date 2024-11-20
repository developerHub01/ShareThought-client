import React from "react";
import ReadLaterPostList from "@/app/(home)/read-later/_components/ReadLaterPostList";
import CategoriesTop from "@/components/categories/CategoriesTop";

const page = () => {
  return (
    <section className="mx-auto w-full">
      <CategoriesTop />
      <ReadLaterPostList />
    </section>
  );
};

export default page;
