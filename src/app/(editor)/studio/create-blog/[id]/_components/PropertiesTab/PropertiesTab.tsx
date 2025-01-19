"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TableLayout from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/TableLayout";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import TableHeader from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/TableHeader";

const PropertiesTab = () => {
  const { id: blogId } = useParams();
  const { activeBlock, components } = useAppSelector(
    (state) => state.blogBuilder.blogs[blogId as string]
  );

  if (!activeBlock) return null;

  const activeComponent = components[activeBlock];
  const activeComponentType = activeComponent.type;

  return (
    <div className="w-full h-full">
      <Accordion type="multiple" className="h-full w-full">
        <AccordionItem value="table_layout" className="border-b">
          <AccordionTrigger className="px-3 py-2.5 border-b text-base bg-accent">
            Layout
          </AccordionTrigger>
          <AccordionContent className="h-full">
            {activeComponentType === "table" && <TableLayout />}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="tabl_header" className="border-b">
          <AccordionTrigger className="px-3 py-2.5 border-b text-base bg-accent">
            Header
          </AccordionTrigger>
          <AccordionContent className="h-full">
            {activeComponentType === "table" && <TableHeader />}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default PropertiesTab;
