"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useMemo, useRef } from "react";

interface FocusTrapProps {
  children?: React.ReactNode;
  selectorExclude?: string[];
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
  reCalculateable?: boolean;
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
  reCalculateable = false,
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

    let focusableElements: NodeListOf<Element> | null = null;
    let firstElement: HTMLElement | null = null;
    let lastElement: HTMLElement | null = null;

    if (!reCalculateable) {
      focusableElements = modalElement?.querySelectorAll(focusableSelectors);

      if (!focusableElements || focusableElements.length === 0) return;

      firstElement = focusableElements[0] as HTMLElement;
      lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;
    }

    const handleKeyPress = (e: globalThis.KeyboardEvent) => {
      if (!["Escape", "Tab"].includes(e.key)) return;

      if (e.key === "Escape" && onClose) return onClose();

      if (reCalculateable) {
        focusableElements = modalElement?.querySelectorAll(focusableSelectors);

        if (!focusableElements || focusableElements.length === 0) return;

        firstElement = focusableElements[0] as HTMLElement;
        lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;
      }

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
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
