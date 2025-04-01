"use client";

import { Input } from "@/components/ui/input";
import { updateTitle } from "@/redux/features/builders/blogBuilderSlice";
import { selectBlogTitle } from "@/redux/features/builders/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { ChangeEvent, KeyboardEvent, memo } from "react";

const EditorBlogTitle = memo(() => {
  const { id: blogId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const title = useAppSelector((state) => selectBlogTitle(state, blogId));

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateTitle({
        id: blogId,
        title: e.target.value,
      })
    );
  };

  const onKeyChange = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") e.preventDefault();
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Input
        type="text"
        placeholder="Post Title"
        className="text-lg md:text-xl h-auto py-3 font-bold"
        onChange={onChange}
        value={title}
        onKeyUp={onKeyChange}
      />
    </div>
  );
});

export default EditorBlogTitle;
