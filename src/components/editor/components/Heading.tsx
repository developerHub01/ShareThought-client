import { BlockInterface } from "@/redux/features/builders/blogBuilderSlice";
import clsx from "clsx";
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
    case "h1":
      return (
        <h1
          contentEditable
          suppressContentEditableWarning
          style={styles}
          className={className}
        >
          {text}
        </h1>
      );
    case "h2":
      return (
        <h2 style={styles} className={className}>
          {text}
        </h2>
      );
    case "h3":
      return (
        <h3 style={styles} className={className}>
          {text}
        </h3>
      );
    case "h4":
      return (
        <h4 style={styles} className={className}>
          {text}
        </h4>
      );
    case "h5":
      return (
        <h5 style={styles} className={className}>
          {text}
        </h5>
      );
    case "h6":
      return (
        <h6 style={styles} className={className}>
          {text}
        </h6>
      );
    default:
      return (
        <h1 style={styles} className={className}>
          {text}
        </h1>
      );
  }
};

export default Heading;
