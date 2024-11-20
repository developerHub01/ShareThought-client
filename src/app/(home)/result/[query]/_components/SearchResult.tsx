import HorizontalPostCard from "@/components/cards/post/HorizontalPostCard";
import SearchResultWrapper from "@/components/wrappers/SearchResultWrapper";
import React from "react";

const postList = new Array(50).fill(0);

const SearchResult = () => {
  return (
    <SearchResultWrapper className="py-4">
      {postList.map((_, index) => (
        <HorizontalPostCard key={index} />
      ))}
    </SearchResultWrapper>
  );
};

export default SearchResult;
