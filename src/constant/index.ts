import { CSSProperties, ElementType } from "react";
import { TReactions } from "@/types";
import {
  BlockTypes,
  StyleType,
  TypographyType,
} from "@/redux/features/builders/blogBuilderSlice";

export const REACTION_TYPES = {
  LIKE: "LIKE",
  LOVE: "LOVE",
  WOW: "WOW",
  CLAP: "CLAP",
  HELPFUL: "HELPFUL",
  INSPIRING: "INSPIRING",
} as const;

export const REACTION_LIST: Array<TReactions> = Object.keys(
  REACTION_TYPES
) as TReactions[];

export const REACTION_MAP: Record<TReactions, string> = {
  LIKE: "/reaction-icons/like.png",
  LOVE: "/reaction-icons/love.png",
  WOW: "/reaction-icons/wow.png",
  CLAP: "/reaction-icons/clap.png",
  HELPFUL: "/reaction-icons/helpful.png",
  INSPIRING: "/reaction-icons/inspiring.png",
};

export const COMMUNITY_POST_TYPES = {
  TEXT: "TEXT",
  IMAGE: "IMAGE",
  POST_SHARE: "POST_SHARE",
  POLL: "POLL",
  POLL_WITH_IMAGE: "POLL_WITH_IMAGE",
  QUIZ: "QUIZ",
} as const;

export const COMMUNITY_POST_TYPE_LIST: Array<string> =
  Object.keys(COMMUNITY_POST_TYPES);

export const aspectRatioList = {
  banner: [214, 61],
};

export const CREATE_CHANNEL_SIZE = {
  CHANNEL_NAME_MAX_LENGTH: 50,
  CHANNEL_NAME_MIN_LENGTH: 1,
  CHANNEL_DESCRIPTION_MAX_LENGTH: 800,
};

export const EDITOR_TABLE_SIZE = {
  MAX_ROWS: 30,
  MIN_ROWS: 0,
  DEFAULT_ROWS: 3,
  MAX_COLUMNS: 8,
  MIN_COLUMNS: 1,
  DEFAULT_COLUMNS: 2,
  MIN_BORDER_SIZE: 0,
  DEFAULT_BORDER_SIZE: 1,
  MAX_BORDER_SIZE: 15,
  DEFAULT_BORDER_COLOR: "#323232",
  DEFAULT_BACKGROUND_COLOR: "#ffffff",
  DEFAULT_TEXT_COLOR: "#242424",
  STRIPED_ROW_DEFAULT_BACKGROUND_COLOR: "#e9e8e8",
  DEFAULT_HEADER_BACKGROUND_COLOR: "#f2f2f2",
  DEFAULT_HEADER_TEXT_COLOR: "#101112",
  MIN_HEADER_FONT_SIZE: 1,
  MAX_HEADER_FONT_SIZE: 200,
  DEFAULT_HEADER_FONT_SIZE: 14,
  DEFAULT_HEADER_FONT_WEIGHT: "bold",
  DEFAULT_ALIGN: "left",
  DEFAULT_CONTENT_TEXT_COLOR: "#101112",
  DEFAULT_CONTENT_FONT_SIZE: 16,
  DEFAULT_CONTENT_FONT_WEIGHT: "normal",
  MIN_CONTENT_FONT_SIZE: 1,
  MAX_CONTENT_FONT_SIZE: 200,
  DEFAULT_CONTENT_LETTER_SPACING: 0,
  MAX_CONTENT_LETTER_SPACING: 50,
  MIN_CONTENT_LETTER_SPACING: -10,
  DEFAULT_CONTENT_LINE_HEIGHT: 1.2,
  DEFAULT_CONTENT_TEXT_DIRECTION: "ltr",
};

export const EDITOR_TYPOGRAPHY_SIZE = {
  FONT_SIZE: {
    MIN: 8,
    MAX: 60,
    DEFAULT: {
      h1: 36,
      h2: 30,
      h3: 24,
      h4: 20,
      h5: 18,
      h6: 16,
      p: 16,
      button: 16,
    },
  },
  LETTER_SPACING: {
    MIN: -10,
    MAX: 20,
    DEFAULT: 0,
  },
  COLOR: {
    DEFAULT: {
      h1: "#212121",
      h2: "#212121",
      h3: "#212121",
      h4: "#212121",
      h5: "#212121",
      h6: "#212121",
      p: "#343434",
      button: "#ffffff",
      default: "#212121",
    },
  },
};

