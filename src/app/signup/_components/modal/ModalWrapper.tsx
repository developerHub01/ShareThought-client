"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import AvatarModalContainer from "@/app/signup/_components/modal/AvatarModalContainer";

type TModalName = "camera" | "edit";

const ModalWrapper = () => {
  const params = useSearchParams();

  const router = useRouter();

  let modalName = params.get("avatar");

  if (!modalName || !["camera", "edit"].includes(modalName)) modalName = null;

  const handleClose = () => router.push("/signup");

  return (
    <>
      <AvatarModalContainer
        modalType={modalName as TModalName}
        isOpen={modalName === "camera"}
        onClose={handleClose}
      />
      <AvatarModalContainer
        modalType={modalName as TModalName}
        isOpen={modalName === "edit"}
        onClose={handleClose}
      />
    </>
  );
};

export default ModalWrapper;
