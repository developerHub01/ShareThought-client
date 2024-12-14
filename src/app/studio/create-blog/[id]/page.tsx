"use client";

import React, {
  ChangeEvent,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
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
import LayoutList from "@/app/studio/create-blog/[id]/_components/LayoutList";
import ComponentList from "@/app/studio/create-blog/[id]/_components/ComponentList";
import EditorSidebar from "@/app/studio/create-blog/[id]/_components/EditorSidebar";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { Plus as AddIcon, Eye as PreviewIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  createBlog,
  updateTitle,
} from "@/redux/features/builders/blogBuilderSlice";
import clsx from "clsx";
import { useEditor } from "@/app/studio/create-blog/[id]/_components/EditorProvider";

const CreateBlogPostPage = () => {
  const { id: postId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const blogsData = useAppSelector((state) => state?.blogBuilder?.blogs);

  useEffect(() => {
    if (!postId) return;

    if (!blogsData[postId]) {
      dispatch(createBlog(postId));
    }
  }, [postId]);

  const blogData = blogsData[postId];

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateTitle({
        id: postId,
        title: e.target.value,
      })
    );
  };

  return (
    <section className="mx-auto w-full max-w-7xl">
      <h1 className="text-4xl font-bold text-slate-900 pb-4">
        Create Blog Post
      </h1>
      <section className="w-full flex gap-5">
        <section className="w-full">
          <form className="flex flex-col gap-3">
            <Input
              type="text"
              placeholder="Post Title"
              className="text-lg md:text-xl h-auto py-3 font-bold"
              onChange={handleTitle}
            />
            <section className="p-3 py-5 shadow-xl rounded-sm border flex flex-col gap-3">
              {blogData?.content.map(
                (
                  { id, type, text, link, src, alt, locationPath, children },
                  index,
                  list
                ) => (
                  <div key={id} className="group">
                    <h1 className="text-xl bg-slate-950 text-white p-4">
                      {id}
                    </h1>
                    {index !== list.length - 1 && (
                      <div className="group-hover:block hidden">
                        <AddComponentSection index={index + 1} />
                      </div>
                    )}
                  </div>
                )
              )}
              <AddComponentSection />
            </section>
          </form>
        </section>
        {/* <EditorSidebar /> */}
      </section>
      <ComponentDialog />
      <PreviewButton />
    </section>
  );
};

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

const PreviewButton = () => {
  const pathname = usePathname();

  return (
    <Link
      href={`${pathname}/preview`}
      target="_blank"
      className="fixed right-1 bottom-1"
    >
      <Button>
        <PreviewIcon /> preview
      </Button>
    </Link>
  );
};

interface AddComponentSectionProps {
  className?: string;
  index?: number;
  [key: string]: unknown;
}

const AddComponentSection = ({
  className,
  index = -1,
  ...props
}: AddComponentSectionProps) => {
  return (
    <div
      className={clsx(
        "flex justify-center items-center relative before:content-[''] before:absolute before:w-full before:h-1 before:bg-primary/20 before:rounded-md before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:pointer-events-none",
        className
      )}
      {...props}
    >
      <AddComponentButton index={index} />
    </div>
  );
};

interface AddComponentButtonProps {
  className?: string;
  index?: number;
  [key: string]: unknown;
}

const AddComponentButton = ({
  className,
  index = -1,
  ...props
}: AddComponentButtonProps) => {
  const { setIsComponentDialogOpen, setSelectedIndex } = useEditor();

  const handleClick = () => {
    setIsComponentDialogOpen(true);
    setSelectedIndex(index);
  };

  return (
    <Button
      variant="default"
      size={"icon"}
      className={clsx("rounded-full size-6 border border-white", className)}
      {...props}
      onClick={handleClick}
      type="button"
    >
      <AddIcon size={20} />
    </Button>
  );
};

export default CreateBlogPostPage;
