import React from "react";
import SignUpLeft from "@/app/(auth)/signup/_components/SignUpLeft";
import SignUpRight from "@/app/(auth)/signup/_components/SignUpRight";
import ModelWrapper from "@/app/(auth)/signup/_components/modal/ModalWrapper";

const RegisterPage = () => {
  return (
    <section className="w-full min-h-screen h-full flex flex-col md:flex-row">
      <SignUpLeft />
      <SignUpRight />
      <ModelWrapper />
    </section>
  );
};

export default RegisterPage;
