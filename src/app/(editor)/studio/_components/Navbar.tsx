import { Button } from "@/components/ui/button";
import React from "react";

import { ChevronLeft as LeftIcon, Save as SaveIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="w-full flex justify-between items-center gap-4 bg-primary-foreground shadow-xl px-5 py-3 border-b">
      <Button variant={"ghost"} size={"sm"}>
        <LeftIcon size={16} /> Back
      </Button>
      <Button size={"sm"}>
        <SaveIcon size={16} /> Save
      </Button>
    </header>
  );
};

export default Navbar;
