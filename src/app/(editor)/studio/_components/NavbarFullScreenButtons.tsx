"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Expand as FullScreenIcon,
  Minimize as SmallScreenIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditor } from "@/app/(editor)/studio/create-blog/[id]/_context/EditorProvider";
import { useFullScreen } from "@/hooks/use-full-screen";

const NavbarFullScreenButtons = () => {
  const { containerRef } = useEditor();
  const { isFullscreen, toggleFullscreen } = useFullScreen({
    containerRef,
  });

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" onClick={toggleFullscreen} size="smIcon">
            {isFullscreen ? (
              <SmallScreenIcon size={18} />
            ) : (
              <FullScreenIcon size={18} />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {isFullscreen ? "Exit Full Screen" : "Enter Full Screen"}
            Add to library
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NavbarFullScreenButtons;
