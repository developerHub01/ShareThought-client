import { REACTION_TYPES } from "@/constant";
import { LucideIcon } from "lucide-react";
import { MotionProps } from "motion/react";
import { BlockInterface } from "@/redux/features/builders/blogBuilderSlice";

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

/* Framer motion */
export type MotionDivProps = React.HTMLAttributes<HTMLDivElement> & MotionProps;
export type MotionSpanProps = React.HTMLAttributes<HTMLSpanElement> &
  MotionProps;

export interface BlogComponentBlock extends BlockInterface {
  postId?: string;
  styles?: Record<string, string | number>;
}

export type OrientationType = "vertical" | "horizontal";