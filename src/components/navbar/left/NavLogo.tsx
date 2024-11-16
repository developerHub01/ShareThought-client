"use client";
import { useSidebar } from "@/components/sidebar/SidebarMain";
import Link from "next/link";

const NavLogo = () => {
  const { state } = useSidebar();
  return (
    <>
      {state === "collapsed" && (
        <>
          <Link href="/" className="hidden sm:block">
            ShareThought
          </Link>
          <Link href="/" className="block sm:hidden">
            SH
          </Link>
        </>
      )}
    </>
  );
};

export default NavLogo;
