import React from "react";
import LoginLeft from "@/app/(auth)/login/_components/LoginLeft";
import LoginRight from "@/app/(auth)/login/_components/LoginRight";

const LoginPage = () => {
  return (
    <section className="w-full min-h-screen h-full flex flex-col md:flex-row">
      <LoginLeft />
      <LoginRight />
    </section>
  );
};

export default LoginPage;
