import React from "react";

import { cn } from "@/lib/utils";

interface LayoutButtonProps {
  className?: string;
  onClick?: () => void;
  sizes: Array<number>;
}

const LayoutButton = ({
  className = "",
  onClick = () => {},
  sizes,
}: LayoutButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        "w-full h-20 flex items-center border rounded-sm p-2 gap-2 ring-2 ring-transparent hover:ring-primary/50 duration-150 hover:shadow-xl",
        className
      )}
      onClick={onClick}
    >
      {sizes.map((size, index) => (
        <div
          key={index}
          className="h-full bg-accent border rounded-sm grid place-items-center text-base"
          style={{
            width: `${(size / 12) * 100}%`,
          }}
        >
          {size}
        </div>
      ))}
    </button>
  );
};

export default LayoutButton;
