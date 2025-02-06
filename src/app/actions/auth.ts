"use server";

import { signIn } from "@/lib/auth";

export const socialLoginAction = async (formData: FormData) => {
  const action = formData.get("action");

  await signIn(action, {
    redirectTo: "/",
  });
};

export const socialLogoutAction = async () => {};
