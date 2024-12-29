"use client";

import { Button } from "@/components/buttons/Button";
import {
  Drawer,
  DrawerContentWitoutHandler,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import AboutChannel from "@/app/(home)/channel/[id]/_components/About/AboutChannel";
import useIsActiveQuery from "@/hooks/use-is-active-query";

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
        <DrawerHeader className="p-0 py-1 max-h-[85vh] rounded-sm flex flex-col">
          <DrawerTitle>About</DrawerTitle>
          <DrawerDescription hidden></DrawerDescription>
          <AboutChannel />
        </DrawerHeader>
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
