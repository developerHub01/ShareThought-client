"use client";
import React, { useRef, useState } from "react";
import * as Popover from "@radix-ui/react-popover";

const EditorWithPopover = () => {
  const editorRef = useRef < HTMLDivElement > null;
  const [popover, setPopover] = useState({ visible: false, x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState("");

  // Function to handle text selection
  const handleSelection = () => {
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);

    if (range && !selection.isCollapsed) {
      const rect = range.getBoundingClientRect();

      setPopover({
        visible: true,
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY - 40,
      });

      setSelectedText(selection.toString());
    } else {
      setPopover({ visible: false, x: 0, y: 0 });
    }
  };

  // Function to apply formatting (e.g., bold, italic)
  const applyStyle = (command) => {
    document.execCommand(command, false, null);
    setPopover({ visible: false, x: 0, y: 0 });
  };

  return (
    <div className="relative">
      {/* Editable content area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onMouseUp={handleSelection}
        onKeyUp={handleSelection}
        className="p-4 border border-gray-300 rounded-md min-h-[150px] focus:outline-none"
      >
        Select some text to see the menu.
      </div>

      {/* Popover Menu */}
      <Popover.Root open={popover.visible}>
        <Popover.Trigger asChild>
          <div
            style={{
              position: "absolute",
              top: popover.y,
              left: popover.x,
            }}
          />
        </Popover.Trigger>

        <Popover.Content
          align="center"
          side="top"
          sideOffset={8}
          className="bg-white shadow-lg rounded-md p-2 flex space-x-2 border border-gray-200"
        >
          <button
            onClick={() => applyStyle("bold")}
            className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Bold
          </button>
          <button
            onClick={() => applyStyle("italic")}
            className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Italic
          </button>
          <button
            onClick={() => applyStyle("underline")}
            className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Underline
          </button>
          <button
            onClick={() => applyStyle("insertHTML")}
            className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Code
          </button>
        </Popover.Content>
      </Popover.Root>
    </div>
  );
};

export default EditorWithPopover;
