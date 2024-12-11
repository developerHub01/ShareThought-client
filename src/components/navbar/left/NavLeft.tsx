import Link from "next/link";
import SidebarTrigger from "@/components/sidebar/SidebarTrigger";

const NavLeft = () => {
  return (
    <div className="flex justify-start items-center gap-2 select-none font-bold">
      <div className="block md:hidden">
        <SidebarTrigger className="rounded-full" />
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
