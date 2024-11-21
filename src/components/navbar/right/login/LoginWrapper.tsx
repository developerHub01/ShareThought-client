"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Drawer } from "@/components/ui/drawer";
import LoginModalContent from "@/components/navbar/right/login/LoginModalContent";

const LoginWrapper = () => {
  const params = useSearchParams();

  const router = useRouter();

  const isLoginPageOn = params.get("login") === "true";

  const handleClose = () => router.back();
  return (
    <Drawer
      direction="right"
      handleOnly={true}
      open={isLoginPageOn}
      onOpenChange={handleClose}
    >
      <LoginModalContent />
    </Drawer>
  );
};

export default LoginWrapper;
