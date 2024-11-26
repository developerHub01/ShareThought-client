import SocialLogin from "@/components/auth/SocialLogin";
import React from "react";

const SocialLoginSection = () => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-gray-300 text-center select-none">Login with</p>
      <SocialLogin />
    </div>
  );
};

export default SocialLoginSection;
