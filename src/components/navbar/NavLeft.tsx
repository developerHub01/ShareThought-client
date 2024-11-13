import Link from "next/link";
import AppSidebarTrigger from "@/components/sidebar/AppSidebarTrigger";

const NavLeft = () => {
  return (
    <div className="flex justify-start items-center gap-1">
      <div className="block sm:hidden">
        <AppSidebarTrigger className="rounded-full" />
      </div>
      <Link href="/" className="select-none font-bold">
        ShareThought
      </Link>
    </div>
  );
};

export default NavLeft;
