import { ElementType } from "react";

export const typographyList: Record<string, { tag: ElementType; className: string }> =
  {
    h1: { tag: "h1", className: "text-4xl font-bold" },
    h2: { tag: "h2", className: "text-3xl font-bold" },
    h3: { tag: "h3", className: "text-2xl font-bold" },
    h4: { tag: "h4", className: "text-xl font-bold" },
    h5: { tag: "h5", className: "text-lg font-bold" },
    h6: { tag: "h6", className: "text-base font-bold" },
    p: { tag: "p", className: "text-base" },
  };
