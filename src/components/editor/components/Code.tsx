"use client";

import { useParams } from "next/navigation";
import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeProps {
  id: string;
}

export type { CodeProps };

const Code = ({ id, ...props }: CodeProps) => {
  const [code, setCode] = useState("");

  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    //  onChange(e.target.value); // Pass updated code back to blog JSON
  };

  return (
    <div>
      <textarea
        value={code}
        onChange={handleCodeChange}
        rows={6}
        style={{
          width: "100%",
          fontFamily: "monospace",
          background: "#282C34",
          color: "#fff",
          padding: "10px",
          border: "1px solid #444",
          borderRadius: "5px",
        }}
      />
      <SyntaxHighlighter
        language={"javascript"}
        style={oneDark}
        showLineNumbers
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default Code;
