import React from "react";
import {
  Drawer,
  DrawerContentWitoutHandler,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import useDrawerControll from "@/hooks/useDrawerControll";
import Form from "@/components/navbar/right/login/Form";
import SocialLogin from "@/app/signup/_components/SocialLogin";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

interface LoginDrawerProps {
  open: boolean;
  onClose: () => void;
}

const LoginDrawer = ({ open, onClose }: LoginDrawerProps) => {
  const isOpen = useDrawerControll(open);

  if (!isOpen) return null;

  return (
    <Drawer
      direction="right"
      handleOnly={true}
      open={open}
      onOpenChange={onClose}
    >
      <DrawerContentWitoutHandler
        className="fixed mt-0 overflow-hidden w-[90%] max-w-md inset-2 rounded-sm ml-auto border-0 py-8 px-10"
        style={
          { "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties
        }
      >
        <DrawerHeader className="hidden">
          <DrawerTitle hidden></DrawerTitle>
          <DrawerDescription hidden></DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="w-full h-full">
          <section className="h-full flex flex-col justify-center items-center gap-4">
            <h2 className="text-primary text-xl font-bold select-none">
              Login
            </h2>
            <LoginSeparator />
            <Form />
            <LoginSeparator />
            <div className="flex flex-col gap-4">
              <p className="text-gray-500 text-center select-none">
                Login with
              </p>
              <SocialLogin />
              <p className="text-gray-500 text-center select-none text-sm">
                Don't have an account?
                <Link href="/signup" className="text-primary">
                  {" "}
                  Create an account
                </Link>
              </p>
            </div>
          </section>
        </ScrollArea>
      </DrawerContentWitoutHandler>
    </Drawer>
  );
};

const LoginSeparator = () => (
  <Separator className="opacity-20 shadow-xl bg-primary w-40" />
);

export default LoginDrawer;
