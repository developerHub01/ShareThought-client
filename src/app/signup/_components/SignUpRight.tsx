import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import Form from "@/app/signup/_components/Form";

const SignUpRight = () => {
  return (
    <div className="w-full flex justify-center items-center p-6 py-8">
      <div className="w-full max-w-md flex flex-col items-center gap-5 sm:gap-6">
        <h1 className="text-center text-2xl sm:text-3xl font-bold">
          Create account
        </h1>
        <Form />
        <SignUpRightFooter />
      </div>
    </div>
  );
};

const SignUpRightFooter = () => (
  <div className="flex items-center gap-2 flex-wrap justify-between">
    <ActionButtonWrapper link="/">Read about us</ActionButtonWrapper>
    <ActionButtonWrapper link="/login">Login</ActionButtonWrapper>
  </div>
);

interface ActionButtonWrapperProps {
  children: React.ReactNode;
  link: string;
}

const ActionButtonWrapper = ({ children, link }: ActionButtonWrapperProps) => (
  <Link href={link} className="text-center">
    <Button variant={"link"} className="underline text-base">
      {children}
    </Button>
  </Link>
);

export default SignUpRight;
