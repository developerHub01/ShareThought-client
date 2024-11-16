import AppSidebarTrigger from "@/components/sidebar/AppSidebarTrigger";
import NavLogo from "@/components/navbar/left/NavLogo";

const NavLeft = () => {
  return (
    <div className="flex justify-start items-center gap-1 select-none font-bold">
      <div className="block md:hidden">
        <AppSidebarTrigger className="rounded-full" />
      </div>
      <NavLogo />
    </div>
  );
};

export default NavLeft;
