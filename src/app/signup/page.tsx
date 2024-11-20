import React from "react";
import SignUpLeft from "@/app/signup/_components/SignUpLeft";
import SignUpRight from "@/app/signup/_components/SignUpRight";

const RegisterPage = () => {
  return (
    <section className="w-full min-h-screen h-full flex flex-col md:flex-row">
      <SignUpLeft />
      <SignUpRight />
    </section>
  );
};

export default RegisterPage;
