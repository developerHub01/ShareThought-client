import React, { ChangeEvent } from "react";

import { Plus as PlusIcon, Minus as MinusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

interface ValueCounterProps {
  min?: number;
  max?: number;
  value: number;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleIncrement: () => void;
  handleDecrement: () => void;
  separate?: boolean;
}

const ValueCounter = ({
  value,
  handleChange,
  handleIncrement,
  handleDecrement,
  separate = true,
  ...props
}: ValueCounterProps) => {
  return (
    <div className="flex">
      <Button
        size={"icon"}
        variant={"outline"}
        onClick={handleDecrement}
        className={clsx("", {
          "rounded-r-none": separate,
          "rounded-none": !separate,
        })}
      >
        <MinusIcon size={16} />
      </Button>
      <Input
        type="number"
        value={value}
        onChange={handleChange}
        className="w-12 text-center rounded-none"
        {...props}
      />
      <Button
        size={"icon"}
        variant={"outline"}
        onClick={handleIncrement}
        className={clsx("", {
          "rounded-r-none": separate,
          "rounded-none": !separate,
        })}
      >
        <PlusIcon size={16} />
      </Button>
    </div>
  );
};

export default ValueCounter;
