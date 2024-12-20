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
import React from "react";

interface AboutPopOverProps {}

const AboutPopOver = ({}: AboutPopOverProps) => {
  return (
    <Drawer direction="right" handleOnly={true}>
      <DrawerTrigger asChild>
        <Link href={"?about"}>
          <Button variant={"ghost"} className="hover:underline">
            About
          </Button>
        </Link>
      </DrawerTrigger>
      <DrawerContentWitoutHandler
        className="fixed mt-0 overflow-hidden w-[90%] max-w-xs inset-2 rounded-sm ml-auto border-0"
        style={
          { "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties
        }
      >
        <DrawerHeader className="p-0 py-1 max-h-[85vh] rounded-sm flex flex-col">
          <DrawerTitle>About</DrawerTitle>
          <DrawerDescription hidden></DrawerDescription>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto
            iste, dicta modi explicabo maxime eligendi reiciendis sequi placeat
            accusantium possimus veniam voluptatem temporibus ullam expedita hic
            at animi. Rerum, corrupti?
          </p>
        </DrawerHeader>
      </DrawerContentWitoutHandler>
    </Drawer>
  );
};

export default AboutPopOver;
