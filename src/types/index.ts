import { REACTION_TYPES } from "@/constant";
import { LucideIcon } from "lucide-react";

export interface ICTAMenuItem {
  id: string;
  label?: string;
  Icon?: LucideIcon;
  type?: "separator";
  onClick?: () => void;
}

export type TReactionTypes =
  (typeof REACTION_TYPES)[keyof typeof REACTION_TYPES];

export interface IPopoverPosition {
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
}

export type TReactions =
  | "LIKE"
  | "LOVE"
  | "WOW"
  | "CLAP"
  | "HELPFUL"
  | "INSPIRING";

export type TCommunityPostType =
  | "TEXT"
  | "IMAGE"
  | "POST_SHARE"
  | "POLL"
  | "POLL_WITH_IMAGE"
  | "QUIZ";
