import React from "react";

import { Plus as PlusIcon, Minus as MinusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ValueCounterProps {
  min: number;
  max: number;
  value: number;
  handleChange: () => void;
  handleIncrement: () => void;
  handleDecrement: () => void;
}

const ValueCounter = ({
  min,
  max,
  value,
  handleChange,
  handleIncrement,
  handleDecrement,
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
        min={min}
        max={max}
        className="w-10 text-center rounded-none"
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
