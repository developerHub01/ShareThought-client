"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TopActionList from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/TopActionList";
import TableLayout from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/TableLayout";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";

const PropertiesTab = () => {
  const { id: blogId } = useParams();
  const { activeBlock, components } = useAppSelector(
    (state) => state.blogBuilder.blogs[blogId as string]
  );

  if (!activeBlock) return null;

  const activeComponent = components[activeBlock];
  const activeComponentType = activeComponent.type;

  return (
    <div className="w-full h-full flex flex-col">
      <TopActionList />
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1" className="border-b">
          <AccordionTrigger className="px-3 py-2.5 border-b text-base">
            Layout
          </AccordionTrigger>
          <AccordionContent>
            {activeComponentType === "table" && <TableLayout />}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default PropertiesTab;
