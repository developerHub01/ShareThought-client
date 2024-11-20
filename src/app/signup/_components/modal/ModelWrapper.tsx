"use client";

import React from "react";
import AvatarUploaderModal from "@/app/signup/_components/modal/AvatarUploaderModal";
import AvatarEditModal from "@/app/signup/_components/modal/AvatarEditModal";
import { useRouter, useSearchParams } from "next/navigation";

const ModelWrapper = () => {
  const params = useSearchParams();

  const router = useRouter();

  const modelName = params.get("modal");

  if (!modelName || !["camera", "edit"].includes(modelName)) return null;

  const handleClose = () => router.back();

  return (
    <>
      {modelName === "camera" && <AvatarUploaderModal />}
      {modelName === "edit" && <AvatarEditModal />}
    </>
  );
};

export default ModelWrapper;
