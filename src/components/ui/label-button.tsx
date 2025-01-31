import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelButtonVariants = cva(
  "capitalize inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-colors [&_svg]:pointer-events-none [&_svg]:shrink-0 select-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        cta: "outline-none transition-all duration-75 rounded-full overflow-hidden grid place-items-center relative before:content-[''] before:absolute before:size-full before:rounded-full before:transition-all before:duration-100 before:scale-0 hover:before:scale-100 focus:before:bg-transparent hover:before:bg-gray-500/20 p-1 cursor-pointer [&_svg]:size-6 [&_svg]:stroke-[1.2px]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-sm px-3",
        lg: "h-11 rounded-sm px-8",
        icon: "h-10 w-10 [&_svg]:size-auto",
        smIcon: "h-9 w-9 [&_svg]:size-auto",
        autoHeight: "h-auto w-auto p-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface LabelButtonProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelButtonVariants> {
  asChild?: boolean;
}

const LabelButton = React.forwardRef<HTMLLabelElement, LabelButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "label";
    return (
      <Comp
        ref={ref}
        className={cn(labelButtonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
LabelButton.displayName = "LabelButton";

export { LabelButton, labelButtonVariants };
