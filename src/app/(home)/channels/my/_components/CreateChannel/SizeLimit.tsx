import React from "react";

interface SizeLimitProps {
  size: number;
  limit: number;
}
const SizeLimit = ({ size = 0, limit }: SizeLimitProps) => {
  return (
    <span className="grid place-items-center p-2 px-2.5 rounded-sm bg-primary text-primary-foreground text-xs sm:text-sm flex-shrink-0 w-fit self-end">
      {size} / {limit}
    </span>
  );
};

export default SizeLimit;
