import React from "react";
import Form from "@/components/navbar/right/login/Form";
import SocialLogin from "@/app/signup/_components/SocialLogin";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/buttons/Button";
import Link from "next/link";

const AvatarEditModal = () => {
  return (
    <ScrollArea className="w-full h-full">
      <section className="h-full flex flex-col justify-center items-center gap-4">
        <h2 className="text-primary text-xl font-bold select-none">
          AvatarEditModal
        </h2>
        <LoginSeparator />
        <Form />
        <LoginSeparator />
        <div className="flex flex-col gap-4">
          <p className="text-gray-500 text-center select-none">Login with</p>
          <SocialLogin />
          <p className="text-gray-500 text-center select-none text-sm">
            Don&apos;t have an account?
            <Link href="/signup" className="text-primary">
              {" "}
              Create an account
            </Link>
          </p>
        </div>
        <Link href={"/signup?avatar=camera"}>
          <Button>Upload</Button>
        </Link>
      </section>
    </ScrollArea>
  );
};

const LoginSeparator = () => (
  <Separator className="opacity-20 shadow-xl bg-primary w-40" />
);

export default AvatarEditModal;
