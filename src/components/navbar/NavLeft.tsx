import Link from "next/link";
import AppSidebarTrigger from "@/components/sidebar/AppSidebarTrigger";

const NavLeft = () => {
  return (
    <div className="flex justify-start items-center gap-1 select-none font-bold">
      <div className="block md:hidden">
        <AppSidebarTrigger className="rounded-full" />
      </div>
      <Link href="/" className="hidden sm:block">
        ShareThought
      </Link>
      <Link href="/" className="block sm:hidden">
        SH
      </Link>
    </div>
  );
};

export default NavLeft;
