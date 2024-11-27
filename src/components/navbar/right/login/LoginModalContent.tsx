import Form from "@/app/login/_components/Form";
import {
  DrawerContentWitoutHandler,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import SocialLogin from "@/components/auth/SocialLogin";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { CenterScrollArea } from "@/components/scrollArea/CenterScrollArea";
import { Button } from "@/components/buttons/Button";

const LoginModalContent = () => {
  return (
    <DrawerContentWitoutHandler
      className="fixed mt-0 overflow-hidden w-[90%] max-w-md inset-2 rounded-sm ml-auto border-0 grid place-items-center"
      style={
        { "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties
      }
    >
      <DrawerHeader className="hidden">
        <DrawerTitle hidden></DrawerTitle>
        <DrawerDescription hidden></DrawerDescription>
      </DrawerHeader>
      <CenterScrollArea className="w-full h-full flex">
        <section className="h-full flex flex-col justify-center items-center gap-4 py-6 sm:py-8 px-10">
          <h2 className="text-primary text-xl font-bold select-none">Login</h2>
          <LoginSeparator />
          <Form />
          <LoginSeparator />
          <div className="flex flex-col gap-4">
            <p className="text-gray-500 text-center select-none">Login with</p>
            <SocialLogin />
            <p className="text-gray-500 text-center select-none text-sm">
              Don&apos;t have an account?
              <Link href="/signup" className="text-primary ml-1">
                Create an account
              </Link>
            </p>
            <Link href="/login" className="mx-auto">
              <Button>Go to login page</Button>
            </Link>
          </div>
        </section>
      </CenterScrollArea>
    </DrawerContentWitoutHandler>
  );
};

const LoginSeparator = () => (
  <Separator className="opacity-20 shadow-xl bg-primary w-40" />
);

export default LoginModalContent;
