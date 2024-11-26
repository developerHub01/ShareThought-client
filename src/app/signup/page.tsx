import React from "react";
import SignUpLeft from "@/app/signup/_components/SignUpLeft";
import SignUpRight from "@/app/signup/_components/SignUpRight";
import ModelWrapper from "@/app/signup/_components/modal/ModalWrapper";

const RegisterPage = () => {
  return (
    <>
      <SignUpLeft />
      <SignUpRight />
      <ModelWrapper />
    </>
  );
};

export default RegisterPage;
