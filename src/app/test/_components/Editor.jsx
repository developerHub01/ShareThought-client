"use client";

import React, { useState } from "react";
import Toolbar from "./Toolbar";
import Block from "./Block";

const Editor = () => {
  const [blocks, setBlocks] = useState([
    { id: 1, type: "heading", content: "Editable Heading" },
    { id: 2, type: "paragraph", content: "Editable paragraph" },
  ]);

  const updateBlockContent = (id, content) => {
    const updatedBlocks = blocks.map((block) =>
      block.id === id ? { ...block, content } : block
    );
    setBlocks(updatedBlocks);
  };

  const addBlock = (type) => {
    setBlocks([...blocks, { id: Date.now(), type, content: "" }]);
  };

  return (
    <div>
      <Toolbar addBlock={addBlock} />
      <div>
        {blocks.map((block) => (
          <Block
            key={block.id}
            block={block}
            updateContent={updateBlockContent}
          />
        ))}
      </div>
    </div>
  );
};

export default Editor;
