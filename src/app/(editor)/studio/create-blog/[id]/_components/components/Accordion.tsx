"use client";

import {
  Accordion as AccordionWrapper,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AccordionInterface,
  changeAccordionContent,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import React, { FocusEvent } from "react";

interface AccordionProps {
  id: string;
  parentId?: string;
}

const Accordion = ({ id, parentId, ...props }: AccordionProps) => {
  const { id: blogId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  if (!blogId) return null;

  const {
    components,
    activeBlock,
    metaData: { styles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  if (!activeBlock) return null;

  const component = components[activeBlock];

  const { data } = component.children as AccordionInterface;

  const blockStyles = styles[id];

  const handleBlur = (
    type: "title" | "content",
    index: number,
    value: string
  ) => {
    dispatch(
      changeAccordionContent({
        blogId: blogId as string,
        id,
        data: {
          [type]: value,
          index,
        },
      })
    );
  };

  return (
    <div
      style={{
        ...(blockStyles as Record<string, string | number>),
      }}
    >
      <AccordionWrapper type="single" collapsible className="w-full">
        {data.map(({ id, title, content }, index) => (
          <AccordionItem value={id} key={id}>
            <AccordionTrigger className="px-2">
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
              className="py-4 px-2"
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
    </div>
  );
};

export default Accordion;
