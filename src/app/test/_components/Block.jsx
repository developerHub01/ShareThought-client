"use client";

import React from "react";

const Block = ({ block, updateContent }) => {
  const handleInput = (e) => {
    updateContent(block.id, e.target.innerHTML);
  };

  return (
    <div
      contentEditable
      suppressContentEditableWarning
      onInput={handleInput}
      dangerouslySetInnerHTML={{ __html: block.content }}
      style={{
        fontSize: block.type === "heading" ? "24px" : "16px",
        fontWeight: block.type === "heading" ? "bold" : "normal",
      }}
    ></div>
  );
};

export default Block;
