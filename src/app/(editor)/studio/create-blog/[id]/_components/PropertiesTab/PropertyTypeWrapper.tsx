import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

interface PropertyTypeWrapperProps {
  id: string;
  label: string;
  children: React.ReactNode;
}

const PropertyTypeWrapper = ({
  id,
  label,
  children,
}: PropertyTypeWrapperProps) => {
  return (
    <AccordionItem value={id} className="border-b">
      <AccordionTrigger className="p-3 border-b text-base bg-accent">
        {label}
      </AccordionTrigger>
      <AccordionContent className="h-full">{children}</AccordionContent>
    </AccordionItem>
  );
};

export default PropertyTypeWrapper;
