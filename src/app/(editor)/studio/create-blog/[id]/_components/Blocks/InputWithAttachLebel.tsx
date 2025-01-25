"use client";

import React, { ChangeEvent, FocusEvent } from "react";
import { Input } from "@/components/ui/input";

interface InputWithAttachLebelProps {
  value: string;
  label: string;
  onChange: (value: string) => void;
  onBlur: (value: string) => void;
}

const InputWithAttachLebel = ({
  label,
  value,
  onChange,
  onBlur,
}: InputWithAttachLebelProps) => {
  const id = label?.toLowerCase()?.replaceAll(" ", "_");

  return (
    <div className="flex items-center w-full">
      <label
        htmlFor={id}
        className="px-2 py-1 flex-shrink-0 border border-r-0 h-10 flex justify-center items-center rounded-l-sm"
      >
        {label}
      </label>
      <Input
        id={id}
        className="w-full"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        onBlur={(e: FocusEvent<HTMLInputElement>) => onBlur(e.target.value)}
      />
    </div>
  );
};

export default InputWithAttachLebel;
