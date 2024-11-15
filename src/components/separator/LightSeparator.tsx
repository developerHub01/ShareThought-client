import { Separator } from "@/components/ui/separator";
import clsx from "clsx";

interface LightSeparatorProps {
  className?: string | Array<string>;
}

const LightSeparator = ({ className }: LightSeparatorProps) => (
  <Separator className={clsx("opacity-30 mx-auto w-11/12", className)} />
);

export default LightSeparator;
