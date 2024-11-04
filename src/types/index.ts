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
