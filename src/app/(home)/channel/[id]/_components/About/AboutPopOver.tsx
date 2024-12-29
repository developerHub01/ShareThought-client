"use client";

import {
  Drawer,
  DrawerContentWitoutHandler,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import AboutChannel from "@/app/(home)/channel/[id]/_components/About/AboutChannel";
import useIsActiveQuery from "@/hooks/use-is-active-query";
import { X as CloseIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AboutPopOverProps {}

const AboutPopOver = ({}: AboutPopOverProps) => {
  const router = useRouter();

  const isAboutOpen = useIsActiveQuery("about");

  const handleClose = (open: boolean) => {
    if (!open) return router.back();
  };

  return (
    <Drawer
      direction="right"
      handleOnly={true}
      open={isAboutOpen}
      onOpenChange={handleClose}
    >
      <DrawerTrigger asChild>
        <Link href={"?about"}>
          <Button variant={"ghost"} className="hover:underline">
            About
          </Button>
        </Link>
      </DrawerTrigger>
      <DrawerContentWitoutHandler
        className="fixed mt-0 overflow-hidden w-[90%] max-w-lg inset-2 rounded-sm ml-auto border-0"
        style={
          { "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties
        }
      >
        <DrawerHeader className="flex justify-between items-center gap-2 border-b py-2">
          <DrawerTitle className="font-medium">About</DrawerTitle>
          <DrawerDescription hidden></DrawerDescription>
          <Button
            size={"icon"}
            className="rounded-full"
            variant={"ghost"}
            onClick={() => handleClose(false)}
          >
            <CloseIcon size={22} strokeWidth={1.5} />
          </Button>
        </DrawerHeader>
        <ScrollArea className="w-full h-full">
          <AboutChannel />
        </ScrollArea>
      </DrawerContentWitoutHandler>
    </Drawer>
  );
};

export default AboutPopOver;

/* 


const params = useSearchParams();

  const router = useRouter();

  const isLoginPageOn = params.get("login") === "true";

  const handleClose = () => router.back();
  return (
    <Drawer
      direction="right"
      handleOnly={true}
      open={isLoginPageOn}
      onOpenChange={handleClose}
    >
      <LoginModalContent />
    </Drawer>




*/
