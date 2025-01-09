import React from "react";
import { Eye as PreviewIcon, Pencil as EditIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleEditorOrPreview } from "@/redux/features/builders/blogBuilderSlice";

const PreviewButton = () => {
  const { id: postId } = useParams<{ id: string }>();
  const blogData = useAppSelector((state) => state.blogBuilder.blogs[postId]);

  const activeEditorOrPreview = blogData?.editorOrPreview;

  const dispatch = useAppDispatch();

  const handleToggleEditorOrPreview = () =>
    dispatch(toggleEditorOrPreview(postId));

  return (
    <Button
      className="fixed right-1 bottom-1"
      onClick={handleToggleEditorOrPreview}
    >
      {activeEditorOrPreview === "editor" ? (
        <>
          <PreviewIcon size={20} />
          Preview
        </>
      ) : (
        <>
          <EditIcon size={20} />
          Edit
        </>
      )}
    </Button>
  );
};
export default PreviewButton;
