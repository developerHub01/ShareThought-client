import CategoryPreviewCard from "@/components/cards/post/CategoryPreviewCard";
import CategoryListWraper from "@/components/wrappers/CategoryListWraper";
import React from "react";

const SaveCategoryList = () => {
  return (
    <CategoryListWraper>
      {Array(20)
        .fill(0)
        .map((_, index) => (
          <CategoryPreviewCard key={index} />
        ))}
    </CategoryListWraper>
  );
};

export default SaveCategoryList;
