"use client";

import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import LayoutList from "@/app/(editor)/studio/create-blog/[id]/_components/BuilderPopover/LayoutList";
import ComponentList from "@/app/(editor)/studio/create-blog/[id]/_components/BuilderPopover/ComponentList";
import { useEditor } from "@/app/(editor)/studio/create-blog/[id]/_context/EditorProvider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddComponentSection from "@/app/(editor)/studio/create-blog/[id]/_components/BuilderPopover/AddComponentSection";

const ComponentDialog = () => {
  const { isComponentDialogOpen, setIsComponentDialogOpen, setSelectedIndex } =
    useEditor();
  const handleOpenChange = (value: boolean) => {
    setIsComponentDialogOpen(value);
    setSelectedIndex(-1);
  };

  return (
    <div>
      <Dialog open={isComponentDialogOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <AddComponentSection className="hidden" />
        </DialogTrigger>
        <DialogContent
          className="w-[90vw] rounded-sm max-w-xl h-[90vh] max-h-[600px] flex flex-col"
          hideClose={false}
        >
          <DialogHeader className="hidden">
            <DialogTitle hidden></DialogTitle>
            <DialogDescription hidden></DialogDescription>
          </DialogHeader>
          <EditorComponentPopup />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const EditorComponentPopup = () => {
  const [isComponentListOpen, setIsComponentListOpen] = useState(true);
  const { showLayoutTab } = useEditor();

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <div className="bg-accent/5 p-1 flex items-center gap-2">
        <Button
          className="w-full"
          variant={isComponentListOpen ? "default" : "outline"}
          onClick={() => setIsComponentListOpen(true)}
        >
          Components
        </Button>
        {showLayoutTab && (
          <Button
            className="w-full"
            variant={!isComponentListOpen ? "default" : "outline"}
            onClick={() => setIsComponentListOpen(false)}
          >
            Layouts
          </Button>
        )}
      </div>
      <ScrollArea className="w-full h-full">
        {isComponentListOpen ? (
          <ComponentList />
        ) : (
          <>{showLayoutTab && <LayoutList />}</>
        )}
      </ScrollArea>
    </div>
  );
};

export default ComponentDialog;
