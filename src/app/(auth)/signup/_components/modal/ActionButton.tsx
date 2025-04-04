import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import clsx from "clsx";
import { LucideIcon } from "@/lib/icons";

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
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size={"icon"} {...props} className={clsx("", className)}>
            <Icon />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={8}>
          {label}
        </TooltipContent>
      </Tooltip>
    </>
  );
};

export default ActionButton;
