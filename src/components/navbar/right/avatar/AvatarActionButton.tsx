"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Check as ActiveIcon, LucideIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type AvatarActionButtonProps = {
  id?: string;
  label: string;
  Icon?: LucideIcon;
  IndicatorIcon?: LucideIcon;
  link?: string;
  isActive?: boolean;
  havePrefix?: boolean;
  onClick?: () => void;
} & Record<string, unknown>;

const AvatarActionButton = ({ link, ...props }: AvatarActionButtonProps) => {
  return (
    <>
      {link ? (
        <Link href={link}>
          <CustomButton {...props} />
        </Link>
      ) : (
        <CustomButton {...props} />
      )}
    </>
  );
};

const CustomButton = ({
  label,
  Icon,
  IndicatorIcon,
  isActive,
  havePrefix,
  onClick = () => {},
  ...props
}: AvatarActionButtonProps) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const handleAction = () => {
    onClick();

    /* if there indication icon then it means that it is a accordion like component so then enable active unactive mode */
    if (IndicatorIcon) setOpen((prev) => !prev);
  };

  return (
    <Button
      variant={"ghost"}
      className={clsx(
        "rounded-none flex justify-between items-center gap-1 capitalize w-full",
        {
          "bg-accent": isActive || isOpen,
        }
      )}
      onClick={handleAction}
      {...props}
    >
      {havePrefix && (
        <span className="w-6">{isActive && <ActiveIcon size={20} />}</span>
      )}
      <span className="flex items-center gap-3 flex-1">
        {Icon && <Icon size={20} />}
        {label}
      </span>
      {IndicatorIcon && (
        <span
          className={clsx("transition-transform duration-100", {
            "rotate-90": isOpen,
            "rotate-0": !isOpen,
          })}
        >
          <IndicatorIcon size={20} />
        </span>
      )}
    </Button>
  );
};

export default AvatarActionButton;
