"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useMemo, useRef } from "react";

interface FocusTrapProps {
  children?: React.ReactNode;
  selectorExclude?: string[];
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

const focusSelectorsList = [
  "button",
  "[href]",
  "input",
  "select",
  "textarea",
  "[tabindex]:not([tabindex='-1'])",
];

const FocusTrap = ({
  children,
  selectorExclude = [],
  className,
  isOpen,
  onClose,
}: FocusTrapProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const focusableSelectors = useMemo(
    () =>
      focusSelectorsList
        .filter((item) => !selectorExclude?.includes(item))
        .join(", "),
    [selectorExclude]
  );

  useEffect(() => {
    if (isOpen === false) return;

    const modalElement = modalRef.current;

    if (!modalElement) return;

    const focusableElements =
      modalElement?.querySelectorAll(focusableSelectors);

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleKeyPress = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Tab") {
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      } else if (event.key === "Escape" && onClose) onClose();
    };

    modalElement.addEventListener("keydown", handleKeyPress);

    return () => {
      modalElement.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, onClose, focusableSelectors]);

  return (
    <div ref={modalRef} className={cn("", className)}>
      {children}
    </div>
  );
};

export default FocusTrap;
