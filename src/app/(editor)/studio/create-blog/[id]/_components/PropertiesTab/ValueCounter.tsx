import React, { ChangeEvent } from "react";

import { Plus as PlusIcon, Minus as MinusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ValueCounterProps {
  min?: number;
  max?: number;
  value: number;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleIncrement: () => void;
  handleDecrement: () => void;
}

const ValueCounter = ({
  value,
  handleChange,
  handleIncrement,
  handleDecrement,
  ...props
}: ValueCounterProps) => {
  return (
    <div className="flex">
      <Button
        size={"icon"}
        variant={"outline"}
        onClick={handleDecrement}
        className="rounded-r-none"
      >
        <MinusIcon size={16} />
      </Button>
      <Input
        type="number"
        value={value}
        onChange={handleChange}
        className="w-10 text-center rounded-none"
        {...props}
      />
      <Button
        size={"icon"}
        variant={"outline"}
        onClick={handleIncrement}
        className="rounded-l-none"
      >
        <PlusIcon size={16} />
      </Button>
    </div>
  );
};

export default ValueCounter;
