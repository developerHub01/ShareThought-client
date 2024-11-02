import { LucideIcon } from "lucide-react";

export interface ICTAMenuItem {
  id: string;
  label?: string;
  Icon?: LucideIcon;
  type?: "separator";
  onClick?: () => void;
}
