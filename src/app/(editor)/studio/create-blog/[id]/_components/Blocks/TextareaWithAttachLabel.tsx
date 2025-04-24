"use client";

import React, { ChangeEvent, FocusEvent } from "react";
import { Textarea } from "@/components/ui/textarea";

interface TextareaWithAttachLabelProps {
  value: string;
  label: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onBlur: (value: string) => void;
}

const TextareaWithAttachLabel = ({
  label,
  value,
  onChange,
  onBlur,
  placeholder = "",
}: TextareaWithAttachLabelProps) => {
  const id = label?.toLowerCase()?.replaceAll(" ", "_");

  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor={id}
        className="w-full px-2 py-1 flex-shrink-0 border border-b-0 h-10 flex items-center rounded-sm rounded-b-none capitalize"
      >
        {label}
      </label>
      <Textarea
        id={id}
        className="w-full rounded-t-none max-h-40"
        placeholder={placeholder}
        value={value}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          onChange(e.target.value)
        }
        onBlur={(e: FocusEvent<HTMLTextAreaElement>) => onBlur(e.target.value)}
      />
    </div>
  );
};

export default TextareaWithAttachLabel;
