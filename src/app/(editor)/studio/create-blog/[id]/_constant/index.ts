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
  LucideIcon,
} from "lucide-react";
import { BlockTypes } from "@/redux/features/builders/blogBuilderSlice";
import ButtonIcon from "@/app/(editor)/studio/create-blog/[id]/_components/ButtonIcon";

interface ComponentItem {
  id: BlockTypes;
  label: string;
  Icon: LucideIcon | React.ComponentType<unknown>;
}

export const componentItemList: Array<ComponentItem> = [
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
    id: "button",
    label: "Button",
    Icon: ButtonIcon,
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
    id: "collapse",
    label: "collaps",
    Icon: CollapsIcon,
  },
  {
    id: "spacer",
    label: "spacer",
    Icon: SpacerIcon,
  },
];

export const layoutItemList = [
  "12",
  "6/6",
  "8/4",
  "4/8",
  "4/4/4",
  "3/3/6",
  "6/3/3",
  "3/6/3",
  "3/3/3/3",
];