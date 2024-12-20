import { Button } from "@/components/buttons/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import clsx from "clsx";
import { LucideIcon } from "lucide-react";

interface ActionButtonProps {
  id: string;
  Icon: LucideIcon;
  label: string;
  className?: string;
  [key: string]: unknown;
}

const ActionButton = ({
  id,
  Icon,
  label,
  className,
  ...props
}: ActionButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size={"icon"}
          {...props}
          className={clsx("rounded-full aspect-square", className)}
        >
          <Icon />
        </Button>
      </TooltipTrigger>
      <TooltipContent sideOffset={8}>{label}</TooltipContent>
    </Tooltip>
  );
};

export default ActionButton;
