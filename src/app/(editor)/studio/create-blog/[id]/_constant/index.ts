import { BlockTypes } from "@/redux/features/builders/blogBuilderSlice";
import ButtonIcon from "@/app/(editor)/studio/create-blog/[id]/_components/ButtonIcon";
import {
  H1Icon,
  H2Icon,
  H3Icon,
  H4Icon,
  H5Icon,
  H6Icon,
  ParagraphIcon,
  CodeIcon,
  VideoIcon,
  DividerIcon,
  ListIcon,
  TableIcon,
  BlockquoteIcon,
  AccordionIcon,
  CollapseIcon,
  SpacerIcon,
  ImageIcon,
  LucideIcon,
} from "@/lib/icons";

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
    Icon: H1Icon,
  },
  {
    id: "h2",
    label: "heading 2",
    Icon: H2Icon,
  },
  {
    id: "h3",
    label: "heading 3",
    Icon: H3Icon,
  },
  {
    id: "h4",
    label: "heading 4",
    Icon: H4Icon,
  },
  {
    id: "h5",
    label: "heading 5",
    Icon: H5Icon,
  },
  {
    id: "h6",
    label: "heading 6",
    Icon: H6Icon,
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
    id: "video",
    label: "video",
    Icon: VideoIcon,
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
    label: "collapse",
    Icon: CollapseIcon,
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
