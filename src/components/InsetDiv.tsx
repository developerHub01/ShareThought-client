import * as React from "react";

import { cn } from "@/lib/utils";

const InsetDiv = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex w-full border border-input tracking-wide rounded-sm bg-accent p-2 shadow-inner",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
InsetDiv.displayName = "InsetDiv";

export { InsetDiv };
