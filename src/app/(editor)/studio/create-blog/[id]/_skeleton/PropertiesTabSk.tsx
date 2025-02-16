import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const PropertiesTabSk = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4 p-3">
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <Skeleton key={index} className="w-full h-14" />
        ))}
    </div>
  );
};

export default PropertiesTabSk;
