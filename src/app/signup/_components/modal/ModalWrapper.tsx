"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import AvatarModalContainer from "@/app/signup/_components/modal/AvatarModalContainer";
import { useAppSelector } from "@/redux/hooks";

type TModalName = "camera" | "edit";

const ModalWrapper = () => {
  const params = useSearchParams();
  const router = useRouter();
  const { avatar } = useAppSelector((state) => state.signUp);

  let modalName = params.get("avatar");

  if (!modalName || !["camera", "edit"].includes(modalName)) modalName = null;

  const handleClose = () => router.push("/signup");

  useEffect(() => {
   if (modalName === "edit" && !avatar) return router.push("/signup")
  }, [router, avatar, modalName]);

  return (
    <AvatarModalContainer
      modalType={modalName as TModalName}
      isOpen={["camera", "edit"].includes(modalName as TModalName)}
      onClose={handleClose}
    />
  );
};

export default ModalWrapper;
