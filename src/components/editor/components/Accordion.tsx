"use client";

import { AccordionProps } from "@/app/(editor)/studio/create-blog/[id]/_components/BlockComponent";
import {
  Accordion as AccordionWrapper,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { changeAccordionContent } from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch } from "@/redux/hooks";
import React, { FocusEvent } from "react";

const Accordion = ({
  children: { data },
  id,
  postId,
  ...props
}: AccordionProps) => {
  const dispatch = useAppDispatch();

  if (!postId) return null;

  const handleBlur = (
    type: "title" | "content",
    index: number,
    value: string
  ) => {
    dispatch(
      changeAccordionContent({
        blogId: postId as string,
        id,
        data: {
          [type]: value,
          index,
        },
      })
    );
  };

  return (
    <AccordionWrapper type="single" collapsible className="w-full">
      {data.map(({ id, title, content }, index) => (
        <AccordionItem value={id} key={id}>
          <AccordionTrigger>
            <div
              contentEditable={true}
              suppressContentEditableWarning
              onBlur={(e: FocusEvent<HTMLDivElement>) =>
                handleBlur("title", index, e.target.innerText ?? "")
              }
              className="w-full text-left"
            >
              {title}
            </div>
          </AccordionTrigger>
          <AccordionContent
            className="py-4"
            contentEditable={true}
            suppressContentEditableWarning
            onBlur={(e: FocusEvent<HTMLDivElement, Element>) =>
              handleBlur("content", index, e.target.innerText ?? "")
            }
          >
            {content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </AccordionWrapper>
  );
};

export default Accordion;
