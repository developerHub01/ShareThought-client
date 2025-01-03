import React from "react";
import HistoryPostCard from "@/components/cards/post/HistoryPostCard";

const HistoryPage = () => {
  return (
    <div className="grid gap-5">
      {Array(20)
        .fill(0)
        .map((_, index) => (
          <HistoryPostCard key={index} />
        ))}
    </div>
  );
};

export default HistoryPage;
