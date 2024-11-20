import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import Form from "@/app/signup/_components/Form";

const SignUpRight = () => {
  return (
    <div className="w-full flex justify-center items-center p-6 py-8">
      <div className="w-full max-w-md flex flex-col items-center gap-5 sm:gap-6">
        <h1 className="text-center text-2xl font-bold">Create account</h1>
        <Form />
        <ReadAboutUs />
      </div>
    </div>
  );
};

const ReadAboutUs = () => (
  <Link href={"/"} className="text-center">
    <Button variant={"link"} className="underline text-base">
      Read about us
    </Button>
  </Link>
);

export default SignUpRight;
