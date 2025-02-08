"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Eye as EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import useModifyQueryParams from "@/hooks/use-modify-query-params";

const PreviewButton = () => {
  const router = useRouter();

  const { buildFullPath, modifyParams } = useModifyQueryParams();

  const handlePreview = () => {
    return router.push(buildFullPath(modifyParams("set", "preview", "true")));
  };

  return (
    <Button size={"sm"} variant={"ghost"} onClick={handlePreview}>
      <EyeIcon size={18} /> Preview
    </Button>
  );
};

export default PreviewButton;
