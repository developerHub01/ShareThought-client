import React from "react";
import SocialAuthButton from "@/components/buttons/SocialAuthButton";

const SocialLogin = () => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-3">
      <SocialAuthButton authType="google" />
      <SocialAuthButton authType="github" />
      <SocialAuthButton authType="facebook" />
    </div>
  );
};

export default SocialLogin;
