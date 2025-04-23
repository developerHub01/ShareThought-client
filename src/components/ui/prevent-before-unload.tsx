"use client";

import { useEffect } from "react";

interface PreventBeforeUnloadProps {
  prevent?: boolean;
}

const PreventBeforeUnload = ({ prevent = false }: PreventBeforeUnloadProps) => {
  useEffect(() => {
    if (!prevent) return;

    const beforeUnloadEventHandler = (e: BeforeUnloadEvent) => {
      e.preventDefault();

      return "You have attempted to leave this page. Are you sure?";
    };

    addEventListener("beforeunload", beforeUnloadEventHandler);

    return () => {
      removeEventListener("beforeunload", beforeUnloadEventHandler);
    };
  }, [prevent]);

  return null;
};

export default PreventBeforeUnload;
