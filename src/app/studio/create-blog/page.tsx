"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import LayoutList from "@/app/studio/create-blog/_components/LayoutList";
import ComponentList from "@/app/studio/create-blog/_components/ComponentList";
import EditorSidebar from "@/app/studio/create-blog/_components/EditorSidebar";

const CreateBlogPostPage = () => {
  return (
    <section className="mx-auto w-full max-w-7xl">
      <h1 className="text-4xl font-bold text-slate-900 pb-4">
        Create Blog Post
      </h1>
      <section className="w-full flex gap-5">
        <section className="w-full">
          <form className="flex flex-col gap-3">
            <Input type="text" placeholder="Post Title" />
            <section className="p-3 shadow-xl rounded-sm border"></section>
            <ComponentDialog />
          </form>
        </section>
        <EditorSidebar />
      </section>
    </section>
  );
};

const ComponentDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
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
  );
};

const EditorComponentPopup = () => {
  const [isComponentListOpen, setIsComponentListOpen] = useState(true);

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
        <Button
          className="w-full"
          variant={!isComponentListOpen ? "default" : "outline"}
          onClick={() => setIsComponentListOpen(false)}
        >
          Layouts
        </Button>
      </div>
      <ScrollArea className="w-full h-full">
        {isComponentListOpen ? <ComponentList /> : <LayoutList />}
      </ScrollArea>
    </div>
  );
};

export default CreateBlogPostPage;
