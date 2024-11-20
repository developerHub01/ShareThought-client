"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import LoginDrawer from "@/components/drawer/LoginDrawer";

const LoginWrapper = () => {
  const params = useSearchParams();

  const router = useRouter();

  const isLoginPageOn = params.get("login") === "true";

  const handleClose = () => router.back();
  return <LoginDrawer open={isLoginPageOn} onClose={handleClose} />;
};

export default LoginWrapper;
