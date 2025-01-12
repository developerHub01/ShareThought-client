import { TReactions } from "@/types";

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

export const defaultGlobalStyles = {};

export const CREATE_CHANNEL_SIZE = {
  CHANNEL_NAME_MAX_LENGTH: 50,
  CHANNEL_NAME_MIN_LENGTH: 1,
  CHANNEL_DESCRIPTION_MAX_LENGTH: 800,
};

export const EDITOR_TABLE_SIZE = {
  MAX_ROWS: 30,
  MIN_ROWS: 0,
  MAX_COLUMNS: 8,
  MIN_COLUMNS: 1,
};
