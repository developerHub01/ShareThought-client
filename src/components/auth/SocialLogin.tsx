import { socialLoginAction } from "@/app/actions/auth";

import React from "react";
import SocialAuthButton from "@/components/buttons/SocialAuthButton";

const SocialLogin = () => {
  return (
    <form
      action={socialLoginAction}
      className="flex flex-wrap justify-center items-center gap-3"
    >
      <SocialAuthButton authType="google" />
      <SocialAuthButton authType="github" />
      <SocialAuthButton authType="facebook" />
    </form>
  );
};

export default SocialLogin;
