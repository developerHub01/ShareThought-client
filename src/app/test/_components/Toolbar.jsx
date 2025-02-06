"use client";

import React from "react";

const Toolbar = ({ addBlock }) => {
  const applyStyle = (command) => {
    document.execCommand(command, false, null); // Apply style to selected text
  };

  return (
    <div className="toolbar">
      <button onClick={() => applyStyle("bold")}>Bold</button>
      <button onClick={() => applyStyle("italic")}>Italic</button>
      <button onClick={() => applyStyle("underline")}>Underline</button>
      <button onClick={() => applyStyle("insertHTML", "<code>")}>Code</button>
      <button onClick={() => addBlock("heading")}>Add Heading</button>
      <button onClick={() => addBlock("paragraph")}>Add Paragraph</button>
    </div>
  );
};

export default Toolbar;