export const GAP_SIZE = {
  DEFAULT: 0,
  MIN: 0,
  MAX: 50,
};

export const PADDING_MARGIN_LIMITS = {
  DEFAULT: 0,
  MIN: {
    margin: -100,
    padding: 0,
  },
  MAX: {
    margin: 100,
    padding: 100,
  },
};

export const TYPOGRAPHY_LIST: Record<
  string,
  { tag: ElementType; className: string }
> = {
  h1: { tag: "h1", className: "text-4xl font-bold" },
  h2: { tag: "h2", className: "text-3xl font-bold" },
  h3: { tag: "h3", className: "text-2xl font-bold" },
  h4: { tag: "h4", className: "text-xl font-bold" },
  h5: { tag: "h5", className: "text-lg font-bold" },
  h6: { tag: "h6", className: "text-base font-bold" },
  p: { tag: "p", className: "text-base" },
};

export const DEFAULT_MARGIN_LIST: Partial<Record<BlockTypes, StyleType>> = {
  h1: {
    marginTop: 0,
    marginBottom: 20,
  },
  h2: {
    marginTop: 0,
    marginBottom: 18,
  },
  h3: {
    marginTop: 0,
    marginBottom: 16,
  },
  h4: {
    marginTop: 0,
    marginBottom: 14,
  },
  h5: {
    marginTop: 0,
    marginBottom: 12,
  },
  h6: {
    marginTop: 0,
    marginBottom: 10,
  },
  p: {
    marginTop: 0,
    marginBottom: 15,
  },
  button: {
    marginTop: 0,
    marginBottom: 10,
  },
};

export const DEFAULT_LINEHEIGHT_LIST: Partial<Record<BlockTypes, string>> = {
  h1: "1.2",
  h2: "1.2",
  h3: "1.2",
  h4: "1.2",
  h5: "1.2",
  h6: "1.2",
  p: "1.2",
  button: "1.2",
};

export const DEFAULT_FONTWEIGHT_LIST: Partial<Record<BlockTypes, string>> = {
  h1: "normal",
  h2: "normal",
  h3: "normal",
  h4: "normal",
  h5: "normal",
  h6: "normal",
  p: "normal",
  button: "normal",
};

export const DEFAULT_LETTERSPACING_LIST: Partial<Record<BlockTypes, number>> = {
  h1: 0,
  h2: 0,
  h3: 0,
  h4: 0,
  h5: 0,
  h6: 0,
  p: 0,
  button: 0,
};

export const typographyTypeList: Array<{
  id: TypographyType;
  label: string;
}> = [
  {
    id: "h1",
    label: "Heading 1",
  },
  {
    id: "h2",
    label: "Heading 2",
  },
  {
    id: "h3",
    label: "Heading 3",
  },
  {
    id: "h4",
    label: "Heading 4",
  },
  {
    id: "h5",
    label: "Heading 5",
  },
  {
    id: "h6",
    label: "Heading 6",
  },
  {
    id: "p",
    label: "Paragraph",
  },
];

export const defaultGlobalStyles = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "button",
].reduce((acc, curr) => {
  acc[curr] = {
    fontSize:
      EDITOR_TYPOGRAPHY_SIZE.FONT_SIZE.DEFAULT[
        curr as keyof typeof EDITOR_TYPOGRAPHY_SIZE.FONT_SIZE.DEFAULT
      ],
    fontWeight:
      DEFAULT_FONTWEIGHT_LIST[curr as keyof typeof DEFAULT_FONTWEIGHT_LIST],
    lineHeight:
      DEFAULT_LINEHEIGHT_LIST[curr as keyof typeof DEFAULT_LINEHEIGHT_LIST],
    letterSpacing:
      DEFAULT_LETTERSPACING_LIST[
        curr as keyof typeof DEFAULT_LETTERSPACING_LIST
      ],
    ...DEFAULT_MARGIN_LIST.h1,
  };

  return acc;
}, {} as Record<string, Record<string, unknown>>);
