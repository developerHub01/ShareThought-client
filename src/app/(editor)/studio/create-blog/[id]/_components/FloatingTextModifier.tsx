"use client";

import React, { useState, useRef, useEffect } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LucideIcon,
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  Strikethrough as StrikeIcon,
  Code as CodeIcon,
  Superscript as SupIcon,
  Subscript as SubIcon,
} from "lucide-react";
import ColorPicker from "@/components/ui/ColorPicker";

const actionList: Array<{
  id: string;
  Icon: LucideIcon;
}> = [
  {
    id: "bold",
    Icon: BoldIcon,
  },
  {
    id: "underline",
    Icon: UnderlineIcon,
  },
  {
    id: "italic",
    Icon: ItalicIcon,
  },
  {
    id: "strikeThrough",
    Icon: StrikeIcon,
  },
  {
    id: "sup",
    Icon: SupIcon,
  },
  {
    id: "sub",
    Icon: SubIcon,
  },
];

const FloatingTextModifier = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });

  // Toggle Inline Styles
  const toggleStyle = (command: string, value?: string) => {
    document.execCommand(command, false, value || "");
    setPopoverVisible(false);
  };

  // Handle Text Selection
  const handleSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      if (!selection.isCollapsed) {
        setPopoverVisible(true);

        let left = rect.left;
        let top = rect.top - 50;

        // Popover adjustment
        setTimeout(() => {
          const popoverWidth = popoverRef.current?.offsetWidth || 0;
          const viewportWidth = window.innerWidth;

          if (left + popoverWidth > viewportWidth) {
            left = viewportWidth - popoverWidth - 10;
          }

          setPopoverPosition({ top, left });
        }, 0);
      } else {
        setPopoverVisible(false);
      }
    } else {
      setPopoverVisible(false);
    }
  };

  // Hide popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setPopoverVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="border border-gray-300 p-4 rounded-md min-h-[200px] focus:outline-none"
        onMouseUp={handleSelection}
        onKeyUp={handleSelection}
      >
        Select text to format...
      </div>

      {isPopoverVisible && (
        <div
          ref={popoverRef}
          className="fixed bg-white border shadow-lg rounded-md p-1 flex flex-wrap gap-2 z-50"
          style={{ top: popoverPosition.top, left: popoverPosition.left }}
        >
          <ToggleGroup type="multiple">
            {actionList.map(({ id, Icon }) => (
              <ToggleGroupItem
                key={id}
                value={id}
                aria-label={`Toggle ${id}`}
                onClick={() => toggleStyle(id)}
              >
                <Icon className="h-4 w-4" />
              </ToggleGroupItem>
            ))}
            <ToggleGroupItem
              key="formatBlock"
              value="formatBlock"
              aria-label="Toggle code"
              onClick={() => toggleStyle("code")}
            >
              <CodeIcon />
            </ToggleGroupItem>
          </ToggleGroup>
          {/* Font Size */}
          <FontSize
            onChange={(value: string) => toggleStyle("fontSize", value)}
          />
          {/* Text Color */}
          {/* <ColorPicker color="#232323" onChange={} />
          <ColorPicker color="#232323" onChange={} /> */}
        </div>
      )}
    </div>
  );
};

interface FontSizeProps {
  onChange: (value: string) => void;
}

const FontSize = ({ onChange }: FontSizeProps) => {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Font size" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="12">12px</SelectItem>
          <SelectItem value="14">14px</SelectItem>
          <SelectItem value="16">16px</SelectItem>
          <SelectItem value="18">18px</SelectItem>
          <SelectItem value="20">20px</SelectItem>
          <SelectItem value="22">22px</SelectItem>
          <SelectItem value="24">24px</SelectItem>
          <SelectItem value="26">26px</SelectItem>
          <SelectItem value="28">28px</SelectItem>
          <SelectItem value="30">30px</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FloatingTextModifier;
