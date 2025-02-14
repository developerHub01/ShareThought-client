import { cn } from "@/lib/utils";
import { BlockInterface } from "@/redux/features/builders/blogBuilderSlice";
import React from "react";

interface HeadingProps extends BlockInterface {
  className?: string;
  styles?: Record<string, string | number>;
}

const Heading = ({
  id,
  className,
  styles = {},
  text,
  type,
  children,
  ...props
}: HeadingProps) => {
  switch (type) {
    case "p":
      return (
        <p
          contentEditable
          suppressContentEditableWarning
          style={styles}
          className={cn("text-base", className)}
        >
          {text}
        </p>
      );
    case "h2":
      return (
        <h2
          contentEditable
          suppressContentEditableWarning
          style={styles}
          className={cn("text-3xl font-bold", className)}
        >
          {text}
        </h2>
      );
    case "h3":
      return (
        <h3
          contentEditable
          suppressContentEditableWarning
          style={styles}
          className={cn("text-2xl font-bold", className)}
        >
          {text}
        </h3>
      );
    case "h4":
      return (
        <h4
          contentEditable
          suppressContentEditableWarning
          style={styles}
          className={cn("text-xl font-bold", className)}
        >
          {text}
        </h4>
      );
    case "h5":
      return (
        <h5
          contentEditable
          suppressContentEditableWarning
          style={styles}
          className={cn("text-lg font-bold", className)}
        >
          {text}
        </h5>
      );
    case "h6":
      return (
        <h6
          contentEditable
          suppressContentEditableWarning
          style={styles}
          className={cn("text-base font-bold", className)}
        >
          {text}
        </h6>
      );
    default:
      return (
        <h1
          contentEditable
          suppressContentEditableWarning
          style={styles}
          className={cn("text-4xl font-bold", className)}
        >
          {text}
        </h1>
      );
  }
};

export default Heading;
