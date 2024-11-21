import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/buttons/Button";
import Link from "next/link";

const AvatarUploaderModal = () => {
  return (
    <section className="w-full h-full flex flex-col justify-center items-center gap-5">
      <div>
        <h2 className="text-center pb-3 capitalize text-primary text-xl font-bold select-none">
          Upload avatar
        </h2>
        <LoginSeparator />
      </div>
      <div className="w-full p-2 group rounded-md">
        <div className="size-full aspect-square flex flex-col gap-5 justify-center items-center bg-accent rounded-md cursor-pointer ring-2 border-dashed duration-100 ring-offset-0 group-hover:ring-offset-8 ring-transparent group-hover:ring-primary/50 shadow-lg p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-image-up w-14 sm:w-28 text-primary"
          >
            <path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21" />
            <path d="m14 19.5 3-3 3 3" />
            <path d="M17 22v-5.5" />
            <circle cx="9" cy="9" r="2" />
          </svg>
          <Button className="text-xs sm:text-base">Upload Avatar</Button>
        </div>
        {/* <div className="max-h-full min-h-96"></div> */}
        <Link href={"/signup?avatar=edit"}>
          <Button>Edit</Button>
        </Link>
      </div>
    </section>
  );
};

const LoginSeparator = () => (
  <Separator className="opacity-20 shadow-xl bg-primary w-40 h-[2px]" />
);

export default AvatarUploaderModal;
