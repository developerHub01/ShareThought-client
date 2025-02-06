"use client";

import { Button } from "@/components/ui/button";
import { DrawerFooter } from "@/components/ui/drawer";
import useModifyQueryParams from "@/hooks/use-modify-query-params";
import { toggleisImageEditorOpen } from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import React from "react";

const EditorFooter = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { modifyParams, buildFullPath } = useModifyQueryParams();
  const handleCancel = () =>
    router.push(buildFullPath(modifyParams("delete", "edit")));

  const handleSave = () => dispatch(toggleisImageEditorOpen());

  return (
    <DrawerFooter>
      <div className="flex justify-end items-center gap-4">
        <Button variant={"outline"} onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </DrawerFooter>
  );
};

export default EditorFooter;
