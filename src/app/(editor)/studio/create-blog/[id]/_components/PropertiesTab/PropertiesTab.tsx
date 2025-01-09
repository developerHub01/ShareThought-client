"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TopActionList from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/TopActionList";
import TableLayout from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/TableLayout";

const PropertiesTab = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <TopActionList />
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-b">
          <AccordionTrigger className="px-3 py-2.5 border-b">
            Layout
          </AccordionTrigger>
          <AccordionContent>
            <TableLayout />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default PropertiesTab;
