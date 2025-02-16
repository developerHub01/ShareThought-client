import React from "react";

import { LucideIcon } from "lucide-react";

interface ComponentButtonProps {
  label: string;
  onClick: () => void;
  Icon: LucideIcon | React.ComponentType<unknown>;
}

const ComponentButton = ({ label, onClick, Icon }: ComponentButtonProps) => {
  return (
    <button
      type="button"
      className="flex flex-col bg-accent rounded-sm p-2 justify-center items-center gap-2 aspect-square ring-2 ring-transparent hover:ring-primary/50 duration-150 shadow-md hover:shadow-2xl"
      onClick={onClick}
    >
      <Icon size={35} />
      <span className="capitalize">{label}</span>
    </button>
  );
};

export default ComponentButton;
