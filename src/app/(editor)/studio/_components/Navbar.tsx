import React from "react";

import { Button } from "@/components/ui/button";
import { ChevronLeft as LeftIcon, Save as SaveIcon } from "lucide-react";
import PreviewButton from "@/app/(editor)/studio/_components/PreviewButton";
import NavbarFullScreenButtons from "@/app/(editor)/studio/_components/NavbarFullScreenButtons";

const Navbar = () => {
  return (
    <header className="w-full flex justify-between items-center gap-4 bg-primary-foreground shadow-xl px-5 py-3 border-b">
      <Button variant={"ghost"} size={"sm"}>
        <LeftIcon size={18} /> Back
      </Button>

      <div className="flex items-center gap-2">
        <PreviewButton />
        <Button size={"sm"}>
          <SaveIcon size={18} /> Save
        </Button>
        <NavbarFullScreenButtons />
      </div>
    </header>
  );
};

export default Navbar;
