import { Button } from "@/components/ui/button";
import { MoveRight as RightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <section className="w-full min-h-screen flex justify-center items-center p-4 select-none text-center bg-gray-900/50 text-primary-foreground overflow-x-hidden bg-[url('/images/not-found.jpeg')] bg-blend-overlay bg-cover bg-fixed bg-no-repeat bg-center">
      <span className="fixed size-[100vw] bg-white/20 pointer-events-none rounded-full blur-sm animate-ping-custom"></span>
      <span className="fixed size-[80vw] bg-white/5 pointer-events-none rounded-full blur-sm animate-ping-custom delay-150"></span>
      <span className="fixed size-[110vw] bg-white/10 pointer-events-none rounded-full blur-sm animate-ping-custom delay-100 duration-1000"></span>
      <div className="relative z-10">
        <h1 className="text-8xl sm:text-[20vw] font-bold leading-tight">404</h1>
        <p className="pb-3">Sorry that page not found...</p>
        <Link href={"/"}>
          <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground gap-2.5">
            Back to home page <RightIcon className="animate-left-to-right" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
