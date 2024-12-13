import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Pilcrow as ParagraphIcon,
  Heading1 as Heading1Icon,
  Heading2 as Heading2Icon,
  Heading3 as Heading3Icon,
  Heading4 as Heading4Icon,
  Heading5 as Heading5Icon,
  Heading6 as Heading6Icon,
  Code as CodeIcon,
  Minus as DividerIcon,
  Image as ImageIcon,
  List as ListIcon,
  Table as TableIcon,
  TextQuote as BlockquoteIcon,
  ListCollapse as AccordionIcon,
  ChevronsDownUp as CollapsIcon,
  AlignVerticalSpaceAround as SpacerIcon,
} from "lucide-react";

const componentItemList = [
  {
    id: "p",
    label: "paragraph",
    Icon: ParagraphIcon,
  },
  {
    id: "h1",
    label: "heading 1",
    Icon: Heading1Icon,
  },
  {
    id: "h2",
    label: "heading 2",
    Icon: Heading2Icon,
  },
  {
    id: "h3",
    label: "heading 3",
    Icon: Heading3Icon,
  },
  {
    id: "h4",
    label: "heading 4",
    Icon: Heading4Icon,
  },
  {
    id: "h5",
    label: "heading 5",
    Icon: Heading5Icon,
  },
  {
    id: "h6",
    label: "heading 6",
    Icon: Heading6Icon,
  },
  {
    id: "code",
    label: "code",
    Icon: CodeIcon,
  },
  {
    id: "divider",
    label: "divider",
    Icon: DividerIcon,
  },
  {
    id: "image",
    label: "image",
    Icon: ImageIcon,
  },
  {
    id: "list",
    label: "list",
    Icon: ListIcon,
  },
  {
    id: "table",
    label: "table",
    Icon: TableIcon,
  },
  {
    id: "blockquote",
    label: "block quote",
    Icon: BlockquoteIcon,
  },
  {
    id: "accordion",
    label: "accordion",
    Icon: AccordionIcon,
  },
  {
    id: "collaps",
    label: "collaps",
    Icon: CollapsIcon,
  },
  {
    id: "spacer",
    label: "spacer",
    Icon: SpacerIcon,
  },
];

const ComponentList = () => {
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 p-2">
      <TooltipProvider>
        {componentItemList.map(({ id, label, Icon }) => (
          <Tooltip key={id}>
            <TooltipTrigger asChild>
              <button className="flex flex-col bg-accent rounded-sm p-2 justify-center items-center gap-2 aspect-square ring-2 ring-transparent hover:ring-primary/50 duration-150 hover:shadow-xl">
                <Icon size={35} />
                <span className="capitalize">{label}</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
};

export default ComponentList;
